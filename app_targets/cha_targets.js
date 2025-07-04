const extras = require('../nools-extras');
const {getField} = extras;

let chaTargets = [
	{

    {
        id: 'commodity-verification-request',
        translation_key: 'target.cholera_cases_reported',
        subtitle_translation_key: 'target.cholera_cases_reported.subtitle',
        icon: 'cholera-report',
        type: 'count',
        goal: -1,
        appliesTo: 'reports',
        appliesToType: [''],
        appliesIf: function(contact, report){
            let caseReported = getField(report, 'commodity_mngt_tool');
            return caseReported === 'yes';
        },
        date: 'reported',
        context: "user.contact_type === 'area_community_health_supervisor'"
    },
    {
        id: 'cholera-cases-verified',
        translation_key: 'target.cholera_cases_verified',
        subtitle_translation_key: 'target.cholera_cases_verified.subtitle',
        icon: 'cholera-verification',
        type: 'percent',
        goal: 101,
        appliesTo: 'reports',
        appliesToType: ['household_member_assessment', 'cha_verify_case'],
        appliesIf: function(contact, report){
            let caseReported = getField(report, 'household_member_assessment.initial_symptoms');
            return caseReported === 'yes';
        },
        passesIf: function(contact){
            let allContactReports = contact.reports;
            let verifyCaseForm = 'cha_verify_case';
            for (let i=0; i < allContactReports.length; i++) {
                let obj = allContactReports[i];
                if (obj.form === verifyCaseForm) {
                    let formFields = obj.fields;
                    return formFields.danger_signs.confirm_case === 'yes';
                }
            }
            return false;
        },
        date: 'reported',
        context: "user.contact_type === 'area_community_health_supervisor'"
    },
    {
        id: 'total-number-approved',
        translation_key: 'target.commodieties_cases_unapproved',
        subtitle_translation_key: 'target.cholera_cases_confirmed.subtitle',
        icon: '',
        type:'percent',
        goal: -1,
        appliesTo: 'reports',
        appliesToType: ['cha_verify_case','cholera_verification'],
        appliesIf: function(contact, report){
            return report.form === 'cha_verify_case';
        },
        passesIf: function(contact){
            let allContactReports = contact.reports;
            let confirmCaseForm = 'cholera_verification';
            for (let i=0; i < allContactReports.length; i++) {
                let obj = allContactReports[i];
                if (obj.form === confirmCaseForm) {
                    let formFields = obj.fields;
                    return formFields.danger_signs.confirm_case === 'yes';
                }
            }
            return false;
        },
        date: 'reported',
        context: "user.contact_type === 'area_community_health_supervisor'"
    }
];
module.exports = {chaTargets};
