const {
    getField,
} = require('../nools-extras');

let chaTasks = [
{
    name: 'let-cha-verify-case',
    title: 'Commodity Request Case',
    icon: 'cholera-verification',
    appliesTo: 'reports',
    appliesToType: ['commodity_mngt_tool'],
    appliesIf: function(contact, report){
        return report.form === 'commodity_mngt_tool' && user.contact_type === 'area_community_health_supervisor';
    },
    actions: [{form: 'commodity_verification', label: 'Ask Verification'}],
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
    name: 'let-cha-verify-death',
    title: 'Verify Death Report',
    icon: 'icon-death-general',
    appliesTo: 'reports',
    appliesToType: ['death_report'],
    appliesIf: function(contact, report){
        return report.form === 'death_report' && user.contact_type === 'area_community_health_supervisor';
    },
    actions: [{form: 'cha_verify_death', label: 'Verify Death'}],
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
    title: 'Query Reported Case',
    icon: 'cholera-verification',
    appliesTo: 'reports',
    appliesToType: ['commodity_mngt_tool'],
    appliesIf: function(contact, report){
        let userHasDangerSigns = getField(report, 'report.commodity_mngt_tool.commodity_mngt_tool.zinc_sulphate_20mg.zinc_sulphate_expiry_date') === 'yes';
        return userHasDangerSigns && user.contact_type === 'area_community_health_supervisor';
    },
    actions: [{form: 'commodity_verification', label: 'Ask Verification'}],
    events: [{
        start: 3,
        end: 3,
        dueDate: function(event, contact, report){
            return new Date(report.reported_date + (event.start * 24 * 60 * 60 * 1000));
        }
    }],
    priority: {level: 'high', label: 'High Priority'},
}
];

module.exports = {chaTasks};
