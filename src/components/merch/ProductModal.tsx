'use client';

import Image from 'next/image';
import { Product } from '@/data/merch';

type Props = {
  product: Product | null;
  onClose: () => void;
  onAdd: (product: Product) => void;
};

export default function ProductModal({ product, onClose, onAdd }: Props) {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />

      <div className="relative z-10 max-w-4xl w-full bg-black rounded-xl overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="relative overflow-hidden" style={{ aspectRatio: '4 / 3' }}>
            <Image src={product.image} alt={product.name} fill className="object-contain bg-black/5" />
          </div>

          <div className="p-6 lg:p-8">
            <h3 className="text-2xl font-black mb-3">{product.name}</h3>
            <p className="text-white/70 mb-4">{product.description}</p>
            <p className="font-semibold text-lg mb-6">R {(product.price / 100).toFixed(2)}</p>

            <div className="flex items-center gap-4">
              <button
                onClick={() => onAdd(product)}
                className="bg-brand-yellow text-black px-4 py-2 rounded font-semibold hover:bg-yellow-300 transition"
              >
                Add to cart
              </button>

              <button onClick={onClose} className="text-white/70 underline">Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
