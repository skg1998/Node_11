var nodemailer = require("nodemailer");

var smtpTransport = nodemailer.createTransport({
    service: "Yahoo",
    auth: {
        user: "xxxxxxxxxx95@yahoo.com",
        pass: "xxxxxxxxxxxx"
    }
});

function mail(messageBody) {
    let messageBodyJson = JSON.stringify(messageBody)
    smtpTransport.sendMail({
        from: "xxxxxxxxxx95@yahoo.com",
        to: "xxxxxxxxxx95@gmail.com",
        subject: "Emailing with nodemailer",
        text: messageBodyJson
    }, function (error, response) {
        if (error) {
            console.log("error", error);
        } else {
            console.log(response);
        }
    });
}

module.exports = {
    mail: mail
}