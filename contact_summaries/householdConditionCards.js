const extras = require('../nools-extras');
const {getMostRecentReport} = extras;
let allReports = reports;
let thisContact = contact;

const householdMemberCards = [
{
label: `Condition Card`,
appliesToType: ['report'],
appliesIf: (report) => {
    let correctContact =
    thisContact.contact_type === 'household_member' ||
    thisContact.contact_type === 'household_contact';
    let correctForm =
    report.form === 'household_member_assessment' ||
    report.form === 'cholera_verification';
    let isAssessmentFormLatest =
    report ===
    getMostRecentReport(allReports, 'household_member_assessment');
    let isCholeraFormLatest =
    report === getMostRecentReport(allReports, 'cholera_verification');
    return (
    correctContact &&
    correctForm &&
    (isAssessmentFormLatest || isCholeraFormLatest)
    );
},
fields: [
    {
    label: 'Assessment Condition',
    icon: 'health-condition',
    appliesIf: (report) => report.form === 'household_member_assessment',
    value: function (report) {
        let dangerSignsPresent =
        report.fields.household_member_assessment.initial_symptoms;
        let healthCondition =
        dangerSignsPresent === 'yes'
            ? 'suspicious cholera case'
            : 'no signs of cholera';
        return healthCondition;
    },
    width: 6,
    },
    {
    label: 'Cholera Verification',
    icon: 'cholera-verification',
    appliesIf: (report) => report.form === 'cholera_verification',
    value: function (report) {
        let choleraVerification = report.fields.danger_signs.confirm_case;
        let status =
        choleraVerification === 'yes'
            ? 'confirmed cholera case'
            : 'not a cholera case';
        return status;
    },
    width: 6,
    },
],
},
];

module.exports = { householdMemberCards };
