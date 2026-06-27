"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Phone,
  MessageSquare,
  Calendar,
  Mail,
  MapPin,
  Send,
  Clock,
  ChevronDown,
} from "lucide-react";

const contactMethods = [
  {
    icon: Phone,
    label: "Call Nahom",
    value: "(202) 553-1080",
    href: "tel:+12025531080",
    description: "Available 9am–8pm, 7 days a week",
    color: "bg-green-600 hover:bg-green-500",
    textColor: "text-green-400",
    borderColor: "hover:border-green-500/30",
    bg: "bg-green-500/10",
  },
  {
    icon: MessageSquare,
    label: "Text Nahom",
    value: "(202) 553-1080",
    href: "sms:+12025531080",
    description: "Fastest response — usually within minutes",
    color: "bg-blue-600 hover:bg-blue-500",
    textColor: "text-blue-400",
    borderColor: "hover:border-blue-500/30",
    bg: "bg-blue-500/10",
  },
  {
    icon: Mail,
    label: "Email Nahom",
    value: "nahom.estifanos@drivetoyotaofkaty.com",
    href: "mailto:nahom.estifanos@drivetoyotaofkaty.com",
    description: "For detailed inquiries and quotes",
    color: "bg-purple-600 hover:bg-purple-500",
    textColor: "text-purple-400",
    borderColor: "hover:border-purple-500/30",
    bg: "bg-purple-500/10",
  },
  {
    icon: MapPin,
    label: "Visit the Dealership",
    value: "Toyota of Katy · Katy, TX",
    href: "https://maps.google.com/?q=Toyota+of+Katy",
    description: "23710 Katy Fwy, Katy, TX 77494",
    color: "bg-toyota-red hover:bg-toyota-red-light",
    textColor: "text-toyota-red",
    borderColor: "hover:border-toyota-red/30",
    bg: "bg-toyota-red/10",
  },
];

const interestOptions = [
  "Buying a New Toyota",
  "Leasing a Toyota",
  "Trade-In Appraisal",
  "Financing Help",
  "Specific Model Inquiry",
  "General Question",
];

const timeOptions = [
  "This week",
  "Today if possible",
  "This weekend",
  "Next week",
  "Just browsing",
];

export default function Contact() {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    interest: "",
    timeline: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed");
      router.push("/thank-you");
    } catch {
      setError("Something went wrong. Please call or text me directly.");
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section-pad relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#050507] via-[#08050C] to-[#050507]" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-toyota-red/6 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-blue-900/8 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto container-pad relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <div className="label-tag mx-auto mb-6">
            <Calendar className="w-3 h-3" />
            Get in Touch
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl mb-5 leading-tight">
            Ready to Find Your
            <br />
            <span className="text-gradient-red">Perfect Toyota?</span>
          </h2>
          <p className="text-ink-secondary text-lg max-w-2xl mx-auto leading-relaxed">
            Reach out any way you prefer. I respond quickly and I&apos;m here
            to answer every question — no pressure, no rush.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10 lg:gap-12">
          {/* Contact methods */}
          <div className="lg:col-span-2 space-y-4">
            {contactMethods.map((method, i) => {
              const Icon = method.icon;
              return (
                <motion.a
                  key={method.label}
                  href={method.href}
                  target={method.href.startsWith("http") ? "_blank" : undefined}
                  rel={method.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ x: 4 }}
                  className={`flex items-center gap-4 p-4 rounded-2xl border border-white/08 ${method.borderColor}
                              ${method.bg} transition-all duration-300 group cursor-pointer`}
                >
                  <div className={`w-12 h-12 rounded-xl ${method.color} flex items-center justify-center flex-shrink-0 transition-colors`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-white text-sm">{method.label}</div>
                    <div className={`font-medium text-sm ${method.textColor} truncate`}>{method.value}</div>
                    <div className="text-ink-muted text-xs">{method.description}</div>
                  </div>
                </motion.a>
              );
            })}

            {/* Hours */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="glass rounded-2xl p-4"
            >
              <div className="flex items-center gap-2 mb-3">
                <Clock className="w-4 h-4 text-gold" />
                <span className="font-semibold text-white text-sm">Business Hours</span>
              </div>
              <div className="space-y-1.5 text-xs text-ink-secondary">
                <div className="flex justify-between">
                  <span>Monday – Friday</span>
                  <span className="text-white">9:00 AM – 8:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span className="text-white">9:00 AM – 7:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span className="text-white">12:00 PM – 5:00 PM</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Appointment form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <form
                onSubmit={handleSubmit}
                className="glass-strong rounded-3xl p-7 md:p-8 space-y-5"
              >
                <div>
                  <h3 className="font-display text-2xl text-white mb-1">
                    Schedule My Appointment
                  </h3>
                  <p className="text-ink-secondary text-sm">
                    Fill this out and I&apos;ll be in touch fast — usually within the hour.
                  </p>
                </div>

                {/* Name + Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-ink-secondary mb-1.5">
                      Full Name *
                    </label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="Your name"
                      className="w-full bg-white/05 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-ink-muted
                                 focus:outline-none focus:border-toyota-red/50 focus:bg-white/08 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-ink-secondary mb-1.5">
                      Phone Number *
                    </label>
                    <input
                      name="phone"
                      type="tel"
                      value={form.phone}
                      onChange={handleChange}
                      required
                      placeholder="(281) 555-0000"
                      className="w-full bg-white/05 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-ink-muted
                                 focus:outline-none focus:border-toyota-red/50 focus:bg-white/08 transition-all"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-medium text-ink-secondary mb-1.5">
                    Email Address
                  </label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className="w-full bg-white/05 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-ink-muted
                               focus:outline-none focus:border-toyota-red/50 focus:bg-white/08 transition-all"
                  />
                </div>

                {/* Interest + Timeline */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-ink-secondary mb-1.5">
                      I&apos;m Interested In *
                    </label>
                    <div className="relative">
                      <select
                        name="interest"
                        value={form.interest}
                        onChange={handleChange}
                        required
                        className="w-full appearance-none bg-[#0D0D12] border border-white/10 rounded-xl px-4 py-3 text-white text-sm
                                   focus:outline-none focus:border-toyota-red/50 transition-all pr-10"
                      >
                        <option value="">Select an option</option>
                        {interestOptions.map((o) => (
                          <option key={o} value={o}>{o}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-3.5 w-4 h-4 text-ink-muted pointer-events-none" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-ink-secondary mb-1.5">
                      My Timeline
                    </label>
                    <div className="relative">
                      <select
                        name="timeline"
                        value={form.timeline}
                        onChange={handleChange}
                        className="w-full appearance-none bg-[#0D0D12] border border-white/10 rounded-xl px-4 py-3 text-white text-sm
                                   focus:outline-none focus:border-toyota-red/50 transition-all pr-10"
                      >
                        <option value="">When are you looking?</option>
                        {timeOptions.map((o) => (
                          <option key={o} value={o}>{o}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-3.5 w-4 h-4 text-ink-muted pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-medium text-ink-secondary mb-1.5">
                    Tell Me More (Optional)
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Which model are you interested in? Do you have a trade-in? Any questions?"
                    className="w-full bg-white/05 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-ink-muted
                               focus:outline-none focus:border-toyota-red/50 focus:bg-white/08 transition-all resize-none"
                  />
                </div>

                <button type="submit" disabled={submitting} className="btn-primary w-full text-base py-4 disabled:opacity-60 disabled:cursor-not-allowed">
                  <Send className="w-5 h-5" />
                  {submitting ? "Sending…" : "Send My Request"}
                </button>

                {error && (
                  <p className="text-red-400 text-sm text-center">{error}</p>
                )}

                <p className="text-ink-muted text-xs text-center">
                  🔒 Your information is never sold or shared. I&apos;ll reach out
                  personally within 1–2 hours.
                </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
