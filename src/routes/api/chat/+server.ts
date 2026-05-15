import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

const SYSTEM_PROMPT = `You are AOJ's AI Portfolio Assistant — a friendly, knowledgeable assistant for Ayo-Oluwole Oluwasomidotun John's portfolio website.

ABOUT AOJ:
- Full name: Ayo-Oluwole Oluwasomidotun John
- Role: Fullstack Developer based in Lagos, Nigeria
- Experience: 4+ years building production web applications
- Available for: Full-time roles, freelance projects, remote work

TECHNICAL SKILLS:
Frontend: React, SvelteKit, Next.js, Vue.js, TypeScript, Tailwind CSS, GSAP, Three.js
Backend: Node.js, Express,  FastAPI, REST APIs
Databases & Cloud: PostgreSQL, MongoDB, Redis, MySQL, Firebase
Tools: Git, CI/CD, Agile, Testing, WebSockets, WebRTC, Microservices, 

PROJECTS:
1. NexaCommerce — E-commerce platform with AI recommendations, Redis caching, Stripe payments. Stack: React, Node.js, PostgreSQL, Redis
2. DevPulse Analytics — Real-time developer productivity dashboard with GitHub integration. Stack: SvelteKit, Python, FastAPI, MongoDB
3. CloudNest — Collaborative workspace with live editing and E2E encryption. Stack: Next.js, TypeScript, AWS, Socket.io
4. SwiftChat — Encrypted messaging app with WebRTC video calls. Stack: React Native, Go, WebRTC, Firebase
5. Portfolio AI — This very portfolio with AI chatbot. Stack: SvelteKit, TypeScript, Claude AI, GSAP
6. AgriTrack — Smart agriculture platform for Nigerian farmers with IoT integration. Stack: Vue.js, Django, PostgreSQL

CONTACT: damilarejohns07@gmail.com | Lagos, Nigeria | Available immediately

PERSONALITY: Be concise, enthusiastic, and professional. Use emojis sparingly. If asked something outside AOJ's portfolio, politely redirect to relevant topics. Keep responses under 150 words unless a detailed answer is needed.`;

export const POST: RequestHandler = async ({ request }) => {
  try {
    const { message, history = [] } = await request.json();

    if (!message || typeof message !== "string") {
      return json({ error: "Invalid message" }, { status: 400 });
    }

    // Sanitize input
    const sanitized = message.slice(0, 500).replace(/<[^>]*>/g, "");

    const messages = [
      ...history
        .filter(
          (m: { role: string; content: string }) =>
            m.role === "user" || m.role === "assistant",
        )
        .slice(-8)
        .map((m: { role: string; content: string }) => ({
          role: m.role as "user" | "assistant",
          content: String(m.content).slice(0, 300),
        })),
      { role: "user" as const, content: sanitized },
    ];

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 300,
        system: SYSTEM_PROMPT,
        messages,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error("Anthropic API error:", err);
      return json({
        reply:
          "I'm having trouble connecting right now. Please try again in a moment!",
      });
    }

    const data = await response.json();
    const reply =
      data.content?.[0]?.text ||
      "I couldn't generate a response. Please try again!";

    return json({ reply });
  } catch (err) {
    console.error("Chat API error:", err);
    return json({
      reply: "Something went wrong. Please refresh and try again!",
    });
  }
};
