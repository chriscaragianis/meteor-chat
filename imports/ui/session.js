import { Chats } from '../api/chats.js';

import './session.html';
var namer = require('../lib/namer');
var setChat = require('../lib/setChat');

Template.session.events({
  'click .name-choice'(event, instance) {
    if ($('.name-choice').val() == 'your name') {
      $('.name-choice').val('');
    }
  },

  'click .chat-choice'(event, instance) {
    if($('.chat-choice').val() == 'chat-code') {
      $('.chat-choice').val('');
    }
  },

  'click button.new-chat'(event, instance) {
    Session.set("name", $('.name-choice').val());
    var d = new Date();
    var _name = namer();
    Chats.insert({
      chatName: _name,
      chatters: [{chatterName: "System"}, {chatterName: Meteor.user().username}],
      createdAt: d,
      messages: [{messageName: "System", messageText: "Created at " + d.toString()}],
    });
    Session.set("state", "chatting");
    setChat(_name);
  },

  'click button.join-chat'(event, instance) {
    Session.set("name", $('.name-choice').val());
    var _chat = setChat($('.chat-choice').val());
    _chat[0].chatters.push({chatterName: Meteor.user().username});
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
