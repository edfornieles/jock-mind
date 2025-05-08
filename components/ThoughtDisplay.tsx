import { motion } from 'framer-motion'
import type { ThoughtDisplayProps } from '@/types'

export default function ThoughtDisplay({ thought }: ThoughtDisplayProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center pointer-events-none">
      <motion.div
        key={thought.id}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="max-w-3xl mx-auto px-6 text-center"
      >
        <p className="text-3xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-2xl leading-relaxed">
          {thought.content}
        </p>
      </motion.div>
    </div>
  )
} 