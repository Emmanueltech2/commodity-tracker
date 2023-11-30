const extras = require('./nools-extras');
const {capitalizeFirstLetter, titleCaseLetters, pushFieldsToSingleArray, getMostRecentReport} = extras;

// contact, reports, lineage are globally available for contact-summary
const thisContact = contact;
const thisLineage = lineage;
const allReports = reports;
let allFields = [];
let allCards = [];


const householdMemberFields = [
  {appliesToType: ['household_member', 'household_contact'], label: 'Name', value: thisContact.name || thisContact.display_name, width: 4 },
  {appliesToType: ['household_member', 'household_contact'], label: 'Age', value: thisContact.date_of_birth, filter: 'age', width: 4 },
  {appliesToType: ['household_member', 'household_contact'], label: 'Gender', value: capitalizeFirstLetter(thisContact.sex), width: 4 },
  {appliesToType: ['household_member', 'household_contact'], label: 'Phone', value: thisContact.phone||'Not Provided', width: 4},
  {appliesToType: ['household_member', 'household_contact'], label: 'Belongs To', appliesIf: () => thisContact.parent && thisLineage[0], value: thisLineage, filter: 'lineage', width: 8 },
];
const houseHoldFields = [
  {appliesToType: ['household'], label: 'Household Head', value: titleCaseLetters(thisContact.contact && thisContact.contact.name), width: 6 },
  {appliesToType: ['household'], label: 'Belongs To', appliesIf: () => thisContact.parent && thisLineage[0], value: thisLineage, filter: 'lineage', width: 6},
];

const householdMemberCards = [
  {
    label: `${thisContact.name || thisContact.display_name} Condition Card`,
    appliesToType: ['report'],
    appliesIf: (report) => {
        let correctContact = thisContact.contact_type === 'household_member' || thisContact.contact_type === 'household_contact';
        let correctForm = report.form === 'household_member_assessment';
        let isFormLatest = report === getMostRecentReport(allReports, 'household_member_assessment');
        return correctContact && correctForm && isFormLatest;
      },
    fields: [
      {
        label: 'Health Condition',
        icon: 'health-condition',
        value: function(report){
          let dangerSignsPresent = report.fields.household_member_assessment.initial_symptoms;
          let healthCondition = dangerSignsPresent === 'yes' ? 'suspicious cholera case' : 'no signs of cholera';
          return healthCondition;
        },
        width: 12
      },
    ]
  }
];

allFields = pushFieldsToSingleArray(householdMemberFields, allFields);
allFields = pushFieldsToSingleArray(houseHoldFields, allFields);
allCards = pushFieldsToSingleArray(householdMemberCards, allCards);

module.exports = {
  context: {},
  cards: allCards,
  fields: allFields,
};