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
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#915EFF_0%,transparent_50%)] opacity-20 rounded-full"></div>

          {/* Glass Effect - make it more transparent */}
          <div className="absolute inset-0 backdrop-blur-sm bg-black/5 rounded-full border border-[#915EFF]/20"></div>

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
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="relative"
                >
                  <div className="absolute inset-0 bg-[#915EFF]/20 blur-xl rounded-full"></div>
                  <img
                    src={logo}
                    alt="logo"
                    className="w-8 h-8 md:w-10 md:h-10 object-contain relative z-10"
                  />
                </motion.div>
                <motion.p
                  className="font-bold text-lg md:text-2xl text-white text-glow"
                  whileHover={{ scale: 1.05 }}
                >
                  Pratik<span className="text-[#915EFF]">.dev</span>
                </motion.p>
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
                            ? "bg-[#915EFF] text-white"
                            : "text-white hover:bg-[#915EFF]/20"
                        }`}
                      >
                        {item.label}
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
                          href: "https://github.com/yourusername",
                          icon: (
                            <path
                              fillRule="evenodd"
                              d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                              clipRule="evenodd"
                            />
                          ),
                          label: "GitHub",
                        },
                        {
                          key: "linkedin",
                          href: "https://linkedin.com/in/yourusername",
                          icon: (
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                          ),
                          label: "LinkedIn",
                        },
                        {
                          key: "instagram",
                          href: "https://instagram.com/yourusername",
                          icon: (
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                          ),
                          label: "Instagram",
                        },
                      ].map((item) => (
                        <DropdownItem
                          key={item.key}
                          className="h-14 gap-2 text-white hover:bg-[#915EFF]/20 transition-colors duration-300"
                        >
                          <motion.a
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2"
                            whileHover={{ x: 5 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            <svg
                              className="h-6 w-6 text-[#915EFF]"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              {item.icon}
                            </svg>
                            <span>{item.label}</span>
                          </motion.a>
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

      {/* Mobile Menu - Improved */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            variants={{
              closed: {
                opacity: 0,
                y: -20,
                transition: {
                  duration: 0.3,
                  ease: "easeInOut",
                },
              },
              open: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.4,
                  ease: "easeOut",
                  staggerChildren: 0.1,
                  delayChildren: 0.1,
                },
              },
            }}
            initial="closed"
            animate="open"
            exit="closed"
            className="md:hidden fixed left-4 right-4 top-[90px] rounded-2xl overflow-hidden"
          >
            <div className="relative">
              {/* Background effects for mobile menu */}
              <div className="absolute inset-0 bg-black/70 backdrop-blur-lg"></div>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#915EFF_0%,transparent_70%)] opacity-30"></div>
              <div className="absolute inset-0 border border-[#915EFF]/20 rounded-2xl"></div>

              {/* Menu content */}
              <div className="relative z-10 py-6 px-4">
                <div className="flex flex-col gap-3">
                  {[
                    {
                      path: "/",
                      label: "Home",
                      icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
                    },
                    {
                      path: "/about",
                      label: "About",
                      icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
                    },
                    {
                      path: "/projects",
                      label: "Projects",
                      icon: "M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z",
                    },
                    {
                      path: "/contact",
                      label: "Contact",
                      icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
                    },
                  ].map((item, index) => (
                    <motion.div
                      key={item.path}
                      variants={{
                        closed: { opacity: 0, x: -20 },
                        open: { opacity: 1, x: 0 },
                      }}
                    >
                      <Link
                        to={item.path}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`flex items-center gap-3 text-lg font-medium px-4 py-3 rounded-xl transition-all duration-300 ${
                          location.pathname === item.path
                            ? "bg-[#915EFF] text-white"
                            : "text-white hover:bg-[#915EFF]/20"
                        }`}
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d={item.icon}
                          />
                        </svg>
                        {item.label}
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {/* Social links in mobile menu */}
                <motion.div
                  className="mt-6 pt-6 border-t border-[#915EFF]/20"
                  variants={{
                    closed: { opacity: 0, y: -10 },
                    open: { opacity: 1, y: 0, transition: { delay: 0.3 } },
                  }}
                >
                  <p className="text-[#915EFF] text-sm font-medium mb-4">
                    Connect with me
                  </p>
                  <div className="flex gap-4">
                    {[
                      {
                        key: "github",
                        href: "https://github.com/prateekraiger",
                        icon: "M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z",
                      },
                      {
                        key: "linkedin",
                        href: "https://www.linkedin.com/in/pratik-r1104/",
                        icon: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z",
                      },
                      {
                        key: "twitter",
                        href: "https://x.com/mrpratik753",
                        icon: "M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z",
                      },
                      {
                        key: "instagram",
                        href: "https://www.instagram.com/pratik.raiger/",
                        icon: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z",
                      },
                    ].map((item) => (
                      <a
                        key={item.key}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-[#915EFF]/20 hover:bg-[#915EFF]/40 transition-colors duration-300"
                      >
                        <svg
                          className="h-5 w-5 text-white"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d={item.icon} />
                        </svg>
                      </a>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </NextNavbar>
  );
};

export default Navbar;
