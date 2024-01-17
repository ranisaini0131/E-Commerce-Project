//configuation for sending email from gmail
import nodemailer from "nodemailer"

export const sendMail = async (req, res) => {

    const { username, email } = req.body
    let config = {
        service: "gmail",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    }

    let transporter = nodemailer.createTransport(config)

    let mailOptions = {
        from: process.env.EMAIL,
        to: username || email,
        subject: "OTP TO RESET PASSWORD",
        text: `Your OTP is: ${userOtp}`
    }


    // /this method send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (!error) {
            res.status(200).json({
                message: 'Email has been sent',
                info: info.messageId,
                preview: nodemailer.getTestMessageUrl(info)
            })
            console.log(info.response, "258")
        } else {
            console.log('Error occurred', error);
        }
    })

}



export const sendMailByTestAccount = async (req, res) => {


    //testing account
    let testAccount = await nodemailer.createTestAccount();


    //Nodemailer configuartion
    const transporter = nodemailer.createTransport({
        // service: "gmail",
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
            user: testAccount.user,
            pass: testAccount.pass
        }
    })



    //this method send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (!error) {
            res.status(200).json({
                message: 'Email has been sent',
                info: info.messageId,
                preview: nodemailer.getTestMessageUrl(info)
            })
            console.log(info.response, "258")
        } else {
            console.log('Error occurred', error);
        }
    })


}