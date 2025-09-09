const _ = require('lodash')

// version
var v = '/admin-v3/'

module.exports = router => {
  // registration 1 
  // update review status 
  router.post(v + 'registration-1/set-status', function(req, res){
    var appp1reviewstatus = req.session.data['registration1--review-status']

    if (appp1reviewstatus == 'Decision made') {
      res.redirect(v + 'registration-1/set-eligibility')
    } else if ((appp1reviewstatus == 'Needs review') || (appp1reviewstatus == 'Awaiting information') || (appp1reviewstatus == 'Re-register')){
      res.redirect(v + 'registration-1/set-notes')
    } else {
      res.redirect(v + 'registration-1/registration')
    }
  })

  // update eligibility status 
  router.post(v + 'registration-1/set-eligibility', function(req, res){
    var appp1fundingstatus = req.session.data['registration1--funding-status']

    if (appp1fundingstatus == 'No') {
      res.redirect(v + 'registration-1/set-ineligible-reason')
    } else {
      res.redirect(v + 'registration-1/set-notes')
    } 
  })

  // registration 2 
  // update review status 
  router.post(v + 'registration-2/set-status', function(req, res){
    var appp2reviewstatus = req.session.data['registration2--review-status']

    if (appp2reviewstatus == 'Decision made') {
      res.redirect(v + 'registration-2/set-eligibility')
    } else if ((appp2reviewstatus == 'Needs review') || (appp2reviewstatus == 'Awaiting information') || (appp2reviewstatus == 'Re-register')){
      res.redirect(v + 'registration-2/set-notes')
    } else {
      res.redirect(v + 'registration-2/registration')
    }
  })

  // update eligibility status 
  router.post(v + 'registration-2/set-eligibility', function(req, res){
    var appp2fundingstatus = req.session.data['registration2--funding-status']

    if (appp2fundingstatus == 'No') {
      res.redirect(v + 'registration-2/set-ineligible-reason')
    } else {
      res.redirect(v + 'registration-2/set-notes')
    } 
  })

  // registration 3 
  // update review status 
  router.post(v + 'registration-3/set-status', function(req, res){
    var appp3reviewstatus = req.session.data['registration3--review-status']

    if (appp3reviewstatus == 'Decision made') {
      res.redirect(v + 'registration-3/set-eligibility')
    } else if ((appp3reviewstatus == 'Needs review') || (appp3reviewstatus == 'Awaiting information') || (appp3reviewstatus == 'Re-register')){
      res.redirect(v + 'registration-3/set-notes')
    } else {
      res.redirect(v + 'registration-3/registration')
    }
  })

  // update eligibility status 
  router.post(v + 'registration-3/set-eligibility', function(req, res){
    var appp3fundingstatus = req.session.data['registration3--funding-status']

    if (appp3fundingstatus == 'No') {
      res.redirect(v + 'registration-3/set-ineligible-reason')
    } else {
      res.redirect(v + 'registration-3/set-notes')
    } 
  })

  // registration 4 
  // update review status 
  router.post(v + 'registration-4/set-status', function(req, res){
    var appp4reviewstatus = req.session.data['registration4--review-status']

    if (appp4reviewstatus == 'Decision made') {
      res.redirect(v + 'registration-4/set-eligibility')
    } else if ((appp4reviewstatus == 'Needs review') || (appp4reviewstatus == 'Awaiting information') || (appp4reviewstatus == 'Re-register')){
      res.redirect(v + 'registration-4/set-notes')
    } else {
      res.redirect(v + 'registration-4/registration')
    }
  })

  // update eligibility status 
  router.post(v + 'registration-4/set-eligibility', function(req, res){
    var appp4fundingstatus = req.session.data['registration4--funding-status']

    if (appp4fundingstatus == 'No') {
      res.redirect(v + 'registration-4/set-ineligible-reason')
    } else {
      res.redirect(v + 'registration-4/set-notes')
    } 
  })

  router.get('/registrations', function(req, res){
    res.redirect(v + 'registrations')
  })

  router.get('/registrations-review', function(req, res){
    res.redirect(v + 'registrations-review')
  })



  // add another adjustment
  router.post(v + 'adjustment-added', function(req, res){
    var addAnotherAdjustment = req.body.doYouNeedToAddAnotherAdjustment;

    if (addAnotherAdjustment === 'No') {
      res.redirect(v + 'finance-statement-aa');
    } else {
      res.redirect(v + 'add-another');
    }
  });

  // Dashboard navigation
  router.get('/dashboard', function(req, res){
    res.redirect(v + 'dashboard')
  })

  // Applications navigation
  router.get('/applications', function(req, res){
    res.redirect(v + 'applications')
  })

  // Courses navigation
  router.get('/courses', function(req, res){
    res.redirect(v + 'courses')
  })

  // Users navigation
  router.get('/users', function(req, res){
    res.redirect(v + 'users')
  })

  // Finance navigation
  router.get('/finance', function(req, res){
    res.redirect(v + 'finance')
  })

   // Workplaces navigation
  router.get('/workplaces', function(req, res){
    res.redirect(v + 'workplaces')
  })

  // Providers navigation
  router.get('/course-providers', function(req, res){
    res.redirect(v + 'course-providers')
  })

  // Delivery partners navigation
  router.get('/delivery-partners', function(req, res){
    res.redirect(v + 'delivery-partners')
  })

  // Settings navigation
  router.get('/settings', function(req, res){
    res.redirect(v + 'settings')
  })
  
  
}