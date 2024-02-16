import { Controller, Get, NotFoundException, Param, Post, Res, ServiceUnavailableException, } from '@nestjs/common';
import { StorageFile } from 'src/storage/storage-file';
import { Response } from 'express';
import { StorageService } from 'src/storage/storage.service';

@Controller('file')
export class FileController {
    constructor(private storageService: StorageService) {}

    // @Post()
    // @UseInterceptors(
    //     FileInterceptor("file", {
    //     limits: {
    //         files: 1,
    //         fileSize: 1024 * 1024,
    //     },
    //     })
    // )
    // async uploadMedia(
    //     @UploadedFile() file: Express.Multer.File,
    //     @Body("mediaId") mediaId: string
    // ) {
    //     await this.storageService.save(
    //     "media/" + mediaId,
    //     file.mimetype,
    //     file.buffer,
    //     [{ mediaId: mediaId }]
    //     );
    // }

    @Get("getFile/:fileName")
    async downloadMedia(@Param("fileName") fileName: string, @Res() res: Response) {
        let storageFile: StorageFile;
        try {
            storageFile = await this.storageService.get("surge-videos", "SpeedRunner_MKK020.txt");
        } catch (e) {
        if (e.message.toString().includes("No such object")) {
            throw new NotFoundException("file not found");
        } else {
            throw new ServiceUnavailableException("internal error");
        }
        }
        res.setHeader("Content-Type", storageFile.contentType);
        res.setHeader("Cache-Control", "max-age=60d");
        res.end(storageFile.buffer);
    }

    @Post("createBucket/:bucketName")
    async createBucket(@Param("bucketName") bucketName: string, @Res() res: Response) {
        try {
            // let bucket = await this.storageService.createBucket(bucketName)
            await this.storageService.listBuckets()
        } catch (e) {
            if (e.message.toString().includes("No such object")) {
                throw new NotFoundException("file not found");
            } else {
                throw new ServiceUnavailableException("internal error");
            }
        }
    }

}
