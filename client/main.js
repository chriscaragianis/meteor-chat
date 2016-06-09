import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Session.set("state", "choosing");

Template.body.helpers({

  choosing() {
    return Session.get("state") === "choosing";
  },
  chatting() {
    return Session.get("state") === "chatting";
  }

});

Template.body.events({
  'click button.new-chat'(event, instance) {
    Session.set("state", "chatting");
  },

});



