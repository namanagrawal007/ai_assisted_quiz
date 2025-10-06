# 🧠 AI-Assisted Knowledge Quiz

An interactive web-based quiz generator that uses **Google Gemini 2.5 Flash** to create topic-based multiple-choice quizzes with explanations and personalized feedback.

---

## 🚀 1. Project Setup & Demo

### Web
```bash
# Install dependencies
npm install

# Run locally
npm start
```

### Build
```bash
npm run build
```

### Demo
You can record a short screen capture showing quiz generation and completion flow or deploy it using [Vercel](https://vercel.com/) / [Netlify](https://www.netlify.com/).

---

## 💡 2. Problem Understanding

The goal of this project is to create an AI-powered quiz generator that dynamically builds quizzes for any given topic and difficulty level.  
The user inputs:
- **Topic**
- **Difficulty (easy / medium / hard)**

The AI (Gemini 2.5 Flash) then generates:
- 5 multiple-choice questions (MCQs)
- Each question includes 4 options, the correct answer, and an explanation.  
After completion, the app provides **personalized feedback** based on the user’s score.

### Assumptions:
- Users want both learning and evaluation in a short interactive session.
- Gemini model is reliable in structured JSON generation.
- Only 5 questions per quiz to keep sessions short and focused.

---

## ✍️ 3. AI Prompts & Iterations

### Initial Prompt
Asked Gemini to “Generate 5 MCQs with 4 options and correct answers.”  
**Issue:** Returned unstructured text with extra explanations.

### Refined Prompt
Added explicit instruction:
> “Return only valid JSON, no markdown, no extra text.”

### Final Working Prompt
Included structure validation and a cleaning function (`cleanJsonResponse`) to extract valid JSON even if model adds formatting.

---

## 🏗️ 4. Architecture & Code Structure

### Folder Overview
```
src/
 ┣ components/          → UI components (quiz, results, etc.)
 ┣ contexts/            → React Context for state management
 ┣ services/
 ┃ ┗ aiService.ts       → Handles Gemini AI API calls
 ┣ types/               → Type definitions for QuizData & Difficulty
 ┣ App.tsx              → Root app component and router
 ┣ main.tsx             → React app entry point
 ┗ index.css            → Global styling (TailwindCSS)
```

### Core Files

- **`aiService.ts`**
  - Uses `@google/generative-ai`
  - Generates quiz questions and performance feedback
  - Handles retries and JSON cleaning

- **`App.tsx`**
  - Controls navigation between quiz creation, question display, and results

- **`contexts`**
  - Maintains quiz state and progress across components

---

## 🧩 5. Screenshots / Screen Recording

Include:
- Quiz generation screen  
- Question answering interface  
- Results and feedback screen  

*(Attach screenshots or a short screen recording here)*

---

## 🐞 6. Known Issues / Improvements

### Known Issues
- Occasionally the AI may output malformed JSON.
- Repeated retries increase latency.
- Limited customization of question types (MCQs only).

### Future Improvements
- Add true/false and fill-in-the-blank question types.
- Support timed quizzes.
- Include progress tracking and analytics.
- Allow exporting results as PDF.

---

## 🌟 7. Bonus Work

- Integrated **TailwindCSS** for a clean UI.  
- Implemented retry mechanism for stable AI responses.  
- JSON cleaning logic for robust parsing.  
- Configured ESLint + TypeScript for type safety and consistency.  
- Modular architecture for scalability.

---

## 🔐 Environment Variables

Create a `.env` file in the project root:
```bash
VITE_GEMINI_API_KEY=your_google_generative_ai_key
```

---

## 🧰 Tech Stack

- **Frontend:** React + TypeScript + Vite  
- **Styling:** TailwindCSS  
- **AI Model:** Google Gemini 2.5 Flash (`@google/generative-ai`)  
- **Build Tool:** Vite  
- **State Management:** React Context  

---

## 📄 License

MIT License © 2025 — Created by [Your Name]
