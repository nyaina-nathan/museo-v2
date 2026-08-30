"use client";

import { upload } from "@imagekit/next";
import { useState } from "react";

export default function ImageUpload() {
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  async function handleUpload(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];

    if (!file) return;

    setUploading(true);

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

      console.log(result);

      setImageUrl(result.url as string);
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={handleUpload}
      />

      {uploading && <p>Uploading...</p>}

      {imageUrl && (
        <img
          src={imageUrl}
          alt="Uploaded product"
          width={300}
        />
      )}
    </div>
  );
}