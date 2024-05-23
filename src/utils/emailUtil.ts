import nodemailer from 'nodemailer';

export const sendEmail = async (to: string, subject: string, body: string) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: to,
        subject: subject,
        text: body,
    };

    await transporter.sendMail(mailOptions);
};
