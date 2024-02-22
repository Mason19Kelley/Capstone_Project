import { StorageFile } from "src/storage/storage-file";
import { DownloadResponse, Storage } from "@google-cloud/storage";
import { Injectable } from "@nestjs/common";
import StorageConfig from "./storage-config";
import * as path from 'path';

@Injectable()
export class StorageService {
  private storage: Storage;

  constructor() {
    this.storage = new Storage({
      credentials: JSON.parse(process.env.GOOGLE_JSON_KEY)
    });
  }

  async save(path: string, media: Buffer, bucket: string,metadata: { [key: string]: string }[]) {
    const object = metadata.reduce((obj, item) => Object.assign(obj, item), {});
    const file = this.storage.bucket(bucket).file(path);
    const stream = file.createWriteStream();
    stream.on("finish", async () => {
      return await file.setMetadata({
        metadata: object,
      });
    });
    stream.end(media);
  }

  async delete(bucket: string, path: string) {
    await this.storage
      .bucket(bucket)
      .file(path)
      .delete({ ignoreNotFound: true });
  }

  async get(bucket: string, path: string): Promise<any> {

    const fileResponse = await this.storage
      .bucket(bucket)
      .file(path)
      .download();
    const [buffer] = fileResponse;
    const storageFile = new StorageFile();
    storageFile.buffer = buffer;
    return storageFile;
  }

}

