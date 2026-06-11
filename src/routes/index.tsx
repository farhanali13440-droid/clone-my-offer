import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  BadgeCheck,
  Brain,
  Calendar,
  CheckCircle2,
  ChevronDown,
  Clock,
  Flame,
  Gift,
  Lock,
  Play,
  ShieldCheck,
  Smartphone,
  Star,
  Target,
  Trophy,
  Users,
  Volume2,
  Zap,
} from "lucide-react";

import { CtaButton } from "@/components/site/CtaButton";
import { Footer } from "@/components/site/Footer";
import { Topbar } from "@/components/site/Topbar";
import { fbqTrack } from "@/lib/fbpixel";

const productStack = { url: "/assets/product-stack.png" };
const instructorImage = { url: "/assets/farhan-instructor.jpeg" };

const PRODUCT_NAME = "The Art of Habits & Discipline Mastery Seminar";
const TRAINING_DATE = "Sunday | 07-June-2026";
const TRAINING_TIME = "05:00 PM to 8:00 PM";
const PRICE = 999;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${PRODUCT_NAME} - Live Training by Farhan Ali` },
      {
        name: "description",
        content:
          "A live seminar to help you break laziness, procrastination, porn addiction and reel addiction while building real discipline and consistency.",
      },
      { property: "og:title", content: PRODUCT_NAME },
      {
        property: "og:description",
        content:
          "Break bad habits, build discipline, control screen time and become the person who actually follows through.",
      },
      { property: "og:image", content: productStack.url },
    ],
  }),
  component: LandingPage,
});

function LandingPage() {
  useEffect(() => {
    fbqTrack("ViewContent", {
      content_name: PRODUCT_NAME,
      content_category: "Training",
      value: PRICE,
      currency: "PKR",
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <AnnouncementBar />
      <Topbar />
      <Hero />
      <ProofBar />
      <ProblemSection />
      <CurriculumSection />
      <BonusesSection />
      <HowItWorks />
      <OrderBumpPreview />
      <WhoFor />
      <TrainerSection />
      <GuaranteeSection />
      <FAQSection />
      <FinalCta />
      <Footer />
    </div>
  );
}

function AnnouncementBar() {
  return (
    <div className="sticky top-0 z-50 w-full bg-[#0b1735] text-white border-b border-white/10 shadow-md">
      <div className="mx-auto max-w-7xl px-3 py-2 flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-3 text-center text-[12px] sm:text-sm">
        <span className="bg-yellow-400 text-[#0b1735] font-extrabold px-2 py-0.5 rounded tracking-wider text-[11px] sm:text-xs whitespace-nowrap">
          LIVE TRAINING
        </span>
        <span className="text-white/95">
          {TRAINING_DATE} - {TRAINING_TIME} - Only Rs. {PRICE.toLocaleString()} Today
        </span>
        <Link to="/order" className="text-emerald-300 hover:text-emerald-200 underline font-bold whitespace-nowrap">
          Reserve Your Seat
        </Link>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="hero-bg text-white">
      <div className="mx-auto max-w-7xl px-4 pt-10 pb-16">
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-widest">
            <Flame className="size-4 text-yellow-300" /> For students, professionals, freelancers, employees and entrepreneurs
          </div>
        </div>

        <h1 className="mt-8 text-center text-3xl md:text-5xl lg:text-6xl font-black leading-[1.05] uppercase">
          Finally Build The <span className="gradient-highlight">Discipline</span> To Stop Wasting Days On Reels, Laziness And Bad Habits
        </h1>
        <p className="mt-6 text-center max-w-3xl mx-auto text-lg md:text-xl text-white/85">
          A live, practical training by Farhan Ali that shows you how to break destructive habits, defeat procrastination and create a daily system that makes consistency feel simple.
        </p>

        <div className="mt-10 grid md:grid-cols-5 gap-6 items-start">
          <div className="md:col-span-3">
            <div className="rounded-lg overflow-hidden shadow-2xl ring-1 ring-white/10 bg-white/5">
              <div className="bg-topbar text-white text-center py-2 text-sm font-semibold flex items-center justify-center gap-2">
                <Volume2 className="size-4" /> Read this carefully before you register
              </div>
              <div className="p-5 md:p-8 grid lg:grid-cols-2 gap-6 items-center">
                <div>
                  <p className="text-yellow-300 font-bold uppercase tracking-wider text-sm">If you are tired of starting over...</p>
                  <h2 className="mt-3 text-2xl md:text-4xl font-black leading-tight">
                    This seminar gives you the habit system most people are never taught.
                  </h2>
                  <ul className="mt-5 space-y-3 text-white/90">
                    {[
                      "Stop relying on motivation that disappears after 2 days",
                      "Replace procrastination with a simple action trigger",
                      "Reduce screen, reel and dopamine addiction loops",
                      "Build a routine you can follow even when life gets busy",
                    ].map((item) => (
                      <li key={item} className="flex gap-3">
                        <CheckCircle2 className="size-5 text-emerald-300 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <img src={productStack.url} alt={PRODUCT_NAME} className="w-full h-auto rounded-xl bg-white" />
              </div>
            </div>

            <div className="mt-6">
              <CtaButton subtitle="Reserve your live seat for Rs. 999">
                YES! I Want To Master My Habits
              </CtaButton>
            </div>

            <ReviewCard />
          </div>

          <aside className="md:col-span-2 bg-card text-card-foreground rounded-xl shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-br from-indigo-50 to-white p-5 border-b">
              <img src={productStack.url} alt={PRODUCT_NAME} className="w-full h-auto" />
            </div>
            <div className="p-6 text-center">
              <div className="text-lg font-extrabold">LIMITED LIVE SEATS</div>
              <div className="mt-2 text-3xl font-black text-destructive">
                ONLY <span className="line-through text-foreground/60 font-bold">Rs. 4,999</span>
                <br />
                <span>Rs. {PRICE.toLocaleString()}</span>
              </div>
              <div className="text-sm font-semibold">Save Rs. 4,000 today</div>
              <p className="mt-4 text-sm">
                Live seminar: <span className="font-bold">{TRAINING_DATE}</span>
                <br />
                Time: <span className="font-bold">{TRAINING_TIME}</span>
              </p>
              <InlineLeadForm />
              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <Lock className="size-3.5" /> Secure checkout via Easypaisa/JazzCash
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

function InlineLeadForm() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  return (
    <form
      className="mt-5 space-y-3 text-left"
      onSubmit={(e) => {
        e.preventDefault();
        const params = new URLSearchParams();
        if (name) params.set("full_name", name);
        if (email) params.set("email", email);
        navigate({ to: "/order", search: Object.fromEntries(params) });
      }}
    >
      <input required value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name*" className="w-full rounded-md border border-input bg-background px-3 py-3 text-sm outline-none focus:ring-2 focus:ring-ring" />
      <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email*" className="w-full rounded-md border border-input bg-background px-3 py-3 text-sm outline-none focus:ring-2 focus:ring-ring" />
      <button type="submit" className="btn-cta w-full px-4 py-4 text-lg">
        GO TO STEP #2
        <div className="text-xs font-medium normal-case tracking-normal opacity-95">Reserve Your Spot Now</div>
      </button>
    </form>
  );
}

function ReviewCard() {
  return (
    <div className="mt-6 rounded-lg bg-white/5 ring-1 ring-white/10 p-5 text-white/95">
      <div className="flex items-start gap-4">
        <div className="size-16 sm:size-20 rounded-full bg-yellow-400 text-hero-deep grid place-items-center shrink-0 font-black text-2xl">FA</div>
        <div className="min-w-0">
          <div className="flex gap-1 text-yellow-400">
            {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="size-4 fill-yellow-400" />)}
          </div>
          <p className="mt-2 italic">
            "This is for the person who knows exactly what to do, but still cannot get themselves to do it consistently. That is the real problem we solve."
          </p>
          <p className="mt-2 font-bold">- Farhan Ali</p>
        </div>
      </div>
    </div>
  );
}

function ProofBar() {
  const items = ["Discipline", "Focus", "Deep Work", "Screen Control", "Habit Design", "Self-Respect", "Consistency"];
  return (
    <section className="bg-white py-10 border-b">
      <div className="mx-auto max-w-6xl px-4 text-center">
        <h2 className="text-xl md:text-2xl font-extrabold mb-8">Built For People Who Are Done Living Below Their Potential</h2>
        <div className="marquee">
          {[0, 1].map((dup) => (
            <div key={dup} className="marquee-track" aria-hidden={dup === 1}>
              {items.map((n) => (
                <div key={n} className="font-bold tracking-widest uppercase text-sm md:text-base text-muted-foreground whitespace-nowrap flex items-center">
                  {n}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProblemSection() {
  return (
    <section className="py-20 bg-secondary">
      <div className="mx-auto max-w-4xl px-4">
        <h2 className="text-3xl md:text-5xl font-black text-center">
          This Is Not Another <span className="gradient-highlight">Motivational Lecture</span>
        </h2>
        <div className="mt-8 space-y-5 text-lg leading-relaxed">
          <p>
            You already know you should wake up early, exercise, study, work on your business, avoid useless scrolling and stop habits that silently destroy your confidence.
          </p>
          <p>
            But knowing is not the problem. The problem is the invisible loop: trigger, craving, excuse, relapse, guilt, and then another promise to start again from Monday.
          </p>
          <p>
            <span className="inline-block bg-red-600 text-white font-bold px-3 py-1 rounded-md ring-2 ring-red-700/40 shadow-sm">
              The Art of Habits & Discipline Mastery Seminar breaks that loop.
            </span>
          </p>
          <p>
            In 3 focused hours, you will learn how to design your environment, control your dopamine triggers, use friction against bad habits and build a simple daily operating system for discipline.
          </p>
        </div>
        <div className="mt-10 max-w-md mx-auto">
          <CtaButton subtitle="Live training - Rs. 999 only">YES! I Want The System</CtaButton>
        </div>
      </div>
    </section>
  );
}

function CurriculumSection() {
  const modules = [
    {
      label: "MODULE #1",
      title: "The Discipline Reset",
      desc: "Understand why motivation fails and how to rebuild discipline from identity, environment and tiny daily wins.",
      points: ["Why you keep starting and stopping", "The identity shift that makes discipline natural", "How to rebuild self-trust in 7 days"],
      icon: Target,
    },
    {
      label: "MODULE #2",
      title: "Bad Habit Breaking System",
      desc: "A step-by-step method to weaken destructive habits without relying on willpower alone.",
      points: ["Find the real trigger behind the habit", "Use friction to make relapse harder", "Replace the habit without feeling empty"],
      icon: Zap,
    },
    {
      label: "MODULE #3",
      title: "Procrastination Killer Framework",
      desc: "Turn big tasks into immediate action so your brain stops negotiating with you.",
      points: ["The 5-minute start protocol", "How to beat mental resistance", "Daily planning that does not feel heavy"],
      icon: Clock,
    },
    {
      label: "MODULE #4",
      title: "Dopamine & Screen-Time Control",
      desc: "Reduce reels, scrolling and digital distraction using practical controls that work in real life.",
      points: ["Why reels hijack your attention", "Phone setup for focus", "The 24-hour dopamine reset plan"],
      icon: Smartphone,
    },
    {
      label: "MODULE #5",
      title: "Habit Stacking & Routine Design",
      desc: "Create a daily routine that connects study, work, fitness, prayer, family and personal goals.",
      points: ["Morning and night routine templates", "Habit stacking that sticks", "Track progress without becoming obsessive"],
      icon: Brain,
    },
    {
      label: "MODULE #6",
      title: "The 30-Day Consistency Plan",
      desc: "Leave with a clear 30-day execution map so you know exactly what to do after the seminar.",
      points: ["Your personal discipline scorecard", "Weekly review system", "How to recover quickly after a bad day"],
      icon: Trophy,
    },
  ];

  const [openIdx, setOpenIdx] = useState(0);

  return (
    <section className="py-20 bg-white">
      <div className="mx-auto max-w-5xl px-4">
        <div className="text-center mb-10">
          <p className="font-bold uppercase text-sm tracking-[0.25em] text-primary">Training Curriculum</p>
          <h2 className="mt-2 text-3xl md:text-5xl font-black">What You Will Learn Inside</h2>
        </div>
        <div className="space-y-4">
          {modules.map((m, i) => {
            const isOpen = openIdx === i;
            const Icon = m.icon;
            return (
              <div key={m.title} className={`rounded-2xl border bg-[#0f172a] text-white shadow-lg overflow-hidden ${isOpen ? "border-primary/70" : "border-white/10"}`}>
                <button onClick={() => setOpenIdx(isOpen ? -1 : i)} className="w-full flex items-center gap-4 p-4 md:p-5 text-left">
                  <div className="size-14 rounded-xl bg-primary/20 text-primary grid place-items-center shrink-0 ring-1 ring-primary/40">
                    <Icon className="size-7" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold tracking-[0.18em] text-primary uppercase">{m.label}</div>
                    <h3 className="mt-1 text-base md:text-xl font-extrabold leading-tight">{m.title}</h3>
                    <p className="mt-1 text-xs md:text-sm text-white/70">{m.desc}</p>
                  </div>
                  <ChevronDown className={`size-6 text-white/80 transition-transform duration-300 shrink-0 ${isOpen ? "rotate-180" : ""}`} />
                </button>
                <div className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                  <div className="overflow-hidden">
                    <div className="px-4 md:px-5 pb-5 pt-1 border-t border-white/10">
                      <ul className="mt-4 space-y-2.5">
                        {m.points.map((pt) => (
                          <li key={pt} className="flex items-start gap-3 text-sm md:text-base">
                            <span className="mt-0.5 size-6 rounded-full bg-primary/20 text-primary grid place-items-center shrink-0 ring-1 ring-primary/40">
                              <Play className="size-3 fill-primary" />
                            </span>
                            <span className="text-white/90">{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function BonusesSection() {
  const bonuses = [
    {
      title: "30-Day Discipline Action Plan",
      copy: "A simple day-by-day execution map so you do not leave the seminar excited and then fall back into old habits.",
      value: "Rs. 10,000",
    },
    {
      title: "Habit Tracker & Self-Accountability Sheet",
      copy: "Track the few daily actions that matter without making your life complicated.",
      value: "Rs. 7,000",
    },
    {
      title: "Screen-Time Control Checklist",
      copy: "The phone settings, app rules and environment changes that protect your attention from reels and useless scrolling.",
      value: "Rs. 8,000",
    },
    {
      title: "Live Q&A With Farhan Ali",
      copy: "Get your personal habit and discipline questions answered during the live session.",
      value: "Rs. 12,000",
    },
  ];

  return (
    <section className="py-20 bg-secondary">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-center text-3xl md:text-5xl font-black">
          You Also Unlock <span className="gradient-highlight">4 Fast-Action Bonuses</span>
        </h2>
        <div className="mt-12 grid md:grid-cols-2 gap-6">
          {bonuses.map((b) => (
            <div key={b.title} className="rounded-2xl border bg-card p-6 shadow-md">
              <div className="text-sm font-bold uppercase tracking-wider text-primary flex items-center gap-2">
                <Gift className="size-4" /> Included Bonus
              </div>
              <h3 className="mt-2 text-xl md:text-2xl font-extrabold">{b.title}</h3>
              <p className="mt-3 text-muted-foreground">{b.copy}</p>
              <div className="mt-4 inline-block bg-accent text-accent-foreground font-bold px-3 py-1 rounded">Value: {b.value}</div>
            </div>
          ))}
        </div>
        <p className="mt-10 text-center text-lg font-semibold">
          Total Bonus Value: <span className="line-through">Rs. 37,000</span> - <span className="text-destructive">included free today.</span>
        </p>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { icon: Calendar, title: "Step 1 - Reserve Your Seat", text: "Lock your spot for Rs. 999 and complete the simple payment confirmation." },
    { icon: Users, title: "Step 2 - Attend Live", text: `Join the live training on ${TRAINING_DATE}, from ${TRAINING_TIME}.` },
    { icon: Trophy, title: "Step 3 - Follow The 30-Day Plan", text: "Use the system after the seminar to rebuild discipline one day at a time." },
  ];
  return (
    <section className="py-20 bg-white">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-center text-3xl md:text-5xl font-black">How The Seminar Works</h2>
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {steps.map((s) => (
            <div key={s.title} className="rounded-xl bg-card border p-8 text-center shadow-sm">
              <div className="mx-auto size-14 rounded-full bg-primary text-primary-foreground grid place-items-center">
                <s.icon className="size-7" />
              </div>
              <h3 className="mt-4 text-xl font-extrabold">{s.title}</h3>
              <p className="mt-2 text-muted-foreground">{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function OrderBumpPreview() {
  return (
    <section className="py-20 bg-hero-deep text-white">
      <div className="mx-auto max-w-5xl px-4 text-center">
        <p className="uppercase tracking-widest text-yellow-300 font-bold">Optional Deep-Dive Add Ons</p>
        <h2 className="mt-2 text-3xl md:text-5xl font-black">Want Extra Help With The Two Biggest Modern Addictions?</h2>
        <p className="mt-4 text-white/80 max-w-3xl mx-auto">
          On checkout, you can add focused trainings for porn addiction recovery and reels/social media addiction recovery. These are optional, but highly recommended if those habits are stealing your focus.
        </p>
        <div className="mt-10 grid md:grid-cols-2 gap-6 text-left">
          <div className="rounded-xl bg-white/5 ring-1 ring-white/10 p-6">
            <h3 className="text-2xl font-black">Porn Addiction Recovery Training</h3>
            <p className="mt-3 text-white/80">A private, practical recovery roadmap to understand triggers, reduce relapse cycles and rebuild control.</p>
          </div>
          <div className="rounded-xl bg-white/5 ring-1 ring-white/10 p-6">
            <h3 className="text-2xl font-black">Reels Addiction Recovery Training</h3>
            <p className="mt-3 text-white/80">A screen-control system for people who lose hours to Instagram, TikTok, YouTube Shorts and endless scrolling.</p>
          </div>
        </div>
        <div className="mt-10 max-w-md mx-auto">
          <CtaButton subtitle="Go to checkout and choose your add ons">Reserve My Seat</CtaButton>
        </div>
      </div>
    </section>
  );
}

function WhoFor() {
  const list = [
    "Students who keep procrastinating",
    "Professionals who feel distracted and inconsistent",
    "Entrepreneurs who need sharper execution",
    "Freelancers who want better routine and focus",
    "Employees who want more control over time",
    "Young achievers who know they are capable of more",
    "Anyone struggling with reels, scrolling or screen addiction",
    "Anyone trying to quit a private destructive habit",
    "Anyone tired of breaking promises to themselves",
  ];
  return (
    <section className="py-20 bg-secondary">
      <div className="mx-auto max-w-5xl px-4">
        <h2 className="text-center text-3xl md:text-5xl font-black">Who Is This Perfect For?</h2>
        <div className="mt-10 grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {list.map((l) => (
            <div key={l} className="flex items-center gap-3 rounded-lg bg-card border p-4">
              <Users className="size-5 text-primary shrink-0" />
              <span className="font-semibold">{l}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TrainerSection() {
  return (
    <section className="py-20 bg-white">
      <div className="mx-auto max-w-5xl px-4 grid md:grid-cols-2 gap-10 items-center">
        <div className="rounded-2xl overflow-hidden shadow-xl ring-1 ring-border bg-secondary">
          <img src={instructorImage.url} alt="Farhan Ali" className="w-full h-auto" />
        </div>
        <div>
          <p className="uppercase tracking-widest text-primary font-bold text-sm">Meet Your Trainer</p>
          <h2 className="mt-2 text-4xl md:text-5xl font-black">Farhan Ali</h2>
          <p className="mt-2 text-lg font-semibold text-muted-foreground">Trainer, marketer and systems thinker</p>
          <p className="mt-4 leading-relaxed">
            Farhan Ali teaches practical systems for growth, discipline and execution. This seminar is designed for people who do not need more random advice - they need a clear operating system they can actually follow.
          </p>
          <ul className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-y-2">
            {["Habits", "Discipline", "Focus", "Productivity", "Digital control", "Execution systems"].map((s) => (
              <li key={s} className="flex items-center gap-2"><BadgeCheck className="size-4 text-primary" />{s}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function GuaranteeSection() {
  return (
    <section className="py-20 bg-hero-deep text-white">
      <div className="mx-auto max-w-3xl px-4 text-center">
        <div className="mx-auto size-24 rounded-full bg-yellow-400 text-hero-deep grid place-items-center shadow-lg">
          <ShieldCheck className="size-12" />
        </div>
        <p className="mt-6 uppercase tracking-widest text-yellow-300 font-bold">Risk Free</p>
        <h2 className="mt-2 text-3xl md:text-5xl font-black">100% Money-Back Guarantee</h2>
        <p className="mt-6 text-lg text-white/85">
          Attend the complete seminar, take notes, apply the action plan, and if you honestly feel it was not worth your Rs. 999, message us for a refund.
        </p>
        <div className="mt-8 max-w-md mx-auto">
          <CtaButton subtitle="Lock in your seat for Rs. 999">I'm In - Enroll Me Now</CtaButton>
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  const faqs = [
    { q: "1. How will the training be conducted?", a: "The seminar will be conducted live online. You will receive access instructions after payment verification." },
    { q: "2. Do I need any prior knowledge?", a: "No. This is designed for normal people who struggle with consistency, procrastination and digital distractions." },
    { q: "3. Is this only for students?", a: "No. It is for students, professionals, employees, freelancers, entrepreneurs and anyone who wants discipline." },
    { q: "4. When is the seminar?", a: `${TRAINING_DATE} - ${TRAINING_TIME}.` },
    { q: "5. Are the addiction trainings included?", a: "The main seminar is Rs. 999. Porn addiction recovery and reels/social media addiction recovery are optional order bumps available on checkout." },
  ];
  return (
    <section className="py-20 bg-secondary">
      <div className="mx-auto max-w-3xl px-4">
        <h2 className="text-center text-3xl md:text-5xl font-black">FAQs</h2>
        <div className="mt-10 space-y-4">
          {faqs.map((f) => (
            <details key={f.q} className="group rounded-lg border bg-card p-5">
              <summary className="cursor-pointer list-none font-bold text-lg flex justify-between items-center">
                {f.q}
                <span className="ml-4 text-primary group-open:rotate-45 transition">+</span>
              </summary>
              <p className="mt-3 text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="hero-bg text-white py-20">
      <div className="mx-auto max-w-3xl px-4 text-center">
        <p className="uppercase tracking-widest text-yellow-300 font-bold">Limited-Time Offer</p>
        <h2 className="mt-2 text-3xl md:text-5xl font-black">Your habits are already shaping your future. Take control today.</h2>
        <p className="mt-4 text-lg text-white/85">
          Reserve your live seat for just <span className="font-bold">Rs. {PRICE.toLocaleString()}</span> today.
        </p>
        <div className="mt-8 max-w-md mx-auto">
          <CtaButton subtitle="Live seminar - limited seats">YES! Reserve My Seat</CtaButton>
        </div>
        <p className="mt-6 text-sm text-white/70">
          Questions? Email <a className="underline" href="mailto:Farhanali13440@gmail.com">Farhanali13440@gmail.com</a> or call <a className="underline" href="tel:+923390057379">+92 339 0057379</a>
        </p>
        <p className="mt-6">
          <Link to="/order" className="underline text-white/90">Go to checkout</Link>
        </p>
      </div>
    </section>
  );
}
