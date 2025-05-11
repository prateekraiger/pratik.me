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
            Let's Connect
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            I'm currently available for freelance projects and full-time
            opportunities.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Form Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.form
              ref={form}
              onSubmit={sendEmail}
              className="w-full bg-slate-800/30 backdrop-blur-lg p-8 rounded-2xl border border-[#915EFF]/20 shadow-xl"
            >
              <motion.div className="flex flex-col gap-2">
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-purple-300"
                >
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  required
                  className="p-3 bg-slate-700/50 border border-purple-600/50 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all"
                />
              </motion.div>
              <motion.div className="flex flex-col gap-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-purple-300"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="your.email@example.com"
                  required
                  className="p-3 bg-slate-700/50 border border-purple-600/50 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all"
                />
              </motion.div>
              <motion.div className="flex flex-col gap-2">
                <label
                  htmlFor="subject"
                  className="text-sm font-medium text-purple-300"
                >
                  Subject
                </label>
                <input
                  id="subject"
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  required
                  className="p-3 bg-slate-700/50 border border-purple-600/50 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all"
                />
              </motion.div>
              <motion.div className="flex flex-col gap-2">
                <label
                  htmlFor="message"
                  className="text-sm font-medium text-purple-300"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows={6}
                  name="message"
                  placeholder="Write your message here..."
                  required
                  className="p-3 bg-slate-700/50 border border-purple-600/50 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all resize-none"
                ></textarea>
              </motion.div>
              <motion.button
                type="submit"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold p-3 sm:p-4 rounded-lg cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg"
              >
                Send Message
              </motion.button>
              {success && (
                <span className="text-green-400 text-center mt-2">
                  Your message has been sent successfully!
                </span>
              )}
              {error && (
                <span className="text-red-400 text-center mt-2">
                  Something went wrong. Please try again.
                </span>
              )}
            </motion.form>
          </motion.div>

          {/* Contact SVG */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col items-center gap-8"
          >
            <ContactSvg />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
