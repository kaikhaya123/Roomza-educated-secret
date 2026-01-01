'use client';

import { useState, useEffect } from 'react';
import { useCart } from '@/context/cart';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { motion } from 'framer-motion';
import { ShieldCheck, Lock } from 'lucide-react';

export default function CheckoutPage() {
  const { items, clear } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    province: 'Gauteng',
    postalCode: '',
    shippingMethod: 'standard',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  });

  const cartEntries = items.map(item => ({
    item: item.product,
    size: item.size,
    quantity: item.qty,
  }));

  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.qty,
    0
  );

  const getShippingCost = () => {
    switch (formData.shippingMethod) {
      case 'courier-guy':
        return 85;
      case 'express':
        return 120;
      case 'standard':
      default:
        return 50;
    }
  };

  const shippingCost = getShippingCost();
  const total = subtotal + shippingCost;

  useEffect(() => {
    const emailInput = document.getElementById('email');
    emailInput?.focus();
  }, []);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 2000));
    clear();
    router.push('/checkout/success');
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-warm-stone-base via-warm-stone-base to-warm-stone-dark">
        <Navbar />
        <div className="flex items-center justify-center min-h-[calc(100vh-80px)] pt-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center px-6"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="mb-6"
            >
              <div className="w-24 h-24 mx-auto bg-amber-500/10 rounded-full flex items-center justify-center">
                <ShieldCheck className="w-12 h-12 text-amber-600" />
              </div>
            </motion.div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Looks like you haven't added any items to your cart yet. Explore our exclusive R.E.S. merchandise!
            </p>
            <Link
              href="/merch"
              className="inline-block bg-gradient-to-r from-amber-500 to-amber-600 text-white px-8 py-4 rounded-full font-semibold hover:from-amber-600 hover:to-amber-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Continue shopping
            </Link>
          </motion.div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-warm-stone-base via-warm-stone-base to-warm-stone-light">
      <Navbar />
      
      {/* Secure Checkout Banner */}
      <div className="bg-black text-white py-3 mt-20">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-center gap-2">
          <Lock className="w-4 h-4" />
          <span className="text-sm font-medium">Secure Checkout</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Checkout</h1>
          <p className="text-gray-600 mb-8">Complete your order and join the R.E.S. movement</p>
        </motion.div>

        {/* Layout */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Left Form */}
          <motion.form
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            onSubmit={handleSubmit}
            className="lg:col-span-7 space-y-6"
          >
            {/* Contact Section */}
            <section className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Contact Information</h2>
                <ShieldCheck className="w-5 h-5 text-green-600" />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all"
              />
            </section>

            {/* Delivery Section */}
            <section className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Delivery Address</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input
                  name="firstName"
                  placeholder="First name"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="input"
                />
                <input
                  name="lastName"
                  placeholder="Last name"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="input"
                />
              </div>

              <input
                name="address"
                placeholder="Street address"
                value={formData.address}
                onChange={handleChange}
                required
                className="input mb-4"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  className="input"
                />
                <input
                  name="postalCode"
                  placeholder="Postal code"
                  value={formData.postalCode}
                  onChange={handleChange}
                  required
                  className="input"
                />
              </div>
            </section>

            {/* Shipping Section */}
            <section className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Shipping Method</h2>

              <label className="shipping-option-with-bg">
                <div className="shipping-bg" style={{ backgroundImage: 'url(/Images/man-enjoying-some-takeaway-food_imgupscaler.ai_General_8K.jpg)' }}></div>
                <div className="shipping-content">
                  <input
                    type="radio"
                    name="shippingMethod"
                    value="standard"
                    checked={formData.shippingMethod === 'standard'}
                    onChange={handleChange}
                  />
                  <span>
                    <strong className="text-gray-900">Standard Shipping</strong>
                    <span className="text-gray-600">5–7 business days</span>
                  </span>
                  <span className="font-semibold text-gray-900">R50</span>
                </div>
              </label>

              <label className="shipping-option-with-bg">
                <div className="shipping-bg" style={{ backgroundImage: 'url(/Images/interracial-young-couple-with-many-shopping-bags-looking-camera.jpg)' }}></div>
                <div className="shipping-content">
                  <input
                    type="radio"
                    name="shippingMethod"
                    value="courier-guy"
                    checked={formData.shippingMethod === 'courier-guy'}
                    onChange={handleChange}
                  />
                  <span>
                    <strong className="text-gray-900">The Courier Guy</strong>
                    <span className="text-gray-600">3–4 business days • Tracking included</span>
                  </span>
                  <span className="font-semibold text-gray-900">R85</span>
                </div>
              </label>

              <label className="shipping-option-with-bg">
                <div className="shipping-bg" style={{ backgroundImage: 'url(/Images/playful-women-shopping-together.jpg)' }}></div>
                <div className="shipping-content">
                  <input
                    type="radio"
                    name="shippingMethod"
                    value="express"
                    checked={formData.shippingMethod === 'express'}
                    onChange={handleChange}
                  />
                  <span>
                    <strong className="text-gray-900">Express Shipping</strong>
                    <span className="text-gray-600">2–3 business days</span>
                  </span>
                  <span className="font-semibold text-gray-900">R120</span>
                </div>
              </label>
            </section>

            {/* Payment Section */}
            <section className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Payment Details</h2>

              <input
                name="cardNumber"
                placeholder="Card number"
                value={formData.cardNumber}
                onChange={handleChange}
                required
                maxLength={16}
                className="input mb-4"
              />

              <input
                name="cardName"
                placeholder="Name on card"
                value={formData.cardName}
                onChange={handleChange}
                required
                className="input mb-4"
              />

              <div className="grid grid-cols-2 gap-4">
                <input
                  name="expiryDate"
                  placeholder="MM/YY"
                  value={formData.expiryDate}
                  onChange={handleChange}
                  required
                  maxLength={5}
                  className="input"
                />
                <input
                  name="cvv"
                  placeholder="CVV"
                  value={formData.cvv}
                  onChange={handleChange}
                  required
                  maxLength={3}
                  className="input"
                />
              </div>
            </section>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white py-5 rounded-full text-lg font-bold hover:from-amber-600 hover:to-amber-700 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Processing...
                </span>
              ) : (
                `Complete Order • R${total}`
              )}
            </button>

            <p className="text-center text-sm text-gray-500 mt-4">
              By completing your order, you agree to our{' '}
              <Link href="/terms" className="text-amber-600 hover:underline">Terms of Service</Link>
              {' '}and{' '}
              <Link href="/privacy" className="text-amber-600 hover:underline">Privacy Policy</Link>
            </p>
          </motion.form>

          {/* Right Summary */}
          <motion.aside
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-5"
          >
            <div className="sticky top-32 bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h3>

              <div className="space-y-4 mb-6 max-h-[400px] overflow-y-auto pr-2">
                {cartEntries.map((entry, index) => (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    key={`${entry.item.id}-${entry.size}`}
                    className="flex items-center gap-4 pb-4 border-b border-gray-100 last:border-0"
                  >
                    <div className="relative w-20 h-20 rounded-xl overflow-hidden shadow-md">
                      <Image
                        src={entry.item.image}
                        alt={entry.item.name}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-1 right-1 bg-black text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
                        {entry.quantity}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 truncate">{entry.item.name}</p>
                      <p className="text-sm text-gray-600">
                        Size: {entry.size}
                      </p>
                      <p className="text-sm text-gray-500">
                        Qty: {entry.quantity}
                      </p>
                    </div>
                    <span className="font-bold text-gray-900">
                      R{entry.item.price * entry.quantity}
                    </span>
                  </motion.div>
                ))}
              </div>

              <div className="border-t border-gray-200 pt-4 space-y-3">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal</span>
                  <span className="font-semibold">R{subtotal}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Shipping</span>
                  <span className="font-semibold">R{shippingCost}</span>
                </div>
                <div className="flex justify-between items-center font-bold text-lg pt-3 border-t border-gray-200">
                  <span className="text-gray-900">Total</span>
                  <span className="text-amber-600">R{total}</span>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <ShieldCheck className="w-4 h-4 text-green-600" />
                    <span>Secure payment</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Lock className="w-4 h-4 text-green-600" />
                    <span>Encrypted</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.aside>
        </div>
      </div>

      <Footer />

      {/* Input Styles */}
      <style jsx>{`
        .input {
          width: 100%;
          padding: 16px;
          border-radius: 12px;
          border: 1px solid #d1d5db;
          outline: none;
          transition: all 0.3s;
        }

        .input:focus {
          border-color: #f59e0b;
          box-shadow: 0 0 0 3px rgba(245, 158, 11, 0.1);
        }

        /* Shipping option with background image */
        .shipping-option-with-bg {
          position: relative;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border: 2px solid #e5e7eb;
          border-radius: 16px;
          padding: 0;
          margin-bottom: 16px;
          cursor: pointer;
          transition: all 0.3s;
          overflow: hidden;
          min-height: 90px;
        }

        .shipping-bg {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-size: cover;
          background-position: center;
          opacity: 0.15;
          transition: all 0.3s;
          filter: grayscale(0.3);
        }

        .shipping-option-with-bg:hover .shipping-bg {
          opacity: 0.25;
          transform: scale(1.05);
          filter: grayscale(0);
        }

        .shipping-content {
          position: relative;
          z-index: 1;
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          padding: 20px;
          background: linear-gradient(to right, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.85));
        }

        .shipping-option-with-bg:hover {
          border-color: #f59e0b;
          box-shadow: 0 4px 12px rgba(245, 158, 11, 0.2);
        }

        .shipping-option-with-bg input[type='radio']:checked ~ .shipping-content,
        .shipping-content:has(input[type='radio']:checked) {
          background: linear-gradient(to right, rgba(255, 251, 235, 0.98), rgba(255, 251, 235, 0.95));
        }

        .shipping-content input[type='radio'] {
          width: 20px;
          height: 20px;
          accent-color: #f59e0b;
          cursor: pointer;
        }

        .shipping-content > span:nth-child(2) {
          display: flex;
          flex-direction: column;
          gap: 4px;
          flex: 1;
          margin-left: 16px;
          margin-right: 16px;
        }

        .shipping-content span span {
          font-size: 14px;
          color: #6b7280;
        }

        .shipping-content > span:last-child {
          font-weight: 600;
          font-size: 18px;
        }

        /* Old shipping option styles (keeping for compatibility) */
        .shipping-option {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border: 2px solid #e5e7eb;
          border-radius: 16px;
          padding: 16px;
          margin-bottom: 12px;
          cursor: pointer;
          transition: all 0.3s;
        }

        .shipping-option:hover {
          border-color: #f59e0b;
          background-color: #fffbeb;
        }

        .shipping-option input[type='radio']:checked + span + span,
        .shipping-option input[type='radio']:checked ~ span {
          color: #f59e0b;
        }

        .shipping-option input[type='radio'] {
          width: 20px;
          height: 20px;
          accent-color: #f59e0b;
        }

        .shipping-option span {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .shipping-option span span {
          font-size: 14px;
          color: #6b7280;
        }

        /* Custom scrollbar for order summary */
        .overflow-y-auto::-webkit-scrollbar {
          width: 6px;
        }

        .overflow-y-auto::-webkit-scrollbar-track {
          background: #f3f4f6;
          border-radius: 10px;
        }

        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: #d1d5db;
          border-radius: 10px;
        }

        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: #9ca3af;
        }
      `}</style>
    </div>
  );
}
