import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import {
  Tag,
  ShoppingBag,
  MessageSquareHeart,
  Flag,
  PhoneCall,
  Gift,
  MapPin,
  Mail,
  Globe,
  Clock,
  MessageCircle,
  ArrowRight,
  Sparkles,
} from "lucide-react";

import OffersModal from "../components/OffersModal";
import "./HomeScreen.css";


export default function HomeScreen() {
  const navigate = useNavigate?.() || ((path) => console.log("navigate:", path));
  const reduceMotion = useReducedMotion();
  const [offersOpen, setOffersOpen] = useState(false);

  const actions = useMemo(
    () => [
      { key: "complaint",title: "Raise a Complaint",      subtitle: "We fix issues fast",   icon: Flag },
      { key: "callback", title: "Request a Call Back",    subtitle: "Talk to a specialist", icon: PhoneCall },
      { key: "book",     title: "Book New Services",      subtitle: "Pest control & more",  icon: ShoppingBag },
      { key: "refer",    title: "Refer & Earn",           subtitle: "Invite & get rewards", icon: Gift },
      { key: "offers",   title: "View Recent Offers",     subtitle: "Limited-time deals",   icon: Tag },
      { key: "feedback", title: "Give Feedback / Rating", subtitle: "Takes 30 seconds",     icon: MessageSquareHeart },
      
    ],
    []
  );

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: reduceMotion ? 0 : 0.05, delayChildren: reduceMotion ? 0 : 0.05 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 12 },
    show:   { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
  };

  const routeMap = {
    book: "https://www.hommlie.com/services",
    feedback: "https://www.google.com/maps/place/Hommlie+-+Best+Pest+Control+%26+Home+Services+in+Bangalore/@12.9434865,77.5528263,15.71z/data=!4m6!3m5!1s0x3bae3ffd65961b83:0x1a2fbd7cafae966c!8m2!3d12.9419479!4d77.5517609!16s%2Fg%2F11ldwmwf4t",
    complaint: "https://www.hommlie.com/my-bookings",
    callback: "https://www.hommlie.com/contact-us",
    refer: "/refer",
  };

  const handleAction = (key) => {
    if (key === "offers") {
      setOffersOpen(true);
      return;
    }

    const target = routeMap[key] || "/";
    if (typeof target === "string" && target.startsWith("http")) {
      window.open(target, "_blank", "noopener,noreferrer");
    } else {
      navigate(target);
    }
  };

  return (
    <main className="hs">
      <div className="hs__container">
        <header className="hs__header">
          <div>
            <h1 className="hs__title">Quick Actions</h1>
            <p className="hs__subtitle">Everything you need, one tap away.</p>
          </div>
        </header>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="hs__grid"
        >
          {actions.map(({ key, title, subtitle, icon: Icon }) => (
            <motion.button
              key={key}
              variants={item}
              onClick={() => handleAction(key)}
              className="card"
              aria-label={title}
            >
              <span className="card__edge" aria-hidden="true" />
              <div className="card__body card__body--vertical">
                <div className={`card__icon card__icon--center card__icon--${key}`}>
                  <motion.div
                    animate={{ y: [0, -6, 0], scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: Math.random() * 1.5 }}
                    whileHover={{ scale: 1.2, rotate: 8 }}
                  >
                    <Icon className="icon--animated" />
                  </motion.div>
                </div>
                <div className="card__text card__text--center">
                  <h3 className="card__title card__title--center">{title}</h3>
                  <p className="card__sub card__sub--center">{subtitle}</p>
                </div>
                <svg className="chev chev--inline" viewBox="0 0 20 20" aria-hidden="true">
                  <path d="M7.5 5.5a1 1 0 0 1 1.4-1.4l5 5a1 1 0 0 1 0 1.4l-5 5A1 1 0 0 1 7.5 14.5L11.59 10 7.5 5.9z" />
                </svg>
              </div>
            </motion.button>
          ))}
        </motion.div>

        {/* Contact footer */}
        <footer className="hs__contact" itemScope itemType="https://schema.org/LocalBusiness">
          <div className="hs__contact-head">
            <h2 className="hs__contact-title">Contact Hommlie</h2>
            <div className="hs__contact-badges">
              <span className="badge badge--primary">
                <Clock className="badge__icon" aria-hidden="true" />
                9:00 AM – 9:00 PM (IST)
              </span>
              <span className="badge">
                <Sparkles className="badge__icon" aria-hidden="true" />
                Fast support
              </span>
            </div>
          </div>

          <div className="hs__contact-wrap">
            <ul className="hs__contact-list"></ul>

            <div className="hs__contact-ctas">
              <a className="btn btn--call" href="tel:+916363865658">
                <span className="btn__ico"><PhoneCall className="btn__icon" aria-hidden="true" /></span>
                Call now
                <ArrowRight className="btn__chev" aria-hidden="true" />
              </a>

              <a
                className="btn btn--wa"
                href="https://wa.me/916363865658?text=Hi%20Hommlie%2C%20I%27d%20like%20to%20book%20a%20service."
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="btn__ico"><MessageCircle className="btn__icon" aria-hidden="true" /></span>
                WhatsApp Chat
                <ArrowRight className="btn__chev" aria-hidden="true" />
              </a>

              <a className="btn btn--mail" href="mailto:reach@hommlie.com">
                <span className="btn__ico"><Mail className="btn__icon" aria-hidden="true" /></span>
                Email us
                <ArrowRight className="btn__chev" aria-hidden="true" />
              </a>

              <a
                className="btn btn--outline"
                href="https://www.google.com/maps/search/?api=1&query=Hommlie%20Banashankari"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="btn__ico"><MapPin className="btn__icon" aria-hidden="true" /></span>
                Get directions
                <ArrowRight className="btn__chev" aria-hidden="true" />
              </a>

              <a
                className="btn btn--web"
                href="https://www.hommlie.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="btn__ico"><Globe className="btn__icon" aria-hidden="true" /></span>
                Visit website
                <ArrowRight className="btn__chev" aria-hidden="true" />
              </a>
            </div>
          </div>
        </footer>
      </div>

      {/* Copyright footer at bottom */}
      <footer className="">
        <div className="footer-content">
          <p>
            © {new Date().getFullYear()} ADML TECHNOSERVICES PRIVATE LIMITED. All Rights Reserved. | 
            Powered by Hommlie.
          </p>
        </div>
      </footer>

      {/* Offers modal */}
      <OffersModal open={offersOpen} onClose={() => setOffersOpen(false)} />
    </main>
  );
}
