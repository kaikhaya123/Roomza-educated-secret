'use client';

import Image from 'next/image';
import { Product } from '@/data/merch';

type Props = {
  product: Product;
  onAdd: (product: Product) => void;
  onOpen: (product: Product) => void;
  index?: number;
};

import useInView from '@/hooks/useInView';

export default function ProductCard({ product, onAdd, onOpen, index = 0 }: Props) {
  const { ref, inView } = useInView<HTMLElement>({ once: true, threshold: 0.12 });

  return (
    <article
      ref={ref as any}
      className={`group bg-white/[0.02] rounded-none overflow-hidden border border-white/6 shadow-sm cursor-pointer transform hover:-translate-y-1 hover:shadow-lg transition-all duration-300 h-full flex flex-col`}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(18px)',
        transitionDelay: `${Math.min(index * 65, 350)}ms`,
      }}
    >
      {/* Image */}
      <div
        className="relative overflow-hidden bg-white/5 rounded-none flex-shrink-0 p-6 md:p-0"
        style={{ aspectRatio: '3 / 4' }}
        onClick={() => onOpen(product)}
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-contain md:object-cover transition-transform duration-700 md:group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 25vw"
        />



        {/* Quick add / stock indicator */}
        <div className="absolute right-3 bottom-3">
          <button
            onClick={(e) => { e.stopPropagation(); onAdd(product); }}
            disabled={product.stock === 0}
            aria-disabled={product.stock === 0}
            className={`bg-brand-yellow text-black px-3 py-1 rounded-none text-sm font-semibold shadow ${product.stock === 0 ? 'opacity-40 cursor-not-allowed' : ''}`}
          >
            Quick add
          </button>
        </div>
      </div>

      {/* Info block */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-white font-semibold text-base md:text-lg leading-tight">{product.name}</h3>

          {/* moved category label directly under title */}
          {product.category && (
            <div className="mt-2">
              <span className="text-xs uppercase tracking-wider text-white/80 bg-white/5 px-2 py-1">{product.category}</span>
            </div>
          )}

          {/* SKU metadata */}
          <div className="mt-2 text-white/60 text-xs">SKU: <span className="text-white/80">{product.id}</span></div>

          {/* Description: clamp on small, full on md+ */}
          <p className="text-white/70 text-sm mt-3">{product.description}</p>

          <div className="mt-3 flex items-center gap-4 flex-wrap">
            {product.sizes && (
              <div className="text-white/60 text-sm">Sizes: <span className="text-white/80">{product.sizes.join(', ')}</span></div>
            )}
            <div className={`text-sm font-medium ${product.stock && product.stock > 0 ? 'text-white/90' : 'text-red-400'}`}>
              {product.stock && product.stock > 0 ? `In stock ${product.stock}` : 'Out of stock'}
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-white font-bold text-lg">R {(product.price / 100).toFixed(2)}</span>

          <div className="flex items-center gap-3">
            <button
              onClick={(e) => { e.stopPropagation(); onAdd(product); }}
              disabled={product.stock === 0}
              aria-disabled={product.stock === 0}
              className={`bg-brand-yellow text-black px-3 py-1 rounded-none text-sm font-semibold hover:bg-yellow-300 transition ${product.stock === 0 ? 'opacity-40 cursor-not-allowed' : ''}`}
            >
              Add
            </button>

            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); onOpen(product); }}
              className="border border-white/10 px-3 py-1 rounded-none text-white text-sm hover:bg-white/5 transition"
            >
              View
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
