import React from 'react';
export default function DotInput({ label, value = 0, max = 5, onChange }) {
  return <label className="dot-row"><span>{label}</span><select value={value} onChange={e => onChange(Number(e.target.value))}>{Array.from({ length: max + 1 }, (_, i) => <option key={i} value={i}>{'●'.repeat(i)}{'○'.repeat(max - i)}</option>)}</select></label>;
}
