import { Chats } from '../api/chats.js';

import './body.html';
import './authorize.html';

Session.set("state", "choosing");
Template.body.helpers({

  authorizing() {
    return Session.get("state") === "authorizing";
  },

  authorized() {
    return Meteor.user();
  },
  choosing() {
    return Session.get("state") === "choosing";
  },
  chatting() {
    return Session.get("state") === "chatting";
  },
  name() {
    return Session.get("name");
  }

});





