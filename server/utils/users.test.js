const expect = require('expect');

const {Users} = require('./users');

describe('Users', () => {

  let users;

  beforeEach(() => {
    users = new Users();
    users.users = [{
      id: 1,
      name: 'Mike',
      room: 'Angular class'
    }, {
      id: 2,
      name: 'Jane',
      room: 'React class'
    }, {
      id: 3,
      name: 'John',
      room: 'Angular class'
    },]
  })

  it('should add new user', () => {
    let users = new Users();
    let user = {
      id: '123',
      name: 'Sam',
      room: 'React Class'
    };
    let resUser = users.addUser(user.id, user.name, user.room);
    expect(users.users).toEqual([user]);
  })

  it('should remove a user', () => {
    let res = users.removeUser(2);
    expect(res.id).toBe(2);
    expect(users.users.length).toBe(2)
  })

  it('should not remove user', () => {
    let res = users.removeUser(123);
    expect(res).toBeFalsy()
    expect(users.users.length).toBe(3)
  })

  it('should find user', () => {
    let res = users.getUser(3);
    expect(res.name).toBe('John');
  })

  it('should not find user', () => {
    let res = users.getUser(123);
    expect(res).toBeFalsy();
  })

  it('should return names for Angular class', () => {
    let userList = users.getUserList('Angular class');
    expect(userList).toEqual(['Mike', 'John'])
  })

  it('should return names for React class', () => {
    let userList = users.getUserList('React class');
    expect(userList).toEqual(['Jane'])
  })
})