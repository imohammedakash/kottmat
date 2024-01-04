import nodemailer from 'nodemailer'
class verificationHelper {

    sendMail = async (recipient, subject, body) => {
        let MAIL_SERVICE_USER = process.env.MAIL_SERVICE_USER;
        let MAIL_SERVICE_PASSWORD = process.env.MAIL_SERVICE_PASSWORD;
        let MAIL_SERVICE_ACCOUNT = process.env.MAIL_SERVICE_ACCOUNT;
        let MAIL_SERVICE_HOST = process.env.MAIL_SERVICE_HOST;
        let MAIL_SERVICE_PORT = process.env.MAIL_SERVICE_PORT;
        const transporter = nodemailer.createTransport({
            port: MAIL_SERVICE_PORT,
            host: MAIL_SERVICE_HOST,
            secure: true,
            auth: {
                user: MAIL_SERVICE_USER,
                pass: MAIL_SERVICE_PASSWORD,
            },
        });
        const mailOptions = {
            from: MAIL_SERVICE_ACCOUNT,
            to: recipient,
            subject: subject,
            html: body,
        };
        try {
            let data = await transporter.sendMail(mailOptions);
            return { ...data }
        } catch (error) {
            console.log(error);
            throw error
        }
    }


}

export default new verificationHelper()