<div align="center">

# 🌌 Alok Singh | Interactive Voxel Portfolio

<a href="https://YOUR-VERCEL-LINK-HERE.vercel.app">
  <img src="https://img.shields.io/badge/🌍_Live_Demo-Click_Here-50c878?style=for-the-badge" alt="Live Demo" />
</a>

<br/>
<br/>

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Three.js](https://img.shields.io/badge/Three.js-WebGL-white?style=for-the-badge&logo=three.js&logoColor=black)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-black?style=for-the-badge&logo=framer&logoColor=blue)

*This is not just a static resume. This is a fully immersive, gamified web experience built with modern frontend architecture to stand out from the crowd.*

</div>

<hr/>

## ✨ Features at a Glance

| Feature | Description |
| :--- | :--- |
| **🎮 3D WebGL Avatar** | A fully interactive, responsive 3D voxel character rendered via React Three Fiber. |
| **🎨 Dynamic Theme Engine** | Switch between custom palettes (`Emerald`, `Diamond`, `Redstone`, `Amethyst`) that persist via `localStorage`. |
| **🔊 Spatial Audio** | Nostalgic Minecraft UI click sounds and XP orb sound effects that bring the UI to life. |
| **🕹️ Konami Code Secret** | Type `↑ ↑ ↓ ↓ ← → ← → B A` to unlock a hidden, interactive Nether Portal dimension. |
| **📸 Voxel Gallery** | A dynamic museum featuring Draggable Polaroids and glitchy Holograms powered by Framer Motion. |
| **📊 Live GitHub API** | Connects to the GitHub API to dynamically render real-time commit activity and stats. |

<br/>

## 🏗️ Architecture & Clean Code

This project was built with scalability and **separation of concerns** in mind. Rather than hardcoding data deep inside React components, all personal information is injected via a central state context.

```text
├── public/                 # Static assets, 3D models (.glb), and Gallery images
├── src/
│   ├── app/                # Next.js 14 App Router layout and pages
│   ├── components/         # Modular UI blocks (Hero, Projects, Skills)
│   ├── config/             # 📂 userConfig.ts (Central Database)
│   ├── context/            # Global State & Cache Syncing
│   ├── hooks/              # Custom React Hooks (useKonamiCode)
│   └── utils/              # Helper functions (soundManager, API fetcher)
```

> **Developer Note:** Every critical component in `src/` contains detailed JSDoc architectural comments outlining exactly **WHAT IT DOES** and **HOW IT CONNECTS**. 

<br/>

## ⚙️ Quick Start (For Developers)

Want to run this locally or fork it to build your own? 

```bash
# 1. Clone the repository
git clone https://github.com/SINGHALOK28/AS_portfolio.git

# 2. Enter the directory
cd AS_portfolio

# 3. Install dependencies
npm install

# 4. Fire up the development server
npm run dev
```

> Open `http://localhost:3000` to explore the universe locally.

<br/>

## 🛠️ Customizing Content

You **do not** need to hunt through hundreds of lines of React JSX to update this portfolio. 

Simply open `src/config/userConfig.ts` and modify the JSON object. The global `PortfolioConfigContext` will automatically detect the changes, bypass the cache, and instantly populate your new data across all interactive UI components, modals, and grids.

<hr/>

<div align="center">
  <sub>Built with passion, code, and a lot of caffeine by <b>Alok Singh</b></sub>
</div>
