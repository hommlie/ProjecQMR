import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Gift } from "lucide-react";
import "./ReferModal.css";

const ReferModal = ({ open, onClose }) => {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="refer-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="refer-modal"
            initial={{ y: 40, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 40, opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {/* Close button */}
            <button
              className="refer-close"
              onClick={onClose}
              aria-label="Close popup"
            >
              <X size={22} />
            </button>

            {/* Header */}
            <div className="refer-header">
              <Gift className="refer-icon" size={36} />
              <h2 className="refer-title">Refer & Earn</h2>
            </div>

            {/* Reward Highlight */}
            <div className="refer-reward">
              🎉 Get <span className="reward-amount">₹500</span> voucher  
              straight into your wallet!
            </div>

            {/* Description */}
            <p className="refer-text">
              Invite your friends and enjoy discounts!  
              Go to <strong>hommlie.com</strong> → <strong>Account</strong> →{" "}
              <strong>Refer a Friend</strong> → <strong>Refer & Earn</strong>.
            </p>

            {/* Note */}
            <p className="refer-note">
              💡 The reward will be credited once your friend successfully
              completes a service with Hommlie.
            </p>

            {/* CTA */}
            <a
              href="https://www.hommlie.com"
              target="_blank"
              rel="noopener noreferrer"
              className="refer-btn"
            >
              Go to Hommlie
            </a>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ReferModal;
