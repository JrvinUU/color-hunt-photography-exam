# Super Color Hunt — Practical Exam Web Application
**Course**: 3rd-Year College Digital Photography  
**Sections**: MA 3101 &bull; MA 3102  
**Exam Code**: PT + Practical Exam  

---

## 🎨 Overview

This dedicated web platform is engineered specifically for the 3rd-Year College Digital Photography Practical Exam: **"Super Color Hunt"**. 

It streamlines the workflow between the instructor and ~70+ students grouped into teams of 3 across two main phases:

1. **Phase 1: Curation & Assignment Phase**
   - **Balanced 7-Color &times; 2-Category Engine**: Fairly and evenly distributes 14 unique prompts across all student groups with zero bias.
     - **7 Colors**: Red, Green, Blue, Orange, Yellow, Purple, Pink
     - **2 Categories**: Natural, Artificial
   - **Student Assignment Lookup**: Fast, live search allowing students to look up their assigned color, category, and exam guidelines by typing their name or group number.
   - **Instructor Curation Hub**: Add/edit groups of 3, bulk-import rosters from spreadsheet lists, audit distribution balance, and reload from IDE config.

2. **Phase 2: Finished Exhibition Gallery Phase**
   - **16:9 Widescreen Exhibition Gallery**: Displays all approved group slide decks and photography works in widescreen presentation cards.
   - **7-Color Filter Navigation**: One-click filtering by any of the 7 vibrant colors with glowing neon indicators, category switches (🌿 Natural / 💡 Artificial), and section filters (MA 3101 / MA 3102).
   - **Cinematic Fullscreen Presentation & Lightbox**: Interactive slideshow view with extracted color palette hex swatches, camera exposure parameters, and student statements—ideal for classroom projector critiques.

---

## 🛠️ Editing Groups via the IDE (`data/groups.js`)

You can easily customize all student groups, their assigned colors, categories, and sections directly in your code editor:

1. Open **`data/groups.js`** in your IDE.
2. Edit or add groups using the simple JavaScript structure:
```javascript
{
  id: 'grp-01',
  section: 'MA 3101',
  color: 'Red',       // Options: Red, Green, Blue, Orange, Yellow, Purple, Pink
  category: 'Natural', // Options: Natural, Artificial
  members: ['Student 1', 'Student 2', 'Student 3']
}
```
3. Save the file and refresh your browser. The app will automatically detect changes in `data/groups.js` and render your updated roster immediately!

---

## 🚀 Quick Start Guide

### How to Run:
No installation or complex build tools required! Simply:

1. Double-click or open **`index.html`** in any modern web browser (Google Chrome, Microsoft Edge, Mozilla Firefox, Safari).
2. Or serve via PowerShell / batch file (`start-server.bat` or `powershell -File serve.ps1 -Port 8080`).

---

## 📁 File Structure

```
color-hunt-photography-exam/
├── index.html               # Main application shell
├── data/
│   └── groups.js            # Direct IDE-editable student groups, colors, categories, sections
├── css/
│   ├── main.css             # Fluid dark chromatic gradient mesh, typography & shell
│   ├── curation.css         # Group roster, student search & square color cards
│   └── gallery.css          # 16:9 widescreen cards, color filters & presentation lightbox
├── js/
│   ├── distribution.js      # Fair 7-color x 2-category round-robin algorithm & audit
│   ├── mockData.js          # 24 pre-built student groups with sample slide artworks
│   ├── curationView.js      # Curation UI controller (roster, search, modals)
│   ├── galleryView.js       # Gallery UI controller (exhibition grid & lightbox)
│   └── app.js               # Application state manager & IDE config sync
├── serve.ps1                # PowerShell HTTP server
├── start-server.bat         # Windows launch script
└── README.md                # Instructor guide & documentation
```
