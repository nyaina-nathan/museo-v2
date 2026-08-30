"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { useImageKitUpload } from "@/hooks/useImageKitUpload";
import type { Jersey, JerseyImage } from "@/types/jersey.types";

export default function JerseyDetailPage() {
  const { jerseyId } = useParams<{ jerseyId: string }>();
  const router = useRouter();
  const { uploading, uploadFile } = useImageKitUpload();

  const [jersey, setJersey] = useState<Jersey | null>(null);
  const [images, setImages] = useState<JerseyImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const [uploadError, setUploadError] = useState<string | null>(null);
  const [editingImageId, setEditingImageId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const loadImages = useCallback(async () => {
    try {
      const response = await fetch(`/api/jerseys/${jerseyId}/images`);

      if (!response.ok) {
        const body = await response.json().catch(() => null);
        throw new Error(body?.message ?? "Failed to load images");
      }

      setImages(await response.json());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  }, [jerseyId]);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const [jerseyResponse, imagesResponse] = await Promise.all([
          fetch(`/api/jerseys/${jerseyId}`),
          fetch(`/api/jerseys/${jerseyId}/images`),
        ]);

        if (!jerseyResponse.ok) {
          const body = await jerseyResponse.json().catch(() => null);
          throw new Error(body?.message ?? "Failed to load jersey");
        }

        const jerseyData: Jersey = await jerseyResponse.json();

        if (cancelled) return;

        setJersey(jerseyData);
        setName(jerseyData.name);
        setDescription(jerseyData.description ?? "");
        setPrice(jerseyData.price === null ? "" : String(jerseyData.price));
        setIsPublic(jerseyData.is_public);

        if (imagesResponse.ok) {
          setImages(await imagesResponse.json());
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Something went wrong");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [jerseyId]);

  async function handleUpdate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setSaving(true);
    setSaveError(null);

    try {
      const response = await fetch(`/api/jerseys/${jerseyId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          description: description === "" ? null : description,
          price: price === "" ? null : Number(price),
          is_public: isPublic,
        }),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => null);
        throw new Error(body?.message ?? "Failed to update jersey");
      }

      setJersey(await response.json());
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!window.confirm("Delete this jersey and its images?")) return;

    setDeleting(true);
    setError(null);

    try {
      const response = await fetch(`/api/jerseys/${jerseyId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const body = await response.json().catch(() => null);
        throw new Error(body?.message ?? "Failed to delete jersey");
      }

      router.push("/admin");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setDeleting(false);
    }
  }

  async function handleUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) return;

    setUploadError(null);

    const uploaded = await uploadFile(file);

    if (!uploaded) {
      setUploadError("Upload failed");
      return;
    }

    try {
      const response = await fetch(`/api/jerseys/${jerseyId}/images`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: uploaded.url,
          file_id: uploaded.fileId ?? null,
        }),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => null);
        throw new Error(body?.message ?? "Failed to save image");
      }

      await loadImages();
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  }

  async function handleDeleteImage(image: JerseyImage) {
    if (!window.confirm(`Delete image "${image.title}"?`)) return;

    try {
      const response = await fetch(
        `/api/jerseys/${jerseyId}/images/${image.id}`,
        { method: "DELETE" }
      );

      if (!response.ok) {
        const body = await response.json().catch(() => null);
        throw new Error(body?.message ?? "Failed to delete image");
      }

      await loadImages();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  function startEditTitle(image: JerseyImage) {
    setEditingImageId(image.id);
    setEditTitle(image.title);
  }

  async function handleSaveTitle(image: JerseyImage) {
    try {
      const response = await fetch(
        `/api/jerseys/${jerseyId}/images/${image.id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title: editTitle }),
        }
      );

      if (!response.ok) {
        const body = await response.json().catch(() => null);
        throw new Error(body?.message ?? "Failed to update title");
      }

      setEditingImageId(null);
      await loadImages();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  if (loading) {
    return (
      <div className="mx-auto w-full max-w-2xl p-6">
        <p>Loading...</p>
      </div>
    );
  }

  if (error && !jersey) {
    return (
      <div className="mx-auto w-full max-w-2xl p-6">
        <p className="text-red-600">{error}</p>
        <Link href="/admin" className="mt-4 inline-block text-sm underline">
          Back to admin
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-2xl p-6">
      <Link href="/admin" className="mb-4 inline-block text-sm underline">
        Back to admin
      </Link>

      <h1 className="mb-6 text-2xl font-semibold">{jersey?.name}</h1>

      <form
        onSubmit={handleUpdate}
        className="mb-8 flex flex-col gap-3 rounded-lg border border-gray-200 p-4"
      >
        <h2 className="text-lg font-medium">Edit jersey</h2>

        <label className="flex flex-col gap-1">
          <span className="text-sm">Name</span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="rounded border border-gray-300 px-3 py-2"
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-sm">Description</span>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="rounded border border-gray-300 px-3 py-2"
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-sm">Price</span>
          <input
            type="number"
            min={1}
            step={1}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="rounded border border-gray-300 px-3 py-2"
          />
        </label>

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={isPublic}
            onChange={(e) => setIsPublic(e.target.checked)}
          />
          Public
        </label>

        {saveError && <p className="text-sm text-red-600">{saveError}</p>}

        <div className="flex gap-2">
          <button
            type="submit"
            disabled={saving}
            className="rounded bg-black px-4 py-2 text-white disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save"}
          </button>

          <button
            type="button"
            onClick={handleDelete}
            disabled={deleting}
            className="rounded bg-red-600 px-4 py-2 text-white disabled:opacity-50"
          >
            {deleting ? "Deleting..." : "Delete jersey"}
          </button>
        </div>
      </form>

      <section>
        <h2 className="mb-4 text-lg font-medium">Images</h2>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleUpload}
          className="mb-4"
        />

        {uploading && <p>Uploading...</p>}

        {uploadError && <p className="text-sm text-red-600">{uploadError}</p>}

        {images.length === 0 ? (
          <p className="text-gray-500">No images yet.</p>
        ) : (
          <ul className="grid grid-cols-2 gap-4">
            {images.map((image) => (
              <li
                key={image.id}
                className="rounded border border-gray-200 p-3"
              >
                <img
                  src={image.url}
                  alt={image.title}
                  width={300}
                  className="mb-2 h-40 w-full rounded object-cover"
                />

                {editingImageId === image.id ? (
                  <div className="flex flex-col gap-1">
                    <input
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="rounded border border-gray-300 px-2 py-1 text-sm"
                    />
                    <div className="flex gap-1">
                      <button
                        onClick={() => handleSaveTitle(image)}
                        className="rounded bg-black px-2 py-1 text-xs text-white"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingImageId(null)}
                        className="rounded border border-gray-300 px-2 py-1 text-xs"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between gap-2">
                    <span className="truncate text-sm">{image.title}</span>
                    <div className="flex shrink-0 gap-1">
                      <button
                        onClick={() => startEditTitle(image)}
                        className="rounded border border-gray-300 px-2 py-1 text-xs"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteImage(image)}
                        className="rounded bg-red-600 px-2 py-1 text-xs text-white"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}