import { Chats } from '../../imports/api/chats.js';

describe("chatMessages", () => {

  beforeEach(() => {
    Session.set("chatName", "testChat");
    Chats.insert({
      chatName: "testChat",
      messages: [
                  {messageName: "nm", messageText: "msgtxt"},
                  {messageName: "nm2", messageText: "msgtxt2"},
                ],
    });
  });

  it("delivers the messages", () => {
    expect(Template.chat.__helpers[' messages']()).toEqual([{
                                                        messageName: "nm",
                                                        messageText: "msgtxt",
                                                      },
                                                      {
                                                        messageName: "nm2",
                                                        messageText: "msgtxt2",
                                                      }]);
  });
});

