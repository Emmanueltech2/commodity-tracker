module.exports = [
{
    name: 'follow-up-household-member',
    title: 'Follow up household member',
    icon: 'icon-healthcare',
    appliesTo: 'reports',
    appliesToType: ['household_member_assessment'],
    appliesIf: function(contact, report){
        console.log('follow-up-hosehold-member', report);
        let userHasDangerSigns = Utils.getField(report, 'initial_symptoms') === 'yes';
        console.log('userHasDangerSigns', userHasDangerSigns, Utils.getField(report, 'initial_symptoms'));
        return true;
    },
    actions: [{form: 'patient_follow_up'}],
    events: [{
        start: 7,
        end: 0,
        days: 7,
    }],
},
];