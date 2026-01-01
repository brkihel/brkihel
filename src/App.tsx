import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import { useProgress } from '@react-three/drei'
import { MysticLoader } from './components/MysticLoader'
import GitHubProjects from './components/GitHubProjects'
import bg from './assets/background.png'

type Stage = {
  id: string
  title: string
  description: string
  actionLabel: string
  actionHref?: string
}

const stages: Stage[] = [
  {
    id: 'Despertar',
    title: 'No princípio, havia apenas o vazio…',
    description:
      'Assim como todo master crafter um dia foi iniciado em sua arte, eu conheci o mundo do desenvolvimento sem nem conseguir imaginar até onde essa skill poderia me levar...',
    actionLabel: 'Quem sou eu?',
  },
  {
    id: 'Desenvolvedor',
    title: 'Toda criação começa com uma centelha.',
    description:
      "Minha história como programador não começou com grandes planos, nem com uma ideia revolucionária. Começou com curiosidade! No início, eu só queria entender como as coisas funcionavam. Um script aqui, um projeto pequeno ali — e, sem perceber, eu já estava mergulhado em lógica, sistemas, bugs e soluções.",
    actionLabel: 'Jornada',
  },
  {
    id: 'Jornada',
    title: 'Nasce uma paixão',
    description:
      'Com o tempo, essa curiosidade virou prática. A prática virou projetos reais. E os projetos viraram responsabilidade. Hoje, eu atuo desenvolvendo soluções que vão de mods e sistemas para jogos, passando por back-end, automações, servidores e integrações, até infraestrutura, DevOps e ferramentas pra auxiliar no desenvolvimento dessas coisas. Trabalhei com comunidades, servidores ativos, código em produção e projetos que evoluem todos os dias — onde errar custa tempo, e acertar exige paciência e esforço.',
    actionLabel: 'Identidade',
  },
  {
    id: 'Dever',
    title: 'O chamado pelo dever',
    description:
      'Eu entendi que não era apenas paixão, quando senti o chamado pelo dever na programação, quando me senti movido pela satisfação de ver algo complexo funcionando de forma simples. Quando consegui dar "vida" mesmo as coisas mais simples possíveis, quando comecei a ver a criação funcionando. Se toda criação começa com uma centelha, a minha continua sendo a mesma: entender, construir e evoluir.',
    actionLabel: 'Invoque o Criador',
    actionHref: '#creator',
  },
]

function App() {
  const [stageIndex, setStageIndex] = useState(0)
  const [hasMinimumDelay, setHasMinimumDelay] = useState(false)
  const [isReady, setIsReady] = useState(false)
  const [hasAwakened, setHasAwakened] = useState(false)
  const [showPortfolio, setShowPortfolio] = useState(false)
  const currentStage = stages[stageIndex]
  const progress = useMemo(() => (stageIndex + 1) / stages.length, [stageIndex])
  const devicePixelRatio = useMemo(
    () => (typeof window !== 'undefined' ? Math.min(window.devicePixelRatio, 1.6) : 1),
    [],
  )
  const { active: assetsLoading, progress: loadingProgress } = useProgress()

  useEffect(() => {
    const timer = window.setTimeout(() => setHasMinimumDelay(true), 1500)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (hasMinimumDelay && !assetsLoading) {
      setIsReady(true)
    }
  }, [assetsLoading, hasMinimumDelay])

  useEffect(() => {
    if (isReady) {
      const awakenTimer = window.setTimeout(() => setHasAwakened(true), 400)
      return () => window.clearTimeout(awakenTimer)
    }
    setHasAwakened(false)
    return undefined
  }, [isReady])

  const handleAdvance = () => {
    setStageIndex((index) => (index + 1 < stages.length ? index + 1 : index))
  }

  const handleReset = () => setStageIndex(0)

  return (
    
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100"
      style={{ backgroundImage: `url(${bg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-slate-950/40 via-slate-950/60 to-slate-950" />

      <AnimatePresence>
        {!isReady && <MysticLoader key="loader" progress={loadingProgress} />}
      </AnimatePresence>

      <AnimatePresence>
        {isReady && !showPortfolio && (
          <motion.main
            key="codex-main"
            className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-16"
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
          >
            <div className="flex flex-col items-center text-center max-w-3xl gap-8">
              <div className="relative flex h-32 w-32 items-center justify-center">
                <AnimatePresence>
                  {hasAwakened && (
                    <motion.div
                      key="spark-aura"
                      className="absolute inset-0 rounded-full blur-3xl"
                      style={{
                        background:
                          'radial-gradient(circle, rgba(248,212,119,0.45) 0%, rgba(248,212,119,0.15) 45%, rgba(9,10,15,0) 80%)',
                      }}
                      initial={{ opacity: 0, scale: 0.7 }}
                      animate={{ opacity: 1, scale: 1.15 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                      transition={{ duration: 1.4, ease: 'easeOut' }}
                    />
                  )}
                </AnimatePresence>
                <motion.span
                  className="relative text-5xl text-amber-100 drop-shadow-[0_0_25px_rgba(248,212,119,0.55)]"
                  initial={{ opacity: 0.2, scale: 0.75 }}
                  animate={
                    hasAwakened
                      ? { opacity: [0.85, 1, 0.85], scale: [1, 1.08, 1] }
                      : { opacity: 0.4, scale: 0.85 }
                  }
                  transition={
                    hasAwakened
                      ? { duration: 3.2, repeat: Infinity, ease: 'easeInOut' }
                      : { duration: 0.8, ease: 'easeOut' }
                  }
                >
                  ⚝
                </motion.span>
              </div>

              <span className="text-xs uppercase tracking-[0.6em] text-amber-300/70">
                Genesis Project — Codex do Criador
              </span>

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStage.id}
                  initial={{ opacity: 0, y: 16, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -16, filter: 'blur(12px)' }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  className="space-y-4"
                >
                  <h1 className="text-3xl md:text-5xl font-semibold text-amber-100 drop-shadow-[0_0_20px_rgba(248,212,119,0.25)]">
                    {currentStage.title}
                  </h1>
                  <p className="text-base md:text-lg text-slate-300/85 leading-relaxed">
                    {currentStage.description}
                  </p>
                </motion.div>
              </AnimatePresence>

              <div className="flex items-center gap-4">
                {currentStage.actionHref ? (
                  <a
                    href={currentStage.actionHref}
                    onClick={(e) => {
                      // internal anchors (hash) should show the portfolio view instead of navigating
                      if (currentStage.actionHref && currentStage.actionHref.startsWith('#')) {
                        e.preventDefault()
                        setShowPortfolio(true)
                      }
                    }}
                    target={currentStage.actionHref && !currentStage.actionHref.startsWith('#') ? '_blank' : undefined}
                    rel={currentStage.actionHref && !currentStage.actionHref.startsWith('#') ? 'noopener noreferrer' : undefined}
                    className="px-8 py-3 rounded-full border border-amber-300/50 bg-amber-300/10 text-amber-100 hover:bg-amber-300/20 transition"
                  >
                    {currentStage.actionLabel}
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={handleAdvance}
                    className="px-8 py-3 rounded-full border border-amber-300/50 bg-amber-300/10 text-amber-100 hover:bg-amber-300/20 transition"
                  >
                    {currentStage.actionLabel}
                  </button>
                )}

                {stageIndex > 0 && (
                  <button
                    type="button"
                    onClick={handleReset}
                    className="px-5 py-3 rounded-full border border-slate-600/60 bg-slate-900/60 text-slate-300 hover:bg-slate-800/70 transition"
                  >
                    Reiniciar
                  </button>
                )}
              </div>
            </div>

            <div className="mt-16 w-full max-w-xl">
              <div className="h-1 w-full rounded-full bg-slate-700/40">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-amber-400 via-amber-200 to-sky-400 transition-all duration-700"
                  style={{ width: `${progress * 100}%` }}
                />
              </div>
              <div className="mt-3 flex items-center justify-between w-full overflow-hidden text-[10px] md:text-xs uppercase tracking-[0.12em] md:tracking-[0.35em] text-slate-400/80">
                {stages.map((stage) => (
                  <span key={stage.id} className="whitespace-nowrap px-1">
                    {stage.id}
                  </span>
                ))}
              </div>
            </div>
          </motion.main>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isReady && showPortfolio && (
          <motion.section
            key="portfolio"
            className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-16"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <div className="max-w-3xl text-center">
              <h2 className="text-3xl font-semibold text-amber-100 mb-4">Portfólio</h2>
              <p className="text-slate-300/85 mb-6">Aqui estão alguns links rápidos e uma prévia dos meus projetos.</p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
                <a href="https://github.com/brkihel" target="_blank" rel="noopener noreferrer" className="px-6 py-3 rounded-full bg-slate-800/60 text-amber-100 hover:bg-slate-800 transition">
                  GitHub
                </a>
                <a href="https://linkedin.com/in/diegomacedo04/" target="_blank" rel="noopener noreferrer" className="px-6 py-3 rounded-full bg-slate-800/60 text-amber-100 hover:bg-slate-800 transition">
                  LinkedIn
                </a>
                <a href="https://wa.me/+5551995379956" target="_blank" rel="noopener noreferrer" className="px-6 py-3 rounded-full bg-emerald-600/80 text-white hover:bg-emerald-600 transition">
                  WhatsApp
                </a>
              </div>

              <div className="mb-6 text-center">
                <p className="text-sm text-slate-300/80 mb-3">Alguns dos meus repositórios públicos no GitHub — clique em qualquer card para abrir o repositório.</p>
                <div className="mb-4">
                  <GitHubProjects username="brkihel" limit={6} />
                </div>
              </div>

              <div className="mt-8">
                <button
                  type="button"
                  onClick={() => setShowPortfolio(false)}
                  className="px-5 py-3 rounded-full border border-slate-600/60 bg-slate-900/60 text-slate-300 hover:bg-slate-800/70 transition"
                >
                  Voltar
                </button>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  )
}

export default App
