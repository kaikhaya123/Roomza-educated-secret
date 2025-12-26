'use client';

import { useState } from 'react';
import Image from 'next/image';
import HoverReveal from '@/components/merch/HoverReveal';
import Navbar from '@/components/layout/Navbar';
import ProductGrid from '@/components/merch/ProductGrid';
import ProductModal from '@/components/merch/ProductModal';
import CategoryGrid from '@/components/merch/CategoryGrid';
import { products, categories } from '@/data/merch';
import { useCart } from '@/context/cart';

type CartItem = { productId: string; qty: number };

export default function MerchPage() {
  const [openProduct, setOpenProduct] = useState<number | null>(null);
  const { add } = useCart();

  const onAdd = (product: any) => {
    add(product);
  };

  const onOpen = (product: any) => {
    const idx = products.findIndex((p) => p.id === product.id);
    setOpenProduct(idx);
  };

  const open = openProduct !== null ? products[openProduct] : null;
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filtered = selectedCategory ? products.filter((p) => p.category === selectedCategory) : products;

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <section className="relative h-screen min-h-[640px] overflow-hidden">
  <HoverReveal
    frontSrc="/Images/antoine-transon-3CIN7OxIABo-unsplash.jpg"
    backSrc="/Images/attractive-brunette-curly-woman-purple-hoodie-pink-sunglasses-smiles-sincerely-rejoices-takes-selfie-outside-min.jpg"
    alt="Merch hero"
    className="absolute inset-0"
    circles={[
      { x: 66, y: 44, delay: 0, radius: 96 },
      { x: 32, y: 68, delay: 0.14, radius: 86 }
    ]}
    duration={0.95}
    startRadius={0}
    endRadius={110}
    size="cover"
  >
    {/* contrast vignette + gradient */}
    <div className="absolute inset-0 z-20 pointer-events-none">
      <div className="absolute left-0 right-0 bottom-0 h-72 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
    </div>

    {/* big low-aligned headline inspired by the reference */}
    <div className="relative z-30 h-full flex items-end">
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-12 pb-24">
        <h1 className="leading-[0.86] font-black tracking-tight text-brand-yellow drop-shadow-[0_12px_30px_rgba(0,0,0,0.6)]">
          <span className="block text-[3.25rem] md:text-[5.5rem] lg:text-[7.25rem]">Roomza’s</span>
          <span className="block text-[2.75rem] md:text-[4.75rem] lg:text-[6.25rem] font-extrabold italic">Educated Wear</span>
        </h1>
      </div>
    </div>



    {/* soft overlay for image depth */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10 pointer-events-none" />
  </HoverReveal>
</section>

      <main className="py-20 px-6 lg:px-12 max-w-6xl mx-auto" id="products">
        <h2 className="text-3xl md:text-4xl font-black mb-6">Featured items</h2>

        <CategoryGrid categories={categories} selected={selectedCategory} onSelect={(id) => setSelectedCategory(id)} />

        <div className="mt-6 mb-6 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">{selectedCategory ? categories.find((c) => c.id === selectedCategory)?.name : 'All items'}</h3>
            {selectedCategory && (
              <p className="text-sm text-white/60">Showing items for {categories.find((c) => c.id === selectedCategory)?.name}</p>
            )}
          </div>

          {selectedCategory && (
            <button onClick={() => setSelectedCategory(null)} className="px-3 py-2 rounded-none bg-white/5 hover:bg-white/10">Clear filter</button>
          )}
        </div>

        <div className="mt-8">
          <ProductGrid products={filtered} onAdd={onAdd} onOpen={(p) => onOpen(p)} />
        </div>
      </main>

      <ProductModal product={open} onClose={() => setOpenProduct(null)} onAdd={(p) => { onAdd(p); setOpenProduct(null); }} />

      {/* Site-wide cart drawer renders from Navbar via context */}
    </div>
  );
}
