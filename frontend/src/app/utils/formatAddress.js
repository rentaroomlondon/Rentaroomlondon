// Removes the door / flat number from the start of an address for public display.
// "9 Kennylands Court Hendon Way" -> "Kennylands Court Hendon Way"
// "Flat 3, 28B Babington Road"    -> "Babington Road"
export const hideDoorNumber = (address = "") =>
  String(address || "")
    .replace(/^\s*(flat|apartment|apt\.?|unit|room)\s*[a-z0-9]+\s*,?\s*/i, "")
    .replace(/^\s*\d+[a-z]?(\s*[-–/]\s*\d+[a-z]?)?\b\s*,?\s*/i, "")
    .trim();
