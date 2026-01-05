import { motion } from 'motion/react'
import { selectKey } from '../../domain/keyboard'
import { type MidiValue, notes } from '../../domain/note'
import { Key } from '../key'

export type KeyboardProps = {
  loading: boolean
  play: (note: MidiValue) => Promise<void>
  stop: (note: MidiValue) => Promise<void>
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.012,
      delayChildren: 0.08,
    },
  },
}

export const Keyboard = ({ loading, play, stop }: KeyboardProps) => {
  return (
    <motion.div
      animate={{ opacity: 1, scale: 1 }}
      className="relative overflow-hidden rounded-lg bg-[var(--keyboard-surface)]"
      initial={{ opacity: 0, scale: 0.98 }}
      style={{
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
      }}
      transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <motion.div
        animate={{ opacity: 1 }}
        className="h-3 bg-[var(--keyboard-frame)]"
        initial={{ opacity: 0 }}
        transition={{ delay: 0.08, duration: 0.25 }}
      />

      <motion.div animate="visible" className="flex px-3 pb-3" initial="hidden" variants={containerVariants}>
        {notes.map(({ midi, type, index, octave }) => {
          const label = selectKey(octave, index)
          return (
            <Key
              disabled={loading}
              key={midi}
              label={label}
              onDown={() => play(midi)}
              onUp={() => stop(midi)}
              type={type}
            />
          )
        })}
      </motion.div>
    </motion.div>
  )
}
