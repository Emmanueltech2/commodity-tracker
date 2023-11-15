const extras = require('./nools-extras');
//const export = require('luxon');
const {
 // MAX_DAYS_IN_CHOLERA,
  //today,
  isAlive,
  isFormArraySubmittedInWindow,
  getDateISOLocal,
  addDays,
  isCholeraTaskMuted,
  getField
} = extras;

module.exports = [
  {
    name: 'assessment-after-registration',
    title: 'First Assessment',
    icon: 'icon-form-general.svg',
    appliesTo: 'contacts',
    appliesToType: ['patient'],
    appliesIf: (c) =>
      c.parent &&
      c.parent.contact_type === 'chp_area' &&
      !c.contact.date_of_death &&
      !c.contact.muted,
    actions: [{ form: 'assessment' }],
    events: [
      {
        start: 7,
        days: 7,
        end: 0,
      },
    ],
  },

  {
    name: 'cholera.suspicion_follow_up.from_contact',
    icon: 'icon-follow-up',
    title: 'task.cholera.suspicion_follow_up.title',
    appliesTo: 'reports',
    appliesToType: ['cholera_suspicion_follow_up'],
    appliesIf: function (contact, report) {
      return getField(report, 't_danger_signs_referral_follow_up_date') === 'yes' && isAlive(contact);
    },
    resolvedIf: function (contact, report, event, dueDate) {
      //(refused or migrated) and cleared tasks 
      if (isPregnancyTaskMuted(contact)) { return true; }
      const startTime = Math.max(addDays(dueDate, -event.start).getTime(), report.reported_date + 1);
      //reported_date + 1 so that source ds_follow_up does not resolve itself
      const endTime = addDays(dueDate, event.end + 1).getTime();
      return isFormArraySubmittedInWindow(contact.reports, ['cholera_suspicion_follow_up'], startTime, endTime);
    },
    actions: [
      {
        type: 'report',
        form: 'cholera_suspicion_follow_up',
        modifyContent: function (content, contact, report) {
          content.delivery_uuid = getField(report, 'inputs.delivery_uuid');
        }
      }
    ],
    events: [
      {
        id: 'cholera-suspicion-follow-up',
        start: 3,
        end: 7,
        dueDate: function (event, contact, report) {
          return getDateISOLocal(getField(report, 't_danger_signs_referral_follow_up_date'));
        }
      }
    ]
  }
  
];
