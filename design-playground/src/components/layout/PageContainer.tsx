import type { ReactNode } from 'react';
import { motion } from 'motion/react';

interface PageContainerProps {
  children: ReactNode;
  className?: string;
}

export function PageContainer({ children, className = '' }: PageContainerProps) {
  return (
    <motion.main
      id="main-content"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      className={`min-h-[calc(100dvh-64px)] ${className}`}
    >
      {children}
    </motion.main>
  );
}

