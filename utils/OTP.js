const nodemailer = require("nodemailer");


var email;

var otp = Math.random();
otp = otp * 1000000;
otp = parseInt(otp);
console.log("OTP:", otp);

const sendOTP = async (options) => {

exports.createUser = (user) => {
    return User.create(user);
}

let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    service: 'Gmail',

    auth: {
        user: 'rahulthangamani2002@gmail.com',
        pass: '8608340306',
    }
});

// // const { Auth, LoginCredentials } = require("two-step-auth");
  
// // async function login(emailId) {
// //   try {
// //     const res = await Auth(emailId, "Company Name");
// //     console.log(res);
// //     console.log(res.mail);
// //     console.log(res.OTP);
// //     console.log(res.success);
// //   } catch (error) {
// //     console.log(error);
// //   }
// // }
  
// // // This should have less secure apps enabled
// // LoginCredentials.mailID = "rahulthangamani2002@gmail.com"; 
  
// // // You can store them in your env variables and
// // // access them, it will work fine
// // LoginCredentials.password = "8608340306"; 
// // LoginCredentials.use = true;
  
// // // Pass in the mail ID you need to verify
// // login("rahulthangamani2002@gmail.com"); 

// app.post('/send', function (req, res) {
//     email = req.body.email;

    // send mail with defined transport object
    var mailOptions = {
        to: req.body.email,
        subject: "Otp for registration is: ",
        html: "<h3>OTP for account verification is </h3>" + "<h1 style='font-weight:bold;'>" + otp + "</h1>" // html body
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        res.render('otp');
    });


app.post('/verify', function (req, res) {

    if (req.body.otp == otp) {
        res.send("You has been successfully registered");
    }
    else {
        res.render('otp', { msg: 'otp is incorrect' });
    }
});

app.post('/resend', function (req, res) {
    var mailOptions = {
        to: email,
        subject: "Otp for registration is: ",
        html: "<h3>OTP for account verification is </h3>" + "<h1 style='font-weight:bold;'>" + otp + "</h1>" // html body
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        res.render('otp', { msg: "otp has been sent" });
    });

});

//defining port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`app is live at ${PORT}`);
})


}