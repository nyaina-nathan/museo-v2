const PILLARS = [
  {
    title: "2 Years of Trust",
    description:
      "Honest grading and fair pricing since day one, building a name collectors can rely on.",
      iconClass: "fa-solid fa-handshake",
      iconHover: "group-hover:animate-icon-bounce-up"
    },
    {
      title: "100+ Match-Worn Jerseys",
      description:
      "Over a hundred authentic match-worn shirts inspected, documented, and matched to the players who wore them.",
      iconClass: "fa-regular fa-futbol",
      iconHover: "group-hover:animate-icon-rotate"
    },
    {
      title: "Run by a Passionate Fan",
      description:
      "Museo is run by a lifelong supporter and collector who cares about every shirt like their own.",
      iconClass: "fa-solid fa-heart",
      iconHover: "group-hover:animate-icon-scale"
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
              className="group flex flex-col items-center w-full rounded-lg border border-border bg-white p-8"
            >
              <i className={`${pillar.iconClass} ${pillar.iconHover} text-5xl p-4`}></i>
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