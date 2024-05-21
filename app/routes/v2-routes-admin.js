const _ = require('lodash')

module.exports = router => {

  router.post('/review-status', function(req, res){
    var reviewstatus = req.session.data['adminreviewstatus']

    if (reviewstatus == 'Decision made') {
      res.redirect('/admin-console/v2/applicant-2/set-eligibility')
    } else if ((reviewstatus == 'In progress') || (reviewstatus == 'Awaiting information') || (reviewstatus == 'Re-register')){
      res.redirect('/admin-console/v2/applicant-2/set-notes')
    } else {
      res.redirect('/admin-console/v2/applicant-2/applicant')
    }
  })

}