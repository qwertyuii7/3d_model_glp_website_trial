# Hintze Hall 3D: The Cathedral of Nature 🏛️

An interactive, editorial 3D web exhibition inspired by **Google Arts & Culture** (specifically the *Meroe Pyramids* experience). Explore the iconic central nave of the Natural History Museum in London through cinematic camera choreography and immersive storytelling.

![Hintze Hall Exhibition Preview](./client/public/models/preview.jpg)

## ✨ Features

- **Meroe-Inspired Editorial UI**: Clean, bold typography, full-bleed imagery, and a minimal layout designed to let the 3D architecture take center stage.
- **Sticky Storytelling Timeline**: Text cards lock into place as you scroll, giving you time to read and admire each specimen while the camera glides across the hall.
- **15 Curated Vantage Points**: Discover Hope the Blue Whale, the Missouri Leviathan Mastodon, Charles Darwin's Statue, the 3.5-billion-year-old Banded Iron Formation, and more.
- **Unobstructed Architectural Framing**: Meticulously calibrated camera orbits (`5m`–`10m` radius, `30deg`–`35deg` FOV) keep your view safely inside the central nave without clipping into stone pillars or arches.
- **Lenis Smooth Scrolling**: Premium inertial scroll physics with automatic fallback for users requesting reduced motion.
- **High-Performance WebGL**: Built with Google's `<model-viewer>` and Vite for lightning-fast loading and a lightweight production bundle (~230KB JS/CSS).
- **Developer & Calibration HUD**: Built-in inspection panel (`⌘ fps`) to monitor framerates, copy live camera presets, and toggle ambient gallery audio.

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- `npm` or `pnpm` / `yarn`

### Installation & Local Development

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/hintze-hall-3d.git
   cd hintze-hall-3d/client
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser to view the exhibition.

---

## 🏗️ Production Build

To build an optimized production bundle:
```bash
cd client
npm run build
```
The compiled static assets will be output to the `client/dist/` directory, ready to be hosted on Vercel, Netlify, GitHub Pages, or any static web server.

---

## 🗺️ Exhibition Highlights

| Section | Title | Subject & Framing |
| :--- | :--- | :--- |
| **01** | *Hintze Hall* | Grand southern nave entrance and Romanesque terracotta arches. |
| **02** | *Hope the Blue Whale* | High ceiling perspective alongside the 25.2m suspended skeleton. |
| **03** | *Missouri Leviathan* | American mastodon framed cleanly from the central aisle. |
| **04** | *Mantellisaurus* | Lower Cretaceous ornithopod dinosaur skeleton. |
| **05** | *Fossil Trees* | Primeval petrified tree trunks preserving ancient cellular structures. |
| **06** | *Banded Iron Formation* | 3.5-billion-year-old rock chronicle of the Great Oxidation Event. |
| **08** | *Statue of Charles Darwin* | Sir Joseph Boehm’s marble statue overlooking the north stairs. |
| **15** | *Whale's Eye View* | Ultimate panoramic perspective looking down from the apex of the roof. |

---

## 🛠️ Tech Stack

- **Core**: React 19, Vite, Vanilla CSS
- **3D Engine**: `@google/model-viewer` (WebGL / Three.js abstraction)
- **Animation & Physics**: Framer Motion, `@studio-freight/lenis`
- **State Management**: Zustand
- **Icons**: Lucide React

---

## 📜 License

This project is open-source and available under the [MIT License](LICENSE).
3D surface model of Hintze Hall provided via Sketchfab under Creative Commons.
