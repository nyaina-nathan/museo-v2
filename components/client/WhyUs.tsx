const PILLARS = [
  {
    title: "Authenticity",
    description:
      "Every piece is verified and documented, so you collect with confidence.",
  },
  {
    title: "Heritage",
    description:
      "Jerseys that carry the weight of history and the stories of the legends who wore them.",
  },
  {
    title: "Craftsmanship",
    description:
      "Vintage-era construction and materials, preserved and presented with care.",
  },
];

export function WhyUs() {
  return (
    <section className="bg-primary/5 py-20">
      <div className="mx-auto w-full max-w-[1280px] px-5 md:px-10 lg:px-[60px]">
        <div className="mx-auto mb-12 max-w-[600px] text-center">
          <h2 className="font-display text-3xl font-bold text-primary md:text-4xl">
            Why Museo
          </h2>
          <p className="mt-3 text-base leading-relaxed text-text-light">
            A gallery standard applied to the world of vintage jerseys.
          </p>
        </div>

        <ul className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {PILLARS.map((pillar) => (
            <li
              key={pillar.title}
              className="rounded-lg border border-border bg-white p-8"
            >
              <h3 className="font-display text-xl font-bold text-primary">
                {pillar.title}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-text-light">
                {pillar.description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}