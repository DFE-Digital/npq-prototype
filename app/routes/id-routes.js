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
}
