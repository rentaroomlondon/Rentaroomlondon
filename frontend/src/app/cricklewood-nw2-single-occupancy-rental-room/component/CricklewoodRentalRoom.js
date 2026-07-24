import Link from 'next/link';

export default function CricklewoodRentalRoom() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* Banner Section */}
      <section className="bg-slate-900 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <span className="inline-block bg-indigo-600 text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider mb-4">
            NW2 London
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">
            Single Room to Rent in Cricklewood (NW2), Brent, London
          </h1>
          <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto">
            Cricklewood Rental Rooms With Bills Included. Looking for a comfortable, well-connected, & hassle-free room in North West London? We have a fantastic single room available in Cricklewood (NW2), with bills included.
          </p>
        </div>
      </section>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Sidebar: Location Based Rooms & Tags */}
          <aside className="lg:col-span-4 space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 sticky top-6">
              
              {/* Location Based Rooms */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <span>📍</span> Location Based Rooms
                </h3>
                <ul className="space-y-2 text-sm">
                <li>
                    <Link href="/find-a-room?search=NW2" className="text-slate-600 hover:text-indigo-600 font-medium block py-1 border-b border-slate-100">
                    Cricklewood (NW2)
                    </Link>
                </li>
                <li>
                    <Link href="/find-a-room?search=NW11" className="text-slate-600 hover:text-indigo-600 font-medium block py-1 border-b border-slate-100">
                    Brent Cross
                    </Link>
                </li>
                <li>
                    <Link href="/find-a-room?search=NW6" className="text-slate-600 hover:text-indigo-600 font-medium block py-1 border-b border-slate-100">
                    Kilburn High Road
                    </Link>
                </li>
                <li>
                    <Link href="/find-a-room?search=N1" className="text-slate-600 hover:text-indigo-600 font-medium block py-1">
                    St Pancras Corridor
                    </Link>
                </li>
                </ul>
              </div>

              {/* Room Tags */}
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <span>🏷️</span> Tags
                </h3>

                <div className="flex flex-wrap gap-2">
                <Link
                    href="/find-a-room?roomType=single"
                    className="bg-slate-100 text-slate-700 text-xs font-medium px-3 py-1.5 rounded-md border border-slate-200 hover:bg-slate-200 transition-colors"
                >
                    Single Occupancy Room
                </Link>

                <Link
                    href="/find-a-room?roomType=double"
                    className="bg-slate-100 text-slate-700 text-xs font-medium px-3 py-1.5 rounded-md border border-slate-200 hover:bg-slate-200 transition-colors"
                >
                    Double Occupancy Room
                </Link>

                <Link
                    href="/find-a-room?roomType=ensuite_double"
                    className="bg-slate-100 text-slate-700 text-xs font-medium px-3 py-1.5 rounded-md border border-slate-200 hover:bg-slate-200 transition-colors"
                >
                    Flat Share
                </Link>

                <Link
                    href="/find-a-room?roomType=studio"
                    className="bg-slate-100 text-slate-700 text-xs font-medium px-3 py-1.5 rounded-md border border-slate-200 hover:bg-slate-200 transition-colors"
                >
                    Studio Rooms
                </Link>
                </div>
              </div>

              {/* Quick Action Box */}
              <div className="mt-8 p-4 bg-indigo-50 rounded-lg border border-indigo-100 text-center">
                <h4 className="font-semibold text-indigo-900 mb-1">Ready to move?</h4>
                <p className="text-xs text-indigo-700 mb-3">Check live room availability right now.</p>
                <Link 
                  href="https://rentaroomlondon.co.uk/find-a-room" 
                  className="inline-block w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg text-sm transition-colors"
                >
                  Find a Room
                </Link>
              </div>

            </div>
          </aside>

          {/* Right Main Content */}
          <main className="lg:col-span-8 space-y-8 bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-slate-200">
            
            {/* Section 1: Intro */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
                Single Occupancy Rental Rooms in Cricklewood (NW2), Brent, London
              </h2>
              <p className="text-slate-600 leading-relaxed">
                If you&apos;re searching for a single room to rent in Cricklewood (NW2), Brent, you&apos;re looking in one of North West London&apos;s smartest value spots. Sitting on the Zone 2/3 border, Cricklewood gives solo tenants like students, NHS staff, and young professionals quick access into Central London without the Zone 1 price tag.
              </p>
            </div>

            {/* Section 2: Why Choose */}
            <div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">
                Why Choose a Single Room in Cricklewood NW2, London
              </h3>
              <p className="text-slate-600 leading-relaxed">
                A single occupancy room is the go-to option for anyone who wants their own private space without paying premium rent. In Cricklewood specifically, that value is amplified by the area&apos;s transport links and everyday convenience.
              </p>
            </div>

            {/* Section 3: Location and commute */}
            <div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">
                Location and Commute From Cricklewood NW2
              </h3>
              <p className="text-slate-600 leading-relaxed mb-3">
                Cricklewood Railway station puts you on the Thameslink line, with trains reaching St Pancras in around 15 minutes.
              </p>
              <p className="text-slate-600 leading-relaxed mb-3">
                If you&apos;re studying at Middlesex University, the 245 and 266 buses run directly to The Burroughs campus every 8–12 minutes, so you&apos;re never far from a lecture hall.
              </p>
              <p className="text-slate-600 leading-relaxed">
                For professionals, Brent Cross Underground (Northern line) and Kilburn High Road Overground are both close by, opening up fast routes across the city.
              </p>
            </div>

            {/* Section 4: Everyday living */}
            <div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">
                Everyday Living in Cricklewood NW2, UK
              </h3>
              <p className="text-slate-600 leading-relaxed mb-3">
                Cricklewood Broadway covers your daily essentials like supermarkets, cafes, and a genuinely diverse food scene spanning Turkish, Polish, Indian, and Irish spots.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Need a bigger shop or a change of scenery? Brent Cross is just 1.5 miles away. When you want fresh air, Gladstone Park is a 10-minute walk from most listings, ideal for a study break or a morning run.
              </p>
            </div>

            <hr className="border-slate-200" />

            {/* Section 5: What's included */}
            <div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">
                What&apos;s included in Renting a Room With Rental Room London?
              </h3>
              <p className="text-slate-600 leading-relaxed mb-3">
                Every single room we list in the area comes with bills included as standard — Wi-Fi, electricity, and water are covered, so there are no surprise costs stacking up on top of your rent.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Rooms are fully furnished, with weekly cleaning, secure entry, and modern kitchens as part of the package.
              </p>
            </div>

            {/* Section 6: Who it suits best */}
            <div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">
                Who a Single Rental Room Suits Best For
              </h3>
              <p className="text-slate-600 leading-relaxed mb-3">
                A single room works well if you value privacy but still want the social side of shared living in a private bedroom with communal kitchen and living areas. It&apos;s particularly popular with:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-slate-600">
                <li><strong className="text-slate-900">Students</strong> who want a quiet space to study but don&apos;t want to be isolated</li>
                <li><strong className="text-slate-900">NHS staff</strong> working near local hospitals who need reliable, affordable housing close to transport</li>
                <li><strong className="text-slate-900">Young professionals</strong> commuting into Central London who don&apos;t want to pay Zone 1 rent</li>
              </ul>
            </div>

            <hr className="border-slate-200" />

            {/* Section 7: How to Find and Book */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                How to Find and Book Your Room in Cricklewood NW2
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Browsing our current{' '}
                <Link href="https://rentaroomlondon.co.uk/rental-rooms-students-cricklewood-uk" className="text-indigo-600 hover:underline font-medium">
                  rental rooms in Cricklewood
                </Link>{' '}
                is the best place to start, you&apos;ll see exactly what&apos;s available in the area right now, along with photos and pricing. If you want to compare single rooms across all our London locations rather than just Cricklewood, our dedicated{' '}
                <Link href="https://rentaroomlondon.co.uk/cheap-single-room-rent-london-uk" className="text-indigo-600 hover:underline font-medium">
                  single occupancy room
                </Link>{' '}
                listings page lets you filter by budget and location.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Once you&apos;ve shortlisted a few options, head to{' '}
                <Link href="https://rentaroomlondon.co.uk/find-a-room" className="text-indigo-600 hover:underline font-medium">
                  find a room
                </Link>{' '}
                to search live availability and book a viewing directly. Not sure how the process works from enquiry to move-in? Our{' '}
                <Link href="https://rentaroomlondon.co.uk/how-it-works" className="text-indigo-600 hover:underline font-medium">
                  how it works
                </Link>{' '}
                page walks through each step, from browsing listings to collecting your keys.
              </p>
            </div>

            {/* Section 8: Final Thoughts */}
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
              <h3 className="text-xl font-semibold text-slate-900 mb-3">
                Final Thoughts on Choosing a Rental Rooms in NW2, London
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                Cricklewood strikes a rare balance for single-room tenants: genuinely affordable rent, strong transport connections, and a lively but low-key neighbourhood feel. Whether you&apos;re commuting to Middlesex University or into Central London for work, a single room here gives you your own space without stretching your budget.
              </p>
              <p className="text-slate-700 font-medium">
                Ready to see what&apos;s available? Browse our {' '}
                <Link href="https://rentaroomlondon.co.uk/rental-rooms-students-cricklewood-uk" className="text-indigo-600 hover:underline">
                  current Cricklewood listings
                </Link>.
              </p>
            </div>

          </main>

        </div>
      </div>
    </div>
  );
}