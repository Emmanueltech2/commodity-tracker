const extras = require('./nools-extras');
const {
    getField,
} = extras;
module.exports = [
    {
        id: 'register_households_target',
        translation_key:'target.register_households',
        subtitle_translation_key: 'target.register_households.subtitle',
        icon: 'icon-household',
        type: 'count',
        goal: 50,
        appliesTo: 'contacts',
        appliesToType: ['household'],
        appliesIf: function(contact){
            let isHouseHoldType = contact.contact.contact_type === 'household';
            return isHouseHoldType;
        },
        date: 'now',
        aggregate: true
    },
    {
        id: 'follow_up_household_member_target',
        translation_key:'target.follow_up_household_member',
        subtitle_translation_key: 'target.follow_up_household_member.subtitle',
        icon: 'icon-healthcare-assessment',
        type: 'percent',
        goal: 100,
        appliesTo: 'contacts',
        appliesToType: ['household_member', 'household'],
        appliesIf: function(contact){
            console.log('contactFollowUpApplies', contact);
            return contact.contact.contact_type === 'household_member' || contact.contact.contact_type === 'household';
        },
        passesIf: function(contact){
            console.log('contactFollowUpPasses', contact);
            let allContactReports = contact.reports;
            let assessmentForm = 'household_member_assessment';
            for (const obj of allContactReports) {
                if (obj.form === assessmentForm) {
                    return true;
                }
            }
            return false;
        },
        date: 'reported',
        aggregate: true
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
        date: 'reported',
        aggregate: true
    },
    {
        id:'referrals_honored_target',
        translation_key:'target.referrals_honored',
        subtitle_translation_key: 'target.referrals_honored.subtitle',
        icon: 'icon-referral',
        type: 'percent',
        goal: 80,
        appliesTo: 'reports',
        appliesToType: ['household_member_assessment','cholera_follow_up'],
        appliesIf: function(contact, report){
            let referralGiven = getField(report, 'household_member_assessment.initial_symptoms');
            getField(report, 'danger_signs.visit_confirm');
            return referralGiven === 'yes';
        },
        passesIf: function(contact){
            let allContactReports = contact.reports;
            let followUpForm = 'cholera_follow_up';
            for (const obj of allContactReports) {
                if (obj.form === followUpForm) {
                    let formFields = obj.fields;
                    return formFields.danger_signs.visit_confirm === 'yes';
                }
            }
            return false;
        },
        date: 'reported',
        aggregate: true
    },
];