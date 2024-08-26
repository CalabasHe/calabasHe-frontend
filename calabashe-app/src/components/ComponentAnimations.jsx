import { motion } from "framer-motion";

const animationsY = {
  initial: { opacity: 0, y: 100 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 100 },
};

const fadeInRight = {
  initial:{ opacity: 0, x: -150 },
  animate:{ opacity: 1, x: 0 },
  exit:{ opacity: 0, y: 100 },
};

const fadeOut = {
  initial:{ opacity: 0 },
  animate:{ opacity: 1},
  exit:{ opacity: 0 },
}

 export const AnimateY = ({ children }) => {
  // Moves component along the y-axis
  return (
    <motion.div
      className="w-full"
      variants={animationsY}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: .3 }}
    >
      {children}
    </motion.div>
  );
};

export const FadeInRight = ({ children }) => {
  return(
    <motion.div
    className="w-full"
    variants={fadeInRight}
    initial="initial"
    animate="animate"
    exit="exit"
    transition={{ duration: .35 }}
    >
      {children}
    </motion.div>
  )
}

export const FadeInOut = ({ children }) => {
  return(
    <motion.div
    className="w-full"
    variants={fadeOut}
    initial="initial"
    animate="animate"
    exit="exit"
    transition={{ duration: .20 }}
    >
      {children}
    </motion.div>
  )
}
