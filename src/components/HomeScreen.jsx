import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Tag,
  ShoppingBag,
  MessageSquareHeart,
  Flag,
  PhoneCall,
  Gift,
} from "lucide-react";

/**
 * HomeScreen.jsx — minimal grid of 6 actions only
 * (No headers, sheets, footer, or extras.)
 * You can wire up onClick handlers later.
 */

export default function HomeScreen() {
  const navigate = useNavigate?.() || ((path) => console.log("navigate:", path));

  const actions = useMemo(
    () => [
      { key: "offers",   title: "View Recent Offers",    subtitle: "Limited-time deals",     icon: Tag,            accent: "from-indigo-500 via-fuchsia-500 to-rose-500" },
      { key: "book",     title: "Book New Services",     subtitle: "Pest control & more",   icon: ShoppingBag,    accent: "from-emerald-500 via-lime-500 to-cyan-500" },
      { key: "feedback", title: "Give Feedback / Rating", subtitle: "Takes 30 seconds",       icon: MessageSquareHeart, accent: "from-amber-500 via-orange-500 to-pink-500" },
      { key: "complaint",title: "Raise a Complaint",      subtitle: "We fix issues fast",     icon: Flag,           accent: "from-rose-500 via-red-500 to-orange-500" },
      { key: "callback", title: "Request a Call Back",    subtitle: "Talk to a specialist",   icon: PhoneCall,      accent: "from-sky-500 via-blue-500 to-indigo-500" },
      { key: "refer",    title: "Refer & Earn",           subtitle: "Invite & get rewards",   icon: Gift,           accent: "from-violet-500 via-purple-500 to-fuchsia-500" },
    ],
    []
  );

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
  };

  const item = {
    hidden: { opacity: 0, y: 16, scale: 0.98 },
    show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 300, damping: 22 } },
  };

  const handleAction = (key) => {
    // TODO: wire these up later
    // example: if (key === 'book') navigate('/services');
    console.log("clicked:", key);
  };

  return (
    <main className="min-h-dvh w-full bg-gradient-to-b from-white to-slate-50 px-4 py-6 sm:px-6">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="mx-auto grid max-w-lg grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3"
      >
        {actions.map(({ key, title, subtitle, icon: Icon, accent }) => (
          <motion.button
            key={key}
            variants={item}
            onClick={() => handleAction(key)}
            className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-3 text-left shadow-sm transition-[transform,box-shadow] hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 active:scale-[0.99]"
            style={{ WebkitTapHighlightColor: "transparent" }}
          >
            {/* subtle gradient edge */}
            <div className={`pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${accent} opacity-90`} />
            <div className="flex items-start gap-3">
              <div className={`rounded-2xl bg-gradient-to-tr ${accent} p-[2px] shadow-sm`}>
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white">
                  <Icon className="h-5 w-5 text-slate-900" />
                </div>
              </div>
              <div className="min-w-0">
                <h3 className="truncate text-[15px] font-semibold text-slate-900">{title}</h3>
                <p className="mt-0.5 line-clamp-2 text-xs text-slate-500">{subtitle}</p>
              </div>
            </div>
          </motion.button>
        ))}
      </motion.div>
    </main>
  );
}
