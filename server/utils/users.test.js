const expect = require('expect');

var {Users} = require('./users.js');

describe('User class tests', () => {
    var users;

    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: '1',
            name: 'user1',
            room: 'room1'
        }, {
            id: '2',
            name: 'user2',
            room: 'room2'
        }, {
            id: '3',
            name: 'user3',
            room: 'room1'
        }];
    });

    it('should add new user', () => {
        var user = {
            id: '4',
            name: 'Jari',
            room: 'Jarin oma huone'
        };
        
        users.addUser(user.id, user.name, user.room);

        expect(users.users[3]).toMatchObject(user);
    });

    it('should return names for room 1', () => {
        var userList = users.getUserList('room1');
        expect(userList).toMatchObject([users.users[0].name, users.users[2].name]);
    });

    it('should return names for room 2', () => {
        var userList = users.getUserList('room2');
        expect(userList).toMatchObject([users.users[1].name]);
    });

    it('should return empty array for room3 (empty room)', () => {
        var userList = users.getUserList('room3');
        expect(userList.length).toBe(0);
    });

    it('should remove a user', () => {
        var userToBeRemoved = users.users[0];
        var removedUser = users.removeUser(userToBeRemoved.id);
        expect(users.users.length).toBe(2);
        expect(removedUser).toMatchObject(userToBeRemoved);
    });

    it('should not remove a user (user doesnt exist)', () => {
        var removedUser = users.removeUser('1234');
        expect(users.users.length).toBe(3);
        expect(removedUser).toBeFalsy();
    });

    it('should find user', () => {
        var user = users.getUser('1');
        expect(user).toMatchObject(users.users[0]);
    });

    it('should not find user', () => {
        var user = users.getUser('123');
        expect(user).toBeFalsy();
    });
});