/*

Provide default values for user session data. These are automatically added
via the `autoStoreData` middleware. Values will only be added to the
session if a value doesn't already exist. This may be useful for testing
journeys where users are returning or logging in to an existing application.

============================================================================

Example usage:

"full-name": "Sarah Philips",

"options-chosen": [ "foo", "bar" ]

============================================================================

*/

module.exports = {

  // Insert values here
  'dia': 'DfE Identity account',


  // For admin console 
  // Applicant 1
  'applicant1--name': 'Jorge Hund',
  'applicant1--email': 'jorge@example.com',
  'applicant1--referred': 'No',
  'applicant1--employment-type': 'Supply teacher',
  'applicant1--employer': 'York council',
  'applicant1--role': 'PE teacher',
  'applicant1--course': 'NPQ Leading teacher development (NPQLTD)',
  'applicant1--provider': 'LLSE',
  'applicant1--review-status': 'Needs review',
  'applicant1--funding-status': '–',
  'applicant1--ineligible-reason': '',
  'applicant1--ineligible-reason--other': '',
  'applicant1--ineligible-reason--establishment': '',
  'applicant1--provider-status': 'Pending',
  'applicant1--notes': '',
  'applicant1--submitted-date': '9 Jul 2024 3:45pm',
  'applicant1--updated-date': '9 Jul 2024 3:45pm',
  'applicant1--participant-id': '20558b2a-db55-40e0-ae99-ff02f9065ef2',
  'applicant1--applicant-id': '20558b2a-db55-40e0-ae99-ff02f9065ef2',

  // Applicant 2
  'applicant2--name': 'Shahira Donald',
  'applicant2--email': 'sd@example.com',
  'applicant2--referred': 'Yes',
  'applicant2--employment-type': '',
  'applicant2--employer': '',
  'applicant2--role': '',
  'applicant2--course': 'NPQ Executive leadership (NPQEL)',
  'applicant2--provider': 'Church of England',
  'applicant2--review-status': 'Needs review',
  'applicant2--funding-status': '–',
  'applicant2--ineligible-reason': '',
  'applicant2--ineligible-reason--other': '',
  'applicant2--ineligible-reason--establishment': '',
  'applicant2--provider-status': 'Pending',
  'applicant2--notes': '',
  'applicant2--submitted-date': '8 Jul 2024 10:21pm',
  'applicant2--updated-date': '8 Jul 2024 10:21pm',
  'applicant2--participant-id': '50558b2a-db55-40e0-ae99-ff02f9065ef7',
  'applicant2--applicant-id': '50558b2a-db55-40e0-ae99-ff02f9065ef7',

  // Applicant 3
  'applicant3--name': 'Lynne Howe',
  'applicant3--email': 'l.howe@example.com',
  'applicant3--referred': 'No',
  'applicant3--employment-type': 'Virtual school',
  'applicant3--employer': 'A1 school',
  'applicant3--role': 'Math teacher',
  'applicant3--course': 'NPQ Leading primary mathematics (NPQLPM)',
  'applicant3--provider': 'Teach First',
  'applicant3--review-status': 'Awaiting information',
  'applicant3--funding-status': '–',
  'applicant3--ineligible-reason': '',
  'applicant3--ineligible-reason--other': '',
  'applicant3--ineligible-reason--establishment': '',
  'applicant3--provider-status': 'Pending',
  'applicant3--notes': '10/04: JD Requested more info on place of work and location. 8/04: AB looks eligible but need to check school.',
  'applicant3--submitted-date': '4 Jul 2024 3:45pm',
  'applicant3--updated-date': '6 Jul 2024 13:18pm',
  'applicant3--participant-id': '50558b2a-db55-40e0-ae99-ff02f9065ef7',
  'applicant3--applicant-id': '50558b2a-db55-40e0-ae99-ff02f9065ef7',

  // Applicant 4
  'applicant4--name': 'Annamaria Green',
  'applicant4--email': 'annamaria.green@example.com',
  'applicant4--referred': 'No',
  'applicant4--employment-type': 'Young offender institution',
  'applicant4--employer': 'Deer River Institute',
  'applicant4--role': '',
  'applicant4--course': 'NPQ Leading literacy (NPQL)',
  'applicant4--provider': 'Ambition Institute',
  'applicant4--review-status': 'Needs review',
  'applicant4--funding-status': '–',
  'applicant4--ineligible-reason': '',
  'applicant4--ineligible-reason--other': '',
  'applicant4--ineligible-reason--establishment': '',
  'applicant4--provider-status': 'Pending',
  'applicant4--notes': '12/04: AB Not eligible - in support role, not teaching.',
  'applicant4--submitted-date': '5 Jul 2024 2:39pm',
  'applicant4--updated-date': '6 Jul 2024 12:55pm',
  'applicant4--participant-id': '50558b2a-db55-40e0-ae99-ff02f9065ef7',
  'applicant4--applicant-id': '50558b2a-db55-40e0-ae99-ff02f9065ef7'
}
