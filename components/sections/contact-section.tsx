"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, MapPin, Linkedin, Github, Twitter, Send } from "lucide-react";
import { LiquidButton } from "@/components/ui/liquid-button";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "hinatabbasum50@gmail.com",
    href: "https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox?compose=jrjtXVbHKKZQGlpHdTBKHPFvKgwGgkVCzXMVFDnBtZLgblHTGzRNFPwMWHncxsjwwZfzbmpk",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Alahabad, Wazirabad, Pakistan",
    href: "https://www.google.com/maps/place/Basti+Qudratabad,+Wazirabad,+Pakistan/@32.4264918,74.1047492,17z/data=!3m1!4b1!4m6!3m5!1s0x391f18a3bdd60865:0x6077113803920139!8m2!3d32.4261648!4d74.1049093!16s%2Fg%2F11f36vj9r8?entry=ttu&g_ep=EgoyMDI2MDEyOC4wIKXMDSoASAFQAw%3D%3D",
  },
  {
    icon: Send, // Using Send icon for Phone/WhatsApp context or just Phone
    label: "Phone",
    value: "+923086221771",
    href: "tel:03086221771",
  }
];

const socialLinks: { icon: any; href: string; label: string }[] = [
  // No social links provided in extracting data
];

import { sendEmail } from "@/lib/actions";

export function ContactSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // 1. Send Email via Server Action
      const result = await sendEmail(formData);

      if (result.success) {
        // 2. Open WhatsApp with the same query
        const phoneNumber = "923086221771";
        const whatsappMsg = encodeURIComponent(
          `*New Query From Portfolio*\n\n*Name:* ${formData.name}\n*Email:* ${formData.email}\n*Message:* ${formData.message}`
        );
        window.open(`https://wa.me/${phoneNumber}?text=${whatsappMsg}`, '_blank');

        // 3. Show Success Animation
        setIsSubmitted(true);
        setFormData({ name: "", email: "", message: "" });
      } else {
        alert(`Failed to send email: ${result.error}`);
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      ref={ref}
      id="contact"
      className="py-20 md:py-28 px-6 relative"
    >
      <div className="container mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24">

          {/* Left Column: Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Get in Touch
              </h2>
              <p className="text-muted-foreground text-lg">
                Open to collaborations on environmental projects and creative design work.
              </p>
            </div>

            <div className="space-y-6 mb-12">
              {contactInfo.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="flex items-center gap-4 p-5 rounded-2xl border border-white/5 bg-white/5 hover:bg-white/10 hover:border-white/10 transition-all duration-300 backdrop-blur-sm"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide font-semibold mb-1">
                      {item.label}
                    </p>
                    <p className="text-foreground font-medium text-lg">
                      {item.value}
                    </p>
                  </div>
                </a>
              ))}
            </div>

            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-12 h-12 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 text-muted-foreground"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Contact Form */}
            <div className="p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-lg shadow-2xl relative overflow-hidden min-h-[500px] flex flex-col justify-center">
              {/* Decorative gradient blob */}
              <div className="absolute -top-20 -right-20 w-60 h-60 bg-primary/20 rounded-full blur-3xl opacity-50 pointer-events-none" />

              {!isSubmitted ? (
                <div className="relative z-10">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-foreground">QUERY</h3>
                    <div className="w-12 h-1 bg-primary mx-auto mt-2 rounded-full" />
                  </div>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium text-foreground ml-1">Name</label>
                      <input
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 focus:border-primary/50 focus:bg-white/10 focus:ring-1 focus:ring-primary/50 text-foreground placeholder:text-muted-foreground/50 outline-none transition-all duration-300"
                        placeholder="Your Name"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium text-foreground ml-1">Email</label>
                      <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 focus:border-primary/50 focus:bg-white/10 focus:ring-1 focus:ring-primary/50 text-foreground placeholder:text-muted-foreground/50 outline-none transition-all duration-300"
                        placeholder="hello@example.com"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium text-foreground ml-1">Message</label>
                      <textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 focus:border-primary/50 focus:bg-white/10 focus:ring-1 focus:ring-primary/50 text-foreground placeholder:text-muted-foreground/50 outline-none transition-all duration-300 min-h-[150px] resize-none"
                        placeholder="Tell me about your project..."
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full group disabled:opacity-70 disabled:pointer-events-none"
                      disabled={isSubmitting}
                    >
                      <div className="relative overflow-hidden rounded-xl bg-primary px-8 py-4 transition-all duration-300 hover:bg-primary/90 flex items-center justify-center gap-2 font-semibold text-primary-foreground">
                        <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
                        {isSubmitting ? (
                          <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                        ) : (
                          <Send className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                        )}
                      </div>
                    </button>
                  </form>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center text-center space-y-4 relative z-10"
                >
                  <div className="w-48 h-48">
                    <DotLottieReact
                      src="https://lottie.host/06673ce5-0599-403b-9b26-1806f4bf4a7a/pLgG051o6t.lottie"
                      loop={false}
                      autoplay
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">Message Sent!</h3>
                  <p className="text-muted-foreground">Thank you for reaching out. I&apos;ll get back to you soon.</p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="text-primary hover:underline font-medium pt-4"
                  >
                    Send another message
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
