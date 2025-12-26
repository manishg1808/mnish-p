# How to Add Screenshot Images for Client Projects

## Steps to Add Screenshot Images:

1. **Take Screenshots of the Websites:**
   - Open each website in your browser
   - Take a full-page screenshot (you can use browser extensions like "Full Page Screen Capture" or press F12 and use browser DevTools)
   - Save the screenshots with these exact names:

2. **Save Images to Assets Folder:**
   - Save all 4 images to: `src/assets/` folder
   - File names should be:
     - `securereach-screenshot.jpg` (for SecureReach Digital Solutions)
     - `godex-screenshot.jpg` (for Godex Printers India)
     - `zebra-screenshot.jpg` (for Zebra Printers India)
     - `tagsindia-screenshot.jpg` (for TagsIndia)

3. **Update projectImages.js:**
   - Once images are saved, uncomment and update the import statements in `src/data/projectImages.js`
   - Replace placeholder URLs with actual image imports

## Quick Method Using Browser:

1. Open website: https://rama-overseas-a.vercel.app/
2. Press `Ctrl+Shift+I` (or F12) to open DevTools
3. Press `Ctrl+Shift+P` to open command palette
4. Type "Capture screenshot" and select "Capture full size screenshot"
5. Save as `securereach-screenshot.jpg` in `src/assets/` folder
6. Repeat for other 3 websites

## Alternative: Use Online Screenshot Tools

You can also use online tools like:
- https://www.screenshot.rocks/
- https://htmlcsstoimage.com/
- Or any screenshot API service

Just make sure to save the images with the correct names in `src/assets/` folder.


