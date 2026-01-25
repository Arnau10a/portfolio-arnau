# Portfolio Documentation - Arnau Garcia

## Project Overview
This is a high-end, interactive portfolio website designed for **Arnau Garcia**, a Creative Developer & 3D Artist. The project focuses on a "Premium & Minimalist" aesthetic, featuring immersive 3D backgrounds, smooth animations, and high-performance interactions.

## 🚀 Tech Stack
- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **3D Engine**: [Three.js](https://threejs.org/) via [`@react-three/fiber`](https://github.com/pmndrs/react-three-fiber) and [`@react-three/drei`](https://github.com/pmndrs/drei)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Styling**: [Tailwind CSS 4.0](https://tailwindcss.com/)
- **Deployment & Analytics**: [Vercel](https://vercel.com/) with Speed Insights and Analytics integration.

## 📁 Project Structure
```text
src/
├── assets/             # Static assets (images, models, etc.)
├── components/         # React components
│   ├── CustomCursor    # Custom SVG-based cursor with variants
│   ├── DecryptedText   # Text effect that "decrypts" on hover/view
│   ├── Experience      # Main Three.js scene (Abstract shapes + Plexus)
│   ├── Hero            # Splash section with large typography
│   ├── InteractiveModel # Logic for loading and interacting with 3D models
│   ├── Layout          # Shared layout wrapper (Navigation, Footer)
│   ├── Loader          # Initial loading screen with percentage
│   ├── ProjectGrid     # List of projects with hover effects
│   ├── ProjectPanel    # Feature-rich project detail view
│   ├── ScrollReveal    # Animation wrapper for elements on scroll
│   └── SparklingBg     # Subtle sparkling effect for the UI
├── context/            # React Context stores
│   └── CursorContext   # Manages global cursor state/variants
├── App.tsx             # Main application entry and routing
├── main.tsx            # React DOM mounting
└── index.css           # Global styles and Tailwind imports
```

## ✨ Key Features
### 1. Immersive 3D Background (`Experience.tsx`)
- **Abstract Geometry**: A wireframe icosahedron that rotates and reacts to mouse movement.
- **Plexus Effect**: A dynamic particle system where nodes connect with lines when close, creating a "plexus" network.
- **Scroll Parallax**: The entire 3D scene shifts and rotates as the user scrolls, creating a sense of depth.
- **Color Transition**: The background color and particle colors smoothly transition from dark to light (or vice versa) based on the scroll position.

### 2. Custom Interaction System
- **Custom Cursor**: A highly responsive cursor that changes shape and size when hovering over interactable elements.
- **Decrypted Text**: Typography that performs a "scanning" animation.

> [!NOTE]
> The **Project Grid** is currently disabled to focus on the landing experience (`Hero` section).

### 3. Responsive & Performant
- **Dynamic Sizing**: Uses `clamp()` and relative units for fluid typography across all screen sizes.
- **GPU Accelerated**: Leverages Three.js and Framer Motion for 60fps animations.
- **Lazy Loading**: Assets and heavy components are managed to ensure a fast initial load.

## 🎨 Design & Styling
The project uses **Tailwind CSS 4.0**, utilizing the new CSS-first configuration method. 
- **Typography**: Primary font is **Syne** for headings (for that modern, artistic look) and **Inter** for body text.
- **Color System**: Managed via CSS variables and the `@theme` block in `index.css`.
- **Global Effects**: 
    - Custom scrollbar removal for a cleaner interface.
    - Global cursor suppression to allow the `CustomCursor` component to take over.
    - Mix-blend-mode (difference) for high-contrast text visibility over complex backgrounds.

## 🛠️ Development

### Setup
1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```

## 🚀 Deployment & CI/CD
The project is hosted on **Vercel** and integrated with **GitHub** for a seamless CI/CD workflow.

### Continuous Integration (GitHub)
- **Automatic Deploys**: Every push to the `main` branch triggers a production deployment.
- **Preview Deployments**: Push to any other branch generates a unique preview URL to test changes before merging.
- **Environment Variables**: Managed securely via the Vercel Dashboard.

### Vercel Configuration
- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### Optimization for Vercel
- **Speed Insights**: Real-time performance monitoring.
- **Web Analytics**: Privacy-focused visitor tracking.
- **Edge Runtime**: Used where possible for faster global response times.

## 📈 Analytics & Monitoring
The project is integrated with **Vercel Analytics** and **Vercel Speed Insights** to monitor real-world performance and user engagement.

---
*Documentation generated by Antigravity AI.*
