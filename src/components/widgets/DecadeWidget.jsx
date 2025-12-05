'use client'

const DECADES = [1950, 1960, 1970, 1980, 1990, 2000, 2010, 2020];

export default function DecadeWidget({ selectedDecades, onChange }) {
    const toggleDecade = (decade) => {
        if (selectedDecades.includes(decade)) {
            onChange(selectedDecades.filter(d => d !== decade));
        } else {
            onChange([...selectedDecades, decade].slice(0, 3));
        }
    };

    return (
        <div className="bbg-neutral-900 border border-neutral-800 rounded-x1 p-4 h-full">
            <h2 className="font-semibold mb-2">Décadas</h2>
            <div className="flex flex-wrap gap-2">
                {DECADES.map((decade) => {
                    const active = selectedDecades.includes(decade);
                    return (
                        <button
                            key={decade}
                            type="button"
                            onClick={() => toggleDecade(decade)}
                            className={`px-3 py-1 rounded-full text-xs ${
                                active 
                                ? 'bg-green-600 text-black'
                                : 'bg-neutral-800 hover:bg-neutral-700'
                            }`}
                        >
                            {decade}s
                        </button>
                    );
                })}
            </div>
        </div>
    );
}