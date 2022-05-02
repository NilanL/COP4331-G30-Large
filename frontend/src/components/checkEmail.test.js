const checkEmail= require('../components/checkEmail');

test('Check valid email', () => {
    expect(checkEmail('ma@blah.com')).toBe(true);
});

test('Check for empty email', () => {
    expect(checkEmail('')).toBe(false);
});

test('Check malformed email 1', () => {
    expect(checkEmail('ma@')).toBe(false);
});

test('Check malformed email 2', () => {
    expect(checkEmail('blah.com')).toBe(false);
});

test('Check malformed email 3', () => {
    expect(checkEmail('ma@blah')).toBe(false);
});