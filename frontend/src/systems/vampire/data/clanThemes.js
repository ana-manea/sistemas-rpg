const watermarkBase = '/systems/vampire/watermarks';

export const clanThemeMap = {
  'Banu Haqim': {
    slug: 'banu-haqim',
    accent: '#7a1e22',
    soft: '#f3e5d4',
    watermark: `${watermarkBase}/banu-haqim.png`,
  },
  Brujah: {
    slug: 'brujah',
    accent: '#b42027',
    soft: '#f6dedc',
    watermark: `${watermarkBase}/brujah.png`,
  },
  Gangrel: {
    slug: 'gangrel',
    accent: '#5c3b22',
    soft: '#e9dfd0',
    watermark: `${watermarkBase}/gangrel.png`,
  },
  Hecata: {
    slug: 'hecata',
    accent: '#5e5367',
    soft: '#e9e5ee',
    watermark: `${watermarkBase}/hecata.png`,
  },
  Lasombra: {
    slug: 'lasombra',
    accent: '#241d35',
    soft: '#e6e3ee',
    watermark: `${watermarkBase}/lasombra.png`,
  },
  Malkaviano: {
    slug: 'malkavian',
    accent: '#6c2a7a',
    soft: '#eee2f4',
    watermark: `${watermarkBase}/malkavian.png`,
  },
  Malkavian: {
    slug: 'malkavian',
    accent: '#6c2a7a',
    soft: '#eee2f4',
    watermark: `${watermarkBase}/malkavian.png`,
  },
  Nosferatu: {
    slug: 'nosferatu',
    accent: '#384632',
    soft: '#e3eadf',
    watermark: `${watermarkBase}/nosferatu.png`,
  },
  Toreador: {
    slug: 'toreador',
    accent: '#b2295a',
    soft: '#f5dfe8',
    watermark: `${watermarkBase}/toreador.png`,
  },
  Tremere: {
    slug: 'tremere',
    accent: '#7d1021',
    soft: '#efdadd',
    watermark: `${watermarkBase}/tremere.png`,
  },
  Ventrue: {
    slug: 'ventrue',
    accent: '#263f73',
    soft: '#dde5f7',
    watermark: `${watermarkBase}/ventrue.png`,
  },
  Ravnos: {
    slug: 'ravnos',
    accent: '#a65b1f',
    soft: '#f4e3d1',
    watermark: `${watermarkBase}/ravnos.png`,
  },
  Salubri: {
    slug: 'salubri',
    accent: '#2f6f72',
    soft: '#ddedef',
    watermark: `${watermarkBase}/camarilla.png`,
  },
  Tzimisce: {
    slug: 'tzimisce',
    accent: '#6b1521',
    soft: '#eed9dd',
    watermark: `${watermarkBase}/tzimisce.png`,
  },
  Ministry: {
    slug: 'ministry',
    accent: '#9a6c13',
    soft: '#f3ead2',
    watermark: `${watermarkBase}/ministry.png`,
  },
  Caitiff: {
    slug: 'caitiff',
    accent: '#555555',
    soft: '#eeeeee',
    watermark: `${watermarkBase}/caitiff.png`,
  },
  'Sangue Fraco': {
    slug: 'thin-blood',
    accent: '#8d605f',
    soft: '#f1e4e2',
    watermark: `${watermarkBase}/thin-blood.png`,
  },
  Thinblood: {
    slug: 'thin-blood',
    accent: '#8d605f',
    soft: '#f1e4e2',
    watermark: `${watermarkBase}/thin-blood.png`,
  },
};

export const sectWatermarks = {
  camarilla: `${watermarkBase}/camarilla.png`,
  anarch: `${watermarkBase}/anarch.png`,
  sabbat: `${watermarkBase}/sabbat.png`,
};

export function getClanTheme(clan = '') {
  return clanThemeMap[clan] || {
    slug: 'default',
    accent: '#111111',
    soft: '#eef2ff',
    watermark: sectWatermarks.camarilla,
  };
}
