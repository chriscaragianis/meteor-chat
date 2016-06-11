import { Chats } from '../api/chats.js';

var setChat = (_chatName) => {
  var _chat = Chats.find({chatName: _chatName}).fetch();
  Session.set("chatId", _chat[0]._id);
  Session.set("chatName", _chatName);
  return _chat;
};

module.exports = setChat;
