const express = require('express')
const router = express.Router()

var funded = "yes"
var locationt = "England"
var settingt = "A school"
var whichschoolt = "public"
var nurserysettingt = "Local authority-maintained nursery"
var mentort = "Other"
var npqt = "NPQLBC"
var hasurnt = "no"
var workinnurseryt = "yes"

// Does the user have a TRN?
router.post('/email', function (req, res) {
  var trnregistered = req.session.data['has-trn']

  if (trnregistered == "no"){
    res.redirect('/get-a-trn')
  } else {
    res.redirect('/email')
  }

})

//Does the user work in England and a state funded school?
router.post('/where-school', function (req, res) {

  locationt = req.session.data['wheredoyouwork']
  settingt = req.session.data['whichsetting']

  if (locationt == "England"){
    if (settingt == "Early years or childcare") {
      res.redirect('/eyll/nursery')
    }else if (settingt =='Other'){
      res.redirect('/other/employment')
    }
    else{
      res.redirect('/where-school')
    }
  } else {
    res.redirect('/choose-npq')
    funded = "no"
  }
})

//User not in a nursery - do they have a URN?
router.post('/eyll/nursery-type', function (req, res){
  workinnurseryt = req.session.data['workinnursery']
  if(workinnurseryt == 'Yes'){
    res.redirect('/eyll/nursery-type')
    funded = 'Yes'
  }else{
    res.redirect('/eyll/do-you-have-urn')
  }
})

//Does the user work in a state or provate childcare setting?
router.post('/check-data/_nursery-check', function (req, res){
  nurserysettingt = req.session.data['nurserysetting']

  if (nurserysettingt == 'Pre-school class that’s part of a school' || nurserysettingt == 'Local authority-maintained nursery') {
    res.redirect('/where-school')
    hasurnt = 'Yes'
  }else if (nurserysettingt == 'Private nursery') {
    res.redirect('/eyll/do-you-have-urn')
  }
})

//Does the school have a URN?
router.post('/eyll/find-early-years', function(req, res){
  hasurnt = req.session.data['haveurn']
  if (hasurnt == 'Yes'){
    res.redirect('/eyll/find-early-years')
  }else {
    res.redirect('/choose-npq')
  }
})

// Is the user a mentor?
router.post('/other/role', function (req, res){
  mentort = req.session.data['mentor']
  if (mentort == 'As a lead mentor for an accredited initial teacher training (ITT) provider') {
    res.redirect('/other/find-itt')
  }else{
    res.redirect('/other/role')
  }
})

//Does the user work in England and checks all other funding requirements?
router.post('/check-data/_funding-check', function(req, res){
  npqt = req.session.data['choosenpq']
  whichschoolt = req.session.data['whichschool']

  if(locationt == 'England'){
    // Works in a school setting or a state-funded nursery?
    if(settingt == 'A school' || settingt == 'An academy trust' || settingt == 'A 16 to 19 educational setting'){
      if(npqt != 'The Early Headship Coaching Offer' && whichschoolt != 'private'){
        res.redirect('/funding/funding-vague')
      }
      //Private school
      else if (whichschoolt == 'private' || whichschoolt =='Private') {
        res.redirect('/funding/funding-not-available')
      }
      //EHCO
      if(npqt == 'The Early Headship Coaching Offer'){
        res.redirect('/ehco/ehco-intro')
      }

  }else if(settingt == 'Other'){
    // Is a mentor doing NPQLTD?
    if(mentort == 'As a lead mentor for an accredited initial teacher training (ITT) provider' && npqt == 'NPQ for Leading Teacher Development (NPQLTD)'){
      res.redirect('funding/funding-vague')
    }
    //Other
    else if(settingt == 'Other' && mentort != 'As a lead mentor for an accredited initial teacher training (ITT) provider'){
      res.redirect('/choose-provider')
    }
  }
    //Private nursery, with URN + NPQEYL
    else if(settingt == 'Early years or childcare'){
      if (nurserysettingt == "Local authority-maintained nursery" || nurserysettingt == 'Pre-school class that’s part of a school') {
        res.redirect('/funding/funding-vague')
      }
      if(hasurnt == 'yes' && npqt == 'NPQ for Early Years Leadership (NPQEYL)'){
      res.redirect('/funding/funding-vague')
    }
    //Private nursery, with URN != NPQEYL
    else if(hasurnt == 'yes' && npqt != 'NPQ for Early Years Leadership (NPQEYL)'){
      res.redirect('/funding/funding-not-available')
    }
    //Private nursery, no URN
    else if(hasurnt == 'no'){
      res.redirect('/funding/funding-not-available')
    }
  }




  }
//Outside of England
  else{
    res.redirect('/funding/funding-not-available')
  }
})

//Applying for EHCO + completing NPQH
router.post('/ehco/ehco-headteacher', function (req, res){
  var completednpqht = req.session.data['completednpqh']
  if (completednpqht == 'no') {
    res.redirect('/ehco/ehco-cannot-register')
  }else{
    res.redirect('/ehco/ehco-headteacher')
  }
})

//Applying for EHCO + not a headteacher
router.post('/ehco/ehco-early-headship', function(req, res){
  var headteachert = req.session.data['headteachers']
  if(headteachert == 'no'){
    res.redirect('/funding/echo-not-funded')
  }else{
    res.redirect('/ehco/ehco-early-headship')
  }
})

//Applying for EHCO + not early headship
router.post('/funding/ehco-funded', function(req, res){
  var earlyheadshipt = req.session.data['earlyheadship']
  if(earlyheadshipt == 'no'){
    res.redirect('/funding/echo-not-funded')
  }else{
    res.redirect('/funding/ehco-funded')
  }
})


module.exports = router