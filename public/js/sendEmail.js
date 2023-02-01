const nodemailer = require('nodemailer');

async function sendEmail(stage, user) {
    // user argument person sending email
    const receiveMail = process.env.RECEIVE_MAIL; // email to would come from array based on stage
    const stageName = stage.stageName;
    const dateNow = new Date();
    const currentDate = (dateNow.getMonth()+1) + '-' + dateNow.getDate() + '-' + dateNow.getFullYear() 
    const stageDate = (stage.dateChanged.getMonth()+1) + '-' + stage.dateChanged.getDate() + '-' + stage.dateChanged.getFullYear();
    console.log('currentDate: ' + currentDate + '    stageDate: ' + stageDate + ' user: ' + user)

    const mail = {
                    "email": receiveMail,
                    "created": dateNow.toString()
                }
        const sender = process.env.SEND_EMAIL;
        
        const senderPassword = process.env.EMAIL_PASSWORD;
        
        let transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
              user: sender, // username for your mail server
              pass: senderPassword, // password
          },

        });

    let info = await transporter.sendMail({
            from: sender, // sender address
            to: receiveMail, // list of receivers seperated by comma
            subject: "Stage changed to " + stageName, // Subject line
            html: `Stage has been updated to <b>${stageName}</b>.`, // plain text body
        }, (error, info) => {
            if (error) {
                console.log(error)
                return;
            }
            console.log('Message sent successfully!');
            console.log(info);
            transporter.close();
        });


}

module.exports = sendEmail;