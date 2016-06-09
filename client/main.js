import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import { Chats } from '../imports/api/chats.js';
import './main.html';
import './templates/chat.html';
import './imports/chat.js'

Session.set("state", "choosing");

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



Template.chatter.helpers({
  chatterName() {
    return this.chatterName;
  },
});


Template.body.events({
  'click button.new-chat'(event, instance) {
    Session.set("name", $('.name-choice').val());
    var d = new Date();
    var _name = namer();
    Chats.insert({
      chatName: _name,
      chatters: [{chatterName: "System"}, {chatterName: Session.get("name")}],
      createdAt: d,
      messages: [{messageName: "System", messageText: "Created at " + d.toString()}],
    });
    Session.set("state", "chatting");
    setChat(_name);
  },

  'click button.join-chat'(event, instance) {
    Session.set("name", $('.name-choice').val());
    var _chat = setChat($('.chat-choice').val());
    console.log(_chat[0]);
    _chat[0].chatters.push({chatterName: Session.get("name")});
    Chats.update({
      _id: _chat[0]._id,
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

var setChat = (_chatName) => {
  var _chat = Chats.find({chatName: _chatName}).fetch();
  Session.set("chatId", _chat[0]._id);
  Session.set("chatName", _chatName);
  return _chat;
};
  
