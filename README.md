# 🚀 Alok Singh | Interactive Digital Universe

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.0-cyan?style=for-the-badge&logo=tailwind-css)
![Three.js](https://img.shields.io/badge/Three.js-WebGL-white?style=for-the-badge&logo=three.js)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-Animation-purple?style=for-the-badge&logo=framer)

Welcome to the source code of my interactive, voxel/Minecraft-inspired personal portfolio! This is not just a static resume; it's a fully gamified, immersive web experience built with modern web technologies.

## ✨ Key Features

- **🎮 3D WebGL Avatar**: A fully interactive, responsive 3D voxel character rendered in the Hero section using React Three Fiber.
- **🎨 Dynamic Theme Engine**: Users can switch between custom color palettes (Emerald, Redstone, Diamond, Amethyst, Gold, Obsidian) globally. Themes persist across sessions via `localStorage`.
- **🔊 Spatial Audio & UI Sounds**: Features nostalgic Minecraft UI click sounds and experience orb sounds to enhance interactivity.
- **🕹️ Easter Eggs**: Includes a hidden Konami Code sequence (`↑ ↑ ↓ ↓ ← → ← → B A`) that unlocks a secret Nether Portal dimension!
- **📸 Interactive Gallery Museum**: A dynamic gallery featuring draggable polaroid physics, glitchy holograms, and standard memory cards.
- **📊 Live GitHub Stats**: Connects asynchronously to the GitHub API to fetch and display real-time commit activity and repositories.
- **🧩 Global State Management**: Centralized architecture where all personal data is isolated in `src/config/userConfig.ts`, meaning the entire portfolio can be updated without touching any React code.

## 🏗️ Architecture & Code Structure

The project follows a clean, highly modular component architecture:

```text
├── public/                 # Static assets, 3D models (.glb), PDFs, and Gallery images
├── src/
│   ├── app/                # Next.js 14 App Router layout and pages
│   ├── components/
│   │   ├── sections/       # Major UI blocks (Hero, Projects, Skills, Gallery, etc.)
│   │   └── ui/             # Reusable global elements (Navbar, Cards, Buttons, LoadingScreen)
│   ├── config/             # userConfig.ts - The centralized "Database" for all content
│   ├── context/            # PortfolioConfigContext - Handles global state, theme, and cache sync
│   ├── hooks/              # Custom React hooks (e.g., useKonamiCode)
│   └── utils/              # Helper functions (e.g., soundManager, GitHub API fetcher)
```

> **Developer Note:** Every major file in this codebase has been professionally annotated with architectural JSDoc comments explaining exactly `WHAT IT DOES` and `HOW IT CONNECTS TO OTHER FILES`. 

## 🚀 Getting Started Locally

To run this project on your local machine, follow these steps:

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/SINGHALOK28/AS_portfolio.git
   cd AS_portfolio
   ```

2. **Install the dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Explore the Universe:**
   Open your browser and navigate to [http://localhost:3000](http://localhost:3000).

## 🛠️ How to Customize (For other developers)

If you fork this repository to build your own portfolio, you do **not** need to hunt through hundreds of lines of React JSX to change the text. 

Simply open `src/config/userConfig.ts` and modify the JSON object. The global `PortfolioConfigContext` will automatically detect the changes, bypass the cache, and instantly populate the new data across all interactive UI components, modals, and grids.

## 📄 License

This project is open-source and available under the [MIT License](LICENSE). Feel free to fork it, learn from the WebGL integration, and use it as inspiration for your own interactive web applications!

---
*Built with passion, code, and a lot of caffeine by Alok Singh.*
