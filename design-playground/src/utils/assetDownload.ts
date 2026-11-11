function triggerBrowserDownload(blob: Blob, fileName: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.setTimeout(() => URL.revokeObjectURL(url), 1500);
}

export function downloadTextFile(text: string, fileBaseName: string, extension = 'txt') {
  const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
  triggerBrowserDownload(blob, `${fileBaseName}.${extension}`);
}

export function downloadSvgFile(svgMarkup: string, fileBaseName: string) {
  const normalized = svgMarkup.includes('xmlns=')
    ? svgMarkup
    : svgMarkup.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"');
  const blob = new Blob([normalized], { type: 'image/svg+xml;charset=utf-8' });
  triggerBrowserDownload(blob, `${fileBaseName}.svg`);
}

export async function downloadPngFromSvg(
  svgMarkup: string,
  fileBaseName: string,
  width = 1200,
  height = 1200
): Promise<void> {
  const normalized = svgMarkup.includes('xmlns=')
    ? svgMarkup
    : svgMarkup.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"');
  const svgBlob = new Blob([normalized], { type: 'image/svg+xml;charset=utf-8' });
  const svgUrl = URL.createObjectURL(svgBlob);

  try {
    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = (err) => reject(err);
      image.src = svgUrl;
    });

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      throw new Error('Unable to acquire 2D canvas context for PNG export.');
    }

    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(img, 0, 0, width, height);

    const pngBlob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          if (blob) resolve(blob);
          else reject(new Error('Canvas PNG export returned null blob.'));
        },
        'image/png',
        1.0
      );
    });

    triggerBrowserDownload(pngBlob, `${fileBaseName}.png`);
  } finally {
    URL.revokeObjectURL(svgUrl);
  }
}

