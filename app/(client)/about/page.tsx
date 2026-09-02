import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/client/Header";
import { Footer } from "@/components/client/Footer";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "About — Museo.mg",
  description:
    "Museo preserves the cultural legacy of football by making iconic jersey designs accessible, affordable, and authentic. Discover our story, our approach, and our values.",
};

const APPROACH_PILLARS = [
  {
    title: "Preservation Without Scarcity",
    description:
      "Authentic vintage pieces risk decay, loss, or disappearing into private collections. By reproducing legendary designs faithfully, these pieces remain part of the living conversation about football culture.",
    iconClass: "fa-solid fa-box-archive",
    iconHover: "group-hover:animate-icon-bounce-up",
  },
  {
    title: "Access Over Exclusivity",
    description:
      "Iconic football heritage should be worn, celebrated, and passed on—not locked behind price tags only the elite can afford. Every collector, every fan, deserves to own a piece of that story.",
    iconClass: "fa-solid fa-people-group",
    iconHover: "group-hover:animate-icon-rotate",
  },
  {
    title: "Craftsmanship Over Commodification",
    description:
      "Each jersey is commissioned with the same rigor and respect a museum curator applies to an exhibition. These are not just products—they are cultural documents.",
    iconClass: "fa-solid fa-shirt",
    iconHover: "group-hover:animate-icon-scale",
  },
];

const WORK_STEPS = [
  {
    number: "01",
    title: "Sourcing With Integrity",
    description:
      "Every design begins with exhaustive historical research: manufacturer archives, match photographs, design records, and collector networks. We don't guess. We don't approximate. We investigate until we can reproduce a piece with archaeological accuracy.",
  },
  {
    number: "02",
    title: "Manufacturing With Care",
    description:
      "Our partners in Asia and Europe are chosen for their ability to match original materials, stitching techniques, and aesthetic details—ensuring material fidelity, construction accuracy, visual precision, and durability built to last generations.",
  },
  {
    number: "03",
    title: "Presenting With Respect",
    description:
      "Each piece arrives as a curated exhibition: packaged in an archival-quality box, wrapped in museum-grade tissue, and accompanied by a Cartel d'Exposition detailing the year, the player, the team, and the legacy the design carries.",
  },
];

const VALUES = [
  {
    title: "Raffiné",
    translation: "Refined",
    description:
      "Every detail matters—from the stitching to the packaging to the language we use. There are no shortcuts and no hype. Only excellence, understated and purposeful.",
  },
  {
    title: "Artistique",
    translation: "Artistic",
    description:
      "Football is our muse. We celebrate the design genius of legendary makers and the geometry of classic jerseys. The person who wears a piece becomes its curator.",
  },
  {
    title: "Fiable",
    translation: "Reliable",
    description:
      "In a market saturated with mediocrity, we are the guarantee of authenticity and quality. Each piece is expertly verified. Your trust is our most precious certificate.",
  },
];

const WHAT_IF_QUESTIONS = [
  "What if jerseys were treated as artifacts worthy of a museum?",
  "What if iconic designs were accessible to everyone?",
  "What if wearing a piece meant understanding the history, the player, the moment it represents?",
  "What if football heritage could be passed from one generation to the next—carefully, respectfully, with knowledge and pride?",
];

const CONTACT_DETAILS = [
  {
    label: "Email",
    value: "curator@museo.mg",
    href: "mailto:curator@museo.mg",
    iconClass: "fa-solid fa-envelope",
  },
  {
    label: "Location",
    value: "Antananarivo, Madagascar",
    href: null,
    iconClass: "fa-solid fa-location-dot",
  },
  {
    label: "Hours",
    value: "Monday–Sunday, 9 AM–6 PM",
    href: null,
    iconClass: "fa-regular fa-clock",
  },
];

export default function AboutPage() {
  return (
    <div className="flex min-h-full flex-col">
      <Header />
      <main className="flex-1">
        <section className="bg-primary py-20 text-white">
          <div className="mx-auto w-full max-w-[1280px] px-5 md:px-10 lg:px-[60px]">
            <div className="mx-auto max-w-[600px] text-center">
              <p className="mb-4 text-xs font-medium uppercase tracking-[0.25em] opacity-90">
                Founded 2024 · Antananarivo, Madagascar
              </p>
              <h1 className="mb-4 font-display text-4xl font-bold leading-tight md:text-5xl">
                About Museo
              </h1>
              <p className="text-base leading-relaxed opacity-90">
                Football heritage belongs to everyone. We archive it—one piece at a
                time.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-white py-20">
          <div className="mx-auto w-full max-w-[1280px] px-5 md:px-10 lg:px-[60px]">
            <div className="mx-auto max-w-[720px]">
              <h2 className="mb-8 text-center font-display text-3xl font-bold text-primary md:text-4xl">
                Our Story
              </h2>
              <p className="text-base leading-relaxed text-text-dark">
                Museo was founded in 2024 with a singular conviction:{" "}
                <strong className="font-bold text-primary">
                  football heritage belongs to everyone.
                </strong>
              </p>
              <p className="mt-6 text-base leading-relaxed text-text-dark">
                What began as a personal passion for collecting iconic jerseys evolved
                into something larger—a recognition that the most legendary pieces of
                football history are often locked away, priced beyond reach, or
                disappearing from public memory altogether.
              </p>
              <blockquote className="my-10 border-l-4 border-primary pl-6 font-display text-xl leading-relaxed text-primary md:text-2xl">
                What if we could preserve these artifacts, reproduce them faithfully,
                and make them accessible to the collectors, the enthusiasts, and the
                everyday fans who genuinely cherish them?
              </blockquote>
              <p className="text-base leading-relaxed text-text-dark">
                Museo was born from that question.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-primary py-20 text-white">
          <div className="mx-auto w-full max-w-[1280px] px-5 md:px-10 lg:px-[60px]">
            <div className="mx-auto max-w-[720px] text-center">
              <h2 className="mb-8 font-display text-3xl font-bold md:text-4xl">
                What We Believe
              </h2>
              <h3 className="mb-6 font-display text-xl font-bold md:text-2xl">
                Football is identity. Memory. Cultural pride.
              </h3>
              <p className="text-base leading-relaxed opacity-90">
                Football isn’t merely a sport. It’s a language spoken across continents,
                a thread that connects generations. A jersey isn’t simply clothing—it is
                an artifact. It carries the sweat of legends, the roar of stadiums, and
                the tears of fans who witnessed something unforgettable.
              </p>
              <p className="mt-6 text-base leading-relaxed opacity-90">
                That’s why jerseys matter—and why the stories they hold belong to
                everyone, not to climate-controlled vaults or the wealthy few.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-white py-20">
          <div className="mx-auto w-full max-w-[1280px] px-5 md:px-10 lg:px-[60px]">
            <div className="mx-auto mb-12 max-w-[600px] text-center">
              <h2 className="font-display text-3xl font-bold text-primary md:text-4xl">
                Our Approach
              </h2>
              <p className="mt-3 text-base leading-relaxed text-text-light">
                Why we make reproductions, not originals.
              </p>
            </div>
            <ul className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {APPROACH_PILLARS.map((pillar) => (
                <li
                  key={pillar.title}
                  className="group flex w-full flex-col items-center rounded-lg border border-border bg-white p-8"
                >
                  <i
                    className={`${pillar.iconClass} ${pillar.iconHover} p-4 text-5xl`}
                    aria-hidden="true"
                  ></i>
                  <h3 className="font-display text-xl font-bold text-primary">
                    {pillar.title}
                  </h3>
                  <p className="mt-3 text-center text-base leading-relaxed text-text-light">
                    {pillar.description}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="bg-primary/5 py-20">
          <div className="mx-auto w-full max-w-[1280px] px-5 md:px-10 lg:px-[60px]">
            <div className="mx-auto mb-12 max-w-[600px] text-center">
              <h2 className="font-display text-3xl font-bold text-primary md:text-4xl">
                How We Work
              </h2>
              <p className="mt-3 text-base leading-relaxed text-text-light">
                From research to your hands—every step held to a curatorial standard.
              </p>
            </div>
            <ol className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {WORK_STEPS.map((step) => (
                <li
                  key={step.number}
                  className="w-full rounded-lg border border-border bg-white p-8"
                >
                  <span className="font-display text-4xl font-bold text-primary">
                    {step.number}
                  </span>
                  <h3 className="mt-4 font-display text-xl font-bold text-primary">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-text-light">
                    {step.description}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="bg-primary py-20 text-white">
          <div className="mx-auto w-full max-w-[1280px] px-5 md:px-10 lg:px-[60px]">
            <div className="mx-auto mb-12 max-w-[720px] text-center">
              <h2 className="font-display text-3xl font-bold md:text-4xl">
                Our Mission
              </h2>
              <p className="mt-6 text-base leading-relaxed opacity-90">
                To preserve the cultural legacy of football by making iconic jersey
                designs accessible, affordable, and authentic—so that every passionate
                collector, devoted fan, and curious enthusiast can own a piece of the
                game’s greatest moments.
              </p>
            </div>
            <h3 className="mb-8 text-center font-display text-2xl font-bold">
              Our Values
            </h3>
            <ul className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {VALUES.map((value) => (
                <li
                  key={value.title}
                  className="w-full rounded-lg bg-white p-8 text-center"
                >
                  <h4 className="font-display text-2xl font-bold text-primary">
                    {value.title}
                  </h4>
                  <p className="mt-1 text-xs font-medium uppercase tracking-[0.2em] text-text-light">
                    {value.translation}
                  </p>
                  <p className="mt-4 text-base leading-relaxed text-text-light">
                    {value.description}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="bg-white py-20">
          <div className="mx-auto w-full max-w-[1280px] px-5 md:px-10 lg:px-[60px]">
            <div className="mx-auto mb-12 max-w-[600px] text-center">
              <h2 className="font-display text-3xl font-bold text-primary md:text-4xl">
                Looking Forward
              </h2>
              <p className="mt-3 text-base leading-relaxed text-text-light">
                From a local passion to a global archive of football heritage.
              </p>
            </div>
            <div className="mx-auto max-w-[720px]">
              <p className="text-center text-base leading-relaxed text-text-dark">
                Founded in 2024 in Antananarivo, Madagascar, Museo began as a local
                passion. Today, we are preparing to expand beyond our borders—deepening
                our roots in Madagascar and the African continent, with the horizon set
                on becoming a global archive of football heritage. Whether you’re in
                Tana, Dakar, São Paulo, Madrid, or Tokyo, your connection to football’s
                legacy should not be limited by geography or economics.
              </p>
              <ul className="mt-12 space-y-4">
                {WHAT_IF_QUESTIONS.map((question) => (
                  <li
                    key={question}
                    className="text-center font-display text-lg leading-relaxed text-primary md:text-xl"
                  >
                    {question}
                  </li>
                ))}
              </ul>
              <p className="mt-12 text-center font-display text-2xl font-bold text-primary md:text-3xl">
                Not just selling jerseys. Archiving history.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-primary py-20 text-white">
          <div className="mx-auto w-full max-w-[1280px] px-5 md:px-10 lg:px-[60px]">
            <div className="mx-auto mb-12 max-w-[600px] text-center">
              <h2 className="font-display text-3xl font-bold md:text-4xl">
                Get In Touch
              </h2>
              <p className="mt-3 text-base leading-relaxed opacity-90">
                Have questions about our mission, our pieces, or how we work? We’d love
                to hear from you.
              </p>
            </div>
            <ul className="mx-auto grid max-w-[900px] grid-cols-1 gap-6 sm:grid-cols-3">
              {CONTACT_DETAILS.map((detail) => (
                <li
                  key={detail.label}
                  className="flex flex-col items-center rounded-lg border border-white/30 p-6 text-center"
                >
                  <i
                    className={`${detail.iconClass} mb-4 text-2xl`}
                    aria-hidden="true"
                  ></i>
                  <h3 className="text-sm font-semibold uppercase tracking-wide">
                    {detail.label}
                  </h3>
                  {detail.href ? (
                    <a
                      href={detail.href}
                      className="mt-2 text-sm opacity-90 transition-opacity hover:underline hover:opacity-100"
                    >
                      {detail.value}
                    </a>
                  ) : (
                    <p className="mt-2 text-sm opacity-90">{detail.value}</p>
                  )}
                </li>
              ))}
            </ul>
            <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-center">
              <Link href="/collection">
                <Button variant="ghost" className="text-white hover:text-white/80">
                  Explore the Collection
                </Button>
              </Link>
              <Link href="/faq">
                <Button variant="ghost" className="text-white hover:text-white/80">
                  Read the FAQ
                </Button>
              </Link>
            </div>
            <p className="mt-12 text-center text-xs opacity-75">
              Founded by Ny Aina (Kiady Miarintsoa) · Brand identity &amp; design by
              Harivelo Rakotoasimbola · Est. 2024
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
