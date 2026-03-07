# 🌍 Travel Itinerary Explorer

A modern, responsive web application for discovering and organizing travel destination packages. Built with **vanilla HTML, CSS, and JavaScript** — no frameworks or CSS libraries used.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

---

## 📑 Table of Contents

- [Overview](#overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Installation & Setup](#-installation--setup)
- [Usage Guide](#-usage-guide)
- [Data Format](#-data-format)
- [Responsive Design](#-responsive-design)
- [Browser Support](#-browser-support)
- [License](#-license)

---

## Overview

**Travel Itinerary Explorer** lets users browse 100 travel destination packages from around the world. Users can search, filter by continent, sort by price or rating, mark favorites, and build a personal trip list — all with a sleek dark-themed glassmorphism UI.

---

## ✨ Features

### 1. Display Travel Cards
- Each card displays the **destination name**, **continent**, **price**, and **rating**.
- Every card includes a **Favorite ♥ button** to mark/unmark a package as a favorite.
- Cards feature smooth **hover animations** (lift + scale) and a gradient glass overlay.

### 2. Live Search
- A real-time search bar filters destination cards **instantly as you type**.
- Search is **case-insensitive** (e.g., typing `"paris"` will match `"Paris City Tour"`).
- Displays a friendly message when no results match.

### 3. Filter by Continent
- Dropdown filter with the following options:
  - **All Continents**
  - Asia
  - Europe
  - North America
  - South America
  - Africa
  - Australia

### 4. Sorting
- Sort dropdown with three options:
  - **Price: Low → High**
  - **Price: High → Low**
  - **Rating: High → Low**
- Sorting works in combination with search and continent filters.

### 5. Favorites (Persistent)
- Clicking the **♥ button** toggles a package as a favorite.
- Favorite state is **saved to `localStorage`** — selections persist across browser refreshes.
- Active favorites display a red heart with a **burst animation**.

### 6. My Trip Sidebar
- Users can click **"Add to Trip"** on any card to add it to their trip list.
- The sidebar displays all selected trip packages with a **remove (✕) button**.
- Trip selections are **persisted in `localStorage`** — they survive page reloads.
- Duplicate additions are automatically prevented.
- Shows an empty-state message when no packages are added.

### 7. Responsive Layout
- **Desktop** (> 992px): Side-by-side layout with a sticky sidebar.
- **Tablet** (≤ 992px): Sidebar stacks below the cards grid.
- **Mobile** (≤ 600px): Controls stack vertically; header adjusts for smaller screens.
- Cards grid uses `auto-fill` with `minmax(260px, 1fr)` for fluid column counts.
- **No CSS frameworks** — all responsiveness is achieved with vanilla CSS media queries.

### 8. Additional UI Highlights
- **Dark glassmorphism theme** with backdrop blur and gradient accents.
- **Google Fonts** integration (`Outfit` typeface).
- **Sticky header** with search, filter, and sort controls.
- **Custom scrollbar** styling on the trip list.
- **Slide-in animation** for trip list items.
- **Accessible** — screen-reader-only labels (`sr-only` class) for form controls.

---

## 🛠 Tech Stack

| Technology | Purpose                        |
|------------|--------------------------------|
| HTML5      | Semantic page structure        |
| CSS3       | Styling, animations, layout    |
| JavaScript | DOM manipulation, data logic   |
| JSON       | Travel package data source     |
| localStorage | Client-side data persistence |
| Google Fonts | Typography (Outfit)          |

---

## 📁 Project Structure

```
TravelItinerary/
├── index.html        # Main HTML page
├── style.css         # All styles (dark theme, glassmorphism, responsive)
├── script.js         # App logic (search, filter, sort, favorites, trip)
├── packages.json     # 100 travel destination packages (data source)
├── README.md         # Project documentation (this file)
└── packages.json     # Package metadata
```

---

## 🚀 Installation & Setup

### Prerequisites

- A modern web browser (Chrome, Firefox, Edge, Safari)
- A local HTTP server (required because the app fetches `packages.json` via `fetch()`)

### Option 1 — VS Code Live Server (Recommended)

1. **Clone or download** the project:
   ```bash
   git clone https://github.com/your-username/TravelItinerary.git
   cd TravelItinerary
   ```

2. **Open the folder** in [Visual Studio Code](https://code.visualstudio.com/).

3. **Install the Live Server extension**:
   - Go to Extensions (`Ctrl+Shift+X`) → search **"Live Server"** → Install.

4. **Right-click `index.html`** → select **"Open with Live Server"**.

5. The app will open automatically in your default browser at `http://127.0.0.1:5500`.

### Option 2 — Python HTTP Server

```bash
# Navigate to the project directory
cd TravelItinerary

# Python 3
python -m http.server 8000

# Then open http://localhost:8000 in your browser
```

### Option 3 — Node.js HTTP Server

```bash
# Install a simple HTTP server globally (one time)
npm install -g http-server

# Navigate to the project folder and start
cd TravelItinerary
http-server -p 8080

# Open http://localhost:8080 in your browser
```

### Option 4 — Open Directly (Limited)

> ⚠️ **Note:** Opening `index.html` directly via `file://` will cause the `fetch()` call to fail due to CORS restrictions. Use one of the server options above.

---

## 📖 Usage Guide

| Action                    | How To                                                     |
|---------------------------|------------------------------------------------------------|
| **Search destinations**   | Type in the search bar — results filter in real time       |
| **Filter by continent**   | Select a continent from the dropdown                       |
| **Sort packages**         | Choose a sort option (price or rating)                     |
| **Favorite a package**    | Click the ♥ button on a card                               |
| **Add to trip**           | Click the "Add to Trip" button on a card                   |
| **Remove from trip**      | Click the ✕ button next to a package in the sidebar        |

> **Tip:** Favorites and trip selections are saved in your browser's `localStorage`. They will persist even after closing and reopening the browser.

---

## 📦 Data Format

Travel packages are stored in `packages.json`. Each entry follows this schema:

```json
{
  "id": 1,
  "name": "Paris City Tour",
  "continent": "Europe",
  "price": 450,
  "rating": 4.7
}
```

| Field       | Type    | Description                          |
|-------------|---------|--------------------------------------|
| `id`        | Number  | Unique identifier for the package    |
| `name`      | String  | Name of the travel destination       |
| `continent` | String  | Continent the destination belongs to |
| `price`     | Number  | Price in USD                         |
| `rating`    | Number  | Rating out of 5                      |

The dataset includes **100 packages** across **6 continents**: Asia, Europe, North America, South America, Africa, and Australia.

---

## 📱 Responsive Design

The layout adapts to three breakpoints — all using **pure CSS media queries**:

| Breakpoint   | Layout Behavior                                      |
|--------------|------------------------------------------------------|
| **> 992px**  | Two-column: cards grid + sticky sidebar              |
| **≤ 992px**  | Single column: sidebar stacks below cards            |
| **≤ 600px**  | Controls stack vertically; compact header             |

---

## 🌐 Browser Support

| Browser         | Supported |
|-----------------|-----------|
| Chrome 80+      | ✅        |
| Firefox 78+     | ✅        |
| Edge 80+        | ✅        |
| Safari 13.1+    | ✅        |
| Opera 67+       | ✅        |

> Requires support for CSS Custom Properties, `backdrop-filter`, `fetch()`, and `localStorage`.

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

---

> **Built with ❤️ using pure HTML, CSS & JavaScript — no frameworks, no dependencies.**
