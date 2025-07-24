const _ = require('lodash')

// version
var v = '/v3/'

module.exports = router => {

  // ------------
// DfE Identity in/out links
       // only work for most recent version so identity prototype doesn't have to be updated each time. 
// ------------

  // Redirect from Identity prototype - NPQ create account
  router.get('/user-research/npq/new-user', (req, res) => {
    const data = req.session.data
    data.signedIn = 'true'
    res.redirect(v + 'v3/course-start') 
  })


  // Redirect from Identity prototype - NPQ show account
    router.get('/user-research/npq/existing-user', (req, res) => {
    const data = req.session.data
    data.signedIn = 'true'
    res.redirect(v + 'registration-status/registration-status')
  })

  // Redirect from Identity prototype - Closed state - sign up to email  
  router.get('/user-research/npq/closed-eoi', (req, res) => {
    const data = req.session.data
    data.signedIn = 'true'
    data.closedState = 'Partial'
    data.closedEoi = 'True'
    res.redirect(v + 'closed/eoi-senco-interest')
  })

  // Redirect from Identity prototype - Closed state - sign in  
  router.get('/user-research/npq/closed-signin', (req, res) => {
    const data = req.session.data
    data.signedIn = 'true'
    data.closedState = 'Partial'
    data.closedSignin = 'True'
    res.redirect(v + 'registration-status/registration-status')
  })

  router.get('/auth/return-to-service', (req, res) => {
    res.redirect(req.session.data.returnToService)
  })

  router.get('/npq-account', (req, res) => {
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

    // Closed state - Header link 
    router.get(v + 'registration-status/header-link', function (req, res) {

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

  router.get(v + 'registration-account', function (req, res) {

    let numberOfRegistrations = req.session.data.numberOfRegistrations
  
    if (numberOfRegistrations === '0') {
        res.redirect(v + 'registration-status/no-registrations')
      } else if (numberOfRegistrations === '1') {
        res.redirect(v + 'registration-status/registration-status')
      } else {
        res.redirect(v + 'registration-status/multiple-registrations')
    }
  })

  router.get(v + 'registration-status/registration-account', function (req, res) {

    let numberOfRegistrations = req.session.data.numberOfRegistrations
  
    if (numberOfRegistrations === '0') {
        res.redirect(v + 'registration-status/no-registrations')
      } else if (numberOfRegistrations === '1') {
        res.redirect(v + 'registration-status/registration-status')
      } else {
        res.redirect(v + 'registration-status/multiple-registrations')
    }
  })

  // Just submitted - show success message 
  router.get(v + 'submit', (req, res) => {
    const data = req.session.data
    data.submittedNow = 'True'
    res.redirect(v + 'registration-status/registration-status')
  })

// ------------
// Registration flow  
// ------------
  
  router.post(v + 'chosen', function(req, res){
    var startdatet = req.session.data['startdate']

    if (startdatet == 'no') {
      res.redirect(v + 'apply-later')
    } else {
      res.redirect(v + 'chosen')
    }
  })

  router.post(v + 'route-where-do-you-work', function(req, res){
    var choosenpqprovidert = req.session.data['choosenpqprovider']

    if (choosenpqprovidert == 'no') {
      res.redirect(v + 'choose-an-npq-and-provider')
    } else {
      res.redirect(v + 'where-do-you-work')
    }
  })

  // Does the user work in England and a state funded school?
  router.post(v + 'where-school', function (req, res) {
    var locationt = req.session.data['wheredoyouwork']
    var settingt = req.session.data['whichsetting']

    if (locationt == "Yes"){
      if (settingt == "Early years or childcare") {
        res.redirect(v + 'eyll/nursery-type')
      } 
      else if (settingt == "Another setting"){
        res.redirect(v + 'other/employment')
      } 
      else if (settingt == "Other"){
        res.redirect(v + 'return-to-teaching')
      } 
      else {
        res.redirect(v + 'where-school')
      }
    } else {
      res.redirect(v + 'choose-npq')
      funded = "no"
    }
  })

  // Does the user work in a state or private childcare setting?
  router.post(v + 'eyll/nursery-type', function (req, res){
    var nurserysettingt = req.session.data['nurserysetting']

    if (nurserysettingt == 'Pre-school class or nursery that’s part of a school (maintained or independent)' || nurserysettingt == 'Local authority-maintained nursery') {
      res.redirect(v + 'where-school')
    } else {
      res.redirect(v + 'eyll/do-you-have-urn')
    }
  })

  // Does the school have a URN?
  router.post(v + 'eyll/find-early-years', function(req, res){
    var hasurnt = req.session.data['haveurn']
    
    if (hasurnt == 'Yes'){
      res.redirect(v + 'eyll/find-early-years')
    } else {
      res.redirect(v + 'choose-npq')
    }
  })

  // Is the user a mentor?
  router.post(v + 'other/role', function (req, res){
    var mentort = req.session.data['mentor']
    
    if (mentort == 'As a lead mentor for an accredited initial teacher training (ITT) provider') {
      res.redirect(v + 'other/find-itt')
    } 
    else if (mentort == 'Other') {
      res.redirect(v + 'choose-npq')
    } 
    else if (mentort == 'In a hospital school' || mentort == 'In a young offender institution') {
      res.redirect(v + 'other/employer')
    } 
    else {
      res.redirect(v + 'other/role')
    }
  })

  // -------------------------------------------------------------------------------------
  // FUNDING OUTCOMES 
  // After completing questions - takes user to a page with the funding outcome
  // -------------------------------------------------------------------------------------

  // Does the user work in England and checks all other funding requirements
  router.post(v + 'check-data/_funding-check', function(req, res){
    var npqt = req.session.data['choosenpq']
    var teachadvisoryt = req.session.data['teachadvisory']
    var locationt = req.session.data['wheredoyouwork']
    var settingt = req.session.data['whichsetting']
    var whichschoolt = req.session.data['whichschool']
    var mentort = req.session.data['mentor']
    var nurserysettingt = req.session.data['nurserysetting']
    var hasurnt = req.session.data['haveurn']
    var urnt = req.session.data['urn']
    
    // Selects SENCO
    if(npqt == 'Special educational needs co-ordinator (SENCO)'){
      res.redirect(v + 'senco/senco-in-role')
    }
    // Selects Maths
    else if(npqt == 'Leading primary mathematics'){
      res.redirect(v + 'maths/maths-eligibility-teaching-for-mastery')
    }
    // Selects EHCO
    else if(npqt == 'Early headship coaching offer'){
      res.redirect(v + 'ehco/ehco-completed-npqh')
    } 

    // Works in England
    else if(locationt == 'Yes'){

      // ----------
      // ---- Headship course ----
      // ----------
      if(npqt == 'Headship'){
        // Works in a school, FE or academy setting
        if(settingt == 'A school' || settingt == 'An academy trust' || settingt == 'A 16 to 19 educational setting'){
          // Private school
          if(whichschoolt == 'private' || whichschoolt =='Private'){
            res.redirect(v + 'funding/funding-not-available-setting')
          }
          else {
            res.redirect(v + 'funding/funding-eligible')
          }
        } 
        // Another setting
        else if(settingt == 'Another setting'){
          // Is a ITT mentor?
          if (mentort == 'As a lead mentor for an accredited initial teacher training (ITT) provider') {
            res.redirect(v + 'funding/funding-not-available-lead-mentor')
          }
          // Hospital or young offender 
          else if (mentort == 'In a hospital school' || mentort == 'In a young offender institution'){
            res.redirect(v + 'funding/funding-eligible')
          }
          // virtual school or supply teacher
          else {
            res.redirect(v + 'funding/edge-case')
          }
        }
        // Other
        else if(settingt == 'Other'){
          // Other + not return to teaching 
          if (teachadvisoryt == 'No'){
            res.redirect(v + 'funding/funding-not-available-setting')
          }
          // return to teaching 
          else {
            res.redirect(v + 'funding/edge-case')
          }
        }
        // Works in early years 
        else {
          if (nurserysettingt == "Local authority-maintained nursery" || nurserysettingt == 'Pre-school class or nursery that’s part of a school (maintained or independent)') {
            res.redirect(v + 'funding/funding-eligible')
          }
          // Private nursery, childminder or other EY setting = not eligible for Headship funding
          else {
            res.redirect(v + 'funding/funding-not-available-setting')
          }
        }
      }
      // ----------
      // ---- Any course except Maths, SENCO, Headship, EHCO ----
      // ----------
      else {
        // Works in a school, FE or academy setting
        if(settingt == 'A school' || settingt == 'An academy trust' || settingt == 'A 16 to 19 educational setting'){
          // In eligible school list? (faked with school name, we don't actually check a list in the prototype)
          if(whichschoolt == 'not-pp50' || whichschoolt == 'private' || whichschoolt =='Private'){
            res.redirect(v + 'funding/funding-not-available-not-in-list')
          }
          else {
            res.redirect(v + 'funding/funding-eligible')
          }
        } 
        // Other
        else if(settingt == 'Another setting'){
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
          // Hospital school
          else if (mentort == 'In a hospital school'){
            if(npqt == 'Early years leadership'){
              res.redirect(v + 'funding/edge-case')
            }
            // NOT doing maths, SENCO, headship or EHCO
            else {
              res.redirect(v + 'funding/edge-case')
            }
          }
          // virtual school or supply teacher or Young offender institution
          else {
            // NOT maths, SENCO, headship or EHCO  = ineligible
            res.redirect(v + 'funding/edge-case')
          }
        }
        // Other
        else if(settingt == 'Other'){
          if(teachadvisoryt == "No"){
            res.redirect(v + 'funding/funding-not-available-setting')
          } 
          // return to teaching 
          else {
            res.redirect(v + 'funding/edge-case')
          }
        }
        // Early years setting
        else {
          // early years NPQ
          if(npqt == 'Early years leadership'){
            // all childminders with Ofsted URN = eligible for EYL NPQ
            if (nurserysettingt == "As a childminder") {
              // no Ofsted URN
              if(hasurnt == 'No'){
                res.redirect(v + 'funding/funding-not-available-no-ofsted')
              }
              else {
                res.redirect(v + 'funding/funding-eligible')
              }
            }
            else {
              // In eligible EY list? (faked with school name, we don't actually check a list in the prototype)
              if(whichschoolt == 'not-pp50'){
                res.redirect(v + 'funding/funding-not-available-not-in-list')
              }
              // Private nursery, with no Ofsted URN
              else if(hasurnt == 'No'){
                res.redirect(v + 'funding/funding-not-available-no-ofsted')
              }
              else if(urnt == 'not-pp50'){
                res.redirect(v + 'funding/funding-not-available-not-in-list')
              }
              else {
                res.redirect(v + 'funding/funding-eligible')
              }
            }
          }
          // NOT EYL, maths, SENCO, headship or EHCO
          else {
            if (nurserysettingt == "Local authority-maintained nursery" || nurserysettingt == 'Pre-school class or nursery that’s part of a school (maintained or independent)') {
              if(whichschoolt == 'not-pp50'){
                res.redirect(v + 'funding/funding-not-available-not-in-list')
              }
              else {
                res.redirect(v + 'funding/funding-eligible')
              }
            }
            // Private nursery, with no Ofsted URN
            else if(hasurnt == 'No'){
              res.redirect(v + 'funding/funding-not-available-no-ofsted')
            }
            // private nursery, childminder, other EY setting = ineligible 
            else {
              res.redirect(v + 'funding/funding-not-available-setting')
            }
          }
        }
      }
    }
    // Outside of England
    else {
      res.redirect(v + 'funding/funding-not-available-england')
    }
  })

  // ----------
  // ---- EHCO course ----
  // ----------

  // Applying for EHCO completing NPQH
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

  // Applying for EHCO 
  router.post(v + 'funding/ehco-funded', function(req, res){
    var locationt = req.session.data['wheredoyouwork']
    var earlyheadshipt = req.session.data['earlyheadship']
    var teachadvisoryt = req.session.data['teachadvisory']
    var settingt = req.session.data['whichsetting']
    var nurserysettingt = req.session.data['nurserysetting']
    var mentort = req.session.data['mentor']
    var whichschoolt = req.session.data['whichschool']

    if (locationt == 'Yes') {
      // not early headship
      if(earlyheadshipt == 'No'){
        res.redirect(v + 'funding/ehco-not-funded')
      } 
      else {
        if(settingt == 'A school' || settingt == 'An academy trust' || settingt == 'A 16 to 19 educational setting'){
          // Private school
          if(whichschoolt == 'private' || whichschoolt =='Private'){
            res.redirect(v + 'funding/funding-not-available-setting')
          } else {
            res.redirect(v + 'funding/ehco-funded')
          }
        } 
        else if(settingt == 'Early years or childcare'){
          if(nurserysettingt == "Local authority-maintained nursery" || nurserysettingt == 'Pre-school class or nursery that’s part of a school (maintained or independent)') {
            res.redirect(v + 'funding/ehco-funded')
          } else {
            res.redirect(v + 'funding/ehco-not-funded')
          }
        } 
        else if(settingt == 'Another setting'){
          if(mentort == "As a lead mentor for an accredited initial teacher training (ITT) provider"){
            res.redirect(v + 'funding/ehco-not-funded')
          } 
          else if (mentort == 'In a hospital school' || mentort == 'In a young offender institution'){
            res.redirect(v + 'funding/funding-eligible')
          }
          // virtual school or local authority
          else {
            res.redirect(v + 'funding/edge-case')
          }
        }
        else if(settingt == 'Other'){
          if(teachadvisoryt == "No"){
            res.redirect(v + 'funding/ehco-not-funded')
          } 
          // return to teaching 
          else {
            res.redirect(v + 'funding/edge-case')
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

  // ----------
  // ---- Maths course ----
  // ----------

  // Maths - mastery answer
  router.post(v + 'maths-mastery-outcome', function(req, res){
    var mathsmasteryt = req.session.data['mathsmastery']
    var locationt = req.session.data['wheredoyouwork']
    var teachadvisoryt = req.session.data['teachadvisory']
    var settingt = req.session.data['whichsetting']
    var whichschoolt = req.session.data['whichschool']
    var mentort = req.session.data['mentor']
    var nurserysettingt = req.session.data['nurserysetting']

    if(mathsmasteryt == 'No'){
      res.redirect(v + 'maths/maths-eligibility-other')
    }
    // Works in England
    else if(locationt == 'Yes'){
      // Works in a school setting or a state-funded nursery?
      if(settingt == 'A school' || settingt == 'An academy trust' || settingt == 'A 16 to 19 educational setting'){
        if((whichschoolt != 'private' || whichschoolt !='Private')){
          res.redirect(v + 'funding/funding-eligible')
        }
        // Private school
        else {
          res.redirect(v + 'funding/funding-not-available-setting')
        }
      } 
      // Another setting
      else if(settingt == 'Another setting'){
        if(mentort == "As a lead mentor for an accredited initial teacher training (ITT) provider"){
          res.redirect(v + 'funding/funding-not-available-lead-mentor')
        } 
        else if (mentort == 'In a hospital school' || mentort == 'In a young offender institution'){
          res.redirect(v + 'funding/funding-eligible')
        }
        // virtual school or local authority
        else {
          res.redirect(v + 'funding/edge-case')
        }
      }
      // Other
      else if(settingt == 'Other'){
        if(teachadvisoryt == "No"){
          res.redirect(v + 'funding/funding-not-available-setting')
        } 
        // return to teaching 
        else {
          res.redirect(v + 'funding/edge-case')
        }
      }
      // State nursery
      else {
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
    var locationt = req.session.data['wheredoyouwork']
    var teachadvisoryt = req.session.data['teachadvisory']
    var settingt = req.session.data['whichsetting']
    var whichschoolt = req.session.data['whichschool']
    var mentort = req.session.data['mentor']
    var nurserysettingt = req.session.data['nurserysetting']

    if(mathsothert == 'No'){
      res.redirect(v + 'maths/maths-cannot-register')
    }
    // Works in England
    else if(locationt == 'Yes'){
      // Works in a school setting or a state-funded nursery?
      if(settingt == 'A school' || settingt == 'An academy trust' || settingt == 'A 16 to 19 educational setting'){
        if((whichschoolt != 'private' || whichschoolt !='Private')){
          res.redirect(v + 'funding/funding-eligible')
        }
        // Private school
        else {
          res.redirect(v + 'funding/funding-not-available-setting')
        }
      } 
      // Another setting
      else if(settingt == 'Another setting'){
        if(mentort == "As a lead mentor for an accredited initial teacher training (ITT) provider"){
          res.redirect(v + 'funding/funding-not-available-lead-mentor')
        } 
        else if (mentort == 'In a hospital school' || mentort == 'In a young offender institution'){
          res.redirect(v + 'funding/funding-eligible')
        }
        // virtual school or local authority
        else {
          res.redirect(v + 'funding/edge-case')
        }
      }
      // Other
      else if(settingt == 'Other'){
        if(teachadvisoryt == "No"){
          res.redirect(v + 'funding/funding-not-available-setting')
        } 
        // return to teaching 
        else {
          res.redirect(v + 'funding/edge-case')
        }
      }
      // State nursery
      else {
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

  // ----------
  // ---- SENCO course ----
  // ----------

  // Senco funding outcome - eligibility rules the same
  // SENCO in role - asks start date question
  router.post(v + 'senco-role', function (req, res){
    var sencoinrole = req.session.data['sencoinrole']
    var locationt = req.session.data['wheredoyouwork']
    var teachadvisoryt = req.session.data['teachadvisory']
    var settingt = req.session.data['whichsetting']
    var whichschoolt = req.session.data['whichschool']
    var mentort = req.session.data['mentor']
    var nurserysettingt = req.session.data['nurserysetting']
    
    if (sencoinrole == 'Yes') {
      res.redirect(v + 'senco/senco-start-date')
    } else {
      // Works in England
      if(locationt == 'Yes'){
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
        // Another setting
        else if(settingt == 'Another setting'){
          if(mentort == "As a lead mentor for an accredited initial teacher training (ITT) provider"){
            res.redirect(v + 'funding/funding-not-available-lead-mentor')
          } 
          else if (mentort == 'In a hospital school' || mentort == 'In a young offender institution'){
            res.redirect(v + 'funding/funding-eligible')
          }
          // virtual school or local authority
          else {
            res.redirect(v + 'funding/edge-case')
          }
        }
        // Other
        else if(settingt == 'Other'){
          if(teachadvisoryt == "No"){
            res.redirect(v + 'funding/funding-not-available-setting')
          } 
          // return to teaching 
          else {
            res.redirect(v + 'funding/edge-case')
          }
        }
        // State nursery
        else {
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
    }
  })

  router.post(v + 'check-data/_senco-funding-check', function(req, res){
    var locationt = req.session.data['wheredoyouwork']
    var teachadvisoryt = req.session.data['teachadvisory']
    var settingt = req.session.data['whichsetting']
    var whichschoolt = req.session.data['whichschool']
    var mentort = req.session.data['mentor']
    var nurserysettingt = req.session.data['nurserysetting']
    
    // Works in England
    if(locationt == 'Yes'){
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
      // Another setting
      else if(settingt == 'Another setting'){
        if(mentort == "As a lead mentor for an accredited initial teacher training (ITT) provider"){
          res.redirect(v + 'funding/funding-not-available-lead-mentor')
        } 
        else if (mentort == 'In a hospital school' || mentort == 'In a young offender institution'){
          res.redirect(v + 'funding/funding-eligible')
        }
        // virtual school or local authority
        else {
          res.redirect(v + 'funding/edge-case')
        }
      }
      // Other
      else if(settingt == 'Other'){
        if(teachadvisoryt == "No"){
          res.redirect(v + 'funding/funding-not-available-setting')
        } 
        // return to teaching 
        else {
          res.redirect(v + 'funding/edge-case')
        }
      }
      // State nursery
      else {
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
}
