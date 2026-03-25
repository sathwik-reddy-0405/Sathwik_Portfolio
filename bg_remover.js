import { removeBackground } from '@imgly/background-removal-node';
import fs from 'fs';

async function processImages() {
  try {
    const images = ['public/mylayer2.png'];

    for (const imagePath of images) {
      console.log(`Processing ${imagePath}...`);
      const blob = await removeBackground(imagePath);
      const outputBuffer = Buffer.from(await blob.arrayBuffer());
      // Handle the output extension replacing 
      const outputPath = imagePath.replace(/\.(jpg|jpeg|png)$/i, '_nobg.png');
      fs.writeFileSync(outputPath, outputBuffer);
      console.log(`Saved ${outputPath}`);
    }
  } catch(e) {
    console.error(e);
  }
}

processImages();
