const _ = require('lodash')

// version
var v = '/v1/'

// Add your routes here
var funded = "yes"
var locationt = "Yes" // Works in England
var settingt = "A school"
var whichschoolt = "public"
var nurserysettingt = "Local authority-maintained nursery"
var mentort = "Other"
var npqt = "Headship"
var hasurnt = "no"

module.exports = router => {
// ------------
// DfE Identity in/out links 
// ------------

  // Redirect from Identity prototype - NPQ create account
  router.get(v + 'user-research/npq/new-user', (req, res) => {
    const data = req.session.data
    data.signedIn = 'true'
    res.redirect(v + 'course-start') 
  })

  // Redirect from Identity prototype - NPQ show account
    router.get(v + 'user-research/npq/existing-user', (req, res) => {
    const data = req.session.data
    data.signedIn = 'true'
    res.redirect(v + 'registration-status/registration-status')
  })

  // Redirect from Identity prototype - Closed state - sign up to email  
  router.get(v + 'user-research/npq/closed-eoi', (req, res) => {
    const data = req.session.data
    data.signedIn = 'true'
    data.closedState = 'Partial'
    data.closedEoi = 'True'
    res.redirect(v + 'closed/eoi-senco-interest')
  })

  // Redirect from Identity prototype - Closed state - sign in  
  router.get(v + 'user-research/npq/closed-signin', (req, res) => {
    const data = req.session.data
    data.signedIn = 'true'
    data.closedState = 'Partial'
    data.closedSignin = 'True'
    res.redirect(v + 'registration-status/registration-status')
  })

  router.get(v + 'auth/return-to-service', (req, res) => {
    res.redirect(req.session.data.returnToService)
  })

  // Just submitted - show success message 
  router.get(v + 'submit', (req, res) => {
    const data = req.session.data
    data.submittedNow = 'True'
    res.redirect(v + 'registration-status/registration-status')
  })

  // -----------------
  //  Set closed states 
  // -----------------

  // Closed state - partial
  router.get(v + 'closed-for-registations', (req, res) => {
    const data = req.session.data
    data.closedState = 'Partial'
    res.redirect(v + 'start-id')
  })

  // Closed state - full 
  router.get(v + 'closed-fully', (req, res) => {
    const data = req.session.data
    data.closedState = 'Full'
    res.redirect(v + 'start-id')
  })

  // Closed state - Remove any closed states
  router.get(v + 'start-page', (req, res) => {
    const data = req.session.data
    data.closedState = ''
    res.redirect(v + 'start-id')
  })

  // Closed state - Header link 
  router.get(v + 'header-link', function (req, res) {

    let closedState = req.session.data.closedState
  
    if (closedState === 'full') {
        res.redirect(v + 'start-id')
      } else if (closedState === 'partial'){
        res.redirect(v + 'registrations-closed')
      } else {
      res.redirect(v + 'course-start')
    }
  })

  // -----------------
  //  Set the number of registrations  
  // -----------------

  // 0 registrations 
    router.get(v + 'no-registrations', (req, res) => {
      const data = req.session.data
      data.numberOfRegistrations = '0'
      res.redirect(v + '')
    })
  // 1 registration
    router.get(v + 'one-registration', (req, res) => {
      const data = req.session.data
      data.numberOfRegistrations = '1'
      res.redirect(v + '')
    })
  // >1 registration
  router.get(v + 'multiple-registrations', (req, res) => {
    const data = req.session.data
    data.numberOfRegistrations = '3'
    res.redirect(v + '')
  })

  // Redirect to correct account page if have 0,1 or >1 registrations

  router.get(v + 'registration-status', function (req, res) {

    let numberOfRegistrations = req.session.data.numberOfRegistrations
  
    if (numberOfRegistrations === '0') {
        res.redirect(v + 'registration-status/no-registrations')
      } else if (numberOfRegistrations === '1') {
        res.redirect(v + 'registration-status/registration-status')
      } else {
        res.redirect(v + 'registration-status/multiple-registrations')
    }
  })

// ------------
// Registration flow  
// ------------

  router.post(v + 'where-do-you-work', function(req, res){
    var choosenpqprovidert = req.session.data['choosenpqprovider']

    if (choosenpqprovidert == 'no') {
      res.redirect(v + 'choose-an-npq-and-provider')
    } else {
      res.redirect(v + 'where-do-you-work')
    }
  })

  // Does the user work in England and a state funded school?
  router.post(v + 'where-school', function (req, res) {
    locationt = req.session.data['wheredoyouwork']
    settingt = req.session.data['whichsetting']

    if (locationt == "Yes"){
      if (settingt == "Early years or childcare") {
        res.redirect(v + 'eyll/nursery-type')
      } else if (settingt =='Other'){
        res.redirect(v + 'other/employment')
      }
      else{
        res.redirect(v + 'where-school')
      }
    } else {
      res.redirect(v + 'choose-npq')
      funded = "no"
    }
  })

  // Does the user work in a state or private childcare setting?
  router.post(v + 'check-data/_nursery-check', function (req, res){
    nurserysettingt = req.session.data['nurserysetting']

    if (nurserysettingt == 'Pre-school class or nursery that’s part of a school (maintained or independent)' || nurserysettingt == 'Local authority-maintained nursery') {
      res.redirect(v + 'where-school')
    } else if (nurserysettingt == 'Private nursery' || nurserysettingt == 'Another early years setting') {
      res.redirect(v + 'eyll/do-you-have-urn')
    }
  })

  // Does the school have a URN?
  router.post(v + 'eyll/find-early-years', function(req, res){
    hasurnt = req.session.data['haveurn']
    
    if (hasurnt == 'Yes'){
      res.redirect(v + 'eyll/find-early-years')
    } else {
      res.redirect(v + 'choose-npq')
    }
  })

  // Is the user a mentor?
  router.post(v + 'other/role', function (req, res){
    mentort = req.session.data['mentor']
    
    if (mentort == 'As a lead mentor for an accredited initial teacher training (ITT) provider') {
      res.redirect(v + 'other/find-itt')
    } else {
      res.redirect(v + 'other/role')
    }
  })

// -------------------------------------------------------------------------------------
// FUNDING OUTCOMES 
// After completing questions - takes user to a page with the funding outcome
// -------------------------------------------------------------------------------------

// Does the user work in England and checks all other funding requirements
router.post(v + 'check-data/_funding-check', function(req, res){
  npqt = req.session.data['choosenpq']
  whichschoolt = req.session.data['whichschool']
  
  // Selects Maths
  if(npqt == 'Leading primary mathematics'){
    res.redirect(v + 'maths/maths-eligibility-teaching-for-mastery')
  }
  // Selects EHCO
  else if(npqt == 'Early headship coaching offer'){
    res.redirect(v + 'ehco/ehco-completed-npqh')
  } 
  // Works in England
  else if(locationt == 'Yes'){
    // Works in a school setting or a state-funded nursery?
    if(settingt == 'A school' || settingt == 'An academy trust' || settingt == 'A 16 to 19 educational setting'){
      // Private school
      if(whichschoolt == 'private' || whichschoolt =='Private'){
        res.redirect(v + 'funding/funding-not-available-setting')
      }
      else {
        res.redirect(v + 'funding/funding-eligible')
      }
    } 
    // Other
    else if(settingt == 'Other'){
      // Is a mentor?
      if (mentort == 'As a lead mentor for an accredited initial teacher training (ITT) provider') {
        if(npqt == 'Leading teacher development'){
          res.redirect(v + 'funding/funding-eligible')
        }
        // A mentor NOT doing NPQLTD
        else {
          res.redirect(v + 'funding/funding-not-available-lead-mentor')
        }
      }
      else {
        res.redirect(v + 'funding/edge-case')
      }
    }
    // Private nursery, with URN + NPQEYL
    else if(settingt == 'Early years or childcare'){
      if (nurserysettingt == "Local authority-maintained nursery" || nurserysettingt == 'Pre-school class or nursery that’s part of a school (maintained or independent)') {
        res.redirect(v + 'funding/funding-eligible')
      }
      else if(hasurnt == 'Yes' && npqt == 'Early years leadership'){
        res.redirect(v + 'funding/funding-eligible')
      }
      // Private nursery, with URN not NPQEYL
      else if(hasurnt == 'Yes' && npqt != 'Early years leadership'){
        res.redirect(v + 'funding/funding-not-available-setting')
      }
      // Private nursery, no URN
      else if(hasurnt == 'No'){
        res.redirect(v + 'funding/funding-not-available-setting')
      }
    }
  }
  // Outside of England
  else {
    res.redirect(v + 'funding/funding-not-available-england')
  }
})

// Applying for EHCO + completing NPQH
router.post(v + 'ehco/ehco-headteacher', function (req, res){
  var earlyheadship = req.session.data['completednpqh']

  if (earlyheadship == 'None of the above') {
    res.redirect(v + 'ehco/ehco-cannot-register')
  } else {
    res.redirect(v + 'ehco/ehco-headteacher')
  }
})

// Applying for EHCO + not a headteacher
router.post(v + 'ehco/ehco-early-headship', function(req, res){
  var headteachert = req.session.data['headteachers']

  if(headteachert == 'No'){
    res.redirect(v + 'funding/ehco-not-funded')
  } else {
    res.redirect(v + 'ehco/ehco-early-headship')
  }
})

// Applying for EHCO + not early headship
router.post(v + 'funding/ehco-funded', function(req, res){
  var earlyheadshipt = req.session.data['earlyheadship']

  if (locationt == 'Yes') {
    if(earlyheadshipt == 'No'){
      res.redirect(v + 'funding/ehco-not-funded')
    } else {
      if(settingt == 'A school' || settingt == 'An academy trust' || settingt == 'A 16 to 19 educational setting'){
        res.redirect(v + 'funding/ehco-funded')
      } else if(settingt == 'Early years or childcare'){
        if(nurserysettingt == "Local authority-maintained nursery" || nurserysettingt == 'Pre-school class or nursery that’s part of a school (maintained or independent)') {
          res.redirect(v + 'funding/ehco-funded')
        } else {
          res.redirect(v + 'funding/ehco-not-funded')
        }
      } else if(settingt == 'Other'){
        if(mentort == "As a lead mentor for an accredited initial teacher training (ITT) provider"){
          res.redirect(v + 'funding/ehco-not-funded')
        } else {
          res.redirect(v + 'choose-provider')
        }
      }
      else {
        res.redirect(v + 'funding/ehco-not-funded')
      }
    }
  } else {
    res.redirect(v + 'funding/funding-not-available-england')
  }
})

// Maths - mastery answer
router.post(v + 'maths-mastery-outcome', function(req, res){
  var mathsmasteryt = req.session.data['mathsmastery']

  if(mathsmasteryt == 'No'){
    res.redirect(v + 'maths/maths-eligibility-other')
  }
  // Works in England
  else if(locationt == 'Yes'){
    // Works in a school setting or a state-funded nursery?
    if(settingt == 'A school' || settingt == 'An academy trust' || settingt == 'A 16 to 19 educational setting'){
      if((whichschoolt != 'private' || whichschoolt !='Private')){
        res.redirect(v + 'funding/funding-eligible-maths')
      }
      // Private school
      else {
        res.redirect(v + 'funding/funding-not-available-setting')
      }
    } 
    // Other
    else if(settingt == 'Other'){
      // Is a mentor?
      if (mentort == 'As a lead mentor for an accredited initial teacher training (ITT) provider') {
        res.redirect(v + 'funding/funding-not-available-lead-mentor')
      }
      else {
        res.redirect(v + 'funding/edge-case')
      }
    }
    // Private nursery, with URN + NPQEYL
    else if(settingt == 'Early years or childcare'){
      if (nurserysettingt == "Local authority-maintained nursery" || nurserysettingt == 'Pre-school class or nursery that’s part of a school (maintained or independent)') {
        res.redirect(v + 'funding/funding-eligible')
      }
      // Private nursery
      else {
        res.redirect(v + 'funding/funding-not-available-setting')
      }
    }
  }
  // Outside of England
  else {
    res.redirect(v + 'funding/funding-not-available-england')
  }
})

// Maths - other mastery route
router.post(v + 'maths-other-outcome', function(req, res){
  var mathsothert = req.session.data['mathsmasteryother']

  if(mathsothert == 'No'){
    res.redirect(v + 'maths/maths-cannot-register')
  }
  // Works in England
  else if(locationt == 'Yes'){
    // Works in a school setting or a state-funded nursery?
    if(settingt == 'A school' || settingt == 'An academy trust' || settingt == 'A 16 to 19 educational setting'){
      if((whichschoolt != 'private' || whichschoolt !='Private')){
        res.redirect(v + 'funding/funding-eligible-maths')
      }
      // Private school
      else {
        res.redirect(v + 'funding/funding-not-available-setting')
      }
    } 
    // Other
    else if(settingt == 'Other'){
      // Is a mentor?
      if (mentort == 'As a lead mentor for an accredited initial teacher training (ITT) provider') {
        res.redirect(v + 'funding/funding-not-available-lead-mentor')
      }
      else {
        res.redirect(v + 'funding/edge-case')
      }
    }
    // Private nursery, with URN + NPQEYL
    else if(settingt == 'Early years or childcare'){
      if (nurserysettingt == "Local authority-maintained nursery" || nurserysettingt == 'Pre-school class or nursery that’s part of a school (maintained or independent)') {
        res.redirect(v + 'funding/funding-eligible-maths')
      }
      // Private nursery
      else {
        res.redirect(v + 'funding/funding-not-available-setting')
      }
    }
  }
  // Outside of England
  else {
    res.redirect(v + 'funding/funding-not-available-england')
  }
})

}
