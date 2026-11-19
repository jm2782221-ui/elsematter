import { useRef, type ReactNode } from 'react'
import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring, type Variants } from 'motion/react'

/* ---------- Aurora + drifting low-poly background ---------- */
export function Backdrop() {
  const reduce = useReducedMotion()
  const blob = (color: string, cls: string, dx: number, dy: number, dur: number) => (
    <motion.div
      aria-hidden
      className={`absolute rounded-full blur-[90px] ${cls}`}
      style={{ background: color }}
      animate={reduce ? undefined : { x: [0, dx, 0], y: [0, dy, 0], scale: [1, 1.15, 1] }}
      transition={{ duration: dur, repeat: Infinity, ease: 'easeInOut' }}
    />
  )
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden">
      {blob('rgba(95,179,179,.32)', '-top-40 -left-32 h-[520px] w-[520px]', 80, 60, 18)}
      {blob('rgba(242,181,68,.20)', 'top-1/3 -right-40 h-[460px] w-[460px]', -70, 50, 22)}
      {blob('rgba(60,80,170,.35)', '-bottom-48 left-1/4 h-[560px] w-[560px]', 60, -70, 26)}
      <motion.svg
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full opacity-[0.22]"
        animate={reduce ? undefined : { scale: [1, 1.06, 1], rotate: [0, 1.5, 0] }}
        transition={{ duration: 40, repeat: Infinity, ease: 'easeInOut' }}
      >
        {[
          '0,0 300,0 160,220', '300,0 600,0 450,180', '160,220 300,0 450,180', '600,0 880,0 740,240',
          '450,180 600,0 740,240', '880,0 1160,0 1000,170', '740,240 880,0 1000,170', '1160,0 1440,0 1440,280',
          '1000,170 1160,0 1440,280', '0,0 160,220 0,360', '0,360 160,220 300,430', '160,220 450,180 300,430',
          '450,180 740,240 580,460', '740,240 1000,170 900,470', '1000,170 1440,280 1220,480',
          '0,900 260,640 420,900', '420,900 600,700 820,900', '820,900 1060,660 1260,900', '1260,900 1440,700 1440,900',
        ].map((pts, i) => (
          <polygon key={i} points={pts} fill={['#1B2A4A', '#16213D', '#223560', '#1D2E52'][i % 4]} stroke="#2A3A66" strokeWidth="0.6" />
        ))}
      </motion.svg>
      <div className="grain absolute inset-0 opacity-[0.07] mix-blend-overlay" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,#070A14_100%)]" />
    </div>
  )
}

/* ---------- Low-poly logo: facets assemble, then gently float ---------- */
const facets = [
  { p: '44,4 80,26 44,44', c: '#5FB3B3' }, { p: '44,4 8,26 44,44', c: '#3E8C9A' },
  { p: '8,26 8,62 44,44', c: '#2B5D80' }, { p: '80,26 80,62 44,44', c: '#F2B544' },
  { p: '8,62 44,84 44,44', c: '#22406A' }, { p: '80,62 44,84 44,44', c: '#D9893B' },
]
export function Logo() {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className="relative"
      animate={reduce ? undefined : { y: [0, -6, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
    >
      <div aria-hidden className="absolute inset-0 -z-10 scale-150 rounded-full bg-gold/25 blur-2xl" />
      <svg width="92" height="92" viewBox="0 0 88 88" role="img" aria-label="ElseMatter logo">
        {facets.map((f, i) => (
          <motion.polygon
            key={i}
            points={f.p}
            fill={f.c}
            style={{ transformOrigin: '44px 44px' }}
            initial={reduce ? false : { opacity: 0, scale: 0.3, rotate: -40 + i * 12 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 160, damping: 14, delay: 0.1 + i * 0.07 }}
          />
        ))}
      </svg>
    </motion.div>
  )
}

/* ---------- Blur-in text, letter by letter ---------- */
export function BlurText({ text, className }: { text: string; className?: string }) {
  const reduce = useReducedMotion()
  return (
    <h1 className={className} aria-label={text}>
      {text.split('').map((ch, i) => (
        <motion.span
          key={i}
          aria-hidden
          className="inline-block"
          initial={reduce ? false : { opacity: 0, filter: 'blur(12px)', y: 14 }}
          animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 + i * 0.045, ease: [0.22, 1, 0.36, 1] }}
        >
          {ch}
        </motion.span>
      ))}
    </h1>
  )
}

/* ---------- Stagger container ---------- */
export const list: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 1.0 } },
}
export const item: Variants = {
  hidden: { opacity: 0, y: 22, filter: 'blur(6px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

/* ---------- Spotlight card: glow follows the pointer, slight 3D tilt ---------- */
export function SpotlightLink({
  href, children, className = '', rel = 'noopener',
}: { href: string; children: ReactNode; className?: string; rel?: string }) {
  const ref = useRef<HTMLAnchorElement>(null)
  const mx = useMotionValue(-200)
  const my = useMotionValue(-200)
  const rx = useSpring(0, { stiffness: 200, damping: 20 })
  const ry = useSpring(0, { stiffness: 200, damping: 20 })
  const glow = useMotionTemplate`radial-gradient(220px circle at ${mx}px ${my}px, rgba(242,181,68,.16), transparent 70%)`
  const reduce = useReducedMotion()

  return (
    <motion.a
      ref={ref}
      href={href}
      target="_blank"
      rel={rel}
      variants={item}
      whileTap={{ scale: 0.97 }}
      style={reduce ? undefined : { rotateX: rx, rotateY: ry, transformPerspective: 800 }}
      onPointerMove={(e) => {
        const r = ref.current!.getBoundingClientRect()
        const x = e.clientX - r.left, y = e.clientY - r.top
        mx.set(x); my.set(y)
        rx.set(((y - r.height / 2) / r.height) * -6)
        ry.set(((x - r.width / 2) / r.width) * 6)
      }}
      onPointerLeave={() => { mx.set(-200); my.set(-200); rx.set(0); ry.set(0) }}
      className={`group relative flex items-center overflow-hidden rounded-2xl border border-line bg-panel/70 text-cream no-underline backdrop-blur-md transition-colors duration-300 hover:border-[#4A5788] ${className}`}
    >
      <motion.span aria-hidden className="pointer-events-none absolute inset-0" style={{ background: glow }} />
      <span aria-hidden className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
      {children}
    </motion.a>
  )
}

/* ---------- Arrow that slides on hover ---------- */
export function Arrow() {
  return (
    <span className="relative ml-auto flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white/5 text-mist transition-colors group-hover:bg-gold group-hover:text-ink">
      <svg className="absolute transition-transform duration-300 group-hover:translate-x-6 group-hover:-translate-y-6" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M7 17L17 7M9 7h8v8" /></svg>
      <svg className="absolute -translate-x-6 translate-y-6 transition-transform duration-300 group-hover:translate-x-0 group-hover:translate-y-0" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M7 17L17 7M9 7h8v8" /></svg>
    </span>
  )
}

/* ---------- Icons (generic, stroke) ---------- */
export function ChannelIcon({ id }: { id: string }) {
  const common = { width: 22, height: 22, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, 'aria-hidden': true }
  if (id === 'youtube') return <svg {...common}><rect x="3" y="5" width="18" height="14" rx="4" /><path d="M10 9l5 3-5 3z" /></svg>
  if (id === 'tiktok') return <svg {...common}><path d="M9 18V5l11-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="17" cy="16" r="3" /></svg>
  return <svg {...common}><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" /></svg>
}

export function PandaMark() {
  return (
    <svg width="40" height="40" viewBox="0 0 36 36" aria-hidden className="shrink-0">
      <circle cx="9" cy="9" r="6" fill="#070A14" stroke="#F4F1E8" strokeWidth="1.5" />
      <circle cx="27" cy="9" r="6" fill="#070A14" stroke="#F4F1E8" strokeWidth="1.5" />
      <circle cx="18" cy="20" r="13" fill="#F4F1E8" />
      <ellipse cx="12.5" cy="18" rx="3.4" ry="4.4" fill="#070A14" transform="rotate(-20 12.5 18)" />
      <ellipse cx="23.5" cy="18" rx="3.4" ry="4.4" fill="#070A14" transform="rotate(20 23.5 18)" />
      <circle cx="18" cy="25" r="2" fill="#070A14" />
    </svg>
  )
}
