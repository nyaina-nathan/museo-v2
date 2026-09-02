import type { Metadata } from "next";
import { Header } from "@/components/client/Header";
import { Footer } from "@/components/client/Footer";
import { FAQAccordion } from "@/components/client/FAQAccordion";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export const metadata: Metadata = {
  title: "FAQ — Museo.mg",
  description:
    "Frequently asked questions about Museo's vintage jersey collection, ordering, payment, and curation practices.",
};

const aboutPiecesItems = [
  {
    question: "Are these authentic vintage jerseys or reproductions?",
    answer: [
      "Our pieces are meticulously crafted reproductions, not vintage originals. Each jersey is commissioned and reproduced with the highest standard of craftsmanship, faithful to the heritage designs that define football history.",
      "We chose this path intentionally: authentic vintage pieces are often fragile, expensive, and at risk of disappearing from circulation. By creating museum-quality reproductions, we preserve the legacy of these iconic designs, make them accessible to genuine enthusiasts and collectors, and ensure every piece can be worn and celebrated without the weight of priceless rarity.",
      "Think of it this way—you're not simply wearing a jersey; you're archiving a moment in football heritage, ready to be passed on to the next generation.",
    ],
  },
  {
    question: "How is the quality controlled for each piece?",
    answer: [
      "Every jersey undergoes rigorous inspection before it leaves our atelier. We verify:",
      "• Stitching integrity — Every seam is checked for strength and precision\n• Material authenticity — Fabrics match the original era and specifications\n• Print durability — Graphics and numbers withstand washing and time\n• Color fidelity — Hues are cross-referenced against archival references",
      "Our curator personally oversees the final quality check. Each piece is accompanied by a Cartel d'Exposition (Exhibition Certificate) detailing the jersey's heritage, the player associated with it, the equipment manufacturer, and the historical moment it represents.",
    ],
  },
];

const orderingItems = [
  {
    question: "How long does it take to receive my piece after I place an order?",
    answer: [
      "From order confirmation to delivery, we allow 2 to 4 weeks for fabrication and quality assurance. This timeline reflects our commitment to precision—we do not rush the archive.",
      "Timeline breakdown:\n• Week 1: Order confirmed, payment processed, production begins\n• Weeks 2–3: Fabrication, stitching, printing, quality inspection\n• Week 4: Final curation check, packaging, preparation for delivery",
      "Once your piece is ready, we'll notify you with delivery details. Given our location in Antananarivo, delivery logistics may extend slightly in remote regions, but we'll keep you informed throughout.",
    ],
  },
  {
    question: "What if the piece I want is temporarily unavailable?",
    answer: [
      "If a particular design is not currently in production, we can discuss custom commissioning. Let us know which piece calls to you, and we can explore commissioning it specifically for your collection.",
      "This requires a longer lead time (typically 6–8 weeks) and a full upfront payment commitment, but it ensures your chosen artifact becomes part of the Museo archive.",
      "Contact our curator directly to discuss custom pieces.",
    ],
  },
];

const paymentItems = [
  {
    question: "How does the payment system work?",
    answer: [
      "We've designed a two-stage payment model that protects both curator and collector:",
      "Stage 1: Order Confirmation (50% due)\nYou reserve your piece and confirm production by paying 50% upfront. This secures your order and initiates fabrication.\n\nAccepted payment methods for Stage 1:\n• Mvola (Vodafone Madagascar)\n• Orange Money (Orange Madagascar)\n• Airtel Money (Airtel Madagascar)\n\nSimply provide your mobile number, and we'll send you the payment details. Payment is instant; production begins immediately upon confirmation.",
      "Stage 2: Upon Delivery (50% due)\nPay the remaining 50% when you receive your piece. You have the choice to pay via:\n• Cash (direct exchange)\n• Mobile Money (Mvola, Orange Money, or Airtel Money)\n\nThis structure ensures you're never paying in full for something you haven't yet held in your hands.",
    ],
  },
  {
    question: "Do you ship internationally, or is delivery only within Madagascar?",
    answer: [
      "Currently, delivery is arranged within Madagascar only, with focus on the greater Antananarivo area. For locations outside the capital, shipping and timeline may extend; we'll provide estimates upon order.",
      "We are exploring partnerships for international delivery but do not yet offer shipping outside Madagascar. If you are outside our region, please contact our curator to discuss possibilities—we may be able to arrange custom logistics for significant collections.",
    ],
  },
  {
    question: "What happens if there's a delivery issue or my package is lost?",
    answer: [
      "We take delivery responsibility seriously. Upon placing your order, you'll receive:\n• A tracking reference for your piece\n• Delivery confirmation when the courier arrives at your location\n• Our direct contact number for any questions during the delivery window",
      "If a delivery issue arises (package lost, damaged in transit, etc.), contact us immediately with your reference number. We will investigate and work toward resolution—though our ability to replace or redeliver depends on the specific circumstance.",
      "Note: Once a piece has been delivered and signed for, it is considered in your possession and falls under our final sale policy.",
    ],
  },
];

const guaranteesItems = [
  {
    question: "What is your return and exchange policy?",
    answer: [
      "All pieces sold by Museo are final sale. Once a jersey is delivered and received, it becomes part of your personal collection and cannot be returned, exchanged, or refunded.",
      "Why? Each piece is commissioned specifically for you, crafted to order with care and precision. Our made-to-order model means every jersey is created as a bespoke artifact—not held in inventory and resold.",
      "However, quality guarantees apply:\n\nIf a piece arrives with a manufacturing defect (stitching failure, print flaw, material issue), document it with photos within 7 days of delivery and contact us immediately. We will evaluate the defect and, at our discretion, either:\n• Provide a replacement piece (fabricated anew)\n• Offer a refund for the defective item",
      "Defects do not include: Normal wear, minor color variation due to fabric dye lots, or cosmetic blemishes that do not affect function.",
    ],
  },
  {
    question: "What care instructions should I follow to preserve my piece?",
    answer: [
      "Your jersey is a textile artifact—treat it with the same respect you would a museum exhibition.",
      "Washing:\n• Machine wash in cold water on a gentle cycle\n• Use mild detergent; avoid bleach\n• Turn the jersey inside-out to protect graphics\n• Air dry; do not tumble dry",
      "Storage:\n• Fold or hang in a cool, dry place away from direct sunlight\n• Avoid excessive moisture or heat\n• Use acid-free tissue if storing long-term\n• Inspect periodically for any signs of wear",
      "Display:\n• Consider framing or display cases for pieces of high sentimental value\n• Keep away from rough surfaces or friction\n• Avoid wearing heavily if you wish to preserve it as an exhibition piece",
      "Proper care ensures your archive piece remains vibrant and intact for decades—or for passing on to the next generation of collectors.",
    ],
  },
];

const aboutMuseoItems = [
  {
    question: "How can I learn more about a specific piece's history?",
    answer: [
      "Every jersey comes with a Cartel d'Exposition—a detailed Exhibition Card that includes:",
      "• The Year — When the piece was iconic\n• The Player — The legendary figure who wore it\n• The Team — The national or club side represented\n• The Equipment Maker — The manufacturer (Adidas, Nike, Umbro, etc.)\n• Historical Context — The tournament, moment, or legacy that defined this piece",
      "Beyond the cartel, our curator is available for deeper conversations. If you wish to know more about the design lineage, the era's football landscape, or why a particular piece matters to football heritage, reach out directly. We see every collector as a fellow curator.",
      "Visit our Archive section on the site to explore the full catalog with context for each piece. Think of it as your personal gallery guide.",
    ],
  },
];

export default function FAQPage() {
  return (
    <div className="flex min-h-full flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-primary py-20 text-white">
          <div className="mx-auto w-full max-w-[1280px] px-5 md:px-10 lg:px-[60px]">
            <div className="mx-auto max-w-[600px] text-center">
              <h1 className="mb-4 font-display text-4xl font-bold leading-tight md:text-5xl">
                Frequently Asked Questions
              </h1>
              <p className="text-base leading-relaxed opacity-90">
                Explore our practices, policies, and the philosophy behind Museo.
              </p>
            </div>
          </div>
        </section>

        {/* About Our Pieces Section */}
        <section className="bg-white py-20">
          <div className="mx-auto w-full max-w-[1280px] px-5 md:px-10 lg:px-[60px]">
            <FAQAccordion
              items={aboutPiecesItems}
              sectionTitle="About Our Pieces"
            />
          </div>
        </section>

        {/* Ordering & Timeline Section */}
        <section className="bg-white py-20">
          <div className="mx-auto w-full max-w-[1280px] px-5 md:px-10 lg:px-[60px]">
            <FAQAccordion
              items={orderingItems}
              sectionTitle="Ordering & Timeline"
            />
          </div>
        </section>

        {/* Payment & Delivery Section */}
        <section className="bg-white py-20">
          <div className="mx-auto w-full max-w-[1280px] px-5 md:px-10 lg:px-[60px]">
            <FAQAccordion
              items={paymentItems}
              sectionTitle="Payment & Delivery"
            />
          </div>
        </section>

        {/* Returns & Guarantees Section */}
        <section className="bg-white py-20">
          <div className="mx-auto w-full max-w-[1280px] px-5 md:px-10 lg:px-[60px]">
            <FAQAccordion
              items={guaranteesItems}
              sectionTitle="Returns & Guarantees"
            />
          </div>
        </section>

        {/* About Museo Section */}
        <section className="bg-white py-20">
          <div className="mx-auto w-full max-w-[1280px] px-5 md:px-10 lg:px-[60px]">
            <FAQAccordion
              items={aboutMuseoItems}
              sectionTitle="About Museo"
            />
          </div>
        </section>

        {/* Contact Section */}
        <section className="bg-primary py-20 text-white">
          <div className="mx-auto w-full max-w-[1280px] px-5 md:px-10 lg:px-[60px]">
            <div className="mx-auto max-w-[600px] text-center">
              <h2 className="mb-4 font-display text-3xl font-bold md:text-4xl">
                Still have questions?
              </h2>
              <p className="mb-8 text-base leading-relaxed opacity-90">
                Our curator is here to help. Reach out directly and let's discuss
                your collection.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row  sm:items-center sm:justify-center">
                <Link href="/contact">
                  <Button className="text-white hover:text-white/80" variant="ghost">Get in Touch</Button>
                </Link>
                <Link href="/collection">
                  <Button variant="ghost" className="text-white hover:text-white/80">
                    Explore Collection
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
