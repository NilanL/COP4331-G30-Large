const checkSelections = require('../components/checkSelections');

test('Check for no habits selected', () => {
    expect(checkSelections(false, false, false, false)).toBe(false);
});

test('Check for minimum selection', () => {
    expect(checkSelections(true, false, false, false)).toBe(true);
});

