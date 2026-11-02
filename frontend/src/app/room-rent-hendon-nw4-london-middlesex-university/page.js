import ContactForm from "@/app/Shared/ContactForm";
import HendonRooms from "./HendonRooms";

const pageUrl =
  "https://rentaroomlondon.co.uk/room-rent-hendon-nw4-london-middlesex-university";

export const metadata = {
  title:
    "Rooms to Rent in Hendon NW4 | Near Middlesex Uni & Tubestation at £860",
  description:
    "Looking for double rooms to rent in Hendon NW4? Fully furnished single-occupancy rooms near Hendon Central Station & Middlesex Uni. Bills included options from £860/mo. Book a viewing today!",
  alternates: { canonical: pageUrl },
  openGraph: {
    title:
      "Rooms to Rent in Hendon NW4 | Near Middlesex Uni & Tubestation at £860",
    description:
      "Looking for double rooms to rent in Hendon NW4? Fully furnished single-occupancy rooms near Hendon Central Station & Middlesex Uni. Bills included options from £860/mo. Book a viewing today!",
    url: pageUrl,
    siteName: "Rent a Room London",
    locale: "en_GB",
    type: "website",
  },
};

const faqs = [
  {
    question:
      "Can I bring my own furniture, or is the room fully furnished?",
    answer:
      "Each double room comes fully furnished with key essentials: Double bed and comfortable mattress; Wardrobe and chest of drawers; Study desk and chair (ideal for students and remote workers). You are welcome to bring personal items like bedding, lamps, and personal decor to make the space feel like home.",
  },
  {
    question:
      "Is high-speed internet provided in the shared areas and bedrooms?",
    answer:
      "Yes. High-speed Wi-Fi broadband is accessible throughout the entire house, including all bedrooms and communal kitchens, for seamless studying, streaming, and remote work.",
  },
  {
    question: "What is the minimum tenancy length for these rooms?",
    answer:
      "The standard tenancy agreement is 6 to 12 months. Short-term lets or academic term arrangements can be discussed directly with the landlord based on availability.",
  },
  {
    question:
      "What appliances and storage are available in the shared kitchen?",
    answer:
      "The shared kitchens come equipped with essential modern appliances, including: Electric/gas cooker & oven; Microwave, kettle, and toaster; Shared refrigerators/freezers (with designated shelf space allocated per room); Washing machine and laundry drying areas.",
  },
  {
    question: "How many people will I share the kitchen and bathroom with?",
    answer:
      "The properties maintain low-density occupancies to ensure comfort. Shared between a maximum of 3 to 4 housemates.",
  },
  {
    question: "Are all utilities and Wi-Fi included in the monthly rent?",
    answer:
      "28 Babington Road (£860 & £890/mo): Includes utility bills (water, energy, council tax, high-speed internet). 9 Kennylands Court (£880/mo) & 16 Hendale Avenue (£890/mo): Utility inclusion terms can be confirmed with the landlord prior to signing your agreement.",
  },
  {
    question:
      "Are couples or dual occupancies allowed in these double rooms?",
    answer:
      "No. To ensure a peaceful, balanced, and low-density environment for all housemates, all double rooms across these Hendon properties are strictly for single occupancy only.",
  },
  {
    question: "What shopping facilities and supermarkets are located nearby?",
    answer:
      "The properties are within walking distance of local convenience stores, pharmacies, and grocery shops along Hendon Central and Brent Street. Brent Cross Shopping Centre is only 1 tube stop away (or a 5-minute bus ride), offering over 120 retail outlets, department stores, and dining spots.",
  },
  {
    question: "Which tube and train stations serve the local area?",
    answer:
      "The properties are connected via two main stations in Zone 3: Hendon Central Station (Northern Line): 5 to 12 minutes on foot, connecting directly to Camden Town, Euston, King's Cross, Charing Cross, and Bank. Hendon Thameslink Station (National Rail): 12 to 17 minutes on foot, running fast direct services to Farringdon, Blackfriars, St Albans, and Luton Airport.",
  },
  {
    question:
      "What are the typical commute times to Central London and surrounding regional hubs?",
    answer:
      "From Hendon, journey times via public transport are approx.: Central London (The City / West End): 15 to 25 minutes (Northern Line). Brent Cross Shopping Centre: 2 to 5 minutes. Borehamwood & Elstree: 7 minutes (Thameslink). St Albans: 16 to 20 minutes (Thameslink). Luton: 28 to 35 minutes (Thameslink). Westminster & South London: 30 to 40 minutes (Northern Line).",
  },
  {
    question: "What local bus routes run near Hendon Way and Babington Road?",
    answer:
      "Bus stops are situated within 1 to 2 minutes of the properties. Key local routes include: Route 183: Direct route connecting Hendon to Middlesex University, Golders Green, and Pinner. Routes 83, 143, and 326: Providing local connections across Barnet, Brent Cross, and Finchley. Night Buses (N5 & N83): Offering 24/7 transport links from Central London directly back to Hendon Way.",
  },
  {
    question:
      "How close are these rooms to Middlesex University (Hendon Campus)?",
    answer:
      "All listed properties sit within short walking or transit distances to Middlesex University’s main campus on The Burroughs (NW4): 28 Babington Road (NW4 4LD): Approx. 2 to 10 minutes on foot. 16 Hendale Avenue (NW4 4LR): Approx. 5 to 10 minutes on foot (or a 2-minute local transport hop). 9 Kennylands Court, Hendon Way (NW4 3LU): Approx. 8 to 12 minutes on foot (or 3 minutes via the 183 bus).",
  },
  {
    question:
      "Are these rooms suitable for full-time undergraduate or postgraduate students?",
    answer:
      "Yes. Double rooms for single occupancy provide a quiet study environment with high-speed internet, making them ideal for students looking for off-campus private rented accommodation near the university.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map(({ question, answer }) => ({
    "@type": "Question",
    name: question,
    acceptedAnswer: { "@type": "Answer", text: answer },
  })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://rentaroomlondon.co.uk/",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Rooms to Rent in Hendon",
      item: pageUrl,
    },
  ],
};

const WHATSAPP_MESSAGE =
  "Hello! I would like to book a viewing for a room in Hendon NW4.";
const WHATSAPP_URL = `https://wa.me/447419990126?text=${encodeURIComponent(
  WHATSAPP_MESSAGE
)}`;

export default function HendonRoomsPage() {
  return (
    <main className="bg-[#FAF9F6] text-[#1A2332]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <section className="relative overflow-hidden bg-[#1A2332] px-4 py-12 text-white md:px-6 md:py-20">
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[#FF6B3514]" />
        <div className="relative mx-auto grid max-w-[1400px] items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-[#FF6B35]">
              Hendon, London NW4 · Zone 3
            </p>
            <h1 className="mb-6 font-playfair text-4xl font-bold leading-tight md:text-6xl">
              Rooms to Rent in Hendon, NW4 With Bills Included
            </h1>
            <p className="max-w-2xl text-base leading-7 text-white/75 md:text-lg">
              Explore room listings near Hendon Central Station and Middlesex
              University. Rents, photos, occupancy and availability are shown
              from the property listings.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl bg-[#FF6B35] px-6 py-3 font-bold text-white transition-colors hover:bg-[#e85b27]"
              >
                Book a viewing
              </a>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/75">
              <span>Room details from property listings</span>
              <span>Near Middlesex University</span>
              <span>Live availability and pricing</span>
            </div>
          </div>
          <div id="book-viewing" className="scroll-mt-24">
            <ContactForm
              title="Ask about a Hendon room"
              subtitle="Leave your details and tell us which property you would like to view."
              redirectUrl="/thank-you-rental-room-london"
            />
          </div>
        </div>
      </section>

      <HendonRooms />

      <section className="px-4 py-12 md:px-6 md:py-16">
        <div className="mx-auto max-w-[1200px]">
          <div className="mb-10 text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-[#FF6B35]">
              Hendon NW4
            </p>
            <h2 className="font-playfair text-3xl font-bold md:text-4xl">
              Frequently asked questions
            </h2>
          </div>
          <div className="space-y-3">
            {faqs.map(({ question, answer }) => (
              <details
                key={question}
                className="group rounded-2xl border border-[#E8E4DF] bg-white p-5 open:border-[#FF6B35]/50"
              >
                <summary className="cursor-pointer list-none pr-6 font-semibold marker:hidden">
                  {question}
                </summary>
                <p className="mt-4 leading-7 text-[#6B7280]">{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
