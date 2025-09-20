'use client';
import { useMemo, useState } from 'react';

const DEMO_CATALOG = [
  { sku: 'MOD-1x1', name: '1×1 Module', size: '1×1', fits: ['S','M','L'], price: 19 },
  { sku: 'MOD-1x2', name: '1×2 Module', size: '1×2', fits: ['M','L'],    price: 29 },
  { sku: 'MOD-2x2', name: '2×2 Module', size: '2×2', fits: ['L'],        price: 49 },
];

export default function Customizer() {
  const [boxSize, setBoxSize] = useState('S');            // 'S' | 'M' | 'L'
  const [mode, setMode] = useState('manual');             // 'manual' | 'smart'
  const [added, setAdded] = useState({});                 // { sku: qty }
  const [tools, setTools] = useState([{ toolType: 'knife', quantity: 6 }]);

  const boxCubes = { S: 16, M: 24, L: 32 }[boxSize];
  const palette = useMemo(
    () => DEMO_CATALOG.filter(m => m.fits.includes(boxSize)),
    [boxSize]
  );

  const used = useMemo(
    () => Object.entries(added).reduce((sum, [sku, qty]) => {
      const mod = DEMO_CATALOG.find(m => m.sku === sku);
      if (!mod) return sum;
      const [w, h] = mod.size.split('×').map(Number);
      return sum + (w * h) * qty;
    }, 0),
    [added]
  );

  const free = boxCubes - used;

  const addModule = (sku) =>
    setAdded(prev => ({ ...prev, [sku]: (prev[sku] || 0) + 1 }));

  const removeModule = (sku) =>
    setAdded(prev => {
      const next = { ...prev };
      if (!next[sku]) return prev;
      next[sku] -= 1;
      if (next[sku] <= 0) delete next[sku];
      return next;
    });

  const clearAll = () => setAdded({});

  const addToolRow = () => setTools(t => [...t, { toolType: 'knife', quantity: 1 }]);
  const updateTool = (i, patch) => setTools(ts => ts.map((t, idx) => idx === i ? { ...t, ...patch } : t));
  const removeTool = (i) => setTools(ts => ts.filter((_, idx) => idx !== i));

  const subtotal = Object.entries(added).reduce((sum, [sku, qty]) => {
    const mod = DEMO_CATALOG.find(m => m.sku === sku);
    return sum + (mod?.price || 0) * qty;
  }, 0);

  return (
    <div className="w-full max-h-screen py-8 md:py-10 px-5 md:px-8 flex flex-col">
      {/* Title */}
      <h2 className="hidden sm:block text-2xl md:text-3xl font-semibold tracking-wide uppercase text-black/90 mb-6 relative">
        ORDO Configurator
        <span className="absolute left-0 -bottom-2 h-[2px] w-20 bg-accent-red" />
      </h2>

      {/* Space meter */}
      <div className="flex items-center gap-2 mb-3" role="status" aria-live="polite">
        <span className="px-2 py-1 text-xs rounded bg-black text-white">Used: {used}</span>
        <span className="px-2 py-1 text-xs rounded border border-black/10 bg-white">Free: {free}</span>
      </div>

      <div className="w-full md:max-h-[70vh] max-h-[35vh] overflow-y-auto pr-1 flex flex-col gap-3">
        {/* Box size */}
        <section className="rounded-2xl border border-black/10 bg-white p-4">
          <div className="text-sm font-medium mb-2">Box</div>
          <div className="flex gap-2">
            {['S','M','L'].map(sz => (
              <button
                key={sz}
                onClick={() => { setBoxSize(sz); clearAll(); }}
                className={`px-3 py-1 text-sm rounded-full border ${boxSize===sz ? 'bg-black text-white' : 'bg-white'}`}
              >
                {sz === 'S' ? 'Small (16)' : sz === 'M' ? 'Medium (24)' : 'Large (32)'}
              </button>
            ))}
          </div>
          <button className="mt-3 text-xs underline opacity-70" onClick={clearAll}>Clear modules</button>
        </section>

        {/* Mode */}
        <section className="rounded-2xl border border-black/10 bg-white p-4">
          <div className="text-sm font-medium mb-2">Mode</div>
          <div className="inline-flex rounded-lg overflow-hidden border">
            <button
              onClick={() => setMode('manual')}
              className={`px-3 py-1 text-sm ${mode==='manual' ? 'bg-black text-white' : 'bg-white'}`}
            >
              Manual
            </button>
            <button
              onClick={() => setMode('smart')}
              className={`px-3 py-1 text-sm ${mode==='smart' ? 'bg-black text-white' : 'bg-white'}`}
            >
              Smart
            </button>
          </div>
        </section>

        {/* Manual: Palette */}
        {mode === 'manual' && (
          <section className="rounded-2xl border border-black/10 bg-white p-4">
            <div className="text-sm font-medium mb-2">Palette</div>
            <p className="text-xs text-black/60 mb-3">Click “Add” to include modules (drag-grid comes later).</p>
            <div className="grid grid-cols-1 gap-2">
              {palette.map(m => (
                <div key={m.sku} className="flex items-center justify-between rounded-lg border px-3 py-2">
                  <div>
                    <div className="text-sm font-medium">{m.name}</div>
                    <div className="text-[11px] opacity-60">{m.size} · €{m.price}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="px-2 py-1 text-xs rounded bg-black text-white" onClick={() => addModule(m.sku)}>Add</button>
                    {added[m.sku] ? (
                      <button className="px-2 py-1 text-xs rounded border" onClick={() => removeModule(m.sku)}>
                        − {added[m.sku]}
                      </button>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Smart: simple tools form (no logic yet) */}
        {mode === 'smart' && (
          <section className="rounded-2xl border border-black/10 bg-white p-4">
            <div className="text-sm font-medium mb-2">Smart Tools</div>
            <div className="flex flex-col gap-2">
              {tools.map((t, i) => (
                <div key={i} className="flex items-center gap-2">
                  <select
                    value={t.toolType}
                    onChange={(e)=>updateTool(i, { toolType: e.target.value })}
                    className="border rounded px-2 py-1 text-sm"
                  >
                    <option value="knife">Knife</option>
                    <option value="spoon">Spoon</option>
                    <option value="ladle">Ladle</option>
                  </select>
                  <input
                    type="number"
                    min={0}
                    value={t.quantity}
                    onChange={(e)=>updateTool(i, { quantity: Number(e.target.value) })}
                    className="w-20 border rounded px-2 py-1 text-sm"
                  />
                  <button className="px-2 py-1 text-xs rounded border" onClick={()=>removeTool(i)}>Remove</button>
                </div>
              ))}
              <button className="px-2 py-1 text-xs rounded border w-fit" onClick={addToolRow}>+ Add Tool</button>

              <button
                className="mt-2 px-3 py-2 text-sm rounded bg-black text-white"
                onClick={()=>alert('Smart placement will come later')}
              >
                Generate Suggestion
              </button>
            </div>
          </section>
        )}

        {/* Overview */}
        <section className="rounded-2xl border border-black/10 bg-white p-4">
          <div className="text-sm font-medium mb-2">Overview</div>
          {Object.keys(added).length === 0 ? (
            <p className="text-xs text-black/60">No modules yet.</p>
          ) : (
            <ul className="pl-4 list-disc text-xs">
              {Object.entries(added).map(([sku, qty]) => {
                const mod = DEMO_CATALOG.find(m => m.sku === sku);
                return <li key={sku}>{sku} · {mod?.name} × {qty}</li>;
              })}
            </ul>
          )}
          <div className="text-xs mt-2 opacity-70">Subtotal ~ €{subtotal}</div>
          <button
            className="inline-block mt-2 px-3 py-2 text-sm rounded bg-accent-red text-white"
            onClick={()=>alert('Checkout link will be wired later')}
          >
            Push to Cart
          </button>
        </section>
      </div>
    </div>
  );
}
