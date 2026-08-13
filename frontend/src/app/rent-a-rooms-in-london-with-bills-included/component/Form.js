'use client';

import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { X, MapPin, MessageCircle, ExternalLink } from 'lucide-react';
import PhoneInput from 'react-phone-input-2';
import {
  isValidPhoneNumber,
  parsePhoneNumber,
} from 'libphonenumber-js';

import 'leaflet/dist/leaflet.css';
import 'react-phone-input-2/lib/style.css';

// ── All locations ──────────────────────────────────────────────
const LOCATIONS = [
  // North West London
  {
    id: 'cricklewood',
    name: 'Cricklewood',
    area: 'North West London',
    lat: 51.5586,
    lng: -0.2155,
    image:
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80',
    href: '/rental-rooms-students-cricklewood-uk',
  },
  {
    id: 'harlesden',
    name: 'Harlesden',
    area: 'North West London',
    lat: 51.5362,
    lng: -0.258,
    image:
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80',
    href: '/rooms-rent-harlesden-nw10-bills-included',
  },
  {
    id: 'kingsbury',
    name: 'Kingsbury',
    area: 'North West London',
    lat: 51.5846,
    lng: -0.278,
    image:
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80',
    href: '/shared-rental-rooms-kingsbury-london-nw9',
  },
  {
    id: 'west-hampstead',
    name: 'West Hampstead',
    area: 'North West London',
    lat: 51.547,
    lng: -0.191,
    image:
      'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80',
    href: '/rooms-rental-nw6-west-hampstead-london',
  },
  {
    id: 'hendon',
    name: 'Hendon',
    area: 'North West London',
    lat: 51.583,
    lng: -0.225,
    image:
      'https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=800&q=80',
    href: '/cheap-rental-rooms-hendon-nw4-london',
  },

  // South East London
  {
    id: 'plumstead',
    name: 'Plumstead',
    area: 'South East London',
    lat: 51.487,
    lng: 0.087,
    image:
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
    href: '/affordable-rental-rooms-se18-plumstead-bills-included',
  },
  {
    id: 'eltham',
    name: 'Eltham',
    area: 'South East London',
    lat: 51.45,
    lng: 0.052,
    image:
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80',
    href: '/rental-rooms-eltham-london-se9-bills-included',
  },
  {
    id: 'greenwich',
    name: 'Greenwich',
    area: 'South East London',
    lat: 51.4826,
    lng: -0.0077,
    image:
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80',
    href: '/best-rental-rooms-greenwich-university-se10-london',
  },
  {
    id: 'stockwell',
    name: 'Stockwell',
    area: 'South East London',
    lat: 51.472,
    lng: -0.122,
    image:
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80',
    href: '/stockwell-sw9-student-housing-bills-included',
  },

  // East London
  {
    id: 'south-tottenham',
    name: 'South Tottenham',
    area: 'East London',
    lat: 51.58,
    lng: -0.07,
    image:
      'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80',
    href: '/Spare-rooms-rent-south-tottenham-n15-london',
  },
  {
    id: 'leyton',
    name: 'Leyton',
    area: 'East London',
    lat: 51.56,
    lng: -0.015,
    image:
      'https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=800&q=80',
    href: '/rent-single-double-rooms-leyton-e10-london',
  },
  {
    id: 'east-ham',
    name: 'East Ham',
    area: 'East London',
    lat: 51.532,
    lng: 0.055,
    image:
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
    href: '/east-ham-e6-properties-rent-bills-included',
  },

  // Out of London
  {
    id: 'birmingham',
    name: 'Birmingham',
    area: 'Out of London',
    lat: 52.4862,
    lng: -1.8904,
    image:
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80',
    href: '/birmingham-city-centre-student-housing-bills-included',
  },
];

// ── Map ────────────────────────────────────────────────────────
const MapInner = dynamic(
  () =>
    Promise.all([
      import('react-leaflet'),
      import('leaflet'),
    ]).then(([RL, L]) => {
      const {
        MapContainer,
        TileLayer,
        Marker,
        useMap,
      } = RL;

      function createLocationIcon(name, isSelected = false) {
        return L.default.divIcon({
          html: `
            <div style="
              display:flex;
              flex-direction:column;
              align-items:center;
              transform:translate(-50%,-100%);
              cursor:pointer;
            ">
              <div style="
                background:${isSelected ? '#0f172a' : '#ea580c'};
                color:white;
                padding:7px 12px;
                border-radius:10px;
                font-size:12px;
                font-weight:700;
                box-shadow:0 4px 14px rgba(0,0,0,0.25);
                white-space:nowrap;
                border:2px solid white;
              ">
                ${name}
              </div>

              <div style="
                width:0;
                height:0;
                border-left:7px solid transparent;
                border-right:7px solid transparent;
                border-top:9px solid ${
                  isSelected ? '#0f172a' : '#ea580c'
                };
              "></div>
            </div>
          `,
          className: '',
          iconAnchor: [0, 0],
        });
      }

      function FitBounds({ locations, hasSelection }) {
        const map = useMap();
        const didFit = useRef(false);

        useEffect(() => {
          if (
            hasSelection ||
            didFit.current ||
            !locations?.length
          ) {
            return;
          }

          const bounds = locations.map((l) => [
            l.lat,
            l.lng,
          ]);

          if (bounds.length) {
            map.fitBounds(bounds, {
              padding: [50, 50],
            });

            didFit.current = true;
          }
        }, [locations, map, hasSelection]);

        return null;
      }

      function ZoomToLocation({ location }) {
        const map = useMap();

        useEffect(() => {
          if (!location) return;

          map.flyTo(
            [location.lat, location.lng],
            14,
            { duration: 1.1 }
          );
        }, [location, map]);

        return null;
      }

      return function MapInner({
        locations,
        selected,
        onPinClick,
      }) {
        return (
          <MapContainer
            center={[51.5074, -0.1278]}
            zoom={11}
            style={{
              height: '100%',
              width: '100%',
            }}
            preferCanvas
          >
            <TileLayer
              attribution="&copy; OpenStreetMap"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <FitBounds
              locations={locations}
              hasSelection={!!selected}
            />

            {selected && (
              <ZoomToLocation location={selected} />
            )}

            {locations.map((loc) => (
              <Marker
                key={loc.id}
                position={[
                  loc.lat,
                  loc.lng,
                ]}
                icon={createLocationIcon(
                  loc.name,
                  selected?.id === loc.id
                )}
                eventHandlers={{
                  click: () => onPinClick(loc),
                }}
              />
            ))}
          </MapContainer>
        );
      };
    }),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center text-slate-500 text-sm bg-slate-100">
        Loading map…
      </div>
    ),
  }
);

// ── Main Component ─────────────────────────────────────────────
export default function Form() {
  const router = useRouter();

  const [selected, setSelected] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    moveIn: '',
    area: '',
    lengthOfStay: '',
    budget: '',
    website: '',
  });

  // ── Name validation ──────────────────────────────────────────
  const isValidRealName = (name) => {
    if (!name || typeof name !== 'string') {
      return false;
    }

    const cleaned = name.trim();

    if (
      !/^[a-zA-Z\s'-]{2,40}$/.test(cleaned)
    ) {
      return false;
    }

    if (!/[aeiouAEIOU]/.test(cleaned)) {
      return false;
    }

    if (
      /[bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ]{4,}/.test(
        cleaned
      )
    ) {
      return false;
    }

    if (/(.)\1{3,}/.test(cleaned)) {
      return false;
    }

    const fakePatterns = [
      'asdf',
      'qwer',
      'zxcv',
      'hjkl',
      'uiop',
      'bnm',
      'qwerty',
      'asdfgh',
      'zxcvbn',
      'qazwsx',
      'poiuyt',
      'jhdb',
      'hbds',
      'dsgh',
      'fghj',
      'cvbn',
      'tyui',
      'qwe',
      'asd',
      'zxc',
      'rty',
      'fgh',
      'vbn',
      "test", "testing", "tester", "testuser", "test1", "test2", "test3",
      "test87", "test123", "dummy", "fake", "sample", "example",
      "name", "fullname", "firstname", "lastname", "username", "user", "admin", "guest"
    ];

    const lowerName =
      cleaned.toLowerCase();

    if (
      fakePatterns.some((pattern) =>
        lowerName.includes(pattern)
      )
    ) {
      return false;
    }

    return true;
  };

  // ── Phone validation ─────────────────────────────────────────
  const isFakeOrInvalidPhone = (phone) => {
    if (!phone) {
      return true;
    }

    const fullPhone = phone.startsWith('+')
      ? phone
      : `+${phone.replace(/\D/g, '')}`;

    if (!isValidPhoneNumber(fullPhone)) {
      return true;
    }

    try {
      const parsed =
        parsePhoneNumber(fullPhone);

      if (!parsed) {
        return true;
      }

      const nationalNumber =
        parsed.nationalNumber;

      // Reject repeated numbers
      if (/^(\d)\1+$/.test(nationalNumber)) {
        return true;
      }

      // Reject obvious fake numbers
      const fakePatterns = [
        '123456789',
        '1234567890',
        '0123456789',
        '987654321',
        '9876543210',
        '111111111',
        '222222222',
        '333333333',
        '444444444',
        '555555555',
        '666666666',
        '777777777',
        '888888888',
        '999999999',
        '000000000',
      ];

      if (
        fakePatterns.some((fake) =>
          nationalNumber.includes(fake)
        )
      ) {
        return true;
      }

      return false;
    } catch (err) {
      console.error(
        'Phone validation error:',
        err
      );

      return true;
    }
  };

  // ── Form validation ──────────────────────────────────────────
  const validateForm = () => {
    const {
      firstName,
      lastName,
      email,
      phone,
    } = form;

    if (!isValidRealName(firstName)) {
      alert('Please enter a valid first name');
      return false;
    }

    if (!isValidRealName(lastName)) {
      alert('Please enter a valid surname');
      return false;
    }

    const cleanEmail =
      email.trim();

    const local =
      cleanEmail.split('@')[0] || '';

    const dotCount =
      (local.match(/\./g) || []).length;

    if (
      dotCount >= 3 ||
      local.includes('..') ||
      local.startsWith('.') ||
      local.endsWith('.')
    ) {
      alert(
        'Please enter a valid email address'
      );
      return false;
    }

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    if (!emailRegex.test(cleanEmail)) {
      alert(
        'Please enter a valid email address'
      );
      return false;
    }

    if (isFakeOrInvalidPhone(phone)) {
      alert(
        'Please enter a complete and valid phone number'
      );
      return false;
    }

    if (!form.moveIn) {
      alert(
        'Please select when you are looking to move'
      );
      return false;
    }

    if (!form.area) {
      alert('Please select an area');
      return false;
    }

    if (!form.lengthOfStay) {
      alert(
        'Please select length of stay'
      );
      return false;
    }

    if (!form.budget) {
      alert(
        'Please select a monthly budget'
      );
      return false;
    }

    return true;
  };

  // ── Map pin ──────────────────────────────────────────────────
  const handlePinClick = (loc) => {
    setSelected(loc);

    setForm((prev) => ({
      ...prev,
      area: loc.name,
    }));
  };

  // ── Location card ────────────────────────────────────────────
  const handleCardClick = () => {
    if (selected?.href) {
      router.push(selected.href);
    }
  };

  // ── Input change ─────────────────────────────────────────────
  const handleChange = (key) => (e) => {
    setForm((prev) => ({
      ...prev,
      [key]: e.target.value,
    }));
  };

  // ── Submit ───────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/enquiries`,
        {
          method: 'POST',
          headers: {
            'Content-Type':
              'application/json',
          },
          body: JSON.stringify({
            name: `${form.firstName} ${form.lastName}`.trim(),

            firstName:
              form.firstName,

            lastName:
              form.lastName,

            email:
              form.email,

            phone:
              form.phone,

            moveIn:
              form.moveIn,

            area:
              form.area,

            lengthOfStay:
              form.lengthOfStay,

            budget:
              form.budget,

            selectedLocationId:
              selected?.id || null,

            website:
              form.website,
          }),
        }
      );

      const data =
        await res.json();

      if (data.success) {
        setForm({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          moveIn: '',
          area: '',
          lengthOfStay: '',
          budget: '',
          website: '',
        });

        setSelected(null);

        router.push(
          '/thank-you-rental-room-london'
        );
      } else {
        alert(
          data.message ||
            'Something went wrong'
        );
      }
    } catch (err) {
      console.error(err);
      alert('Network error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <section className="w-full bg-[#FAF8F5] border-t border-slate-200/80">
        <div className="min-h-[85vh] flex flex-col lg:flex-row">

          {/* ==================================================
              MAP
          =================================================== */}
          <div className="w-full lg:w-[55%] h-[50vh] lg:h-auto lg:min-h-[85vh] relative bg-slate-100">

            <MapInner
              locations={LOCATIONS}
              selected={selected}
              onPinClick={handlePinClick}
            />

            {/* Location Card */}
            {selected && (
              <div className="absolute bottom-4 left-4 right-4 lg:left-5 lg:right-auto lg:w-[340px] z-[1000]">

                <button
                  type="button"
                  onClick={handleCardClick}
                  className="w-full text-left bg-white rounded-2xl shadow-2xl border border-slate-200/90 overflow-hidden hover:border-orange-300 hover:shadow-orange-100/50 transition-all cursor-pointer group"
                >
                  <div className="relative h-40 overflow-hidden">

                    <img
                      src={selected.image}
                      alt={selected.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelected(null);
                      }}
                      className="absolute top-3 right-3 p-1.5 rounded-full bg-white/90 hover:bg-white text-slate-600 shadow-sm z-10"
                    >
                      <X size={16} />
                    </button>

                    <div className="absolute bottom-3 left-3">
                      <span className="bg-white/95 text-slate-900 text-xs font-bold px-2.5 py-1 rounded-lg shadow-sm">
                        {selected.area}
                      </span>
                    </div>

                  </div>

                  <div className="p-4">

                    <h3 className="font-bold text-slate-950 text-base">
                      Rooms in {selected.name}
                    </h3>

                    <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-orange-500" />

                      {selected.name},{' '}
                      {selected.area}
                    </p>

                    <div className="flex items-center justify-end mt-4 pt-3 border-t border-slate-100">

                      <span className="inline-flex items-center gap-1 text-xs font-bold text-orange-600 group-hover:underline">
                        View rooms

                        <ExternalLink className="w-3.5 h-3.5" />
                      </span>

                    </div>

                  </div>
                </button>
              </div>
            )}
          </div>

          {/* ==================================================
              FORM
          =================================================== */}
          <div className="w-full lg:w-[45%] overflow-y-auto p-6 sm:p-8 lg:p-10 bg-[#FAF8F5]">

            <div className="max-w-md mx-auto">

              <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-800 text-xs font-bold px-3 py-1 rounded-full border border-orange-200 mb-4">

                <MessageCircle className="w-3.5 h-3.5 text-orange-600" />

                Enquiry Form
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight mb-2">
                Tell us what you&apos;re looking for
              </h2>

              <p className="text-sm text-slate-500 mb-7 leading-relaxed">
                Click a pin on the map to preview
                an area, then open the card to see
                rooms — or fill the form below.
              </p>

              {/* Selected area */}
              {selected && (
                <div className="mb-6 p-3.5 bg-orange-50 border border-orange-200 rounded-xl text-sm flex items-start gap-2">

                  <MapPin className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />

                  <div>
                    <span className="font-bold text-slate-900">
                      Selected:{' '}
                    </span>

                    <span className="text-slate-700">
                      {selected.name}
                    </span>
                  </div>

                </div>
              )}

              <form
                onSubmit={handleSubmit}
                className="space-y-5"
                noValidate
              >

                {/* Honeypot */}
                <div
                  style={{
                    position: 'absolute',
                    left: '-9999px',
                    opacity: 0,
                    height: 0,
                    overflow: 'hidden',
                  }}
                  aria-hidden="true"
                >
                  <label htmlFor="website">
                    Website
                  </label>

                  <input
                    type="text"
                    id="website"
                    name="website"
                    value={form.website}
                    onChange={handleChange(
                      'website'
                    )}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                {/* First + Last Name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                      First Name *
                    </label>

                    <input
                      type="text"
                      required
                      minLength={2}
                      maxLength={40}
                      value={form.firstName}
                      onChange={handleChange(
                        'firstName'
                      )}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-orange-400/40 focus:border-orange-300 transition"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                      Surname *
                    </label>

                    <input
                      type="text"
                      required
                      minLength={2}
                      maxLength={40}
                      value={form.lastName}
                      onChange={handleChange(
                        'lastName'
                      )}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-orange-400/40 focus:border-orange-300 transition"
                    />
                  </div>

                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                    Email *
                  </label>

                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange(
                      'email'
                    )}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-orange-400/40 focus:border-orange-300 transition"
                  />
                </div>

                {/* ==================================================
                    PHONE
                =================================================== */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                    Phone *
                  </label>

                  <PhoneInput
                    country="gb"
                    preferredCountries={['gb']}
                    value={form.phone}
                    onChange={(phone) => {
                      setForm((prev) => ({
                        ...prev,
                        phone: phone
                          ? `+${phone}`
                          : '',
                      }));
                    }}
                    inputProps={{
                      name: 'phone',
                      required: true,
                      autoComplete: 'tel',
                    }}
                    placeholder="+44 7xxx xxxxxx"
                    enableSearch
                    countryCodeEditable={false}
                    containerClass="phone-input-container"
                    inputClass="phone-input"
                    buttonClass="phone-input-button"
                    dropdownClass="phone-input-dropdown"
                  />
                </div>

                {/* Move In */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    When are you looking to move? *
                  </label>

                  <div className="space-y-2">

                    {[
                      'Within 1 week',
                      'Within 1 month',
                      'Within 3 months',
                      'Within 6 months',
                    ].map((opt) => (
                      <label
                        key={opt}
                        className="flex items-center gap-3 cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="moveIn"
                          value={opt}
                          checked={
                            form.moveIn === opt
                          }
                          onChange={handleChange(
                            'moveIn'
                          )}
                          className="w-4 h-4 accent-orange-500"
                          required
                        />

                        <span className="text-sm text-slate-700">
                          {opt}
                        </span>
                      </label>
                    ))}

                  </div>
                </div>

                {/* Area */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                    Which area interests you most? *
                  </label>

                  <select
                    required
                    value={form.area}
                    onChange={handleChange(
                      'area'
                    )}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-orange-400/40 focus:border-orange-300 transition"
                  >
                    <option value="">
                      Select area
                    </option>

                    <optgroup label="North West London">
                      <option value="Cricklewood">
                        Cricklewood
                      </option>
                      <option value="Harlesden">
                        Harlesden
                      </option>
                      <option value="Kingsbury">
                        Kingsbury
                      </option>
                      <option value="West Hampstead">
                        West Hampstead
                      </option>
                      <option value="Hendon">
                        Hendon
                      </option>
                    </optgroup>

                    <optgroup label="South East London">
                      <option value="Plumstead">
                        Plumstead
                      </option>
                      <option value="Eltham">
                        Eltham
                      </option>
                      <option value="Greenwich">
                        Greenwich
                      </option>
                      <option value="Stockwell">
                        Stockwell
                      </option>
                    </optgroup>

                    <optgroup label="East London">
                      <option value="South Tottenham">
                        South Tottenham
                      </option>
                      <option value="Leyton">
                        Leyton
                      </option>
                      <option value="East Ham">
                        East Ham
                      </option>
                    </optgroup>

                    <optgroup label="Out of London">
                      <option value="Birmingham">
                        Birmingham
                      </option>
                    </optgroup>

                    <option value="Other">
                      Other / Any London
                    </option>
                  </select>
                </div>

                {/* Length of Stay */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Length of Stay *
                  </label>

                  <div className="space-y-2">

                    {[
                      'less than month',
                      '1-2 months',
                      '3-5 months',
                      '6-9 months',
                      '10-12 months',
                    ].map((opt) => (
                      <label
                        key={opt}
                        className="flex items-center gap-3 cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="lengthOfStay"
                          value={opt}
                          checked={
                            form.lengthOfStay ===
                            opt
                          }
                          onChange={handleChange(
                            'lengthOfStay'
                          )}
                          className="w-4 h-4 accent-orange-500"
                          required
                        />

                        <span className="text-sm text-slate-700">
                          {opt}
                        </span>
                      </label>
                    ))}

                  </div>
                </div>

                {/* Budget */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Monthly Budget *
                  </label>

                  <div className="space-y-2">

                    {[
                      {
                        label: '£620 – £1,500',
                        value: '620-1500',
                      },
                      {
                        label: '£1,500 – £2,500',
                        value: '1500-2500',
                      },
                      {
                        label: '£2,500 – £3,500',
                        value: '2500-3500',
                      },
                      {
                        label: '£3,500+',
                        value: '3500+',
                      },
                    ].map((opt) => (
                      <label
                        key={opt.value}
                        className="flex items-center gap-3 cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="budget"
                          value={opt.value}
                          checked={
                            form.budget ===
                            opt.value
                          }
                          onChange={handleChange(
                            'budget'
                          )}
                          className="w-4 h-4 accent-orange-500"
                          required
                        />

                        <span className="text-sm text-slate-700">
                          {opt.label}
                        </span>
                      </label>
                    ))}

                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-colors shadow-sm mt-2"
                >
                  {isSubmitting
                    ? 'Submitting...'
                    : 'Submit Enquiry'}
                </button>

              </form>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          PHONE INPUT CUSTOM CSS
          Everything stays in this same file.
      ========================================================== */}
      <style jsx global>{`
        .phone-input-container {
          width: 100% !important;
        }

        .phone-input {
          width: 100% !important;
          height: 48px !important;

          padding-left: 52px !important;
          padding-right: 16px !important;

          border: 1px solid rgb(226 232 240) !important;
          border-radius: 0.75rem !important;

          background: #ffffff !important;

          font-size: 0.875rem !important;
          line-height: 1.25rem !important;

          color: rgb(15 23 42) !important;

          outline: none !important;

          transition:
            border-color 0.2s ease,
            box-shadow 0.2s ease !important;
        }

        .phone-input:focus {
          border-color: rgb(253 186 116) !important;

          box-shadow:
            0 0 0 3px rgb(251 146 60 / 0.15) !important;
        }

        .phone-input::placeholder {
          color: rgb(148 163 184) !important;
        }

        /* Country selector */
        .phone-input-button {
          width: 44px !important;
          height: 48px !important;

          border: 1px solid rgb(226 232 240) !important;
          border-right: 0 !important;

          border-radius: 0.75rem 0 0 0.75rem !important;

          background: #ffffff !important;
        }

        .phone-input-button:hover,
        .phone-input-button:focus {
          background: rgb(248 250 252) !important;
        }

        /* Country dropdown */
        .phone-input-dropdown {
          margin-top: 4px !important;

          border: 1px solid rgb(226 232 240) !important;

          border-radius: 0.75rem !important;

          box-shadow:
            0 10px 25px rgb(15 23 42 / 0.12) !important;

          overflow: hidden !important;

          z-index: 9999 !important;
        }

        /* Search field */
        .phone-input-dropdown .search {
          padding: 8px !important;
          background: #ffffff !important;
        }

        .phone-input-dropdown .search-box {
          width: 100% !important;

          padding: 8px 10px !important;

          border: 1px solid rgb(226 232 240) !important;

          border-radius: 0.5rem !important;

          outline: none !important;

          font-size: 14px !important;
        }

        .phone-input-dropdown .search-box:focus {
          border-color: rgb(253 186 116) !important;

          box-shadow:
            0 0 0 2px rgb(251 146 60 / 0.15) !important;
        }

        /* Countries */
        .phone-input-dropdown .country {
          padding: 9px 12px !important;

          font-size: 14px !important;

          transition:
            background 0.15s ease !important;
        }

        .phone-input-dropdown .country:hover {
          background: rgb(255 247 237) !important;
        }

        .phone-input-dropdown .country.highlight {
          background: rgb(255 237 213) !important;
        }

        /* Selected country */
        .phone-input-button.open {
          background: rgb(255 247 237) !important;
        }

        /* Mobile */
        @media (max-width: 640px) {
          .phone-input {
            height: 48px !important;
            font-size: 16px !important;
          }

          .phone-input-button {
            height: 48px !important;
          }

          .phone-input-dropdown {
            width: 100% !important;
          }
        }
      `}</style>
    </>
  );
}