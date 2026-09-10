# Your Proposal Website 💌

Three screens: the ask → your photo gallery → "The End".

## 1. Open it in VS Code
1. Download the `proposal-website` folder (all 4 files: `index.html`, `style.css`, `script.js`, `images/`).
2. Open VS Code → `File → Open Folder...` → select `proposal-website`.
3. Install the **Live Server** extension (search "Live Server" by Ritwick Dey in the Extensions panel, click Install). This lets you preview the site with hot-reload instead of double-clicking the HTML file.
4. Right-click `index.html` in the file explorer → **"Open with Live Server"**. Your browser opens the site automatically.

## 2. Add your photos
1. Drop your images into the `images` folder (drag them straight into VS Code's file explorer, into the `images` folder).
2. Open `script.js`, find the `IMAGES` array at the very top, and list your filenames, e.g.:
   ```js
   const IMAGES = [
     "images/us-1.jpg",
     "images/us-2.jpg",
     "images/us-3.jpg",
   ];
   ```
3. Save — Live Server refreshes automatically and your slideshow appears with real photos (until then it shows a placeholder telling you what to do).

## 3. Personalize the text
- **Screen 1** (`index.html`, `#screen-proposal`): swap "Hey Crushie" for her name, tweak the intro paragraph.
- **Screen 2** (`#screen-gallery`): the love-note paragraph is already filled in from your message — edit freely.
- **Screen 3** (`#screen-end`): "The End" + your closing line, exactly as you wrote it.

## 4. Tweak the colors
All colors live at the top of `style.css` under `:root`:
```css
--blush:  #FFF3EF;  /* page background */
--rose:   #E23F63;  /* buttons, headings, accent */
--gold:   #E8A73D;  /* slideshow dots, confetti */
--ink:    #3A2A2E;  /* text */
```
Change the hex values and every button, heading, and dot updates automatically.

## 5. How the dodging "No" button works
In `script.js`, the `dodge()` function fires whenever the mouse enters (or touches, or tabs to) the No button. It teleports the button to a random spot on screen and swaps in a new playful line of hint text each time. Look for the `NO BUTTON THAT RUNS AWAY` section if you want to make it faster/slower or change the hint messages.

## 6. Send it to her
Once you're happy with it locally, the easiest free ways to share a live link:
- **GitHub Pages**: push the folder to a GitHub repo → Settings → Pages → deploy from `main`.
- **Netlify Drop**: go to app.netlify.com/drop and drag the folder in — gives you a live link in seconds, no account needed.

That's it — good luck 😄
