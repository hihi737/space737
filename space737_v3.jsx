import { useState, useEffect, useRef } from "react";

const FONTS = `https://fonts.googleapis.com/css2?family=Barlow:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,700&family=Barlow+Condensed:wght@300;400;500;600;700;800;900&family=Noto+Sans+KR:wght@300;400;500&display=swap`;

const T = `
@import url('${FONTS}');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
:root{
  --orange: #e8440a;
  --black:  #0f0f0d;
  --white:  #f5f3ee;
  --dim:    rgba(245,243,238,0.5);
  --faint:  rgba(245,243,238,0.15);
  --rule:   rgba(245,243,238,0.1);
  --rule-o: rgba(232,68,10,0.3);
  --display:'Barlow Condensed',sans-serif;
  --body:   'Barlow',sans-serif;
  --ko:     'Noto Sans KR','Barlow',sans-serif;
}
html{scroll-behavior:smooth;}
body{
  background:var(--black);
  color:var(--white);
  font-family:var(--body);
  font-weight:300;
  overflow-x:hidden;
  cursor:none;
  -webkit-font-smoothing:antialiased;
}

/* CURSOR */
.cur{position:fixed;width:6px;height:6px;background:var(--orange);border-radius:50%;pointer-events:none;z-index:9999;transform:translate(-50%,-50%);}
.cur-o{position:fixed;width:28px;height:28px;border:1px solid rgba(232,68,10,0.6);border-radius:50%;pointer-events:none;z-index:9998;transform:translate(-50%,-50%);transition:all .35s cubic-bezier(.16,1,.3,1);}

/* NAV — orange band, turns black on scroll */
.nav{
  position:fixed;top:0;left:0;right:0;z-index:200;
  display:flex;align-items:center;justify-content:space-between;
  padding:0 48px;height:64px;
  background:var(--orange);
  border-bottom:1px solid transparent;
  transition:background .4s,border-color .4s;
}
.nav.on{
  background:rgba(15,15,13,.96);
  backdrop-filter:blur(12px);
  border-color:var(--rule);
}
.nav-logo{
  font-family:var(--display);font-size:22px;font-weight:900;
  letter-spacing:.06em;color:var(--black);text-decoration:none;cursor:none;
  text-transform:uppercase;line-height:1;transition:color .4s;
}
.nav-logo span{color:rgba(15,15,13,.5);}
.nav.on .nav-logo{color:var(--white);}
.nav.on .nav-logo span{color:var(--orange);}
.nav-links{display:flex;gap:32px;align-items:center;}
.nav-a{
  font-family:var(--body);font-size:11px;font-weight:500;
  letter-spacing:.14em;text-transform:uppercase;
  color:rgba(15,15,13,.65);cursor:none;background:none;border:none;padding:0;
  transition:color .2s;
}
.nav-a:hover{color:var(--black);}
.nav.on .nav-a{color:var(--dim);}
.nav.on .nav-a:hover{color:var(--white);}

/* HERO */
.hero{
  min-height:100vh;
  display:grid;
  grid-template-rows:1fr auto;
  padding-top:64px;
  position:relative;overflow:hidden;
}
.hero-bg{
  position:absolute;inset:0;
  background:radial-gradient(ellipse 70% 60% at 80% 50%, rgba(232,68,10,.12) 0%, transparent 65%);
  pointer-events:none;
}
.hero-strip{
  position:absolute;
  top:0;right:-80px;
  width:420px;height:100%;
  background:var(--orange);
  clip-path:polygon(18% 0,100% 0,100% 100%,0 100%);
  opacity:.07;pointer-events:none;
}
.hero-main{
  display:flex;flex-direction:column;justify-content:center;
  padding:80px 48px 0;
  position:relative;z-index:2;
}
.hero-asd{
  font-family:var(--display);
  font-size:clamp(28px,4vw,56px);
  font-weight:900;letter-spacing:.04em;
  text-transform:uppercase;color:var(--white);
  line-height:1;margin-bottom:12px;
  opacity:0;animation:fadeUp .6s .1s forwards;
}
.hero-eyebrow{
  font-family:var(--body);font-size:11px;font-weight:400;
  letter-spacing:.22em;text-transform:uppercase;color:var(--orange);
  margin-bottom:28px;
  opacity:0;animation:fadeUp .6s .22s forwards;
}
.hero-title{
  font-family:var(--display);
  font-size:clamp(72px,11vw,168px);
  font-weight:800;line-height:.88;
  letter-spacing:-.02em;text-transform:uppercase;
  opacity:0;animation:fadeUp .8s .35s forwards;
}
.hero-title .line2{
  font-weight:200;font-style:italic;
  color:var(--orange);font-size:clamp(64px,10vw,152px);
  display:block;
}
.hero-title .line3{font-weight:800;}
.hero-bottom{
  display:grid;grid-template-columns:1fr 1fr;
  gap:48px;align-items:end;
  padding:48px 48px 56px;
  border-top:1px solid var(--rule);
  margin-top:64px;
  position:relative;z-index:2;
  opacity:0;animation:fadeUp .7s .85s forwards;
}
.hero-desc{font-size:14px;line-height:1.85;color:var(--dim);max-width:380px;}
.hero-right{display:flex;flex-direction:column;align-items:flex-end;gap:24px;}
.btn{
  display:inline-flex;align-items:center;gap:10px;
  font-family:var(--body);font-size:11px;font-weight:500;
  letter-spacing:.14em;text-transform:uppercase;
  color:var(--black);background:var(--orange);
  border:1px solid var(--orange);padding:14px 32px;
  cursor:none;text-decoration:none;
  transition:background .25s,color .25s;
}
.btn:hover{background:transparent;color:var(--orange);}
.btn-ghost{
  background:transparent;color:var(--white);border-color:var(--rule);
}
.btn-ghost:hover{background:var(--white);color:var(--black);}

/* SECTION */
.sec{padding:120px 48px;border-bottom:1px solid var(--rule);position:relative;}
.sec.alt{background:#131310;}
.sec-head{display:grid;grid-template-columns:220px 1fr;gap:48px;margin-bottom:80px;align-items:start;}
.sec-idx{
  font-family:var(--display);font-size:11px;font-weight:500;
  letter-spacing:.2em;text-transform:uppercase;color:var(--orange);
  padding-top:6px;line-height:1.6;
}
.sec-title{
  font-family:var(--display);
  font-size:clamp(40px,5.5vw,72px);
  font-weight:800;line-height:1;
  letter-spacing:-.01em;text-transform:uppercase;
}
.sec-title em{font-style:italic;font-weight:200;color:var(--orange);}
.sec-sub{font-size:14px;line-height:1.85;color:var(--dim);max-width:520px;margin-top:16px;}

/* IMAGE PLACEHOLDER */
.ph{
  background:rgba(245,243,238,.03);
  border:1px dashed rgba(245,243,238,.08);
  display:flex;flex-direction:column;align-items:center;
  justify-content:center;gap:10px;position:relative;overflow:hidden;
}
.ph-label{font-size:9px;letter-spacing:.18em;text-transform:uppercase;color:var(--faint);text-align:center;}

/* MANIFESTO */
.manifesto-body{display:grid;grid-template-columns:220px 1fr;gap:48px;}
.m-quote{
  font-family:var(--display);
  font-size:clamp(24px,3.5vw,44px);
  font-weight:200;font-style:italic;
  line-height:1.35;letter-spacing:-.01em;color:var(--white);
}
.m-quote strong{font-style:normal;font-weight:700;color:var(--orange);}
.m-rule{width:40px;height:2px;background:var(--orange);margin:40px 0;}
.pillars{display:grid;grid-template-columns:repeat(3,1fr);gap:0;border-top:1px solid var(--rule);margin-top:48px;}
.pillar{padding:28px 28px 28px 0;border-right:1px solid var(--rule);}
.pillar:last-child{border-right:none;}
.pillar-n{font-family:var(--display);font-size:10px;font-weight:600;letter-spacing:.2em;color:var(--orange);margin-bottom:8px;}
.pillar-t{font-size:12px;font-weight:400;letter-spacing:.08em;text-transform:uppercase;color:var(--dim);}

/* HERO IMAGE STRIP */
.img-strip{display:grid;grid-template-columns:2fr 1fr 1fr;gap:2px;margin-top:80px;}

/* DESIGNERS */
.d-scroll{display:grid;grid-template-columns:repeat(5,1fr);gap:0;border-top:1px solid var(--rule);}
.d-card{
  padding:40px 32px 40px 0;border-right:1px solid var(--rule);
  cursor:none;transition:background .3s;
  display:flex;flex-direction:column;
}
.d-card:last-child{border-right:none;}
.d-card:hover{background:rgba(232,68,10,.05);}
.d-num{font-family:var(--display);font-size:10px;font-weight:600;letter-spacing:.18em;color:var(--orange);margin-bottom:28px;}
.d-img{margin-bottom:20px;}
.d-alias{
  font-family:var(--display);font-size:18px;font-weight:700;
  text-transform:uppercase;letter-spacing:.02em;
  color:var(--white);margin-bottom:8px;line-height:1.2;
  white-space:pre-line;
}
.d-style{
  font-family:var(--display);font-size:12px;font-weight:200;
  font-style:italic;color:var(--orange);margin-bottom:16px;line-height:1.4;
}
.d-desc{font-size:12px;line-height:1.8;color:var(--dim);margin-bottom:18px;flex:1;}
.d-tags{display:flex;flex-wrap:wrap;gap:4px;margin-bottom:20px;}
.tag{
  font-size:9px;font-weight:500;letter-spacing:.1em;text-transform:uppercase;
  color:rgba(232,68,10,.7);border:1px solid var(--rule-o);padding:3px 8px;
}
.dl-btn{
  display:inline-flex;align-items:center;gap:8px;
  font-family:var(--body);font-size:10px;font-weight:500;
  letter-spacing:.14em;text-transform:uppercase;
  color:var(--orange);border:1px solid var(--rule-o);
  padding:10px 16px;cursor:none;text-decoration:none;
  background:transparent;align-self:flex-start;
  transition:background .25s,color .25s,border-color .25s;
  margin-top:auto;
}
.dl-btn:hover{background:var(--orange);color:var(--black);border-color:var(--orange);}
.dl-btn svg{flex-shrink:0;}

/* SERVICES */
.svc-grid{display:grid;grid-template-columns:1fr 1fr;gap:0;border-top:1px solid var(--rule);}
.svc{
  padding:56px 0;border-bottom:1px solid var(--rule);
  display:grid;grid-template-columns:1fr;gap:20px;cursor:none;
  transition:background .3s;
}
.svc:hover{background:rgba(232,68,10,.04);}
.svc:nth-child(odd){border-right:1px solid var(--rule);padding-right:48px;}
.svc:nth-child(even){padding-left:48px;}
.svc-head{display:flex;justify-content:space-between;align-items:baseline;}
.svc-num{font-family:var(--display);font-size:10px;font-weight:600;letter-spacing:.18em;color:var(--orange);}
.svc-arrow{font-size:18px;color:rgba(232,68,10,.4);transition:transform .3s,color .3s;}
.svc:hover .svc-arrow{transform:translate(4px,-4px);color:var(--orange);}
.svc-name{font-family:var(--display);font-size:36px;font-weight:800;text-transform:uppercase;letter-spacing:-.01em;line-height:1;}
.svc-sub{font-family:var(--display);font-size:12px;font-weight:400;letter-spacing:.12em;text-transform:uppercase;color:var(--orange);}
.svc-desc{font-size:13px;line-height:1.85;color:var(--dim);}

/* POPUP */
.popup-layout{display:grid;grid-template-columns:1fr 380px;gap:80px;}
.p-stats{display:flex;flex-direction:column;gap:0;border-top:1px solid var(--rule);margin-top:48px;}
.p-stat{display:flex;gap:28px;align-items:baseline;padding:24px 0;border-bottom:1px solid var(--rule);}
.p-stat-n{font-family:var(--display);font-size:44px;font-weight:800;color:var(--orange);min-width:120px;letter-spacing:-.02em;line-height:1;}
.p-stat-body{}
.p-stat-t{font-size:11px;font-weight:500;letter-spacing:.12em;text-transform:uppercase;color:var(--white);margin-bottom:4px;}
.p-stat-d{font-size:12px;line-height:1.7;color:var(--dim);}
.marquee-wrap{overflow:hidden;border-top:1px solid var(--rule);border-bottom:1px solid var(--rule);padding:14px 0;margin:56px 0;}
.marquee{display:flex;gap:48px;animation:marquee 22s linear infinite;white-space:nowrap;}
.marquee span{font-family:var(--display);font-size:11px;font-weight:500;letter-spacing:.18em;text-transform:uppercase;color:rgba(245,243,238,.2);flex-shrink:0;}
.marquee span.hi{color:var(--orange);}
.popup-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:2px;}

/* ARTISTS */
.artist-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:0;border-top:1px solid var(--rule);}
.artist{padding:56px 40px 56px 0;border-right:1px solid var(--rule);cursor:none;transition:background .3s;}
.artist:hover{background:rgba(232,68,10,.04);}
.artist:nth-child(2){padding-left:40px;padding-right:40px;}
.artist:last-child{border-right:none;padding-left:40px;padding-right:0;}
.artist-num{font-family:var(--display);font-size:10px;font-weight:600;letter-spacing:.18em;color:var(--orange);margin-bottom:28px;}
.artist-img{margin-bottom:24px;}
.artist-title{font-family:var(--display);font-size:22px;font-weight:700;text-transform:uppercase;letter-spacing:.02em;line-height:1.15;margin-bottom:10px;}
.artist-medium{font-family:var(--display);font-size:11px;font-weight:400;letter-spacing:.12em;text-transform:uppercase;color:var(--orange);margin-bottom:16px;}
.artist-bio{font-size:13px;line-height:1.85;color:var(--dim);margin-bottom:28px;flex:1;}
.artist-actions{display:flex;flex-direction:column;gap:10px;margin-top:auto;}

/* CONTACT */
.contact-layout{display:grid;grid-template-columns:1fr 1fr;gap:80px;}
.contact-big{
  font-family:var(--display);
  font-size:clamp(60px,8.5vw,120px);
  font-weight:800;line-height:.88;
  letter-spacing:-.02em;text-transform:uppercase;
}
.contact-big em{font-style:italic;font-weight:200;color:var(--orange);}
.contact-sub{font-size:14px;line-height:1.85;color:var(--dim);margin-top:36px;max-width:380px;}
.c-fields{display:flex;flex-direction:column;border-top:1px solid var(--rule);}
.c-row{display:grid;grid-template-columns:120px 1fr;gap:24px;padding:20px 0;border-bottom:1px solid var(--rule);}
.c-label{font-family:var(--display);font-size:10px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;color:var(--orange);padding-top:2px;}
.c-val{font-size:13px;line-height:1.75;color:var(--dim);}
.c-val a{color:var(--white);text-decoration:none;transition:color .2s;}
.c-val a:hover{color:var(--orange);}
.office-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:0;margin-top:80px;border-top:1px solid var(--rule);}
.office{padding:40px 40px 40px 0;border-right:1px solid var(--rule);}
.office:last-child{border-right:none;padding-left:40px;padding-right:0;}
.office:nth-child(2){padding-left:40px;}
.office-city{font-family:var(--display);font-size:11px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;color:var(--orange);margin-bottom:14px;}
.office-addr{font-size:13px;line-height:1.85;color:rgba(245,243,238,.3);white-space:pre-line;}

/* CARD MOTIF BAND — removed, integrated into hero */

/* FOOTER */
footer{
  padding:0 48px;height:52px;
  display:flex;align-items:center;justify-content:space-between;
  border-top:1px solid var(--rule);
}
footer p{font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:rgba(245,243,238,.2);}
footer a{color:rgba(245,243,238,.2);text-decoration:none;transition:color .2s;}
footer a:hover{color:var(--orange);}

/* REVEAL */
.rv{opacity:0;transform:translateY(14px);transition:opacity .8s ease,transform .8s ease;}
.rv.in{opacity:1;transform:none;}
.rv.d1{transition-delay:.08s;}.rv.d2{transition-delay:.16s;}
.rv.d3{transition-delay:.24s;}.rv.d4{transition-delay:.32s;}
.rv.d5{transition-delay:.4s;}

@keyframes fadeUp{from{opacity:0;transform:translateY(16px);}to{opacity:1;transform:none;}}
@keyframes marquee{from{transform:translateX(0);}to{transform:translateX(-50%);}}

@media(max-width:900px){
  .nav{padding:0 20px;}.nav-links{display:none;}
  .hero{padding:90px 20px 0;}
  .hero-bottom{grid-template-columns:1fr;}
  .sec{padding:80px 20px;}.sec-head{grid-template-columns:1fr;gap:20px;}
  .manifesto-body{grid-template-columns:1fr;}
  .d-scroll{grid-template-columns:1fr 1fr;}
  .svc-grid{grid-template-columns:1fr;}
  .svc:nth-child(odd){border-right:none;padding-right:0;}
  .svc:nth-child(even){padding-left:0;}
  .artist-grid{grid-template-columns:1fr;}
  .artist{padding:40px 0 !important;border-right:none !important;border-bottom:1px solid var(--rule);}
  .popup-layout{grid-template-columns:1fr;}
  .popup-grid{grid-template-columns:1fr 1fr;}
  .contact-layout{grid-template-columns:1fr;}
  .office-grid{grid-template-columns:1fr;}
  .office{padding:32px 0 !important;border-right:none !important;border-bottom:1px solid var(--rule);}
  .img-strip{grid-template-columns:1fr;}
  .band{flex-direction:column;gap:20px;text-align:left;}
  .band-sub{text-align:left;}
  footer{flex-direction:column;height:auto;padding:20px;gap:6px;}
}
`;

/* ── HELPERS ── */
function Ph({ h = 280, label = "IMAGE", style = {} }) {
  return (
    <div className="ph" style={{ height: h, ...style }}>
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="rgba(245,243,238,.12)" strokeWidth="1">
        <rect x="1" y="1" width="30" height="30"/>
        <circle cx="10" cy="10" r="3"/>
        <path d="M1 22l9-9 6 6 5-5 10 10"/>
      </svg>
      <span className="ph-label">{label}</span>
    </div>
  );
}

function Reveal({ children, className = "", d = "" }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add("in"); obs.unobserve(el); }
    }, { threshold: 0.06 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return <div ref={ref} className={`rv ${d} ${className}`}>{children}</div>;
}

/* ── DATA ── */
const DESIGNERS = [
  { num:"01", alias:"All-Rounder", style:"Space to Brand, End-to-End", desc:"Spatial strategy, brand narrative, and visual tone — designed as one cohesive flow from the first brief.", tags:["Full-Stack Branding","Spatial Narrative"], pdf:"737(Kim).pdf" },
  { num:"02", alias:"Seoul Scene", style:"Aesthetic Leader", desc:"Layers materials, light, and graphics to capture the air of now. One cinematic frame becomes brand identity.", tags:["Visual Direction","Scene-Making"], pdf:"737(Song).pdf" },
  { num:"03", alias:"Heritage ↔ Modern", style:"Seamlessly", desc:"Translates traditional motifs into contemporary minimalism. Quiet authority through the power of void.", tags:["Heritage–Modern","Zen Minimal"], pdf:"737(Choi.E).pdf" },
  { num:"04", alias:"Pop-Up & Exhibition", style:"Rapid Impact", desc:"Install–run–strike in two weeks. Modular systems built to drive UGC velocity and campaign reach.", tags:["Popup Architecture","UGC Engine"], pdf:"737(Jung.Sr).pdf" },
  { num:"05", alias:"Retail & Hospitality", style:"Dept. Stores / Hotels", desc:"Fluent in retail logic — circulation, revenue touchpoints, and VIP experience all in one.", tags:["Retail & Hospitality","Brand Partnership"], pdf:"737(Kang.S).pdf" },
];

const SERVICES = [
  { num:"2-1", name:"Agit", sub:"Branding & Pop-Up", id:"agit", desc:"We brand the beautiful stories of artists and spaces. Through new collaborations, campaigns, and pop-up experiments, we create creative spaces that drive impact.", alt:true },
  { num:"2-2", name:"Point", sub:"Gallery & Exhibition", id:"point", desc:"This is where art comes to life. Curated exhibitions, artist programs, and Fine-Art Lab 737 — a subtle encounter with art, carefully orchestrated.", alt:false },
  { num:"2-3", name:"Arthaus", sub:"Architecture & Spatial Design", id:"arthaus", desc:"We aesthetically reinterpret buildings and spaces to create new beauty. Elegant, modern solutions that redefine the spaces they inhabit.", alt:true },
  { num:"2-4", name:"Palletta", sub:"Collaborative Shop", id:"palletta", desc:"A space full of the beauty of collaboration. Products with genuine artistic value, born from meetings between genres at 737.", alt:false },
];

const ARTISTS = [
  { num:"01", title:"Visual Art\n& Exhibition", medium:"Fine-Art Lab 737", bio:"Contemporary visual language brought into curated spatial contexts. Portfolio available for preview — enquire to receive the full PDF.", pdf:"parksoyoung(737).pdf", link:null },
  { num:"02", title:"Fine Art\n& Curation", medium:"Fine-Art Lab 737", bio:"A distinct curatorial sensibility within the 737 ecosystem. Bridging exhibition practice and spatial narrative.", pdf:null, link:"mailto:space737.kr@gmail.com" },
  { num:"03", title:"Mixed Media\n& Digital", medium:"Fine-Art Lab 737", bio:"Multidisciplinary practice spanning fine art and experimental visual work across two creative identities.", pdf:null, link:"https://instagram.com/sina_artworkkk/" },
];

const MQ = ["Retail Pop-Up","·","Brand Activation","·","Exhibition Scenography","·","Department Store","·","Hotel Lobby","·","Campaign Space","·","Flagship Store","·","Art Installation","·"];

/* ── MAIN ── */
export default function Space737() {
  const [cx,setCx]=useState(0),[cy,setCy]=useState(0);
  const [ox,setOx]=useState(0),[oy,setOy]=useState(0);
  const [navOn,setNavOn]=useState(false);
  const pos=useRef({mx:0,my:0,ox:0,oy:0});
  const raf=useRef(null);

  useEffect(()=>{
    const mv=e=>{pos.current.mx=e.clientX;pos.current.my=e.clientY;};
    const sc=()=>setNavOn(window.scrollY>50);
    window.addEventListener("mousemove",mv);
    window.addEventListener("scroll",sc);
    const loop=()=>{
      const p=pos.current;
      p.ox+=(p.mx-p.ox)*.11; p.oy+=(p.my-p.oy)*.11;
      setCx(p.mx);setCy(p.my);setOx(p.ox);setOy(p.oy);
      raf.current=requestAnimationFrame(loop);
    };
    raf.current=requestAnimationFrame(loop);
    return()=>{
      window.removeEventListener("mousemove",mv);
      window.removeEventListener("scroll",sc);
      cancelAnimationFrame(raf.current);
    };
  },[]);

  const go=id=>document.getElementById(id)?.scrollIntoView({behavior:"smooth"});

  return(<>
    <style>{T}</style>
    <div className="cur" style={{left:cx,top:cy}}/>
    <div className="cur-o" style={{left:ox,top:oy}}/>

    {/* NAV — orange band → black on scroll */}
    <nav className={`nav${navOn?" on":""}`}>
      <a href="#" className="nav-logo" onClick={e=>{e.preventDefault();go("hero");}}>
        SPACE<span>.</span>737
      </a>
      <div className="nav-links">
        {[["overview","Studio"],["services","Services"],["designers","Designers"],["contact","Contact"]].map(([id,l])=>(
          <button key={id} className="nav-a" onClick={()=>go(id)}>{l}</button>
        ))}
      </div>
    </nav>

    {/* HERO */}
    <section id="hero" className="hero">
      <div className="hero-bg"/>
      <div className="hero-strip"/>
      <div className="hero-main">
        <div className="hero-asd">ART SPACE DESIGN</div>
        <p className="hero-eyebrow">Seoul · Chuncheon · Hong Kong</p>
        <h1 className="hero-title">
          We let<br/>
          <span className="line2">space</span>
          <span className="line3">speak.</span>
        </h1>
      </div>
      <div className="hero-bottom">
        <p className="hero-desc">
          A Seoul-based creative studio crafting immersive spatial narratives.<br/>
          Design, architecture, and brand intelligence woven into experiences that are both poetic and purposeful.
        </p>
        <div className="hero-right">
          <button className="btn" onClick={()=>go("contact")}>
            Start a Project
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 10L10 2M10 2H4M10 2v6"/></svg>
          </button>
        </div>
      </div>
    </section>

    {/* 1. STUDIO OVERVIEW */}
    <section id="overview" className="sec alt">
      <Reveal>
        <div className="manifesto-body">
          <div className="sec-idx">01<br/>Studio<br/>Overview</div>
          <div>
            <p className="m-quote">
              Where <strong>space becomes story,</strong><br/>
              material becomes metaphor,<br/>
              and <strong>silence becomes meaning.</strong>
            </p>
            <div className="m-rule"/>
            <p style={{fontSize:14,lineHeight:1.85,color:"var(--dim)",maxWidth:560}}>
              SPACE.737 is a Seoul-based creative studio that crafts immersive narratives through space. Rooted in contemporary art and cultural nuance, we blend design, architecture, and brand intelligence to build spatial experiences that feel both poetic and purposeful.
            </p>
            <div className="pillars">
              {[["I","Sensory Narrative"],["II","Strategic Aesthetics"],["III","Structural Precision"]].map(([n,t])=>(
                <div key={n} className="pillar">
                  <div className="pillar-n">{n}</div>
                  <div className="pillar-t">{t}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
      <Reveal d="d1">
        <div className="img-strip" style={{marginTop:80}}>
          <Ph h={400} label="Main Space Image"/>
          <Ph h={400} label="Detail 01"/>
          <Ph h={400} label="Detail 02"/>
        </div>
      </Reveal>
    </section>

    {/* 2. SERVICES */}
    <section id="services" className="sec">
      <Reveal>
        <div className="sec-head">
          <div className="sec-idx">02<br/>Services</div>
          <div>
            <h2 className="sec-title">What We<br/><em>Create</em></h2>
          </div>
        </div>
      </Reveal>

      {/* 2-1. AGIT — Branding & Pop-Up */}
      <section id="agit" style={{borderTop:"1px solid var(--rule)",marginTop:0,paddingTop:80,paddingBottom:80}}>
        <Reveal>
          <div className="sec-head" style={{marginBottom:48}}>
            <div className="sec-idx">2-1</div>
            <div>
              <h3 className="sec-title">Agit</h3>
              <div style={{fontFamily:"var(--display)",fontSize:13,fontWeight:500,letterSpacing:".14em",textTransform:"uppercase",color:"var(--orange)",marginTop:8}}>Branding &amp; Pop-Up</div>
            </div>
          </div>
        </Reveal>
        <div className="popup-layout">
          <div>
            <Reveal>
              <p style={{fontSize:14,lineHeight:1.85,color:"var(--dim)",maxWidth:520,marginBottom:48}}>
                We brand the beautiful stories of artists and spaces. Through new collaborations, campaigns, and pop-up experiments, we create creative spaces that drive cultural impact and UGC velocity.
              </p>
            </Reveal>
            <Reveal d="d1">
              <div className="p-stats">
                {[
                  {n:"2 wks",t:"Full install–run–strike cycle",d:"Modular systems for rapid deployment without compromising quality."},
                  {n:"UGC",t:"Built to be shared",d:"Every space engineered for maximum campaign velocity and organic reach."},
                  {n:"Any",t:"Scale",d:"From department store corners to freestanding flagship concepts."},
                ].map(s=>(
                  <div key={s.t} className="p-stat">
                    <div className="p-stat-n">{s.n}</div>
                    <div className="p-stat-body">
                      <div className="p-stat-t">{s.t}</div>
                      <div className="p-stat-d">{s.d}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
          <Reveal d="d2">
            <div>
              <Ph h={460} label="Agit / Pop-Up Image"/>
              <div style={{marginTop:28,display:"flex",flexDirection:"column",gap:14}}>
                <p style={{fontSize:11,letterSpacing:".12em",textTransform:"uppercase",color:"var(--dim)"}}>2025 Partnership Enquiries</p>
                <a href="mailto:space737.kr@gmail.com" className="btn" style={{alignSelf:"flex-start"}}>
                  Request Partnership Deck
                  <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 10L10 2M10 2H4M10 2v6"/></svg>
                </a>
              </div>
            </div>
          </Reveal>
        </div>
        <Reveal d="d1">
          <div className="marquee-wrap" style={{marginTop:56}}>
            <div className="marquee">
              {[...MQ,...MQ].map((item,i)=>(
                <span key={i} className={item==="·"?"hi":""}>{item}</span>
              ))}
            </div>
          </div>
        </Reveal>
        <Reveal d="d2">
          <div className="popup-grid">
            {[1,2,3,4].map(n=><Ph key={n} h={240} label={`Pop-Up Image ${n}`}/>)}
          </div>
        </Reveal>
      </section>

      {/* 2-2. POINT — Gallery & Exhibition */}
      <section id="point" style={{background:"#131310",borderTop:"1px solid var(--rule)",padding:"80px 0"}}>
        <Reveal>
          <div className="sec-head" style={{marginBottom:48}}>
            <div className="sec-idx">2-2</div>
            <div>
              <h3 className="sec-title">Point</h3>
              <div style={{fontFamily:"var(--display)",fontSize:13,fontWeight:500,letterSpacing:".14em",textTransform:"uppercase",color:"var(--orange)",marginTop:8}}>Gallery &amp; Exhibition</div>
            </div>
          </div>
        </Reveal>
        {/* Fine-Art Lab artists — no images */}
        <div className="artist-grid">
          {ARTISTS.map((a,i)=>(
            <Reveal key={a.num} d={`d${i+1}`}>
              <div className="artist" style={{display:"flex",flexDirection:"column"}}>
                <div className="artist-num">Artist {a.num}</div>
                <div className="artist-title" style={{whiteSpace:"pre-line"}}>{a.title}</div>
                <div className="artist-medium">{a.medium}</div>
                <div className="artist-bio">{a.bio}</div>
                <div className="artist-actions">
                  {a.pdf && (
                    <a href={a.pdf} download className="dl-btn">
                      <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 1v7M3 5l3 3 3-3M1 10h10"/></svg>
                      Download Portfolio
                    </a>
                  )}
                  {a.link && (
                    <a href={a.link} className="dl-btn" target={a.link.startsWith("http")?"_blank":"_self"}>
                      <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 10L10 2M10 2H4M10 2v6"/></svg>
                      {a.link.startsWith("http")?"View Work":"Enquire"}
                    </a>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 2-3 & 2-4: Arthaus + Palletta */}
      <div className="svc-grid" style={{borderTop:"1px solid var(--rule)"}}>
        {[
          {num:"2-3",name:"Arthaus",sub:"Architecture & Spatial Design",desc:"We aesthetically reinterpret buildings and spaces to create new beauty. Elegant, modern solutions that redefine the spaces they inhabit."},
          {num:"2-4",name:"Palletta",sub:"Collaborative Shop",desc:"A space full of the beauty of collaboration. Products with genuine artistic value, born from meetings between genres at 737."},
        ].map((s,i)=>(
          <Reveal key={s.num} d={`d${i+1}`}>
            <div className="svc">
              <div className="svc-head">
                <div className="svc-num">{s.num}</div>
                <span className="svc-arrow">↗</span>
              </div>
              <div className="svc-name">{s.name}</div>
              <div className="svc-sub">{s.sub}</div>
              <Ph h={220} label={`${s.name} — Project Image`}/>
              <p className="svc-desc">{s.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>

    {/* 3. DESIGNERS */}
    <section id="designers" className="sec alt">
      <Reveal>
        <div className="sec-head">
          <div className="sec-idx">03<br/>Designer<br/>Portfolio</div>
          <div>
            <h2 className="sec-title">Selected<br/><em>Spatial Works</em></h2>
            <p className="sec-sub">Five specialists. Each fluent in a distinct spatial language. One studio that speaks them all.</p>
          </div>
        </div>
      </Reveal>
      <div className="d-scroll">
        {DESIGNERS.map((d,i)=>(
          <Reveal key={d.num} d={`d${i+1}`}>
            <div className="d-card">
              <div className="d-num">Designer {d.num}</div>
              <div className="d-img"><Ph h={160} label="Portfolio Image"/></div>
              <div className="d-alias">{d.alias}</div>
              <div className="d-style">{d.style}</div>
              <div className="d-desc">{d.desc}</div>
              <div className="d-tags">{d.tags.map(t=><span key={t} className="tag">{t}</span>)}</div>
              <a href={d.pdf} download className="dl-btn">
                <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 1v7M3 5l3 3 3-3M1 10h10"/></svg>
                Download Portfolio
              </a>
            </div>
          </Reveal>
        ))}
      </div>
    </section>

    {/* 4. CONTACT */}
    <section id="contact" className="sec">
      <div className="contact-layout">
        <Reveal>
          <div>
            <div className="sec-idx" style={{marginBottom:40}}>04 — Contact</div>
            <div className="contact-big">Let's<br/>build<br/><em>together.</em></div>
            <p className="contact-sub">Flagship launches, pop-up campaigns, or cultural installations — any project, we'd like to hear from you.</p>
          </div>
        </Reveal>
        <Reveal d="d2">
          <div className="c-fields">
            {[
              {l:"Email",v:<a href="mailto:space737.kr@gmail.com">space737.kr@gmail.com</a>},
              {l:"Tel",v:<>0507-1444-8998<br/>0507-1383-3557</>},
              {l:"Instagram",v:<a href="https://instagram.com/space.737" target="_blank">@space.737</a>},
              {l:"CEO",v:"Choi Bo Yun"},
              {l:"BIN",v:"203-52-03416"},
            ].map(r=>(
              <div key={r.l} className="c-row">
                <div className="c-label">{r.l}</div>
                <div className="c-val">{r.v}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
      <Reveal d="d1">
        <div className="office-grid">
          {[
            {c:"Seoul",a:"118, Eonju-ro\nGangnam-gu, Seoul\nRepublic of Korea"},
            {c:"Chuncheon",a:"11, Sakju-ro 206beon-gil\nChuncheon-si, Gangwon-do\nRepublic of Korea"},
            {c:"Hong Kong",a:"Flat 2119, 21F Metro Centre II\n21 Lam Hing St\nKowloon Bay, KL"},
          ].map(o=>(
            <div key={o.c} className="office">
              <div className="office-city">{o.c}</div>
              <div className="office-addr">{o.a}</div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>

    <footer>
      <p>© 2025 SPACE.737 — All rights reserved</p>
      <p>Directed by <a href="#">Choi Bo Yun</a></p>
      <p><a href="#">Terms</a>&nbsp;·&nbsp;<a href="#">Privacy</a></p>
    </footer>
  </>);
}
