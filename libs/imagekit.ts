import ImageKit from "@imagekit/nodejs";

export async function deleteImageKitFile(
  fileId: string,
): Promise<void> {
  const imagekit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
  });
  
  await imagekit.files.delete(fileId);
}