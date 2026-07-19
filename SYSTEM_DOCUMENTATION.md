# Portfolio OS - Complete System Documentation

**Version**: 1.0.0  
**Last Updated**: October 8, 2025  
**Author**: Anvesh Cheela  
**Status**: Production-Ready MVP

---

## 🎯 Project Overview

**Portfolio OS** is a fully functional operating system simulator built as an interactive portfolio website. It provides a native macOS-like experience directly in the browser, complete with draggable windows, a taskbar, desktop icons, and multiple applications.

### Core Philosophy
- **PostHog-Inspired Design**: Clean, modern aesthetics with generous spacing and warm backgrounds
- **Native OS Experience**: Feels like a real operating system with attention to detail
- **Interactive Storytelling**: Portfolio content delivered through an engaging UI
- **Technical Showcase**: Demonstrates advanced frontend engineering skills

### Tech Stack
- **Frontend Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Animations**: Framer Motion
- **State Management**: Zustand
- **UI Components**: shadcn/ui
- **Icons**: Lucide React

---

## 📐 Architecture Overview

### System Hierarchy
```
┌─────────────────────────────────────────┐
│         Application Layer               │
│  (AboutMe, Projects, Terminal, etc.)    │
├─────────────────────────────────────────┤
│       Operating System Layer            │
│  (Windows, Taskbar, Desktop, Menus)     │
├─────────────────────────────────────────┤
│         State Management                │
│    (Zustand Stores: OS + Theme)         │
├─────────────────────────────────────────┤
│         Design System                   │
│   (CSS Variables, Tailwind, Glass)      │
└─────────────────────────────────────────┘
```

### Core Components Structure
```
Root (/)
├── app/
│   ├── layout.tsx          # Root layout with ThemeProvider
│   ├── page.tsx            # Main page with Desktop + WindowManager
│   └── globals.css         # Complete theme system CSS
│
├── components/
│   ├── os/                 # Operating System Components
│   │   ├── Desktop.tsx            # Main desktop container
│   │   ├── Taskbar.tsx            # Floating taskbar with apps/clock/system tray
│   │   ├── Window.tsx             # Draggable window with macOS traffic lights
│   │   ├── WindowManager.tsx      # Manages all open windows
│   │   ├── DesktopIcons.tsx       # Grid of desktop app shortcuts
│   │   ├── StartMenu.tsx          # App launcher with search
│   │   ├── DesktopContextMenu.tsx # Right-click menu on desktop
│   │   ├── AnimatedBackground.tsx # Wallpaper system
│   │   └── AnimatedGradient.tsx   # Animated gradient fallback
│   │
│   ├── apps/              # Application Components (8 total)
│   │   ├── AboutMeApp.tsx         # Personal bio with sidebar navigation
│   │   ├── ProjectsApp.tsx        # Project showcase with tabs
│   │   ├── SkillsDashboardApp.tsx # Skills visualization
│   │   ├── ContactApp.tsx         # Contact form
│   │   ├── TerminalApp.tsx        # Interactive terminal
│   │   ├── SnakeGame.tsx          # Snake game with nostalgia
│   │   ├── SettingsApp.tsx        # System settings (placeholder)
│   │   └── about-me/
│   │       ├── AboutMeSidebar.tsx
│   │       └── sections/          # About Me content sections
│   │
│   ├── providers/
│   │   └── ThemeProvider.tsx      # Theme context provider
│   │
│   ├── shared/            # Shared UI Components
│   │   ├── IconButton.tsx
│   │   └── WallpaperPicker.tsx
│   │
│   └── ui/                # shadcn/ui components (30+ components)
│
├── store/
│   ├── osStore.ts         # Window management state
│   └── themeStore.ts      # Theme & wallpaper state
│
├── hooks/
│   ├── useKeyboardShortcuts.ts    # Cmd+1-4, Cmd+W, Esc
│   └── use-mobile.ts
│
├── data/
│   ├── portfolio.json     # All personal/project data
│   └── wallpapers.ts      # Wallpaper configurations
│
├── lib/
│   └── utils.ts           # Utility functions (cn, etc.)
│
└── shared/
    └── types.ts           # Shared TypeScript interfaces
```

---

## 🎨 Design System

### Color System (CSS Variables)

The entire theme uses CSS custom properties for dynamic theming:

**Light Mode:**
```css
--color-bg: 245 245 247         /* Light gray background */
--color-surface: 255 255 255    /* White surfaces/cards */
--color-text: 29 29 31          /* Dark text */
--color-text-secondary: 110 110 115  /* Gray secondary text */
--color-border: 210 210 215     /* Light borders */
--color-accent: 0 122 255       /* iOS Blue (customizable) */
```

**Dark Mode:**
```css
--color-bg: 0 0 0               /* True black (OLED) */
--color-surface: 28 28 30       /* Dark gray surfaces */
--color-text: 245 245 247       /* Light text */
--color-text-secondary: 152 152 157  /* Gray secondary */
--color-border: 56 56 58        /* Dark borders */
```

### Glass Morphism System

Four levels of glassmorphism effects:

| Level | Blur | Opacity | Use Case |
|-------|------|---------|----------|
| **Subtle** | 20px | 80% | Desktop icons, tooltips |
| **Medium** | 40px | 60% | Windows, panels |
| **Heavy** | 60px | 40% | Taskbar, modals |
| **Extreme** | 80px | 30% | Start menu, overlays |

**Tailwind Classes:**
```jsx
className="glass-subtle"   // 20px blur
className="glass-medium"   // 40px blur
className="glass-heavy"    // 60px blur
className="glass-extreme"  // 80px blur
```

### Spacing System

Uses rem-based spacing with 0.25rem increments:
- Base: 1rem = 16px
- Scale: 0, 0.25, 0.5, 1, 1.5, 2, 3, 4, 6, 8, 12, 16rem

### Typography
- **Sans**: Geist Sans (variable font)
- **Mono**: Geist Mono (for terminal)
- Fallbacks: System fonts (-apple-system, BlinkMacSystemFont)

---

## 🪟 Window Management System

### Window State Interface
```typescript
interface WindowState {
  id: string;              // Unique window ID
  title: string;           // Window title bar text
  isOpen: boolean;         // Window exists
  isMinimized: boolean;    // Minimized to taskbar
  isMaximized: boolean;    // Fullscreen mode
  position: { x, y };      // Top-left coordinates
  size: { width, height }; // Dimensions in pixels
  zIndex: number;          // Stacking order
  appType: AppType;        // Which app is running
}
```

### Window Features

**1. Dragging**
- Click and drag title bar to move
- Constrained within viewport bounds
- Smooth motion with bounds checking

**2. macOS Traffic Lights**
```
🔴 Red    - Close window (removes from WindowManager)
🟡 Yellow - Minimize to taskbar (isMinimized = true)
🟢 Green  - Maximize/restore (isMaximized toggle)
```
- Icons appear on hover
- Left-aligned like macOS
- Fully functional

**3. Focus Management**
- Click anywhere on window to focus
- Focused window gets highest z-index
- Active window shows accent ring (ring-accent/20)

**4. Animations**
- **Open**: Spring animation (scale 0.95 → 1, fade in)
- **Close**: Reverse open animation
- **Drag**: Subtle scale (1.02) and enhanced shadow
- Duration: 200-300ms with spring physics

### Window Defaults Per App

| App | Size (W×H) | Position (X,Y) | Title |
|-----|-----------|----------------|-------|
| About Me | 600×500 | 100, 100 | About Me.app |
| Projects | 800×600 | 150, 120 | My Projects |
| Skills | 700×550 | 200, 140 | Skills Dashboard.app |
| Terminal | 700×450 | 180, 200 | Terminal.app |
| Contact | 500×400 | 300, 180 | Contact.app |
| Games | 600×500 | 220, 160 | Games.app |
| Network | 650×500 | 250, 160 | Network Monitor.app |
| Display | 650×550 | 350, 150 | Settings |

---

## 🖥️ Operating System Components

### 1. Desktop (`Desktop.tsx`)

**Responsibilities:**
- Root container for the entire OS
- Renders animated background
- Includes desktop icons
- Shows taskbar at bottom
- Handles keyboard shortcuts
- Provides context menu on right-click

**Structure:**
```jsx
<DesktopContextMenu>
  <div className="min-h-screen">
    <AnimatedBackground />
    <div className="z-10 h-screen pb-16">
      {children}  {/* WindowManager renders here */}
    </div>
    <Taskbar />
  </div>
</DesktopContextMenu>
```

### 2. Taskbar (`Taskbar.tsx`)

**Layout:**
```
┌────────────────────────────────────────────────┐
│ [Start] | [App1] [App2] [App3] ... | [☀️] [🕐] │
│  Left   |        Center            |   Right   │
└────────────────────────────────────────────────┘
```

**Features:**
- **Floating Design**: Rounded, glassmorphic, centered at bottom
- **Start Button**: Opens Start Menu (app launcher)
- **Running Apps**: Shows all open windows with icons
  - Blue dot underneath = window active
  - Click = focus or un-minimize
  - Grayed out = minimized
- **System Tray**:
  - Theme toggle (Sun/Moon icon)
  - Shows toast on theme change
- **Live Clock**: Updates every minute (HH:MM AM/PM)

**Positioning:**
```css
fixed bottom-2 left-1/2 -translate-x-1/2
w-[calc(100%-2rem)] max-w-7xl
h-16 px-4
```

### 3. Window (`Window.tsx`)

**Key Features:**
- Draggable via title bar
- Resizable (feature exists in code, may need activation)
- Traffic light controls (close/minimize/maximize)
- Active state with accent ring
- Glass medium effect (40px blur)
- Inner glow (top edge gradient)

**Title Bar Layout:**
```
┌──────────────────────────────────┐
│ 🔴🟡🟢    Window Title        │
└──────────────────────────────────┘
```

**Content Area:**
- Auto overflow scroll
- Renders app component as children
- Opaque background (bg-surface/50)

### 4. Desktop Icons (`DesktopIcons.tsx`)

**Grid Layout:**
```
(50, 50)     (170, 50)    (290, 50)
About Me     Network      Games

(50, 170)    (170, 170)   (290, 170)
Projects     Contact      Display

(50, 290)    (170, 290)
Skills       Terminal
```

**Icon Features:**
- 64×64px rounded squares
- Gradient backgrounds (unique per app)
- Lucide icon in white
- Label below with glass background
- Hover: scale 1.08 + lift -4px
- Double-click to open app

**Icon Color Mapping:**
| App | Gradient | Icon |
|-----|----------|------|
| About Me | Blue | User |
| Projects | Orange | FolderOpen |
| Skills | Purple | Activity |
| Network | Teal | Monitor |
| Contact | Pink | Mail |
| Terminal | Gray | Terminal |
| Games | Green | Gamepad2 |
| Display | Red | Settings |

### 5. Start Menu (`StartMenu.tsx`)

**Position**: Bottom-left (above Start button)

**Layout:**
```
┌───────────────────────────────┐
│ [Search: apps, files...]      │
├───────────────────────────────┤
│           Apps                │
│  ┌────┬────┬────┬────┐       │
│  │Icon│Icon│Icon│Icon│       │
│  ├────┼────┼────┼────┤       │
│  │Icon│Icon│Icon│Icon│       │
│  └────┴────┴────┴────┘       │
├───────────────────────────────┤
│      Quick Actions            │
│  📷 Change Wallpaper          │
│  🎨 Personalize               │
└───────────────────────────────┘
```

**Features:**
- Command palette style (shadcn Command)
- Search/filter apps
- 4-column grid layout
- Staggered entrance animations (30ms delay each)
- Click backdrop to close
- Glassmorphic with heavy blur

### 6. Context Menu (`DesktopContextMenu.tsx`)

Right-click desktop to open:
- Change Wallpaper
- Personalize
- Refresh
- (Divider)
- About

---

## 📱 Applications (8 Apps)

### 1. About Me (`AboutMeApp.tsx`)

**Layout**: Sidebar + Content

**Sidebar Sections:**
1. **Who I Am** (IntroSection)
   - Profile photo (160×160 rounded)
   - Name, title, location
   - "MS Student at Northeastern"
   - Badge: "Spring 2026 Co-op + Full-time Opportunities"
   - Personal story in glass cards
   - "How It All Started" (childhood story with Digit CDs)
   - "What I Am About" (engineering philosophy)

2. **My Journey** (JourneySection) - Placeholder
3. **What Excites Me** (ExcitesSection) - Placeholder
4. **Currently** (CurrentlySection) - Placeholder
5. **Get in Touch** (ContactSection)
   - Email button (accent colored)
   - LinkedIn link
   - GitHub link
   - All with external link icons

**Animations**: Fade in + slide up on section change

### 2. Projects (`ProjectsApp.tsx`)

**Structure:**
- Header with project tabs (Financial Copilot, SecureScale)
- Tab-based navigation (accent = active)
- Scrollable content area

**Per Project Card:**
- **Hero Section**:
  - Project name (3xl bold)
  - Tagline (xl text)
  - Description
  - GitHub + Demo buttons
  - Calendar icon with period
  - Type badge (Full-Stack, Infrastructure)
  - Status badge (Active/Completed with emoji)

- **The Story** (with Sparkles icon):
  - 3 paragraphs of project narrative
  - Personal, conversational tone

- **Technologies Section**:
  - Tech stack badges
  - Organized in rows

- **Achievements Section**:
  - Metric cards (2×2 grid)
  - Large metric number
  - Label and detail

**Data Source**: Hardcoded in component (should pull from portfolio.json)

### 3. Skills Dashboard (`SkillsDashboardApp.tsx`)

**Features:**
- Categories: Frontend, Backend, Cloud, Database
- Progress bars for each skill
- Experience years
- Status badges (Expert, Advanced, Learning)
- "Currently Learning" section

**Layout**: Card-based with shadcn components

### 4. Contact (`ContactApp.tsx`)

**Form Fields:**
- Name (required)
- Email (required)
- Subject (optional)
- Message (textarea, required)

**Features:**
- React Hook Form + Zod validation
- shadcn Form components
- Submit button with loading state
- Success toast on submit

### 5. Terminal (`TerminalApp.tsx`)

**Appearance:**
- Black background
- Green text (classic terminal)
- Prompt: `guest@portfolio-os : / $`
- Color scheme:
  - Blue: user@host
  - Purple: current directory
  - White: prompt symbols
  - Green: user input

**Available Commands:**
```bash
help      - Show available commands
about     - About Anvesh
projects  - List projects
contact   - Contact information
skills    - Technical skills
whoami    - User info
clear     - Clear terminal
```

**Features:**
- Command history displayed above
- Auto-scroll to bottom
- Press Enter to execute
- Auto-focus input on window click

### 6. Snake Game (`SnakeGame.tsx`)

**Intro Screen** (3 seconds):
> "This was my favorite game as a kid. Hours spent on that Nokia 3310.
> My love for games started here, and it's still here."

**Gameplay:**
- 20×20 grid
- Controls: Arrow keys or WASD
- Space to pause
- Score tracking
- High score saved to localStorage
- Responsive cell size (18px or 24px based on window)

**Colors:**
- Snake head: Bright green (#22c55e)
- Snake body: Medium green (#16a34a)
- Food: Red (#ef4444)
- Background: Black

**Game States:**
1. `intro` - Shows nostalgia message
2. `idle` - "Start Game" button
3. `playing` - Active game
4. `paused` - "Resume" button
5. `gameOver` - Score + "Play Again"

### 7. Network Monitor (`NetworkMonitorApp.tsx`) - Placeholder

**Planned Features:**
- GitHub stats integration
- Real-time activity feed
- Repository list
- Contribution graph

### 8. Display Options (`SettingsApp.tsx`) - Placeholder

**Planned Features:**
- Theme toggle (Light/Dark)
- Accent color picker
- Wallpaper selector
- Animation settings

---

## 🗄️ State Management

### OS Store (`osStore.ts`)

**Zustand store for window management**

**State:**
```typescript
{
  windows: WindowState[];      // All window instances
  activeWindowId: string | null;
  nextZIndex: number;           // For stacking
  windowCounter: number;        // For unique IDs
  displaySettings: {...}        // Theme, animations, etc.
}
```

**Key Actions:**
- `openWindow(appType)` - Create new window or focus existing
- `closeWindow(id)` - Remove window, update active
- `focusWindow(id)` - Bring to front, un-minimize
- `minimizeWindow(id)` - Toggle minimize state
- `maximizeWindow(id)` - Toggle fullscreen
- `updateWindowPosition(id, {x, y})`
- `updateWindowSize(id, {w, h})`

**Smart Behavior:**
- Opening same app twice = focus existing window
- Closing active window = focus most recent window
- Focus updates z-index and un-minimizes

### Theme Store (`themeStore.ts`)

**Zustand store with localStorage persistence**

**State:**
```typescript
{
  mode: 'light' | 'dark';
  accentColor: string;          // Default: #007AFF
  wallpaper: Wallpaper | null;
  wallpaperTint: string | null;
}
```

**Actions:**
- `toggleMode()` - Switch light ↔ dark
- `setMode(mode)` - Set specific mode
- `setAccent(color)` - Change accent color
- `setWallpaper(wp)` - Change wallpaper
- `setWallpaperTint(color)` - Update tint

**Persistence:**
- Saved to: `localStorage['portfolio-os-theme']`
- Auto-loads on app start
- Survives page refresh

**Theme Switching:**
- Updates document.documentElement class ('dark')
- Updates CSS variables via setProperty
- Triggers re-renders via Zustand

---

## ⌨️ Keyboard Shortcuts

### Global Shortcuts (via `useKeyboardShortcuts.ts`)

**Cmd/Ctrl + Number:**
- `Cmd+1` - Open About Me
- `Cmd+2` - Open Projects
- `Cmd+3` - Open Skills Dashboard
- `Cmd+4` - Open Contact

**Window Management:**
- `Cmd+W` - Close active window
- `Esc` - Close active window

**Shortcut Rules:**
- Disabled when input/textarea focused
- Works globally otherwise
- Uses `useEffect` + `document.addEventListener`

---

## 🎨 Wallpaper System

### Wallpaper Interface
```typescript
interface Wallpaper {
  id: string;
  name: string;
  type: 'static' | 'gradient' | 'animated';
  theme: 'light' | 'dark' | 'both';
  imageUrl?: string;
  gradientConfig?: {
    colors: string[];
    angle: number;
  };
  animatedConfig?: {
    colors: string[];
    speed: number;
    pattern: 'mesh' | 'radial' | 'wave';
  };
}
```

### Default Wallpapers

**Light Mode:**
- ID: `light-mountains`
- Name: "Mountain Vista"
- Type: Static
- Path: `/wallpapers/light-mountainVista.png`

**Dark Mode:**
- ID: `dark-mountain`
- Name: "Mountain Night"
- Type: Static
- Path: `/wallpapers/dark-mountainNight.png`

### Implementation (`AnimatedBackground.tsx`)

**Rendering Logic:**
1. If wallpaper.type === 'static' → Render Next.js Image
2. Else → Render solid bg color (fallback)

**Image Optimization:**
- Uses Next.js Image component
- `fill` prop for full coverage
- `priority` for above-fold loading
- `quality={100}` for crisp wallpapers
- `object-cover` for responsive sizing

---

## 📊 Data Management

### Portfolio Data (`portfolio.json`)

**Structure:**
```json
{
  "personalInfo": {
    "name": "Anvesh Cheela",
    "title": "Software Engineer",
    "location": "Boston, MA",
    "email": "...",
    "linkedin": "...",
    "github": "..."
  },
  
  "bio": {
    "greeting": "Hey there!",
    "intro": "...",
    "passion": "...",
    "personal": "..."
  },
  
  "achievements": [
    {
      "metric": "65%",
      "description": "API latency reduction",
      "color": "orange",
      "impact": "..."
    }
  ],
  
  "skills": {
    "categories": [
      {
        "name": "Frontend & UI",
        "icon": "code",
        "color": "blue",
        "skills": [
          {
            "name": "React/Next.js",
            "level": 90,
            "experience": "4+ years",
            "status": "expert",
            "projects": ["..."],
            "isCurrentlyUsing": true
          }
        ]
      }
    ],
    "currentlyLearning": [...],
    "tools": [...]
  }
}
```

**Usage:**
- Currently NOT imported in apps
- Skills and Projects are hardcoded
- **TODO**: Refactor apps to use portfolio.json

---

## 🎭 Animation System

### Framer Motion Integration

**Window Animations:**
```jsx
<motion.div
  initial={{ opacity: 0, scale: 0.95, y: 20 }}
  animate={{ opacity: 1, scale: 1, y: 0 }}
  exit={{ opacity: 0, scale: 0.95, y: 20 }}
  transition={{ 
    type: "spring", 
    damping: 25, 
    stiffness: 300 
  }}
>
```

**Drag State:**
```jsx
animate={{ 
  scale: isDragging ? 1.02 : 1,
  ...windowStyle 
}}
```

**Icon Hover:**
```jsx
whileHover={{ scale: 1.08, y: -4 }}
whileTap={{ scale: 0.95 }}
transition={{ type: "spring", stiffness: 400, damping: 25 }}
```

**Start Menu Grid:**
```jsx
{allApps.map((app, index) => (
  <motion.button
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.03 }}  // Stagger!
  />
))}
```

### CSS Animations

**Defined in globals.css:**
```css
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes scaleIn {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}
```

**Tailwind Classes:**
- `animate-fade-in` - 0.3s fade
- `animate-slide-up` - 0.4s slide + fade
- `animate-scale-in` - 0.3s scale + fade

---

## 🔧 Utility Functions

### `cn()` Function (lib/utils.ts)

**Purpose**: Merge Tailwind classes intelligently

```typescript
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

**Usage:**
```jsx
className={cn(
  "base-class",
  isActive && "active-class",
  isPrimary ? "primary" : "secondary"
)}
```

---

## 📱 Responsive Design

### Current State
- **Desktop-First**: Optimized for 1280px+ screens
- **Taskbar**: Scales with viewport width
- **Windows**: Constrained within viewport bounds
- **Icons**: Fixed positioning (works on large screens)

### Known Limitations
- Not optimized for mobile/tablet
- Desktop icons may overlap on small screens
- Window dragging needs touch support
- Taskbar may overflow on narrow screens

### Future Improvements
- Add mobile detection
- Touch-friendly window controls
- Responsive icon grid
- Adaptive window sizes
- Mobile-specific Start Menu

---

## 🚀 Performance Optimizations

### Implemented
1. **Next.js Image**: Automatic optimization for wallpapers
2. **CSS Variables**: No re-renders on theme changes
3. **Zustand**: Minimal re-renders (selective subscriptions)
4. **Framer Motion**: GPU-accelerated animations
5. **Backdrop Blur**: Uses `will-change: backdrop-filter`

### Potential Improvements
- Lazy load app components
- Virtual scrolling for large lists
- Debounce window resize/drag
- Service Worker for offline support
- Code splitting per app

---

## 🐛 Known Issues & TODO

### Bugs
- [ ] Window resize handles not visible/functional
- [ ] Minimize animation (genie effect) not implemented
- [ ] Start Menu search doesn't filter results
- [ ] Context menu actions mostly placeholders
- [ ] Wallpaper picker not implemented
- [ ] Settings app is empty placeholder

### Missing Features
- [ ] File Explorer/Finder app
- [ ] Spotlight search (Cmd+Space)
- [ ] Mission Control view (all windows)
- [ ] Window snapping zones
- [ ] Notification system
- [ ] About This Mac modal
- [ ] Wallpaper color extraction
- [ ] Custom accent color picker
- [ ] Sound effects
- [ ] Achievement/easter egg system

### Data Integration
- [ ] Connect apps to portfolio.json
- [ ] Implement GitHub API for Network Monitor
- [ ] Add contact form backend
- [ ] Analytics tracking
- [ ] Real-time activity feed

### Polish
- [ ] Loading skeletons for apps
- [ ] Error boundaries
- [ ] Empty states
- [ ] Smooth page transitions
- [ ] Better mobile experience
- [ ] Accessibility improvements (ARIA labels, focus management)
- [ ] Keyboard navigation for Start Menu

---

## 🎯 Feature Status Matrix

| Feature | Status | Completeness | Notes |
|---------|--------|--------------|-------|
| **Core OS** |
| Window System | ✅ Complete | 95% | Resize needs work |
| Taskbar | ✅ Complete | 100% | Fully functional |
| Desktop Icons | ✅ Complete | 100% | Working perfectly |
| Start Menu | ✅ Complete | 80% | Search needs fixing |
| Context Menu | 🟡 Partial | 30% | Mostly placeholders |
| **Apps** |
| About Me | ✅ Complete | 80% | 2/5 sections done |
| Projects | ✅ Complete | 100% | Fully functional |
| Skills | ✅ Complete | 90% | Could use polish |
| Contact | ✅ Complete | 85% | Needs backend |
| Terminal | ✅ Complete | 100% | Works great |
| Snake Game | ✅ Complete | 100% | Polished |
| Network | ❌ Missing | 0% | Placeholder |
| Settings | ❌ Missing | 0% | Placeholder |
| **Theme System** |
| Light/Dark Mode | ✅ Complete | 100% | Perfect |
| Glass Effects | ✅ Complete | 100% | Beautiful |
| Wallpapers | 🟡 Partial | 60% | Limited selection |
| Accent Colors | 🟡 Partial | 40% | No UI to change |
| **Interactions** |
| Keyboard Shortcuts | ✅ Complete | 100% | Works well |
| Window Dragging | ✅ Complete | 95% | Smooth |
| Hover Effects | ✅ Complete | 100% | Consistent |
| Animations | ✅ Complete | 90% | Could add more |

**Legend:**
- ✅ Complete - Fully functional
- 🟡 Partial - Works but incomplete
- ❌ Missing - Not implemented

---

## 📂 File Organization

### Critical Files to Understand


**1. Theme System:**
- `globals.css` - All CSS variables and glass utilities
- `tailwind.config.ts` - Tailwind extensions
- `themeStore.ts` - Theme state management
- `ThemeProvider.tsx` - Theme context provider

**2. Window Management:**
- `osStore.ts` - Window state management
- `Window.tsx` - Window component
- `WindowManager.tsx` - Renders all windows
- `Desktop.tsx` - Root container

**3. Taskbar:**
- `Taskbar.tsx` - Complete taskbar implementation
- `StartMenu.tsx` - App launcher

**4. Apps:**
- Each app is self-contained
- Located in `components/apps/`
- Rendered inside Window component

**5. Data:**
- `portfolio.json` - All personal data (NOT USED YET)
- `wallpapers.ts` - Wallpaper configs
- `types.ts` - Shared TypeScript interfaces

---

## 🎓 Development Workflow

### Starting Development

```bash
# Frontend only
cd frontend
npm run dev

# Open browser
http://localhost:3000
```

### Project Structure Understanding

```
1. User opens site → app/page.tsx loads
2. Desktop component renders
3. WindowManager connects to osStore
4. Desktop icons render from DesktopIcons
5. Taskbar renders at bottom
6. User double-clicks icon → osStore.openWindow()
7. WindowManager creates Window with app content
8. Window appears with animations
```

### Making Changes

**Adding a New App:**
1. Create app component in `components/apps/`
2. Add app type to `shared/types.ts`
3. Add icon config to `DesktopIcons.tsx`
4. Add window defaults to `osStore.ts`
5. Add to Start Menu in `StartMenu.tsx`
6. Add icon import to `Taskbar.tsx`

**Changing Theme Colors:**
1. Edit CSS variables in `globals.css`
2. Changes apply instantly via CSS

**Adding Wallpapers:**
1. Add image to `public/wallpapers/`
2. Create config in `wallpapers.ts`
3. Add to wallpaper picker (when built)

---

## 🔍 Deep Dive: How It Works

### Window Lifecycle

**1. Opening:**
```
User double-clicks icon
  ↓
DesktopIcon.onDoubleClick()
  ↓
osStore.openWindow(appType)
  ↓
Check if window already exists
  ↓
  YES → focusWindow(existingId)
  NO  → Create new WindowState
  ↓
Add to windows array
  ↓
WindowManager re-renders
  ↓
Window component mounts
  ↓
Framer Motion animates in
```

**2. Focusing:**
```
User clicks window
  ↓
Window.onClick()
  ↓
osStore.focusWindow(id)
  ↓
Update window.zIndex = nextZIndex++
Update window.isMinimized = false
Update activeWindowId = id
  ↓
Window re-renders with new z-index
```

**3. Closing:**
```
User clicks red traffic light
  ↓
Traffic light button onClick
  ↓
osStore.closeWindow(id)
  ↓
Filter window from windows array
Update activeWindowId to last window
  ↓
WindowManager re-renders
  ↓
Window exit animation plays
  ↓
Component unmounts
```

### Theme Switching

**Process:**
```
User clicks Sun/Moon icon
  ↓
Taskbar button onClick
  ↓
themeStore.toggleMode()
  ↓
Update mode: 'light' → 'dark'
Update localStorage
  ↓
ThemeProvider useEffect triggers
  ↓
document.documentElement.classList.toggle('dark')
  ↓
CSS variables update (:root vs .dark)
  ↓
All components using theme colors re-render
  ↓
Toast notification appears
```

### Drag and Drop

**Implementation:**
```
User mousedown on title bar
  ↓
Window.handleMouseDown()
  ↓
Set isDragging = true
Store dragOffset = mousePos - windowPos
focusWindow(id)
  ↓
Document mousemove listener fires
  ↓
Calculate new position:
  newX = mouseX - dragOffset.x
  newY = mouseY - dragOffset.y
  ↓
Constrain to viewport bounds
  ↓
osStore.updateWindowPosition(id, {x, y})
  ↓
Window re-renders at new position
  ↓
User mouseup
  ↓
Set isDragging = false
  ↓
Remove event listeners
```

---

## 🎨 Design Philosophy

### PostHog Inspiration

**What We Borrowed:**
1. **Warm Backgrounds**: Off-white (#f5f5f7) instead of stark white
2. **Generous Spacing**: 6-8 units between elements
3. **Card-Based Layout**: Everything in rounded glass cards
4. **Breathing Room**: Padding of 1.5-2rem inside cards
5. **Visual Hierarchy**: Clear title → description → content
6. **Subtle Borders**: white/10 for gentle separation
7. **Smooth Interactions**: 200-300ms transitions
8. **Color Psychology**: Blues and purples for trust

### macOS Influence

**What We Copied:**
1. **Traffic Lights**: Red/Yellow/Green window controls
2. **Taskbar Position**: Floating at bottom with blur
3. **Icon Style**: Rounded squares with gradients
4. **Window Behavior**: Drag, minimize, maximize
5. **Shadows**: Subtle depth with multiple blur levels
6. **System Font**: Geist Sans (similar to SF Pro)
7. **Dark Mode**: True black background (#000)

### Original Decisions

**What Makes It Unique:**
1. **Full OS Simulation**: Complete window management
2. **Interactive Portfolio**: Content through apps
3. **Easter Eggs**: Terminal commands, Snake game
4. **Personality**: Conversational tone in Terminal
5. **Nostalgia**: Snake game with Nokia story
6. **Living Resume**: Dynamic, not static PDF

---

## 🚢 Deployment

### Frontend (Vercel)

**Build Command:**
```bash
cd frontend && npm run build
```

**Environment Variables:**
- None required for MVP
- Future: API keys for GitHub, analytics

**Build Output:**
- Next.js static export
- Optimized images
- CSS bundles
- JavaScript chunks

### Backend (Not Yet Implemented)

**Planned Stack:**
- Node.js/Express OR Go
- PostgreSQL database
- Railway hosting
- REST API for:
  - Contact form submissions
  - Analytics events
  - Easter egg progress
  - GitHub stats caching

---

## 📈 Analytics & Tracking

### Planned Events

**Window Actions:**
- `window_opened` - Which app, timestamp
- `window_closed` - Duration open
- `window_focused` - Engagement metric
- `window_minimized` - User behavior

**Theme Events:**
- `theme_changed` - light/dark preference
- `wallpaper_changed` - Visual preferences

**Interaction Events:**
- `terminal_command` - Which commands used
- `game_played` - Snake game engagement
- `external_link_clicked` - GitHub, LinkedIn
- `contact_form_submitted` - Lead generation

**Session Metrics:**
- Time on site
- Apps opened per session
- Bounce rate per app
- Return visitor rate

---

## 🎮 Easter Eggs

### Implemented
1. **Snake Game**: Nostalgic story + playable game
2. **Terminal Commands**: `whoami`, `clear`, etc.
3. **Keyboard Shortcuts**: Power user features

### Planned
1. **Konami Code**: Unlock secret mode
2. **Hidden Commands**: `sudo make-me-an-offer`
3. **Achievement System**: Unlock badges
4. **Secret Files**: Hidden in File Explorer
5. **Boot Sequence**: Fake OS startup animation
6. **Matrix Mode**: Falling code effect
7. **Developer Console**: Hidden debug panel

---

## 🧪 Testing Strategy

### Current State
- ❌ No automated tests
- ✅ Manual testing during development
- ✅ Cross-browser testing (Chrome, Safari, Firefox)

### Recommended Setup

**Unit Tests (Jest + React Testing Library):**
- Window state management
- Theme switching logic
- Utility functions (cn)
- Form validation (Contact app)

**Integration Tests:**
- Opening/closing windows
- Keyboard shortcuts
- Theme persistence
- Start menu search

**E2E Tests (Playwright):**
- Complete user flows
- Window interactions
- App navigation
- Contact form submission

**Visual Regression:**
- Chromatic for component snapshots
- Catch unintended UI changes

---

## 🔐 Security Considerations

### Current State
- ✅ No sensitive data in frontend
- ✅ No API keys exposed
- ✅ XSS protection via React
- ❌ No rate limiting (no backend yet)
- ❌ No input sanitization (contact form)
- ❌ No CSRF protection (no backend yet)

### Future Improvements
1. **Contact Form:**
   - Rate limiting (5 submissions/hour)
   - Input sanitization on backend
   - Email validation
   - CAPTCHA for spam prevention

2. **Analytics:**
   - Anonymize IP addresses
   - GDPR compliance
   - Cookie consent banner
   - Privacy policy

3. **API:**
   - JWT authentication
   - Rate limiting per IP
   - Input validation with Zod
   - CORS configuration

---

## 📚 Learning Resources

### Technologies Used
- [Next.js 15 Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [Zustand](https://github.com/pmndrs/zustand)
- [shadcn/ui](https://ui.shadcn.com/)

### Inspiration
- [PostHog](https://posthog.com) - Design system
- [Linear](https://linear.app) - Animations
- [macOS](https://www.apple.com/macos/) - OS behavior
- [Bruno Simon](https://bruno-simon.com) - Portfolio creativity

---

## 🤝 Contributing Guidelines

### Code Style
- **TypeScript**: Strict mode, no `any` types
- **Components**: Functional components with hooks
- **Naming**: PascalCase for components, camelCase for functions
- **Comments**: JSDoc for complex functions
- **Formatting**: Prettier with default settings

### File Organization
- Group related components in folders
- Keep files under 300 lines when possible
- Extract reusable logic to hooks
- Use `index.ts` for barrel exports

### Git Workflow
```bash
# Feature branch
git checkout -b feature/file-explorer

# Small, focused commits
git commit -m "feat: add file explorer sidebar"
git commit -m "feat: add file grid view"
git commit -m "style: polish file icons"

# Push and PR
git push origin feature/file-explorer
```

### Testing Before PR
- [ ] App runs without errors
- [ ] All existing features still work
- [ ] New feature tested manually
- [ ] No console warnings
- [ ] TypeScript compiles
- [ ] Responsive on desktop

---

## 🎯 Roadmap

### Phase 1: Polish MVP ✅
- [x] Core window system
- [x] 8 functional apps
- [x] Theme system
- [x] Keyboard shortcuts
- [x] Glass morphism
- [x] PostHog aesthetics

### Phase 2: Data Integration (In Progress)
- [ ] Connect apps to portfolio.json
- [ ] Implement GitHub API
- [ ] Backend for contact form
- [ ] Analytics setup

### Phase 3: Missing Apps
- [ ] File Explorer/Finder
- [ ] Network Monitor (GitHub stats)
- [ ] Settings app (functional)
- [ ] About This Mac modal

### Phase 4: Advanced Features
- [ ] Spotlight search (Cmd+Space)
- [ ] Mission Control view
- [ ] Window snapping
- [ ] Notification system
- [ ] Achievement badges
- [ ] Sound effects

### Phase 5: Mobile Optimization
- [ ] Touch-friendly controls
- [ ] Responsive layout
- [ ] Mobile-specific UI
- [ ] PWA support

### Phase 6: Performance
- [ ] Code splitting
- [ ] Lazy loading
- [ ] Service Worker
- [ ] Image optimization
- [ ] Lighthouse score 90+

---

## 📞 Support & Contact

**Developer**: Anvesh Cheela  
**Email**: anvesh.cheela@example.com  
**GitHub**: [@AnveshCheela](https://github.com/AnveshCheela)  
**LinkedIn**: [Anvesh Cheela](https://www.linkedin.com/in/AnveshCheela/)

**Project Repository**: [Coming Soon]  
**Live Demo**: [anvesh.dev](https://anvesh.dev)

---

## 📜 License

MIT License - Feel free to use this code for your own portfolio!

**Attribution Appreciated:**
If you use this code, a link back or credit would be awesome but not required.

---

## 🙏 Acknowledgments

**Inspiration:**
- PostHog team for the beautiful design language
- Linear team for smooth animations
- Apple for macOS interface patterns
- Bruno Simon for creative portfolio ideas

**Technologies:**
- Next.js team for the amazing framework
- Tailwind team for utility-first CSS
- Framer team for Motion library
- Zustand team for simple state management
- shadcn for the component library

---

**Last Updated**: October 8, 2025  
**Documentation Version**: 1.0.0  
**Project Status**: Production-Ready MVP

---

*This documentation is a living document. It will be updated as the project evolves. For the most current information, check the codebase itself.*
