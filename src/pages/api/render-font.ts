export const prerender = false;

import type { APIRoute } from 'astro';
import { createCanvas, GlobalFonts } from '@napi-rs/canvas';
//@ts-ignore
import path from 'path';


// Register the custom font
const fontPath = path.resolve('public/fonts/Ice-Cold-Solid-LH.otf');
const fontPath2 = path.resolve('public/fonts/Ice-Cold-Colour-LH.otf');
// registerFont(fontPath, { family: 'Ice Cold Solid' });
GlobalFonts.registerFromPath(fontPath, 'Ice Cold Solid');
// GlobalFonts.registerFromPath(fontPath2, 'Ice Cold Colour');

export const POST: APIRoute = async ({ request }) => {
  const { text, fontSize } = await request.json();

  const canvas = createCanvas(800, 200);
  const context = canvas.getContext('2d');

  context.font = `${fontSize} Ice Cold Solid`;
  // context.fillStyle = 'red';

  context.fillText(text, 50, 100);
  context.fill()

  const buffer = canvas.toBuffer('image/png');
  const base64Image = buffer.toString('base64');
  const dataUrl = `data:image/png;base64,${base64Image}`;

  return new Response(JSON.stringify({ image: dataUrl }), {
    headers: { 'Content-Type': 'application/json' }
  });
}
