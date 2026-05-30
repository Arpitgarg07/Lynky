import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'How It Works', href: '#how' },
  { label: 'Join as Worker', href: '#join' },
]

const trustStats = [
  { title: 'Verified Workers', description: 'Background-checked professionals' },
  { title: 'Fast Response', description: 'Average 6-minute match time' },
  { title: 'Local Services', description: 'Hyperlocal coverage in your area' },
  { title: 'Growing Network', description: '12,000+ service requests monthly' },
]

const categories = [
  'Electrician',
  'AC Repair',
  'Plumber',
  'Cleaner',
  'Beautician',
  'Mehndi Artist',
  'Cook',
  'Tutor',
  'Carpenter',
  'Pest Control',
  'And More',
]

const steps = [
  { step: '01', title: 'Choose Service', copy: 'Pick the help you need in seconds.' },
  { step: '02', title: 'Select Location', copy: 'Tell us your neighborhood or pin.' },
  { step: '03', title: 'Find Verified Workers', copy: 'View trusted professionals nearby.' },
  { step: '04', title: 'Contact Instantly', copy: 'Chat on WhatsApp with one tap.' },
]

const reasons = [
  'One platform for every local service',
  'WhatsApp-first experience built for India',
  'No app download or signup required',
  'Hyperlocal worker discovery in minutes',
  'Easy worker onboarding with guided flows',
]

const workerBenefits = [
  'Get discovered by customers in your exact locality',
  'Build trust with verified profiles and reviews',
  'Receive steady leads without marketing spend',
  'Manage all conversations on WhatsApp',
]

const stats = [
  { label: 'Workers onboarded', value: 4200, suffix: '+' },
  { label: 'Average response time', value: 6, suffix: ' min' },
  { label: 'Customer satisfaction', value: 4.9, suffix: '/5' },
]

const testimonials = [
  {
    name: 'Ananya Sharma',
    role: 'Homeowner, Bengaluru',
    quote:
      'Booked an electrician in under 10 minutes. The WhatsApp flow feels premium and effortless.',
  },
  {
    name: 'Faizan Khan',
    role: 'AC Technician, Delhi NCR',
    quote: 'Lynky helped me get quality leads without chasing calls. Everything happens on WhatsApp.',
  },
  {
    name: 'Ritika Jain',
    role: 'Working Professional, Pune',
    quote: 'I found a verified cook the same day. The trust badges made it easy to decide.',
  },
]

const futureVision = [
  'Expansion across 200+ Indian cities',
  'More categories, from wellness to education',
  'Smarter worker discovery with AI matching',
  'Live availability and proactive suggestions',
]

const faqs = [
  {
    question: 'Is Lynky free to use for customers?',
    answer: 'Yes. Customers can discover and contact workers without any platform fees.',
  },
  {
    question: 'How are workers verified?',
    answer:
      'We run document checks, address validation, and performance reviews before listing workers.',
  },
  {
    question: 'Do I need to install an app?',
    answer: 'No. Everything works inside WhatsApp, so you can start instantly.',
  },
  {
    question: 'How can workers join?',
    answer:
      'Workers can register on WhatsApp in minutes with their service, location, and contact details.',
  },
]

const floatingCards = [
  { label: 'Electrician', position: 'top-4 -left-6', delay: 0 },
  { label: 'Cleaner', position: 'bottom-6 -left-4', delay: 1.2 },
  { label: 'Mehndi Artist', position: 'top-10 -right-6', delay: 0.6 },
  { label: 'AC Repair', position: 'bottom-10 -right-4', delay: 1.6 },
]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

function Counter({ value, suffix }) {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    let frame
    const duration = 1200
    const start = performance.now()

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1)
      setCurrent(Math.round(progress * value))
      if (progress < 1) {
        frame = requestAnimationFrame(tick)
      }
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [value])

  return (
    <span className="text-3xl font-semibold text-white">
      {current.toLocaleString()}
      {suffix}
    </span>
  )
}

function App() {
  return (
    <div className="min-h-screen bg-base text-slate-100">
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-32 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/40 blur-[140px]" />
          <div className="absolute right-0 top-32 h-56 w-56 rounded-full bg-secondary/30 blur-[120px]" />
          <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-accent/20 blur-[140px]" />
        </div>

        <nav className="sticky top-0 z-50 border-b border-white/5 bg-base/80 backdrop-blur-xl">
          <div className="section-padding flex h-16 items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-lg font-semibold">
                L
              </div>
              <span className="text-lg font-semibold tracking-tight">Lynky</span>
            </div>
            <div className="hidden items-center gap-8 text-sm text-slate-300 md:flex">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="transition hover:text-white"
                >
                  {link.label}
                </a>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <a
                href="#cta"
                className="hidden rounded-full border border-white/15 px-4 py-2 text-xs font-semibold text-slate-200 transition hover:border-white/30 md:inline-flex"
              >
                Book a Worker
              </a>
              <a
                href="#join"
                className="rounded-full bg-primary px-5 py-2 text-xs font-semibold text-white shadow-glow transition hover:bg-primary/90"
              >
                Join as Worker
              </a>
            </div>
          </div>
        </nav>

        <section id="home" className="section-padding relative pt-20 pb-16 lg:pt-28">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.4 }}>
              <motion.p
                variants={fadeUp}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-300"
              >
                WhatsApp-first local services
              </motion.p>
              <motion.h1
                variants={fadeUp}
                className="mt-6 text-4xl font-semibold leading-tight text-white md:text-5xl lg:text-6xl"
              >
                Find trusted local workers in minutes, not days.
                <span className="mt-4 block bg-gradient-to-r from-white via-primary to-accent bg-clip-text text-transparent">
                  One premium marketplace for every service.
                </span>
              </motion.h1>
              <motion.p variants={fadeUp} className="mt-6 max-w-xl text-lg text-slate-300">
                Lynky connects Indian households with verified electricians, plumbers, tutors, beauticians, and more —
                all inside WhatsApp. No apps, no guesswork, just instant reliable help.
              </motion.p>
              <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="#cta"
                  className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-glow transition hover:bg-primary/90"
                >
                  Find Worker
                </a>
                <a
                  href="#join"
                  className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/40"
                >
                  Join as Worker
                </a>
                <div className="text-xs text-slate-400">
                  Trusted by <span className="text-white">4,200+</span> verified professionals
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="relative"
            >
              <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-transparent p-6 shadow-glow">
                <div className="flex items-center justify-between text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-400" />
                    Live matches
                  </div>
                  <span className="rounded-full bg-white/10 px-3 py-1">WhatsApp powered</span>
                </div>
                <div className="mt-6 grid gap-4">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-white">Electrician • Indiranagar</p>
                        <p className="text-xs text-slate-400">Verified · 4.9★ rating</p>
                      </div>
                      <span className="rounded-full bg-emerald-400/20 px-3 py-1 text-xs text-emerald-200">
                        Available now
                      </span>
                    </div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-white">Cleaner • Sector 18</p>
                        <p className="text-xs text-slate-400">Background checked</p>
                      </div>
                      <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-slate-200">
                        Responds in 4 min
                      </span>
                    </div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-white">Tutor • Powai</p>
                        <p className="text-xs text-slate-400">Top rated</p>
                      </div>
                      <span className="rounded-full bg-primary/20 px-3 py-1 text-xs text-primary">
                        Matched today
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="flex items-center justify-between text-xs text-slate-300">
                    <span>Avg. response time</span>
                    <span className="text-white">6 minutes</span>
                  </div>
                  <div className="mt-3 h-2 rounded-full bg-white/10">
                    <div className="h-2 w-4/5 rounded-full bg-gradient-to-r from-primary to-accent" />
                  </div>
                </div>
              </div>

              {floatingCards.map((card) => (
                <motion.div
                  key={card.label}
                  animate={{ y: [0, -12, 0] }}
                  transition={{ duration: 6, repeat: Infinity, delay: card.delay }}
                  className={`glass absolute ${card.position} rounded-2xl px-4 py-3 text-xs font-semibold text-white shadow-lg`}
                >
                  {card.label}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </div>

      <section id="trust" className="section-padding py-14">
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.4 }}>
          <motion.h2 variants={fadeUp} className="text-2xl font-semibold text-white md:text-3xl">
            Trust built into every match
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-3 max-w-2xl text-slate-300">
            Lynky is designed to feel premium, safe, and fast — so families and workers can connect with confidence.
          </motion.p>
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {trustStats.map((item) => (
              <motion.div
                key={item.title}
                variants={fadeUp}
                className="glass rounded-2xl p-5 text-sm"
              >
                <p className="text-base font-semibold text-white">{item.title}</p>
                <p className="mt-2 text-slate-400">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <section id="services" className="section-padding py-16">
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.35 }}>
          <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold text-white md:text-3xl">Popular categories</h2>
              <p className="mt-2 text-slate-300">Every essential service, curated for quality and trust.</p>
            </div>
            <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-slate-300">
              60+ categories live
            </div>
          </motion.div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => (
              <motion.div
                key={category}
                variants={fadeUp}
                whileHover={{ y: -6, scale: 1.02 }}
                className="glass group rounded-2xl p-5 text-sm transition"
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-white">{category}</span>
                  <span className="text-xs text-slate-400 group-hover:text-accent">Explore →</span>
                </div>
                <p className="mt-3 text-xs text-slate-400">
                  Verified professionals nearby.
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <section id="how" className="section-padding py-16">
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.4 }}>
          <motion.h2 variants={fadeUp} className="text-2xl font-semibold text-white md:text-3xl">
            How Lynky works
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-3 max-w-2xl text-slate-300">
            A seamless WhatsApp flow that feels like a premium concierge.
          </motion.p>
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => (
              <motion.div key={step.step} variants={fadeUp} className="glass rounded-2xl p-6">
                <p className="text-xs font-semibold text-accent">{step.step}</p>
                <h3 className="mt-3 text-lg font-semibold text-white">{step.title}</h3>
                <p className="mt-2 text-sm text-slate-400">{step.copy}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <section id="why" className="section-padding py-16">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr]">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
          >
            <motion.h2 variants={fadeUp} className="text-2xl font-semibold text-white md:text-3xl">
              Why Lynky feels different
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-3 text-slate-300">
              We combine trust, speed, and premium design so families feel confident and workers feel valued.
            </motion.p>
            <motion.ul variants={stagger} className="mt-6 space-y-4">
              {reasons.map((reason) => (
                <motion.li key={reason} variants={fadeUp} className="flex items-start gap-3 text-sm">
                  <span className="mt-1 h-2 w-2 rounded-full bg-accent" />
                  <span className="text-slate-200">{reason}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            className="glass rounded-3xl p-8"
          >
            <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Trust stack</p>
            <h3 className="mt-4 text-xl font-semibold text-white">Professional trust elements</h3>
            <div className="mt-6 grid gap-4">
              {[
                { label: 'Verified IDs', value: '98% completion' },
                { label: 'Response SLA', value: '< 10 min' },
                { label: 'Repeat hiring', value: '72% monthly' },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between text-sm">
                  <span className="text-slate-300">{item.label}</span>
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-white">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section id="join" className="section-padding py-16">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
          >
            <motion.h2 variants={fadeUp} className="text-2xl font-semibold text-white md:text-3xl">
              Grow your local business with Lynky
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-3 text-slate-300">
              Workers get discovered by nearby customers, build trust fast, and manage every lead on WhatsApp.
            </motion.p>
            <motion.ul variants={stagger} className="mt-6 space-y-4">
              {workerBenefits.map((benefit) => (
                <motion.li key={benefit} variants={fadeUp} className="flex items-start gap-3 text-sm">
                  <span className="mt-1 h-2 w-2 rounded-full bg-primary" />
                  <span className="text-slate-200">{benefit}</span>
                </motion.li>
              ))}
            </motion.ul>
            <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-3">
              <a
                href="#cta"
                className="rounded-full bg-secondary px-6 py-3 text-sm font-semibold text-white shadow-glow transition hover:bg-secondary/90"
              >
                Join as Worker
              </a>
              <a
                href="#faq"
                className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/40"
              >
                View FAQ
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            className="glass rounded-3xl p-8"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Worker growth</p>
            <div className="mt-6 space-y-6">
              {stats.map((stat) => (
                <div key={stat.label} className="space-y-2">
                  <Counter value={stat.value} suffix={stat.suffix} />
                  <p className="text-xs text-slate-400">{stat.label}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4 text-xs text-slate-300">
              Lynky recommends the most relevant professionals first based on location, availability, and rating.
            </div>
          </motion.div>
        </div>
      </section>

      <section id="proof" className="section-padding py-16">
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.4 }}>
          <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold text-white md:text-3xl">Social proof that builds trust</h2>
              <p className="mt-2 text-slate-300">Ratings and real stories from households and workers.</p>
            </div>
            <div className="glass rounded-full px-4 py-2 text-xs text-slate-200">4.9 average rating</div>
          </motion.div>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {testimonials.map((testimonial) => (
              <motion.div
                key={testimonial.name}
                variants={fadeUp}
                className="glass rounded-2xl p-6 text-sm"
              >
                <div className="mb-4 flex gap-1 text-amber-400">
                  {'★★★★★'.split('').map((star, index) => (
                    <span key={index}>{star}</span>
                  ))}
                </div>
                <p className="text-slate-200">“{testimonial.quote}”</p>
                <p className="mt-4 text-xs text-slate-400">{testimonial.name}</p>
                <p className="text-xs text-slate-500">{testimonial.role}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <section id="future" className="section-padding py-16">
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.4 }}>
          <motion.h2 variants={fadeUp} className="text-2xl font-semibold text-white md:text-3xl">
            The future of local services
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-3 max-w-2xl text-slate-300">
            Lynky is scaling into a nationwide discovery layer for every household service.
          </motion.p>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {futureVision.map((item) => (
              <motion.div key={item} variants={fadeUp} className="glass rounded-2xl p-5 text-sm">
                <p className="text-white">{item}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <section id="faq" className="section-padding py-16">
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.4 }}>
          <motion.h2 variants={fadeUp} className="text-2xl font-semibold text-white md:text-3xl">
            FAQs
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-3 max-w-2xl text-slate-300">
            Everything you need to know about the Lynky experience.
          </motion.p>
          <div className="mt-8 grid gap-4">
            {faqs.map((faq) => (
              <motion.details key={faq.question} variants={fadeUp} className="glass rounded-2xl p-5">
                <summary className="cursor-pointer text-sm font-semibold text-white">
                  {faq.question}
                </summary>
                <p className="mt-3 text-sm text-slate-300">{faq.answer}</p>
              </motion.details>
            ))}
          </div>
        </motion.div>
      </section>

      <section id="cta" className="section-padding py-16">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-primary/20 via-base to-secondary/20 p-10 text-center shadow-glow">
          <h2 className="text-3xl font-semibold text-white md:text-4xl">
            Ready to find a trusted worker today?
          </h2>
          <p className="mt-3 text-slate-300">
            Join thousands of Indian households using Lynky for verified, fast, and premium local services.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href="#services"
              className="rounded-full bg-white px-7 py-3 text-sm font-semibold text-base transition hover:bg-white/90"
            >
              Find Worker
            </a>
            <a
              href="#join"
              className="rounded-full border border-white/30 px-7 py-3 text-sm font-semibold text-white transition hover:border-white/60"
            >
              Join as Worker
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 py-12">
        <div className="section-padding grid gap-8 md:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-lg font-semibold">
                L
              </div>
              <span className="text-lg font-semibold">Lynky</span>
            </div>
            <p className="mt-4 max-w-sm text-sm text-slate-400">
              A premium WhatsApp-first marketplace helping Indian households and workers connect instantly.
            </p>
          </div>
          <div className="text-sm text-slate-300">
            <p className="mb-3 text-xs uppercase tracking-[0.2em] text-slate-500">Explore</p>
            <ul className="space-y-2">
              <li>
                <a href="#services" className="transition hover:text-white">
                  Services
                </a>
              </li>
              <li>
                <a href="#how" className="transition hover:text-white">
                  How it works
                </a>
              </li>
              <li>
                <a href="#future" className="transition hover:text-white">
                  Vision
                </a>
              </li>
            </ul>
          </div>
          <div className="text-sm text-slate-300">
            <p className="mb-3 text-xs uppercase tracking-[0.2em] text-slate-500">Get started</p>
            <ul className="space-y-2">
              <li>
                <a href="#cta" className="transition hover:text-white">
                  Find a worker
                </a>
              </li>
              <li>
                <a href="#join" className="transition hover:text-white">
                  Join as worker
                </a>
              </li>
              <li>
                <a href="#faq" className="transition hover:text-white">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="section-padding mt-10 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 Lynky. All rights reserved.</p>
          <p>Built for a hyperlocal, trusted service experience.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
