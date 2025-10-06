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


https://github.com/user-attachments/assets/4f9f6d2c-4998-4069-92a8-5534cbf8e75c



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

<div align="center">
  <img src="https://github.com/user-attachments/assets/c32370d0-b255-4e2e-a9b5-92985966336b" width="30%" />
  <img src="https://github.com/user-attachments/assets/5e572742-52ce-4e4f-9d40-ba4ebd1665fd" width="30%" />
  <img src="https://github.com/user-attachments/assets/577d5fe0-e6e0-4eb8-afa2-64d32652e129" width="30%" />
</div>

<div align="center">
  <img src="https://github.com/user-attachments/assets/b2db5340-f9bd-4902-9765-e06a9ee65cc4" width="30%" />
  <img src="https://github.com/user-attachments/assets/339265a3-c71f-4839-aa3b-3a0a69a2ad5b" width="30%" />
  <img src="https://github.com/user-attachments/assets/4771d469-f0c7-4df7-8531-e34d1a06aa54" width="30%" />
</div>

<div align="center">
  <img src="https://github.com/user-attachments/assets/a8498621-6c8e-4482-bd00-9c1476b479dd" width="30%" />
  <img src="https://github.com/user-attachments/assets/b0dc95c8-32b9-4d23-b1fb-c242086a97cd" width="30%" />
  <img src="https://github.com/user-attachments/assets/f47a54fb-20c5-4b71-a805-44bcc93b057f" width="30%" />
</div>

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

MIT License © 2025 — Created by Naman Agrawal
