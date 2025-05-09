import emailjs from "@emailjs/browser";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import ContactSvg from "../components/ContactSvg";
import { SocialLinks } from "../components/SocialLinks";

const listVariant = {
  initial: {
    x: 100,
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      staggerChildren: 0.2,
    },
  },
};

const Contact = () => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const form = useRef();
  // Removed 'ref' for isInView as framer-motion's 'whileInView' can be used directly on motion components
  // const isInView = useInView(ref, { margin: "-200px" }); // This hook might be from a different library or an older framer-motion version

  const sendEmail = (e) => {
    e.preventDefault();
    setSuccess(false); // Reset status messages
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
          form.current.reset(); // Reset form fields on success
        },
        (error) => {
          console.log("EMAILJS ERROR:", error);
          setError(true);
        }
      );
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-8 lg:gap-16 p-4 sm:p-8 bg-gradient-to-br from-slate-900 to-purple-900 text-white">
      {/* Work Opportunities Message */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-3xl text-center mb-8"
      >
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
          Open to Work Opportunities
        </h2>
        <p className="text-lg text-gray-300">
          I'm currently available for freelance projects and full-time
          opportunities. Let's collaborate to create something amazing together!
        </p>
      </motion.div>

      <div className="w-full flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16">
        {/* Form Section */}
        <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-4">
          <motion.form
            ref={form}
            onSubmit={sendEmail}
            variants={listVariant}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.3 }}
            className="w-full max-w-lg flex flex-col gap-5 bg-slate-800/50 backdrop-blur-sm p-6 sm:p-8 md:p-10 rounded-2xl shadow-2xl border border-purple-700/50"
          >
            <motion.h1
              variants={listVariant}
              className="text-3xl sm:text-4xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500"
            >
              Let's Keep in Touch
            </motion.h1>
            <motion.div variants={listVariant} className="flex flex-col gap-2">
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
            <motion.div variants={listVariant} className="flex flex-col gap-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-purple-300"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email" // Updated name attribute
                placeholder="your.email@example.com"
                required
                className="p-3 bg-slate-700/50 border border-purple-600/50 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all"
              />
            </motion.div>
            <motion.div variants={listVariant} className="flex flex-col gap-2">
              <label
                htmlFor="subject"
                className="text-sm font-medium text-purple-300"
              >
                Subject
              </label>
              <input
                id="subject"
                type="text"
                name="subject" // Added subject field
                placeholder="Subject"
                required
                className="p-3 bg-slate-700/50 border border-purple-600/50 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all"
              />
            </motion.div>
            <motion.div variants={listVariant} className="flex flex-col gap-2">
              <label
                htmlFor="message"
                className="text-sm font-medium text-purple-300"
              >
                Message
              </label>
              <textarea
                id="message"
                rows={6}
                name="message" // Updated name attribute
                placeholder="Write your message here..."
                required
                className="p-3 bg-slate-700/50 border border-purple-600/50 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all resize-none"
              ></textarea>
            </motion.div>
            <motion.button
              variants={listVariant}
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
        </div>

        {/* SVG Section */}
        <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-4 lg:p-8 gap-12">
          <div className="w-full max-w-md lg:max-w-lg xl:max-w-xl">
            <ContactSvg />
          </div>

          {/* Social Links Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="w-full max-w-md p-6 bg-slate-800/30 backdrop-blur-sm rounded-2xl border border-purple-700/30"
          >
            <SocialLinks />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
