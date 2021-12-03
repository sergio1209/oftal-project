import { Controller, Param, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiBody, ApiConsumes, ApiProperty, ApiTags } from "@nestjs/swagger";
import { diskStorage } from "multer";
import { extname } from "path";
import { MailerService } from "src/application/mail/mailer.service";

const editFileName = (req: any, file: any, callback: any) => {
    const name = file.originalname.split(".")[0];
    const fileExtName = extname(file.originalname);
    const randomName = Array(4)
        .fill(null)
        .map(() => Math.round(Math.random() * 16).toString(16))
        .join("");


    //const hash = crypto.createHash('md5').update(`${name}-${randomName}${fileExtName}`).digest('hex')
    callback(null, `${name}-${randomName}${fileExtName}`);
};


@ApiTags('mailer')
@Controller('mailer')
export class MailerController {
    constructor(private mailerService: MailerService){

    }
    @Post("uploads/:email")
    @ApiConsumes("multipart/form-data")
    @ApiBody({
        schema: {
            type: "object",
            properties: {
                file: {
                    type: "string",
                    format: "binary",
                },
            },
        },
    })
    @UseInterceptors(
        FileInterceptor("file", {
            storage: diskStorage({
                destination: "./uploads/",
                filename: editFileName,
            }),
        })
    )
    async upload(@UploadedFile('file') file: any, @Param('email') email: string) {
        try {
            console.log(file)
            this.mailerService.execute(file.filename, email)
        } catch (error) {
            console.log(error)
        }

    }
}