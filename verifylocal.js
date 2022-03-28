const sgMail = require('@sendgrid/mail');
sgMail.setApiKey('');

function betweenRandomNumber(min, max) {  
    return Math.floor(
      Math.random() * (max - min + 1) + min
    )
};

const code = betweenRandomNumber(10000, 99999);

const msg = {
    to: 'shaynet0809@gmail.com',
    from: 'dailygrind4331@gmail.com',
    subject: 'Testing 5 digit code',
    text: `Your 5 digit code is: ${code}`,
};

sgMail.send(msg, function(err, result){
    if(err) {
        console.log('Email not sent error occurred.');
    } else {
        console.log('Email was sent!');
    }
});
