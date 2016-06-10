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

  it("clears the chat choice text", () => {
    $(".chat-choice").click();
    expect($(".chat-choice").val()).toEqual("");
  });
});
