import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Navbar as NextNavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link as NextLink,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  Button,
} from "@heroui/react";
import {
  FaLinkedinIn,
  FaGithub,
  FaTwitterSquare,
  FaInstagram,
} from "react-icons/fa";
import logo from "../assets/logo.png";

const Navbar = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
  };

  const logoVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const avatarVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
      },
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <NextNavbar className="py-4 px-4 md:px-8 fixed w-full top-0 z-50 bg-transparent">
      <div className="max-w-[1920px] w-full mx-auto">
        <div className="relative rounded-full px-6 py-3 flex justify-between items-center">
          {/* Purple Accent - keep this for a subtle accent */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#915EFF_0%,transparent_50%)] opacity-30 rounded-full"></div>

          {/* Glass Effect - enhanced blur and transparency */}
          <div className="absolute inset-0 backdrop-blur-xl bg-gradient-to-r from-black/5 to-black/10 rounded-full border border-[#915EFF]/20 shadow-[0_0_15px_rgba(145,94,255,0.1)]"></div>

          {/* Content */}
          <div className="relative z-10 flex justify-between items-center w-full">
            {/* Logo Section - Left */}
            <motion.div
              variants={logoVariants}
              initial="hidden"
              animate="visible"
              className="flex items-center"
            >
              <NavbarBrand className="gap-2 md:gap-4">
                <Link to="/">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="relative cursor-pointer"
                  >
                    <div className="absolute inset-0 bg-[#915EFF]/20 blur-xl rounded-full"></div>
                    <img
                      src={logo}
                      alt="logo"
                      className="w-8 h-8 md:w-10 md:h-10 object-contain relative z-10"
                    />
                  </motion.div>
                </Link>
                <Link to="/">
                  <motion.p
                    className="font-bold text-lg md:text-2xl text-white text-glow cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Pratik<span className="text-[#915EFF]">.dev</span>
                  </motion.p>
                </Link>
              </NavbarBrand>
            </motion.div>

            {/* Desktop Navigation - Center */}
            <motion.div
              variants={navVariants}
              initial="hidden"
              animate="visible"
              className="hidden md:flex"
            >
              <div className="flex gap-2">
                {/* Navigation links section */}
                {[
                  { path: "/", label: "Home" },
                  { path: "/about", label: "About" },
                  { path: "/projects", label: "Projects" },
                  { path: "/contact", label: "Contact" },
                ].map((item) => (
                  <motion.div
                    key={item.path}
                    variants={itemVariants}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <NavbarItem isActive={location.pathname === item.path}>
                      <NextLink
                        as={Link}
                        to={item.path}
                        className={`text-base md:text-lg font-medium transition-all duration-300 relative group px-4 py-2 rounded-full ${
                          location.pathname === item.path
                            ? "text-white"
                            : "text-gray-400 hover:text-white"
                        }`}
                      >
                        {item.label}
                        {location.pathname === item.path && (
                          <motion.div
                            layoutId="activeNav"
                            className="absolute inset-0 bg-[#915EFF]/20 rounded-full -z-10"
                            transition={{
                              type: "spring",
                              bounce: 0.2,
                              duration: 0.6,
                            }}
                          />
                        )}
                        <motion.div className="absolute inset-0 bg-[#915EFF]/10 rounded-full -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </NextLink>
                    </NavbarItem>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right Section - Avatar (Desktop) / Menu Button (Mobile) */}
            <div className="flex items-center gap-4">
              {/* Mobile Menu Button */}
              <Button
                className="md:hidden bg-transparent hover:bg-[#915EFF]/20 p-2 rounded-full border border-[#915EFF]/30"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {isMobileMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </Button>

              {/* Avatar - Hidden on Mobile */}
              <motion.div
                variants={avatarVariants}
                initial="hidden"
                animate="visible"
                className="hidden md:flex items-center"
              >
                <NavbarContent as="div" justify="end">
                  <Dropdown placement="bottom-end">
                    <DropdownTrigger>
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="relative"
                      >
                        <div className="absolute inset-0 bg-[#915EFF]/20 blur-xl rounded-full"></div>
                        <Avatar
                          isBordered
                          as="button"
                          className="transition-transform relative z-10 w-8 h-8"
                          color="secondary"
                          name="Pratik"
                          size="sm"
                          src="https://res.cloudinary.com/dk3pg4zly/image/upload/v1745383781/image_z17yda.jpg"
                          classNames={{
                            base: "ring-1 ring-[#915EFF] ring-offset-1 ring-offset-background w-8 h-8",
                            img: "object-cover w-8 h-8",
                          }}
                        />
                      </motion.div>
                    </DropdownTrigger>
                    <DropdownMenu
                      aria-label="Social Media Links"
                      variant="flat"
                      className="glass border border-[#915EFF]/20"
                    >
                      {[
                        {
                          key: "github",
                          href: "https://github.com/prateekraiger",
                          icon: <FaGithub className="h-5 w-5 text-white" />,
                          label: "GitHub",
                        },
                        {
                          key: "linkedin",
                          href: "https://linkedin.com/in/pratik-r1104/",
                          icon: <FaLinkedinIn className="h-5 w-5 text-white" />,
                          label: "LinkedIn",
                        },
                        {
                          key: "twitter",
                          href: "https://x.com/mrpratik753",
                          icon: (
                            <FaTwitterSquare className="h-5 w-5 text-white" />
                          ),
                          label: "Twitter",
                        },
                        {
                          key: "instagram",
                          href: "https://www.instagram.com/pratik.raiger/",
                          icon: <FaInstagram className="h-5 w-5 text-white" />,
                          label: "Instagram",
                        },
                      ].map((item) => (
                        <DropdownItem key={item.key} className="p-0">
                          <a
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full h-full flex items-center gap-2 px-4 py-2 text-white hover:bg-[#915EFF]/20 transition-colors duration-300"
                          >
                            {item.icon}
                            {item.label}
                          </a>
                        </DropdownItem>
                      ))}
                    </DropdownMenu>
                  </Dropdown>
                </NavbarContent>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu - Only shown when isMobileMenuOpen is true */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={mobileMenuVariants}
            className="md:hidden mt-4 bg-black/50 backdrop-blur-md rounded-xl border border-[#915EFF]/20 overflow-hidden"
          >
            <div className="p-4 flex flex-col gap-2">
              {[
                { path: "/", label: "Home" },
                { path: "/about", label: "About" },
                { path: "/projects", label: "Projects" },
                { path: "/contact", label: "Contact" },
              ].map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-base font-medium transition-all duration-300 px-4 py-3 rounded-lg ${
                    location.pathname === item.path
                      ? "bg-[#915EFF]/20 text-white"
                      : "text-gray-400 hover:text-white hover:bg-[#915EFF]/10"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}

              {/* Social Links in Mobile Menu */}
              <div className="mt-4 flex justify-center gap-4">
                {[
                  {
                    key: "github",
                    href: "https://github.com/prateekraiger",
                    icon: <FaGithub className="h-5 w-5 text-white" />,
                  },
                  {
                    key: "linkedin",
                    href: "https://linkedin.com/in/pratik-r1104/",
                    icon: <FaLinkedinIn className="h-5 w-5 text-white" />,
                  },
                  {
                    key: "twitter",
                    href: "https://x.com/mrpratik753",
                    icon: <FaTwitterSquare className="h-5 w-5 text-white" />,
                  },
                  {
                    key: "instagram",
                    href: "https://www.instagram.com/pratik.raiger/",
                    icon: <FaInstagram className="h-5 w-5 text-white" />,
                  },
                ].map((item) => (
                  <a
                    key={item.key}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-[#915EFF]/10 hover:bg-[#915EFF]/20 rounded-full transition-colors duration-300"
                  >
                    {item.icon}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </NextNavbar>
  );
};

export default Navbar;
