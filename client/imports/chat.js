import { Chats } from '../../imports/api/chats.js';

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
  }
});

Template.chat.events({
  'keypress .chat-input'(event) {
    console.log(event);
    if (event.charCode== 13) {
    var _chat = Chats.find({_id: Session.get("chatId")}).fetch();
    _chat[0].messages.push({messageName: Meteor.user().username, messageText: $('.chat-input').val()}),
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
});
