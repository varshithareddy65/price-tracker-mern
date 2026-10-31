
const nodemailer = require('nodemailer');

const sendEmail = async (to, product, price, url) => {

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        throw new Error('Email credentials are missing');
    }

    if (!to) {
        throw new Error('Recipient email is missing');
    }

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: to,
        subject: 'Price Drop Alert!',
        text: `
Good news!

Your tracked product "${product}" has dropped to ₹${price}.

Product Link:
${url}

Check it out now!
        `
    };

    // Throws an error if email delivery fails
    const info = await transporter.sendMail(mailOptions);

    console.log('Email sent successfully:', info.messageId);

    return info;
};

module.exports = sendEmail;
