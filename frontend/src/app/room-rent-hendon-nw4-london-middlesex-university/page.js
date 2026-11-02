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
      "Each double room comes fully furnished with a double bed and comfortable mattress, wardrobe and chest of drawers, and a study desk and chair ideal for students and remote workers. You are welcome to bring personal items like bedding, lamps, and personal decor to make the space feel like home.",
  },
  {
    question:
      "Is high-speed internet provided in the shared areas and bedrooms?",
    answer:
      "Yes. High-speed Wi-Fi broadband is accessible throughout the entire house, including all bedrooms and communal kitchens, for studying, streaming, and remote work.",
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
      "The shared kitchens come equipped with an electric or gas cooker and oven, microwave, kettle and toaster, shared refrigerators and freezers with designated shelf space allocated per room, a washing machine, and laundry drying areas.",
  },
  {
    question: "How many people will I share the kitchen and bathroom with?",
    answer:
      "The properties maintain low-density occupancies for comfort. Kitchens and bathrooms are shared with a maximum of 3 to 4 housemates.",
  },
  {
    question: "Are all utilities and Wi-Fi included in the monthly rent?",
    answer:
      "Check the selected room's listing for its recorded bill inclusions and confirm the details with the landlord before signing, as terms can vary by room.",
  },
  {
    question:
      "Are couples or dual occupancies allowed in these double rooms?",
    answer:
      "Occupancy terms vary by room. Check the occupancy shown on the individual listing and confirm it with the landlord before booking.",
  },
  {
    question: "What shopping facilities and supermarkets are located nearby?",
    answer:
      "The properties are within walking distance of local convenience stores, pharmacies, and grocery shops along Hendon Central and Brent Street. Brent Cross Shopping Centre is one Tube stop away or a five-minute bus ride, with more than 120 retail outlets, department stores, and dining spots.",
  },
  {
    question: "Which tube and train stations serve the local area?",
    answer:
      "Hendon Central Station (Northern Line) is 5 to 12 minutes on foot and connects directly to Camden Town, Euston, King's Cross, Charing Cross, and Bank. Hendon Thameslink Station is 12 to 17 minutes on foot, with direct services to Farringdon, Blackfriars, St Albans, and Luton.",
  },
  {
    question:
      "What are the typical commute times to Central London and surrounding regional hubs?",
    answer:
      "Approximate public transport journey times from Hendon are 15 to 25 minutes to Central London (the City or West End), 2 to 5 minutes to Brent Cross Shopping Centre, 7 minutes to Borehamwood and Elstree, 16 to 20 minutes to St Albans, 28 to 35 minutes to Luton, and 30 to 40 minutes to Westminster and South London.",
  },
  {
    question: "What local bus routes run near Hendon Way and Babington Road?",
    answer:
      "Bus stops are 1 to 2 minutes from the properties. Route 183 connects Hendon to Middlesex University, Golders Green, and Pinner. Routes 83, 143, and 326 provide local connections across Barnet, Brent Cross, and Finchley. Night buses N5 and N83 connect Central London to Hendon.",
  },
  {
    question:
      "How close are these rooms to Middlesex University (Hendon Campus)?",
    answer:
      "All listed properties are within a short walk or transit journey of Middlesex University's main campus on The Burroughs (NW4). 28 Babington Road (NW4 4LD) is approximately 2 to 10 minutes on foot; 16 Hendale Avenue (NW4 4LR) is approximately 5 to 10 minutes on foot or a 2-minute local transport trip; and 9 Kennylands Court, Hendon Way (NW4 3LU) is approximately 8 to 12 minutes on foot or 3 minutes by the 183 bus.",
  },
  {
    question:
      "Are these rooms suitable for full-time undergraduate or postgraduate students?",
    answer:
      "The Hendon properties are close to Middlesex University's campus. Review each room listing for its current room type, occupancy, and amenities to check whether it suits your needs.",
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

      <section className="relative overflow-hidden bg-[#1A2332] px-5 py-16 text-white md:px-12 md:py-24">
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[#FF6B3514]" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
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
                href="#available-rooms"
                className="rounded-xl bg-[#FF6B35] px-6 py-3 font-bold text-white transition-colors hover:bg-[#e85b27]"
              >
                View rooms
              </a>
              <a
                href="#book-viewing"
                className="rounded-xl border border-white/25 px-6 py-3 font-bold text-white transition-colors hover:border-white"
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

      <section className="px-5 py-16 md:px-12 md:py-20">
        <div className="mx-auto max-w-4xl">
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
