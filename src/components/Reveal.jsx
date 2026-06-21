import React from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Scroll-triggered reveal: fades + slides content up as it enters the viewport.
 * Respects prefers-reduced-motion (renders content statically, fully visible).
 * Note: initial opacity is applied via JS only — with JS disabled the content
 * renders at full opacity (no CSS-persisted hidden state).
 */
function Reveal({ children, className = "", delay = 0 }) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}

export default Reveal;
