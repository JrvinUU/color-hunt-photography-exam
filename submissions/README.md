# Student Submissions Folder

Place your student photography exam submissions into this folder (`submissions/`).

## How to Name Submission Files:

The Gallery View and Document Sorter will automatically detect and match student submissions using the group configuration in `data/groups.js`.

### Supported Naming Options:

1. **By Group ID (Recommended & Cleanest)**:
   - `grp-01.jpg` (or `.png`, `.webp`) &rarr; Matches Group 1 (MA 3102)
   - `grp-02.jpg` &rarr; Matches Group 2 (MA 3102)
   - `grp-08.jpg` &rarr; Matches Group 1 (MA 3101)
   - ...up to `grp-23.jpg`

2. **By Group Name & Section**:
   - `Group 1 - MA 3102.jpg`
   - `Group 1 - MA 3101.jpg`
   - `MA 3102 Group 1.jpg`

3. **Direct File Assignment**:
   - You can also specify any custom filename directly in `data/groups.js` under the `submissionFile` property for each group:
     ```javascript
     {
       id: 'grp-01',
       groupName: 'Group 1',
       section: 'MA 3102',
       submissionFile: 'my-custom-photo.jpg'
     }
     ```

## Automatic Sorter Sorting:
When students or instructors view the **Gallery Exhibition**, the document sorter groups works into their assigned **7 Color Folders** (Red, Orange, Yellow, Green, Blue, Purple, Pink) and sorts the student work documents cleanly by **Group Name** (`Group 1`, `Group 2`, `Group 3`, etc.).
