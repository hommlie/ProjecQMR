import React, { useMemo } from "react";
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

import "./HomeScreen.css";

export default function HomeScreen() {
  const navigate = useNavigate?.() || ((path) => console.log("navigate:", path));
  const reduceMotion = useReducedMotion();

  const actions = useMemo(
    () => [
      { key: "offers",   title: "View Recent Offers",     subtitle: "Limited-time deals",   icon: Tag },
      { key: "book",     title: "Book New Services",      subtitle: "Pest control & more",  icon: ShoppingBag },
      { key: "feedback", title: "Give Feedback / Rating", subtitle: "Takes 30 seconds",     icon: MessageSquareHeart },
      { key: "complaint",title: "Raise a Complaint",      subtitle: "We fix issues fast",   icon: Flag },
      { key: "callback", title: "Request a Call Back",    subtitle: "Talk to a specialist", icon: PhoneCall },
      { key: "refer",    title: "Refer & Earn",           subtitle: "Invite & get rewards", icon: Gift },
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
    offers: "/offers",
    book: "/services",
    feedback: "/feedback",
    complaint: "/support/complaint",
    callback: "/request-callback",
    refer: "/refer",
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
              onClick={() => navigate(routeMap[key] || "/")}
              className="card"
              aria-label={title}
            >
              <span className="card__edge" aria-hidden="true" />
              <div className="card__body card__body--vertical">
                <div className="card__icon card__icon--center">
                  <Icon className="icon" />
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

        <footer
          className="hs__contact"
          itemScope
          itemType="https://schema.org/LocalBusiness"
        >
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
            {/* LEFT: Info list (optional). If you leave it empty, CTAs expand right-aligned automatically. */}
            <ul className="hs__contact-list">
              {/* Example (uncomment to show):
              <li className="hs__contact-item">
                <MapPin className="ci__icon" aria-hidden="true" />
                <span className="ci__text" itemProp="address">Nagendra Block, Banashankari 1st Stage, Banashankari</span>
              </li>
              <li className="hs__contact-item">
                <PhoneCall className="ci__icon" aria-hidden="true" />
                <a className="ci__link" href="tel:+916363865658" itemProp="telephone">+91 63638 65658</a>
              </li>
              <li className="hs__contact-item">
                <MessageCircle className="ci__icon" aria-hidden="true" />
                <a className="ci__link" href="https://wa.me/916363865658" target="_blank" rel="noopener noreferrer">WhatsApp us</a>
              </li>
              <li className="hs__contact-item">
                <Mail className="ci__icon" aria-hidden="true" />
                <a className="ci__link" href="mailto:reach@hommlie.com" itemProp="email">reach@hommlie.com</a>
              </li>
              <li className="hs__contact-item">
                <Globe className="ci__icon" aria-hidden="true" />
                <a className="ci__link" href="https://www.hommlie.com" target="_blank" rel="noopener noreferrer" itemProp="url">
                  www.hommlie.com
                </a>
              </li>
              */}
            </ul>

            {/* RIGHT: CTAs */}
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
    </main>
  );
}
