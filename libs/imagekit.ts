const IMAGEKIT_API_BASE = "https://api.imagekit.io/v1";

function basicAuthHeader(privateKey: string): string {
  return `Basic ${Buffer.from(privateKey).toString("base64")}`;
}

function getPrivateKey(): string {
  const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;

  if (!privateKey) {
    throw new Error("IMAGEKIT_PRIVATE_KEY is not configured");
  }

  return privateKey;
}

export async function deleteImageKitFile(
  fileId: string,
): Promise<void> {
  const response = await fetch(
    `${IMAGEKIT_API_BASE}/files/${encodeURIComponent(fileId)}`,
    {
      method: "DELETE",
      headers: {
        Authorization: basicAuthHeader(getPrivateKey()),
      },
    },
  );

  // Already deleted → nothing to do
  if (response.status === 404) {
    return;
  }

  if (!response.ok) {
    const body = await response.text();

    throw new Error(
      `ImageKit delete failed (${response.status}): ${body}`,
    );
  }
}