import emailjs from "@emailjs/browser";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import ContactSvg from "../components/ContactSvg";

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
    <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 p-4 sm:p-8 bg-gradient-to-br from-slate-900 to-purple-900 text-white">
      {/* Form Section */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-4">
        <motion.form
          ref={form}
          onSubmit={sendEmail} // Moved onSubmit to the form element
          variants={listVariant}
          initial="initial"
          whileInView="animate" // Use whileInView for scroll-triggered animations
          viewport={{ once: true, amount: 0.3 }} // Configure viewport for whileInView
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
              htmlFor="user_username"
              className="text-sm font-medium text-purple-300"
            >
              Name
            </label>
            <input
              id="user_username"
              type="text"
              name="user_username"
              placeholder="Your Name"
              required
              className="p-3 bg-slate-700/50 border border-purple-600/50 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all"
            />
          </motion.div>
          <motion.div variants={listVariant} className="flex flex-col gap-2">
            <label
              htmlFor="user_email"
              className="text-sm font-medium text-purple-300"
            >
              Email
            </label>
            <input
              id="user_email"
              type="email"
              name="user_email"
              placeholder="your.email@example.com"
              required
              className="p-3 bg-slate-700/50 border border-purple-600/50 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all"
            />
          </motion.div>
          <motion.div variants={listVariant} className="flex flex-col gap-2">
            <label
              htmlFor="user_message"
              className="text-sm font-medium text-purple-300"
            >
              Message
            </label>
            <textarea
              id="user_message"
              rows={6} // Adjusted rows for a more compact look
              name="user_message"
              placeholder="Write your message here..."
              required
              className="p-3 bg-slate-700/50 border border-purple-600/50 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all resize-none"
            ></textarea>
          </motion.div>
          <motion.button
            variants={listVariant}
            type="submit" // Explicitly set button type
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
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 lg:p-8">
        <div className="w-full max-w-md lg:max-w-lg xl:max-w-xl">
          <ContactSvg />
        </div>
      </div>
    </div>
  );
};

export default Contact;
