const extras = require('./nools-extras');
const {capitalizeFirstLetter, titleCaseLetters, pushFieldsToSingleArray} = extras;

// contact, reports, lineage are globally available for contact-summary
const thisContact = contact;
const thisLineage = lineage;
console.log('contact-summary', thisContact, thisLineage);
let allFields = [];

const houseHoldMemberFields = [
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

allFields = pushFieldsToSingleArray(houseHoldMemberFields, allFields);
allFields = pushFieldsToSingleArray(houseHoldFields, allFields);

module.exports = {
  context: {},
  cards: [],
  fields: allFields,
};