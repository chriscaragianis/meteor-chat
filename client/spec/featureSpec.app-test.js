describe("entry page has the right components", () => {
  it('has the title', () => {
    expect($('.title').text()).toContain('Simple chat');
  });

  it('has the start new chat button', () => {
    expect($('button.new-chat').text()).toEqual('Start new chat');
  });

  it('has the join chat button', () => {
    expect($('button.join-chat').text()).toEqual('Join a chat');
  });
}); 

describe("inputs clear when clicked", () => {

  it("clears the name text", () => {
    $(".name-choice").click();
    expect($(".name-choice").val()).toEqual("");
  });

  it("name doesn't clear if user has changed text", () => {
    $(".name-choice").val('change');
    $(".name-choice").click();
    expect($('.name-choice').val()).toEqual('change');
  });

  it("clears the chat choice text", () => {
    $(".chat-choice").click();
    expect($(".chat-choice").val()).toEqual("");
  });

  it("chat doesn't clear if user has changed text", () => {
    $(".chat-choice").val('change');
    $(".chat-choice").click();
    expect($('.chat-choice').val()).toEqual('change');
  });
});
