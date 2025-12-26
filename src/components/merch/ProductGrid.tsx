'use client';

import ProductCard from './ProductCard';
import { Product } from '@/data/merch';

type Props = {
  products: Product[];
  onAdd: (product: Product) => void;
  onOpen: (product: Product) => void;
  // mobileLayout: 'two-col' will render two columns on the smallest screens for a compact mobile grid
  mobileLayout?: 'two-col' | 'single';
};

export default function ProductGrid({ products, onAdd, onOpen, mobileLayout = 'two-col' }: Props) {
  const baseCols = mobileLayout === 'two-col' ? 'grid-cols-2 sm:grid-cols-2' : 'grid-cols-1 sm:grid-cols-2';

  return (
    <div className={`grid ${baseCols} md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6 auto-rows-fr items-stretch justify-items-stretch`}>
      {products.map((p, i) => (
        <ProductCard key={p.id} product={p} onAdd={onAdd} onOpen={onOpen} index={i} />
      ))}
    </div>
  );
}
