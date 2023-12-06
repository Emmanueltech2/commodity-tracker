const extras = require('./nools-extras');
const {
    getField,
} = extras;
module.exports = [
{
    name: 'follow-up-household-member',
    title: 'Follow up household member',
    icon: 'icon-healthcare-assessment',
    appliesTo: 'reports',
    appliesToType: ['household_member_assessment'],
    appliesIf: function(contact, report){
        let userHasDangerSigns = getField(report, 'household_member_assessment.initial_symptoms') === 'yes';
        return userHasDangerSigns && user.contact_type === 'community_health_volunteer';
    },
    actions: [{form: 'cholera_suspicion_follow_up', label:'Follow Up'}],
    events: [{
        start: 3,
        end: 3,
        dueDate: function(event, contact, report){
            return new Date(report.reported_date + (event.start * 24 * 60 * 60 * 1000));
        }
    }],
    priority: {level: 'high', label: 'High Priority'},
},
{
    name: 'let-chp-verify-case',
    title: 'Ask CHP To Verify Case',
    icon: 'cholera-verification',
    appliesTo: 'reports',
    appliesToType: ['household_member_assessment'],
    appliesIf: function(contact, report){
        let userHasDangerSigns = getField(report, 'household_member_assessment.initial_symptoms') === 'yes';
        return userHasDangerSigns && user.contact_type === 'area_community_health_supervisor';
    },
    actions: [{form: 'cha_verify_case', label: 'Ask Verification'}],
    events: [{
        start: 3,
        end: 3,
        dueDate: function(event, contact, report){
            return new Date(report.reported_date + (event.start * 24 * 60 * 60 * 1000));
        }
    }],
    priority: {level: 'high', label: 'High Priority'},
},
];