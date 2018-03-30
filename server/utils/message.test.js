const expect = require('expect');
const {generateMessage} = require('./message')

describe('generateMessage', () => {
  
  it('should generate the correct message object', () => {
    let res = generateMessage('mike@example.com', 'Hey there!')
    expect(res.from).toBe('mike@example.com');
    expect(res.text).toBe('Hey there!');
    expect(typeof res.createdAt).toBe('number');
  })

})