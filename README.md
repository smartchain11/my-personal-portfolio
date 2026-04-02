# Portfolio Website - Moreno, Jun Dave

A retro **BIOS/CRT Monitor** themed portfolio website built with React and Vite, featuring authentic terminal aesthetics and realistic CRT effects.

## 🖥️ CRT Monitor Design Features

- **Realistic CRT Monitor Frame** - Bezel and screen curvature
- **Authentic Scan Lines** - Horizontal scan line effect
- **Screen Flicker Animation** - Subtle CRT flicker
- **Phosphor Glow** - Green terminal glow effect
- **BIOS Boot Sequence** - System initialization on load
- **Terminal-Style Interface** - Monospace fonts and command-line aesthetics
- **Retro Color Scheme** - Classic green-on-black terminal colors

## 🚀 Technologies Used

- **React** - Component-based UI library
- **Vite** - Fast build tool and dev server
- **CSS3** - Advanced CRT effects and animations
- **VT323 Font** - Authentic retro terminal font
- **Font Awesome** - Icon library

## 📁 Project Structure

```
ny-poetfolio/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx/css      - BIOS system navigation
│   │   ├── Hero.jsx/css        - Boot sequence & terminal intro
│   │   ├── About.jsx/css       - Profile data display
│   │   ├── Skills.jsx/css      - System capabilities
│   │   ├── Projects.jsx/css    - Executable files showcase
│   │   ├── Contact.jsx/css     - Contact form terminal
│   │   └── Footer.jsx/css      - System footer
│   ├── App.jsx              - Main app with CRT frame
│   ├── App.css              - Terminal box styles
│   ├── main.jsx             - React entry point
│   └── index.css            - CRT monitor effects & global styles
├── index.html
├── vite.config.js
└── package.json
```

## 🛠️ Development

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation
```bash
npm install
```

### Run Development Server
```bash
npm run dev
```
The site will be available at `http://localhost:5173/`

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## ✨ CRT Effects Included

1. **Monitor Bezel Frame** - 3D monitor frame with depth
2. **Scan Lines** - Animated horizontal scan lines
3. **Screen Flicker** - Randomized flicker animation
4. **Text Glow** - Phosphor green glow on text
5. **Boot Sequence** - BIOS-style system initialization
6. **Cursor Blink** - Terminal cursor animation
7. **Screen Curvature** - Subtle CRT screen curve effect
8. **Custom Scrollbar** - Terminal-themed scrollbar

## 🎨 Color Scheme

- **Primary Green**: `#33ff33` - Terminal text
- **Glow Green**: `#00ff00` - Phosphor glow
- **Amber**: `#ffb000` - System messages
- **Screen Background**: `#001a00` - Dark green tint
- **Monitor Frame**: `#1a1a1a` - Dark bezel

## 📝 Customization

### Update Personal Information

Edit the content in the following files:
- `src/components/Hero.jsx` - Boot sequence, name, and roles
- `src/components/About.jsx` - Personal info and stats
- `src/components/Skills.jsx` - Technical skills
- `src/components/Projects.jsx` - Project showcase
- `src/components/Contact.jsx` - Contact details

### Modify CRT Effects

Adjust CRT effects in `src/index.css`:
```css
/* Scan line speed */
@keyframes scanline {
  0% { transform: translateY(0); }
  100% { transform: translateY(10px); }
}

/* Change terminal color */
:root {
  --crt-green: #33ff33;
  --crt-amber: #ffb000;
}
```

### Change Monitor Size

In `src/index.css`, adjust the monitor bezel:
```css
.crt-monitor {
  padding: 40px; /* Increase for larger bezel */
}
```

## 🎯 Design Philosophy

This portfolio embraces the aesthetic of vintage computing:
- **1970s-80s Terminal Era** - Green phosphor CRT displays
- **BIOS Systems** - Boot sequences and system messages
- **Command Line Interface** - Text-based navigation
- **Monospace Typography** - VT323 and Share Tech Mono fonts
- **Retro Gaming Monitors** - Authentic CRT effects

## 📄 License

ISC

## 👤 Author

**Moreno, Jun Dave**
- BSIT Student at ADSSU (formerly ASSCAT)
- 2nd Year, Bachelor of Science in Information Technology

---

**SYSTEM STATUS: READY**  
Made with 💚 using React + Vite + Retro Love
