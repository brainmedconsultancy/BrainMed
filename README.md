# Study Abroad Consultancy Website

Modern React website for a study abroad consultancy with:

- public marketing site
- searchable colleges section
- student inquiry form
- Firebase Firestore storage
- Firebase Authentication admin login
- `/admin` dashboard for inquiry management

## Quick Start

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file from `.env.example` and add your Firebase config.

3. Start the development server:

```bash
npm run dev
```

## Firebase Setup

Create these services in Firebase:

- Authentication with Email/Password sign-in enabled
- Firestore Database

Use one admin account in Firebase Authentication and set the same email in:

```bash
VITE_ADMIN_EMAIL=admin@example.com
```

## Firestore Collection

The app stores form submissions in:

- `inquiries`

Each document includes:

- `name`
- `phone`
- `email`
- `course`
- `country`
- `message`
- `status`
- `createdAt`

## Routes

- `/` public website
- `/admin` admin login and dashboard
