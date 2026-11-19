import { motion, useReducedMotion } from 'motion/react'
import { config } from './config'
import { Arrow, Backdrop, BlurText, ChannelIcon, item, list, Logo, PandaMark, SpotlightLink } from './components'

export default function App() {
  const reduce = useReducedMotion()

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <Backdrop />

      <main className="relative mx-auto flex max-w-[480px] flex-col items-center gap-7 px-5 pt-16 pb-12">
        {/* Header */}
        <header className="flex flex-col items-center gap-4 text-center">
          <Logo />
          <BlurText text={config.name} className="m-0 font-serif text-[46px] leading-none font-semibold tracking-[-0.02em]" />
          <motion.p
            className="shine-text m-0 font-serif text-xl italic"
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.95 }}
          >
            {config.tagline}
          </motion.p>
          <motion.p
            className="m-0 max-w-[360px] text-[15px] leading-relaxed text-mist"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.1 }}
          >
            {config.bio}
          </motion.p>
        </header>

        <motion.div className="flex w-full flex-col gap-3" variants={list} initial={reduce ? 'show' : 'hidden'} animate="show">
          {/* Latest episode — border beam + shimmer */}
          <motion.a
            href={config.latest.url}
            target="_blank"
            rel="noopener"
            variants={item}
            whileHover={{ y: -3, scale: 1.01 }}
            whileTap={{ scale: 0.97 }}
            className="beam shimmer relative mb-2 flex items-center gap-4 overflow-hidden rounded-[20px] px-5 py-[18px] text-ink no-underline shadow-[0_18px_50px_-12px_rgba(242,181,68,.55)]"
          >
            <span className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px] bg-ink">
              {!reduce && <span aria-hidden className="absolute inset-0 animate-ping rounded-[14px] bg-gold/30 [animation-duration:2.4s]" />}
              <svg width="22" height="22" viewBox="0 0 24 24" fill="#F2B544" aria-hidden><path d="M8 5v14l11-7z" /></svg>
            </span>
            <span className="flex min-w-0 flex-col gap-0.5">
              <span className="text-xs font-semibold tracking-[0.08em] text-[#4A3A12] uppercase">Latest episode</span>
              <span className="font-serif text-[19px] leading-snug font-semibold">{config.latest.title}</span>
            </span>
          </motion.a>

          {/* Channels */}
          <nav aria-label="ElseMatter channels" className="flex flex-col gap-3">
            {config.channels.map((c) => (
              <SpotlightLink key={c.id} href={c.url} className="min-h-[62px] gap-3.5 px-5 text-base font-semibold">
                <span className="relative text-teal transition-transform duration-300 group-hover:scale-110"><ChannelIcon id={c.id} /></span>
                <span className="relative flex flex-col leading-tight">
                  <span>{c.label}</span>
                  <span className="mt-0.5 text-[13px] font-medium text-mist">{c.handle}</span>
                </span>
                <Arrow />
              </SpotlightLink>
            ))}
          </nav>

          {/* Recommended */}
          <motion.h2 variants={item} className="m-0 mt-4 text-xs font-semibold tracking-[0.12em] text-[#8A92AE] uppercase">
            Recommended
          </motion.h2>
          {config.recommended.map((r) => (
            <SpotlightLink key={r.id} href={r.url} rel={r.affiliate ? 'sponsored noopener' : 'noopener'} className="gap-3.5 px-5 py-4">
              <span className="relative transition-transform duration-500 group-hover:rotate-[-8deg]"><PandaMark /></span>
              <span className="relative flex min-w-0 flex-col gap-1">
                <span className="flex items-center gap-2">
                  <span className="text-base font-semibold">{r.name}</span>
                  {r.affiliate && <span className="rounded-md border border-[#3A4570] px-1.5 py-0.5 text-[11px] font-semibold text-mist">Affiliate</span>}
                </span>
                <span className="text-sm leading-snug text-mist">{r.blurb}</span>
              </span>
              <Arrow />
            </SpotlightLink>
          ))}
        </motion.div>

        <motion.footer
          className="flex flex-col items-center gap-1.5 pt-4 text-center text-xs leading-relaxed text-[#8A92AE]"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <span>Links marked “Affiliate” may earn me a commission at no extra cost to you.</span>
          <span>© {new Date().getFullYear()} {config.name}</span>
        </motion.footer>
      </main>
    </div>
  )
}
