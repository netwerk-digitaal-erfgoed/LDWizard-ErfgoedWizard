/**
 * Transforms a header into a valid part of an IRI
 * - Replaces spaces with underscores
 * @param headerName the name of the header
 * @returns the header as a valid part an IRI
 */
export function cleanHeaderName(headerName: string) {
  return headerName.replace(/ /g, "_");
}
