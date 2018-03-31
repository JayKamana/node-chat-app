const expect = require('expect');

const {isRealString} = require('./validation');

describe('isRealString', () => {

  it('should reject non-string values', () => {
    let string = 123
    let res = isRealString(string);
    expect(res).toBeFalsy();
  })

  it('should reject string with only spaces', () => {
    let string = '  '
    let res = isRealString(string);
    expect(res).toBeFalsy();
  })

  it('should allow strings with non-space characters', () => {
    let string = '  lotr'
    let res = isRealString(string);
    expect(res).toBeTruthy();
  })
})