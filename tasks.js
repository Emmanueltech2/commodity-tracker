module.exports = [{
    name: 'assessment-after-registration',
    title: 'First Assessment',
    icon: 'icon-form-general.svg',
    appliesTo: 'contacts',
    appliesToType: ['patient'],
    appliesIf: c => c.parent && c.parent.contact_type === 'chp_area' && !c.contact.date_of_death && !c.contact.muted,
    actions: [{ form: 'assessment' }],
    events: [{
      start: 7,
      days: 7,
      end: 0,
    }],
  }];
  