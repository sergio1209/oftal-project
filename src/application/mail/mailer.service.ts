import { Injectable } from "@nestjs/common";


const nodemailer = require("nodemailer");
@Injectable()
export class MailerService {
  constructor() { }
  async execute(filename : string,  data:any){
    try {

      // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: "pruebamailer973@gmail.com", // generated ethereal user
          pass: "Dragonforce1612", // generated ethereal password
        },
      });


      // send mail with defined transport object
      let info = await transporter.sendMail({
        from: '"seggi" <pruebamailer973@gmail.com>', // sender address
        to: data.to, // list of receivers
        subject: data.subject, // Subject line
        html: data.html,// html body
        cc:data.cc,
        attachments: [
          {
            filename: filename,
            path: './uploads/'+ filename
          }
        ]
      });
      
     
    } catch (error) {
      console.log(error)

    }
   

  }




}

