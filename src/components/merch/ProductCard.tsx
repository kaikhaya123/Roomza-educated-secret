'use client';

import Image from 'next/image';
import { Product } from '@/data/merch';

type Props = {
  product: Product;
  onAdd: (product: Product) => void;
  onOpen: (product: Product) => void;
};

export default function ProductCard({ product, onAdd, onOpen }: Props) {
  return (
    <article className="group bg-white/[0.02] rounded-xl overflow-hidden border border-white/6 shadow-sm">
      <div className="relative overflow-hidden" style={{ aspectRatio: '1 / 1' }}>
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-contain bg-white/5 transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30" />
        <button
          type="button"
          onClick={() => onOpen(product)}
          className="absolute right-3 top-3 bg-black/40 text-white px-3 py-1 rounded-md text-sm"
        >
          View
        </button>
      </div>

      <div className="p-4 md:p-5">
        <h3 className="font-black text-lg text-white mb-1">{product.name}</h3>
        <p className="text-sm text-white/70 mb-4">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="font-semibold">R {(product.price / 100).toFixed(2)}</span>
          <button
            onClick={() => onAdd(product)}
            className="bg-brand-yellow text-black px-4 py-2 rounded font-semibold hover:bg-yellow-300 transition"
          >
            Add
          </button>
        </div>
      </div>
    </article>
  );
}
