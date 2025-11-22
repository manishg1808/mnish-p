
# Portfolio – React + Tailwind (Local JSON)

A fully frontend portfolio app. No backend, all data from local JSON files.

## Run Locally
```bash
npm install
npm run dev
```
Open the URL from the terminal.

## Where to Edit
- `src/data/projects.json` – list of projects (title, description, tech, image, link)
- `src/data/skills.json` – skills with levels (0–100)
- `src/pages/*` – page components
- `src/components/*` – shared components (Navbar, Footer, ProjectCard)

## Features
- React Router pages (Home, Projects, Skills, Contact)
- Tailwind styling, hover effects, responsive design
- Dark/Light mode toggle (saved to localStorage)
- Animated skill progress bars
- Smooth scroll enabled via `scroll-smooth` on `<html>`
