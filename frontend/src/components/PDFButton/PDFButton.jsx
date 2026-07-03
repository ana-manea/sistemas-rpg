export default function PDFButton({ onClick, children = 'Baixar PDF' }) {
  return <button type="button" className="primary" onClick={onClick}>{children}</button>;
}
