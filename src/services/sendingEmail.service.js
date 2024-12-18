import nodemailer from 'nodemailer'


export const sendEmailService = async ({ to = "", subject="", textMessage="", htmlMessage="", attachments=[] } = {}) => {
    //transport configuration
    const transport = nodemailer.createTransport({
        host: 'localhost',
        port:587, 
        secure: false,
        auth: {
            user:'aabdalnaby073@gmail.com',
            pass: "txxnbgsuzfturawm",
        },
        service:"gmail", 
        tls:{
            rejectUnauthorized: false,
        }
    });

    //email configuration

    const info = await transport.sendMail({
        from : "No-reply <aabdalnaby073@gmail.com>",
        to,
        subject,
        text: textMessage, 
        html: htmlMessage,
        attachments
    })
    return info

}