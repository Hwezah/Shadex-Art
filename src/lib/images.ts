/**
 * Placeholder photography is served from Pexels (interiors, no people).
 * next/image handles resizing, so only the base URL is stored.
 * Replace with the client's own project photos when they are supplied.
 */
export const pexels = (id: number) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg`;
