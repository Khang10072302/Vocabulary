import React, { useState, useRef } from "react";

type Word = {
  id: number;
  word: string;
  meaning: string;
  example: string;
  phonetic: string;
  tag: string;
  mastered: boolean;
  streak: number;
  addedAt: string;
};

const INITIAL_WORDS: Word[] = [
  { id: 1, word: "Ephemeral", meaning: "Tồn tại trong thời gian ngắn; phù du", example: "Youth is ephemeral, cherish every moment.", phonetic: "/ɪˈfem.ər.əl/", tag: "Adjective", mastered: false, streak: 2, addedAt: "Aug 28" },
  { id: 2, word: "Melancholy", meaning: "Nỗi buồn sâu lắng, u sầu", example: "A sense of melancholy filled the empty house.", phonetic: "/ˈmel.ən.kɒl.i/", tag: "Noun", mastered: true, streak: 5, addedAt: "Aug 25" },
  { id: 3, word: "Serendipity", meaning: "Tình cờ may mắn, duyên kỳ ngộ", example: "Meeting her was pure serendipity.", phonetic: "/ˌser.ənˈdɪp.ɪ.ti/", tag: "Noun", mastered: false, streak: 1, addedAt: "Aug 22" },
  { id: 4, word: "Eloquent", meaning: "Ăn nói lưu loát, hùng hồn", example: "She gave an eloquent speech that moved everyone.", phonetic: "/ˈel.ə.kwənt/", tag: "Adjective", mastered: false, streak: 3, addedAt: "Aug 20" },
  { id: 5, word: "Resilient", meaning: "Kiên cường, có khả năng phục hồi", example: "He remained resilient through every hardship.", phonetic: "/rɪˈzɪl.i.ənt/", tag: "Adjective", mastered: true, streak: 7, addedAt: "Aug 18" },
  { id: 6, word: "Luminous", meaning: "Phát sáng; rực rỡ", example: "The luminous moon lit the entire valley.", phonetic: "/ˈluː.mɪ.nəs/", tag: "Adjective", mastered: false, streak: 0, addedAt: "Aug 15" },
];

const TAGS = ["Noun", "Verb", "Adjective", "Adverb", "Phrase", "Idiom"];
type Section = "dashboard" | "inbox" | "flashcard" | "writing" | "quiz" | "progress" | "add";

function DashIcon({ size, color }: { size: number; color: string }) {
  return <svg width={size} height={size} viewBox="0 0 16 16" fill="none"><rect x="1.5" y="1.5" width="6" height="6" rx="1.5" stroke={color} strokeWidth="1.3" /><rect x="8.5" y="1.5" width="6" height="6" rx="1.5" stroke={color} strokeWidth="1.3" /><rect x="1.5" y="8.5" width="6" height="6" rx="1.5" stroke={color} strokeWidth="1.3" /><rect x="8.5" y="8.5" width="6" height="6" rx="1.5" stroke={color} strokeWidth="1.3" /></svg>;
}
function BookIcon({ size, color }: { size: number; color: string }) {
  return <svg width={size} height={size} viewBox="0 0 16 16" fill="none"><path d="M3 2h7a1 1 0 011 1v9a1 1 0 01-1 1H3V2z" stroke={color} strokeWidth="1.3" /><path d="M10 2h1a1 1 0 011 1v9a1 1 0 01-1 1h-1" stroke={color} strokeWidth="1.3" /><path d="M5 5h4M5 7.5h4M5 10h2" stroke={color} strokeWidth="1.2" strokeLinecap="round" /></svg>;
}
function CardIcon({ size, color }: { size: number; color: string }) {
  return <svg width={size} height={size} viewBox="0 0 16 16" fill="none"><rect x="1.5" y="3.5" width="10" height="7" rx="1.5" stroke={color} strokeWidth="1.3" /><rect x="4.5" y="5.5" width="10" height="7" rx="1.5" stroke={color} strokeWidth="1.3" strokeDasharray="2 1.5" /></svg>;
}
function PenIcon({ size, color }: { size: number; color: string }) {
  return <svg width={size} height={size} viewBox="0 0 16 16" fill="none"><path d="M10.5 2.5l3 3L5 14H2v-3L10.5 2.5z" stroke={color} strokeWidth="1.3" strokeLinejoin="round" /></svg>;
}
function QuizIcon({ size, color }: { size: number; color: string }) {
  return <svg width={size} height={size} viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke={color} strokeWidth="1.3" /><path d="M6.5 6.5a1.5 1.5 0 113 0c0 1-1.5 1.5-1.5 2.5" stroke={color} strokeWidth="1.3" strokeLinecap="round" /><circle cx="8" cy="11.5" r="0.75" fill={color} /></svg>;
}
function ChartIcon({ size, color }: { size: number; color: string }) {
  return <svg width={size} height={size} viewBox="0 0 16 16" fill="none"><path d="M2 12l3.5-4L9 10l5-6" stroke={color} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /><path d="M2 14h12" stroke={color} strokeWidth="1.3" strokeLinecap="round" /></svg>;
}

const NAV = [
  { id: "dashboard" as Section, label: "Dashboard", icon: DashIcon },
  { id: "inbox" as Section, label: "Vocabulary", icon: BookIcon },
  { id: "flashcard" as Section, label: "Flashcards", icon: CardIcon },
  { id: "writing" as Section, label: "Writing", icon: PenIcon },
  { id: "quiz" as Section, label: "Quiz", icon: QuizIcon },
  { id: "progress" as Section, label: "Progress", icon: ChartIcon },
];

export default function App() {
  const [section, setSection] = useState<Section>("dashboard");
  const [words, setWords] = useState<Word[]>(INITIAL_WORDS);

  return (
    <div style={{ display: "flex", height: "100%", background: "#F5F5F7", fontFamily: "'Inter', -apple-system, sans-serif" }}>
      <Sidebar section={section} setSection={setSection} words={words} />
      <main style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column" }}>
        {section === "dashboard" && <DashboardSection words={words} setSection={setSection} />}
        {section === "inbox" && <InboxSection words={words} setWords={setWords} setSection={setSection} />}
        {section === "flashcard" && <FlashcardSection words={words} setWords={setWords} />}
        {section === "writing" && <WritingSection words={words} />}
        {section === "quiz" && <QuizSection words={words} setWords={setWords} />}
        {section === "progress" && <ProgressSection words={words} />}
        {section === "add" && <AddWordSection words={words} setWords={setWords} setSection={setSection} />}
      </main>
    </div>
  );
}

/* ─── SIDEBAR ─── */
function Sidebar({ section, setSection, words }: {
  section: Section; setSection: (s: Section) => void; words: Word[];
}) {
  const mastered = words.filter(w => w.mastered).length;
  const pct = Math.round((mastered / Math.max(words.length, 1)) * 100);

  return (
    <aside style={{
      width: 240, flexShrink: 0, display: "flex", flexDirection: "column",
      background: "rgba(28,28,30,0.95)", backdropFilter: "blur(20px)",
      borderRight: "1px solid rgba(255,255,255,0.08)",
    }}>
      {/* App header */}
      <div style={{ padding: "28px 20px 20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            background: "linear-gradient(135deg, #0071E3, #34AADC)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 16,
          }}>
            📖
          </div>
          <div>
            <div style={{ color: "#F5F5F7", fontSize: 14, fontWeight: 600, letterSpacing: -0.3 }}>Lexicon</div>
            <div style={{ color: "#636366", fontSize: 11, marginTop: 1 }}>by Apple</div>
          </div>
        </div>
      </div>

      {/* Progress ring area */}
      <div style={{ margin: "0 16px 20px", padding: "14px 16px", background: "rgba(255,255,255,0.05)", borderRadius: 12 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8 }}>
          <span style={{ color: "#EBEBF5", fontSize: 12, fontWeight: 500 }}>Today's Progress</span>
          <span style={{ color: "#0071E3", fontSize: 12, fontWeight: 600 }}>{pct}%</span>
        </div>
        <div style={{ height: 4, background: "rgba(255,255,255,0.1)", borderRadius: 99 }}>
          <div style={{ height: "100%", borderRadius: 99, background: "linear-gradient(90deg, #0071E3, #34AADC)", width: `${pct}%`, transition: "width 0.6s ease" }} />
        </div>
        <div style={{ color: "#636366", fontSize: 11, marginTop: 6 }}>{mastered} of {words.length} mastered</div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: "0 10px" }}>
        <div style={{ color: "#48484A", fontSize: 11, fontWeight: 600, letterSpacing: 0.5, padding: "0 10px", marginBottom: 6 }}>LEARN</div>
        {NAV.map(item => {
          const active = section === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setSection(item.id)}
              style={{
                width: "100%", display: "flex", alignItems: "center", gap: 10,
                padding: "9px 12px", borderRadius: 8, border: "none", cursor: "pointer",
                background: active ? "rgba(0,113,227,0.25)" : "transparent",
                color: active ? "#0071E3" : "#EBEBF5",
                fontSize: 14, fontWeight: active ? 600 : 400,
                textAlign: "left", transition: "all 0.15s ease",
                marginBottom: 2,
              }}
            >
              <span style={{ opacity: active ? 1 : 0.6, display: "flex" }}>
                <item.icon size={16} color={active ? "#0071E3" : "#EBEBF5"} />
              </span>
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Add word button */}
      <div style={{ padding: "16px 16px 24px" }}>
        <button
          onClick={() => setSection("add")}
          style={{
            width: "100%", padding: "10px", borderRadius: 10,
            background: "#0071E3", color: "#fff", border: "none", cursor: "pointer",
            fontSize: 13, fontWeight: 600, letterSpacing: -0.2,
            display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
            transition: "opacity 0.15s",
          }}
          onMouseOver={e => (e.currentTarget.style.opacity = "0.88")}
          onMouseOut={e => (e.currentTarget.style.opacity = "1")}
        >
          <span style={{ fontSize: 16, lineHeight: 1 }}>+</span> New Word
        </button>
      </div>
    </aside>
  );
}

/* ─── DASHBOARD ─── */
const HEATMAP_DATA = Array.from({ length: 16 * 7 }, () => {
  const v = Math.random();
  return v > 0.75 ? 4 : v > 0.55 ? 3 : v > 0.35 ? 2 : v > 0.18 ? 1 : 0;
});
const MONTHS = ["May", "Jun", "Jul", "Aug"];

type Quest = { id: string; label: string; target: number; done: number; icon: string; color: string; section: Section };

function DashboardSection({ words, setSection }: { words: Word[]; setSection: (s: Section) => void }) {
  const mastered = words.filter(w => w.mastered).length;
  const pct = Math.round((mastered / Math.max(words.length, 1)) * 100);
  const totalStreak = words.reduce((a, w) => a + w.streak, 0);
  const recentWords = [...words].slice(-3).reverse();
  const topWord = [...words].sort((a, b) => b.streak - a.streak)[0];
  const heatColors = ["#EAEDF0", "#BAD5F5", "#5BA4F5", "#1A73E8", "#0071E3"];

  const [quests, setQuests] = useState<Quest[]>([
    { id: "fc", label: "Review Flashcards", target: 2, done: 0, icon: "🃏", color: "#5E5CE6", section: "flashcard" },
    { id: "wr", label: "Writing Practice", target: 2, done: 0, icon: "✒️", color: "#30D158", section: "writing" },
    { id: "qz", label: "Complete a Quiz", target: 3, done: 0, icon: "📮", color: "#FF9F0A", section: "quiz" },
    { id: "vb", label: "Add New Words", target: 1, done: 0, icon: "📖", color: "#0071E3", section: "add" },
    { id: "mk", label: "Mark Words Mastered", target: 2, done: 0, icon: "⭐", color: "#FF3B30", section: "inbox" },
  ]);

  const totalQ = quests.length;
  const doneQ = quests.filter(q => q.done >= q.target).length;
  const questPct = Math.round((doneQ / totalQ) * 100);

  const tick = (id: string) => {
    setQuests(qs => qs.map(q => q.id === id && q.done < q.target ? { ...q, done: q.done + 1 } : q));
  };

  return (
    <div className="fade-up" style={{ padding: "40px 48px", maxWidth: 960, margin: "0 auto", width: "100%" }}>
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 34, fontWeight: 700, color: "#1D1D1F", letterSpacing: -0.8, marginBottom: 4 }}>
          Good morning 👋
        </h1>
        <p style={{ fontSize: 15, color: "#86868B" }}>
          {topWord ? `Best streak: "${topWord.word}" — ${topWord.streak}🔥` : "Start learning your first word today."}
        </p>
      </div>

      {/* ── PINTEREST LAYOUT ── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gridTemplateRows: "auto", gap: 14, marginBottom: 16 }}>

        {/* TODAY'S QUEST — spans 2 cols, prominent */}
        <div style={{
          gridColumn: "1 / 3", gridRow: "1 / 2",
          background: "linear-gradient(135deg, #1C1C1E 0%, #2C2C2E 100%)",
          borderRadius: 20, padding: "26px 28px",
          boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
          border: "1px solid rgba(255,255,255,0.07)",
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                <span style={{ fontSize: 18 }}>⚡</span>
                <span style={{ fontSize: 18, fontWeight: 700, color: "#F5F5F7", letterSpacing: -0.4 }}>Today's Quest</span>
              </div>
              <div style={{ fontSize: 12, color: "#636366" }}>
                {doneQ} of {totalQ} completed · {new Date().toLocaleDateString("en-GB", { weekday: "long", month: "short", day: "numeric" })}
              </div>
            </div>
            {/* Ring */}
            <div style={{ position: "relative", width: 52, height: 52, flexShrink: 0 }}>
              <svg width="52" height="52" viewBox="0 0 52 52">
                <circle cx="26" cy="26" r="22" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="4" />
                <circle cx="26" cy="26" r="22" fill="none" stroke="#0071E3" strokeWidth="4"
                  strokeDasharray={`${2 * Math.PI * 22}`}
                  strokeDashoffset={`${2 * Math.PI * 22 * (1 - questPct / 100)}`}
                  strokeLinecap="round" transform="rotate(-90 26 26)"
                  style={{ transition: "stroke-dashoffset 0.5s ease" }}
                />
              </svg>
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "#F5F5F7" }}>
                {questPct}%
              </div>
            </div>
          </div>

          {/* Quest items */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {quests.map(q => {
              const completed = q.done >= q.target;
              return (
                <div key={q.id} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  {/* Checkbox */}
                  <button
                    onClick={() => tick(q.id)}
                    style={{
                      width: 22, height: 22, borderRadius: 6, flexShrink: 0,
                      background: completed ? q.color : "rgba(255,255,255,0.06)",
                      border: completed ? "none" : `1.5px solid rgba(255,255,255,0.15)`,
                      cursor: completed ? "default" : "pointer",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 11, color: "#fff",
                      transition: "all 0.2s",
                    }}
                  >
                    {completed ? "✓" : ""}
                  </button>
                  {/* Icon + label */}
                  <span style={{ fontSize: 14 }}>{q.icon}</span>
                  <div style={{ flex: 1 }}>
                    <span style={{ fontSize: 13, color: completed ? "#636366" : "#EBEBF5", fontWeight: 500, textDecoration: completed ? "line-through" : "none" }}>
                      {q.label}
                    </span>
                  </div>
                  {/* Mini progress dots */}
                  <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
                    {Array.from({ length: q.target }, (_, i) => (
                      <div key={i} style={{
                        width: 8, height: 8, borderRadius: "50%",
                        background: i < q.done ? q.color : "rgba(255,255,255,0.1)",
                        transition: "background 0.2s",
                      }} />
                    ))}
                  </div>
                  {/* Go button */}
                  {!completed && (
                    <button
                      onClick={() => setSection(q.section)}
                      style={{
                        padding: "4px 10px", borderRadius: 6, border: "none",
                        background: `${q.color}22`, color: q.color,
                        fontSize: 11, fontWeight: 600, cursor: "pointer", fontFamily: "inherit",
                      }}
                    >
                      Go →
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* VOCABULARY — tall right card */}
        <PreviewCard
          id="inbox" label="Vocabulary" icon={BookIcon} accent="#0071E3"
          desc={`${words.length} words`} setSection={setSection}
          style={{ gridColumn: "3 / 4", gridRow: "1 / 3" }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 4 }}>
            {recentWords.map(w => (
              <div key={w.id} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 30, height: 30, borderRadius: 8, background: "rgba(0,113,227,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: "#0071E3", flexShrink: 0 }}>{w.word[0]}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#1D1D1F", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{w.word}</div>
                  <div style={{ fontSize: 11, color: "#86868B", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{w.meaning}</div>
                </div>
              </div>
            ))}
            <div style={{ marginTop: 8, height: 1, background: "#F2F2F7" }} />
            <div style={{ fontSize: 11, color: "#86868B" }}>
              {words.filter(w => w.mastered).length} mastered · {words.filter(w => !w.mastered).length} learning
            </div>
            <div style={{ height: 5, background: "#F2F2F7", borderRadius: 99 }}>
              <div style={{ height: "100%", borderRadius: 99, background: "#0071E3", width: `${pct}%` }} />
            </div>
          </div>
        </PreviewCard>

        {/* FLASHCARD — medium */}
        <PreviewCard
          id="flashcard" label="Flashcards" icon={CardIcon} accent="#5E5CE6"
          desc={`${words.length - mastered} to review`} setSection={setSection}
          style={{ gridColumn: "1 / 2", gridRow: "2 / 3" }}
        >
          <div style={{ position: "relative", height: 60, marginTop: 4 }}>
            {[2, 1, 0].map(i => (
              <div key={i} style={{
                position: "absolute", left: i * 5, top: i * 4,
                width: `calc(100% - ${i * 10}px)`, height: 46,
                background: i === 0 ? "#fff" : i === 1 ? "#F0EFFE" : "#E0DFFE",
                borderRadius: 8, border: "1px solid #E5E5EA",
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: i === 0 ? "0 2px 8px rgba(0,0,0,0.07)" : "none",
              }}>
                {i === 0 && <span style={{ fontSize: 15, fontWeight: 700, color: "#1D1D1F", letterSpacing: -0.3 }}>{words[0]?.word}</span>}
              </div>
            ))}
          </div>
        </PreviewCard>

        {/* WRITING — small */}
        <PreviewCard
          id="writing" label="Writing" icon={PenIcon} accent="#30D158"
          desc="Active recall" setSection={setSection}
          style={{ gridColumn: "2 / 3", gridRow: "2 / 3" }}
        >
          <div style={{ background: "#F5F5F7", borderRadius: 8, padding: "9px 11px", marginTop: 4, backgroundImage: "repeating-linear-gradient(transparent, transparent 19px, #E5E5EA 20px)", lineHeight: "20px" }}>
            <span style={{ fontSize: 11, color: "#1D1D1F", fontStyle: "italic" }}>
              "Youth is <span style={{ borderBottom: "1.5px solid #30D158", fontWeight: 600, fontStyle: "normal" }}>ephemeral</span>…"
            </span>
          </div>
        </PreviewCard>

        {/* QUIZ — wide */}
        <PreviewCard
          id="quiz" label="Quiz" icon={QuizIcon} accent="#FF9F0A"
          desc="Test yourself" setSection={setSection}
          style={{ gridColumn: "1 / 3", gridRow: "3 / 4" }}
        >
          <div style={{ display: "flex", gap: 8, marginTop: 6, flexWrap: "wrap" }}>
            <div style={{ background: "#FFF8E6", border: "1px solid #FFD60A44", borderRadius: 8, padding: "7px 14px", fontSize: 12, fontWeight: 600, color: "#1D1D1F", flex: 1 }}>
              What does "Resilient" mean?
            </div>
            <div style={{ display: "flex", gap: 6 }}>
              {["Kiên cường ✓", "Phù du", "U sầu"].map((opt, i) => (
                <div key={i} style={{ padding: "7px 12px", borderRadius: 8, border: "1px solid #E5E5EA", background: i === 0 ? "rgba(48,209,88,0.1)" : "#fff", fontSize: 11, color: i === 0 ? "#30D158" : "#86868B", fontWeight: i === 0 ? 600 : 400, whiteSpace: "nowrap" }}>
                  {opt}
                </div>
              ))}
            </div>
          </div>
        </PreviewCard>

        {/* PROGRESS — right */}
        <PreviewCard
          id="progress" label="Progress" icon={ChartIcon} accent="#FF3B30"
          desc={`${pct}% mastery`} setSection={setSection}
          style={{ gridColumn: "3 / 4", gridRow: "3 / 4" }}
        >
          <div style={{ marginTop: 6 }}>
            <div style={{ display: "flex", justifyContent: "space-around", marginBottom: 10 }}>
              {[{ v: words.length, l: "Total", c: "#0071E3" }, { v: mastered, l: "Done", c: "#30D158" }, { v: totalStreak, l: "🔥", c: "#FF9F0A" }].map(s => (
                <div key={s.l} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 20, fontWeight: 700, color: s.c, letterSpacing: -0.5 }}>{s.v}</div>
                  <div style={{ fontSize: 10, color: "#86868B" }}>{s.l}</div>
                </div>
              ))}
            </div>
            <div style={{ height: 5, background: "#F2F2F7", borderRadius: 99 }}>
              <div style={{ height: "100%", borderRadius: 99, background: "linear-gradient(90deg,#0071E3,#30D158)", width: `${pct}%` }} />
            </div>
          </div>
        </PreviewCard>
      </div>

      {/* ── HEATMAP ── */}
      <div style={{ background: "#fff", borderRadius: 18, border: "1px solid #E5E5EA", padding: "24px 28px", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#1D1D1F", letterSpacing: -0.3 }}>Study Streak</div>
            <div style={{ fontSize: 13, color: "#86868B", marginTop: 2 }}>
              {HEATMAP_DATA.filter(v => v > 0).length} active days in the last 16 weeks
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <span style={{ fontSize: 11, color: "#86868B" }}>Less</span>
            {heatColors.map((c, i) => <div key={i} style={{ width: 12, height: 12, borderRadius: 3, background: c }} />)}
            <span style={{ fontSize: 11, color: "#86868B" }}>More</span>
          </div>
        </div>
        <div style={{ display: "flex", gap: 0, marginBottom: 4, paddingLeft: 26 }}>
          {MONTHS.map((m, i) => <div key={i} style={{ flex: 1, fontSize: 11, color: "#86868B", fontWeight: 500 }}>{m}</div>)}
        </div>
        <div style={{ display: "flex", gap: 4 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 3, marginRight: 6 }}>
            {["Sun", "", "Tue", "", "Thu", "", "Sat"].map((d, i) => (
              <div key={i} style={{ height: 14, fontSize: 10, color: "#86868B", lineHeight: "14px" }}>{d}</div>
            ))}
          </div>
          {Array.from({ length: 16 }, (_, w) => (
            <div key={w} style={{ display: "flex", flexDirection: "column", gap: 3 }}>
              {Array.from({ length: 7 }, (_, d) => {
                const val = HEATMAP_DATA[w * 7 + d] ?? 0;
                return (
                  <div key={d} title={`${val} sessions`} style={{ width: 14, height: 14, borderRadius: 3, background: heatColors[val], transition: "transform 0.1s", cursor: "default" }}
                    onMouseOver={e => (e.currentTarget.style.transform = "scale(1.3)")}
                    onMouseOut={e => (e.currentTarget.style.transform = "scale(1)")}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PreviewCard({ id, label, icon: Icon, accent, desc, setSection, children, style: gridStyle }: {
  id: Section; label: string; icon: React.FC<{size:number;color:string}>; accent: string;
  desc: string; setSection: (s: Section) => void; children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <button
      onClick={() => setSection(id)}
      style={{
        ...gridStyle,
        background: "#fff", borderRadius: 18, border: "1px solid #E5E5EA",
        padding: 0, cursor: "pointer", textAlign: "left",
        boxShadow: "0 2px 6px rgba(0,0,0,0.04)",
        overflow: "hidden", display: "flex", flexDirection: "column",
        transition: "transform 0.15s ease, box-shadow 0.15s ease",
      }}
      onMouseOver={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.1)"; }}
      onMouseOut={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 2px 6px rgba(0,0,0,0.04)"; }}
    >
      <div style={{ padding: "15px 17px 0", display: "flex", alignItems: "center", gap: 9 }}>
        <div style={{ width: 30, height: 30, borderRadius: 8, background: `${accent}16`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <Icon size={15} color={accent} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#1D1D1F" }}>{label}</div>
          <div style={{ fontSize: 11, color: "#86868B" }}>{desc}</div>
        </div>
        <svg width="11" height="11" viewBox="0 0 12 12" fill="none" style={{ color: "#C7C7CC", flexShrink: 0 }}><path d="M4 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </div>
      <div style={{ padding: "10px 17px 16px", flex: 1 }}>{children}</div>
    </button>
  );
}

/* ─── INBOX ─── */
function InboxSection({ words, setWords, setSection }: { words: Word[]; setWords: (w: Word[]) => void; setSection: (s: Section) => void }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "mastered" | "learning">("all");
  const [expanded, setExpanded] = useState<number | null>(null);

  const filtered = words.filter(w => {
    const q = search.toLowerCase();
    return (w.word.toLowerCase().includes(q) || w.meaning.includes(q)) &&
      (filter === "all" || (filter === "mastered" ? w.mastered : !w.mastered));
  });

  const toggle = (id: number) => setWords(words.map(w => w.id === id ? { ...w, mastered: !w.mastered } : w));

  return (
    <div className="fade-up" style={{ padding: "40px 48px", maxWidth: 760, margin: "0 auto", width: "100%" }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 34, fontWeight: 700, color: "#1D1D1F", letterSpacing: -0.8, marginBottom: 6 }}>
          Vocabulary
        </h1>
        <p style={{ fontSize: 15, color: "#86868B", fontWeight: 400 }}>
          {words.length} words · {words.filter(w => w.mastered).length} mastered
        </p>
      </div>

      {/* Search + filter */}
      <div style={{ display: "flex", gap: 10, marginBottom: 24, flexWrap: "wrap" }}>
        <div style={{ flex: 1, minWidth: 200, position: "relative" }}>
          <SearchIcon size={15} color="#86868B" style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }} />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search words..."
            style={{
              width: "100%", padding: "9px 12px 9px 36px",
              background: "#fff", border: "1px solid #E5E5EA",
              borderRadius: 10, fontSize: 14, color: "#1D1D1F",
              outline: "none", fontFamily: "inherit",
              boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
            }}
          />
        </div>
        {(["all", "mastered", "learning"] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              padding: "9px 16px", borderRadius: 10, border: "1px solid",
              borderColor: filter === f ? "#0071E3" : "#E5E5EA",
              background: filter === f ? "#0071E3" : "#fff",
              color: filter === f ? "#fff" : "#1D1D1F",
              fontSize: 13, fontWeight: 500, cursor: "pointer", fontFamily: "inherit",
              boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
            }}
          >
            {f === "all" ? "All" : f === "mastered" ? "Mastered" : "Learning"}
          </button>
        ))}
      </div>

      {/* Word list */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {filtered.map(w => (
          <div
            key={w.id}
            style={{
              background: "#fff", borderRadius: 14,
              border: "1px solid #E5E5EA",
              boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
              overflow: "hidden",
            }}
          >
            <button
              style={{
                width: "100%", padding: "16px 20px", background: "none", border: "none",
                cursor: "pointer", display: "flex", alignItems: "center", gap: 16, textAlign: "left",
              }}
              onClick={() => setExpanded(expanded === w.id ? null : w.id)}
            >
              <div style={{
                width: 40, height: 40, borderRadius: 10, flexShrink: 0, display: "flex",
                alignItems: "center", justifyContent: "center", fontSize: 15, fontWeight: 700,
                background: w.mastered ? "rgba(48,209,88,0.12)" : "rgba(0,113,227,0.08)",
                color: w.mastered ? "#30D158" : "#0071E3",
              }}>
                {w.word[0]}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 16, fontWeight: 600, color: "#1D1D1F", letterSpacing: -0.3 }}>{w.word}</span>
                  <span style={{ fontSize: 11, color: "#86868B", fontWeight: 400 }}>{w.phonetic}</span>
                  <TagPill label={w.tag} />
                  {w.mastered && <span style={{ fontSize: 11, color: "#30D158", fontWeight: 500 }}>✓ Mastered</span>}
                </div>
                <div style={{ fontSize: 13, color: "#86868B", marginTop: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {w.meaning}
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <StreakBadge count={w.streak} />
                <ChevronIcon rotated={expanded === w.id} />
              </div>
            </button>

            {expanded === w.id && (
              <div className="scale-in" style={{ padding: "0 20px 20px", borderTop: "1px solid #F2F2F7" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 16 }}>
                  <InfoCard label="Meaning" value={w.meaning} />
                  <InfoCard label="Example" value={`"${w.example}"`} italic />
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 16 }}>
                  <span style={{ fontSize: 12, color: "#86868B" }}>Added {w.addedAt}</span>
                  <button
                    onClick={() => toggle(w.id)}
                    style={{
                      padding: "7px 18px", borderRadius: 8, border: "1px solid",
                      borderColor: w.mastered ? "#E5E5EA" : "#30D158",
                      background: w.mastered ? "#F2F2F7" : "rgba(48,209,88,0.1)",
                      color: w.mastered ? "#86868B" : "#30D158",
                      fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit",
                    }}
                  >
                    {w.mastered ? "Unmark" : "Mark as Mastered"}
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "60px 0", color: "#86868B", fontSize: 15 }}>
            No words found
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── FLASHCARD ─── */
function FlashcardSection({ words, setWords }: { words: Word[]; setWords: (w: Word[]) => void }) {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [done, setDone] = useState<number[]>([]);

  const remaining = words.filter(w => !done.includes(w.id));
  const current = remaining[index % Math.max(remaining.length, 1)];

  const next = (mastered: boolean) => {
    if (!current) return;
    if (mastered) {
      setWords(words.map(w => w.id === current.id ? { ...w, streak: w.streak + 1 } : w));
      setDone([...done, current.id]);
    }
    setFlipped(false);
    setTimeout(() => setIndex(i => i + 1), 120);
  };

  if (remaining.length === 0) {
    return (
      <div className="fade-up" style={{ padding: "40px 48px", maxWidth: 600, margin: "0 auto", width: "100%", textAlign: "center" }}>
        <div style={{ fontSize: 64, marginBottom: 24 }}>🎉</div>
        <h1 style={{ fontSize: 28, fontWeight: 700, color: "#1D1D1F", letterSpacing: -0.6 }}>All done!</h1>
        <p style={{ fontSize: 15, color: "#86868B", marginTop: 8 }}>You reviewed all {words.length} cards today.</p>
        <button
          onClick={() => { setDone([]); setIndex(0); setFlipped(false); }}
          style={appleBtn}
        >
          Review Again
        </button>
      </div>
    );
  }

  const pct = Math.round((done.length / words.length) * 100);

  return (
    <div className="fade-up" style={{ padding: "40px 48px", maxWidth: 600, margin: "0 auto", width: "100%" }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 34, fontWeight: 700, color: "#1D1D1F", letterSpacing: -0.8, marginBottom: 6 }}>Flashcards</h1>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ flex: 1, height: 4, background: "#E5E5EA", borderRadius: 99 }}>
            <div style={{ height: "100%", borderRadius: 99, background: "linear-gradient(90deg, #0071E3, #34AADC)", width: `${pct}%`, transition: "width 0.5s ease" }} />
          </div>
          <span style={{ fontSize: 13, color: "#86868B", whiteSpace: "nowrap" }}>{done.length} / {words.length}</span>
        </div>
      </div>

      <div className="flip-card" style={{ height: 320, cursor: "pointer" }} onClick={() => setFlipped(!flipped)}>
        <div className={`flip-card-inner${flipped ? " flipped" : ""}`}>
          {/* Front */}
          <div className="flip-card-front" style={{
            background: "#fff", borderRadius: 20,
            border: "1px solid #E5E5EA",
            boxShadow: "0 8px 32px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04)",
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 48,
          }}>
            <TagPill label={current?.tag || ""} style={{ marginBottom: 24 }} />
            <div style={{ fontSize: 42, fontWeight: 700, color: "#1D1D1F", letterSpacing: -1.5, textAlign: "center" }}>
              {current?.word}
            </div>
            <div style={{ fontSize: 16, color: "#86868B", marginTop: 12, fontWeight: 400 }}>
              {current?.phonetic}
            </div>
            <div style={{ marginTop: 32, fontSize: 12, color: "#C7C7CC", fontWeight: 500, letterSpacing: 0.2 }}>
              TAP TO REVEAL
            </div>
          </div>
          {/* Back */}
          <div className="flip-card-back" style={{
            background: "linear-gradient(145deg, #0071E3, #0077ED)",
            borderRadius: 20,
            boxShadow: "0 8px 32px rgba(0,113,227,0.28), 0 2px 8px rgba(0,0,0,0.08)",
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 48,
          }}>
            <div style={{ fontSize: 22, fontWeight: 600, color: "#fff", textAlign: "center", letterSpacing: -0.4 }}>
              {current?.meaning}
            </div>
            <div style={{ width: 40, height: 1, background: "rgba(255,255,255,0.3)", margin: "20px 0" }} />
            <div style={{ fontSize: 14, color: "rgba(255,255,255,0.75)", textAlign: "center", fontStyle: "italic", lineHeight: 1.6 }}>
              "{current?.example}"
            </div>
          </div>
        </div>
      </div>

      {flipped && (
        <div className="scale-in" style={{ display: "flex", gap: 12, marginTop: 20 }}>
          <button
            onClick={() => next(false)}
            style={{
              flex: 1, padding: "13px", borderRadius: 12, border: "1px solid #E5E5EA",
              background: "#fff", color: "#1D1D1F", fontSize: 14, fontWeight: 600,
              cursor: "pointer", fontFamily: "inherit",
              boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
            }}
          >
            Again
          </button>
          <button
            onClick={() => next(true)}
            style={{
              flex: 1, padding: "13px", borderRadius: 12, border: "none",
              background: "#30D158", color: "#fff", fontSize: 14, fontWeight: 600,
              cursor: "pointer", fontFamily: "inherit",
              boxShadow: "0 4px 16px rgba(48,209,88,0.3)",
            }}
          >
            Got it ✓
          </button>
        </div>
      )}
    </div>
  );
}

/* ─── WRITING ─── */
function WritingSection({ words }: { words: Word[] }) {
  const [wordIndex, setWordIndex] = useState(0);
  const [input, setInput] = useState("");
  const [checked, setChecked] = useState(false);
  const [correct, setCorrect] = useState(false);
  const [mode, setMode] = useState<"fill" | "letter">("fill");
  const [letter, setLetter] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const current = words[wordIndex % words.length];

  const check = () => {
    setCorrect(input.trim().toLowerCase() === current.word.toLowerCase());
    setChecked(true);
  };

  const nextWord = () => {
    setWordIndex(i => i + 1); setInput(""); setChecked(false);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  return (
    <div className="fade-up" style={{ padding: "40px 48px", maxWidth: 680, margin: "0 auto", width: "100%" }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 34, fontWeight: 700, color: "#1D1D1F", letterSpacing: -0.8, marginBottom: 6 }}>Writing Practice</h1>
        <p style={{ fontSize: 15, color: "#86868B" }}>Reinforce your memory through active recall</p>
      </div>

      {/* Mode switcher */}
      <div style={{ display: "inline-flex", background: "#E5E5EA", borderRadius: 10, padding: 3, marginBottom: 28 }}>
        {[{ id: "fill", label: "Fill in" }, { id: "letter", label: "Free write" }].map(m => (
          <button
            key={m.id}
            onClick={() => setMode(m.id as "fill" | "letter")}
            style={{
              padding: "7px 20px", borderRadius: 8, border: "none",
              background: mode === m.id ? "#fff" : "transparent",
              color: mode === m.id ? "#1D1D1F" : "#86868B",
              fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit",
              boxShadow: mode === m.id ? "0 1px 4px rgba(0,0,0,0.1)" : "none",
              transition: "all 0.2s",
            }}
          >
            {m.label}
          </button>
        ))}
      </div>

      {mode === "fill" ? (
        <div>
          {/* Hint card */}
          <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #E5E5EA", padding: "24px 28px", marginBottom: 16, boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: "#86868B", letterSpacing: 0.5, marginBottom: 12 }}>MEANING</div>
            <div style={{ fontSize: 18, fontWeight: 500, color: "#1D1D1F", marginBottom: 12 }}>{current.meaning}</div>
            <div style={{ fontSize: 14, color: "#86868B", fontStyle: "italic", lineHeight: 1.5 }}>
              "{current.example.replace(new RegExp(current.word, "i"), "___________")}"
            </div>
            <div style={{ display: "flex", gap: 16, marginTop: 14 }}>
              <Hint label="Phonetic" value={current.phonetic} />
              <Hint label="Letters" value={`${current.word.length} letters`} />
              <Hint label="Type" value={current.tag} />
            </div>
          </div>

          {/* Input */}
          <div style={{ background: "#fff", borderRadius: 16, border: `1.5px solid ${checked ? (correct ? "#30D158" : "#FF3B30") : "#E5E5EA"}`, padding: "20px 24px", boxShadow: "0 1px 4px rgba(0,0,0,0.05)", transition: "border-color 0.2s" }}>
            <input
              ref={inputRef}
              value={input}
              onChange={e => { setInput(e.target.value); setChecked(false); }}
              onKeyDown={e => e.key === "Enter" && !checked && check()}
              disabled={checked}
              placeholder="Type the word..."
              style={{
                width: "100%", background: "none", border: "none",
                fontSize: 24, fontWeight: 600, color: "#1D1D1F",
                outline: "none", letterSpacing: -0.5, fontFamily: "inherit",
              }}
            />
            {checked && (
              <div style={{ fontSize: 14, color: correct ? "#30D158" : "#FF3B30", marginTop: 8, fontWeight: 500 }}>
                {correct ? "✓ Correct!" : `✗ The word is: ${current.word}`}
              </div>
            )}
          </div>

          <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
            {!checked
              ? <button onClick={check} style={appleBtn}>Check</button>
              : <button onClick={nextWord} style={appleBtn}>Next word →</button>
            }
          </div>
        </div>
      ) : (
        <div>
          <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #E5E5EA", padding: "8px 24px 24px", boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: "#86868B", letterSpacing: 0.5, padding: "16px 0 12px", borderBottom: "1px solid #F2F2F7", marginBottom: 16 }}>
              USE THESE WORDS: {words.map(w => w.word).join(" · ")}
            </div>
            <textarea
              value={letter}
              onChange={e => setLetter(e.target.value)}
              placeholder="Write a paragraph using the vocabulary above..."
              style={{
                width: "100%", minHeight: 240, background: "none", border: "none",
                fontSize: 15, color: "#1D1D1F", fontFamily: "inherit",
                lineHeight: 1.7, resize: "none", outline: "none",
              }}
            />
          </div>
          <div style={{ fontSize: 12, color: "#86868B", marginTop: 8 }}>
            {letter.split(/\s+/).filter(Boolean).length} words written
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── QUIZ ─── */
function QuizSection({ words, setWords }: { words: Word[]; setWords: (w: Word[]) => void }) {
  const [questions] = useState(() =>
    words.map(w => {
      const others = words.filter(x => x.id !== w.id).sort(() => Math.random() - 0.5).slice(0, 3);
      const choices = [w.meaning, ...others.map(o => o.meaning)].sort(() => Math.random() - 0.5);
      return { word: w, choices, answer: w.meaning };
    })
  );
  const [qIndex, setQIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const current = questions[qIndex];

  const pick = (c: string) => {
    if (selected) return;
    setSelected(c);
    if (c === current.answer) setScore(s => s + 1);
  };

  const next = () => {
    if (qIndex + 1 >= questions.length) setDone(true);
    else { setQIndex(i => i + 1); setSelected(null); }
  };

  if (done) {
    const pct = Math.round((score / questions.length) * 100);
    const color = pct >= 80 ? "#30D158" : pct >= 50 ? "#FF9F0A" : "#FF3B30";
    return (
      <div className="fade-up" style={{ padding: "40px 48px", maxWidth: 520, margin: "0 auto", width: "100%", textAlign: "center" }}>
        <div style={{ fontSize: 72, fontWeight: 800, color, letterSpacing: -3 }}>{pct}%</div>
        <div style={{ fontSize: 20, fontWeight: 600, color: "#1D1D1F", marginTop: 8 }}>
          {score} / {questions.length} correct
        </div>
        <div style={{ fontSize: 15, color: "#86868B", marginTop: 8 }}>
          {pct === 100 ? "Perfect score! 🎉" : pct >= 80 ? "Great job! 👏" : pct >= 50 ? "Good effort, keep practicing." : "Don't give up — review and retry!"}
        </div>
        <button onClick={() => { setQIndex(0); setSelected(null); setScore(0); setDone(false); }} style={{ ...appleBtn, marginTop: 32 }}>
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="fade-up" style={{ padding: "40px 48px", maxWidth: 560, margin: "0 auto", width: "100%" }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 34, fontWeight: 700, color: "#1D1D1F", letterSpacing: -0.8, marginBottom: 12 }}>Quiz</h1>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ flex: 1, height: 4, background: "#E5E5EA", borderRadius: 99 }}>
            <div style={{ height: "100%", borderRadius: 99, background: "#0071E3", width: `${((qIndex + 1) / questions.length) * 100}%`, transition: "width 0.3s" }} />
          </div>
          <span style={{ fontSize: 13, color: "#86868B", fontWeight: 500 }}>{qIndex + 1}/{questions.length}</span>
        </div>
      </div>

      {/* Question card */}
      <div style={{ background: "#fff", borderRadius: 20, border: "1px solid #E5E5EA", padding: "40px", textAlign: "center", marginBottom: 20, boxShadow: "0 4px 16px rgba(0,0,0,0.06)" }}>
        <div style={{ fontSize: 11, fontWeight: 600, color: "#86868B", letterSpacing: 0.5, marginBottom: 16 }}>WHAT DOES THIS MEAN?</div>
        <div style={{ fontSize: 38, fontWeight: 700, color: "#1D1D1F", letterSpacing: -1 }}>{current.word.word}</div>
        <div style={{ fontSize: 15, color: "#86868B", marginTop: 8 }}>{current.word.phonetic}</div>
      </div>

      {/* Choices */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {current.choices.map((choice, i) => {
          const isSelected = selected === choice;
          const isCorrect = choice === current.answer;
          let bg = "#fff", border = "#E5E5EA", color = "#1D1D1F";
          if (selected) {
            if (isCorrect) { bg = "rgba(48,209,88,0.08)"; border = "#30D158"; color = "#1D7A38"; }
            else if (isSelected) { bg = "rgba(255,59,48,0.08)"; border = "#FF3B30"; color = "#C0392B"; }
          }
          return (
            <button
              key={i}
              onClick={() => pick(choice)}
              style={{
                padding: "15px 20px", borderRadius: 12, border: `1px solid ${border}`,
                background: bg, color, fontSize: 14, fontWeight: 500,
                cursor: selected ? "default" : "pointer", textAlign: "left",
                fontFamily: "inherit", transition: "all 0.2s",
                boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
              }}
            >
              <span style={{ color: "#C7C7CC", marginRight: 12, fontSize: 13 }}>{String.fromCharCode(65 + i)}.</span>
              {choice}
            </button>
          );
        })}
      </div>

      {selected && (
        <button onClick={next} style={{ ...appleBtn, width: "100%", marginTop: 16, justifyContent: "center" }}>
          {qIndex + 1 >= questions.length ? "See Results" : "Next →"}
        </button>
      )}
    </div>
  );
}

/* ─── PROGRESS ─── */
function ProgressSection({ words }: { words: Word[] }) {
  const mastered = words.filter(w => w.mastered).length;
  const pct = Math.round((mastered / Math.max(words.length, 1)) * 100);
  const totalStreak = words.reduce((a, w) => a + w.streak, 0);

  return (
    <div className="fade-up" style={{ padding: "40px 48px", maxWidth: 760, margin: "0 auto", width: "100%" }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 34, fontWeight: 700, color: "#1D1D1F", letterSpacing: -0.8, marginBottom: 6 }}>Progress</h1>
        <p style={{ fontSize: 15, color: "#86868B" }}>Your learning journey at a glance</p>
      </div>

      {/* Stat cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginBottom: 24 }}>
        {[
          { label: "Total Words", value: words.length, color: "#0071E3", unit: "" },
          { label: "Mastered", value: mastered, color: "#30D158", unit: "" },
          { label: "Streak Score", value: totalStreak, color: "#FF9F0A", unit: "🔥" },
        ].map(s => (
          <div key={s.label} style={{ background: "#fff", borderRadius: 16, border: "1px solid #E5E5EA", padding: "22px 24px", boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
            <div style={{ fontSize: 36, fontWeight: 700, color: s.color, letterSpacing: -1 }}>
              {s.value}{s.unit}
            </div>
            <div style={{ fontSize: 13, color: "#86868B", marginTop: 4, fontWeight: 500 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Mastery */}
      <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #E5E5EA", padding: "24px 28px", marginBottom: 14, boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 12 }}>
          <div style={{ fontSize: 16, fontWeight: 600, color: "#1D1D1F" }}>Mastery Progress</div>
          <div style={{ fontSize: 22, fontWeight: 700, color: "#0071E3" }}>{pct}%</div>
        </div>
        <div style={{ height: 8, background: "#F2F2F7", borderRadius: 99, overflow: "hidden" }}>
          <div style={{ height: "100%", borderRadius: 99, background: "linear-gradient(90deg, #0071E3, #30D158)", width: `${pct}%`, transition: "width 0.8s ease" }} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
          <span style={{ fontSize: 12, color: "#86868B" }}>Learning: {words.length - mastered}</span>
          <span style={{ fontSize: 12, color: "#30D158", fontWeight: 500 }}>Mastered: {mastered}</span>
        </div>
      </div>

      {/* Top words */}
      <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #E5E5EA", padding: "24px 28px", marginBottom: 14, boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
        <div style={{ fontSize: 16, fontWeight: 600, color: "#1D1D1F", marginBottom: 18 }}>Top Streak Words</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {[...words].sort((a, b) => b.streak - a.streak).slice(0, 5).map((w, i) => (
            <div key={w.id} style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ width: 22, fontSize: 13, color: "#86868B", fontWeight: 600 }}>{i + 1}</div>
              <div style={{ flex: 1, fontSize: 15, fontWeight: 600, color: "#1D1D1F" }}>{w.word}</div>
              <div style={{ width: 100, height: 4, background: "#F2F2F7", borderRadius: 99 }}>
                <div style={{ height: "100%", borderRadius: 99, background: "#FF9F0A", width: `${Math.min(100, w.streak * 14)}%` }} />
              </div>
              <div style={{ fontSize: 13, color: "#FF9F0A", fontWeight: 600, width: 32 }}>🔥{w.streak}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Heatmap */}
      <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #E5E5EA", padding: "24px 28px", boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
        <div style={{ fontSize: 16, fontWeight: 600, color: "#1D1D1F", marginBottom: 16 }}>Study Calendar — August 2026</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 5 }}>
          {Array.from({ length: 31 }, (_, i) => {
            const v = Math.random();
            const bg = v > 0.7 ? "#0071E3" : v > 0.4 ? "#34AADC88" : v > 0.15 ? "#E5E5EA" : "#F2F2F7";
            return <div key={i} title={`Aug ${i + 1}`} style={{ aspectRatio: "1", background: bg, borderRadius: 4 }} />;
          })}
        </div>
        <div style={{ display: "flex", gap: 16, marginTop: 12 }}>
          {[["#F2F2F7", "None"], ["#E5E5EA", "Low"], ["#34AADC88", "Med"], ["#0071E3", "High"]].map(([c, l]) => (
            <div key={l} style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <div style={{ width: 10, height: 10, background: c, borderRadius: 3 }} />
              <span style={{ fontSize: 11, color: "#86868B" }}>{l}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── ADD WORD ─── */
function AddWordSection({ words, setWords, setSection }: { words: Word[]; setWords: (w: Word[]) => void; setSection: (s: Section) => void }) {
  const [form, setForm] = useState({ word: "", meaning: "", example: "", phonetic: "", tag: "Noun" });
  const [saved, setSaved] = useState(false);

  const update = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  const submit = () => {
    if (!form.word.trim() || !form.meaning.trim()) return;
    setWords([...words, { id: Date.now(), ...form, mastered: false, streak: 0, addedAt: "Aug 30" }]);
    setSaved(true);
    setTimeout(() => { setSaved(false); setForm({ word: "", meaning: "", example: "", phonetic: "", tag: "Noun" }); setSection("inbox"); }, 1200);
  };

  return (
    <div className="fade-up" style={{ padding: "40px 48px", maxWidth: 580, margin: "0 auto", width: "100%" }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 34, fontWeight: 700, color: "#1D1D1F", letterSpacing: -0.8, marginBottom: 6 }}>New Word</h1>
        <p style={{ fontSize: 15, color: "#86868B" }}>Add a word to your collection</p>
      </div>

      <div style={{ background: "#fff", borderRadius: 20, border: "1px solid #E5E5EA", padding: "32px 36px", boxShadow: "0 4px 16px rgba(0,0,0,0.06)" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {[
            { k: "word", label: "Word *", placeholder: "e.g. Ephemeral", large: true },
            { k: "phonetic", label: "Phonetic", placeholder: "e.g. /ɪˈfem.ər.əl/", large: false },
            { k: "meaning", label: "Meaning *", placeholder: "Vietnamese meaning", large: false },
            { k: "example", label: "Example sentence", placeholder: "A sentence using this word", large: false },
          ].map(f => (
            <div key={f.k}>
              <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#86868B", marginBottom: 7, letterSpacing: 0.2 }}>{f.label}</label>
              <input
                value={(form as Record<string, string>)[f.k]}
                onChange={e => update(f.k, e.target.value)}
                placeholder={f.placeholder}
                style={{
                  width: "100%", padding: "11px 14px",
                  background: "#F5F5F7", border: "1px solid transparent",
                  borderRadius: 10, fontSize: f.large ? 20 : 14, fontWeight: f.large ? 600 : 400,
                  color: "#1D1D1F", outline: "none", fontFamily: "inherit",
                  transition: "border-color 0.15s",
                }}
                onFocus={e => (e.target.style.borderColor = "#0071E3")}
                onBlur={e => (e.target.style.borderColor = "transparent")}
              />
            </div>
          ))}

          <div>
            <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#86868B", marginBottom: 9, letterSpacing: 0.2 }}>Word Type</label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {TAGS.map(t => (
                <button
                  key={t}
                  onClick={() => update("tag", t)}
                  style={{
                    padding: "7px 16px", borderRadius: 20, border: "1px solid",
                    borderColor: form.tag === t ? "#0071E3" : "#E5E5EA",
                    background: form.tag === t ? "rgba(0,113,227,0.08)" : "#F5F5F7",
                    color: form.tag === t ? "#0071E3" : "#86868B",
                    fontSize: 13, fontWeight: 500, cursor: "pointer", fontFamily: "inherit",
                  }}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div style={{ display: "flex", gap: 10, marginTop: 28 }}>
          <button
            onClick={submit}
            style={{
              flex: 1, padding: "13px",
              background: saved ? "#30D158" : "#0071E3",
              color: "#fff", border: "none", borderRadius: 12,
              fontSize: 15, fontWeight: 600, cursor: "pointer", fontFamily: "inherit",
              transition: "background 0.3s",
              boxShadow: saved ? "0 4px 16px rgba(48,209,88,0.35)" : "0 4px 16px rgba(0,113,227,0.35)",
            }}
          >
            {saved ? "✓ Saved!" : "Add Word"}
          </button>
          <button
            onClick={() => setSection("inbox")}
            style={{
              padding: "13px 22px", borderRadius: 12, border: "1px solid #E5E5EA",
              background: "#F5F5F7", color: "#86868B",
              fontSize: 15, fontWeight: 500, cursor: "pointer", fontFamily: "inherit",
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── SHARED COMPONENTS ─── */
function TagPill({ label, style: s }: { label: string; style?: React.CSSProperties }) {
  const colors: Record<string, [string, string]> = {
    Noun: ["#E8F0FE", "#1967D2"], Verb: ["#FEF3E2", "#E37400"],
    Adjective: ["#E6F4EA", "#137333"], Adverb: ["#FCE8E6", "#C5221F"],
    Phrase: ["#F3E8FD", "#7B1FA2"], Idiom: ["#E8EAED", "#3C4043"],
  };
  const [bg, color] = colors[label] || ["#F2F2F7", "#86868B"];
  return (
    <span style={{ padding: "2px 9px", borderRadius: 20, background: bg, color, fontSize: 11, fontWeight: 600, ...s }}>
      {label}
    </span>
  );
}

function StreakBadge({ count }: { count: number }) {
  if (count === 0) return null;
  return (
    <span style={{ fontSize: 12, color: "#FF9F0A", fontWeight: 500 }}>🔥{count}</span>
  );
}

function InfoCard({ label, value, italic }: { label: string; value: string; italic?: boolean }) {
  return (
    <div style={{ background: "#F5F5F7", borderRadius: 10, padding: "12px 14px" }}>
      <div style={{ fontSize: 11, fontWeight: 600, color: "#86868B", marginBottom: 5, letterSpacing: 0.3 }}>{label.toUpperCase()}</div>
      <div style={{ fontSize: 13, color: "#1D1D1F", fontStyle: italic ? "italic" : "normal", lineHeight: 1.5 }}>{value}</div>
    </div>
  );
}

function Hint({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div style={{ fontSize: 10, fontWeight: 600, color: "#C7C7CC", letterSpacing: 0.4 }}>{label.toUpperCase()}</div>
      <div style={{ fontSize: 13, color: "#86868B", marginTop: 2 }}>{value}</div>
    </div>
  );
}

function ChevronIcon({ rotated }: { rotated: boolean }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ transform: rotated ? "rotate(180deg)" : "none", transition: "transform 0.2s", color: "#C7C7CC" }}>
      <path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SearchIcon({ size, color, style: s }: { size: number; color: string; style?: React.CSSProperties }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" style={s}>
      <circle cx="6.5" cy="6.5" r="4.5" stroke={color} strokeWidth="1.5" />
      <path d="M10 10l3 3" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

const appleBtn: React.CSSProperties = {
  padding: "11px 24px", borderRadius: 10, border: "none",
  background: "#0071E3", color: "#fff",
  fontSize: 14, fontWeight: 600, cursor: "pointer",
  fontFamily: "'Inter', sans-serif",
  boxShadow: "0 4px 14px rgba(0,113,227,0.3)",
  display: "inline-flex", alignItems: "center", gap: 6,
};
