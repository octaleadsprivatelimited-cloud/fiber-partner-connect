import { NavLink, Link } from "react-router-dom";
import { Phone, MessageCircle, Menu, X, Search, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "./Logo";
import { SITE, whatsappLink } from "@/lib/site";

const nav = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Products" },
  { to: "/brands", label: "Brands" },
  { to: "/services", label: "Services" },
  { to: "/gallery", label: "Gallery" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = prev; };
    }
  }, [open]);


  return (
    <header className="sticky top-0 z-50 bg-white">
      {/* Dell-style thin utility top bar — light gray */}
      <div className="hidden md:block bg-[#f3f3f3] text-[#444] text-[11px] border-b border-[#e5e5e5]">
        <div className="mx-auto max-w-7xl container-px flex h-7 items-center justify-end gap-5">
          <a href={`tel:${SITE.phoneRaw}`} className="hover:text-primary inline-flex items-center gap-1.5">
            <Phone className="h-3 w-3" /> {SITE.phone}
          </a>
          <span className="text-[#ccc]">|</span>
          <Link to="/about" className="hover:text-primary">About</Link>
          <Link to="/contact" className="hover:text-primary">Contact</Link>
          <Link to="/gallery" className="hover:text-primary">Gallery</Link>
        </div>
      </div>

      {/* main bar — Dell-style slim, clean */}
      <div className="border-b border-[#e5e5e5]">
        <div className="mx-auto max-w-7xl container-px flex h-14 md:h-16 items-center justify-between gap-6">
          <Link to="/" className="shrink-0 flex items-center"><Logo className="h-12 md:h-14 w-auto" /></Link>

          <nav className="hidden lg:flex items-center gap-7 flex-1 justify-center">
            {nav.slice(1, 6).map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                end={n.to === "/"}
                className={({ isActive }) =>
                  `relative text-[14px] font-normal text-[#1a1a1a] hover:text-primary transition py-1 after:absolute after:left-0 after:right-0 after:-bottom-0.5 after:h-[2px] after:bg-primary after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left ${isActive ? "text-primary after:scale-x-100" : ""}`
                }
              >
                {n.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button aria-label="Search" className="hidden md:inline-flex h-9 w-9 items-center justify-center rounded-full hover:bg-[#f3f3f3]">
              <Search className="h-4 w-4 text-[#1a1a1a]" />
            </button>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center h-9 px-4 sm:px-5 rounded-sm bg-primary text-white text-[13px] font-semibold hover:bg-brand-red-dark transition-colors duration-200"
            >
              <span className="hidden sm:inline">Get a Quote</span>
              <span className="sm:hidden">Quote</span>
            </a>
            <button onClick={() => setOpen(!open)} className="lg:hidden p-2" aria-label="Menu">
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>


      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="lg:hidden fixed inset-0 top-14 bg-black/40 z-40"
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
            />
            <motion.div
              className="lg:hidden fixed right-0 top-14 bottom-0 w-full max-w-[320px] bg-white z-50 overflow-y-auto shadow-2xl"
              initial={{ x: "100%", opacity: 0.5 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0.5 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mx-auto max-w-7xl container-px flex flex-col py-2">
                {nav.map((n, i) => (
                  <motion.div
                    key={n.to}
                    initial={{ x: 30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.05, duration: 0.35, ease: "easeOut" }}
                  >
                    <Link
                      to={n.to}
                      onClick={() => setOpen(false)}
                      className="py-4 text-sm font-semibold uppercase tracking-wide text-brand-black border-b border-border last:border-0 flex items-center justify-between"
                    >
                      {n.label}
                      <ChevronDown className="h-4 w-4 -rotate-90 opacity-50" />
                    </Link>
                  </motion.div>
                ))}
                <motion.a
                  href={`tel:${SITE.phoneRaw}`}
                  className="py-4 text-sm font-semibold text-primary"
                  initial={{ x: 30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: nav.length * 0.05, duration: 0.35, ease: "easeOut" }}
                >
                  <Phone className="inline h-4 w-4 mr-2" />{SITE.phone}
                </motion.a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
