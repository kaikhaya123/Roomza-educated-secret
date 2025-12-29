{/* MAIN CONTENT */}
<section className="py-28 bg-black">
  <div className="max-w-6xl mx-auto px-6 lg:px-16 grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">

    {/* LEFT – CONTACT FORM */}
    <div className="relative bg-white/[0.03] border border-white/10 rounded-2xl p-8 md:p-12 backdrop-blur-xl shadow-[0_0_40px_rgba(255,255,255,0.04)]">

      {/* Header */}
      <div className="mb-10">
        <h2 className="text-3xl font-black tracking-tight">
          Get in touch
        </h2>
        <p className="mt-2 text-white/60 max-w-md">
          Send us a message and our team will respond within 24 hours.
        </p>
      </div>

      {/* Form */}
      <form className="space-y-6" aria-label="Contact form">

        {/* Name */}
        <div className="relative">
          <input
            type="text"
            required
            placeholder=" "
            className="peer w-full bg-black/40 border border-white/15 rounded-lg px-4 py-4 text-white focus:outline-none focus:ring-2 focus:ring-brand-yellow"
          />
          <label className="absolute left-4 top-4 text-sm text-white/60 transition-all
            peer-placeholder-shown:top-4
            peer-placeholder-shown:text-sm
            peer-focus:-top-2
            peer-focus:text-xs
            peer-focus:text-brand-yellow
            bg-black px-1">
            Full name
          </label>
        </div>

        {/* Email */}
        <div className="relative">
          <input
            type="email"
            required
            placeholder=" "
            className="peer w-full bg-black/40 border border-white/15 rounded-lg px-4 py-4 text-white focus:outline-none focus:ring-2 focus:ring-brand-yellow"
          />
          <label className="absolute left-4 top-4 text-sm text-white/60 transition-all
            peer-placeholder-shown:top-4
            peer-placeholder-shown:text-sm
            peer-focus:-top-2
            peer-focus:text-xs
            peer-focus:text-brand-yellow
            bg-black px-1">
            Email address
          </label>
        </div>

        {/* Message */}
        <div className="relative">
          <textarea
            rows={6}
            required
            placeholder=" "
            className="peer w-full bg-black/40 border border-white/15 rounded-lg px-4 py-4 text-white resize-none focus:outline-none focus:ring-2 focus:ring-brand-yellow"
          />
          <label className="absolute left-4 top-4 text-sm text-white/60 transition-all
            peer-placeholder-shown:top-4
            peer-placeholder-shown:text-sm
            peer-focus:-top-2
            peer-focus:text-xs
            peer-focus:text-brand-yellow
            bg-black px-1">
            Message
          </label>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full mt-4 bg-brand-yellow text-black font-black py-4 rounded-lg uppercase tracking-wider hover:brightness-110 transition"
        >
          Send message
        </button>

        <p className="text-xs text-white/40 text-center">
          We usually reply within 24 hours.
        </p>
      </form>
    </div>

    {/* RIGHT – INFO PANEL */}
    <div className="space-y-12">

      {/* Contact Details */}
      <div>
        <h3 className="text-xl font-black mb-4">
          Contact details
        </h3>

        <div className="space-y-5 text-white/70">
          <div>
            <p className="text-xs uppercase text-white/40 mb-1">
              Email
            </p>
            <p>contact@roomzaseducatedsecret.com</p>
          </div>

          <div>
            <p className="text-xs uppercase text-white/40 mb-1">
              Phone
            </p>
            <p>+27 (0) XX XXX XXXX</p>
          </div>
        </div>
      </div>

      {/* Brand Card */}
      <div className="bg-white/[0.04] border border-white/10 rounded-xl p-6">
        <p className="text-white/70 text-sm leading-relaxed">
          R.E.S. is a national student platform focused on education,
          leadership, and opportunity across South Africa.
        </p>
      </div>
    </div>
  </div>
</section>
