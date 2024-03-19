//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()
require('./routes/id-routes')(router)

// Add your routes here

var funded = "yes"
var locationt = "Yes" // Works in England
var settingt = "A school"
var whichschoolt = "public"
var nurserysettingt = "Local authority-maintained nursery"
var mentort = "Other"
var npqt = "Headship"
var hasurnt = "no"

router.post('/chosen', function(req, res){
  var startdatet = req.session.data['startdate']

  if (startdatet == 'no') {
    res.redirect('/apply-later')
  } else {
    res.redirect('/chosen')
  }
})

router.post('/where-do-you-work', function(req, res){
  var choosenpqprovidert = req.session.data['choosenpqprovider']

  if (choosenpqprovidert == 'no') {
    res.redirect('/choose-an-npq-and-provider')
  } else {
    res.redirect('/where-do-you-work')
  }
})

// Does the user work in England and a state funded school?
router.post('/where-school', function (req, res) {
  locationt = req.session.data['wheredoyouwork']
  settingt = req.session.data['whichsetting']

  if (locationt == "Yes"){
    if (settingt == "Early years or childcare") {
      res.redirect('/eyll/nursery-type')
    } else if (settingt == "Other"){
      res.redirect('/other/employment')
    } else if (settingt == "Returning to teaching"){
      res.redirect('/return-to-teach-advisory-service')
    }
    else{
      res.redirect('/where-school')
    }
  } else {
    res.redirect('/choose-npq')
    funded = "no"
  }
})

// Does the user work in a state or private childcare setting?
router.post('/check-data/_nursery-check', function (req, res){
  nurserysettingt = req.session.data['nurserysetting']

  if (nurserysettingt == 'Pre-school class or nursery that’s part of a school (maintained or independent)' || nurserysettingt == 'Local authority-maintained nursery') {
    res.redirect('/where-school')
  } else if (nurserysettingt == 'Private nursery' || nurserysettingt == 'Another early years setting') {
    res.redirect('/eyll/do-you-have-urn')
  }
})

// Does the school have a URN?
router.post('/eyll/find-early-years', function(req, res){
  hasurnt = req.session.data['haveurn']
  
  if (hasurnt == 'Yes'){
    res.redirect('/eyll/find-early-years')
  } else {
    res.redirect('/choose-npq')
  }
})

// Is the user a mentor?
router.post('/other/role', function (req, res){
  mentort = req.session.data['mentor']
  
  if (mentort == 'As a lead mentor for an accredited initial teacher training (ITT) provider') {
    res.redirect('/other/find-itt')
  } else {
    res.redirect('/other/role')
  }
})

// -------------------------------------------------------------------------------------
// FUNDING OUTCOMES 
// After completing questions - takes user to a page with the funding outcome
// -------------------------------------------------------------------------------------

// Does the user work in England and checks all other funding requirements
router.post('/check-data/_funding-check', function(req, res){
  npqt = req.session.data['choosenpq']
  whichschoolt = req.session.data['whichschool']
  
  // Selects SENCO
  if(npqt == 'Special educational needs co-ordinator (SENCO)'){
    res.redirect('/senco/senco-in-role')
  }
  // Selects Maths
  else if(npqt == 'Leading primary mathematics'){
    res.redirect('/maths/maths-eligibility-teaching-for-mastery')
  }
  // Selects EHCO
  else if(npqt == 'Early headship coaching offer'){
    res.redirect('/ehco/ehco-completed-npqh')
  } 
  // Works in England
  else if(locationt == 'Yes'){
    // Works in a school setting or a state-funded nursery?
    if(settingt == 'A school' || settingt == 'An academy trust' || settingt == 'A 16 to 19 educational setting'){
      // Private school
      if(whichschoolt == 'private' || whichschoolt =='Private'){
        res.redirect('/funding/funding-not-available-setting')
      }
      else {
        res.redirect('/funding/funding-eligible')
      }
    } 
    // Other
    else if(settingt == 'Other'){
      // Is a mentor?
      if (mentort == 'As a lead mentor for an accredited initial teacher training (ITT) provider') {
        if(npqt == 'Leading teacher development'){
          res.redirect('/funding/funding-eligible')
        }
        // A mentor NOT doing NPQLTD
        else {
          res.redirect('/funding/funding-not-available-lead-mentor')
        }
      }
      else if (mentort == 'In a hospital school' || mentort == 'In a young offender institution'){
        res.redirect('/funding/funding-eligible')
      }
      else if (mentort == 'Other'){
        res.redirect('/funding/funding-not-available-setting')
      }
      else {
        res.redirect('/funding/edge-case')
      }
    }
    // Private nursery, with URN + NPQEYL
    else if(settingt == 'Early years or childcare'){
      if (nurserysettingt == "Local authority-maintained nursery" || nurserysettingt == 'Pre-school class or nursery that’s part of a school (maintained or independent)') {
        res.redirect('/funding/funding-eligible')
      }
      else if(hasurnt == 'Yes' && npqt == 'Early years leadership'){
        res.redirect('/funding/funding-eligible')
      }
      // Private nursery, with URN not NPQEYL
      else if(hasurnt == 'Yes' && npqt != 'Early years leadership'){
        res.redirect('/funding/funding-not-available-setting')
      }
      // Private nursery, no URN
      else if(hasurnt == 'No'){
        res.redirect('/funding/funding-not-available-setting')
      }
    }
  }
  // Outside of England
  else {
    res.redirect('/funding/funding-not-available-england')
  }
})

// Applying for EHCO + completing NPQH
router.post('/ehco/ehco-headteacher', function (req, res){
  var earlyheadship = req.session.data['completednpqh']

  if (earlyheadship == 'None of the above') {
    res.redirect('/ehco/ehco-cannot-register')
  } else {
    res.redirect('/ehco/ehco-headteacher')
  }
})

// Applying for EHCO + not a headteacher
router.post('/ehco/ehco-early-headship', function(req, res){
  var headteachert = req.session.data['headteachers']

  if(headteachert == 'No'){
    res.redirect('/funding/ehco-not-funded')
  } else {
    res.redirect('/ehco/ehco-early-headship')
  }
})

// Applying for EHCO + not early headship
router.post('/funding/ehco-funded', function(req, res){
  var earlyheadshipt = req.session.data['earlyheadship']

  if (locationt == 'Yes') {
    if(earlyheadshipt == 'No'){
      res.redirect('/funding/ehco-not-funded')
    } else {
      if(settingt == 'A school' || settingt == 'An academy trust' || settingt == 'A 16 to 19 educational setting'){
        res.redirect('/funding/ehco-funded')
      } else if(settingt == 'Early years or childcare'){
        if(nurserysettingt == "Local authority-maintained nursery" || nurserysettingt == 'Pre-school class or nursery that’s part of a school (maintained or independent)') {
          res.redirect('/funding/ehco-funded')
        } else {
          res.redirect('/funding/ehco-not-funded')
        }
      } else if(settingt == 'Other'){
        if(mentort == "As a lead mentor for an accredited initial teacher training (ITT) provider"){
          res.redirect('/funding/ehco-not-funded')
        } 
        else if (mentort == 'In a hospital school' || mentort == 'In a young offender institution'){
          res.redirect('/funding/funding-eligible')
        }
        else if (mentort == 'Other'){
          res.redirect('/funding/ehco-not-funded')
        }
        else {
          res.redirect('/funding/edge-case')
        }
      }
      else {
        res.redirect('/funding/ehco-not-funded')
      }
    }
  } else {
    res.redirect('/funding/funding-not-available-england')
  }
})

// Maths - mastery answer
router.post('/maths-mastery-outcome', function(req, res){
  var mathsmasteryt = req.session.data['mathsmastery']

  if(mathsmasteryt == 'No'){
    res.redirect('/maths/maths-eligibility-other')
  }
  // Works in England
  else if(locationt == 'Yes'){
    // Works in a school setting or a state-funded nursery?
    if(settingt == 'A school' || settingt == 'An academy trust' || settingt == 'A 16 to 19 educational setting'){
      if((whichschoolt != 'private' || whichschoolt !='Private')){
        res.redirect('/funding/funding-eligible')
      }
      // Private school
      else {
        res.redirect('/funding/funding-not-available-setting')
      }
    } 
    // Other
    else if(settingt == 'Other'){
      // Is a mentor?
      if (mentort == 'As a lead mentor for an accredited initial teacher training (ITT) provider') {
        res.redirect('/funding/funding-not-available-lead-mentor')
      }
      else if (mentort == 'In a hospital school' || mentort == 'In a young offender institution'){
        res.redirect('/funding/funding-eligible')
      }
      else if (mentort == 'Other'){
        res.redirect('/funding/funding-not-available-setting')
      }
      else {
        res.redirect('/funding/edge-case')
      }
    }
    // Private nursery, with URN + NPQEYL
    else if(settingt == 'Early years or childcare'){
      if (nurserysettingt == "Local authority-maintained nursery" || nurserysettingt == 'Pre-school class or nursery that’s part of a school (maintained or independent)') {
        res.redirect('/funding/funding-eligible')
      }
      // Private nursery
      else {
        res.redirect('/funding/funding-not-available-setting')
      }
    }
  }
  // Outside of England
  else {
    res.redirect('/funding/funding-not-available-england')
  }
})

// Maths - other mastery route
router.post('/maths-other-outcome', function(req, res){
  var mathsothert = req.session.data['mathsmasteryother']

  if(mathsothert == 'No'){
    res.redirect('/maths/maths-cannot-register')
  }
  // Works in England
  else if(locationt == 'Yes'){
    // Works in a school setting or a state-funded nursery?
    if(settingt == 'A school' || settingt == 'An academy trust' || settingt == 'A 16 to 19 educational setting'){
      if((whichschoolt != 'private' || whichschoolt !='Private')){
        res.redirect('/funding/funding-eligible')
      }
      // Private school
      else {
        res.redirect('/funding/funding-not-available-setting')
      }
    } 
    // Other
    else if(settingt == 'Other'){
      // Is a mentor?
      if (mentort == 'As a lead mentor for an accredited initial teacher training (ITT) provider') {
        res.redirect('/funding/funding-not-available-lead-mentor')
      }
      else if (mentort == 'In a hospital school' || mentort == 'In a young offender institution'){
        res.redirect('/funding/funding-eligible')
      }
      else if (mentort == 'Other'){
        res.redirect('/funding/funding-not-available-setting')
      }
      else {
        res.redirect('/funding/edge-case')
      }
    }
    // Private nursery, with URN + NPQEYL
    else if(settingt == 'Early years or childcare'){
      if (nurserysettingt == "Local authority-maintained nursery" || nurserysettingt == 'Pre-school class or nursery that’s part of a school (maintained or independent)') {
        res.redirect('/funding/funding-eligible')
      }
      // Private nursery
      else {
        res.redirect('/funding/funding-not-available-setting')
      }
    }
  }
  // Outside of England
  else {
    res.redirect('/funding/funding-not-available-england')
  }
})

// Senco funding outcome - eligibility rules the same

// SENCO in role - asks start date question
router.post('/senco-role', function (req, res){
  sencoinrole = req.session.data['sencoinrole']
  npqt = req.session.data['choosenpq']
  whichschoolt = req.session.data['whichschool']
  
  if (sencoinrole == 'Yes') {
    res.redirect('/senco/senco-start-date')
  } else {
    // Works in England
    if(locationt == 'Yes'){
      // Works in a school setting or a state-funded nursery?
      if(settingt == 'A school' || settingt == 'An academy trust' || settingt == 'A 16 to 19 educational setting'){
        // Private school
        if(whichschoolt == 'private' || whichschoolt =='Private'){
          res.redirect('/funding/funding-not-available-setting')
        }
        else {
          res.redirect('/funding/funding-eligible')
        }
      } 
      // Other
      else if(settingt == 'Other'){
        // Is a mentor?
        if (mentort == 'As a lead mentor for an accredited initial teacher training (ITT) provider') {
          res.redirect('/funding/funding-not-available-lead-mentor')
        }
        else if (mentort == 'In a hospital school' || mentort == 'In a young offender institution'){
          res.redirect('/funding/funding-eligible')
        }
        else if (mentort == 'Other'){
          res.redirect('/funding/funding-not-available-setting')
        }
        else {
          res.redirect('/funding/edge-case')
        }
      }
      // Private nursery, with URN + NPQEYL
      else if(settingt == 'Early years or childcare'){
        if (nurserysettingt == "Local authority-maintained nursery" || nurserysettingt == 'Pre-school class or nursery that’s part of a school (maintained or independent)') {
          res.redirect('/funding/funding-eligible')
        }
        // Private nursery, no URN
        else {
          res.redirect('/funding/funding-not-available-setting')
        }
      }
    }
    // Outside of England
    else {
      res.redirect('/funding/funding-not-available-england')
    }
  }
})

router.post('/check-data/_senco-funding-check', function(req, res){
  npqt = req.session.data['choosenpq']
  whichschoolt = req.session.data['whichschool']
  
  // Works in England
  if(locationt == 'Yes'){
    // Works in a school setting or a state-funded nursery?
    if(settingt == 'A school' || settingt == 'An academy trust' || settingt == 'A 16 to 19 educational setting'){
      // Private school
      if(whichschoolt == 'private' || whichschoolt =='Private'){
        res.redirect('/funding/funding-not-available-setting')
      }
      else {
        res.redirect('/funding/funding-eligible')
      }
    } 
    // Other
    else if(settingt == 'Other'){
      // Is a mentor?
      if (mentort == 'As a lead mentor for an accredited initial teacher training (ITT) provider') {
        res.redirect('/funding/funding-not-available-lead-mentor')
      }
      else if (mentort == 'In a hospital school' || mentort == 'In a young offender institution'){
        res.redirect('/funding/funding-eligible')
      }
      else if (mentort == 'Other'){
        res.redirect('/funding/funding-not-available-setting')
      }
      else {
        res.redirect('/funding/edge-case')
      }
    }
    // Private nursery, with URN + NPQEYL
    else if(settingt == 'Early years or childcare'){
      if (nurserysettingt == "Local authority-maintained nursery" || nurserysettingt == 'Pre-school class or nursery that’s part of a school (maintained or independent)') {
        res.redirect('/funding/funding-eligible')
      }
      // Private nursery, no URN
      else {
        res.redirect('/funding/funding-not-available-setting')
      }
    }
  }
  // Outside of England
  else {
    res.redirect('/funding/funding-not-available-england')
  }
})

/* Since the integration with the GAI prototype,
we don't need this logic anymore

// Does the user have a TRN?
router.post('/email', function (req, res) {
  var trnregistered = req.session.data['has-trn']

  if (trnregistered == "no"){
    res.redirect('/get-a-trn')
  } else {
    res.redirect('https://find-a-lost-trn-prototype.herokuapp.com/user-research/scenario-1')
  }
})

router.post('/ask-questions', function (req, res){
  emailt = req.session.data['email']
  if(emailt == 'email@example.com'){
    res.redirect('/gai/gai-confirm-details')
  }else{
    res.redirect('/ask-questions')
  }
})

router.post('/gai/gai-nino', function(req, res){
  var haveninot = req.session.data['havenino']
  if(haveninot == 'no'){
    res.redirect('/gai/gai-trn')
  }else{
    res.redirect('/gai/gai-nino')
  }
})

router.post('/gai/gai-how-qts', function(req, res){
  var haveqtst = req.session.data['haveqts']
  if (haveqtst == 'No') {
    res.redirect('/gai/gai-answers')
  }else {
    res.redirect('/gai/gai-how-qts')
  }
})


router.post('/check-data/_gai-check', function(req, res){
  var changedetailst = req.session.data['changedetails']
  if(changedetailst == 'yes'){
    res.redirect('/gai/gai-name')
  }else{
      res.redirect('/gai/finish-gai')
  }
})


// Confirm or update details for existing user
router.post('/gai/finish-gai', function(req, res){
  if(emailt == 'nomatch@example.com'){
    res.redirect('/gai/gai-no-match')
  }else {
      res.redirect('/gai/finish-gai')
    }
})

//A user whose details don't match and chooses to proceed or update details
router.post('/check-data/_gai-no-match', function(req, res){
  var changedetailst = req.session.data['changedetails']
  if(changedetailst == "yes"){
    res.redirect('/gai/gai-answers')
  }else {
    res.redirect('/gai/finish-gai')
  }
})
*/

module.exports = router
