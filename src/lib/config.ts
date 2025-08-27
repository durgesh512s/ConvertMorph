export type AppConfig = {
  siteUrl: string;
  maxFileSizeMb: number;
  maxPages: number;
  allowedMimes: string[];
  jobTimeoutMs: number;
}

const toNum = (v: string|undefined, d: number) => {
  const n = Number(v); return Number.isFinite(n) ? n : d;
};

export function getAppConfig(): AppConfig {
  return {
    siteUrl: process.env.SITE_URL || 'http://localhost:3000',
    maxFileSizeMb: toNum(process.env.MAX_FILE_SIZE_MB, 100),
    maxPages: toNum(process.env.MAX_PAGES, 200),
    allowedMimes: (process.env.ALLOWED_MIMES || 'application/pdf,image/jpeg,image/png').split(','),
    jobTimeoutMs: toNum(process.env.JOB_TIMEOUT_MS, 90000),
  };
}
