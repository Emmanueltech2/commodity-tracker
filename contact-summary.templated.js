const extras = require('./nools-extras');
const {
  capitalizeFirstLetter,
  titleCaseLetters,
  pushFieldsToSingleArray,
  getMostRecentReport,
} = extras;

// contact, reports, lineage are globally available for contact-summary
const thisContact = contact;
const thisLineage = lineage;
const allReports = reports;
let allFields = [];
let allCards = [];

const householdMemberFields = [
  {
    appliesToType: ['household_member', 'household_contact'],
    label: 'Name',
    value: thisContact.name || thisContact.display_name,
    width: 4,
  },
  {
    appliesToType: ['household_member', 'household_contact'],
    label: 'Age',
    value: thisContact.date_of_birth,
    filter: 'age',
    width: 4,
  },
  {
    appliesToType: ['household_member', 'household_contact'],
    label: 'Gender',
    value: capitalizeFirstLetter(thisContact.sex),
    width: 4,
  },
  {
    appliesToType: ['household_member', 'household_contact'],
    label: 'Phone',
    value: thisContact.phone || 'Not Provided',
    width: 4,
  },
  {
    appliesToType: ['household_member', 'household_contact'],
    label: 'Belongs To',
    appliesIf: () => thisContact.parent && thisLineage[0],
    value: thisLineage,
    filter: 'lineage',
    width: 8,
  },
];
const houseHoldFields = [
  {
    appliesToType: ['household'],
    label: 'Household Head',
    value: titleCaseLetters(thisContact.contact && thisContact.contact.name),
    width: 6,
  },
  {
    appliesToType: ['household'],
    label: 'Belongs To',
    appliesIf: () => thisContact.parent && thisLineage[0],
    value: thisLineage,
    filter: 'lineage',
    width: 6,
  },
];
const facilityFields = [
  {
    appliesToType: ['area_health_facility'],
    label: 'Facility Name',
    value: titleCaseLetters(thisContact.manual_name || thisContact.meta.name),
    width: 6,
  },
  {
    appliesToType: ['area_health_facility'],
    label: 'Belongs To',
    value: 'MOH Kenya',
    width: 6,
  },
];
const diseaseSurveillanceFields = [
  {
    appliesToType: ['area_health_facility_nurse'],
    label: 'Name',
    value: thisContact.name || thisContact.meta.name,
    width: 4,
  },
  {
    appliesToType: ['area_health_facility_nurse'],
    label: 'Phone',
    value: thisContact.phone || 'Not Provided',
    width: 4,
  },
  {
    appliesToType: ['area_health_facility_nurse'],
    label: 'Belongs To',
    appliesIf: () => thisContact.parent && thisLineage[0],
    value: thisLineage,
    filter: 'lineage',
    width: 8,
  },
];
const communityHealthUnitFields = [
  {
    appliesToType: ['community_health_area'],
    label: 'Community Health Unit',
    value: thisContact.name || thisContact.meta.name,
    width: 4,
  },
  {
    appliesToType: ['community_health_area'],
    label: 'County',
    value: titleCaseLetters(
      thisContact.selected_county || thisContact.parent.selected_county
    ),
    width: 4,
  },
  {
    appliesToType: ['community_health_area'],
    label: 'Sub-County',
    value: titleCaseLetters(
      thisContact.selected_sub_county || thisContact.parent.selected_sub_county
    ),
    width: 4,
  },
  {
    appliesToType: ['community_health_area'],
    label: 'Ward',
    value: titleCaseLetters(
      thisContact.selected_ward || thisContact.parent.selected_ward
    ),
    width: 4,
  },
  {
    appliesToType: ['community_health_area'],
    label: 'Belongs To',
    appliesIf: () => thisContact.parent && thisLineage[0],
    value: thisLineage,
    filter: 'lineage',
    width: 8,
  },
];
const chpFields = [
  {
    appliesToType: ['community_health_volunteer'],
    label: 'Name',
    value: thisContact.name || thisContact.meta.name,
    width: 4,
  },
  {
    appliesToType: ['community_health_volunteer'],
    label: 'Phone',
    value: thisContact.phone || 'Not Provided',
    width: 4,
  },
  {
    appliesToType: ['community_health_volunteer'],
    label: 'Belongs To',
    appliesIf: () => thisContact.parent && thisLineage[0],
    value: thisLineage,
    filter: 'lineage',
    width: 8,
  },
];
const supervisorRegionFields = [
  {
    appliesToType: ['area_supervisor_region'],
    label: 'Name',
    value: thisContact.name || thisContact.meta.name,
    width: 4,
  },
  {
    appliesToType: ['area_supervisor_region'],
    label: 'Additional notes',
    value: thisContact.notes || 'Not Available',
    width: 4,
  },
  {
    appliesToType: ['area_supervisor_region'],
    label: 'Belongs To',
    appliesIf: () => thisContact.parent && thisLineage[0],
    value: thisLineage,
    filter: 'lineage',
    width: 8,
  },
];
const chaFields = [
  {
    appliesToType: ['area_community_health_supervisor'],
    label: 'Name',
    value: thisContact.name || thisContact.meta.name,
    width: 4,
  },
  {
    appliesToType: ['area_community_health_supervisor'],
    label: 'Phone',
    value: thisContact.phone || 'Not Provided',
    width: 4,
  },
  {
    appliesToType: ['area_community_health_supervisor'],
    label: 'Belongs To',
    appliesIf: () => thisContact.parent && thisLineage[0],
    value: thisLineage,
    filter: 'lineage',
    width: 8,
  },
];

const householdMemberCards = [
  {
    label: `Condition Card`,
    appliesToType: ['report'],
    appliesIf: (report) => {
      let correctContact =
        thisContact.contact_type === 'household_member' ||
        thisContact.contact_type === 'household_contact';
      let correctForm =
        report.form === 'household_member_assessment' ||
        report.form === 'cholera_verification';
      let isAssessmentFormLatest =
        report ===
        getMostRecentReport(allReports, 'household_member_assessment');
      let isCholeraFormLatest =
        report === getMostRecentReport(allReports, 'cholera_verification');
      return (
        correctContact &&
        correctForm &&
        (isAssessmentFormLatest || isCholeraFormLatest)
      );
    },
    fields: [
      {
        label: 'Assessment Condition',
        icon: 'health-condition',
        appliesIf: (report) => report.form === 'household_member_assessment',
        value: function (report) {
          let dangerSignsPresent =
            report.fields.household_member_assessment.initial_symptoms;
          let healthCondition =
            dangerSignsPresent === 'yes'
              ? 'suspicious cholera case'
              : 'no signs of cholera';
          return healthCondition;
        },
        width: 6,
      },
      {
        label: 'Cholera Verification',
        icon: 'cholera-verification',
        appliesIf: (report) => report.form === 'cholera_verification',
        value: function (report) {
          let choleraVerification = report.fields.danger_signs.confirm_case;
          let status =
            choleraVerification === 'yes'
              ? 'confirmed cholera case'
              : 'not a cholera case';
          return status;
        },
        width: 6,
      },
    ],
  },
];

allFields = pushFieldsToSingleArray(householdMemberFields, allFields);
allFields = pushFieldsToSingleArray(houseHoldFields, allFields);
allFields = pushFieldsToSingleArray(facilityFields, allFields);
allFields = pushFieldsToSingleArray(diseaseSurveillanceFields, allFields);
allFields = pushFieldsToSingleArray(communityHealthUnitFields, allFields);
allFields = pushFieldsToSingleArray(chpFields, allFields);
allFields = pushFieldsToSingleArray(chaFields, allFields);
allFields = pushFieldsToSingleArray(supervisorRegionFields, allFields);
allCards = pushFieldsToSingleArray(householdMemberCards, allCards);

module.exports = {
  context: {},
  cards: allCards,
  fields: allFields,
};
