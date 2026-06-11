import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, ChevronDown, CreditCard, Gift, Lock, ShieldCheck, Star } from "lucide-react";

import { Footer } from "@/components/site/Footer";
import { Topbar } from "@/components/site/Topbar";
import { supabase } from "@/integrations/supabase/client";
import { fbqTrack } from "@/lib/fbpixel";

const productStack = { url: "/assets/product-stack.png" };
const bumpPornRecovery = { url: "/assets/bump-strategy.png" };
const bumpReelsRecovery = { url: "/assets/bump-prompts.png" };

const PRODUCT_NAME = "The Art of Habits & Discipline Mastery Seminar";
const TRAINING_DATE = "Sunday | 12-July-2026";
const TRAINING_TIME = "05:00 PM to 8:00 PM";
const MAIN_PRODUCT = { title: PRODUCT_NAME, price: 999 };

type OrderSearch = {
  full_name?: string;
  email?: string;
};

export const Route = createFileRoute("/order")({
  validateSearch: (search: Record<string, unknown>): OrderSearch => ({
    full_name: typeof search.full_name === "string" ? search.full_name : undefined,
    email: typeof search.email === "string" ? search.email : undefined,
  }),
  head: () => ({
    meta: [
      { title: `Checkout - ${PRODUCT_NAME}` },
      {
        name: "description",
        content:
          "Secure your seat in The Art of Habits & Discipline Mastery Seminar and add optional addiction recovery trainings.",
      },
    ],
  }),
  component: OrderPage,
});

const BUMPS = [
  {
    id: "porn-recovery",
    title: "Porn Addiction Recovery Training",
    price: 1499,
    image: bumpPornRecovery.url,
    badge: "Private Deep-Dive Add On",
    bullets: [
      "Understand the trigger-craving-relapse loop",
      "Build a practical relapse-prevention plan",
      "Replace shame with a clear recovery system",
      "Daily rules for urges, boredom and late-night triggers",
      "Rebuild confidence, self-respect and focus",
    ],
    bonus: "Bonus: 7-Day Recovery Reset Checklist",
  },
  {
    id: "reels-recovery",
    title: "Reels & Social Media Addiction Recovery Training",
    price: 999,
    image: bumpReelsRecovery.url,
    badge: "Recommended For Screen-Time Control",
    bullets: [
      "Stop losing hours to Instagram, TikTok and YouTube Shorts",
      "Set up your phone to protect your attention",
      "Use the 24-hour dopamine reset plan",
      "Replace scrolling with productive default actions",
      "Create boundaries without deleting your whole digital life",
    ],
    bonus: "Bonus: Screen-Time Control Checklist",
  },
] as const;

const PAYMENT_ACCOUNTS = {
  easypaisa: { label: "Easypaisa", name: "Farhan Ali Rasheed", account: "03135944817" },
  jazzcash: { label: "JazzCash", name: "Farhan Ali Rasheed", account: "03135944817" },
} as const;
type PayMethod = keyof typeof PAYMENT_ACCOUNTS;

function OrderPage() {
  const search = Route.useSearch();
  const [name, setName] = useState(search.full_name ?? "");
  const [email, setEmail] = useState(search.email ?? "");
  const [phone, setPhone] = useState("");
  const [bumps, setBumps] = useState<Record<string, boolean>>({});
  const [paymentMethod, setPaymentMethod] = useState<PayMethod>("easypaisa");
  const [submitting, setSubmitting] = useState(false);
  const purchaseFiredRef = useRef(false);

  useEffect(() => {
    fbqTrack("InitiateCheckout", { value: MAIN_PRODUCT.price, currency: "PKR" });
  }, []);

  const items = useMemo(() => {
    const list: { id: string; title: string; price: number; qty: number }[] = [
      { id: "main", title: MAIN_PRODUCT.title, price: MAIN_PRODUCT.price, qty: 1 },
    ];
    for (const b of BUMPS) {
      if (bumps[b.id]) list.push({ id: b.id, title: b.title, price: b.price, qty: 1 });
    }
    return list;
  }, [bumps]);

  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);

    const selectedBumps = BUMPS.filter((b) => bumps[b.id]).map((b) => ({
      id: b.id,
      title: b.title,
      price: b.price,
    }));

    try {
      await supabase.from("clinic_growth_leads").insert({
        full_name: name,
        email,
        whatsapp: phone,
        selected_order_bumps: selectedBumps,
        total_amount: total,
        payment_method: PAYMENT_ACCOUNTS[paymentMethod].label,
        lead_status: "Pending Payment",
      });
    } catch (err) {
      console.error("Failed to save lead", err);
    }

    fbqTrack("Lead", { value: total, currency: "PKR" });

    if (!purchaseFiredRef.current) {
      purchaseFiredRef.current = true;
      fbqTrack("Purchase", { value: MAIN_PRODUCT.price, currency: "PKR" });
    }

    await new Promise((r) => setTimeout(r, 350));

    const message =
      `Assalam-o-Alaikum,\n\n` +
      `I have paid the fee for ${PRODUCT_NAME}.\n` +
      `My payment screenshot is attached.\n\n` +
      `Name: ${name}\n` +
      `Email: ${email}\n` +
      `WhatsApp: ${phone}\n` +
      `Payment Method: ${PAYMENT_ACCOUNTS[paymentMethod].label}\n` +
      `Total Amount: Rs. ${total.toLocaleString()}\n` +
      `Selected Add Ons: ${selectedBumps.length ? selectedBumps.map((b) => b.title).join(", ") : "None"}\n\n` +
      `Please verify my payment and provide access.\n\n` +
      `Thank you.`;
    const waUrl = `https://wa.me/923390057379?text=${encodeURIComponent(message)}`;
    window.open(waUrl, "_blank", "noopener,noreferrer");
    setSubmitting(false);
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Topbar />

      <div className="bg-secondary border-b">
        <div className="mx-auto max-w-6xl px-4 py-8 text-center">
          <h1 className="text-2xl md:text-4xl font-black">
            You're <span className="gradient-highlight">One Step Away</span> From Mastering Your Habits
          </h1>
          <p className="mt-2 text-muted-foreground">
            Complete your order below to reserve your seat in the live discipline seminar.
          </p>
        </div>
      </div>

      <main className="bg-secondary flex-1">
        <div className="mx-auto max-w-6xl px-4 py-10 grid lg:grid-cols-5 gap-8">
          <form className="lg:col-span-3 space-y-6" onSubmit={handleSubmit}>
            <section className="bg-card rounded-xl shadow-sm border">
              <div className="bg-primary text-primary-foreground px-5 py-3 rounded-t-xl font-bold text-center uppercase tracking-wider text-sm">
                Step 1 - Your Contact Info
              </div>
              <div className="p-5 space-y-3">
                <input required value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name*" className="w-full rounded-md border border-input bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-ring" />
                <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email*" className="w-full rounded-md border border-input bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-ring" />
                <input required value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone Number (WhatsApp preferred)*" className="w-full rounded-md border border-input bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-ring" />
              </div>
            </section>

            <section className="bg-card rounded-xl shadow-sm border p-5">
              <div className="text-sm font-bold uppercase tracking-wider mb-3">Your Order</div>
              <table className="w-full text-sm">
                <thead className="text-muted-foreground text-left">
                  <tr><th className="py-2">Item</th><th className="py-2 text-center">Qty</th><th className="py-2 text-right">Price</th></tr>
                </thead>
                <tbody>
                  {items.map((i) => (
                    <tr key={i.id} className="border-t">
                      <td className="py-3 pr-2">{i.title}</td>
                      <td className="py-3 text-center">{i.qty}</td>
                      <td className="py-3 text-right font-bold">Rs. {i.price.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>

            {BUMPS.map((b) => {
              const checked = !!bumps[b.id];
              return (
                <label key={b.id} className={`block rounded-xl border-2 border-dashed cursor-pointer p-4 transition ${checked ? "border-emerald-500 bg-emerald-50" : "border-yellow-500 bg-yellow-50"}`}>
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={(e) => setBumps((s) => ({ ...s, [b.id]: e.target.checked }))}
                      className="mt-1 size-5 accent-emerald-600 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start gap-2">
                        <ArrowRight className="size-5 text-red-600 shrink-0 mt-0.5" />
                        <div className="font-extrabold text-emerald-800 uppercase text-sm md:text-base">
                          YES! Add {b.title} for just PKR {b.price.toLocaleString()}
                        </div>
                      </div>
                      <div className="mt-3">
                        <img src={b.image} alt={b.title} className="w-full h-auto rounded-lg object-cover border border-emerald-200" loading="lazy" />
                      </div>
                      <div className="mt-3">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-600 text-white text-xs font-bold px-3 py-1 shadow-sm">
                          <span className="size-2 rounded-full bg-white/90" aria-hidden />
                          {b.badge}
                        </span>
                      </div>
                      <div className="mt-3 text-sm text-slate-800 leading-relaxed">
                        <p className="font-bold underline mb-2">SPECIAL ONE-TIME OFFER:</p>
                        <ul className="space-y-1">
                          {b.bullets.map((line) => (
                            <li key={line}>- {line}</li>
                          ))}
                          <li className="font-semibold text-emerald-800 mt-1">{b.bonus}</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </label>
              );
            })}

            <section className="bg-card rounded-xl shadow-lg border-2 border-primary/40 ring-2 ring-primary/10 overflow-hidden">
              <div className="bg-primary text-primary-foreground px-5 py-3 font-bold text-center uppercase tracking-wider text-sm">
                Step 3 - Payment Method
              </div>
              <div className="p-5 space-y-4">
                <div>
                  <label htmlFor="paymethod" className="flex items-center gap-2 text-sm font-bold text-primary uppercase tracking-wide">
                    <CreditCard className="size-4" /> Select Your Payment Method
                  </label>
                  <div className="relative mt-2">
                    <select
                      id="paymethod"
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value as PayMethod)}
                      className="appearance-none w-full rounded-xl border-2 border-primary bg-gradient-to-br from-primary/5 to-primary/10 px-4 py-4 pr-12 text-base font-bold text-foreground shadow-md outline-none focus:ring-4 focus:ring-primary/30 hover:shadow-lg transition cursor-pointer"
                    >
                      <option value="easypaisa">Easypaisa</option>
                      <option value="jazzcash">JazzCash</option>
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 size-5 text-primary" />
                  </div>
                </div>

                <div className="rounded-lg border-2 border-primary/30 bg-primary/5 p-4">
                  <div className="text-xs font-bold uppercase tracking-wider text-primary">
                    {PAYMENT_ACCOUNTS[paymentMethod].label} Payment Details
                  </div>
                  <div className="mt-2 space-y-1 text-sm">
                    <div className="flex justify-between gap-3">
                      <span className="text-muted-foreground">Account Title</span>
                      <span className="font-bold">{PAYMENT_ACCOUNTS[paymentMethod].name}</span>
                    </div>
                    <div className="flex justify-between gap-3">
                      <span className="text-muted-foreground">Account Number</span>
                      <span className="font-bold tracking-wider">{PAYMENT_ACCOUNTS[paymentMethod].account}</span>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border-l-4 border-yellow-500 bg-yellow-50 p-4 text-sm text-slate-800">
                  <p className="font-bold mb-1">Important Instructions</p>
                  <p>
                    Please send your payment to the selected account above and then send the payment screenshot to our WhatsApp number by clicking the button below.
                  </p>
                </div>
              </div>
            </section>

            <section className="bg-card rounded-xl shadow-sm border p-5">
              <div className="text-sm font-bold uppercase tracking-wider mb-3">Order Summary</div>
              <div className="space-y-2 text-sm">
                {items.map((i) => (
                  <div key={i.id} className="flex justify-between gap-3">
                    <span className="truncate">{i.title}</span>
                    <span className="font-semibold">Rs. {i.price.toLocaleString()}</span>
                  </div>
                ))}
                <div className="border-t pt-3 flex justify-between text-lg font-black">
                  <span>Total</span>
                  <span className="text-destructive">Rs. {total.toLocaleString()}</span>
                </div>
              </div>

              <button type="submit" disabled={submitting} className="btn-cta w-full mt-5 px-6 py-4 text-base md:text-lg">
                {submitting ? "OPENING WHATSAPP..." : "SEND PAYMENT SCREENSHOT & GET ACCESS"}
                <div className="text-xs font-medium normal-case tracking-normal opacity-95">
                  Click here to send your payment screenshot on WhatsApp and receive seminar access.
                </div>
              </button>

              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <Lock className="size-3.5" /> 100% Secure &amp; Safe Payments
              </div>
            </section>
          </form>

          <aside className="lg:col-span-2 space-y-6">
            <div className="bg-card rounded-xl shadow-sm border overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-center py-3 font-black uppercase tracking-wider">
                Habits & Discipline Mastery
              </div>
              <img src={productStack.url} alt={PRODUCT_NAME} className="w-full h-auto" />
              <div className="p-5 text-center">
                <div className="text-lg font-bold">Get Access For</div>
                <div className="text-3xl font-black text-emerald-600 mt-1 whitespace-pre-line">{"Only\nRs. 999 Today!"}</div>

                <div className="mt-5 text-left">
                  <div className="bg-primary text-primary-foreground text-center font-bold py-2 rounded">
                    Here's Everything You Get:
                  </div>
                  <ul className="mt-3 space-y-3 text-sm">
                    <Item title="Live Habits & Discipline Mastery Seminar">
                      A practical 3-hour training to break bad habits, defeat procrastination, control screen addiction and build daily discipline.
                    </Item>
                    <Item title="Training Date & Time">
                      {TRAINING_DATE} - {TRAINING_TIME}.
                    </Item>
                    <Item title="30-Day Discipline Action Plan">
                      Leave with a simple execution map so you know exactly what to do after the seminar.
                    </Item>
                    <Item title="Habit Tracker & Screen-Time Checklist">
                      Simple tools to track progress and protect your attention from useless scrolling.
                    </Item>
                    <Item title="Live Q&A With Farhan Ali">
                      Get your habit, discipline and addiction-control questions answered live.
                    </Item>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-xl border p-5 flex items-start gap-4">
              <div className="size-14 rounded-full bg-yellow-400 grid place-items-center shrink-0">
                <ShieldCheck className="size-7 text-hero-deep" />
              </div>
              <div>
                <h3 className="font-extrabold">100% Money-Back Guarantee</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Attend, apply the action plan, and if you honestly feel it was not worth it, message us for a refund.
                </p>
              </div>
            </div>

            <div className="bg-card rounded-xl border p-5">
              <div className="font-bold mb-3">What This Helps You Build</div>
              {[
                { n: "Better focus", t: "Stop leaking attention to every notification and short video." },
                { n: "More consistency", t: "Follow through even when motivation is low." },
                { n: "Stronger self-control", t: "Create rules and systems that protect your future self." },
              ].map((r) => (
                <div key={r.n} className="border-t first:border-t-0 py-3">
                  <div className="flex gap-0.5 text-yellow-500">
                    {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="size-3.5 fill-yellow-500" />)}
                  </div>
                  <p className="text-sm italic mt-1">"{r.t}"</p>
                  <p className="text-xs font-bold mt-1">{r.n}</p>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function Item({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <li className="flex gap-2">
      <Gift className="size-4 text-emerald-600 shrink-0 mt-1" />
      <div>
        <div className="font-bold">{title}</div>
        <p className="text-muted-foreground">{children}</p>
      </div>
    </li>
  );
}
