export function ts(): string {
  return new Date().toISOString().replace(/[:.]/g, '-');
}

export function base(name: string): string {
  return name.replace(/\.[^.]+$/, '');
}

export const names = {
  compress: (orig: string, quality: 'light' | 'medium' | 'strong') => 
    `${base(orig)}_compressed_${quality}.pdf`,
  compressImage: (orig: string, quality: 'light' | 'medium' | 'strong', format: string) => 
    `${base(orig)}_compressed_${quality}.${format}`,
  merge: () => 
    `${ts()}_merged.pdf`,
  splitZip: (orig: string, ranges: string) => 
    `${base(orig)}_pages_${ranges.replace(/\s+/g, '')}.zip`,
  imgToPdf: (bundle: boolean, count: number) => 
    bundle ? `${ts()}_images_${count}.pdf` : `${ts()}_image.pdf`,
  pdfToImages: (orig: string, page: number, ext: 'png' | 'jpg') => 
    `${base(orig)}_page_${page}.${ext}`,
  organize: (orig: string) => 
    `${base(orig)}_organized.pdf`,
  watermark: (orig: string) => 
    `${base(orig)}_watermarked.pdf`,
  pagenum: (orig: string) => 
    `${base(orig)}_pagenum.pdf`,
  sign: (orig: string) => 
    `${base(orig)}_signed.pdf`,
} as const;
