# Vipps U15 Prototype 🦊

A gamified financial learning app prototype for youngsters aged 12-14, featuring Vippsi - an AI-powered mascot guide.

![Vipps U15](https://via.placeholder.com/800x400/FF5B24/FFFFFF?text=Vipps+U15+Prototype)

## 🎯 Concept

This prototype demonstrates a redesigned Vipps experience for young users that teaches financial literacy through:

- **Playful saving goals** - Set and track personal savings targets
- **Gamified missions** - Complete daily challenges for rewards
- **Personalized AI tips** - Vippsi provides contextual, kid-friendly advice
- **Clear progress tracking** - Visual progress bars and statistics
- **Streaks and rewards** - Maintain learning habits with streak counters
- **Simplified learning lessons** - Duolingo-style financial education

## 📱 App Structure

### 6 Main Tabs

1. **Home (Hjem)** - Dashboard with balance, transactions, goals preview, and daily challenges
2. **Goals (Mål)** - Active/completed saving goals with progress tracking
3. **Insights (Innsikt)** - Simple spending categories with charts and AI explanations
4. **Learn (Lær)** - Duolingo-style lessons with XP, streaks, and quizzes
5. **Rewards (Premier)** - Badges, achievements, and Vippsi customization items
6. **Me (Meg)** - Profile, settings, family links, and AI transparency

### 🤖 Vippsi - The AI Mascot

Vippsi appears as a floating avatar on every screen and:
- Opens an AI assistant panel when tapped
- Gives contextual suggestions based on current tab
- Celebrates achievements
- Reminds users about goals and streaks
- Explains money concepts in kid-friendly language
- Features a "Year in Vippsi" summary

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the prototype.

## 🛠 Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** Lucide React

## 📁 Project Structure

```
├── app/
│   ├── globals.css      # Global styles & Tailwind
│   ├── layout.tsx       # Root layout
│   └── page.tsx         # Main app entry
├── components/
│   ├── BottomNav.tsx    # Tab navigation
│   ├── Header.tsx       # Reusable header
│   ├── Vippsi.tsx       # Floating mascot + AI panel
│   └── tabs/
│       ├── HomeTab.tsx
│       ├── GoalsTab.tsx
│       ├── InsightsTab.tsx
│       ├── LearnTab.tsx
│       ├── RewardsTab.tsx
│       └── MeTab.tsx
```

## 🎨 Design Features

- **Mobile-first design** (max-width: 430px)
- **Vipps brand colors** (Orange #FF5B24, Coral, Cream)
- **Playful animations** (bounces, floats, progress bars)
- **Glass morphism effects**
- **Norwegian language UI**
- **Accessibility-friendly** contrasts

## 🔮 Future Enhancements

This is a UI prototype. Future development could include:

- [ ] Backend integration for real transactions
- [ ] Actual AI/ML for personalized tips
- [ ] Parental dashboard and controls
- [ ] Push notifications for streaks
- [ ] More interactive quizzes
- [ ] Social features (friends, challenges)
- [ ] Real savings account integration

## 📝 Notes

- All data is placeholder/mock data
- No backend logic implemented
- Focus is on UI/UX demonstration
- Designed for concept validation

---

Made with ❤️ for young savers

