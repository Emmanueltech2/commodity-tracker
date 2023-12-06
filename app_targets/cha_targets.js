const extras = require('../nools-extras');
const {getField} = extras;

let chaTargets = [
    {
        id: 'cholera-cases-verified',
        translation_key: 'target.cholera_cases_verified',
        subtitle_translation_key: 'target.cholera_cases_verified.subtitle',
        icon: 'cholera-verification',
        type: 'percent',
        goal: 100,
        appliesTo: 'reports',
        appliesToType: ['household_member_assessment', 'cha_verify_case'],
        appliesIf: function(contact, report){
            let caseReported = getField(report, 'household_member_assessment.initial_symptoms');
            return caseReported === 'yes';
        },
        passesIf: function(contact){
            let allContactReports = contact.reports;
            let verifyCaseForm = 'cha_verify_case';
            for (let i=0; i<allContactReports.length; i++) {
                console.log(i, allContactReports[i]);
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
    }
];
module.exports = {chaTargets};