export default function DotInput({ label, value = 0, max = 5, onChange }) {
  if (max > 10) {
    return <label className="dot-row numeric-dot-row"><span>{label}</span><input type="number" min="0" max={max} value={value || 0} onChange={e => onChange(Number(e.target.value))} /></label>;
  }
  return <label className="dot-row"><span>{label}</span><select value={value} onChange={e => onChange(Number(e.target.value))}>{Array.from({ length: max + 1 }, (_, i) => <option key={i} value={i}>{'●'.repeat(i)}{'○'.repeat(max - i)}</option>)}</select></label>;
}
