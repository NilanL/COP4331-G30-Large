// this is the one that we can use for any time it's called and specify 
// the email which is good for email verification and password reset
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = (to, from, subject, text) => {
    const msg = {
        to,
        from,
        subject,
        html: text,
    };
    sgMail.send(msg, function(err, result) {
        if (err) {
            console.log('Email not sent error occurred.');
        } else {
            console.log('Email was sent!');
        }
    });
};

module.exports = sendEmail;