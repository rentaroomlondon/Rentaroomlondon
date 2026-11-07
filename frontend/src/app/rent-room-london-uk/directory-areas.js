export const postcodeByArea = {
  Hackney: ["E8", "E9"], Stratford: ["E15", "E20"], "Canary Wharf": ["E14"], "East Ham": ["E6"], Leyton: ["E10"], Walthamstow: ["E17"], Greenwich: ["SE10"], Ealing: ["W5", "W13"], Hammersmith: ["W6"], "Shepherd's Bush": ["W12"], Acton: ["W3"], Camden: ["NW1"], Islington: ["N1"], Hendon: ["NW4"], Tottenham: ["N15", "N17"], "Finsbury Park": ["N4"], Brixton: ["SW2"], Bermondsey: ["SE1"], Stockwell: ["SW9"], Clapham: ["SW4"], Peckham: ["SE15"], "King's Cross": ["N1C", "WC1"], "London Bridge": ["SE1"], "Old Street": ["EC1"], "Liverpool Street": ["EC2"], Holborn: ["WC1", "WC2"], Cricklewood: ["NW2"], Harlesden: ["NW10"], Kingsbury: ["NW9"], "West Hampstead": ["NW6"], Eltham: ["SE9"], Plumstead: ["SE18"], Harrow: ["HA1", "HA2"], "South Tottenham": ["N15"],
  Tooting: ["SW17"], Erdington: ["B24"], Wembley: ["HA0"], Redbridge: ["IG4"], "Chadwell Heath": ["RM6"], Dagenham: ["RM8"], Greenford: ["UB6"],
};

export const postcodeAliases = { Plaistow: ["E13"] };
export const areaSlug = (area) => area.toLowerCase().replace(/['’]/g, "").replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export const postcodeDistrictFromValue = (value) => {
  const normalized = String(value || "").toUpperCase().replace(/\s/g, "");
  const completePostcode = normalized.match(/^([A-Z]{1,2}\d[A-Z]?\d[A-Z]{2})$/)?.[1];
  if (completePostcode) {
    const split = completePostcode.match(/^([A-Z]{1,2}\d{1,2}[A-Z]?)(\d[A-Z]{2})$/);
    if (split) return split[1];
  }
  const partialPostcode = normalized.match(/^([A-Z]{1,2}\d{1,2}[A-Z]?)(\d[A-Z])$/);
  if (partialPostcode) return partialPostcode[1];
  return normalized.match(/^([A-Z]{1,2}\d{1,2}[A-Z]?)$/)?.[1] || "";
};

export const areaNameForPostcode = (postcode) => {
  const normalizedPostcode = postcodeDistrictFromValue(postcode);
  if (!normalizedPostcode) return "";
  const alias = Object.entries(postcodeAliases).find(([, districts]) =>
    districts.some((district) => normalizedPostcode.startsWith(district))
  )?.[0];
  if (alias) return alias;

  const matches = Object.entries(postcodeByArea)
    .flatMap(([area, postcodes]) => postcodes
      .filter((district) => normalizedPostcode.startsWith(district))
      .map((district) => ({ area, district })))
    .sort((a, b) => b.district.length - a.district.length);
  return matches[0]?.area || normalizedPostcode;
};

export const postcodesForArea = (area) => postcodeByArea[area] || postcodeAliases[area] || [];
