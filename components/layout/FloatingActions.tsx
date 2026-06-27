"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, MessageSquare, Calendar, X } from "lucide-react";

export default function FloatingActions() {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  const actions = [
    {
      icon: Calendar,
      label: "Schedule",
      color: "bg-toyota-red hover:bg-toyota-red-light shadow-red-glow",
      href: "#contact",
      type: "scroll",
    },
    {
      icon: Phone,
      label: "Call Now",
      color: "bg-green-600 hover:bg-green-500",
      href: "tel:+12025531080",
      type: "link",
    },
    {
      icon: MessageSquare,
      label: "Text Me",
      color: "bg-blue-600 hover:bg-blue-500",
      href: "sms:+12025531080",
      type: "link",
    },
  ];

  const handleAction = (action: typeof actions[0]) => {
    if (action.type === "scroll") {
      const el = document.querySelector(action.href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          className="fixed bottom-6 right-4 sm:right-6 z-50 flex flex-col items-end gap-3"
        >
          {/* Action buttons */}
          <AnimatePresence>
            {expanded && (
              <>
                {actions.map((action, i) => {
                  const Icon = action.icon;
                  return (
                    <motion.div
                      key={action.label}
                      initial={{ opacity: 0, x: 20, scale: 0.8 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: 20, scale: 0.8 }}
                      transition={{ delay: (actions.length - 1 - i) * 0.07 }}
                      className="flex items-center gap-2"
                    >
                      <span className="glass-dark text-white text-sm font-medium px-3 py-1.5 rounded-full whitespace-nowrap">
                        {action.label}
                      </span>
                      {action.type === "link" ? (
                        <a
                          href={action.href}
                          className={`w-12 h-12 rounded-full ${action.color} flex items-center justify-center text-white transition-all duration-200 shadow-lg hover:scale-110`}
                          aria-label={action.label}
                        >
                          <Icon className="w-5 h-5" />
                        </a>
                      ) : (
                        <button
                          onClick={() => handleAction(action)}
                          className={`w-12 h-12 rounded-full ${action.color} flex items-center justify-center text-white transition-all duration-200 shadow-lg hover:scale-110`}
                          aria-label={action.label}
                        >
                          <Icon className="w-5 h-5" />
                        </button>
                      )}
                    </motion.div>
                  );
                })}
              </>
            )}
          </AnimatePresence>

          {/* Main toggle button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setExpanded(!expanded)}
            className="w-14 h-14 rounded-full bg-toyota-red hover:bg-toyota-red-light text-white shadow-red-glow-lg flex items-center justify-center transition-all duration-300 animate-pulse-glow"
            aria-label="Contact options"
          >
            <AnimatePresence mode="wait">
              {expanded ? (
                <motion.div key="close" initial={{ rotate: -90 }} animate={{ rotate: 0 }} exit={{ rotate: 90 }}>
                  <X className="w-6 h-6" />
                </motion.div>
              ) : (
                <motion.div key="phone" initial={{ rotate: 90 }} animate={{ rotate: 0 }} exit={{ rotate: -90 }}>
                  <Phone className="w-6 h-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
