// Contentful Image API + named asset lookup helpers.
// - optimizedUrl: returns a webp, appropriately-sized variant (never the full-res original).
// - findAsset: looks up an asset by a substring of its title (no positional array indices),
//   so adding/reordering assets in Contentful cannot break an image.

export function optimizedUrl(asset, { w, h, q = 75, fit } = {}) {
  const url = asset?.fields?.file?.url;
  if (!url) return undefined;
  const params = new URLSearchParams({ fm: "webp", q: String(q) });
  if (w) params.set("w", String(w));
  if (h) params.set("h", String(h));
  if (fit) params.set("fit", fit);
  return `${url}?${params.toString()}`;
}

export function findAsset(assets, titleKey) {
  if (!Array.isArray(assets)) return undefined;
  const k = titleKey.toLowerCase();
  return assets.find((a) => a?.fields?.title?.toLowerCase().includes(k));
}

// Performance photos = every picture that is NOT a portrait/profile asset.
// Name-based so the music grid is robust to asset reordering.
export function performancePhotos(pictures) {
  if (!Array.isArray(pictures)) return [];
  const exclude = ["portrait", "profile", "headshot"];
  return pictures.filter(
    (p) =>
      p?.fields?.title &&
      !exclude.some((x) => p.fields.title.toLowerCase().includes(x))
  );
}
