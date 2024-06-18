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
  'applicant1--name': 'Annamaria Green',
  'applicant1--email': 'annamaria.green@example.com',
  'applicant1--referred': 'No',
  'applicant1--employment-type': 'In a young offender institution',
  'applicant1--employer': 'Kent county council',
  'applicant1--role': 'Receptionist',
  'applicant1--course': 'Special educational needs co-ordinator (SENCO)',
  'applicant1--provider': 'Ambition Institute',
  'applicant1--review-status': 'Decision made',
  'applicant1--funding-status': 'No',
  'applicant1--ineligible-reason': 'Not in a teaching role',
  'applicant1--ineligible-reason--other': '',
  'applicant1--ineligible-reason--establishment': '',
  'applicant1--provider-status': 'Pending',
  'applicant1--notes': '15/04: NG sent email sent to user to confirm non-eligibility. 12/04: CD Agree not eligible. 11/04: AB Not elgible - in support role, not teaching.',
  'applicant1--submitted-date': '10 Feb 2023 2:30pm',
  'applicant1--updated-date': '12 Feb 2023 12:55pm',
  'applicant1--participant-id': '50558b2a-db55-40e0-ae99-ff02f9065ef7',
  'applicant1--applicant-id': '50558b2a-db55-40e0-ae99-ff02f9065ef7',

  // Applicant 2
  'applicant2--name': 'Lynne Howe',
  'applicant2--email': 'l.howe@example.com',
  'applicant2--referred': 'No',
  'applicant2--employment-type': 'Virtual school',
  'applicant2--employer': 'A1 school',
  'applicant2--role': 'Math teacher',
  'applicant2--course': 'NPQ Leading teacher development (NPQLTD)',
  'applicant2--provider': 'Teach First',
  'applicant2--review-status': 'Awaiting information',
  'applicant2--funding-status': '–',
  'applicant2--ineligible-reason': '',
  'applicant2--ineligible-reason--other': '',
  'applicant2--ineligible-reason--establishment': '',
  'applicant2--provider-status': 'Pending',
  'applicant2--notes': '10/04: JD Requested more info on place of work and location. 8/04: AB looks eligible but need to check school.',
  'applicant2--submitted-date': '8 Apr 2024 3:45pm',
  'applicant2--updated-date': '12 Feb 2023 13:18pm',
  'applicant2--participant-id': '50558b2a-db55-40e0-ae99-ff02f9065ef7',
  'applicant2--applicant-id': '50558b2a-db55-40e0-ae99-ff02f9065ef7'
}
