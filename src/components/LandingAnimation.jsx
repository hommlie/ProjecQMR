import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { MdHealthAndSafety } from "react-icons/md";

const LandingAnimation = ({ onFinish }) => {
  const [show, setShow] = useState(true);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const t = setTimeout(() => setShow(false), 3000); // start exit only
    return () => clearTimeout(t);
  }, []);

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.25, delayChildren: 0.2 } },
  };

  return createPortal(
    <AnimatePresence onExitComplete={() => onFinish && onFinish()}>
      {show && (
        <motion.div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 2147483647,
            width: "100vw",
            minHeight: "100dvh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            paddingTop: "env(safe-area-inset-top)",
            paddingBottom: "env(safe-area-inset-bottom)",
            paddingLeft: "env(safe-area-inset-left)",
            paddingRight: "env(safe-area-inset-right)",
            background: "linear-gradient(90deg,#4f46e5,#7c3aed,#ec4899)",
            overflow: "hidden",
          }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8 } }} // fade out
        >
          {!reduceMotion && (
            <motion.div
              aria-hidden="true"
              initial={{ x: "-120%" }}
              animate={{ x: "120%" }}
              transition={{ duration: 1.4, ease: "easeOut", delay: 0.15 }}
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(105deg, rgba(255,255,255,0) 40%, rgba(255,255,255,0.22) 50%, rgba(255,255,255,0) 60%)",
                transform: "skewX(-12deg)",
                pointerEvents: "none",
                willChange: "transform",
              }}
            />
          )}

          <motion.div
            variants={container}
            initial="hidden"
            animate="visible"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "16px",
              position: "relative",
            }}
          >
            <motion.h1
              style={{
                margin: 0,
                lineHeight: 1.1,
                textAlign: "center",
                color: "#fff",
                fontWeight: 800,
                fontSize: "clamp(36px, 10vw, 112px)",
                letterSpacing: "0.02em",
                textShadow: "0 0 20px rgba(255,255,255,0.6)",
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.0, ease: "easeOut" }}
            >
              Hommlie
            </motion.h1>

            {/* <motion.img
              src={require("../assets/logo.png")} // Adjust path if your assets folder is elsewhere
              alt="Hommlie Logo"
              style={{
                width: "clamp(120px, 40vw, 300px)", // responsive size
                height: "auto",
                filter: "drop-shadow(0 0 20px rgba(255,255,255,0.6))",
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.0, ease: "easeOut" }}
            /> */}

            <motion.div
              style={{
                width: "min(60vw, 520px)",
                height: "2px",
                background:
                  "linear-gradient(90deg,rgba(255,255,255,0) 0%, rgba(255,255,255,0.9) 50%, rgba(255,255,255,0) 100%)",
                transformOrigin: "center",
                borderRadius: "999px",
                filter: "drop-shadow(0 0 8px rgba(255,255,255,0.6))",
              }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              aria-hidden="true"
            />

            <motion.div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                color: "#fff",
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                fontWeight: 600,
                fontSize: "clamp(12px, 2.8vw, 18px)",
                textShadow: "0 0 10px rgba(255,255,255,0.5)",
              }}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <MdHealthAndSafety size={22} />
              <span>Your Hygiene Partner</span>
              <MdHealthAndSafety size={22} />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default LandingAnimation;
