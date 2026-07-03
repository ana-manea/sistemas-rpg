import { ensureFullCharacter } from './characterSchema.js';

function cleanText(value = '') {
  return String(value ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '') || 'ficha';
}

export const characterPdfTemplates = {
  vampire: [
    {
      id: 'site-view',
      name: 'Ficha igual ao site',
      description: 'Baixa a ficha com a mesma aparência da visualização web, mantendo tema e marca d\'água do clã.',
      mode: 'html-print',
    },
  ],
  dnd: [
    {
      id: 'site-view',
      name: 'Ficha igual ao site',
      description: 'Baixa a ficha com a mesma aparência da visualização web.',
      mode: 'html-print',
    },
  ],
};

export function getDefaultTemplate(system = 'vampire') {
  return characterPdfTemplates[system]?.[0] || characterPdfTemplates.vampire[0];
}

function collectStyles() {
  const inlineStyles = Array.from(document.querySelectorAll('style'))
    .map(style => style.innerHTML)
    .join('\n');

  const linkedStyles = Array.from(document.querySelectorAll('link[rel="stylesheet"]'))
    .map(link => `<link rel="stylesheet" href="${link.href}">`)
    .join('\n');

  return { inlineStyles, linkedStyles };
}

export async function downloadCharacterPdf(character, template = null, options = {}) {
  const c = ensureFullCharacter(character || {}, character?.system || 'vampire');
  const source = document.getElementById(options.elementId || 'character-sheet-printable');

  if (!source) {
    window.print();
    return;
  }

  const { inlineStyles, linkedStyles } = collectStyles();
  const printWindow = window.open('', '_blank', 'width=980,height=1200');
  if (!printWindow) {
    window.print();
    return;
  }

  const clone = source.cloneNode(true);
  clone.querySelectorAll('.no-print, .pdf-template-panel, .sheet-actions-inline').forEach(node => node.remove());

  const fileName = `${cleanText(c.name || 'ficha')}-${cleanText(c.system || 'rpg')}.pdf`;

  printWindow.document.write(`<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${fileName}</title>
  ${linkedStyles}
  <style>${inlineStyles}</style>
  <style>
    html, body { margin: 0; background: #ffffff !important; }
    body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    .print-shell { padding: 0; background: #ffffff; }
    .official-character-view { max-width: none !important; margin: 0 !important; border-radius: 0 !important; box-shadow: none !important; }
    .no-print, .site-header, .app-navbar, nav, footer { display: none !important; }
    @page { size: A4; margin: 10mm; }
    @media print {
      body { background: #ffffff !important; }
      .official-character-view { border: 0 !important; width: 100% !important; }
      .sheet-view-section, .character-view-header { break-inside: avoid; page-break-inside: avoid; }
      .print-page-break { break-before: page; page-break-before: always; }
    }
  </style>
</head>
<body>
  <main class="print-shell">${clone.outerHTML}</main>
  <script>
    window.addEventListener('load', () => {
      setTimeout(() => { window.print(); }, 350);
    });
  <\/script>
</body>
</html>`);
  printWindow.document.close();
}
