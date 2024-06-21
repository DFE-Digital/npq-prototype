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

  // Applicant 3 
  // update review status 
  router.post('/applicant-3--review-status', function(req, res){
    var appp3reviewstatus = req.session.data['applicant3--review-status']

    if (appp3reviewstatus == 'Decision made') {
      res.redirect('/admin-console/v2/applicant-3/set-eligibility')
    } else if ((appp3reviewstatus == 'Needs review') || (appp3reviewstatus == 'Awaiting information') || (appp3reviewstatus == 'Re-register')){
      res.redirect('/admin-console/v2/applicant-3/set-notes')
    } else {
      res.redirect('/admin-console/v2/applicant-3/applicant')
    }
  })

  // update eligibility status 
  router.post('/applicant-3--eligibility-status', function(req, res){
    var appp3fundingstatus = req.session.data['applicant3--funding-status']

    if (appp3fundingstatus == 'No') {
      res.redirect('/admin-console/v2/applicant-3/set-ineligible-reason')
    } else {
      res.redirect('/admin-console/v2/applicant-3/set-notes')
    } 
  })

  // Applicant 4 
  // update review status 
  router.post('/applicant-4--review-status', function(req, res){
    var appp4reviewstatus = req.session.data['applicant4--review-status']

    if (appp4reviewstatus == 'Decision made') {
      res.redirect('/admin-console/v2/applicant-4/set-eligibility')
    } else if ((appp4reviewstatus == 'Needs review') || (appp4reviewstatus == 'Awaiting information') || (appp4reviewstatus == 'Re-register')){
      res.redirect('/admin-console/v2/applicant-4/set-notes')
    } else {
      res.redirect('/admin-console/v2/applicant-4/applicant')
    }
  })

  // update eligibility status 
  router.post('/applicant-4--eligibility-status', function(req, res){
    var appp4fundingstatus = req.session.data['applicant4--funding-status']

    if (appp4fundingstatus == 'No') {
      res.redirect('/admin-console/v2/applicant-4/set-ineligible-reason')
    } else {
      res.redirect('/admin-console/v2/applicant-4/set-notes')
    } 
  })

}