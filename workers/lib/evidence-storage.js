import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import crypto from 'crypto';

let s3Client;

function getClient() {
  if (!process.env.AWS_REGION || !process.env.S3_BUCKET) return null;
  if (!s3Client) {
    s3Client = new S3Client({
      region: process.env.AWS_REGION,
      ...(process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY
        ? {
            credentials: {
              accessKeyId: process.env.AWS_ACCESS_KEY_ID,
              secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            },
          }
        : {}),
    });
  }
  return s3Client;
}

/**
 * Upload raw HTML or blob to S3; returns storage key (and optional s3 uri).
 * If S3 is not configured, returns null (callers store content in the DB only).
 */
export async function uploadEvidenceBlob(body, { contentType = 'text/html', extension = 'html' } = {}) {
  const client = getClient();
  if (!client) return null;

  const key = `evidence/${crypto.randomBytes(16).toString('hex')}.${extension}`;
  await client.send(
    new PutObjectCommand({
      Bucket: process.env.S3_BUCKET,
      Key: key,
      Body: typeof body === 'string' ? Buffer.from(body, 'utf-8') : body,
      ContentType: contentType,
    })
  );
  return { key, uri: `s3://${process.env.S3_BUCKET}/${key}` };
}
