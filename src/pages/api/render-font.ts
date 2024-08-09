export const prerender = false;

import type { APIRoute } from 'astro';
import { createCanvas, registerFont } from 'canvas';
import { writeFileSync, existsSync } from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';


const fontPath = join(tmpdir(), 'temp-font.otf');
const fontUrl = 'https://storage.googleapis.com/dripfarm-assets/Ice-Cold-Solid-LH.otf';

loadAndRegisterFont(fontUrl);


// Function to load and register the font if it hasn't been registered yet
async function loadAndRegisterFont(url: string) {
  if (!existsSync(fontPath)) {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to load font from URL: ${url}`);
    }
    const fontBuffer = await response.arrayBuffer();

    // Save the fetched font to a temporary file
    writeFileSync(fontPath, Buffer.from(fontBuffer));

    // Register the font
    registerFont(fontPath, { family: 'Ice Cold Solid' });
    console.log('Font registered successfully.');
  } else {
    // If the font is already registered, we simply register it again (in case it was unregistered)
    registerFont(fontPath, { family: 'Ice Cold Solid' });
    console.log('Font already exists and is registered.');
  }
}



export const POST: APIRoute = async ({ request }) => {
  const { text, fontSize } = await request.json();

  console.log("Rendering font", text, fontSize);

  // Load the font from a remote URL

  const canvas = createCanvas(800, 200);
  const context = canvas.getContext('2d');

  context.font = `${fontSize} Ice Cold Solid`;
  context.fillStyle = 'black';

  context.fillText(text, 50, 100);
  context.fill();

  const buffer = canvas.toBuffer('image/png');
  const base64Image = buffer.toString('base64');
  const dataUrl = `data:image/png;base64,${base64Image}`;

  console.log("Rendered font", dataUrl);

  return new Response(JSON.stringify({ image: dataUrl }), {
    headers: { 'Content-Type': 'application/json' }
  });
}

// I want to load from local, but vercel is annoying me


// Register the custom font
// const fontPath = path.resolve('public/fonts/Ice-Cold-Solid-LH.otf');
// const fontPath = path.resolve("../../fonts/Ice-Cold-Solid-LH.otf")
// const fontPath = path.resolve("./fonts/Ice-Cold-Solid-LH.otf")
// const fontPath = path.resolve('src/fonts/Ice-Cold-Solid-LH.otf');

// const fontPath = path.join(process.cwd(), 'public', 'fonts', 'Ice-Cold-Solid-LH.otf');

// const fontPath = path.join(__dirname, './fonts/Ice-Cold-Solid-LH.otf')
// const fontPath2 = path.resolve('public/fonts/Ice-Cold-Colour-LH.otf');
// registerFont(fontPath, { family: 'Ice Cold Solid' });
// GlobalFonts.registerFromPath(fontPath, 'Ice Cold Solid');
// GlobalFonts.registerFromPath(fontPath2, 'Ice Cold Colour');

// export const POST: APIRoute = async ({ request }) => {
//   const { text, fontSize } = await request.json();

//   console.log("Rendering font", text, fontSize);

//   const canvas = createCanvas(800, 200);
//   const context = canvas.getContext('2d');

//   context.font = `${fontSize} Ice Cold Solid`;
//   // context.font = `${fontSize} Arial`;

//   console.log("Context font", context.font);
//   context.fillStyle = 'black';

//   context.fillText(text, 50, 100);
//   context.fill()

//   const buffer = canvas.toBuffer('image/png');
//   const base64Image = buffer.toString('base64');
//   const dataUrl = `data:image/png;base64,${base64Image}`;

//   console.log("Rendered font", dataUrl);

//   return new Response(JSON.stringify({ image: dataUrl }), {
//     headers: { 'Content-Type': 'application/json' }
//   });
// }