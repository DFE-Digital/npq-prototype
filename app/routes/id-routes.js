const _ = require('lodash')

module.exports = router => {

  // NPQ create account
   router.get('/user-research/npq/new-user', (req, res) => {
    const data = req.session.data
    data.signedIn = 'true'
    res.redirect('/course-start')
  })

  // NPQ create account
   router.get('/user-research/npq/existing-user', (req, res) => {
    const data = req.session.data
    data.signedIn = 'true'
    res.redirect('/registration-status/registration-status')
  })

  router.get('/auth/return-to-service', (req, res) => {
    res.redirect(req.session.data.returnToService)
  })

  // Just submitted - show success message 
  router.get('/submit', (req, res) => {
    const data = req.session.data
    data.submittedNow = 'True'
    res.redirect('/registration-status/registration-status')
  })

  // -----------------
  //  Closed states 
  // -----------------

  // Closed state - partial
  router.get('/closed-for-registations', (req, res) => {
    const data = req.session.data
    data.closedState = 'Partial'
    res.redirect('/start-id')
  })

  // Closed state - full 
  router.get('/closed-fully', (req, res) => {
    const data = req.session.data
    data.closedState = 'Full'
    res.redirect('/start-id')
  })

  // Closed state - Remove any closed states
  router.get('/start-page', (req, res) => {
    const data = req.session.data
    data.closedState = ''
    res.redirect('/start-id')
  })

  // Closed state - Header link 
  router.get('/header-link', function (req, res) {

    let closedState = req.session.data.closedState
  
    if (closedState === '') {
        res.redirect('/course-start')
      } else {
        res.redirect('/registrations-closed')
    }
  })

  // Closed state - sign up to email  
  router.get('/closed-eoi', (req, res) => {
    const data = req.session.data
    data.closedEoi = 'True'
    res.redirect('/closed/signed-in-dfe-identity')
  })

  // Closed state - sign in  
  router.get('/closed-signin', (req, res) => {
    const data = req.session.data
    data.closedSignin = 'True'
    data.closedEoi = ''
    res.redirect('/closed/signed-in-dfe-identity')
  })

  // DfE account redirect to NPQ 
  router.get('/identity-redirect-npq', function (req, res) {

    let closedEoi = req.session.data.closedEoi
  
    if (closedEoi === 'True') {
        res.redirect('/registration-status/registration-opening-email-confirmation')
      } else {
        res.redirect('/registration-status')
    }
  })

  // -----------------
  //  Set the number of registrations  
  // -----------------

  // 0 registrations 
    router.get('/no-registrations', (req, res) => {
      const data = req.session.data
      data.numberOfRegistrations = '0'
      res.redirect('/')
    })
  // 1 registration
    router.get('/one-registration', (req, res) => {
      const data = req.session.data
      data.numberOfRegistrations = '1'
      res.redirect('/')
    })
  // >1 registration
  router.get('/multiple-registrations', (req, res) => {
    const data = req.session.data
    data.numberOfRegistrations = '3'
    res.redirect('/')
  })

  // Redirect to correct account page if have 0,1 or >1 registrations

  router.get('/registration-status', function (req, res) {

    let numberOfRegistrations = req.session.data.numberOfRegistrations
  
    if (numberOfRegistrations === '0') {
        res.redirect('/registration-status/no-registrations')
      } else if (numberOfRegistrations === '1') {
        res.redirect('/registration-status/registration-status')
      } else {
        res.redirect('/registration-status/multiple-registrations')
    }
  })

}
