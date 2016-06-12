import { Chats } from '../api/chats.js';

import './chat.html';
import './chatter.html';

Template.chat.helpers({
  chatName() {
    return Session.get("chatName");
  },

  messages() {
    var _chat = Chats.find({chatName: Session.get("chatName")}).fetch();
    $('.chat-window').scrollTop($('.chat-window').prop('scrollHeight'));
    return _chat[0].messages;
  },

  chatters() {
   var _chat = Chats.find({chatName: Session.get("chatName")}).fetch();
   return _chat[0].chatters;
  },

});

Template.chat.events({
  'keypress .chat-input'(event) {
    if (event.charCode== 13) {
    var _chat = Chats.find({_id: Session.get("chatId")}).fetch();
    _chat[0].messages.push({
      messageName: Meteor.user().username,
      messageText: $('.chat-input').val()
    }),
    $('.chat-input').val('');
    Chats.update(
      {
        _id: Session.get("chatId"),
      },
      {
        $set:
          {
            messages: _chat[0].messages,
          }
      }
    );
    }
  },

  'click button'(event) {
    console.log(event);
    var _chat = Chats.find({_id: Session.get("chatId")}).fetch();
    _chatters = _chat[0].chatters.filter(filterOut);
    console.log(Meteor.user().username);
    Chats.update(
      {
        _id: Session.get("chatId"),
      },
      {
        $set:
          {
            chatters: _chatters,
          }
      }
    );
    Session.set("state", "choosing");
  }, 
});

var filterOut = (name) => {
  return name != Meteor.user().username;
}
