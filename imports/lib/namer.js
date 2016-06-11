var namer = () => {
  var charset = "abcdefg";
  var name = "";
  for(var i = 0; i < 5; i++) {
    name += charset.charAt(Math.floor(Math.random()*charset.length));
  }
  return name;
};

module.exports = namer;
