const expect = require('expect');
const {generateMessage, generateLocationMessage} = require('./message')

describe('generateMessage', () => {
  
  it('should generate the correct message object', () => {
    let res = generateMessage('mike@example.com', 'Hey there!')
    expect(res.from).toBe('mike@example.com');
    expect(res.text).toBe('Hey there!');
    expect(typeof res.createdAt).toBe('number');
  })
})

describe('generateLocationMessage', () => {
  
  it('should generate the correct location object', () => {
    let res = generateLocationMessage('admin', 1, 2)
    expect(res.from).toBe('admin');
    expect(res.url).toBe('https://www.google.com/maps?q=1,2');
    expect(typeof res.createdAt).toBe('number');
  })
})