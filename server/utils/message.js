const moment = require('moment');

let generateMessage = (from, text) => {
  return {
    from,
    text,
    createdAt: moment().valueOf()
  }
};

let generateLocationMessage = (from, latitide, longitude) => {
  return {
    from,
    url: `https://www.google.com/maps?q=${latitide},${longitude}`,
    createdAt: moment().valueOf()
  }
};

module.exports = {
  generateMessage,
  generateLocationMessage
}