import {
    Controller,
    Post,
    UseInterceptors,
    UploadedFile,
    Body,
} from '@nestjs/common';
import {FileInterceptor} from '@nestjs/platform-express';
import {Metadata} from '../model';
import {IpfsUploader} from './ipfs-uploader';

@Controller('upload')
export class UploadController {
    constructor(private readonly uploader: IpfsUploader) {}

    @Post()
    @UseInterceptors(FileInterceptor('data'))
    async upload(
        @UploadedFile() file,
        @Body('bucket') bucket: string,
    ): Promise<string> {
        const metadata: Metadata = {
            headers: {
                filename: file.originalname,
                contentType: file.mimetype,
                size: file.size,
            },
            id: '',
            path: `/${bucket}/${file.originalname}`,
        };
        return await this.uploader.upload(metadata, file.buffer);
    }
}
