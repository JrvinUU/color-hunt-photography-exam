# Photography Color Hunt — Practical Exam Web Application
**Course**: 3rd-Year College Digital Photography  
**Sections**: MA 3101 &bull; MA 3102  
**Exam Code**: PT + Practical Exam  

---

## 🎨 Overview

This dedicated web platform is engineered specifically for the 3rd-Year College Digital Photography Practical Exam: **"Photography Color Hunt"**. 

It streamlines the workflow between the instructor and ~70+ students grouped into teams of 3 across two main phases:

1. **Phase 1: Curation & Assignment Phase**
   - **Balanced 7-Color &times; 2-Category Engine**: Fairly and evenly distributes 14 unique prompts across all student groups with zero bias.
     - **7 Colors**: Red, Green, Blue, Orange, Yellow, Purple, Pink
     - **2 Categories**: Natural, Artificial
   - **Student Assignment Lookup**: Fast, live search allowing students to look up their assigned color, category, and exam guidelines by typing their name or group number.
   - **Instructor Curation Hub**: Add/edit groups of 3, bulk-import rosters from spreadsheet lists, audit distribution balance, and upload final student slide/PDF outputs with technical camera metadata (EXIF), artist statements, and instructor feedback.

2. **Phase 2: Finished Exhibition Gallery Phase**
   - **16:9 Widescreen Exhibition Gallery**: Displays all approved group slide decks and photography works in widescreen presentation cards.
   - **7-Color Filter Navigation**: One-click filtering by any of the 7 vibrant colors with glowing neon indicators, category switches (🌿 Natural / 💡 Artificial), and section filters (MA 3101 / MA 3102).
   - **Cinematic Fullscreen Presentation & Lightbox**: Interactive slideshow view with extracted color palette hex swatches, camera exposure parameters, and student statements—ideal for classroom projector critiques.

---

## 🚀 Quick Start Guide

### How to Run:
No installation or complex build tools required! Simply:

1. Double-click or open **`index.html`** in any modern web browser (Google Chrome, Microsoft Edge, Mozilla Firefox, Safari).
2. Or serve via any static HTTP server (e.g., Python: `python -m http.server 8000`).

---

## 📋 Instructor Usage Guide

### 1. Managing Student Groups & Roster
- **Auto-Distribute**: Click the **"Auto-Distribute (Equal Balance)"** button to instantly generate a statistically balanced assignment across all groups.
- **Bulk Import**: Click **"Bulk Import"**, select a section (`MA 3101` or `MA 3102`), and paste your student names (1 per line or comma-separated). The system will automatically chunk students into groups of 3 and assign balanced colors.
- **Distribution Stats**: Click **"Distribution Stats"** to see an exact mathematical table verifying that all 14 pairs are equally represented.

### 2. Uploading Student Work (Teacher Only)
- In the **Curation Phase**, click **"Upload Output"** or **"Attach Final Slide / PDF"** on any group card.
- Drag & drop the student's slide image (`.png`, `.jpg`, `.webp`) or presentation slide.
- Fill in the **Photo/Slide Title**, **Camera Settings** (e.g., `Sony A7 IV • 50mm f/1.8 • 1/500s • ISO 100`), **Artist Statement**, and optional **Instructor Critique**.
- Check **"Approve & Feature in Finished Exhibition Gallery"** and click **Save**.

### 3. Transitioning to the Finished Exhibition
- Once students have submitted and you have approved their works, switch to the **"2. Finished Exhibition"** tab in the top navigation.
- Click **"Start Fullscreen Presentation"** to launch the classroom critique slideshow mode on your projector.

### 4. Instructor Passcode
- Instructor controls can be locked or unlocked anytime using the **Instructor: Unlocked/Locked** button in the top right.
- Default Passcode: **`3101`** (or `admin`).

---

## 📁 File Structure

```
color-hunt-photography-exam/
├── index.html               # Main application shell with Phase 1 & Phase 2 views
├── css/
│   ├── main.css             # Fluid dark chromatic gradient mesh, typography & shell
│   ├── curation.css         # Group roster, student search & instructor upload modal
│   └── gallery.css          # 16:9 widescreen cards, color filters & presentation lightbox
├── js/
│   ├── distribution.js      # Fair 7-color x 2-category round-robin algorithm & audit
│   ├── mockData.js          # 24 pre-built student groups with sample slide artworks
│   ├── curationView.js      # Phase 1 UI controller (roster, upload, search)
│   ├── galleryView.js       # Phase 2 UI controller (exhibition grid & lightbox)
│   └── app.js               # Application state manager & LocalStorage persistence
└── README.md                # Instructor guide & documentation
```

---

## 🎓 Mathematical Distribution Formula
For $N$ groups and $K = 14$ color-category combinations:
- Each combination is assigned $\lfloor N/14 \rfloor$ or $\lceil N/14 \rceil$ times.
- For $N = 24$ groups (72 students in groups of 3): 10 combinations have 2 groups, 4 combinations have 1 group ($\Delta \le 1$). Zero combinations are starved.
