import { Chats } from '../../imports/api/chats.js';

describe("chatChatters", () => {

  beforeEach(() => {
    Session.set("chatName", "testChat2");
    Chats.insert({
      chatName: "testChat2",
      chatters: [
                  {chatterName: "nm"},
                  {chatterName: "nm2"},
                ],
    });
  });

  it("delivers the chatters", () => {
    expect(Template.chat.__helpers[' chatters']()).toEqual([{
                                                        chatterName: "nm",
                                                      },
                                                      {
                                                        chatterName: "nm2",
                                                      }]);
  });
});

