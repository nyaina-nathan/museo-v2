"use client";

import { upload } from "@imagekit/next";
import { useState } from "react";

export interface UploadedImage {
  url: string;
  fileId?: string;
}

export function useImageKitUpload() {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function uploadFile(file: File): Promise<UploadedImage | null> {
    setUploading(true);
    setError(null);

    try {
      const authResponse = await fetch("/api/image-kit/auth");

      if (!authResponse.ok) {
        throw new Error("Failed to authenticate");
      }

      const auth = await authResponse.json();

      const result = await upload({
        file,
        fileName: file.name,
        publicKey: auth.publicKey,
        token: auth.token,
        signature: auth.signature,
        expire: auth.expire,
        folder: "/products",
        useUniqueFileName: true,
      });

      return { url: result.url as string, fileId: result.fileId };
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Upload failed";
      setError(message);
      return null;
    } finally {
      setUploading(false);
    }
  }

  return { uploading, error, uploadFile };
}