const extras = require('./nools-extras');
const {
    getField,
} = extras;
module.exports = [
    {
        id: 'follow_up_household_member_target',
        translation_key:'target.follow_up_household_member',
        subtitle_translation_key: 'target.follow_up_household_member.subtitle',
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
    {
        id: 'register_households_target',
        translation_key:'target.register_households',
        subtitle_translation_key: 'target.register_households.subtitle',
        icon: 'icon-register-household',
        type: 'count',
        goal: 50,
        appliesTo: 'contacts',
        appliesToType: ['household'],
        appliesIf: function(contact){
            let isHouseHoldType = contact.contact.contact_type === 'household';
            return isHouseHoldType;
        },
        date: 'now'
    }
];