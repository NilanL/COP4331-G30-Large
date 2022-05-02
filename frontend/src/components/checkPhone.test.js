const checkEmail= require('../components/checkPhone');

test('Check for valid phone number 1', () => {
    expect(checkEmail('1234567890')).toBe(true);
});

test('Check for valid phone number 2', () => {
    expect(checkEmail('123-124-8458')).toBe(true);
});

test('Check for valid phone number 3', () => {
    expect(checkEmail('(123)-124-8458')).toBe(true);
});

test('Check for valid phone number 4', () => {
    expect(checkEmail('(123)124-8458')).toBe(true);
});

test('Check malformed phone 1', () => {
    expect(checkEmail('123456789a')).toBe(false);
});

test('Check malformed phone 2', () => {
    expect(checkEmail('aaaa')).toBe(false);
});

test('Check malformed phone 3', () => {
    expect(checkEmail('123')).toBe(false);
});

test('Check missing phone', () => {
    expect(checkEmail('')).toBe(false);
});