const extras = require('./nools-extras');
const {
    getField,
} = extras;
module.exports = [
{
    name: 'follow-up-household-member',
    title: 'Follow up household member',
    icon: 'icon-healthcare',
    appliesTo: 'reports',
    appliesToType: ['household_member_assessment'],
    appliesIf: function(contact, report){
        let userHasDangerSigns = getField(report, 'household_member_assessment.initial_symptoms') === 'yes';
        return userHasDangerSigns;
    },
    actions: [{form: 'patient_follow_up'}],
    events: [{
        start: 7,
        end: 0,
        days: 7,
    }],
},
];