import { motion } from 'motion/react'
import { InstrumentContextProvider } from '../../state/instrument'
import { InstrumentSelector } from '../instrument-selector'
import { KeyboardWithInstrument } from '../keyboard'
import { ThemeToggle } from '../theme-toggle'

export const Playground = () => {
  return (
    <InstrumentContextProvider>
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="playground flex flex-col items-center gap-6"
        initial={{ opacity: 0, y: 20 }}
        transition={{
          duration: 0.5,
          ease: [0.25, 0.1, 0.25, 1],
        }}
      >
        <KeyboardWithInstrument />
        <motion.div
          animate={{ opacity: 1 }}
          className="flex flex-wrap items-center justify-center gap-4"
          initial={{ opacity: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          <InstrumentSelector />
          <ThemeToggle />
        </motion.div>
      </motion.div>
    </InstrumentContextProvider>
  )
}
