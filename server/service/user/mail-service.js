const nodemailer = require('nodemailer');

class MailService {
    constructor(){
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: true,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD,
            }
        })
    }
    sendActivationMail = async(to, link) => {
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: 'Account activation on ' + process.env.API_URL,
            text: '',
            html: `
                    <div>
                        <h3> please follow the link to confirm your email </h3>
                        <a href='${link}'>${link}</a>
                    </div>
            `
        })
    }
}

module.exports = new MailService();