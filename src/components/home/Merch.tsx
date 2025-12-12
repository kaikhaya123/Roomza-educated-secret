'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';

type Product = {
  id: string;
  title: string;
  price: string;
  img: string;
};

const products: Product[] = [
  {
    id: 'p1',
    title: 'R.E.S. Hoodie',
    price: 'R450',
    img: '/Images/ChatGPT Image Dec 4, 2025, 06_17_56 PM.png',
  },
  {
    id: 'p2',
    title: 'R.E.S. Cap',
    price: 'R150',
    img: '/Images/ChatGPT Image Dec 4, 2025, 06_27_22 PM.png',
  },
];

export default function Merch() {
  const [toasts, setToasts] = useState<Array<{ id: string; message: string }>>(
    []
  );

  function addToast(message: string) {
    const id = String(Date.now());
    setToasts((t) => [...t, { id, message }]);
    setTimeout(() => {
      setToasts((t) => t.filter((x) => x.id !== id));
    }, 1600);
  }

  function handleAdd(p: Product) {
    addToast(`${p.title} added to cart`);
    // wire cart logic here
  }

  return (
    <section className="bg-dark-bg-soft pt-24 pb-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-4xl font-black text-white">R.E.S. Merch</h2>
          <p className="text-gray-300 text-sm mt-3">
            Limited drops. Clean designs. Quality materials.
          </p>
        </motion.div>

        {/* Products grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {products.map((p, idx) => (
            <motion.article
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: idx * 0.08 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              className="group relative bg-white/3 rounded-2xl overflow-hidden p-4"
            >
              {/* image */}
              <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-gray-100">
                <motion.div
                  className="w-full h-full"
                  whileHover={{ scale: 1.04 }}
                  transition={{ duration: 0.5 }}
                >
                  <Image
                    src={p.img}
                    alt={p.title}
                    fill
                    className="object-cover"
                    quality={90}
                    priority={idx === 0}
                  />
                </motion.div>
              </div>

              {/* info */}
              <div className="mt-4 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white">{p.title}</h3>
                  <div className="text-sm font-semibold text-gray-300 mt-1">
                    {p.price}
                  </div>
                </div>

                <motion.button
                  onClick={() => handleAdd(p)}
                  whileTap={{ scale: 0.94 }}
                  className="inline-flex items-center gap-2 bg-brand-yellow text-black text-xs font-bold px-3 py-2 rounded-lg hover:bg-yellow-400 transition"
                >
                  <ShoppingCart size={14} />
                  Buy
                </motion.button>
              </div>
            </motion.article>
          ))}
        </div>

        {/* info row */}
        <div className="mt-8 text-center text-xs text-gray-400">
          <p>
            All prices shown include VAT. Shipping calculated at checkout. For
            bulk and sponsorship orders contact the team.
          </p>
        </div>

        {/* Toasts */}
        <div className="fixed right-6 bottom-6 z-50 flex flex-col gap-3">
          <AnimatePresence>
            {toasts.map((t) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 10, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.96 }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-lg border border-black/5 shadow px-4 py-2"
              >
                <p className="text-sm font-semibold text-gray-900">
                  {t.message}
                </p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
