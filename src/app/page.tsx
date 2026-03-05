"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check, Sparkles, Shield, Phone, Mail, MapPin, ChevronRight, ArrowRight, Star, Clock, Droplets } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// CleanPro — Клининговая компания
// Preset A: Organic Tech

const BRAND = {
  name: "CleanPro",
  tagline: "Экологичная чистота для вашего пространства",
  essence: "Профессиональная клининговая компания с экологичным подходом",
  features: [
    {
      title: "Экологичные средства",
      description: "Безопасные биоразлагаемые препараты без вреда для здоровья",
      items: ["Биоразлагаемые", "Гипоаллергенные", "Без химии"]
    },
    {
      title: "Опытные специалисты",
      description: "Профессионалы с опытом от 5 лет и регулярной аттестацией",
      messages: ["Проверка сотрудников", "Страхование ответственности", "Регулярное обучение", "Контроль качества"]
    },
    {
      title: "Гарантия качества",
      description: "Бесплатная повторная уборка при любом недочёте",
      days: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"]
    }
  ],
  cta: "Заказать уборку",
  phone: "+7 (999) 123-45-67",
  email: "info@cleanpro.ru"
};

const PRESET = {
  primary: "#2E4036",      // Moss
  accent: "#CC5833",       // Clay
  background: "#F2F0E9",   // Cream
  dark: "#1A1A1A",         // Charcoal
  text: "#1A1A1A",
  muted: "#5C5C5C"
};

export default function CleanProLanding() {
  const [scrolled, setScrolled] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const philosophyRef = useRef<HTMLDivElement>(null);
  const protocolRef = useRef<HTMLDivElement>(null);

  // Navbar scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animation
      gsap.from(".hero-content > *", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out"
      });

      // Features animation
      gsap.from(".feature-card", {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: featuresRef.current,
          start: "top 80%"
        }
      });

      // Philosophy parallax
      gsap.to(".philosophy-text", {
        y: -50,
        ease: "none",
        scrollTrigger: {
          trigger: philosophyRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }
      });

      // Protocol cards stacking
      const protocolCards = gsap.utils.toArray(".protocol-card");
      protocolCards.forEach((card: any, i) => {
        if (i < protocolCards.length - 1) {
          gsap.to(card, {
            scale: 0.9,
            filter: "blur(20px)",
            opacity: 0.5,
            scrollTrigger: {
              trigger: protocolCards[i + 1],
              start: "top 80%",
              end: "top 20%",
              scrub: 1
            }
          });
        }
      });

    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: PRESET.background }}>
      {/* Noise Overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.05]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
      }} />

      {/* NAVBAR */}
      <nav className={`fixed top-4 left-1/2 -translate-x-1/2 z-40 transition-all duration-500 ${
        scrolled 
          ? "bg-[#F2F0E9]/60 backdrop-blur-xl border border-[#2E4036]/10" 
          : "bg-transparent"
      } rounded-full px-6 py-3 flex items-center gap-8`}>
        <span className="font-bold text-lg" style={{ color: scrolled ? PRESET.primary : "#F2F0E9" }}>
          CleanPro
        </span>
        <div className="hidden md:flex items-center gap-6 text-sm" style={{ color: scrolled ? PRESET.text : "#F2F0E9" }}>
          <a href="#features" className="hover:opacity-70 transition-opacity">Услуги</a>
          <a href="#philosophy" className="hover:opacity-70 transition-opacity">О нас</a>
          <a href="#pricing" className="hover:opacity-70 transition-opacity">Цены</a>
        </div>
        <a 
          href="#contact"
          className="ml-4 px-5 py-2 rounded-full text-white text-sm font-medium transition-all duration-300 hover:scale-[1.03] relative overflow-hidden group"
          style={{ background: PRESET.accent }}
        >
          <span className="relative z-10">{BRAND.cta}</span>
          <span className="absolute inset-0 bg-[#B34A2A] transform translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
        </a>
      </nav>

      {/* HERO */}
      <section 
        ref={heroRef}
        className="relative h-[100dvh] flex items-end pb-24 px-6 md:px-16"
        style={{
          background: `linear-gradient(to top, ${PRESET.primary} 0%, transparent 50%),
                       url('https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1920&q=80') center/cover`
        }}
      >
        <div className="hero-content max-w-3xl">
          <p className="text-[#F2F0E9]/70 text-sm tracking-[0.2em] uppercase mb-4">
            Экологичный клининг
          </p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-4">
            <span className="block text-[#F2F0E9]" style={{ fontFamily: "Manrope, sans-serif", letterSpacing: "-0.02em" }}>
              Чистота — это
            </span>
            <span 
              className="block text-5xl md:text-7xl lg:text-8xl italic"
              style={{ fontFamily: "Playfair Display, serif", color: PRESET.accent }}
            >
              забота.
            </span>
          </h1>
          <p className="text-[#F2F0E9]/80 text-lg md:text-xl max-w-xl mb-8" style={{ fontFamily: "Manrope, sans-serif" }}>
            Профессиональная уборка с использованием экологичных средств. Безопасно для вас, ваших детей и домашних животных.
          </p>
          <a 
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-white text-lg font-medium transition-all duration-300 hover:scale-[1.03] group relative overflow-hidden"
            style={{ background: PRESET.accent }}
          >
            <span className="relative z-10">{BRAND.cta}</span>
            <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
            <span className="absolute inset-0 bg-[#B34A2A] transform translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </a>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" ref={featuresRef} className="py-24 px-6 md:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm tracking-[0.2em] uppercase mb-4" style={{ color: PRESET.accent }}>
              Почему мы
            </p>
            <h2 className="text-3xl md:text-5xl font-bold" style={{ color: PRESET.primary }}>
              Три причины выбрать CleanPro
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Card 1 — Shuffler */}
            <div 
              className="feature-card rounded-[2rem] p-8 border border-[#2E4036]/10 shadow-lg"
              style={{ background: PRESET.background }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: `${PRESET.primary}20` }}>
                  <Droplets className="w-5 h-5" style={{ color: PRESET.primary }} />
                </div>
                <h3 className="text-xl font-bold" style={{ color: PRESET.primary }}>{BRAND.features[0].title}</h3>
              </div>
              <p className="text-sm mb-6" style={{ color: PRESET.muted }}>{BRAND.features[0].description}</p>
              <ShufflerCard items={BRAND.features[0].items} accent={PRESET.accent} />
            </div>

            {/* Card 2 — Typewriter */}
            <div 
              className="feature-card rounded-[2rem] p-8 border border-[#2E4036]/10 shadow-lg"
              style={{ background: PRESET.background }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: `${PRESET.primary}20` }}>
                  <Shield className="w-5 h-5" style={{ color: PRESET.primary }} />
                </div>
                <h3 className="text-xl font-bold" style={{ color: PRESET.primary }}>{BRAND.features[1].title}</h3>
              </div>
              <p className="text-sm mb-6" style={{ color: PRESET.muted }}>{BRAND.features[1].description}</p>
              <TypewriterCard messages={BRAND.features[1].messages} accent={PRESET.accent} />
            </div>

            {/* Card 3 — Scheduler */}
            <div 
              className="feature-card rounded-[2rem] p-8 border border-[#2E4036]/10 shadow-lg"
              style={{ background: PRESET.background }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: `${PRESET.primary}20` }}>
                  <Check className="w-5 h-5" style={{ color: PRESET.primary }} />
                </div>
                <h3 className="text-xl font-bold" style={{ color: PRESET.primary }}>{BRAND.features[2].title}</h3>
              </div>
              <p className="text-sm mb-6" style={{ color: PRESET.muted }}>{BRAND.features[2].description}</p>
              <SchedulerCard days={BRAND.features[2].days} accent={PRESET.accent} primary={PRESET.primary} />
            </div>
          </div>
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section 
        id="philosophy" 
        ref={philosophyRef}
        className="relative py-32 px-6 md:px-16 overflow-hidden"
        style={{ background: PRESET.primary }}
      >
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=1920&q=80')`,
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        />
        <div className="philosophy-text relative max-w-4xl mx-auto text-center">
          <p className="text-[#F2F0E9]/60 text-lg md:text-xl mb-8">
            Большинство клининговых компаний фокусируются на: быстрой уборке и дешёвых химикатах.
          </p>
          <p className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight">
            <span className="text-[#F2F0E9]">Мы фокусируемся на: </span>
            <span 
              className="italic"
              style={{ fontFamily: "Playfair Display, serif", color: PRESET.accent }}
            >
              вашем здоровье и экологичности.
            </span>
          </p>
        </div>
      </section>

      {/* PROTOCOL */}
      <section ref={protocolRef} className="py-24 px-6 md:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm tracking-[0.2em] uppercase mb-4" style={{ color: PRESET.accent }}>
              Как мы работаем
            </p>
            <h2 className="text-3xl md:text-5xl font-bold" style={{ color: PRESET.primary }}>
              Простой процесс
            </h2>
          </div>

          <div className="space-y-8">
            {[
              { step: "01", title: "Заявка", desc: "Оставьте заявку на сайте или позвоните нам. Мы уточним детали и рассчитаем стоимость.", icon: Phone },
              { step: "02", title: "План уборки", desc: "Подберём оптимальный набор услуг и составим индивидуальный план уборки.", icon: Sparkles },
              { step: "03", title: "Результат", desc: "Проведём уборку в удобное время. Вы получаете чистоту и гарантию качества.", icon: Check }
            ].map((item, i) => (
              <div 
                key={i}
                className="protocol-card sticky top-24 rounded-[2rem] p-8 md:p-12 border border-[#2E4036]/10 shadow-xl transition-all duration-500"
                style={{ background: PRESET.background }}
              >
                <div className="flex flex-col md:flex-row gap-8 items-center">
                  <div 
                    className="w-20 h-20 rounded-2xl flex items-center justify-center text-2xl font-mono font-bold shrink-0"
                    style={{ background: `${PRESET.primary}15`, color: PRESET.primary }}
                  >
                    {item.step}
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-2xl md:text-3xl font-bold mb-3" style={{ color: PRESET.primary }}>{item.title}</h3>
                    <p className="text-lg" style={{ color: PRESET.muted }}>{item.desc}</p>
                  </div>
                  <div 
                    className="w-16 h-16 rounded-full flex items-center justify-center shrink-0"
                    style={{ background: PRESET.accent }}
                  >
                    <item.icon className="w-8 h-8 text-white" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-24 px-6 md:px-16" style={{ background: `${PRESET.primary}08` }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm tracking-[0.2em] uppercase mb-4" style={{ color: PRESET.accent }}>
              Стоимость
            </p>
            <h2 className="text-3xl md:text-5xl font-bold" style={{ color: PRESET.primary }}>
              Прозрачные цены
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "Базовый", price: "от 2 500 ₽", desc: "Поддерживающая уборка", features: ["1-комнатная квартира", "Сухая и влажная уборка", "Уборка санузла", "Мытьё зеркал"] },
              { name: "Профессиональный", price: "от 4 500 ₽", desc: "Генеральная уборка", features: ["До 3-х комнат", "Всё из базового +", "Мытьё окон изнутри", "Уборка балкона"], featured: true },
              { name: "Корпоративный", price: "Договорная", desc: "Для бизнеса", features: ["Офисы и помещения", "График по договорённости", "Специальные условия", "Постоянный менеджер"] }
            ].map((plan, i) => (
              <div 
                key={i}
                className={`rounded-[2rem] p-8 border transition-all duration-300 hover:scale-[1.02] ${
                  plan.featured 
                    ? "ring-2 scale-105" 
                    : ""
                }`}
                style={{ 
                  background: plan.featured ? PRESET.primary : PRESET.background,
                  borderColor: plan.featured ? PRESET.accent : `${PRESET.primary}15`,
                  color: plan.featured ? "#F2F0E9" : PRESET.text
                }}
              >
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <p className="text-sm opacity-70 mb-4">{plan.desc}</p>
                <p className="text-3xl font-bold mb-6">{plan.price}</p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4" style={{ color: PRESET.accent }} />
                      {f}
                    </li>
                  ))}
                </ul>
                <a 
                  href="#contact"
                  className={`block text-center py-3 rounded-full font-medium transition-all duration-300 hover:scale-[1.03] ${
                    plan.featured ? "text-[#1A1A1A]" : "text-white"
                  }`}
                  style={{ background: plan.featured ? PRESET.accent : PRESET.primary }}
                >
                  {BRAND.cta}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT / CTA */}
      <section id="contact" className="py-24 px-6 md:px-16">
        <div 
          className="max-w-4xl mx-auto rounded-[3rem] p-8 md:p-16 text-center"
          style={{ background: PRESET.primary }}
        >
          <Sparkles className="w-12 h-12 mx-auto mb-6" style={{ color: PRESET.accent }} />
          <h2 className="text-3xl md:text-5xl font-bold text-[#F2F0E9] mb-4">
            Готовы к чистоте?
          </h2>
          <p className="text-[#F2F0E9]/70 text-lg mb-8 max-w-xl mx-auto">
            Оставьте заявку и получите бесплатный расчёт стоимости уборки в течение 15 минут
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href={`tel:${BRAND.phone}`}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-white text-lg font-medium transition-all duration-300 hover:scale-[1.03]"
              style={{ background: PRESET.accent }}
            >
              <Phone className="w-5 h-5" />
              Позвонить
            </a>
            <a 
              href={`https://wa.me/${BRAND.phone.replace(/\D/g, '')}`}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-lg font-medium border-2 border-[#F2F0E9]/30 text-[#F2F0E9] transition-all duration-300 hover:scale-[1.03] hover:border-[#F2F0E9]/60"
            >
              Написать в WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer 
        className="rounded-t-[4rem] pt-16 pb-8 px-6 md:px-16"
        style={{ background: PRESET.dark }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <h3 className="text-xl font-bold text-[#F2F0E9] mb-4">CleanPro</h3>
              <p className="text-[#F2F0E9]/60 text-sm mb-4">{BRAND.tagline}</p>
              <div className="flex items-center gap-2 text-sm">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[#F2F0E9]/60 font-mono">Система активна</span>
              </div>
            </div>
            <div>
              <h4 className="text-[#F2F0E9] font-medium mb-4">Услуги</h4>
              <ul className="space-y-2 text-[#F2F0E9]/60 text-sm">
                <li><a href="#" className="hover:text-[#F2F0E9] transition-colors">Поддерживающая уборка</a></li>
                <li><a href="#" className="hover:text-[#F2F0E9] transition-colors">Генеральная уборка</a></li>
                <li><a href="#" className="hover:text-[#F2F0E9] transition-colors">Уборка после ремонта</a></li>
                <li><a href="#" className="hover:text-[#F2F0E9] transition-colors">Химчистка мебели</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[#F2F0E9] font-medium mb-4">Компания</h4>
              <ul className="space-y-2 text-[#F2F0E9]/60 text-sm">
                <li><a href="#" className="hover:text-[#F2F0E9] transition-colors">О нас</a></li>
                <li><a href="#" className="hover:text-[#F2F0E9] transition-colors">Отзывы</a></li>
                <li><a href="#" className="hover:text-[#F2F0E9] transition-colors">Карьера</a></li>
                <li><a href="#" className="hover:text-[#F2F0E9] transition-colors">Блог</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[#F2F0E9] font-medium mb-4">Контакты</h4>
              <ul className="space-y-3 text-[#F2F0E9]/60 text-sm">
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <a href={`tel:${BRAND.phone}`} className="hover:text-[#F2F0E9] transition-colors">{BRAND.phone}</a>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <a href={`mailto:${BRAND.email}`} className="hover:text-[#F2F0E9] transition-colors">{BRAND.email}</a>
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>Москва, Россия</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-[#F2F0E9]/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[#F2F0E9]/40 text-sm">© 2026 CleanPro. Все права защищены.</p>
            <div className="flex gap-6 text-[#F2F0E9]/40 text-sm">
              <a href="#" className="hover:text-[#F2F0E9]/60 transition-colors">Политика конфиденциальности</a>
              <a href="#" className="hover:text-[#F2F0E9]/60 transition-colors">Условия использования</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// SHUFFLER CARD COMPONENT
function ShufflerCard({ items, accent }: { items: string[], accent: string }) {
  const [displayItems, setDisplayItems] = useState(items);

  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayItems(prev => {
        const newItems = [...prev];
        const last = newItems.pop()!;
        newItems.unshift(last);
        return newItems;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-32 overflow-hidden">
      {displayItems.map((item, i) => (
        <div
          key={`${item}-${i}`}
          className="absolute w-full transition-all duration-700"
          style={{
            top: `${i * 28}px`,
            opacity: 1 - i * 0.25,
            transform: `scale(${1 - i * 0.05})`,
            zIndex: 3 - i
          }}
        >
          <div 
            className="px-4 py-3 rounded-xl text-sm font-medium"
            style={{ background: `${accent}15`, color: accent }}
          >
            <Check className="w-4 h-4 inline mr-2" />
            {item}
          </div>
        </div>
      ))}
    </div>
  );
}

// TYPEWRITER CARD COMPONENT
function TypewriterCard({ messages, accent }: { messages: string[], accent: string }) {
  const [currentMessage, setCurrentMessage] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const message = messages[currentMessage];
    
    if (isTyping) {
      if (currentText.length < message.length) {
        const timeout = setTimeout(() => {
          setCurrentText(message.slice(0, currentText.length + 1));
        }, 50);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => {
          setIsTyping(false);
        }, 2000);
        return () => clearTimeout(timeout);
      }
    } else {
      if (currentText.length > 0) {
        const timeout = setTimeout(() => {
          setCurrentText(currentText.slice(0, -1));
        }, 30);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => {
          setCurrentMessage((currentMessage + 1) % messages.length);
          setIsTyping(true);
        }, 0);
        return () => clearTimeout(timeout);
      }
    }
  }, [currentText, isTyping, currentMessage, messages]);

  return (
    <div className="font-mono text-sm">
      <div className="flex items-center gap-2 mb-3">
        <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: accent }} />
        <span className="text-xs uppercase tracking-wider" style={{ color: accent }}>Live Feed</span>
      </div>
      <div 
        className="px-4 py-3 rounded-xl min-h-[80px]"
        style={{ background: "#1A1A1A08" }}
      >
        <span style={{ color: "#5C5C5C" }}>{"> "}</span>
        <span style={{ color: "#1A1A1A" }}>{currentText}</span>
        <span 
          className="inline-block w-2 h-4 ml-1 animate-pulse"
          style={{ background: accent }}
        />
      </div>
    </div>
  );
}

// SCHEDULER CARD COMPONENT
function SchedulerCard({ days, accent, primary }: { days: string[], accent: string, primary: string }) {
  const [activeDay, setActiveDay] = useState<number | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const sequence = async () => {
      await new Promise(r => setTimeout(r, 1000));
      setActiveDay(0);
      await new Promise(r => setTimeout(r, 800));
      setActiveDay(1);
      await new Promise(r => setTimeout(r, 800));
      setActiveDay(2);
      await new Promise(r => setTimeout(r, 800));
      setActiveDay(null);
      setSaved(true);
      await new Promise(r => setTimeout(r, 2000));
      setSaved(false);
    };
    sequence();
    const interval = setInterval(sequence, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-sm">
      <div className="grid grid-cols-7 gap-1 mb-3">
        {days.map((day, i) => (
          <div
            key={i}
            className={`aspect-square rounded-lg flex items-center justify-center text-xs font-medium transition-all duration-300`}
            style={{
              background: activeDay === i ? accent : i < 3 ? `${accent}20` : "#1A1A1A08",
              color: activeDay === i ? "#fff" : primary
            }}
          >
            {day}
          </div>
        ))}
      </div>
      <button 
        className="w-full py-2 rounded-lg font-medium transition-all duration-300"
        style={{ 
          background: saved ? "#22C55E" : primary,
          color: "#fff"
        }}
      >
        {saved ? "✓ Сохранено" : "Сохранить"}
      </button>
    </div>
  );
}
