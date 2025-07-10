# Lexi Legal Assistant – Frontend Assignment

This project is a simulated legal assistant interface inspired by Lexi, designed using **React** and **Bootstrap**. It allows users to:

- Ask a legal question.
- See a simulated AI-generated answer.
- View related citations from legal documents.
- Click on citations to open the original PDF at the relevant location.

The interface mimics a **chat-like conversation UI** similar to ChatGPT.

---

## Tech Stack
- React (Vite)
- Bootstrap 5 (for styling)
- Simulated API (no backend)

---

## How to Run the Project

```bash
# 1. Install dependencies
npm install

# 2. Run the development server
npm run dev
Then open:
http://localhost:5173/

## 🖼️ Screenshot
![Screenshot](screenshot.png)

## 📄 Citation Linking Explanation
Citations are shown below the AI-generated answer inside the chat bubble.

Each citation includes:

Text describing the reference.

A clickable link (styled as a button/link) to open the PDF document.

When the user clicks on the citation link:

It opens the PDF in a new browser tab using target="_blank" with rel="noopener noreferrer" for safety.

The citation links simulate opening to the exact paragraph (as per the assignment instructions).

#Folder structure
src/
│
├── App.jsx          # Main chat-like UI logic
├── main.jsx         # React entry point
├── index.css        # Optional CSS
├── assets/          # Optional assets (if needed)
└── screenshot.png   # Screenshot for README


#Developed by
Enduri Rajkumar

