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

  async get(bucket: string, path: string): Promise<any> {

    console.log(await this.storage
      .bucket(bucket))
    const fileResponse = await this.storage
      .bucket(bucket)
      .file('SpeedRunner_MKK020.txt')
      .download();
    console.log('success')
    console.log(fileResponse)
    // const [buffer] = fileResponse;
    // const storageFile = new StorageFile();
    // storageFile.buffer = buffer;
    // storageFile.metadata = new Map<string, string>();
    // return storageFile;
  }

  async createBucket(bucketName: string) {
    // Creates a new bucket in the Asia region with the coldline default storage
    // class. Leave the second argument blank for default settings.
    //
    // For default values see: https://cloud.google.com/storage/docs/locations and
    // https://cloud.google.com/storage/docs/storage-classes
    console.log('creating')
    // console.log(this.storage)
    const [bucket] = await this.storage.createBucket(bucketName);
    console.log(bucket)
    console.log(`Bucket ${bucket.name} created.`);
  }

  async listBuckets() {
    try {
      const [buckets] = await this.storage.getBuckets();
  
      console.log('Buckets:');
      buckets.forEach(bucket => {
        console.log(bucket.name);
      });
    } catch (error) {
      console.error('ERROR:', error);
    }
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

