"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useInView } from "framer-motion";
import {
  Camera, Play, Menu, X, ChevronRight, MapPin, Phone,
  Star, Mail, ArrowRight, Video, Grid, Sparkles, ExternalLink
} from "lucide-react";

/* ─────────────────────────────────────────────
   GLOBAL STYLES
───────────────────────────────────────────── */
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Jost:wght@300;400;500;600&display=swap');

    :root {
      --gold:        #C9A84C;
      --gold-light:  #E8C97A;
      --gold-pale:   #F5EDD6;
      --charcoal:    #1A1A1A;
      --cream:       #F9F5EE;
      --cream-dark:  #EEE8DC;
      --muted:       #7A7267;
    }

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body {
      font-family: 'Jost', sans-serif;
      background: var(--cream);
      color: var(--charcoal);
      overflow-x: hidden;
    }
    .serif { font-family: 'Cormorant Garamond', serif; }
    ::selection { background: var(--gold); color: #fff; }
    ::-webkit-scrollbar { width: 3px; }
    ::-webkit-scrollbar-track { background: var(--cream-dark); }
    ::-webkit-scrollbar-thumb { background: var(--gold); border-radius: 2px; }

    /* Watermark — bottom only, stroke-only, near invisible */
    .soul-watermark {
      position: absolute;
      bottom: -1rem;
      left: 50%;
      transform: translateX(-50%);
      font-family: 'Cormorant Garamond', serif;
      font-size: clamp(5rem, 18vw, 13rem);
      font-style: italic;
      font-weight: 300;
      white-space: nowrap;
      color: transparent;
      -webkit-text-stroke: 1px rgba(201,168,76,0.08);
      pointer-events: none;
      user-select: none;
      letter-spacing: 0.1em;
      line-height: 1;
      z-index: 0;
    }

    /* Gallery filter pills */
    .pill {
      display: inline-flex; align-items: center; gap: 6px;
      padding: 9px 22px;
      font-size: 10px; letter-spacing: 0.3em; text-transform: uppercase; font-weight: 600;
      cursor: pointer; border: 1px solid rgba(201,168,76,0.35);
      transition: all 0.3s; background: transparent; color: var(--muted);
      font-family: 'Jost', sans-serif;
    }
    .pill.active, .pill:hover { background: var(--gold); color: #fff; border-color: var(--gold); }

    /* Nav underline hover */
    .nav-link { position: relative; }
    .nav-link::after {
      content: ''; position: absolute; left: 0; bottom: -4px;
      height: 1px; width: 0; background: var(--gold);
      transition: width 0.3s ease;
    }
    .nav-link:hover::after { width: 100%; }

    /* Service card hover */
    .srv-card { transition: background 0.4s, transform 0.4s, box-shadow 0.4s; }
    .srv-card:hover {
      background: #fff !important;
      transform: translateY(-10px);
      box-shadow: 0 24px 48px -16px rgba(0,0,0,0.07);
    }

    /* Gallery hover */
    .gal-img { transition: transform 0.8s ease; }
    .gal-item:hover .gal-img { transform: scale(1.08); }
    .gal-overlay { opacity: 0; transition: opacity 0.4s; }
    .gal-item:hover .gal-overlay { opacity: 1; }

    /* ── RESPONSIVE ── */
    /* Desktop: show nav links, hide burger */
    .desktop-nav { display: flex; }
    .mob-btn     { display: none; }

    @media (max-width: 768px) {
      .desktop-nav { display: none !important; }
      .mob-btn     { display: flex !important; align-items: center; justify-content: center; }
      .two-col     { grid-template-columns: 1fr !important; gap: 3rem !important; }
      .gal-grid    { grid-template-columns: 1fr 1fr !important; }
      .stats-grid  { grid-template-columns: 1fr 1fr !important; }
    }

    @media (max-width: 480px) {
      .gal-grid  { grid-template-columns: 1fr !important; }
      .stats-grid { grid-template-columns: 1fr 1fr !important; }
    }
  `}</style>
);

/* ─────────────────────────────────────────────
   ANIMATED COUNTER
───────────────────────────────────────────── */
const Counter = ({ to, suffix = "" }: { to: number; suffix?: string }) => {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    let v = 0;
    const step = Math.ceil(to / 80);
    const t = setInterval(() => {
      v += step;
      if (v >= to) { setVal(to); clearInterval(t); } else setVal(v);
    }, 20);
    return () => clearInterval(t);
  }, [inView, to]);
  return <span ref={ref}>{val}{suffix}</span>;
};

/* ─────────────────────────────────────────────
   MARQUEE
───────────────────────────────────────────── */
const Marquee = () => {
  const items = [
    "Weddings","Sangeet Nights","Corporate Galas","Birthday Celebrations",
    "Engagement Parties","Baby Showers","Anniversaries","Award Ceremonies",
    "Product Launches","Farewell Parties","Reception Dinners","Cultural Festivals"
  ];
  return (
    <div style={{ overflow:"hidden", background:"var(--charcoal)", padding:"20px 0", borderTop:"1px solid rgba(201,168,76,0.15)", borderBottom:"1px solid rgba(201,168,76,0.15)" }}>
      <motion.div
        animate={{ x:["0%","-50%"] }}
        transition={{ duration:30, repeat:Infinity, ease:"linear" }}
        style={{ display:"flex", gap:"3rem", width:"max-content", alignItems:"center" }}
      >
        {[...items,...items].map((item,i) => (
          <React.Fragment key={i}>
            <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(1.1rem,2.5vw,1.6rem)", fontStyle:"italic", fontWeight:300, color:"rgba(249,245,238,0.55)", whiteSpace:"nowrap", letterSpacing:"0.05em" }}>{item}</span>
            <span style={{ color:"var(--gold)", fontSize:"0.5rem", opacity:0.6 }}>✦</span>
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   NAVBAR  — burger always visible on mobile
───────────────────────────────────────────── */
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = [
    { name:"Home",     href:"#"        },
    { name:"Our Soul", href:"#about"   },
    { name:"Services", href:"#services"},
    { name:"Gallery",  href:"#gallery" },
    { name:"Connect",  href:"#contact" },
  ];

  const navTextColor = scrolled ? "var(--charcoal)" : "#F9F5EE";

  return (
    <>
      <motion.nav
        initial={{ y:-30, opacity:0 }}
        animate={{ y:0, opacity:1 }}
        transition={{ duration:0.9, ease:"easeOut" }}
        style={{
          position:"fixed", top:0, left:0, right:0, zIndex:100,
          padding: scrolled ? "14px 0" : "28px 0",
          background: scrolled ? "rgba(249,245,238,0.96)" : "transparent",
          backdropFilter: scrolled ? "blur(14px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(201,168,76,0.15)" : "none",
          transition:"all 0.5s ease",
        }}
      >
        <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 1.5rem", display:"flex", justifyContent:"space-between", alignItems:"center" }}>

          {/* Logo */}
          <a href="#" className="serif" style={{ fontSize:26, letterSpacing:"0.25em", color: navTextColor, textDecoration:"none", fontWeight:400, transition:"color 0.4s" }}>
            VISTARA
          </a>

          {/* Desktop links */}
          <div className="desktop-nav" style={{ gap:"2.5rem", alignItems:"center" }}>
            {links.map(l => (
              <a key={l.name} href={l.href} className="nav-link" style={{ fontSize:10, letterSpacing:"0.3em", textTransform:"uppercase", fontWeight:600, color: navTextColor, textDecoration:"none", transition:"color 0.3s" }}
                onMouseEnter={e => e.target.style.color = "var(--gold)"}
                onMouseLeave={e => e.target.style.color = navTextColor}
              >{l.name}</a>
            ))}
            <a href="#contact" style={{ fontSize:10, letterSpacing:"0.3em", textTransform:"uppercase", fontWeight:600, border:"1px solid var(--gold)", color:"var(--gold)", padding:"10px 22px", textDecoration:"none", transition:"all 0.3s" }}
              onMouseEnter={e => { e.currentTarget.style.background="var(--gold)"; e.currentTarget.style.color="#fff"; }}
              onMouseLeave={e => { e.currentTarget.style.background="transparent"; e.currentTarget.style.color="var(--gold)"; }}
            >Book Now</a>
          </div>

          {/* Mobile burger — always rendered, CSS shows/hides */}
          <button
            className="mob-btn"
            onClick={() => setOpen(true)}
            style={{ background:"none", border:"none", cursor:"pointer", color: navTextColor, padding:4, transition:"color 0.4s" }}
            aria-label="Open menu"
          >
            <Menu size={26} />
          </button>

        </div>
      </motion.nav>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x:"100%" }} animate={{ x:0 }} exit={{ x:"100%" }}
            transition={{ type:"spring", damping:25, stiffness:200 }}
            style={{ position:"fixed", inset:0, zIndex:200, background:"var(--charcoal)", display:"flex", flexDirection:"column", padding:"3rem 2rem", justifyContent:"center" }}
          >
            <button onClick={() => setOpen(false)} style={{ position:"absolute", top:"1.75rem", right:"1.75rem", background:"none", border:"1px solid rgba(249,245,238,0.15)", cursor:"pointer", color:"#F9F5EE", width:44, height:44, display:"flex", alignItems:"center", justifyContent:"center", transition:"border-color 0.3s" }}
              onMouseEnter={e => e.currentTarget.style.borderColor="var(--gold)"}
              onMouseLeave={e => e.currentTarget.style.borderColor="rgba(249,245,238,0.15)"}
            ><X size={20} /></button>

            <div className="serif" style={{ fontSize:28, color:"var(--gold)", letterSpacing:"0.3em", marginBottom:"3rem", fontWeight:400 }}>VISTARA</div>

            {links.map((l,i) => (
              <motion.a key={l.name} href={l.href} onClick={() => setOpen(false)}
                initial={{ opacity:0, x:30 }} animate={{ opacity:1, x:0 }} transition={{ delay:i*0.07 }}
                style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(2rem,8vw,3.5rem)", color:"#F9F5EE", textDecoration:"none", fontStyle:"italic", fontWeight:300, borderBottom:"1px solid rgba(249,245,238,0.08)", padding:"1rem 0", display:"block", transition:"color 0.3s" }}
                onMouseEnter={e => e.target.style.color="var(--gold)"}
                onMouseLeave={e => e.target.style.color="#F9F5EE"}
              >{l.name}</motion.a>
            ))}

            <motion.a href="#contact" onClick={() => setOpen(false)}
              initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.4 }}
              style={{ display:"inline-flex", alignItems:"center", gap:10, marginTop:"2.5rem", background:"var(--gold)", color:"#fff", padding:"14px 28px", textDecoration:"none", fontSize:10, letterSpacing:"0.35em", textTransform:"uppercase", fontWeight:600, alignSelf:"flex-start" }}
            >Book Now <ArrowRight size={12} /></motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

/* ─────────────────────────────────────────────
   HERO
───────────────────────────────────────────── */
const Hero = () => {
  const { scrollY } = useScroll();
  const y       = useTransform(scrollY, [0,600], [0,180]);
  const opacity = useTransform(scrollY, [0,500], [1,0]);

  return (
    <section style={{ position:"relative", height:"100svh", overflow:"hidden", background:"#111" }}>
      <motion.div style={{ position:"absolute", inset:0, y }}>
        <img
          src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop"
          alt="Luxury Wedding and Event Management in Rewa, Satna, Sidhi, and Jabalpur - Vistara Events"
          style={{ width:"100%", height:"115%", objectFit:"cover", opacity:0.52 }}
        />
      </motion.div>
      <div style={{ position:"absolute", inset:0, background:"linear-gradient(to bottom,rgba(10,8,6,0.25) 0%,rgba(10,8,6,0.05) 40%,rgba(10,8,6,0.65) 100%)" }} />

      <motion.div style={{ opacity, position:"relative", zIndex:10, height:"100%", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", textAlign:"center", padding:"0 1.5rem" }}>

        <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.3, duration:0.9 }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:"1rem", marginBottom:"1.5rem" }}>
            <div style={{ height:1, width:50, background:"var(--gold)" }} />
            <span style={{ fontSize:10, letterSpacing:"0.5em", textTransform:"uppercase", color:"var(--gold-light)", fontWeight:500 }}>Crafting Memorable Celebrations</span>
            <div style={{ height:1, width:50, background:"var(--gold)" }} />
          </div>
        </motion.div>

        <motion.h1 initial={{ opacity:0, y:50 }} animate={{ opacity:1, y:0 }} transition={{ duration:1.2, delay:0.5, ease:[0.25,0.1,0.25,1] }}
          className="serif"
          style={{ fontSize:"clamp(3rem,10vw,8rem)", color:"#F9F5EE", lineHeight:0.92, letterSpacing:"-0.02em", fontWeight:300, marginBottom:"1.5rem" }}
        >
          VISTARA<br /><span style={{ fontStyle:"italic" }}>Events</span>
        </motion.h1>

        <motion.div initial={{ scaleX:0 }} animate={{ scaleX:1 }} transition={{ duration:1.1, delay:1.2 }}
          style={{ height:1, width:80, background:"var(--gold)", margin:"0 auto 1.5rem", transformOrigin:"left" }}
        />

        <motion.p initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:1.4, duration:0.8 }}
          style={{ color:"rgba(249,245,238,0.7)", maxWidth:480, fontWeight:300, lineHeight:1.85, letterSpacing:"0.04em", fontSize:"clamp(0.85rem,2vw,1rem)", marginBottom:"2.5rem" }}
        >
          Where every detail whispers luxury and every moment tells a story. We don't just manage events — we weave emotions into reality.
        </motion.p>

        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:1.65, duration:0.8 }}
          style={{ display:"flex", gap:"1rem", flexWrap:"wrap", justifyContent:"center" }}
        >
          <a href="#contact" style={{ display:"inline-flex", alignItems:"center", gap:10, background:"var(--gold)", color:"#fff", padding:"13px 30px", textDecoration:"none", fontSize:10, letterSpacing:"0.35em", textTransform:"uppercase", fontWeight:600, transition:"background 0.3s" }}
            onMouseEnter={e => e.currentTarget.style.background="var(--gold-light)"}
            onMouseLeave={e => e.currentTarget.style.background="var(--gold)"}
          >Plan Your Event <ArrowRight size={13} /></a>

          <a href="#gallery" style={{ display:"inline-flex", alignItems:"center", gap:10, background:"transparent", color:"#F9F5EE", border:"1px solid rgba(249,245,238,0.4)", padding:"13px 30px", textDecoration:"none", fontSize:10, letterSpacing:"0.35em", textTransform:"uppercase", fontWeight:600, transition:"all 0.3s" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor="var(--gold)"; e.currentTarget.style.color="var(--gold)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor="rgba(249,245,238,0.4)"; e.currentTarget.style.color="#F9F5EE"; }}
          ><Play size={13} fill="currentColor" /> View Our Work</a>
        </motion.div>
      </motion.div>

      <motion.div animate={{ y:[0,12,0] }} transition={{ repeat:Infinity, duration:2.5, ease:"easeInOut" }}
        style={{ position:"absolute", bottom:"2.5rem", left:"50%", transform:"translateX(-50%)", display:"flex", flexDirection:"column", alignItems:"center", gap:6, zIndex:10 }}
      >
        <span style={{ fontSize:8, letterSpacing:"0.4em", textTransform:"uppercase", color:"rgba(249,245,238,0.4)" }}>Scroll</span>
        <div style={{ width:1, height:56, background:"linear-gradient(to bottom,var(--gold),transparent)" }} />
      </motion.div>
    </section>
  );
};

/* ─────────────────────────────────────────────
   STATS
───────────────────────────────────────────── */
const Stats = () => {
  const stats = [
    { to:800, suffix:"+", label:"Events Curated" },
    { to:12,  suffix:"+", label:"Years of Excellence" },
    { to:98,  suffix:"%", label:"Client Satisfaction" },
    { to:50,  suffix:"+", label:"Expert Artisans" },
  ];
  return (
    <section style={{ background:"var(--charcoal)", padding:"5rem 2rem" }}>
      <div className="stats-grid" style={{ maxWidth:1100, margin:"0 auto", display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"2.5rem", textAlign:"center" }}>
        {stats.map((s,i) => (
          <motion.div key={i} initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:i*0.1, duration:0.6 }}>
            <div className="serif" style={{ fontSize:"clamp(2.6rem,5vw,4.5rem)", color:"var(--gold)", fontWeight:300, lineHeight:1 }}>
              <Counter to={s.to} suffix={s.suffix} />
            </div>
            <div style={{ width:28, height:1, background:"var(--gold)", margin:"1rem auto" }} />
            <span style={{ fontSize:9, letterSpacing:"0.3em", textTransform:"uppercase", color:"rgba(249,245,238,0.4)", fontWeight:500 }}>{s.label}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────
   ABOUT — watermark fixed at bottom, very faint
───────────────────────────────────────────── */
const About = () => (
  <section id="about" style={{ padding:"9rem 2rem 10rem", background:"var(--cream)", position:"relative", overflow:"hidden" }}>

    {/* Watermark — bottom of section, stroke-only, near-invisible */}
    <div className="soul-watermark">Our Soul</div>

    <div style={{ maxWidth:860, margin:"0 auto", textAlign:"center", position:"relative", zIndex:1 }}>
      <motion.span initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true, margin:"-100px" }} transition={{ duration:0.8 }}
        className="serif" style={{ fontSize:"clamp(1.2rem,3vw,1.8rem)", fontStyle:"italic", fontWeight:300, color:"var(--gold)", display:"block", marginBottom:"2rem" }}
      >Our Philosophy</motion.span>

      <motion.h2 initial={{ opacity:0, y:22 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true, margin:"-100px" }} transition={{ duration:0.8, delay:0.15 }}
        className="serif" style={{ fontSize:"clamp(1.8rem,4.5vw,3.5rem)", fontWeight:300, lineHeight:1.3, color:"var(--charcoal)", marginBottom:"2.5rem" }}
      >
        We don't create events. We create{" "}
        <span style={{ color:"var(--gold)", fontStyle:"italic" }}>unforgettable echoes</span>
        {" "}that live in the hearts of your guests forever.
      </motion.h2>

      <motion.div initial={{ scaleX:0 }} whileInView={{ scaleX:1 }} viewport={{ once:true }} transition={{ duration:0.9, delay:0.3 }}
        style={{ height:1, width:60, background:"linear-gradient(to right,transparent,var(--gold),transparent)", margin:"0 auto 2.5rem" }}
      />

      <motion.p initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true, margin:"-100px" }} transition={{ duration:0.8, delay:0.35 }}
        style={{ color:"var(--muted)", fontWeight:300, lineHeight:1.95, letterSpacing:"0.03em", fontSize:"1.05rem", fontStyle:"italic", maxWidth:660, margin:"0 auto 3.5rem" }}
      >
        Based in the heart of Rewa and serving clients across Satna, Sidhi, and Jabalpur, Vistara was born from the desire to elevate Indian hospitality to a global luxury standard. Every flower, every light, and every dish is a piece of our soul — meticulously designed to reflect your unique story.
      </motion.p>

      <motion.div initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.8, delay:0.5 }}
        style={{ display:"flex", flexWrap:"wrap", justifyContent:"center", gap:"0.75rem" }}
      >
        {["Weddings","Corporate Events","Sangeet Nights","Birthday Galas","Engagements","Product Launches","Award Ceremonies","Cultural Festivals"].map((tag,i) => (
          <motion.span key={i}
            initial={{ opacity:0, scale:0.85 }} whileInView={{ opacity:1, scale:1 }}
            viewport={{ once:true }} transition={{ delay:0.5+i*0.05, duration:0.4 }}
            style={{ fontSize:9, letterSpacing:"0.3em", textTransform:"uppercase", fontWeight:500, border:"1px solid rgba(201,168,76,0.3)", color:"var(--muted)", padding:"7px 16px", transition:"all 0.3s", cursor:"default" }}
            whileHover={{ borderColor:"var(--gold)", color:"var(--gold)", scale:1.04 }}
          >{tag}</motion.span>
        ))}
      </motion.div>
    </div>
  </section>
);

/* ─────────────────────────────────────────────
   SERVICES
───────────────────────────────────────────── */
const Services = () => {
  const services = [
    { title:"Floral Artistry",       desc:"Exotic blooms curated to transform spaces into ethereal gardens of wonder." },
    { title:"Grand Infrastructure",  desc:"Sophisticated pandals and VIP lounges built with architectural precision." },
    { title:"Atmospheric Lighting",  desc:"Cinematic light play, warm ambiances, and bespoke chandeliers for every mood." },
    { title:"Epicurean Catering",    desc:"A symphony of flavors served with five-star grace across every cuisine." },
    { title:"Bespoke Entertainment", desc:"World-class artists, live bands, and performers to keep the energy alive." },
    { title:"Impeccable Hospitality",desc:"Personalized guest management ensuring everyone feels like royalty." },
  ];
  return (
    <section id="services" style={{ padding:"8rem 2rem", background:"#fff" }}>
      <div style={{ maxWidth:1200, margin:"0 auto" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:"5rem", flexWrap:"wrap", gap:"2rem" }}>
          <div>
            <motion.span initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }}
              style={{ fontSize:10, letterSpacing:"0.5em", textTransform:"uppercase", color:"var(--gold)", fontWeight:500, display:"block", marginBottom:"1rem" }}>
              What We Offer
            </motion.span>
            <motion.h2 initial={{ opacity:0, x:-20 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ duration:0.8 }}
              className="serif" style={{ fontSize:"clamp(2.5rem,5vw,4rem)", fontWeight:300, color:"var(--charcoal)", lineHeight:1.05 }}>
              Our<br /><span style={{ fontStyle:"italic", color:"var(--gold)" }}>Expertise</span>
            </motion.h2>
          </div>
          <motion.p initial={{ opacity:0, x:20 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ duration:0.8, delay:0.15 }}
            style={{ maxWidth:360, color:"var(--muted)", fontWeight:300, lineHeight:1.85, fontStyle:"italic", fontSize:"0.95rem" }}>
            From intimate ceremonies to grand destination events — we bring a signature touch to every element of every occasion.
          </motion.p>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:"1.5px", background:"rgba(201,168,76,0.12)" }}>
          {services.map((s,i) => (
            <motion.div key={i} className="srv-card"
              initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true, margin:"-50px" }} transition={{ delay:(i%3)*0.1, duration:0.6 }}
              style={{ background:"#fff", padding:"3rem 2.5rem", cursor:"default" }}
            >
              <span className="serif" style={{ fontSize:"1rem", color:"var(--gold)", display:"block", marginBottom:"1.5rem", letterSpacing:"0.1em" }}>0{i+1}</span>
              <h3 className="serif" style={{ fontSize:"1.4rem", color:"var(--charcoal)", marginBottom:"1rem", fontWeight:400, letterSpacing:"0.05em", textTransform:"uppercase" }}>{s.title}</h3>
              <p style={{ fontSize:"0.85rem", color:"var(--muted)", lineHeight:1.85, fontWeight:300 }}>{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────
   GALLERY — fixed images, no Instagram icon
───────────────────────────────────────────── */
const Gallery = () => {
  const [filter, setFilter] = useState("all");
  const [lightbox, setLightbox] = useState(null);

  // All images verified working from Unsplash
  const media = [
    {
      type:"photo",
      src:"https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=800&auto=format&fit=crop",
      label:"Mandap Ceremony", cat:"wedding"
    },
    {
      type:"photo",
      src:"https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=800&auto=format&fit=crop",
      label:"Floral Arch", cat:"decor"
    },
    {
      type:"photo",
      // Replaced broken "Reception Décor" image
      src:"https://images.unsplash.com/photo-1478146059778-26028b07395a?q=80&w=800&auto=format&fit=crop",
      label:"Reception Décor", cat:"wedding"
    },
    {
      type:"photo",
      src:"https://images.unsplash.com/photo-1532712938310-34cb3982ef74?q=80&w=800&auto=format&fit=crop",
      label:"Table Settings", cat:"decor"
    },
    {
      type:"photo",
      src:"https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=800&auto=format&fit=crop",
      label:"Corporate Gala", cat:"corporate"
    },
    {
      type:"photo",
      // Replaced broken "Grand Entrance" image
      src:"https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=800&auto=format&fit=crop",
      label:"Grand Entrance", cat:"wedding"
    },
    {
      type:"video",
      src:"https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=800&auto=format&fit=crop",
      label:"Aarav & Priya — Highlights", cat:"wedding"
    },
    {
      type:"video",
      src:"https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800&auto=format&fit=crop",
      label:"TechIndia Gala 2025", cat:"corporate"
    },
    {
      type:"video",
      src:"https://images.unsplash.com/photo-1530103862676-de8c9debad1d?q=80&w=800&auto=format&fit=crop",
      label:"Birthday Extravaganza", cat:"celebration"
    },
  ];

  const filters = [
    { key:"all",   label:"All Media", icon:Grid   },
    { key:"photo", label:"Photos",    icon:Camera },
    { key:"video", label:"Videos",    icon:Video  },
  ];

  const visible = filter === "all" ? media : media.filter(m => m.type === filter);

  return (
    <section id="gallery" style={{ padding:"8rem 2rem", background:"var(--charcoal)" }}>
      <div style={{ maxWidth:1200, margin:"0 auto" }}>

        {/* Header */}
        <div style={{ textAlign:"center", marginBottom:"4rem" }}>
          <motion.span initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }}
            style={{ fontSize:10, letterSpacing:"0.5em", textTransform:"uppercase", color:"var(--gold)", fontWeight:500, display:"block", marginBottom:"1rem" }}>
            Visual Stories
          </motion.span>
          <motion.h2 initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.8 }}
            className="serif" style={{ fontSize:"clamp(2.5rem,5vw,4rem)", color:"#F9F5EE", fontWeight:300, marginBottom:"2.5rem" }}>
            Our Work
          </motion.h2>

          {/* Filter pills */}
          <motion.div initial={{ opacity:0, y:12 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:0.2, duration:0.6 }}
            style={{ display:"flex", justifyContent:"center", gap:"0.75rem", flexWrap:"wrap" }}>
            {filters.map(({ key, label, icon:Icon }) => (
              <button key={key} className={`pill ${filter===key ? "active" : ""}`} onClick={() => setFilter(key)}>
                <Icon size={11} /> {label}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Grid */}
        <motion.div layout className="gal-grid"
          style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:12 }}>
          <AnimatePresence>
            {visible.map((item,i) => (
              <motion.div key={item.label} className="gal-item"
                layout
                initial={{ opacity:0, scale:0.92 }} animate={{ opacity:1, scale:1 }} exit={{ opacity:0, scale:0.92 }}
                transition={{ duration:0.5, delay:i*0.05 }}
                onClick={() => setLightbox(item)}
                style={{ position:"relative", overflow:"hidden", cursor:"pointer", aspectRatio:"4/5" }}
              >
                <img src={item.src} alt={item.label} className="gal-img"
                  style={{ width:"100%", height:"100%", objectFit:"cover", opacity:0.82 }} />

                {/* Hover overlay */}
                <div className="gal-overlay" style={{ position:"absolute", inset:0, background:"linear-gradient(to top,rgba(10,8,6,0.85) 0%,transparent 55%)", display:"flex", flexDirection:"column", justifyContent:"flex-end", padding:"1.5rem" }}>
                  <span style={{ color:"#F9F5EE", fontFamily:"'Cormorant Garamond',serif", fontStyle:"italic", fontSize:"1rem" }}>{item.label}</span>
                </div>

                {/* Video play button — always visible */}
                {item.type === "video" && (
                  <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", width:52, height:52, borderRadius:"50%", border:"1.5px solid rgba(249,245,238,0.7)", display:"flex", alignItems:"center", justifyContent:"center", background:"rgba(0,0,0,0.3)", backdropFilter:"blur(4px)", pointerEvents:"none" }}>
                    <Play size={18} fill="#F9F5EE" color="#F9F5EE" style={{ marginLeft:3 }} />
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* CTA row — no Instagram icon, just text links */}
        <motion.div initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.7, delay:0.3 }}
          style={{ marginTop:"3.5rem", display:"flex", justifyContent:"center", alignItems:"center", gap:"2.5rem", flexWrap:"wrap" }}>

          <a href="https://instagram.com/vistaraevents" target="_blank" rel="noreferrer"
            style={{ display:"inline-flex", alignItems:"center", gap:10, fontSize:10, letterSpacing:"0.3em", textTransform:"uppercase", fontWeight:600, color:"var(--gold)", border:"1px solid rgba(201,168,76,0.35)", padding:"11px 28px", textDecoration:"none", transition:"all 0.3s" }}
            onMouseEnter={e => { e.currentTarget.style.background="var(--gold)"; e.currentTarget.style.color="#fff"; }}
            onMouseLeave={e => { e.currentTarget.style.background="transparent"; e.currentTarget.style.color="var(--gold)"; }}
          >
            <ExternalLink size={12} /> View All on Instagram
          </a>

          <span style={{ color:"rgba(249,245,238,0.15)", fontSize:"0.7rem" }}>|</span>

          <a href="#contact"
            style={{ display:"inline-flex", alignItems:"center", gap:10, fontSize:10, letterSpacing:"0.3em", textTransform:"uppercase", fontWeight:600, color:"rgba(249,245,238,0.5)", textDecoration:"none", transition:"color 0.3s" }}
            onMouseEnter={e => e.currentTarget.style.color="var(--gold)"}
            onMouseLeave={e => e.currentTarget.style.color="rgba(249,245,238,0.5)"}
          >
            Book Your Event <ArrowRight size={12} />
          </a>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
            onClick={() => setLightbox(null)}
            style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.93)", zIndex:300, display:"flex", alignItems:"center", justifyContent:"center", padding:"2rem" }}
          >
            <motion.img initial={{ scale:0.88, opacity:0 }} animate={{ scale:1, opacity:1 }} exit={{ scale:0.88, opacity:0 }}
              src={lightbox.src} alt={lightbox.label}
              style={{ maxWidth:"88vw", maxHeight:"82vh", objectFit:"contain" }}
              onClick={e => e.stopPropagation()}
            />
            <div style={{ position:"absolute", bottom:"2.5rem", left:"50%", transform:"translateX(-50%)", textAlign:"center" }}>
              <span style={{ color:"rgba(249,245,238,0.6)", fontFamily:"'Cormorant Garamond',serif", fontStyle:"italic", fontSize:"1.1rem" }}>{lightbox.label}</span>
            </div>
            <button onClick={() => setLightbox(null)}
              style={{ position:"absolute", top:"1.5rem", right:"1.5rem", background:"none", border:"1px solid rgba(249,245,238,0.2)", cursor:"pointer", color:"#F9F5EE", width:44, height:44, display:"flex", alignItems:"center", justifyContent:"center", transition:"border-color 0.3s" }}
              onMouseEnter={e => e.currentTarget.style.borderColor="var(--gold)"}
              onMouseLeave={e => e.currentTarget.style.borderColor="rgba(249,245,238,0.2)"}
            ><X size={18} /></button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

/* ─────────────────────────────────────────────
   TESTIMONIALS
───────────────────────────────────────────── */
const Testimonials = () => {
  const [active, setActive] = useState(0);
  const reviews = [
    { name:"Priya & Rahul",    role:"Wedding Clients",       text:"Vistara transformed our vision into a reality more beautiful than we could have ever imagined. The attention to detail was absolutely flawless." },
    { name:"Ananya Sharma",    role:"Corporate Gala",        text:"Professional, creative, and deeply dedicated. They managed our annual gala with such grace that our guests are still talking about it months later." },
    { name:"The Singh Family", role:"Anniversary Celebration",text:"From the floral arrangements to the lighting, everything felt straight out of a fairy tale. They truly put their soul into their work." },
  ];
  useEffect(() => {
    const t = setInterval(() => setActive(a => (a+1) % reviews.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <section style={{ padding:"8rem 2rem", background:"var(--cream)" }}>
      <div style={{ maxWidth:780, margin:"0 auto", textAlign:"center" }}>
        <motion.span initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }}
          style={{ fontSize:10, letterSpacing:"0.5em", textTransform:"uppercase", color:"var(--gold)", fontWeight:500, display:"block", marginBottom:"1rem" }}>
          Words of Love
        </motion.span>
        <motion.h2 initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.8 }}
          className="serif" style={{ fontSize:"clamp(2rem,4vw,3rem)", fontWeight:300, color:"var(--charcoal)", marginBottom:"4rem" }}>
          Client <span style={{ fontStyle:"italic", color:"var(--gold)" }}>Stories</span>
        </motion.h2>

        <div style={{ minHeight:280, position:"relative" }}>
          <AnimatePresence mode="wait">
            <motion.div key={active}
              initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-20 }}
              transition={{ duration:0.55 }}
            >
              <div style={{ fontSize:40, color:"var(--gold)", opacity:0.25, marginBottom:"1.5rem", fontFamily:"'Cormorant Garamond',serif", lineHeight:1 }}>"</div>
              <p className="serif" style={{ fontSize:"clamp(1.1rem,2.5vw,1.5rem)", color:"var(--charcoal)", lineHeight:1.75, fontStyle:"italic", fontWeight:300, marginBottom:"2rem" }}>
                {reviews[active].text}
              </p>
              <div style={{ display:"flex", justifyContent:"center", gap:4, marginBottom:"1rem" }}>
                {[...Array(5)].map((_,j) => <Star key={j} size={14} fill="var(--gold)" color="var(--gold)" />)}
              </div>
              <p style={{ fontSize:"0.9rem", fontWeight:600, color:"var(--charcoal)", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:4 }}>{reviews[active].name}</p>
              <p style={{ fontSize:"0.7rem", color:"var(--muted)", letterSpacing:"0.2em", textTransform:"uppercase" }}>{reviews[active].role}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div style={{ display:"flex", justifyContent:"center", gap:10, marginTop:"2.5rem" }}>
          {reviews.map((_,i) => (
            <button key={i} onClick={() => setActive(i)} style={{ height:2, width:active===i ? 32 : 8, background:active===i ? "var(--gold)" : "rgba(201,168,76,0.25)", border:"none", cursor:"pointer", transition:"all 0.4s", borderRadius:2 }} />
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────
   CONTACT
───────────────────────────────────────────── */
const Contact = () => {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ first:"", last:"", email:"", event:"", message:"" });

  return (
    <section id="contact" style={{ padding:"8rem 2rem", background:"#fff", position:"relative", overflow:"hidden" }}>
      <div className="two-col" style={{ maxWidth:1200, margin:"0 auto", display:"grid", gridTemplateColumns:"1fr 1fr", gap:"5rem", alignItems:"start" }}>

        <motion.div initial={{ opacity:0, x:-28 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ duration:0.8 }}>
          <span style={{ fontSize:10, letterSpacing:"0.5em", textTransform:"uppercase", color:"var(--gold)", fontWeight:500, display:"block", marginBottom:"1.25rem" }}>Let's Connect</span>
          <h2 className="serif" style={{ fontSize:"clamp(2.5rem,5vw,4.5rem)", color:"var(--charcoal)", fontWeight:300, lineHeight:1.05, marginBottom:"1.5rem" }}>
            Ready to Craft<br /><span style={{ fontStyle:"italic", color:"var(--gold)" }}>Your Story?</span>
          </h2>
          <p style={{ color:"var(--muted)", lineHeight:1.9, marginBottom:"3rem", maxWidth:400, fontWeight:300, fontSize:"0.95rem" }}>
            Reach out to us to begin planning your extraordinary event in Rewa, Satna, Sidhi, or Jabalpur. We accept a limited number of commissions each year to ensure uncompromising quality.
          </p>

          {[
            { icon:Phone,  label:"Call Us",   val:"+91 91799 99927" },
            { icon:Mail,   label:"Email Us",  val:"hello@vistaraevents.com" },
            { icon:MapPin, label:"Visit Us",  val:"4th Floor, Sneh Aspire, Rewa (M.P.)" },
          ].map(({ icon:Icon, label, val },i) => (
            <motion.div key={i} initial={{ opacity:0, x:-16 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ delay:0.15+i*0.1, duration:0.6 }}
              style={{ display:"flex", alignItems:"center", gap:18, marginBottom:"1.75rem" }}>
              <div style={{ width:44, height:44, borderRadius:"50%", border:"1px solid rgba(201,168,76,0.3)", display:"flex", alignItems:"center", justifyContent:"center", color:"var(--gold)", flexShrink:0 }}>
                <Icon size={18} />
              </div>
              <div>
                <p style={{ fontSize:9, color:"var(--muted)", textTransform:"uppercase", letterSpacing:"0.25em", marginBottom:3 }}>{label}</p>
                <p className="serif" style={{ color:"var(--charcoal)", letterSpacing:"0.04em" }}>{val}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div initial={{ opacity:0, x:28 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ duration:0.8 }}
          style={{ background:"var(--cream)", padding:"3.5rem", boxShadow:"0 20px 60px -20px rgba(0,0,0,0.08)" }}>
          {sent ? (
            <motion.div initial={{ opacity:0, scale:0.9 }} animate={{ opacity:1, scale:1 }} style={{ textAlign:"center", padding:"3rem 0" }}>
              <div style={{ fontSize:48, marginBottom:"1.5rem", color:"var(--gold)" }}>✦</div>
              <h3 className="serif" style={{ fontSize:"2rem", color:"var(--charcoal)", fontWeight:300, fontStyle:"italic", marginBottom:"1rem" }}>Message Received!</h3>
              <p style={{ color:"var(--muted)", fontWeight:300, lineHeight:1.8 }}>Our team will be in touch within 24 hours to begin crafting your experience.</p>
            </motion.div>
          ) : (
            <form onSubmit={e => { e.preventDefault(); setSent(true); }} style={{ display:"flex", flexDirection:"column", gap:"1.75rem" }}>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1.5rem" }}>
                {[["First Name","first"],["Last Name","last"]].map(([lbl,key]) => (
                  <div key={key}>
                    <label style={{ display:"block", fontSize:9, letterSpacing:"0.3em", textTransform:"uppercase", color:"var(--muted)", marginBottom:8 }}>{lbl}</label>
                    <input type="text" value={form[key]} onChange={e => setForm({...form,[key]:e.target.value})}
                      style={{ width:"100%", background:"transparent", border:"none", borderBottom:"1px solid rgba(26,26,26,0.15)", padding:"8px 0", fontSize:14, color:"var(--charcoal)", outline:"none", fontFamily:"'Jost',sans-serif", transition:"border-color 0.3s" }}
                      onFocus={e => e.target.style.borderBottomColor="var(--gold)"}
                      onBlur={e => e.target.style.borderBottomColor="rgba(26,26,26,0.15)"} />
                  </div>
                ))}
              </div>
              {[["Email Address","email","email"],["Event Type & Date","event","text"]].map(([lbl,key,type]) => (
                <div key={key}>
                  <label style={{ display:"block", fontSize:9, letterSpacing:"0.3em", textTransform:"uppercase", color:"var(--muted)", marginBottom:8 }}>{lbl}</label>
                  <input type={type} value={form[key]} onChange={e => setForm({...form,[key]:e.target.value})}
                    style={{ width:"100%", background:"transparent", border:"none", borderBottom:"1px solid rgba(26,26,26,0.15)", padding:"8px 0", fontSize:14, color:"var(--charcoal)", outline:"none", fontFamily:"'Jost',sans-serif", transition:"border-color 0.3s" }}
                    onFocus={e => e.target.style.borderBottomColor="var(--gold)"}
                    onBlur={e => e.target.style.borderBottomColor="rgba(26,26,26,0.15)"} />
                </div>
              ))}
              <div>
                <label style={{ display:"block", fontSize:9, letterSpacing:"0.3em", textTransform:"uppercase", color:"var(--muted)", marginBottom:8 }}>Message</label>
                <textarea rows={4} value={form.message} onChange={e => setForm({...form,message:e.target.value})}
                  style={{ width:"100%", background:"transparent", border:"none", borderBottom:"1px solid rgba(26,26,26,0.15)", padding:"8px 0", fontSize:14, color:"var(--charcoal)", outline:"none", resize:"none", fontFamily:"'Jost',sans-serif", transition:"border-color 0.3s" }}
                  onFocus={e => e.target.style.borderBottomColor="var(--gold)"}
                  onBlur={e => e.target.style.borderBottomColor="rgba(26,26,26,0.15)"} />
              </div>
              <motion.button type="submit" whileHover={{ letterSpacing:"0.45em" }}
                style={{ width:"100%", padding:"15px", background:"var(--charcoal)", color:"var(--cream)", border:"none", cursor:"pointer", fontSize:10, letterSpacing:"0.35em", textTransform:"uppercase", fontWeight:600, transition:"background 0.3s", fontFamily:"'Jost',sans-serif" }}
                onMouseEnter={e => e.currentTarget.style.background="var(--gold)"}
                onMouseLeave={e => e.currentTarget.style.background="var(--charcoal)"}
              >Send Inquiry</motion.button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────
   FOOTER — no Instagram icon (placeholder ✦)
───────────────────────────────────────────── */
const Footer = () => (
  <footer style={{ background:"var(--charcoal)", color:"#F9F5EE", padding:"6rem 2rem 2.5rem", borderTop:"1px solid rgba(249,245,238,0.06)" }}>
    <div style={{ maxWidth:1200, margin:"0 auto" }}>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:"3rem", marginBottom:"4rem" }}>

        <div style={{ gridColumn:"span 2" }}>
          <h3 className="serif" style={{ fontSize:36, letterSpacing:"0.25em", marginBottom:"1rem", color:"var(--gold)", fontWeight:400 }}>VISTARA</h3>
          <div style={{ width:36, height:1, background:"var(--gold)", marginBottom:"1.5rem" }} />
          <p style={{ color:"rgba(249,245,238,0.4)", fontSize:"0.87rem", lineHeight:1.9, fontWeight:300, fontStyle:"italic", maxWidth:320, marginBottom:"2rem" }}>
            The premier event management firm serving Rewa, Satna, Sidhi, and Jabalpur, specializing in luxury weddings, corporate excellence, and every celebration in between.
          </p>
          {/* Social icons — placeholder spots, Instagram to be added later */}
          <div style={{ display:"flex", gap:"0.75rem" }}>
            {[Mail, Phone].map((Icon,i) => (
              <motion.a key={i} href="#" whileHover={{ y:-4 }}
                style={{ width:40, height:40, border:"1px solid rgba(249,245,238,0.12)", display:"flex", alignItems:"center", justifyContent:"center", color:"rgba(249,245,238,0.4)", transition:"all 0.3s", textDecoration:"none" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor="var(--gold)"; e.currentTarget.style.color="var(--gold)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor="rgba(249,245,238,0.12)"; e.currentTarget.style.color="rgba(249,245,238,0.4)"; }}
              ><Icon size={14} /></motion.a>
            ))}
          </div>
        </div>

        <div>
          <h4 style={{ fontSize:9, letterSpacing:"0.35em", textTransform:"uppercase", color:"var(--gold)", marginBottom:"1.5rem", fontWeight:500 }}>Quick Links</h4>
          {["Home","Our Soul","Services","Gallery","Connect"].map(link => (
            <a key={link} href="#" style={{ display:"block", color:"rgba(249,245,238,0.4)", fontSize:"0.85rem", textDecoration:"none", marginBottom:"0.8rem", fontWeight:300, transition:"color 0.3s" }}
              onMouseEnter={e => e.target.style.color="var(--gold)"}
              onMouseLeave={e => e.target.style.color="rgba(249,245,238,0.4)"}
            >{link}</a>
          ))}
        </div>

        <div>
          <h4 style={{ fontSize:9, letterSpacing:"0.35em", textTransform:"uppercase", color:"var(--gold)", marginBottom:"1.5rem", fontWeight:500 }}>Contact</h4>
          <div style={{ display:"flex", flexDirection:"column", gap:"1rem" }}>
            {[
              { icon:Phone,  text:"+91 91799 99927" },
              { icon:Mail,   text:"hello@vistaraevents.com" },
              { icon:MapPin, text:"4th Floor, Sneh Aspire,\nRewa (M.P.)" },
            ].map(({ icon:Icon, text },i) => (
              <div key={i} style={{ display:"flex", gap:12, alignItems:"flex-start" }}>
                <Icon size={13} color="var(--gold)" style={{ marginTop:2, flexShrink:0 }} />
                <span style={{ color:"rgba(249,245,238,0.4)", fontSize:"0.83rem", fontWeight:300, lineHeight:1.6, whiteSpace:"pre-line" }}>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ borderTop:"1px solid rgba(249,245,238,0.06)", paddingTop:"2rem", display:"flex", justifyContent:"space-between", flexWrap:"wrap", gap:"1rem" }}>
        <span style={{ fontSize:9, letterSpacing:"0.25em", textTransform:"uppercase", color:"rgba(249,245,238,0.15)" }}>
          © {new Date().getFullYear()} Vistara Events. All Rights Reserved.
        </span>
        <span style={{ fontSize:9, letterSpacing:"0.25em", textTransform:"uppercase", color:"rgba(249,245,238,0.15)" }}>
          Rewa, Madhya Pradesh
        </span>
      </div>
    </div>
  </footer>
);

/* ─────────────────────────────────────────────
   ROOT
───────────────────────────────────────────── */
export default function VistaraEvents() {
  return (
    <>
      <GlobalStyles />
      <Navbar />
      <Hero />
      <Stats />
      <About />
      <Marquee />
      <Services />
      <Gallery />
      <Testimonials />
      <Contact />
      <Footer />
    </>
  );
}