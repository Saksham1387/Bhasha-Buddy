<img src="./public/readme-image.png" />
# Bhasha Buddy

Bhasha Buddy is a web application designed to support individuals with speech disabilities, such as stuttering and blocking. Leveraging cutting-edge deep learning models, it identifies speech impediments and recommends personalized exercises to help users improve their speaking abilities. Additionally, the platform provides contact information for local speech therapists and doctors, enabling users to seek professional consultation for further development.

## Features

- **Speech Disability Detection**: Deep learning models analyze speech patterns and identify specific disabilities.
- **Personalized Worksheets**: Based on the analysis, users receive tailored exercises designed to improve their speech fluency.
- **Doctor Recommendations**: Users can access contact details of nearby professionals for consultations and therapy.

## Tech Stack

- **[Next.js](https://nextjs.org/)** – Fast and modern React-based framework for web applications
- **[TypeScript](https://www.typescriptlang.org/)** – Type-safe JavaScript for scalable and maintainable code
- **[Tailwind CSS](https://tailwindcss.com/)** – Utility-first CSS framework for rapid UI development
- **[Neon](https://neon.tech/)** – Serverless, scalable PostgreSQL database
- **[Clerk](https://clerk.com/)** – User authentication and management system

## Getting Started

To run Bhasha Buddy locally, follow these steps:

### Prerequisites

Make sure you have Node.js installed. You can install it from [here](https://nodejs.org/).

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/bhasha-buddy.git
2. Navigate to the project directory:
   cd bhasha-buddy
3. npm install
 or
yarn install

4. Running the Application
To start the application, run:
npm run dev
 or
yarn dev
 or
pnpm dev
 or
bun dev

The app will be available at http://localhost:3000.

### Environment Variables
To configure the project, create a .env file in the root directory and add the following environment variables:
```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
CLERK_SECRET_KEY
NEXT_PUBLIC_URL_WHISPER 
NEXT_PUBLIC_URL_MODEL 
NEXT_PUBLIC_URL_DIFFUSION
DATABASE_URL
```

Ensure you replace these with the actual values required by the app.
