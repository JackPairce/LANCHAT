const fs = require("fs");
const sharp = require("sharp");
const pngToIco = require("png-to-ico");

async function createCircleImageWithLetter(
  letter,
  circleColor,
  textColor,
  icoPath
) {
  const canvasSize = 200; // Adjust the canvas size as needed
  const fontSize = 80; // Adjust the font size as needed

  // Create a blank transparent image with the desired dimensions
  const imageBuffer = await sharp({
    create: {
      width: canvasSize,
      height: canvasSize,
      channels: 4, // Set channels to 4 for RGBA
      background: { r: 0, g: 0, b: 0, alpha: 0 }, // Transparent background
    },
  })
    .png()
    .toBuffer();

  // Load the image buffer and draw the circle
  const image = await sharp(imageBuffer)
    .composite([
      {
        input:
          Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${canvasSize}" height="${canvasSize}">
          <circle cx="${canvasSize / 2}" cy="${canvasSize / 2}" r="${
            canvasSize / 2
          }" fill="${circleColor}" />
          <text x="50%" y="50%" dy="0.35em" text-anchor="middle" fill="${textColor}" font-size="${fontSize}" font-family="Arial, Helvetica, sans-serif">${letter}</text>
        </svg>`),
        left: 0,
        top: 0,
      },
    ])
    .png()
    .toBuffer();

  // Convert the PNG buffer to ICO format
  const icoBuffer = await pngToIco(image);

  // Save the ICO buffer to the output file
  fs.writeFileSync(icoPath, icoBuffer);
}

// Usage
// createCircleImageWithLetter("A", "#ff0000", "#ffffff", "circle.ico");

exports.createCircleImageWithLetter = createCircleImageWithLetter;
