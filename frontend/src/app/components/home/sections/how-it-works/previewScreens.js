// The mock app screens shown in the "How it works" preview card.
import { ICONS } from "../../ui/icons";
import Icon from "../../ui/Icon";
import { VIEWING_DAYS, VIEWING_TIMES } from "../../data/steps";

const SELECTED_DAY = 2;
const SELECTED_TIME = "13:30";

// Example London prices (bills included, per month) used in the mock screens.
const RENT = { single: 750, double: 900, studio: 1250 };
const DEPOSIT_RATIO = 0.5; // deposit = half a month's rent
const BOOKED_RENT = RENT.single; // the room the user "books" in the Terms / Pay screens
const BOOKED_DEPOSIT = Math.round(BOOKED_RENT * DEPOSIT_RATIO);

const gbp = (amount) => `£${amount.toLocaleString("en-GB")}`;

function Label({ children }) {
  return <span className="pv-label">{children}</span>;
}

function Tag({ children }) {
  return <span className="pv-tag">{children}</span>;
}

function ActionBar({ children, tone = "orange", spaced = false }) {
  return <span className={`pv-action pv-action--${tone}${spaced ? " pv-action--spaced" : ""}`}>{children}</span>;
}

function RoomRow({ image, alt, title, subtitle, trailing, highlighted = false }) {
  return (
    <div className={`pv-room${highlighted ? " pv-room--saved" : ""}`}>
      <img src={image} alt={alt || title} className="pv-room__image" />
      <span className="pv-room__text">
        <span className="pv-room__title">{title}</span>
        <span className="pv-room__subtitle">{subtitle}</span>
      </span>
      {trailing}
    </div>
  );
}

function Check({ children }) {
  return (
    <span className="pv-check">
      <Icon name="check" size={16} color="#16A34A" strokeWidth={3} />
      {children}
    </span>
  );
}

function Price({ amount }) {
  return <span className="pv-room__price">{gbp(amount)} pcm</span>;
}

export function SearchScreen() {
  return (
    <div className="pv-screen">
      <div className="pv-search">
        <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F26A36" strokeWidth="2.4" strokeLinecap="round">
          <circle cx="11" cy="11" r="7" />
          <path d="M20 20l-3.5-3.5" />
        </svg>
        <span className="pv-search__text">NW4 · Hendon</span>
        <span className="caret" aria-hidden="true"></span>
      </div>
      <Label>Rooms near you · bills included</Label>
      <RoomRow image="/home/room-single.webp" title="Single room" subtitle="Near Hendon Central" trailing={<Price amount={RENT.single} />} />
      <RoomRow image="/home/room-double.webp" title="Double room" subtitle="Near Brent Cross" trailing={<Price amount={RENT.double} />} />
      <RoomRow image="/home/room-studio.webp" title="Studio room" subtitle="Near Colindale" trailing={<Price amount={RENT.studio} />} />
    </div>
  );
}

export function ShortlistScreen() {
  const heart = (
    <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="#F26A36">
      <path d={ICONS.heart} />
    </svg>
  );
  return (
    <div className="pv-screen">
      <Label>Your shortlist (2)</Label>
      <RoomRow highlighted image="/home/room-single.webp" alt="Single room in Hendon" title="Single room · NW4" subtitle="Near Middlesex University" trailing={heart} />
      <RoomRow highlighted image="/home/room-twin.webp" alt="Twin room in West Hampstead" title="Double room · NW6" subtitle="Jubilee line access" trailing={heart} />
      <div className="pv-grid pv-grid--spaced">
        <span className="pv-stat">
          <span className="pv-stat__label">Closest to uni</span>
          <span className="pv-stat__value">NW4</span>
        </span>
        <span className="pv-stat">
          <span className="pv-stat__label">Fastest to centre</span>
          <span className="pv-stat__value">NW6</span>
        </span>
      </div>
    </div>
  );
}

export function ViewingScreen() {
  return (
    <div className="pv-screen">
      <Label>Pick a day</Label>
      <div className="pv-days">
        {VIEWING_DAYS.map(([day, date], i) => (
          <span key={day} className={`pv-day${i === SELECTED_DAY ? " pv-day--selected" : ""}`}>
            <span className="pv-day__name">{day}</span>
            <span className="pv-day__date">{date}</span>
          </span>
        ))}
      </div>
      <Label>Pick a time</Label>
      <div className="pv-times">
        {VIEWING_TIMES.map((time) => (
          <span key={time} className={`pv-time${time === SELECTED_TIME ? " pv-time--selected" : ""}`}>{time}</span>
        ))}
      </div>
      <ActionBar spaced>Confirm viewing</ActionBar>
    </div>
  );
}

export function TermsScreen() {
  return (
    <div className="pv-screen">
      <Label>Your rental terms</Label>
      <div className="pv-terms">
        <div className="pv-terms__row pv-terms__row--total"><span>Monthly rent</span><span>{gbp(BOOKED_RENT)}</span></div>
        <div className="pv-terms__row"><span>Deposit (½ month)</span><span>{gbp(BOOKED_DEPOSIT)}</span></div>
        <div className="pv-terms__row"><span>Contract length</span><span>Flexible</span></div>
      </div>
      <Label>Included in your rent</Label>
      <div className="pv-grid pv-checklist">
        <Check>Utilities</Check>
        <Check>Wi-Fi</Check>
      </div>
      <ActionBar tone="navy">I agree to these terms</ActionBar>
    </div>
  );
}

function DocumentRow({ label, done }) {
  return (
    <div className="pv-doc">
      {done ? <Icon name="check" size={16} color="#16A34A" strokeWidth={3} /> : <span className="pv-doc__pending"></span>}
      <span className="pv-doc__label">{label}</span>
      <span className={`pv-doc__status${done ? "" : " pv-doc__status--pending"}`}>{done ? "Done" : "In progress"}</span>
    </div>
  );
}

export function ApplicationScreen() {
  return (
    <div className="pv-screen">
      <Tag>ONLINE FORM</Tag>
      <DocumentRow label="Photo ID" done />
      <DocumentRow label="Proof of income" done />
      <DocumentRow label="Agreement form" />
      <div className="pv-progress">
        <div className="fillbar pv-progress__bar"></div>
      </div>
      <ActionBar>Submit application</ActionBar>
    </div>
  );
}

export function PaymentScreen() {
  return (
    <div className="pv-screen">
      <Tag>PAYMENT</Tag>
      <div className="pv-invoice">
        <div className="pv-invoice__row"><span>Deposit</span><span>{gbp(BOOKED_DEPOSIT)}</span></div>
        <div className="pv-invoice__row"><span>First month&apos;s rent</span><span>{gbp(BOOKED_RENT)}</span></div>
        <div className="pv-invoice__rule"></div>
        <div className="pv-invoice__row pv-invoice__row--total"><span>Total to pay</span><span>{gbp(BOOKED_DEPOSIT + BOOKED_RENT)}</span></div>
      </div>
      <div className="pv-note">
        <Icon name="shield" size={16} color="#16A34A" strokeWidth={2.2} />
        You&apos;ll receive your move-in details after payment
      </div>
      <ActionBar>Pay &amp; secure room</ActionBar>
    </div>
  );
}

export function MoveInScreen() {
  return (
    <div className="pv-screen pv-screen--centered">
      <span className="pop pv-done">
        <Icon name="key" size={34} color="#F26A36" strokeWidth={2} />
      </span>
      <span className="pv-done__title">You&apos;re all set!</span>
      <span className="pv-done__text">Collect your keys and settle into your new home.</span>
      <div className="pv-grid pv-checklist pv-checklist--stretch">
        <Check>Electricity &amp; gas</Check>
        <Check>Water</Check>
        <Check>Wi-Fi</Check>
        <Check>Fully furnished</Check>
      </div>
    </div>
  );
}
