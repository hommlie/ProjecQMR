import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { X, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./OffersModal.css";

const OFFERS = [
  { id: "roachx",   label: "RoachX Gel Treatment",       price: "₹399*",  to: "/product/roachx-gel-treatment" },
  { id: "gpc",      label: "General Pest Control",       price: "₹899*",  to: "/subcategory/general-pest-control" },
  { id: "std-cock", label: "Standard Cockroach Control", price: "₹999*",  to: "/subcategory/cockroach-control-services-in-bangalore" },
  { id: "6d",       label: "6D Prime Cockroach",         price: "₹1199*", to: "/product/cockroach-control-services-in-bangalore" },
  { id: "bb",       label: "Bedbugs Standard",           price: "₹2499*", to: "/subcategory/bed-bug-control-services-in-bangalore" },
];

export default function OffersModal({ open, onClose }) {
  const reduceMotion = useReducedMotion();
  const navigate = useNavigate();
  const firstFocusable = useRef(null);

  useEffect(() => {
    if (open) firstFocusable.current?.focus();
    const onKey = (e) => { if (e.key === "Escape") onClose?.(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const overlay = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: reduceMotion ? 0 : 0.2 } },
    exit: { opacity: 0 },
  };

  const modal = {
    hidden: { y: "100%" },
    show: { y: 0, transition: { type: "spring", damping: 22, stiffness: 250 } },
    exit: { y: "100%" },
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="om__overlay"
          initial="hidden"
          animate="show"
          exit="exit"
          variants={overlay}
        >
          <motion.div
            className="om__modal"
            role="dialog"
            aria-modal="true"
            variants={modal}
          >
            {/* Header */}
            <header className="om__header">
              <h2>🎉 Limited-Time Offers Just for You!</h2>
              <button
                ref={firstFocusable}
                className="om__close"
                aria-label="Close"
                onClick={onClose}
              >
                <X size={22} />
              </button>
            </header>
            <p className="om__sub">Book now before they expire!</p>

            {/* Offers List */}
            <div className="om__content">
              {OFFERS.map((offer) => (
                <div key={offer.id} className="om__row">
                  <div className="om__left">
                    <span className="om__pill">LIMITED</span>
                    <Shield size={16} className="om__icon" />
                  </div>
                  <div className="om__details">
                    <span className="om__name">{offer.label}</span>
                    <span className="om__price">{offer.price}</span>
                  </div>
                  <button
                    className="om__cta"
                    onClick={() => {
                      onClose?.();
                      navigate(offer.to);
                    }}
                  >
                    Book Now
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
