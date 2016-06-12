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
  },
});

Template.message.helpers({
  nameColor() {
    return Meteor.user().profile.nameColor;
  },
  away() {
    var _chat = Chats.find({chatName: Session.get("chatName")}).fetch();
    if(_chat[0].chatters.includes(Meteor.user().username))
    {
      return "";
    }
    return "away";
  },
});






