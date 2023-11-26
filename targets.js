const extras = require('./nools-extras');
const {
    getField,
} = extras;
module.exports = [
    {
        id: 'follow_up_household_member_target',
        translation_key:'tasks.follow_up_household_member_target',
        icon: 'icon-healthcare-assessment',
        type: 'count',
        goal: 100,
        appliesTo: 'reports',
        appliesToType: ['household_member_assessment'],
        appliesIf: function(contact, report){
            let initialSymptomsChecked = getField(report, 'household_member_assessment.initial_symptoms');
            let userHasBeenAssessed = initialSymptomsChecked === 'yes' || initialSymptomsChecked === 'no';
            return userHasBeenAssessed;
        },
        date: 'reported',

    },
];