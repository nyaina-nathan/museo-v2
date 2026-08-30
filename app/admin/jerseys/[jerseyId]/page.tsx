"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { useImageKitUpload } from "@/hooks/useImageKitUpload";
import type { Jersey, JerseyImage } from "@/types/jersey.types";

const inputStyles = "rounded border border-border px-3 py-2 focus:border-primary";

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

  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadTitle, setUploadTitle] = useState("");
  const [uploadIsPrimary, setUploadIsPrimary] = useState(false);
  const [previewImage, setPreviewImage] = useState<JerseyImage | null>(null);

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

  function openUploadModal() {
    setSelectedFile(null);
    setPreviewUrl(null);
    setUploadTitle("");
    setUploadIsPrimary(false);
    setUploadError(null);
    setShowUploadModal(true);
  }

  function closeUploadModal() {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setSelectedFile(null);
    setPreviewUrl(null);
    setUploadTitle("");
    setUploadIsPrimary(false);
    setUploadError(null);
    setShowUploadModal(false);
  }

  function handleFileSelect(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) return;

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    setUploadError(null);
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    setUploadTitle(file.name.replace(/\.[^.]+$/, ""));
  }

  async function handleUploadSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!selectedFile) return;

    setUploadError(null);

    const uploaded = await uploadFile(selectedFile);

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
          ...(uploadTitle.trim() ? { title: uploadTitle.trim() } : {}),
          is_primary: uploadIsPrimary,
        }),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => null);
        throw new Error(body?.message ?? "Failed to save image");
      }

      closeUploadModal();
      await loadImages();
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : "Something went wrong");
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

  async function handleSetPrimary(image: JerseyImage) {
    try {
      const response = await fetch(
        `/api/jerseys/${jerseyId}/images/${image.id}/primary`,
        { method: "PATCH" }
      );

      if (!response.ok) {
        const body = await response.json().catch(() => null);
        throw new Error(body?.message ?? "Failed to set primary image");
      }

      await loadImages();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  if (loading) {
    return (
      <div className="mx-auto w-full max-w-2xl p-6">
        <p className="text-text-light">Loading...</p>
      </div>
    );
  }

  if (error && !jersey) {
    return (
      <div className="mx-auto w-full max-w-2xl p-6">
        <p className="text-primary-dark">{error}</p>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.push("/admin")}
          className="mt-4"
        >
          Back to archive
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-2xl p-6">
      <header className="mb-10 flex items-end justify-between border-b border-border pb-4">
        <div>
          <Link
            href="/admin"
            className="font-display text-3xl font-bold tracking-wide text-primary"
          >
            MUSEO
          </Link>
          <p className="mt-1 text-sm text-text-light">Administration</p>
        </div>

        <Button variant="ghost" size="sm" onClick={() => router.push("/admin")}>
          Back to archive
        </Button>
      </header>

      <h1 className="mb-8 font-display text-3xl font-bold text-primary">
        {jersey?.name}
      </h1>

      <form
        onSubmit={handleUpdate}
        className="mb-10 flex flex-col gap-3 rounded-lg border border-border bg-white p-6"
      >
        <h2 className="font-display text-xl font-bold text-primary">
          Curate this piece
        </h2>

        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium">Name</span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className={inputStyles}
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium">Description</span>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={inputStyles}
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium">Price</span>
          <input
            type="number"
            min={1}
            step={1}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className={inputStyles}
          />
        </label>

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={isPublic}
            onChange={(e) => setIsPublic(e.target.checked)}
            className="accent-primary"
          />
          Public
        </label>

        {saveError && <p className="text-sm text-primary-dark">{saveError}</p>}

        <div className="flex gap-2">
          <Button type="submit" disabled={saving}>
            {saving ? "Saving..." : "Save changes"}
          </Button>

          <Button
            variant="danger"
            onClick={handleDelete}
            disabled={deleting}
          >
            {deleting ? "Deleting..." : "Remove from archive"}
          </Button>
        </div>
      </form>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-2xl font-bold text-primary">
            Imagery
          </h2>

          <Button size="sm" onClick={openUploadModal}>
            Upload new photo
          </Button>
        </div>

        {images.length === 0 ? (
          <p className="text-text-light">
            This piece awaits its visual testimony.
          </p>
        ) : (
          <ul className="grid grid-cols-2 gap-6">
            {images.map((image) => (
              <li key={image.id} className="stamp-border my-2 bg-white p-3">
                <button
                  type="button"
                  onClick={() => setPreviewImage(image)}
                  className="mb-2 block w-full cursor-zoom-in"
                  aria-label={`Preview ${image.title}`}
                >
                  <img
                    src={image.url}
                    alt={image.title}
                    width={300}
                    className="h-40 w-full rounded object-cover"
                  />
                </button>

                {editingImageId === image.id ? (
                  <div className="flex flex-col gap-1">
                    <input
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className={`${inputStyles} px-2 py-1 text-sm`}
                    />
                    <div className="flex gap-1">
                      <Button
                        size="sm"
                        onClick={() => handleSaveTitle(image)}
                      >
                        Save
                      </Button>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => setEditingImageId(null)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="truncate text-sm font-medium text-text-dark">
                        {image.title}
                      </span>
                      {image.is_primary && (
                        <span className="shrink-0 rounded bg-primary px-2 py-0.5 text-xs font-semibold text-white">
                          Primary
                        </span>
                      )}
                    </div>
                    <div className="flex shrink-0 gap-1">
                      {!image.is_primary && (
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => handleSetPrimary(image)}
                        >
                          Set primary
                        </Button>
                      )}
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => startEditTitle(image)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDeleteImage(image)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>

      {showUploadModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-6"
          onClick={closeUploadModal}
          role="dialog"
          aria-modal="true"
          aria-label="Upload a new photo"
        >
          <form
            onSubmit={handleUploadSubmit}
            onClick={(event) => event.stopPropagation()}
            className="flex w-full max-w-md flex-col gap-4 rounded-lg border border-border bg-white p-6"
          >
            <h2 className="font-display text-xl font-bold text-primary">
              Upload a new photo
            </h2>

            <div className="flex flex-col items-center gap-3 rounded border border-dashed border-primary/40 bg-primary/5 p-4">
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Selected photo preview"
                  width={300}
                  className="h-40 w-full rounded object-contain"
                />
              ) : (
                <p className="text-sm text-text-light">
                  Select an image to add to this piece
                </p>
              )}

              <label className="cursor-pointer text-sm font-medium text-primary underline">
                {previewUrl ? "Choose a different image" : "Select an image"}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </label>
            </div>

            <label className="flex flex-col gap-1">
              <span className="text-sm font-medium">Title</span>
              <input
                value={uploadTitle}
                onChange={(e) => setUploadTitle(e.target.value)}
                placeholder="Optional"
                className={inputStyles}
              />
            </label>

            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={uploadIsPrimary}
                onChange={(e) => setUploadIsPrimary(e.target.checked)}
                className="accent-primary"
              />
              Set as primary photo
            </label>

            {uploadError && (
              <p className="text-sm text-primary-dark">{uploadError}</p>
            )}

            <div className="flex gap-2">
              <Button
                type="submit"
                disabled={!selectedFile || uploading}
              >
                {uploading ? "Uploading..." : "Add photo"}
              </Button>

              <Button
                variant="secondary"
                type="button"
                onClick={closeUploadModal}
                disabled={uploading}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}

      {previewImage && (
        <div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/95 p-6"
          onClick={() => setPreviewImage(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`Preview ${previewImage.title}`}
        >
          <img
            src={previewImage.url}
            alt={previewImage.title}
            className="max-h-full max-w-full rounded object-contain"
            onClick={(event) => event.stopPropagation()}
          />

          <div className="mt-4 flex items-center gap-4">
            <span className="text-sm text-white/80">{previewImage.title}</span>
            <button
              onClick={() => setPreviewImage(null)}
              className="rounded border border-white/40 px-4 py-2 text-sm text-white hover:bg-white hover:text-primary"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}