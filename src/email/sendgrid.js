var SendGrid = require('sendgrid')

var mail = new SendGrid.Email({
    to: 'leideryesidmm@ufps.edu.co',
    from: 'sweisufps@gmail.com',
    subject: 'test mail',
    text: 'This is a sample email message.'
});

var sender = new SendGrid.SendGrid('sweisufps@gmail.com','sweisUFPS2022');

sender.smtp(mail, function(success, err){
    if(success) console.log('Email sent');
    else console.log(err);
});


sender.send(mail, function(success, err){
    if(success) console.log('Email sent');
    else console.log(err);
});
module.exports = sender;