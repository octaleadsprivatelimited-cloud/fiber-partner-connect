// Compress an image File client-side using canvas.
// Returns a data URL (jpeg/png) sized to fit within maxSize px on the longest edge.
export async function compressImage(
  file: File,
  opts: { maxSize?: number; quality?: number; mimeType?: string } = {}
): Promise<string> {
  const maxSize = opts.maxSize ?? 1200;
  const quality = opts.quality ?? 0.8;
  // Keep PNG transparency when source is png/webp, otherwise use jpeg.
  const isTransparent = /png|webp/i.test(file.type);
  const mimeType = opts.mimeType ?? (isTransparent ? "image/png" : "image/jpeg");

  const dataUrl = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

  const img = await new Promise<HTMLImageElement>((resolve, reject) => {
    const i = new Image();
    i.onload = () => resolve(i);
    i.onerror = reject;
    i.src = dataUrl;
  });

  let { width, height } = img;
  if (width > maxSize || height > maxSize) {
    if (width >= height) {
      height = Math.round((height * maxSize) / width);
      width = maxSize;
    } else {
      width = Math.round((width * maxSize) / height);
      height = maxSize;
    }
  }

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return dataUrl;
  ctx.drawImage(img, 0, 0, width, height);
  return canvas.toDataURL(mimeType, quality);
}

/**
 * "Compress" a PDF for client-side storage. We can't truly recompress PDF
 * streams in the browser without a heavy library, but we:
 *  - reject files over a hard upper limit,
 *  - return the file as a data URL (base64) ready to embed/download,
 *  - report the resulting size so the UI can warn for large files.
 *
 * If a hosted Storage bucket is available the caller can swap the data URL
 * for a download URL — the format is identical to how compressImage returns.
 */
export async function compressPdf(
  file: File,
  opts: { maxBytes?: number } = {}
): Promise<{ dataUrl: string; size: number }> {
  const maxBytes = opts.maxBytes ?? 10 * 1024 * 1024; // 10 MB hard cap
  if (!/pdf$/i.test(file.type) && !/\.pdf$/i.test(file.name)) {
    throw new Error("Please upload a PDF file.");
  }
  if (file.size > maxBytes) {
    throw new Error(`PDF is too large (${(file.size / 1024 / 1024).toFixed(1)} MB). Please keep brochures under ${(maxBytes / 1024 / 1024).toFixed(0)} MB.`);
  }
  const dataUrl = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
  return { dataUrl, size: file.size };
}
