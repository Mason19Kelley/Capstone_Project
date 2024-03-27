import { Body, Controller, Get, NotFoundException, Param, Post, Res, ServiceUnavailableException, UploadedFile, UseGuards, UseInterceptors, } from '@nestjs/common';
import { StorageFile } from 'src/storage/storage-file';
import { Response } from 'express';
import { StorageService } from 'src/storage/storage.service';
import * as mime from 'mime-types';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('file')
export class FileController {
    constructor(private storageService: StorageService) {}

    @UseGuards(JwtAuthGuard)
    @Post('uploadFile')
    @UseInterceptors(FileInterceptor('file'))
    async uploadMedia(@UploadedFile() file: Express.Multer.File) {
        
        await this.storageService.save(file.originalname, file.buffer, "surge-videos", [{ mediaId: file.originalname }]);
    }

    @UseGuards(JwtAuthGuard)
    @Get("getFile/:fileName")
    async downloadMedia(@Param("fileName") fileName: string, @Res() res: Response) {
        let storageFile: StorageFile;
        try {
            storageFile = await this.storageService.get("surge-videos", fileName);
        } catch (e) {
            if (e.message.toString().includes("No such object")) {
                throw new NotFoundException("file not found");
            } else {
                throw new ServiceUnavailableException("internal error");
            }
        }
        const mimetype = mime.lookup(storageFile) || 'application/octet-stream';

        // Set the headers
        res.setHeader('Content-Type', mimetype);
        res.setHeader('Content-Disposition', 'attachment; filename=' + fileName);

        // Stream the file to the response
        res.send(storageFile.buffer);
    }

    @UseGuards(JwtAuthGuard)
    @Post("deleteFile/:fileName")
    async deleteMedia(@Param("fileName") fileName: string) {
        await this.storageService.delete("surge-videos", fileName);
    }


}
