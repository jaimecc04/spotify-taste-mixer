'use client'

const OPTIONS = [
    { id: 'underground', label: 'Underground (0-50)', range: [0, 50] },
    { id: 'popular', label: 'Popular (50-80)', range: [50, 80] },
    { id: 'mainstream', label: 'Mainstream (80-100)', range: [80, 100] },
];

export default function PopularityWidget({ popularityRange, onChange }) {
    const currentId = 
        OPTIONS.find(option => 
            option.range[0] === popularityRange[0] && option.range[1] === popularityRange[1]
        )?.id ?? 'medium';

    const handleSelect = (option) => {
        onChange(option.range);
    };

    return (
        <div className="bbg-neutral-900 border border-neutral-800 rounded-x1 p-4 h-full">
            <h2 className="font-semibold mb-2">Popularidad</h2>
            <div className="space-y-2">
                {OPTIONS.map((option) => (
                    <button
                        key={option.id}
                        type="button"
                        onClick={() => handleSelect(option)}
                        className={`w-full text-left text-xs px-3 py-2 rounded ${
                            currentId === option.id
                            ? 'bg-green-600 text-black'
                            : 'bg-neutral-800 hover:bg-neutral-700'
                        }`}
                    >
                        {option.label}
                    </button>
                ))}
            </div>
        </div>
    );
}