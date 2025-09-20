'use client';
import { useMemo } from 'react';
import { useCustomizerStore, DEMO_CATALOG } from '../store/CustomizerStore';   

export default function Customizer() {
  const {
    boxSize, setBoxSize,
    mode, setMode,
    added, addModule, removeModule, clearModules,
    tools, addToolRow, updateTool, removeTool,
    used, free, subtotal,
  } = useCustomizerStore();

  const palette = useMemo(
    () => DEMO_CATALOG.filter(m => m.fits.includes(boxSize)),
    [boxSize]
  );

  return (
    <div className="w-full h-full flex flex-col py-8 md:py-10 px-5 md:px-8">
      {/* Title */}
      <h2 className="hidden sm:block text-2xl md:text-3xl font-semibold tracking-wide uppercase text-black/90 mb-4 relative">
        ORDO Configurator
        <span className="absolute left-0 -bottom-2 h-[2px] w-20 bg-accent-red" />
      </h2>

      {/* Space meter */}
      <div className="flex items-center gap-2 mb-3" role="status" aria-live="polite">
        <span className="px-2 py-1 text-xs rounded bg-black text-white">Used: {used()}</span>
        <span className="px-2 py-1 text-xs rounded border border-black/10 bg-white">Free: {free()}</span>
      </div>

      {/* Scrollable content */}
      <div className="mt-1 flex-1 min-h-0 overflow-y-auto pr-1 flex flex-col gap-3" style={{ WebkitOverflowScrolling: 'touch' }}>
        {/* Box size */}
        <section className="rounded-2xl border border-black/10 bg-white p-4">
          <div className="text-sm font-medium mb-2">Box</div>
          <div className="flex gap-2">
            {['S','M','L'].map(sz => (
              <button
                key={sz}
                onClick={() => setBoxSize(sz)}
                className={`px-3 py-1 text-sm rounded-full border ${boxSize===sz ? 'bg-black text-white' : 'bg-white'}`}
              >
                {sz === 'S' ? 'Small (16)' : sz === 'M' ? 'Medium (24)' : 'Large (32)'}
              </button>
            ))}
          </div>
          <button className="mt-3 text-xs underline opacity-70" onClick={clearModules}>Clear modules</button>
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

        {/* Smart: simple tools form */}
        {mode === 'smart' && (
          <section className="rounded-2xl border border-black/10 bg-white p-4">
            <div className="text-sm font-medium mb-2">Smart Tools</div>
            <div className="flex flex-col gap-2">
              {tools.map((t, i) => (
                <div key={i} className="flex items-center gap-2">
                  <select
                    value={t.toolType}
                    onChange={(e)=>useCustomizerStore.getState().updateTool(i, { toolType: e.target.value })}
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
                    onChange={(e)=>useCustomizerStore.getState().updateTool(i, { quantity: Number(e.target.value) })}
                    className="w-20 border rounded px-2 py-1 text-sm"
                  />
                  <button className="px-2 py-1 text-xs rounded border" onClick={()=>removeTool(i)}>Remove</button>
                </div>
              ))}
              <button className="px-2 py-1 text-xs rounded border w-fit" onClick={addToolRow}>+ Add Tool</button>

              <button className="mt-2 px-3 py-2 text-sm rounded bg-black text-white" onClick={()=>alert('Smart placement will come later')}>
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
          <div className="text-xs mt-2 opacity-70">Subtotal ~ €{subtotal()}</div>
          <button className="inline-block mt-2 px-3 py-2 text-sm rounded bg-accent-red text-white" onClick={()=>alert('Checkout link will be wired later')}>
            Push to Cart
          </button>
        </section>
      </div>
    </div>
  );
}
