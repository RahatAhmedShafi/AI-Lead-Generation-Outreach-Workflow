// ===== AI Lead Generation & Outreach — Workflow Diagram =====

const STEPS = [
  {
    num: 0,
    color: "var(--step-blue)",
    icon: "⏰",
    title: "Daily Trigger — 9:00 AM",
    subtitle: "Runs automatically every day at 9 AM (Asia/Dhaka)",
    badge: "Schedule",
    badgeColor: "#2563eb",
    pulse: true,
    details: [
      { label: "Type", value: "Recurring cron schedule" },
      { label: "Cron", value: "0 9 * * *" },
      { label: "Timezone", value: "Asia/Dhaka (user local)" },
      { label: "Action", value: "Sends the full lead-gen prompt to this agent" }
    ],
    output: "Agent receives instructions → begins pipeline"
  },
  {
    num: 1,
    color: "var(--step-teal)",
    icon: "🔍",
    title: "Lead Search",
    subtitle: "Search the web & LinkedIn for potential clients",
    badge: "Web Search",
    badgeColor: "#0d9488",
    details: [
      { label: "Target", value: "Small business owners who need website design" },
      { label: "Sources", value: "LinkedIn posts, profiles, Google, industry blogs" },
      { label: "Queries", value: "8+ search queries across industries (restaurants, salons, plumbers, contractors, fitness, cleaning, etc.)" },
      { label: "Focus", value: "Posts from last 30 days showing website need signals" }
    ],
    output: "Raw list of candidate leads with URLs & snippets"
  },
  {
    num: 2,
    color: "var(--step-purple)",
    icon: "📋",
    title: "Scrape & Enrich",
    subtitle: "Extract details from each candidate",
    badge: "Enrichment",
    badgeColor: "#7c3aed",
    details: [
      { label: "Extract", value: "Name, company, job title, LinkedIn profile URL" },
      { label: "Activity", value: "Recent LinkedIn posts, engagement, topics discussed" },
      { label: "Pain Points", value: "Website-related needs: no site, outdated site, redesign, no booking, poor mobile, no CTA" },
      { label: "Method", value: "Web fetch + search snippet analysis for each candidate" }
    ],
    output: "Enriched lead records with activity & pain point data"
  },
  {
    num: 3,
    color: "var(--step-amber)",
    icon: "🧮",
    title: "AI Qualification & Scoring",
    subtitle: "Score each lead 1–10 with reasoning",
    badge: "AI Scoring",
    badgeColor: "#d97706",
    details: [
      { label: "Direct intent", value: "Actively seeking web design help → +3" },
      { label: "Recency", value: "Posted within 30 days → +2 | 31–60 days → +1" },
      { label: "SMB focus", value: "Connected to small/local businesses → +2" },
      { label: "Pain clarity", value: "Clear website pain point → +2" },
      { label: "LinkedIn", value: "Profile available for outreach → +1" },
      { label: "Referral", value: "Partnership / referral potential → +1" }
    ],
    output: "Scored leads: High Quality (7–10) · Good (5–6) · Low Priority (<5)",
    scoringTable: true
  },
  {
    num: 4,
    color: "var(--step-green)",
    icon: "✍️",
    title: "Personalized Message Generation",
    subtitle: "Write a natural LinkedIn connection request (max 300 chars)",
    badge: "AI Writing",
    badgeColor: "#16a34a",
    details: [
      { label: "Tone", value: "Polite, professional, friendly — never spammy" },
      { label: "Personalization", value: "References specific company detail or recent LinkedIn activity" },
      { label: "Service line", value: "\"I help small businesses generate qualified leads through LinkedIn outreach\"" },
      { label: "CTA", value: "Soft call-to-action (e.g., \"open to a quick chat?\")" },
      { label: "Length", value: "Strictly ≤ 300 characters" }
    ],
    output: "Personalized message for each lead, ready to review"
  },
  {
    num: 5,
    color: "var(--step-rose)",
    icon: "📊",
    title: "Save to Google Sheets",
    subtitle: "Append all leads to the shared Google Sheet",
    badge: "Storage",
    badgeColor: "#e11d48",
    details: [
      { label: "Sheet URL", value: "docs.google.com/spreadsheets/d/1U_6P-wtF5EH…" },
      { label: "Leads tab", value: "Name, Company, Title, LinkedIn, Score, Qualification, Activity, Pain Points, Message, Status" },
      { label: "Summary tab", value: "Run date, target audience, total found, high quality count, avg score" },
      { label: "Status column", value: "Tracks each lead: Ready to Send → Sent → Replied" },
      { label: "Color coding", value: "Green = High Quality · Amber = Low Priority" }
    ],
    output: "All leads persisted in Google Sheets with formatting"
  },
  {
    num: 6,
    color: "var(--step-blue)",
    icon: "📤",
    title: "Output & Review",
    subtitle: "Present top 5 leads + summary report for review",
    badge: "Output",
    badgeColor: "#2563eb",
    details: [
      { label: "Top 5", value: "Highest-scoring leads with messages displayed in chat" },
      { label: "Summary", value: "Total leads, high-quality count, average score, top scorer" },
      { label: "Review gate", value: "User reviews & edits messages before sending on LinkedIn" },
      { label: "Reminder", value: "Agent reminds user to update Status column after outreach" }
    ],
    output: "Top 5 leads ready for manual LinkedIn outreach ✅"
  }
];

// ===== Render =====

function renderDetailRow(d) {
  return `
    <div class="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-3 py-1.5">
      <span class="font-semibold text-gray-600 dark:text-gray-400 sm:w-32 flex-shrink-0 text-xs uppercase tracking-wide">${d.label}</span>
      <span class="text-gray-800 dark:text-gray-200 text-sm leading-relaxed">${d.value}</span>
    </div>
  `;
}

function renderScoringTable(step) {
  if (!step.scoringTable) return "";
  return `
    <div class="mt-3 overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
      <table class="config-table w-full">
        <thead class="bg-gray-50 dark:bg-gray-800">
          <tr>
            <th>Criterion</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody class="bg-white dark:bg-gray-900">
          <tr><td>Direct intent (seeking web design)</td><td class="font-bold text-amber-600">+3</td></tr>
          <tr><td>Recent activity (≤ 30 days)</td><td class="font-bold text-amber-600">+2</td></tr>
          <tr><td>Small/local business focus</td><td class="font-bold text-amber-600">+2</td></tr>
          <tr><td>Clear website pain point</td><td class="font-bold text-amber-600">+2</td></tr>
          <tr><td>LinkedIn profile available</td><td class="font-bold text-amber-600">+1</td></tr>
          <tr><td>Referral / partnership potential</td><td class="font-bold text-amber-600">+1</td></tr>
          <tr class="font-bold border-t-2"><td>Maximum score</td><td class="text-blue-600">10</td></tr>
        </tbody>
      </table>
    </div>
  `;
}

function renderStep(step) {
  const pulseClass = step.pulse ? "pulse-trigger" : "";
  return `
    <div class="step-card rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md p-5 sm:p-6">
      <div class="flex items-start gap-4">
        <div class="step-badge ${pulseClass}" style="background:${step.color}">
          ${step.icon}
        </div>
        <div class="flex-1 min-w-0">
          <div class="flex flex-wrap items-center gap-2 mb-1">
            <h3 class="text-base font-bold text-gray-900 dark:text-gray-50">${step.title}</h3>
            <span class="detail-tag" style="background:${step.badgeColor}20;color:${step.badgeColor}">${step.badge}</span>
          </div>
          <p class="text-gray-500 dark:text-gray-400 text-xs mb-3">${step.subtitle}</p>
          <div class="border-t border-gray-100 dark:border-gray-800 pt-2">
            ${step.details.map(renderDetailRow).join("")}
          </div>
          ${renderScoringTable(step)}
          <div class="mt-3 flex items-center gap-2 rounded-lg bg-blue-50 dark:bg-blue-950/40 px-3 py-2">
            <span class="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wide">Output →</span>
            <span class="text-sm text-blue-800 dark:text-blue-200">${step.output}</span>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderConnector() {
  return `
    <div class="flex flex-col items-center">
      <div class="flow-line"></div>
      <div class="arrow-down -mt-1"></div>
    </div>
  `;
}

function renderApp() {
  const app = document.getElementById("app");
  app.innerHTML = `
    <!-- Header -->
    <header class="bg-gradient-to-br from-blue-600 to-indigo-700 dark:from-gray-900 dark:to-gray-800 text-white px-5 sm:px-8 py-8 sm:py-10">
      <div class="max-w-3xl mx-auto">
        <div class="flex items-center gap-2 mb-2">
          <span class="text-2xl">🤖</span>
          <span class="text-xs font-bold uppercase tracking-widest text-blue-200">Agent Workflow</span>
        </div>
        <h1 class="text-2xl sm:text-3xl font-extrabold mb-2">AI Lead Generation & Outreach</h1>
        <p class="text-blue-100 dark:text-gray-300 text-sm sm:text-base">
          Complete automated pipeline — search, enrich, qualify, message, and save leads for small business website design outreach.
        </p>
        <div class="flex flex-wrap gap-2 mt-4">
          <span class="detail-tag bg-white/20 text-white">Target: Small business owners needing websites</span>
          <span class="detail-tag bg-white/20 text-white">Service: LinkedIn Lead Generation</span>
          <span class="detail-tag bg-white/20 text-white">Runs: Daily at 9 AM</span>
        </div>
      </div>
    </header>

    <!-- Workflow Steps -->
    <main class="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      <div class="flex flex-col gap-0">
        ${STEPS.map((s, i) => `
          ${renderStep(s)}
          ${i < STEPS.length - 1 ? renderConnector() : ""}
        `).join("")}
      </div>

      <!-- Review Gate Section -->
      <section class="mt-8 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-700 p-5 sm:p-6">
        <div class="flex items-center gap-2 mb-3">
          <span class="text-xl">🛡️</span>
          <h2 class="text-base font-bold text-gray-900 dark:text-gray-50">Human Review Gate</h2>
        </div>
        <p class="text-gray-600 dark:text-gray-400 text-sm mb-3">
          Messages are <strong>never sent automatically</strong>. The workflow pauses here for human review:
        </p>
        <ol class="list-decimal list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1.5">
          <li>Review the top 5 leads and their personalized messages in chat</li>
          <li>Open the Google Sheet to see all leads with scores & qualifications</li>
          <li>Edit any message to match your voice before sending on LinkedIn</li>
          <li>Send the connection request manually on LinkedIn</li>
          <li>Update the Status column: <em>Ready to Send</em> → <em>Sent</em> → <em>Replied</em></li>
        </ol>
      </section>

      <!-- Config Summary -->
      <section class="mt-6 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
        <h2 class="text-base font-bold text-gray-900 dark:text-gray-50 mb-4">⚙️ Configuration Summary</h2>
        <div class="overflow-x-auto">
          <table class="config-table w-full">
            <thead class="bg-gray-100 dark:bg-gray-800">
              <tr>
                <th>Setting</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody class="bg-white dark:bg-gray-900">
              <tr><td class="font-semibold">Agent</td><td>My First Agent</td></tr>
              <tr><td class="font-semibold">Schedule</td><td>Daily 9:00 AM (Asia/Dhaka) — cron <code class="bg-gray-100 dark:bg-gray-800 px-1 rounded">0 9 * * *</code></td></tr>
              <tr><td class="font-semibold">Trigger ID</td><td><code class="bg-gray-100 dark:bg-gray-800 px-1 rounded">f8xCegih8apdu7CggqiW5d</code></td></tr>
              <tr><td class="font-semibold">Target audience</td><td>Small business owners who need website design</td></tr>
              <tr><td class="font-semibold">Service offered</td><td>LinkedIn Lead Generation</td></tr>
              <tr><td class="font-semibold">Google Sheet</td><td><a href="https://docs.google.com/spreadsheets/d/1U_6P-wtF5EHut1aE014K1-ZYM5d7Ct4Vx2S4kMcq3Ns/edit" target="_blank" class="text-blue-600 dark:text-blue-400 underline">Open Sheet ↗</a></td></tr>
              <tr><td class="font-semibold">Message limit</td><td>300 characters max</td></tr>
              <tr><td class="font-semibold">Scoring range</td><td>1–10 (High Quality ≥ 7)</td></tr>
              <tr><td class="font-semibold">Output</td><td>Top 5 leads in chat + full sheet + summary report</td></tr>
              <tr><td class="font-semibold">Tone</td><td>Polite, professional, non-spammy</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- Footer -->
      <footer class="mt-8 text-center text-xs text-gray-400 dark:text-gray-600 pb-6">
        <p>AI Lead Generation & Outreach Agent · Built on Gumloop</p>
        <p class="mt-1">Workflow runs daily — review before sending · Last run: June 30, 2026</p>
      </footer>
    </main>
  `;
}

document.addEventListener("DOMContentLoaded", renderApp);