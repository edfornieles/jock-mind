import Image from 'next/image'
import { motion } from 'framer-motion'
import type { BackgroundImageProps } from '@/types'

export default function BackgroundImage({ image, alt, priority = false }: BackgroundImageProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1, ease: "easeInOut" }}
      className="fixed inset-0 -z-10"
    >
      <Image
        src={image}
        alt={alt}
        fill
        priority={priority}
        className="object-cover"
        quality={100}
      />
    </motion.div>
  )
} 