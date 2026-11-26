"use client";

// Location search input with instant suggestions (postcode districts, areas, cities, full postcodes).
// The dropdown is rendered in a portal with fixed positioning, so parents with `overflow: hidden`
// (like the home hero) never clip it. Styles live in LocationAutocomplete.css (plain CSS, so it
// works both on Tailwind pages and inside the home page's CSS reset).

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { getLocalSuggestions, getRemoteSuggestions, mergeSuggestions } from "../utils/locationSuggest";
import "./LocationAutocomplete.css";

const REMOTE_DELAY_MS = 120;
const NO_ITEMS = [];

const ICON_PATHS = {
  district: "M4 7h16M4 12h16M4 17h10",
  postcode: "M3 7l9 6 9-6M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z",
  area: "M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21zM12 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z",
  city: "M3 21h18M5 21V8l6-4v17M11 21V10h8v11M14 13h2M14 16h2M7 11h1M7 14h1M7 17h1",
};

function TypeIcon({ type }) {
  return (
    <span className={`lac-icon lac-icon--${type}`} aria-hidden="true">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d={ICON_PATHS[type] || ICON_PATHS.area} />
      </svg>
    </span>
  );
}

function Highlight({ text, query }) {
  const q = query.trim().toLowerCase();
  const at = q ? text.toLowerCase().indexOf(q) : -1;
  if (at < 0) return text;
  return (
    <>
      {text.slice(0, at)}
      <mark className="lac-mark">{text.slice(at, at + q.length)}</mark>
      {text.slice(at + q.length)}
    </>
  );
}

/**
 * Props
 *  value, onChange(text)      controlled input text
 *  onSelect(suggestion)       { value, title, type, lat?, lng? } — set your search text to suggestion.value
 *  anchorRef                  optional element to align the dropdown with (defaults to the input)
 *  inputClassName, id, name, placeholder, autoComplete etc. are passed to the <input>
 */
export default function LocationAutocomplete({ value = "", onChange, onSelect, anchorRef, inputClassName = "", ...inputProps }) {
  const listId = useId();
  const inputRef = useRef(null);
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const [remote, setRemote] = useState({ query: null, items: [] });
  const [loading, setLoading] = useState(false);
  const [position, setPosition] = useState(null);

  useEffect(() => setMounted(true), []);

  const local = useMemo(() => getLocalSuggestions(value), [value]);
  const remoteItems = remote.query === value.trim().toLowerCase() ? remote.items : NO_ITEMS;
  const suggestions = useMemo(() => mergeSuggestions(local, remoteItems, value), [local, remoteItems, value]);

  // Network lookups (postcodes.io) — debounced, cancelled when the text changes, cached per query.
  useEffect(() => {
    const query = value.trim();
    if (!open || !query) {
      setLoading(false);
      return undefined;
    }
    const controller = new AbortController();
    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const items = await getRemoteSuggestions(query, controller.signal);
        setRemote({ query: query.toLowerCase(), items });
      } catch (error) {
        if (error.name !== "AbortError") setRemote({ query: query.toLowerCase(), items: [] });
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }, REMOTE_DELAY_MS);
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [value, open]);

  // Keep the dropdown glued to the input while the page scrolls or resizes.
  useEffect(() => {
    if (!open) return undefined;
    const update = () => {
      const anchor = anchorRef?.current || inputRef.current;
      if (!anchor) return;
      const rect = anchor.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const width = Math.min(Math.max(rect.width, 320), viewportWidth - 16);
      const left = Math.max(8, Math.min(rect.left, viewportWidth - width - 8));
      const top = rect.bottom + 8;
      setPosition({ top, left, width, maxHeight: Math.max(220, window.innerHeight - top - 16) });
    };
    update();
    window.addEventListener("scroll", update, true);
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update, true);
      window.removeEventListener("resize", update);
    };
  }, [open, anchorRef]);

  const choose = (item) => {
    onSelect?.(item);
    setOpen(false);
    setActive(-1);
  };

  const handleKeyDown = (event) => {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      if (!open) {
        setOpen(true);
        return;
      }
      const step = event.key === "ArrowDown" ? 1 : -1;
      setActive((current) => {
        const next = current + step;
        if (next >= suggestions.length) return 0;
        if (next < 0) return suggestions.length - 1;
        return next;
      });
    } else if (event.key === "Enter" && open && active >= 0 && suggestions[active]) {
      event.preventDefault();
      choose(suggestions[active]);
    } else if (event.key === "Escape") {
      setOpen(false);
    } else if (event.key === "Tab") {
      setOpen(false);
    }
    inputProps.onKeyDown?.(event);
  };

  const query = value.trim();
  const showDropdown = mounted && open && position;

  return (
    <>
      <input
        {...inputProps}
        ref={inputRef}
        type="text"
        autoComplete="off"
        role="combobox"
        aria-expanded={showDropdown ? "true" : "false"}
        aria-controls={listId}
        aria-autocomplete="list"
        aria-activedescendant={active >= 0 ? `${listId}-${active}` : undefined}
        className={inputClassName}
        value={value}
        onChange={(event) => {
          onChange?.(event.target.value);
          setOpen(true);
          setActive(-1);
        }}
        onFocus={(event) => {
          setOpen(true);
          inputProps.onFocus?.(event);
        }}
        onClick={() => setOpen(true)}
        onBlur={(event) => {
          setOpen(false);
          inputProps.onBlur?.(event);
        }}
        onKeyDown={handleKeyDown}
      />

      {showDropdown &&
        createPortal(
          <div
            className="lac-panel"
            style={{ top: position.top, left: position.left, width: position.width, maxHeight: position.maxHeight }}
            // Keep focus in the input so a click/tap selects instead of closing the panel first.
            onMouseDown={(event) => event.preventDefault()}
          >
            {!query && <div className="lac-heading">Popular areas</div>}

            <ul id={listId} role="listbox" className="lac-list">
              {suggestions.map((item, index) => (
                <li
                  key={item.id}
                  id={`${listId}-${index}`}
                  role="option"
                  aria-selected={index === active ? "true" : "false"}
                  className={`lac-option${index === active ? " lac-option--active" : ""}`}
                  onMouseEnter={() => setActive(index)}
                  onClick={() => choose(item)}
                >
                  <TypeIcon type={item.type} />
                  <span className="lac-text">
                    <span className="lac-title">
                      <Highlight text={item.title} query={query} />
                    </span>
                    <span className="lac-subtitle">{item.subtitle}</span>
                  </span>
                </li>
              ))}
            </ul>

            {query && suggestions.length === 0 && !loading && (
              <div className="lac-empty">
                No matching places. Press search to look for “{query}”.
              </div>
            )}
            {query && loading && suggestions.length === 0 && (
              <div className="lac-empty">
                <span className="lac-spinner" aria-hidden="true"></span>
                Finding places…
              </div>
            )}
          </div>,
          document.body
        )}
    </>
  );
}
