import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { X, ShieldCheck, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

const OFFERS = [
  { id: "roachx",   label: "RoachX Gel Treatment",      price: "₹399*",  to: "/product/roachx-gel-treatment", external: true },
  { id: "gpc",      label: "General Pest Control",       price: "₹899*",  to: "/subcategory/general-pest-control", external: true },
  { id: "std-cock", label: "Standard Cockroach Control", price: "₹999*",  to: "/subcategory/cockroach-control-services-in-bangalore", external: true },
  { id: "6d",       label: "6D Prime Cockroach",         price: "₹1199*", to: "/product/cockroach-control-services-in-bangalore", external: true },
  { id: "bb",       label: "Bedbugs Standard",           price: "₹2499*", to: "/subcategory/bed-bug-control-services-in-bangalore", external: true },
];

export default function OffersModal({ open, onClose }) {
  const reduceMotion = useReducedMotion();
  const navigate = useNavigate();
  const firstFocusable = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    const set = () => setIsMobile(mq.matches);
    set();
    mq.addEventListener?.("change", set);
    return () => mq.removeEventListener?.("change", set);
  }, []);

  useEffect(() => {
    if (open) firstFocusable.current?.focus();
    const onKey = (e) => { if (e.key === "Escape") onClose?.(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const overlay = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: reduceMotion ? 0 : 0.15 } },
    exit: { opacity: 0, transition: { duration: reduceMotion ? 0 : 0.12 } },
  };

  const sheetDesktop = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 16, scale: reduceMotion ? 1 : 0.98 },
    show:   { opacity: 1, y: 0, scale: 1, transition: { duration: 0.22, ease: "easeOut" } },
    exit:   { opacity: 0, y: reduceMotion ? 0 : 16, scale: reduceMotion ? 1 : 0.98, transition: { duration: 0.15 } },
  };

  const sheetMobile = {
    hidden: { y: "100%" },
    show:   { y: 0, transition: { duration: reduceMotion ? 0 : 0.28, ease: [0.2, 0.8, 0.2, 1] } },
    exit:   { y: "100%", transition: { duration: reduceMotion ? 0 : 0.22 } },
  };

  // Updated handleBook with external redirect support
  const handleBook = (to, external) => {
    onClose?.();
    if (external) {
      window.location.href = `https://www.hommlie.com${to}`;
    } else {
      navigate(to);
    }
  };

  const handleDragEnd = (_e, info) => {
    if (isMobile && (info.offset.y > 120 || info.velocity.y > 800)) onClose?.();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="om__overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="offers-title"
          initial="hidden"
          animate="show"
          exit="exit"
          variants={overlay}
          onClick={onClose}
        >
          <motion.div
            className={`om__sheet ${isMobile ? "om__sheet--mobile" : ""}`}
            variants={isMobile ? sheetMobile : sheetDesktop}
            onClick={(e) => e.stopPropagation()}
            drag={isMobile ? "y" : false}
            dragDirectionLock
            dragElastic={0.08}
            dragConstraints={{ top: 0, bottom: 0 }}
            onDragEnd={handleDragEnd}
          >
            {isMobile && <div className="om__grab" aria-hidden="true" />}

            <button ref={firstFocusable} className="om__close" aria-label="Close offers" onClick={onClose}>
              <X size={20} />
            </button>

            {/* HEADER */}
            <div className="om__head">
              <div className="om__head-top">
                <div className="om__emoji">🎉</div>
                <h2 id="offers-title" className="om__title">Limited-Time Offers Just for You!</h2>
              </div>
              <p className="om__sub">Book now before they expire!</p>
            </div>

            {/* BODY */}
            <div className="om__scroll">
              <ul className="om__list">
                {OFFERS.map((o) => (
                  <li key={o.id} className="om__row">
                    <span className="om__pill">LIMITED</span>

                    {/* one-line name + price */}
                    <div className="om__info">
                      <div className="om__name">
                        <ShieldCheck className="om__shield" aria-hidden="true" />
                        <span className="om__text">{o.label}</span>
                      </div>
                      <span className="om__sep" aria-hidden="true">—</span>
                      <span className="om__price">{o.price}</span>
                    </div>

                    <button className="om__cta" onClick={() => handleBook(o.to, o.external)}>
                      Book Now
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="om__foot">
              <Sparkles size={16} aria-hidden="true" />
              <span>Best prices shown are city-limited & time-bound.</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
