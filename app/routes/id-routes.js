const _ = require('lodash')

module.exports = router => {


   // NPQ create account
   router.get('/user-research/npq/new-user', (req, res) => {
    const data = req.session.data
    data.signedIn = 'true'
    res.redirect('/chosen')
  })


   // NPQ create account
   router.get('/user-research/npq/registration-status/registration-status', (req, res) => {
    const data = req.session.data
    data.signedIn = 'true'
    res.redirect('/chosen')
  })


  router.get('/auth/return-to-service', (req, res) => {
    res.redirect(req.session.data.returnToService)
  })
}
