import nodemailer from 'nodemailer';

export default class Mailer {

    constructor(opts = {}) {
        this.opts = opts;
        this.inited = false;
        this.init();
    }

    async init() {
        // Generate test SMTP service account from ethereal.email
        // Only needed if you don't have a real mail account for testing
        this._testAccount = await nodemailer.createTestAccount();

        // create reusable transporter object using the default SMTP transport
        this._transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: this._testAccount.user, // generated ethereal user
                pass: this._testAccount.pass, // generated ethereal password
            },
        });
        this.inited = true;
    }

    async send({ subject, text, html }) {
        if (!this.inited) {
            await this.init();
        }
        // send mail with defined transport object
        let info = await transporter.sendMail({
            // from: '"Fred Foo 👻" <foo@example.com>', // sender address
            // to: "bar@example.com, baz@example.com", // list of receivers
            from: this.opts.sender, // sender address
            to: this.opts.receiver, // list of receivers
            subject, // Subject line
            text, // plain text body
            html, // html body
        });

        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    }
}