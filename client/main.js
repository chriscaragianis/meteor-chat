import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import { Chats } from '../imports/api/chats.js';
import './main.html';

Session.set("state", "choosing");
Session.set("name", "booger");

Template.body.helpers({

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

Template.chat.helpers({
  chatName() {
    return Session.get("chatName");
  },

  messages() {
    var _chat = Chats.find({chatName: Session.get("chatName")}).fetch();
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
    _chat[0].messages.push({messageName: Session.get("name"), messageText: $('.chat-input').val()}),
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
Template.chatter.helpers({
  chatterName() {
    return this.chatterName;
  },
});


Template.body.events({
  'click button.new-chat'(event, instance) {
    Session.set("chatName", namer());
    var d = new Date();
    Chats.insert({
      chatName: Session.get("chatName"),
      chatters: [{chatterName: "System"}, {chatterName: Session.get("name")}],
      createdAt: d,
      messages: [{messageName: "System", messageText: "Created at " + d.toString()}],
    });
    Session.set("state", "chatting");
    var _chat = Chats.find({chatName: Session.get("chatName")}).fetch();
    Session.set("chatId", _chat[0]._id);
    Session.set("state", "chatting");
  },
    
  'click button.join-chat'(event, instance) {
    var _chat = Chats.find({chatName: $('.chat-choice').val()}).fetch();
    Session.set("chatId", _chat[0]._id);
    Session.set("chatName", _chat[0].chatName);
    _chat[0].chatters.push({chatterName: Session.get("name")}),
    Chats.update({
      _id: Session.get("chatId"),
      },
      {
        $set: {
          chatters: _chat[0].chatters,
        }
      }
    );
    Session.set("state", "chatting");
  },
});

var namer = () => {
  var charset = "abcdefg";
  var name = "";
  for(var i = 0; i < 5; i++) {
    name += charset.charAt(Math.floor(Math.random()*charset.length));
  }
  return name;
};


