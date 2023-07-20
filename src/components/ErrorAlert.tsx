'use client'
import { motion, MotionConfig } from 'framer-motion'

export interface ErrorAlertProps {
  message?: string
}
export default function ErrorAlert({message}: ErrorAlertProps) {

  return (
    <MotionConfig reducedMotion='user'>
      <motion.div 
        initial={{ opacity: 0, translateX: -200 }}
        animate={{ opacity: 1, translateX: 0 }}
        exit={{ opacity: 0, translateX: -200 }}
      >
        <div role="alertdialog" className="border border-danger-primary text-danger-primary rounded-md p-md">
          { message }
        </div>    
      </motion.div>
    </MotionConfig>
  )
}
