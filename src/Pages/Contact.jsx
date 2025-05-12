import emailjs from "@emailjs/browser";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import ContactSvg from "../components/ContactSvg";

const Contact = () => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    setSuccess(false);
    setError(false);

    emailjs
      .sendForm(
        import.meta.env.VITE_SERVICE_ID,
        import.meta.env.VITE_TEMPLATE_ID,
        form.current,
        {
          publicKey: import.meta.env.VITE_PUBLIC_KEY,
        }
      )
      .then(
        () => {
          setSuccess(true);
          form.current.reset();
        },
        (error) => {
          console.log("EMAILJS ERROR:", error);
          setError(true);
        }
      );
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-8 lg:gap-16 p-4 sm:p-8 relative overflow-hidden">
      {/* Apply the specified gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] to-[#0a0a0a]/95" />
      <div className="absolute inset-0 bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#915EFF]/10 via-transparent to-transparent" />

      {/* Content with higher z-index */}
      <div className="relative z-10 w-full max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#915EFF] to-purple-400">
            Ready to Bring Your Ideas to Life?
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            I'm passionate about creating exceptional digital experiences.
            Whether you need a stunning website, a powerful web application, or
            technical consultation, I'm here to help transform your vision into
            reality.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact SVG and Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col items-center gap-8"
          >
            <div className="w-full max-w-md mx-auto">
              <ContactSvg />
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.4 }}
              className="w-full bg-slate-800/30 backdrop-blur-lg p-6 rounded-2xl border border-[#915EFF]/20 shadow-xl"
            >
              <h3 className="text-xl font-semibold text-white mb-4">
                Why Work With Me?
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-purple-400 text-xl">✓</span>
                  <span className="text-gray-300">
                    Dedicated to delivering high-quality, responsive designs
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-400 text-xl">✓</span>
                  <span className="text-gray-300">
                    Strong focus on performance and user experience
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-400 text-xl">✓</span>
                  <span className="text-gray-300">
                    Clear communication throughout the development process
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-400 text-xl">✓</span>
                  <span className="text-gray-300">
                    Committed to meeting deadlines and project requirements
                  </span>
                </li>
              </ul>
            </motion.div>
          </motion.div>

          {/* Form Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="mb-6 bg-slate-800/40 backdrop-blur-sm p-6 rounded-xl border border-[#915EFF]/30"
            >
              <h3 className="text-xl font-semibold text-white mb-2">
                Let's Discuss Your Project
              </h3>
              <p className="text-gray-300">
                Fill out the form below, and I'll get back to you within 24
                hours to discuss how we can collaborate.
              </p>
            </motion.div>

            <motion.form
              ref={form}
              onSubmit={sendEmail}
              className="w-full bg-slate-800/30 backdrop-blur-lg p-8 rounded-2xl border border-[#915EFF]/20 shadow-xl"
            >
              <motion.div className="flex flex-col gap-2 mb-4">
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-purple-300"
                >
                  Your Name
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  required
                  className="p-3 bg-slate-700/50 border border-purple-600/50 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all"
                />
              </motion.div>
              <motion.div className="flex flex-col gap-2 mb-4">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-purple-300"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  required
                  className="p-3 bg-slate-700/50 border border-purple-600/50 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all"
                />
              </motion.div>
              <motion.div className="flex flex-col gap-2 mb-4">
                <label
                  htmlFor="subject"
                  className="text-sm font-medium text-purple-300"
                >
                  Project Type
                </label>
                <input
                  id="subject"
                  type="text"
                  name="subject"
                  placeholder="Website Development, UI/UX Design, etc."
                  required
                  className="p-3 bg-slate-700/50 border border-purple-600/50 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all"
                />
              </motion.div>
              <motion.div className="flex flex-col gap-2 mb-6">
                <label
                  htmlFor="message"
                  className="text-sm font-medium text-purple-300"
                >
                  Project Details
                </label>
                <textarea
                  id="message"
                  rows={6}
                  name="message"
                  placeholder="Tell me about your project goals, timeline, and any specific requirements..."
                  required
                  className="p-3 bg-slate-700/50 border border-purple-600/50 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all resize-none"
                ></textarea>
              </motion.div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold p-3 sm:p-4 rounded-lg cursor-pointer transition-all duration-300 ease-in-out transform shadow-lg w-full"
              >
                Send Message
              </motion.button>
              {success && (
                <motion.span
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-green-400 text-center block mt-4 p-3 bg-green-400/10 rounded-lg border border-green-400/30"
                >
                  Message sent successfully! I'll be in touch soon.
                </motion.span>
              )}
              {error && (
                <motion.span
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-400 text-center block mt-4 p-3 bg-red-400/10 rounded-lg border border-red-400/30"
                >
                  Something went wrong. Please try again or email me directly.
                </motion.span>
              )}
            </motion.form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
