const _ = require('lodash')

module.exports = router => {
  // Applicant 1 
  // update review status 
  router.post('/applicant-1--review-status', function(req, res){
    var appp1reviewstatus = req.session.data['applicant1--review-status']

    if (appp1reviewstatus == 'Decision made') {
      res.redirect('/admin-console/v2/applicant-1/set-eligibility')
    } else if ((appp1reviewstatus == 'Needs review') || (appp1reviewstatus == 'Awaiting information') || (appp1reviewstatus == 'Re-register')){
      res.redirect('/admin-console/v2/applicant-1/set-notes')
    } else {
      res.redirect('/admin-console/v2/applicant-1/applicant')
    }
  })

  // update eligibility status 
  router.post('/applicant-1--eligibility-status', function(req, res){
    var appp1fundingstatus = req.session.data['applicant1--funding-status']

    if (appp1fundingstatus == 'No') {
      res.redirect('/admin-console/v2/applicant-1/set-ineligible-reason')
    } else {
      res.redirect('/admin-console/v2/applicant-1/set-notes')
    } 
  })

  // Applicant 2 
  // update review status 
  router.post('/applicant-2--review-status', function(req, res){
    var appp2reviewstatus = req.session.data['applicant2--review-status']

    if (appp2reviewstatus == 'Decision made') {
      res.redirect('/admin-console/v2/applicant-2/set-eligibility')
    } else if ((appp2reviewstatus == 'Needs review') || (appp2reviewstatus == 'Awaiting information') || (appp2reviewstatus == 'Re-register')){
      res.redirect('/admin-console/v2/applicant-2/set-notes')
    } else {
      res.redirect('/admin-console/v2/applicant-2/applicant')
    }
  })

  // update eligibility status 
  router.post('/applicant-2--eligibility-status', function(req, res){
    var appp2fundingstatus = req.session.data['applicant2--funding-status']

    if (appp2fundingstatus == 'No') {
      res.redirect('/admin-console/v2/applicant-2/set-ineligible-reason')
    } else {
      res.redirect('/admin-console/v2/applicant-2/set-notes')
    } 
  })

}