import { StorageFile } from "src/storage/storage-file";
import { DownloadResponse, Storage } from "@google-cloud/storage";
import { Injectable } from "@nestjs/common";
import StorageConfig from "./storage-config";

@Injectable()
export class StorageService {
  private storage: Storage;

  constructor() {
    console.log(process.env)
    console.log(StorageConfig)
    this.storage = new Storage({
      projectId: StorageConfig.projectId,
      credentials: {
        client_email: StorageConfig.client_email,
        private_key: StorageConfig.private_key,
      },
    });

  }

  async save(
    path: string,
    contentType: string,
    media: Buffer,
    bucket: string,
    metadata: { [key: string]: string }[]
  ) {
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

  async get(bucket: string, path: string): Promise<StorageFile> {
    console.log(this.storage)
    const fileResponse: DownloadResponse = await this.storage
      .bucket(bucket)
      .file(path)
      .download();
      console.log(fileResponse)
    const [buffer] = fileResponse;
    const storageFile = new StorageFile();
    storageFile.buffer = buffer;
    storageFile.metadata = new Map<string, string>();
    return storageFile;
  }

  // async getWithMetaData(bucket: string, path: string): Promise<StorageFile> {
  //   const [metadata] = await this.storage
  //     .bucket(bucket)
  //     .file(path)
  //     .getMetadata();
  //   const fileResponse: DownloadResponse = await this.storage
  //     .bucket(bucket)
  //     .file(path)
  //     .download();
  //   const [buffer] = fileResponse;

  //   const storageFile = new StorageFile();
  //   storageFile.buffer = buffer;
  //   storageFile.metadata = new Map<string, string>(
  //     Object.entries(metadata || {})
  //   );
  //   storageFile.contentType = storageFile.metadata.get("contentType");
  //   return storageFile;
  // }
}

