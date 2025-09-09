# Resume Builder

A full-stack web application for building, editing, and downloading professional resumes.  
Built with **React** (Vite), **Strapi** (Node.js), and a custom **PDF generation microservice**.

---

## Features

- User authentication with Clerk
- Create, edit, and manage multiple resumes
- AI-powered summary generation (Google Gemini)
- Download resumes as styled PDFs
- Modern, responsive UI with Tailwind CSS

---

## Project Structure

```
resumeBuilder/
│
├── Client/                # React frontend (Vite)
│   └── src/
│       └── ...            # Components, pages, context, etc.
│
├── Server/
│   ├── ResumeBuilder/     # Strapi backend (resume data API)
│   └── PDFService/        # Node.js microservice for PDF generation
│
└── package.json           # (empty, use Client/ and Server/ package.json)
```

---

## Prerequisites

- **Node.js** v18.x - v22.x
- **npm** v6+
- (Optional) MySQL/Postgres for production (default: SQLite for Strapi)

---

## Setup Instructions

### 1. Clone the Repository

```sh
git clone <repo-url>
cd resumeBuilder
```

---

### 2. Environment Variables

#### Client

- Copy `.env.local.example` to `.env.local` in `Client/` (create if missing).
- Set the following variables:
  - `VITE_CLERK_PUBLISHABLE_KEY` (from Clerk dashboard)
  - `VITE_STRAPI_API_KEY` (from Strapi admin > API Tokens)
  - `VITE_GEMINI_API_KEY` (from Google AI Studio)

#### Server/ResumeBuilder (Strapi)

- Copy `.env.example` to `.env` in `Server/ResumeBuilder/`
- Set secrets for:
  - `ADMIN_JWT_SECRET`
  - `API_TOKEN_SALT`
  - `TRANSFER_TOKEN_SALT`
  - `APP_KEYS`
  - Database credentials if not using SQLite

#### Server/PDFService

- No .env required by default.

---

### 3. Install Dependencies

#### Client

```sh
cd Client
npm install
```

#### Server/ResumeBuilder

```sh
cd ../Server/ResumeBuilder
npm install
```

#### Server/PDFService

```sh
cd ../PDFService
npm install
```

---

### 4. Running the Applications

#### Start Strapi (ResumeBuilder API)

```sh
cd Server/ResumeBuilder
npm run develop
# or
npm run start
```

- Runs on [http://localhost:1337](http://localhost:1337)
- Access Strapi admin at `/admin`

#### Start PDFService

```sh
cd ../PDFService
npm run start
```

- Runs on [http://localhost:5001](http://localhost:5001)

#### Start React Client

```sh
cd ../../../Client
npm run dev
```

- Runs on [http://localhost:5173](http://localhost:5173) (default Vite port)

---

## Usage

1. Open [http://localhost:5173](http://localhost:5173)
2. Sign in or sign up (Clerk authentication)
3. Create a new resume, fill in details, and use an AI summary if desired
4. Edit, preview, and download your resume as a PDF

---

## Tech Stack

- **Frontend:** React, Vite, Tailwind CSS, Clerk, Lucide, React Router
- **Backend:** Strapi (Node.js, REST API, SQLite/MySQL/Postgres)
- **PDF Generation:** Node.js, Express, Puppeteer, Tailwind CSS (for print styling)
- **AI Integration:** Google Gemini API

---

## Customization

- **PDF Styling:** Edit [Server/PDFService/controllers/pdfController.js](Server/PDFService/controllers/pdfController.js) for custom print styles.
- **Resume Data Model:** Modify Strapi content type in [Server/ResumeBuilder/src/api/user-resume/content-types/user-resume/schema.json](Server/ResumeBuilder/src/api/user-resume/content-types/user-resume/schema.json).

---

## Troubleshooting

- Ensure all environment variables are set correctly.
- If PDF download fails, check that PDFService is running and accessible.
- For CORS/API issues, verify backend URLs and allowed origins.

---

## License

This project is for educational/demo purposes.

---

## Credits

- [Strapi](https://strapi.io/)
- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Clerk](https://clerk.com/)
- [Google Gemini](https://ai.google.dev/)
- [Puppeteer](https://pptr.dev/)

---


## Contributing

Pull requests welcome! Please open an issue first for major changes.
