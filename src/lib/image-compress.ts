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
