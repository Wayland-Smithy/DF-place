// ==UserScript==
// @name         DwarfFortressPlace overlay
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  try to take over the canvas!
// @author       oralekin, LittleEndu, ekgame, iratekalypso, LeoVerto, Wayland
// @match        https://hot-potato.reddit.com/embed*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=reddit.com
// @downloadURL  https://github.com/wayland-smithy/DF-place/raw/master/DFplace.user.js
// @grant        none
// ==/UserScript==

function setup() {
  // Load the image
      let image = document.createElement("img");
      image.setAttribute("id", "mona-lisa-helper-overlay");
      image.src = "https://wayland-smithy.github.io/DF-place/overlay.png?cachebuster=" + new Date().getTime();
      image.onload = () => {
          image.style = `position: absolute; left: 0; top: 0; width: ${image.width/3}px; height: ${image.height/3}px; image-rendering: pixelated; z-index: 2`;
      };

      // Add the image as overlay
      let camera = document.querySelector("mona-lisa-embed").shadowRoot.querySelector("mona-lisa-camera");
      let canvas = camera.querySelector("mona-lisa-canvas");
      canvas.shadowRoot.querySelector('.container').appendChild(image);

      // Add a style to put a hole in the pixel preview (to see the current or desired color)
      const waitForPreview = setInterval(() => {
          const preview = camera.querySelector("mona-lisa-pixel-preview");
          if (preview) {
            clearInterval(waitForPreview);
            const style = document.createElement('style')
            style.innerHTML = '.pixel { clip-path: polygon(-20% -20%, -20% 120%, 37% 120%, 37% 37%, 62% 37%, 62% 62%, 37% 62%, 37% 120%, 120% 120%, 120% -20%); }'
            preview.shadowRoot.appendChild(style);
          }
      }, 100);
}

function reload() {
  // TODO: Replace this shitty hack with something decent
  let camera = document.querySelector("mona-lisa-embed").shadowRoot.querySelector("mona-lisa-camera");
  let canvas = camera.querySelector("mona-lisa-canvas");
  let image = canvas.shadowRoot.getElementById("mona-lisa-helper-overlay");
  image.parentNode.removeChild(image);
  setup();
  console.log("Reloaded overlay");
}

function auto_reload() {
  reload();
  // Reload outline every five to six minutes
  setTimeout( auto_reload, (5 * 60 + Math.random() * 60) * 1000);
}

if (window.top !== window.self) {
  window.addEventListener('load', () => {
      setup();
      // First reload in five minutes
      setTimeout( auto_reload, (5 * 60) * 1000);
  }, false);
}
