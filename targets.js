const extras = require('./nools-extras');
const {
    getField,
} = extras;
module.exports = [
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
    },
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
        id:'referrals_given_target',
        translation_key:'target.referrals_given',
        subtitle_translation_key: 'target.referrals_given.subtitle',
        icon: 'icon-referral',
        type: 'count',
        goal: 20,
        appliesTo: 'reports',
        appliesToType: ['household_member_assessment'],
        appliesIf: function(contact, report){
            let referralGiven = getField(report, 'household_member_assessment.initial_symptoms');
            return referralGiven === 'yes';
        },
        date: 'reported'
    },
    {
        id:'referrals_honored_target',
        translation_key:'target.referrals_honored',
        subtitle_translation_key: 'target.referrals_honored.subtitle',
        icon: 'icon-referral',
        type: 'percent',
        goal: 80,
        appliesTo: 'reports',
        appliesToType: ['cholera_follow_up'],
        passesIf: function(contact, report){
            let visitedFacility = getField(report, 'danger_signs.visit_confirm');
            return visitedFacility === 'yes';
        },
        date: 'reported'
    },
];