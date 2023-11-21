module.exports = [{
    name: 'follow-up-hosehold-member',
    title: 'Follow up household member',
    icon: 'icon-healthcare',
    appliesTo: 'reports',
    appliesToType: ['community_health_volunteer'],
    appliesIf: function(contact, report){
        console.log('follow-up-hosehold-member', contact, report);
        return report && Utils.getField(report, 'initial_symptoms') === 'yes';
    },
    actions: [{form: 'patient_follow_up'}],
    events: [{
        start: 7,
        end: 0,
        days: 7,
    }],
}];