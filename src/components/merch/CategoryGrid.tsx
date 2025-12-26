'use client';

import Image from 'next/image';
import { Category } from '@/data/merch';
import useInView from '@/hooks/useInView';

type Props = {
  categories: Category[];
  selected?: string | null;
  onSelect: (id: string | null) => void;
  variant?: 'editorial' | 'minimal' | 'split' | 'rail' | 'responsive';
};

function CategoryTile({ category, active, onClick }: { category: Category; active?: boolean; onClick: () => void }) {
  const { ref, inView } = useInView<HTMLButtonElement>({ once: true, threshold: 0.2 });

  return (
    <button
      ref={ref as any}
      onClick={onClick}
      className={`relative rounded-none overflow-hidden border border-white/6 bg-white/[0.02] text-left p-0 focus:outline-none focus:ring-2 focus:ring-brand-yellow transition ${
        active ? 'ring-2 ring-brand-yellow' : ''
      } ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}
      aria-pressed={active}
      aria-label={`Filter by ${category.name}`}
    >
      <div className="relative w-full h-full" style={{ aspectRatio: '1 / 1' }}>
        {category.image && (
          <Image src={category.image} alt={category.name} fill className="object-cover" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30" />
        <div className="absolute left-4 bottom-4">
          <h3 className="font-black text-lg">{category.name}</h3>
          {category.description && <p className="text-sm text-white/70">{category.description}</p>}
        </div>
      </div>
    </button>
  );
}

export default function CategoryGrid({ categories, selected = null, onSelect, variant = 'responsive' }: Props) {
  // For responsive: editorial on lg, rail on small
  if (variant === 'minimal') {
    return (
      <div>
        <div className="flex gap-3 mb-4">
          <button
            onClick={() => onSelect(null)}
            className="px-3 py-1 rounded-none bg-white/5 hover:bg-white/10 text-sm font-semibold"
          >
            View all
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelect(selected === cat.id ? null : cat.id)}
              className={`aspect-square rounded-none bg-white/5 border border-white/10 hover:border-brand-yellow transition p-4 font-semibold text-left ${
                selected === cat.id ? 'ring-2 ring-brand-yellow' : ''
              }`}
            >
              <div className="h-full w-full relative overflow-hidden rounded-none">
                {cat.image && <Image src={cat.image} alt={cat.name} fill className="object-cover" />}
                <div className="absolute inset-0 bg-black/30" />
                <div className="absolute inset-0 flex items-end p-4">
                  <span className="font-black">{cat.name}</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (variant === 'split') {
    const left = categories[0];
    const right = categories.slice(1, 5);

    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-1">
          <h2 className="text-4xl font-black">Shop The Drop</h2>
          <p className="text-white/70 mt-4">Official show merchandise.</p>
          <div className="mt-6">
            <button
              onClick={() => onSelect(null)}
              className="rounded-none px-4 py-2 bg-white/5 hover:bg-white/10"
            >
              View all
            </button>
          </div>
        </div>
        <div className="lg:col-span-2 grid grid-cols-2 gap-6">
          {right.map((cat) => (
            <button key={cat.id} onClick={() => onSelect(selected === cat.id ? null : cat.id)} className="aspect-square rounded-none bg-white/5 overflow-hidden">
              <div className="relative w-full h-full">
                {cat.image && <Image src={cat.image} alt={cat.name} fill className="object-cover" />}
                <div className="absolute inset-0 bg-black/30" />
                <span className="absolute left-4 bottom-4 font-black">{cat.name}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (variant === 'rail') {
    return (
      <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4">
        <div className="snap-start min-w-[120px]">
          <button onClick={() => onSelect(null)} className="px-3 py-2 rounded-none bg-white/5 hover:bg-white/10">View all</button>
        </div>

        {categories.map((cat) => (
          <div key={cat.id} className="snap-start min-w-[260px]">
            <CategoryTile
              category={cat}
              active={selected === cat.id}
              onClick={() => onSelect(selected === cat.id ? null : cat.id)}
            />
          </div>
        ))}
      </div>
    );
  }

  // Default responsive: editorial on lg, horizontal rail on small
  const featured = categories.find((c) => c.featured) || categories[0];
  const small = categories.filter((c) => c.id !== featured?.id).slice(0, 4);

  return (
    <div>
      {/* mobile: featured + rail */}
      <div className="lg:hidden">
        {/* Mobile featured card */}
        <div className="mb-4 h-[320px] w-full overflow-hidden">
          <button
            onClick={() => onSelect(selected === featured?.id ? null : (featured?.id || null))}
            className="w-full h-full"
          >
            <div className="relative w-full h-full">
              {featured?.image && <Image src={featured.image} alt={featured.name} fill className="object-cover" />}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

              <div className="absolute left-4 bottom-4 max-w-[85%]">
                <h3 className="text-white text-3xl font-black leading-tight">{featured?.name}</h3>
                {featured?.description && <p className="text-white/80 mt-2">{featured.description}</p>}
              </div>
            </div>
          </button>
        </div>

        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4">
          {categories.map((cat) => (
            <div key={cat.id} className="snap-start min-w-[220px]">
              <CategoryTile category={cat} active={selected === cat.id} onClick={() => onSelect(selected === cat.id ? null : cat.id)} />
            </div>
          ))}
        </div>
      </div>

      {/* desktop: editorial */}
      <div className="hidden lg:grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 h-[420px] rounded-none overflow-hidden">
          <button onClick={() => onSelect(selected === featured?.id ? null : (featured?.id || null))} className="w-full h-full">
            <div className="relative w-full h-full">
              {featured?.image && <Image src={featured.image} alt={featured.name} fill className="object-cover" />}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

              <div className="absolute inset-0 flex items-end">
                <div className="p-6 md:p-10 max-w-2xl text-left">
                  <h3 className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight tracking-tight drop-shadow-lg">{featured?.name}</h3>
                  {featured?.description && (
                    <p className="text-white/80 mt-3 text-lg md:text-xl">{featured.description}</p>
                  )}
                </div>
              </div>
            </div>
          </button>
        </div>

        <div className="h-[420px] grid grid-rows-2 gap-6">
          {small.map((cat) => (
            <button key={cat.id} onClick={() => onSelect(selected === cat.id ? null : cat.id)} className="rounded-none overflow-hidden">
              <div className="relative w-full h-full">
                {cat.image && <Image src={cat.image} alt={cat.name} fill className="object-cover" />}
                <div className="absolute inset-0 bg-black/30" />
                <div className="absolute left-6 bottom-6">
                  <h4 className="text-white text-lg font-black">{cat.name}</h4>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
