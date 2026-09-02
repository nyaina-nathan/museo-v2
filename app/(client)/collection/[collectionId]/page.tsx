"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Header } from "@/components/client/Header";
import { Footer } from "@/components/client/Footer";
import { SocialLinks } from "@/components/client/SocialLinks";
import { Button } from "@/components/ui/Button";
import type { Jersey, JerseyImage } from "@/types/jersey.types";

export default function CollectionDetailPage() {
  const { collectionId } = useParams<{ collectionId: string }>();
  const router = useRouter();

  const [jersey, setJersey] = useState<Jersey | null>(null);
  const [images, setImages] = useState<JerseyImage[]>([]);
  const [activeImageId, setActiveImageId] = useState<string | null>(null);
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
          const list: JerseyImage[] = await imagesResponse.json();
          setImages(list);
          setActiveImageId((previous) =>
            list.some((image) => image.id === previous)
              ? previous
              : (list.find((image) => image.is_primary)?.id ?? list[0]?.id ?? null)
          );
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

  const activeImage =
    images.find((image) => image.id === activeImageId) ??
    images.find((image) => image.is_primary) ??
    images[0];

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
              className="mb-10"
            >
              Back to the collection
            </Button>

            <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
              <div className="min-w-0">
                {activeImage ? (
                  <div className="flex flex-col gap-4">
                    <div className="overflow-hidden rounded bg-primary/5">
                      <img
                        src={activeImage.url}
                        alt={activeImage.title}
                        width={1200}
                        className="aspect-square w-full object-cover"
                      />
                    </div>

                    {images.length > 1 && (
                      <ul className="grid grid-cols-4 gap-3 sm:grid-cols-5">
                        {images.map((image) => {
                          const selected = image.id === activeImage.id;

                          return (
                            <li key={image.id}>
                              <button
                                type="button"
                                onClick={() => setActiveImageId(image.id)}
                                aria-pressed={selected}
                                aria-label={`View ${image.title}`}
                                className={`block w-full overflow-hidden rounded bg-primary/5 transition ${
                                  selected
                                    ? "ring-2 ring-primary"
                                    : "opacity-70 hover:opacity-100"
                                }`}
                              >
                                <img
                                  src={image.url}
                                  alt={image.title}
                                  width={300}
                                  className="aspect-square w-full object-cover"
                                />
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </div>
                ) : (
                  <div className="flex aspect-square w-full items-center justify-center rounded bg-primary/5 p-8">
                    <p className="text-center text-text-light">
                      This piece awaits its visual testimony.
                    </p>
                  </div>
                )}
              </div>

              <div className="lg:sticky lg:top-10">
                <h1 className="font-display text-4xl font-bold text-primary md:text-5xl">
                  {jersey.name}
                </h1>

                {jersey.price !== null && (
                  <p className="mt-4 text-lg font-medium text-primary">
                    Ar {jersey.price}
                  </p>
                )}

                <p className="mt-6 max-w-prose text-base leading-relaxed text-text-light">
                  {jersey.description ?? "This piece awaits its story."}
                </p>

                <div className="mt-8 flex items-center gap-3">
                  <SocialLinks
                    linkClassName="flex h-11 w-11 items-center justify-center rounded-full border border-primary/40 text-primary transition-colors hover:border-primary hover:bg-primary hover:text-white"
                    iconClassName="h-5 w-5"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}