"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Header } from "@/components/client/Header";
import { Footer } from "@/components/client/Footer";
import { Button } from "@/components/ui/Button";
import type { Jersey, JerseyImage } from "@/types/jersey.types";

export default function CollectionDetailPage() {
  const { collectionId } = useParams<{ collectionId: string }>();
  const router = useRouter();

  const [jersey, setJersey] = useState<Jersey | null>(null);
  const [images, setImages] = useState<JerseyImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const [jerseyResponse, imagesResponse] = await Promise.all([
          fetch(`/api/jerseys/${collectionId}`),
          fetch(`/api/jerseys/${collectionId}/images`),
        ]);

        if (!jerseyResponse.ok) {
          const body = await jerseyResponse.json().catch(() => null);
          throw new Error(body?.message ?? "Failed to load this piece");
        }

        const jerseyData: Jersey = await jerseyResponse.json();

        if (cancelled) return;

        setJersey(jerseyData);

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
  }, [collectionId]);

  if (loading) {
    return (
      <div className="flex min-h-full flex-col">
        <Header />
        <main className="flex-1">
          <p className="py-24 text-center text-text-light">Loading...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (error && !jersey) {
    return (
      <div className="flex min-h-full flex-col">
        <Header />
        <main className="flex-1">
          <div className="py-24 text-center">
            <p className="text-primary-dark">
              {error === "Jersey not found"
                ? "We couldn't locate this artifact."
                : error}
            </p>
            <Button
              variant="ghost"
              size="sm"
              className="mt-4"
              onClick={() => router.push("/collection")}
            >
              Back to the collection
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!jersey) {
    return null;
  }

  return (
    <div className="flex min-h-full flex-col">
      <Header />
      <main className="flex-1">
        <section className="bg-white py-20">
          <div className="mx-auto w-full max-w-[1280px] px-5 md:px-10 lg:px-[60px]">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push("/collection")}
              className="mb-8"
            >
              Back to the collection
            </Button>

            <div className="mx-auto mb-12 max-w-2xl text-center">
              <h1 className="font-display text-4xl font-bold text-primary md:text-5xl">
                {jersey.name}
              </h1>

              {jersey.price !== null && (
                <p className="mt-4 text-lg font-medium text-primary">
                  ${jersey.price}
                </p>
              )}

              <p className="mt-6 text-base leading-relaxed text-text-light">
                {jersey.description ?? "This piece awaits its story."}
              </p>
            </div>

            {images.length === 0 ? (
              <p className="text-center text-text-light">
                This piece awaits its visual testimony.
              </p>
            ) : (
              <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {images.map((image) => (
                  <li key={image.id} className="stamp-border my-2 bg-white p-3">
                    <img
                      src={image.url}
                      alt={image.title}
                      width={800}
                      className="aspect-square w-full rounded object-cover"
                    />
                    <p className="mt-3 text-center text-sm text-text-light">
                      {image.title}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}