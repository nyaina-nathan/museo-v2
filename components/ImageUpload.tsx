"use client";

import { useImageKitUpload } from "@/hooks/useImageKitUpload";
import { useState } from "react";

export default function ImageUpload() {
  const { uploading, error, uploadFile } = useImageKitUpload();
  const [imageUrl, setImageUrl] = useState("");

  async function handleUpload(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];

    if (!file) return;

    const uploaded = await uploadFile(file);

    if (uploaded) {
      setImageUrl(uploaded.url);
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

      {error && <p>{error}</p>}

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