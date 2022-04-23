const login = require('./Login');
const userName = "fakename";
const password = "fakepass";

test('Detects invalid login attempt', () => {
    expect(login(userName, password)).toBe('Unrecognized credentials');
});