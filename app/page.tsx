"use client";

import React, { useEffect, useRef, useState } from "react";

const GITHUB_URL = "https://github.com/WebmanaProject/webmana";
const CONNECTORS_URL = "https://github.com/WebmanaProject/webmana-connectors";
const DOCS_URL = "https://github.com/WebmanaProject/webmana/tree/main/docs";

const features = [
  {
    title: "Portfolio board",
    body: "A kanban of every project by lifecycle stage — idea, in progress, live, archived. Monitoring kicks in once a project goes live.",
  },
  {
    title: "Domain tracking",
    body: "Registrar, expiry, auto-renew, and nameservers as first-class data — with renewal alerts at 60, 30, and 7 days.",
  },
  {
    title: "Single pane of glass",
    body: "Every domain's uptime, SSL, performance, security, and cost in one dashboard.",
  },
  {
    title: "Health score",
    body: "A single rollup per project so you know what needs attention at a glance.",
  },
  {
    title: "Uptime & SLA",
    body: "Track availability and response times across all your sites over time.",
  },
  {
    title: "SSL · WHOIS · DNS",
    body: "Certificate expiry, registration, and DNS checks — no API keys required.",
  },
  {
    title: "Performance",
    body: "Core Web Vitals and PageSpeed scores pulled in and trended automatically.",
  },
  {
    title: "Security posture",
    body: "Headers and exposure checks surface misconfigurations before they bite.",
  },
  {
    title: "FinOps",
    body: "Annual renewal totals, cloud month-to-date spend, and a full cost breakdown per currency.",
  },
  {
    title: "Alerting",
    body: "Threshold rules notify you over webhook, Slack, or email when things drift.",
  },
  {
    title: "Teams & RBAC",
    body: "Local accounts with admin / editor / viewer roles, email invites, and per-token MCP access.",
  },
  {
    title: "AI insights",
    body: "Optional scheduled natural-language project summaries via any Anthropic- or OpenAI-compatible model.",
  },
];

const connectors = [
  { name: "SSL", ready: true },
  { name: "WHOIS", ready: true },
  { name: "DNS", ready: true },
  { name: "GoDaddy", ready: true },
  { name: "Namecheap", ready: true },
  { name: "Cloudflare", ready: true },
  { name: "PageSpeed", ready: true },
  { name: "UptimeRobot", ready: true },
  { name: "GA4", ready: true },
  { name: "GitHub", ready: true },
  { name: "Vercel", ready: true },
  { name: "AWS Cost", ready: true },
];

const steps = [
  {
    n: "1",
    title: "Clone the repo",
    body: "Grab Webmana from GitHub — the whole stack lives in one repository.",
    code: "git clone https://github.com/WebmanaProject/webmana",
  },
  {
    n: "2",
    title: "Set your .env",
    body: "Copy .env.example and drop in your secrets. They're encrypted at rest.",
    code: "cp .env.example .env",
  },
  {
    n: "3",
    title: "Bring it up",
    body: "One command boots Postgres, Redis, the API, worker, MCP server, and UI.",
    code: "docker compose up",
  },
];

const dashboardSlides = [
  {
    title: "Core Metrics",
    cards: [
      { domain: "acme.com", metric: "SSL", value: "248 days", tone: "ok" },
      { domain: "beta.io", metric: "SSL", value: "9 days", tone: "warn" },
      { domain: "gamma.app", metric: "Uptime", value: "99.98%", tone: "ok" },
      { domain: "delta.dev", metric: "PageSpeed", value: "94", tone: "ok" },
    ],
  },
  {
    title: "Security Scan",
    cards: [
      { domain: "acme.com", metric: "HSTS Header", value: "Active", tone: "ok" },
      { domain: "beta.io", metric: "CSP Header", value: "Missing", tone: "warn" },
      { domain: "gamma.app", metric: "CORS Policy", value: "Strict", tone: "ok" },
      { domain: "delta.dev", metric: "XSS Protection", value: "Enabled", tone: "ok" },
    ],
  },
  {
    title: "Cost & FinOps",
    cards: [
      { domain: "acme.com", metric: "AWS EC2", value: "$142.50/mo", tone: "ok" },
      { domain: "beta.io", metric: "Vercel Functions", value: "$45.00/mo", tone: "ok" },
      { domain: "gamma.app", metric: "Supabase DB", value: "$25.00/mo", tone: "ok" },
      { domain: "delta.dev", metric: "Namecheap SSL", value: "$8.99/yr", tone: "ok" },
    ],
  },
] as const;

function ScrollReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
  as: Component = "div",
  immediate = false,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "fade";
  as?: "div" | "span" | "section" | "article";
  immediate?: boolean;
}) {
  // `immediate` paints the content visible on first frame — used for
  // above-the-fold hero content so it never flashes blank or hurts LCP.
  const [isIntersecting, setIsIntersecting] = useState(immediate);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (immediate) return;
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      setIsIntersecting(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
        }
      },
      {
        threshold: 0.05,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, []);

  const getDirectionClass = () => {
    if (isIntersecting) return "opacity-100 translate-x-0 translate-y-0 scale-100";
    switch (direction) {
      case "up":
        return "opacity-0 translate-y-12";
      case "down":
        return "opacity-0 -translate-y-12";
      case "left":
        return "opacity-0 translate-x-12";
      case "right":
        return "opacity-0 -translate-x-12";
      case "fade":
      default:
        return "opacity-0 scale-95";
    }
  };

  return (
    <Component
      ref={ref as any}
      className={`transition-all duration-1000 ${getDirectionClass()} ${className}`}
      style={{
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      {children}
    </Component>
  );
}

/** Webmana logo mark — a hexagon "globe/grid", matching the main app. */
function Logo({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden fill="none">
      <path
        d="M16 2.5 27.7 9.25v13.5L16 29.5 4.3 22.75V9.25L16 2.5Z"
        fill="rgba(0,255,170,0.14)"
        stroke="#00b37a"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M16 6.5v19M7.5 11v10M24.5 11v10"
        stroke="#00b37a"
        strokeWidth="1.4"
        strokeLinecap="round"
        opacity="0.55"
      />
      <circle cx="16" cy="16" r="3.1" fill="#00ffaa" stroke="#04261c" strokeWidth="1" />
    </svg>
  );
}

function Nav() {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-bg/80 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#top" className="flex items-center gap-2.5 font-semibold tracking-tight">
          <Logo className="h-7 w-7" />
          <span>
            Web<span className="text-accent-strong">mana</span>
          </span>
        </a>
        <div className="hidden items-center gap-7 text-sm text-text-muted md:flex">
          <a href="#features" className="hover:text-text">Features</a>
          <a href="#connectors" className="hover:text-text">Connectors</a>
          <a href="#mcp" className="hover:text-text">MCP</a>
          <a href={DOCS_URL} className="hover:text-text">Docs</a>
          <a href={GITHUB_URL} className="hover:text-text">GitHub</a>
        </div>
        <a
          href={GITHUB_URL}
          className="rounded-2xl bg-accent px-4 py-2 text-sm font-medium text-accent-ink transition hover:brightness-95"
        >
          Get started
        </a>
      </nav>
    </header>
  );
}

function MockDashboard() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % dashboardSlides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [isHovered]);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="rounded-2xl border border-border bg-surface p-5 shadow-xl shadow-accent/5 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-accent/10"
    >
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
          </span>
          <span className="text-sm font-medium text-text-muted transition-all duration-300">
            Dashboard: <span className="font-semibold text-text">{dashboardSlides[activeSlide].title}</span>
          </span>
        </div>
        <span className="flex items-center gap-1.5">
          {dashboardSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer hover:scale-125 ${
                idx === activeSlide ? "bg-accent w-5" : "bg-border w-2.5"
              }`}
            />
          ))}
        </span>
      </div>

      <div className="relative overflow-hidden w-full">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${activeSlide * 100}%)` }}
        >
          {dashboardSlides.map((slide, slideIdx) => (
            <div key={slideIdx} className="w-full flex-shrink-0 grid grid-cols-2 gap-3">
              {slide.cards.map((c) => (
                <div
                  key={`${c.domain}-${c.metric}`}
                  className="rounded-xl border border-border bg-bg-subtle p-4 transition-all duration-300 hover:scale-[1.03] hover:shadow-md hover:border-accent/40"
                >
                  <p className="font-mono text-xs text-text-muted">{c.domain}</p>
                  <p className="mt-2 text-xs text-text-muted">{c.metric}</p>
                  <p
                    className={`text-lg font-semibold transition-colors duration-300 ${
                      c.tone === "warn" ? "text-amber-600" : "text-accent-strong"
                    }`}
                  >
                    {c.value}
                  </p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[-10%] h-[480px] w-[820px] -translate-x-1/2 rounded-full opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, rgba(0,255,170,0.35), transparent)",
        }}
      />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:py-28">
        <div>
          <ScrollReveal direction="up" delay={0} immediate>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-bg-subtle px-4 py-1.5 text-sm text-text-muted">
              <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
              Self-hosted · Open source · AI-native
            </span>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={100} immediate>
            <h1 className="mt-6 text-balance text-5xl font-semibold tracking-tight sm:text-6xl">
              Your domains.{" "}
              <span className="text-accent-strong">One pane of glass.</span>
            </h1>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={200} immediate>
            <p className="mt-5 max-w-xl text-balance text-lg text-text-muted">
              A self-hosted dashboard + MCP server that brings uptime, SSL, performance,
              security, and cost for all your projects into one place — and hands it to
              your AI.
            </p>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={300} immediate>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href={GITHUB_URL}
                className="rounded-2xl bg-accent px-5 py-3 font-medium text-accent-ink transition hover:brightness-95"
              >
                Deploy with Docker
              </a>
              <a
                href={GITHUB_URL}
                className="rounded-2xl border border-border bg-surface px-5 py-3 font-medium text-accent-strong transition hover:bg-bg-subtle"
              >
                View on GitHub
              </a>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={400} immediate>
            <code className="mt-6 inline-block rounded-2xl border border-border bg-bg-subtle px-5 py-3 font-mono text-sm">
              docker compose up
            </code>
          </ScrollReveal>
        </div>

        <ScrollReveal direction="right" delay={200} immediate>
          <MockDashboard />
        </ScrollReveal>
      </div>
    </section>
  );
}

function TrustStrip() {
  const items = [
    "100% self-hosted",
    "Open source (AGPL)",
    "AI-native (MCP)",
    "No vendor lock-in",
  ];
  return (
    <section className="border-y border-border bg-bg-subtle">
      <div className="mx-auto flex flex-wrap items-center justify-center gap-x-10 gap-y-3 px-6 py-6 text-sm text-text-muted">
        {items.map((i, idx) => (
          <ScrollReveal key={i} delay={idx * 100} direction="fade" as="span" className="inline-flex">
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              {i}
            </span>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}

function ProblemSolution() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20 overflow-hidden">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <ScrollReveal direction="left">
          <h2 className="text-3xl font-semibold tracking-tight">
            Stop living in fifteen browser tabs.
          </h2>
          <p className="mt-4 text-text-muted">
            Cloudflare here, Google Analytics there, an uptime monitor in another tab,
            an SSL checker bookmarked somewhere. Running many domains means stitching
            the picture together by hand, every time.
          </p>
          <p className="mt-4 text-text-muted">
            Webmana polls each source on a schedule, normalizes the data, and stores it —
            so the dashboard and your AI always answer instantly, without hammering
            third-party APIs.
          </p>
        </ScrollReveal>
        <div className="flex flex-wrap gap-2">
          {["Cloudflare", "Analytics", "Uptime", "SSL", "WHOIS", "PageSpeed", "Costs"].map(
            (t, idx) => (
              <ScrollReveal
                key={t}
                delay={idx * 70}
                direction="fade"
                as="span"
                className="inline-flex"
              >
                <span className="rounded-full border border-border bg-bg-subtle px-3 py-1.5 text-sm text-text-muted">
                  {t}
                </span>
              </ScrollReveal>
            ),
          )}
          <ScrollReveal delay={550} direction="fade" as="span" className="inline-flex">
            <span className="rounded-full border border-accent bg-accent/10 px-3 py-1.5 text-sm font-medium text-accent-strong animate-pulse">
              → One pane of glass
            </span>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

function Features() {
  return (
    <section id="features" className="border-y border-border bg-bg-subtle">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <ScrollReveal direction="up">
          <h2 className="text-3xl font-semibold tracking-tight">Everything in one view</h2>
          <p className="mt-3 max-w-2xl text-text-muted">
            Purpose-built for solo founders running a portfolio of sites.
          </p>
        </ScrollReveal>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, idx) => (
            <ScrollReveal
              key={f.title}
              delay={(idx % 4) * 100}
              direction="up"
              className="h-full"
            >
              <div className="group h-full rounded-2xl border border-t-2 border-border border-t-transparent bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-t-accent hover:shadow-lg">
                <h3 className="font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm text-text-muted">{f.body}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Mcp() {
  return (
    <section id="mcp" className="mx-auto max-w-6xl px-6 py-20 overflow-hidden">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <ScrollReveal direction="left">
          <span className="text-sm font-medium uppercase tracking-wide text-accent-strong">
            Built-in MCP server
          </span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight">
            Plug your AI into your infrastructure.
          </h2>
          <p className="mt-4 text-text-muted">
            Webmana ships a Model Context Protocol server over both stdio and HTTP/SSE.
            Point Cursor, Claude, or any MCP client at it and let your AI read the live
            state of every project — scoped to read-only tools and your RBAC roles.
          </p>
          <ul className="mt-5 space-y-2 text-sm text-text-muted">
            {["list_projects", "get_project_health", "get_metrics", "list_events"].map(
              (t, idx) => (
                <ScrollReveal
                  key={t}
                  delay={idx * 100}
                  direction="left"
                  className="flex items-center gap-2"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  <code className="font-mono">{t}</code>
                </ScrollReveal>
              ),
            )}
          </ul>
        </ScrollReveal>
        <ScrollReveal direction="right">
          <pre className="overflow-x-auto rounded-2xl border border-border bg-[#04261c] p-5 text-sm text-[#d7fff0] transition-all duration-300 hover:shadow-xl hover:border-accent/30">
            <code>{`{
  "mcpServers": {
    "webmana": {
      "url": "https://webmana.example.com/sse",
      "headers": {
        "Authorization": "Bearer <token>"
      }
    }
  }
}`}</code>
          </pre>
        </ScrollReveal>
      </div>
    </section>
  );
}

function Connectors() {
  return (
    <section id="connectors" className="border-y border-border bg-bg-subtle">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <ScrollReveal direction="up">
          <h2 className="text-3xl font-semibold tracking-tight">Connectors</h2>
          <p className="mt-3 max-w-2xl text-text-muted">
            Built-in today, more landing every release. Or build your own against the
            connector SDK (Apache-2.0).
          </p>
        </ScrollReveal>
        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {connectors.map((c, idx) => (
            <ScrollReveal
              key={c.name}
              delay={(idx % 4) * 80}
              direction="up"
            >
              <div className="flex items-center justify-between rounded-2xl border border-border bg-surface px-4 py-3 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:border-accent/40">
                <span className="font-medium">{c.name}</span>
                <span
                  className={`rounded-full px-2 py-0.5 text-xs transition-all duration-300 ${
                    c.ready
                      ? "bg-accent/15 text-accent-strong"
                      : "bg-bg-subtle text-text-muted"
                  }`}
                >
                  {c.ready ? "Ready" : "Planned"}
                </span>
              </div>
            </ScrollReveal>
          ))}
        </div>
        <ScrollReveal direction="up" delay={200}>
          <a
            href={CONNECTORS_URL}
            className="mt-6 inline-block text-sm font-medium text-accent-strong hover:underline"
          >
            Build your own connector →
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
}

function SelfHosting() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <ScrollReveal direction="up">
        <h2 className="text-3xl font-semibold tracking-tight">Self-host in three steps</h2>
        <p className="mt-3 max-w-2xl text-text-muted">
          Your data stays on your infrastructure. No SaaS, no telemetry, no lock-in.
        </p>
      </ScrollReveal>
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {steps.map((s, idx) => (
          <ScrollReveal
            key={s.n}
            delay={idx * 150}
            direction="up"
            className="h-full"
          >
            <div className="group h-full rounded-2xl border border-border bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-accent/30">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-accent text-sm font-semibold text-accent-ink transition-transform duration-300 group-hover:scale-110">
                {s.n}
              </span>
              <h3 className="mt-4 font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-text-muted">{s.body}</p>
              <code className="mt-4 block overflow-x-auto rounded-lg border border-border bg-bg-subtle px-3 py-2 font-mono text-xs transition-colors duration-300 group-hover:bg-bg/50">
                {s.code}
              </code>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}

function OpenSource() {
  return (
    <section className="border-y border-border bg-bg-subtle overflow-hidden">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <ScrollReveal direction="left">
            <h2 className="text-3xl font-semibold tracking-tight">
              Open source, by design.
            </h2>
            <p className="mt-4 text-text-muted">
              The application is licensed AGPL-3.0 so improvements flow back to the
              community. The connector SDK is Apache-2.0 so you can build and ship your
              own integrations freely. Contributions are welcome under a simple DCO
              sign-off.
            </p>
          </ScrollReveal>
          <div className="flex flex-wrap gap-3">
            {["App · AGPL-3.0", "SDK · Apache-2.0", "DCO sign-off"].map((tag, idx) => (
              <ScrollReveal
                key={tag}
                delay={idx * 100}
                direction="fade"
                as="span"
                className="inline-flex"
              >
                <span className="rounded-2xl border border-border bg-surface px-4 py-2 text-sm">
                  {tag}
                </span>
              </ScrollReveal>
            ))}
            <ScrollReveal delay={300} direction="fade" as="span" className="inline-flex">
              <a
                href={GITHUB_URL}
                className="rounded-2xl bg-accent px-4 py-2 text-sm font-medium text-accent-ink transition hover:brightness-95"
              >
                Contribute on GitHub
              </a>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24 text-center">
      <ScrollReveal direction="up">
        <h2 className="text-balance text-4xl font-semibold tracking-tight">
          Deploy in minutes. Own your data forever.
        </h2>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <code className="rounded-2xl border border-border bg-bg-subtle px-5 py-3 font-mono text-sm">
            docker compose up
          </code>
          <a
            href={GITHUB_URL}
            className="rounded-2xl bg-accent px-5 py-3 font-medium text-accent-ink transition hover:brightness-95"
          >
            View on GitHub
          </a>
        </div>
      </ScrollReveal>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex flex-col items-center justify-between gap-4 px-6 py-10 text-sm text-text-muted sm:flex-row">
        <span className="flex items-center gap-2">
          <Logo className="h-6 w-6" />
          <span>
            Web<span className="text-accent-strong">mana</span> · webmana.dev
          </span>
        </span>
        <div className="flex items-center gap-6">
          <a href="#features" className="hover:text-text">Features</a>
          <a href="#mcp" className="hover:text-text">MCP</a>
          <a href={GITHUB_URL} className="hover:text-text">GitHub</a>
          <span>AGPL-3.0</span>
        </div>
        <span>Made for solo founders.</span>
      </div>
    </footer>
  );
}

export default function Page() {
  return (
    <>
      <noscript>
        <style dangerouslySetInnerHTML={{__html: `
          .opacity-0 {
            opacity: 1 !important;
            transform: none !important;
          }
        `}} />
      </noscript>
      <Nav />
      <Hero />
      <TrustStrip />
      <ProblemSolution />
      <Features />
      <Mcp />
      <Connectors />
      <SelfHosting />
      <OpenSource />
      <FinalCta />
      <Footer />
    </>
  );
}
