"use client";

import { useRouter } from "next/navigation";

export default function AIChatHomePage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-[#0D0D0D] text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/30 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white font-bold text-black">
              AI
            </div>
            <span className="text-lg font-medium tracking-tight">MY AI</span>
          </div>

          <nav className="hidden items-center gap-8 text-sm text-white/70 md:flex">
            <a href="#">Product</a>
            <a href="#">Use Cases</a>
            <a href="#">Pricing</a>
            <a href="#">Docs</a>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push("/sign-in")}
              className="rounded-xl px-4 py-2 text-sm text-white/80 transition hover:bg-white/5"
            >
              Log in
            </button>

            <button
              onClick={() => router.push("/sign-up")}
              className="rounded-xl bg-white px-4 py-2 text-sm font-medium text-black transition hover:bg-white/90"
            >
              Start Free
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_40%)]" />

        <div className="relative mx-auto max-w-6xl px-6 pb-20 pt-20 lg:px-10">
          <div className="mx-auto max-w-4xl text-center">
            <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-1 text-sm text-white/70 backdrop-blur-md">
              Your AI Assistant for Everything
            </span>

            <h1 className="mt-6 text-5xl font-semibold tracking-tight sm:text-6xl lg:text-7xl">
              Build AI that
              <span className="block bg-gradient-to-r from-white to-white/50 bg-clip-text text-transparent">
                feels natural to use
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/60">
              Create conversational AI products with memory, tools, reasoning,
              and a beautifully simple chat experience—designed for modern users.
            </p>

            {/* Prompt Box */}
            <div className="mx-auto mt-10 max-w-3xl rounded-3xl border border-white/10 bg-white/5 p-3 shadow-2xl backdrop-blur-xl">
              <div className="flex items-end gap-3 rounded-2xl bg-black/30 px-4 py-4">
                <textarea
                  rows={2}
                  placeholder="Ask MY AI anything..."
                  className="w-full resize-none bg-transparent text-base text-white placeholder:text-white/30 outline-none"
                />
                <button className="rounded-2xl bg-white px-5 py-3 text-sm font-medium text-black transition hover:bg-white/90">
                  Send
                </button>
              </div>

              <div className="mt-3 flex flex-wrap items-center gap-2 px-2 pb-1">
                {["Write code", "Summarize docs", "Generate UI", "Analyze data"].map(
                  (item) => (
                    <button
                      key={item}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/60 transition hover:bg-white/10"
                    >
                      {item}
                    </button>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Preview */}
      <section className="px-6 pb-20 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          {/* Chat Window */}
          <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
            <div className="space-y-5">
              <div className="flex justify-end">
                <div className="max-w-xl rounded-3xl rounded-br-md bg-white px-5 py-4 text-black">
                  Build me a dashboard for analytics with charts and filters.
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-white font-semibold text-black">
                  MY
                </div>
                <div className="max-w-2xl rounded-3xl rounded-tl-md bg-black/40 px-5 py-4 text-white/80">
                  I’ll generate a clean analytics dashboard with KPI cards, revenue
                  trends, charts, and filters using React + Tailwind.
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-white font-semibold text-black">
                  MY
                </div>
                <div className="max-w-2xl rounded-3xl rounded-tl-md bg-black/40 px-5 py-4 text-white/80">
                  I can also connect charts, real-time metrics, and export reports.
                </div>
              </div>
            </div>
          </div>

          {/* Side Panel */}
          <div className="space-y-6">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
              <p className="text-sm text-white/50">Capabilities</p>
              <div className="mt-4 space-y-4">
                {[
                  "Conversational Memory",
                  "File & PDF Analysis",
                  "Code Generation",
                  "Tool Integrations",
                  "Web Search",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl bg-black/30 px-4 py-3 text-sm text-white/80"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
              <p className="text-sm text-white/50">Why it feels better</p>
              <div className="mt-4 space-y-3 text-sm text-white/70">
                <p>• Human-like responses with natural tone</p>
                <p>• Context aware multi-turn conversations</p>
                <p>• Fast responses with streaming UI</p>
                <p>• Built-in memory and personalization</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-white/10 px-6 py-20 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 text-center">
            <p className="text-sm text-white/50">Designed for AI-first products</p>
            <h2 className="mt-3 text-4xl font-semibold">
              Everything users expect from modern AI
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {[
              "Streaming Responses",
              "Persistent Memory",
              "Tool Calling",
              "Multi-Model Routing",
            ].map((item) => (
              <div
                key={item}
                className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
              >
                <h3 className="text-lg font-medium">{item}</h3>
                <p className="mt-3 text-sm leading-7 text-white/60">
                  Production-ready architecture for building smooth conversational AI.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}