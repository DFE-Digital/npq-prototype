const fs = require('fs')
const { get: getKeypath, set: setKeypath } = require('lodash')
const {
  registerWizardPaths,
  registerWizardForks,
  existingUserWizardPaths,
  existingUserWizardForks,
  typeOfUser
} = require('../utils/register-wizard-paths')

module.exports = router => {
  router.all('/existing-user/*', (req, res, next) => {
    res.locals.isExistingUser = true
    next()
  })

  router.all('/register/*', (req, res, next) => {
    res.locals.isNewUser = true
    next()
  })

  router.all(['/register/*', '/existing-user/*'], (req, res, next) => {
    Object.assign(res.locals, typeOfUser(req))
    next()
  })

  router.post('/register/email', (req, res, next) => {
    const email = getKeypath(req, 'body.register.email')
    if (email === 'existing@example.com') {
      const register = {
        email: 'existing@example.com',
        // 'work-in-school': 'Yes',
        // 'where-do-you-work': 'England',
        'know-trn': 'yes',
        trn: '1234567',
        name: 'Jane Doe',
        'dob-day': '01',
        'dob-month': '01',
        'dob-year': '1980',
        // nino: 'QQ 12 34 56 C',
        // 'school-location': 'London',
        // school: 'Oftborough College',
        // course: 'NPQ Leading Teaching (NPQLT)',
        // provider: 'Ambition Institute',
        employer: 'Acme Ltd',
        role: 'Manager',
        'agree-to-share': ['yes']
      }

      setKeypath(req, 'session.data.register', register)
    }
    next()
  })

  router.get('/register', (req, res) => {
    res.render('register/index', { paths: registerWizardPaths(req) })
  })

  router.all('/register/where-do-you-work', (req, res, next) => {
    res.locals.countries = [{ text: '', value: '' }].concat(JSON.parse(fs.readFileSync('public/govuk-country-and-territory-autocomplete/location-autocomplete-canonical-list.json', 'utf8'))
      .map(country => {
        return { text: country[0], value: country[1] }
      }))

    next()
  })

  router.get('/register/aso-from-npqh', (req, res) => {
    req.session.data.register.course = 'Additional Support Offer (ASO) for NPQH'
    res.render('register/aso', { paths: registerWizardPaths(req) })
  })

  router.get('/register/:view', (req, res) => {
    res.render(`register/${req.params.view}`, { paths: registerWizardPaths(req) })
  })

  router.post([
    '/register',
    '/register/:view'
  ], function (req, res) {
    const fork = registerWizardForks(req)
    const paths = registerWizardPaths(req)
    fork ? res.redirect(fork) : res.redirect(paths.next)
  })

  router.get('/existing-user/:view', (req, res) => {
    res.render(`register/${req.params.view}`, { paths: existingUserWizardPaths(req) })
  })

  router.post('/existing-user/:view', function (req, res) {
    const fork = existingUserWizardForks(req)
    const paths = existingUserWizardPaths(req)
    fork ? res.redirect(fork) : res.redirect(paths.next)
  })
}
