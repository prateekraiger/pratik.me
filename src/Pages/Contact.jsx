import emailjs from "@emailjs/browser";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import ContactSvg from "../components/ContactSvg";
import Title from "../components/common/Title";
import { useThreeD } from "../contexts/ThreeDContext";

const Contact = () => {
  const { is3DEnabled } = useThreeD();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [form2D, setForm2D] = useState({ name: "", email: "", message: "" });
  const [focus, setFocus] = useState({});
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

  // Handlers for 2D form
  const handleChange2D = (e) => {
    setForm2D({ ...form2D, [e.target.name]: e.target.value });
  };

  const handleFocus = (field) => setFocus({ ...focus, [field]: true });
  const handleBlur = (field) => setFocus({ ...focus, [field]: false });

  const handleSubmit2D = (e) => {
    e.preventDefault();
    setSuccess(false);
    setError(false);

    // Create a temporary form element for EmailJS
    const tempForm = document.createElement("form");
    tempForm.innerHTML = `
      <input name="name" value="${form2D.name}" />
      <input name="email" value="${form2D.email}" />
      <input name="message" value="${form2D.message}" />
    `;

    emailjs
      .sendForm(
        import.meta.env.VITE_SERVICE_ID,
        import.meta.env.VITE_TEMPLATE_ID,
        tempForm,
        {
          publicKey: import.meta.env.VITE_PUBLIC_KEY,
        }
      )
      .then(
        () => {
          setSuccess(true);
          setForm2D({ name: "", email: "", message: "" });
        },
        (error) => {
          console.log("EMAILJS ERROR:", error);
          setError(true);
        }
      );
  };

  // Animation variants for 2D version
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const inputVariants = {
    focus: { scale: 1.03, boxShadow: "0 0 0 2px #6366f1" },
    rest: { scale: 1, boxShadow: "0 0 0 0px #6366f1" },
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-8 lg:gap-16 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] to-[#0a0a0a]/95" />
      <div className="absolute inset-0 bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#915EFF]/10 via-transparent to-transparent" />

      {/* Main content container */}
      <div className="relative z-10 w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-0">
        <div className="text-center mb-12">
          <Title text1="Contact" text2="Me" />
          <p className="text-xl text-gray-300 mt-6">
            I'm passionate about creating exceptional digital experiences.
            Whether you need a stunning website, a powerful web application, or
            technical consultation, I'm here to help transform your vision into
            reality.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#915EFF] to-purple-400">
            Ready to Bring Your Ideas to Life?
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-4 sm:gap-8 items-stretch w-full">
          {/* Left Column - Contact SVG and Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col gap-6 w-full justify-between"
          >
            <div className="w-full flex items-center justify-center max-h-[90rem] sm:max-h-[90rem]">
              <ContactSvg />
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              className="w-full bg-slate-800/30 backdrop-blur-lg p-6 sm:p-12 rounded-2xl border border-[#915EFF]/20 shadow-xl -translate-y-10"
            >
              <h3 className="text-4xl font-semibold text-white mb-6 text-center">
                Why Work With Me?
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-purple-400 text-xl mt-1">✓</span>
                  <span className="text-gray-300 text-xl">
                    Dedicated to delivering high-quality, responsive designs
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-400 text-xl mt-1">✓</span>
                  <span className="text-gray-300 text-xl">
                    Strong focus on performance and user experience
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-400 text-xl mt-1">✓</span>
                  <span className="text-gray-300 text-xl">
                    Clear communication throughout the development process
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-400 text-xl mt-1">✓</span>
                  <span className="text-gray-300 text-xl">
                    Committed to meeting deadlines and project requirements
                  </span>
                </li>
              </ul>
            </motion.div>
          </motion.div>

          {/* Right Column - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col gap-6 w-full"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="w-full bg-slate-800/40 backdrop-blur-sm p-6 sm:p-12 rounded-xl border border-[#915EFF]/30 min-h-[150px]"
            >
              <h3 className="text-4xl font-semibold text-white mb-4 text-center">
                Let's Discuss Your Project
              </h3>
              <p className="text-gray-300 text-xl text-center">
                Fill out the form below, and I'll get back to you within 24
                hours to discuss how we can collaborate.
              </p>
            </motion.div>

            <motion.form
              ref={form}
              onSubmit={sendEmail}
              className="w-full bg-slate-800/30 backdrop-blur-lg p-6 sm:p-12 rounded-2xl border border-[#915EFF]/20 shadow-xl min-h-[300px] sm:min-h-[450px]"
            >
              <div className="space-y-6">
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="name"
                    className="text-base font-medium text-purple-300"
                  >
                    Your Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    placeholder="John Doe"
                    required
                    className="p-6 bg-slate-700/50 border border-purple-600/50 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="email"
                    className="text-base font-medium text-purple-300"
                  >
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    required
                    className="p-6 bg-slate-700/50 border border-purple-600/50 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="subject"
                    className="text-base font-medium text-purple-300"
                  >
                    Project Type
                  </label>
                  <input
                    id="subject"
                    type="text"
                    name="subject"
                    placeholder="Website Development, UI/UX Design, etc."
                    required
                    className="p-6 bg-slate-700/50 border border-purple-600/50 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="message"
                    className="text-base font-medium text-purple-300"
                  >
                    Project Details
                  </label>
                  <textarea
                    id="message"
                    rows={8}
                    name="message"
                    placeholder="Tell me about your project goals, timeline, and any specific requirements..."
                    required
                    className="p-6 bg-slate-700/50 border border-purple-600/50 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all resize-none"
                  ></textarea>
                </div>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-5 px-8 rounded-lg cursor-pointer transition-all duration-300 ease-in-out transform shadow-lg"
                >
                  Send Message
                </motion.button>
              </div>

              {success && (
                <motion.span
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-green-400 text-center block mt-6 p-5 bg-green-400/10 rounded-lg border border-green-400/30"
                >
                  Message sent successfully! I'll be in touch soon.
                </motion.span>
              )}
              {error && (
                <motion.span
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-400 text-center block mt-6 p-5 bg-red-400/10 rounded-lg border border-red-400/30"
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
