import { Injectable } from "@nestjs/common";

const nodemailer = require("nodemailer");
@Injectable()
export class MailerService {
  constructor() { }
  async execute(filename : string, email : string) {
    try {

      // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: "pruebamailer973@gmail.com", // generated ethereal user
          pass: "dragon16force1209", // generated ethereal password
        },
      });


      // send mail with defined transport object
      let info = await transporter.sendMail({
        from: '"seggi" <pruebamailer973@gmail.com>', // sender address
        to: email, // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>",// html body
        attachments: [
          {
            filename: filename,
            path: './Uploads/'+ filename
          }
        ]
      });
    } catch (error) {
      console.log(error)

    }



  }



}