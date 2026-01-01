import { motion } from 'framer-motion'

type MysticLoaderProps = {
  progress: number
}

export function MysticLoader({ progress }: MysticLoaderProps) {
  const safeProgress = Number.isFinite(progress) ? Math.max(0, Math.min(progress, 100)) : 0

  return (
    <motion.div
      className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-b from-slate-950 via-slate-950/95 to-slate-950"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
    >
      <motion.div
        className="relative flex h-44 w-44 items-center justify-center rounded-full border border-amber-300/40 bg-amber-200/5 backdrop-blur-sm"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 18, ease: 'linear' }}
      >
        <motion.div
          className="absolute h-56 w-56 rounded-full blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(248,212,119,0.25) 0%, rgba(248,212,119,0.08) 45%, rgba(9,11,16,0) 70%)',
          }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
        />
        <span className="text-3xl text-amber-100 drop-shadow-[0_0_12px_rgba(248,212,119,0.55)]">⚝</span>
      </motion.div>

      <motion.div
        className="mt-8 flex flex-col items-center gap-2 text-sm uppercase tracking-[0.35em] text-amber-200/70"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <span>Invocando o códex...</span>
        <span className="text-xs text-amber-100/60">{Math.round(safeProgress)}%</span>
      </motion.div>
    </motion.div>
  )
}
