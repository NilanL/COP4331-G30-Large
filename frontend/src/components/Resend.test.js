import doRetrieveAccount from './Resend';
import Resend from './Resend';
const resend = require('./Resend');
const emailEmpty = "";
const emptyError = 'Please enter your email address to retrieve your account.';
const emailInvalid = "fakepass.com";
const invalidError = 'Please enter a valid email address.';
var email = '';

test('Detects missing email address', () => {
    Resend();
    email = emailEmpty;
    doRetrieveAccount();
    return expect(Resend.Message).toBe(emptyError);
});