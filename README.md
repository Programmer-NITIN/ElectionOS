<div align="center">
  <img src="/public/screenshots/dashboard.png" alt="ElectionOS Dashboard" width="100%" />
  
  <h1>🗳️ ElectionOS</h1>
  <p><strong>Next-Generation Civic Intelligence & AI-Powered Electoral Analytics Platform</strong></p>
  
  <p>
    <img src="https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js" alt="Next.js" />
    <img src="https://img.shields.io/badge/Gemini-AI-blue?style=for-the-badge&logo=google" alt="Gemini AI" />
    <img src="https://img.shields.io/badge/Framer-Motion-purple?style=for-the-badge&logo=framer" alt="Framer Motion" />
    <img src="https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css" alt="Tailwind CSS" />
  </p>
</div>

---

## 🏛️ Executive Summary

Modern electoral ecosystems generate an overwhelming velocity of data: hyper-local demographic shifts, real-time social sentiment, and complex coalition arithmetic. Traditional political analysis relies on slow, human-in-the-loop punditry to decode these signals.

**ElectionOS** represents a paradigm shift in civic tech. Inspired by enterprise-grade intelligence platforms like Palantir Gotham, ElectionOS is an AI-native command center that synthesizes structured electoral data and unstructured narrative signals into actionable, high-fidelity intelligence. By integrating Google's Gemini AI directly into the data visualization layer, the platform transitions from simply *displaying* data to actively *reasoning* over it.

---

## 🚀 Core Intelligence Modules

### 1. 🗺️ Territorial Shift (Interactive Spatial Intelligence)
Move beyond static SVGs. ElectionOS features a fully interactive, dark-themed geographic interface powered by CartoDB and Leaflet. 
* **Dynamic Node Tracking:** Critical constituencies are plotted with exact GPS coordinates.
* **Volatility Scoring:** Nodes pulse dynamically based on algorithmically assigned volatility scores (Red = Flipped, Cyan = Volatile, Purple = Stable).
* **Deep-Dive Routing:** Click spatial nodes to seamlessly transition into hyper-local constituency dashboards.

### 2. 🧠 Election Copilot (Autonomous Reasoning Engine)
<img src="/public/screenshots/copilot.png" alt="AI Copilot" width="100%" />

Embedded within the platform is a persistent, context-aware AI intelligence agent.
* **Specialized Prompt Architecture:** Powered by Gemini 1.5 Flash, the Copilot is engineered to emulate a senior think-tank political analyst.
* **Contextual Awareness:** The agent ingests current dashboard state, real 2024 Lok Sabha trends, and specific constituency data before generating responses.
* **Graceful Failover:** Engineered with a deterministic fallback matrix ensuring zero-downtime operation during rate-limits or network failures—critical for high-stakes hackathon demos.

### 3. 📉 Autopsy & Seat-Flip Predictive Modeling
<img src="/public/screenshots/seat_flip.png" alt="Seat Flip Analysis" width="100%" />

An analytical environment dedicated to understanding electoral tectonic shifts (e.g., the Ayodhya/Faizabad shock or the Amethi revenge).
* **Demographic Migration Matrices:** Visualizes the exact point in time when key voting blocs (e.g., Dalit-Muslim-OBC consolidation) shifted allegiances.
* **Probability Timelines:** Tracks the erosion of incumbent safety margins over the campaign lifecycle.

### 4. 🎙️ AI Speech & Narrative Lab
<img src="/public/screenshots/speech.png" alt="Speech Analyzer" width="100%" />

Political rhetoric is quantified and analyzed in real-time.
* **NLP Extraction:** Ingests raw rally transcripts and automatically extracts policy shifts, target audiences, and unstated promises.
* **Sentiment Topography:** Evaluates emotional tone (Aggression vs. Optimism) and plots a "Persuasion Index" to gauge the effectiveness of the rhetoric on swing voters.

### 5. 📊 Real-Time Mood of the Nation
Tracks macro-narratives through "Issue Velocities" (Unemployment, Reservation, Inflation, Agniveer backlash). 
* **Sparkline Velocity:** Beautiful, minimalist sparklines show issue trajectory.
* **"Explain with AI" Integration:** Users can click a single button to trigger a live LLM call that analyzes the specific graph's inflection points and synthesizes the underlying socioeconomic drivers.

---

## 🧬 System Architecture & Data Model

ElectionOS utilizes a **Hybrid Edge-AI Architecture** designed for maximum performance, demo reliability, and perceived intelligence.

### 1. The Real Data Engine (2024 Lok Sabha)
The platform is grounded in reality, entirely replacing synthetic mock data with validated results from the 2024 Indian General Elections.
* **Constituency Layer:** Real vote margins, winner names, and historical turnout data for 10 pivotal battlegrounds (Amethi, Varanasi, Gandhinagar, Baramati, etc.).
* **Insights Layer:** Authentic post-poll narratives, including the "400 Paar" backlash, the South India firewall, and the Maharashtra NCP split.

### 2. The AI Reasoning Layer
We separate the data from the reasoning. While the data is deterministically served for speed, the analysis is dynamically generated by Google Gemini.
* **Route Interception (`/api/ai`):** A custom Next.js Edge route acts as a proxy to the Gemini API, preventing client-side exposure of API keys.
* **Dynamic Prompt Injection:** The system dynamically injects specific prompt templates (`prompts.ts`) based on the UI context (e.g., `constituencySummary`, `moodOfNation`, `speechAnalysis`).

### 3. Cinematic UI Engineering (The "Palantir" Aesthetic)
* **Glassmorphism:** UI components (`<GlassCard />`) utilize layered transparencies, subtle borders, and background blurs (`backdrop-blur-xl`) to create visual depth.
* **Orchestrated Animation:** Powered by Framer Motion, page loads utilize orchestrated `staggerChildren` variants, creating a cascading, premium reveal effect that implies high-tech processing.
* **Color Theory:** Deep, immersive dark backgrounds (`#0a0f16`) punctuated by high-contrast neon cyan (`#00f5ff`) and alert reds (`#ffb4ab`) to guide the user's eye to critical intelligence.

---

## 🛠️ Technical Stack Breakdown

| Layer | Technologies | Purpose |
|---|---|---|
| **Core Framework** | Next.js 14 (App Router), React 18 | High-performance SSR, unified API routes, seamless routing. |
| **State Management** | Zustand | Lightweight, un-opinionated global state for UI toggles and AI message history. |
| **Styling Engine** | Tailwind CSS, CSS Modules | Utility-first styling for rapid iteration of the dark-mode aesthetic. |
| **Motion & Animation** | Framer Motion | Physics-based, spring animations for UI transitions and data reveals. |
| **Spatial Intelligence** | React-Leaflet, OpenStreetMap | Interactive geographic mapping of constituency battlegrounds. |
| **AI Inference** | `@google/generative-ai` | Live integration with Gemini 1.5 Flash for natural language processing and synthesis. |
| **Iconography** | Lucide React | Minimalist, consistent vector iconography. |

---

## ⚙️ Deployment & Setup (Hackathon Ready)

The repository is hardened for immediate deployment to Vercel or Google Cloud Run.

### Prerequisites
- Node.js 18.x or higher
- A Google Gemini API Key

### Local Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Programmer-NITIN/ElectionOS.git
   cd ElectionOS
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure the AI Engine**
   Create a `.env.local` file in the root directory. *Note: This file is correctly ignored by git to prevent secret leakage.*
   ```env
   GOOGLE_AI_API_KEY="your_actual_gemini_api_key_here"
   ```

4. **Initialize the OS**
   ```bash
   npm run dev
   ```

5. **Access Command Center**
   Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

---

<div align="center">
  <br/>
  <p><i>"Democracy dies in darkness. ElectionOS turns on the lights."</i></p>
  <p>Built for the ElectAI Hackathon</p>
</div>
