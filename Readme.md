# How to Install
## 1. Install [Tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=en) extension for your browser. (chrome linked)
## 2. Get the userscript [from here](https://wayland-smithy.github.io/DF-place/DFplace.user.js).
---
# How it Works
## When enabled the overlay shows small pixels in the center of the real ones. This means if you see a dot that pixel is wrong and needs to be changed to the color of the dot.
---
# How Updating Works
## When the template changes you **do not** need to reinstall the userscript. Simply refresh r/palce to get the latest version or wait for the auto refresh that happens every ~5 minutes.
---
### Credit to r/placeDE for the bulk of the code and r/AprilKnights for the rest plus translating.
# Pixel store (wip)

Place to coordinate which pixels to place
Current output:
![Output](output.png)

## Adding new images
**1. Create a branch**


**2. Upload image to images folder:**
_example.png_ with transparent background and without any border.\
The image must be in 1:1 pixel scale and only use the colours provided by reddit.


**3. Add a new block to config.toml:**
```toml
[[structure]]
name = "example"
file = "images/example.png"
startx = 1234 # x-coordinate
starty = 5678 # y-coordinate
priority = 2
```
The coordinates are of the uppermost, leftmost pixel of the linked png in r/place.
Do not change the priority unless coordinated with the other devs.

**4. Run scripts to preview output:**
Run these two scrips in this specific order
```bash
python .\scripts\generate_json.py
```
This will generate _pixel.json_
```bash
python .\scripts\render_json.py
```
Now _pixel.json_ is used to generate _output.png_ as well as _overlay.png_.

**IMPORTANT:** Check _output.png_ to ensure the images have been placed correctly.
You can also use _overlay.png_ to check if the overlay is correct.


**5. Commit and push your changes**
Relevant files are:

_config.toml_, and _images\beispiel.png_

**DO NOT** push _pixel.json_, _output.png_ or _overlay.png_.

These files will conflict when multiple people are adding files at the same time.
GitHub-Actions will automatically build the output and overlay once your pull request
has been accepted.

**6. Create a pull request to main and have another dev review it**

**7. Pray the actions work and cry if they don't**

## Scripts

For running the script see the README.md in scripts/
