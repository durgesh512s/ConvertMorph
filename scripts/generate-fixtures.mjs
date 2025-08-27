import fs from 'fs';
import path from 'path';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { createCanvas } from 'canvas';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generatePDFFixtures() {
  const samplesDir = path.join(__dirname, '../public/samples');
  
  // Ensure samples directory exists
  if (!fs.existsSync(samplesDir)) {
    fs.mkdirSync(samplesDir, { recursive: true });
  }

  // Generate a.pdf (2-3 pages)
  const pdfA = await PDFDocument.create();
  const helveticaFont = await pdfA.embedFont(StandardFonts.Helvetica);
  
  // Page 1
  const page1A = pdfA.addPage([612, 792]);
  page1A.drawText('Document A - Page 1', {
    x: 50,
    y: 700,
    size: 20,
    font: helveticaFont,
    color: rgb(0, 0, 0),
  });
  page1A.drawText('This is a test document for Cypress testing.', {
    x: 50,
    y: 650,
    size: 12,
    font: helveticaFont,
  });

  // Page 2
  const page2A = pdfA.addPage([612, 792]);
  page2A.drawText('Document A - Page 2', {
    x: 50,
    y: 700,
    size: 20,
    font: helveticaFont,
    color: rgb(0, 0, 0),
  });

  const pdfBytesA = await pdfA.save();
  fs.writeFileSync(path.join(samplesDir, 'a.pdf'), pdfBytesA);

  // Generate b.pdf (2-3 pages)
  const pdfB = await PDFDocument.create();
  
  // Page 1
  const page1B = pdfB.addPage([612, 792]);
  page1B.drawText('Document B - Page 1', {
    x: 50,
    y: 700,
    size: 20,
    font: helveticaFont,
    color: rgb(0, 0, 0),
  });

  // Page 2
  const page2B = pdfB.addPage([612, 792]);
  page2B.drawText('Document B - Page 2', {
    x: 50,
    y: 700,
    size: 20,
    font: helveticaFont,
    color: rgb(0, 0, 0),
  });

  // Page 3
  const page3B = pdfB.addPage([612, 792]);
  page3B.drawText('Document B - Page 3', {
    x: 50,
    y: 700,
    size: 20,
    font: helveticaFont,
    color: rgb(0, 0, 0),
  });

  const pdfBytesB = await pdfB.save();
  fs.writeFileSync(path.join(samplesDir, 'b.pdf'), pdfBytesB);

  // Generate sample.pdf (3-5 pages, mixed content)
  const pdfSample = await PDFDocument.create();
  
  // Page 1 - Title page
  const page1Sample = pdfSample.addPage([612, 792]);
  page1Sample.drawText('Sample Document', {
    x: 200,
    y: 700,
    size: 24,
    font: helveticaFont,
    color: rgb(0, 0, 0),
  });
  page1Sample.drawText('Test Document for ConvertMorph', {
    x: 150,
    y: 650,
    size: 16,
    font: helveticaFont,
  });

  // Page 2 - Text content
  const page2Sample = pdfSample.addPage([612, 792]);
  page2Sample.drawText('Chapter 1: Introduction', {
    x: 50,
    y: 700,
    size: 18,
    font: helveticaFont,
    color: rgb(0, 0, 0),
  });
  page2Sample.drawText('This is a sample document with multiple pages for testing PDF operations.', {
    x: 50,
    y: 650,
    size: 12,
    font: helveticaFont,
  });

  // Page 3 - More content
  const page3Sample = pdfSample.addPage([612, 792]);
  page3Sample.drawText('Chapter 2: Content', {
    x: 50,
    y: 700,
    size: 18,
    font: helveticaFont,
    color: rgb(0, 0, 0),
  });

  // Page 4 - Final page
  const page4Sample = pdfSample.addPage([612, 792]);
  page4Sample.drawText('Conclusion', {
    x: 50,
    y: 700,
    size: 18,
    font: helveticaFont,
    color: rgb(0, 0, 0),
  });

  const pdfBytesSample = await pdfSample.save();
  fs.writeFileSync(path.join(samplesDir, 'sample.pdf'), pdfBytesSample);

  console.log('✅ PDF fixtures generated successfully');
}

function generateImageFixtures() {
  const samplesDir = path.join(__dirname, '../public/samples');
  
  // Generate pic1.jpg
  const canvas1 = createCanvas(200, 200);
  const ctx1 = canvas1.getContext('2d');
  ctx1.fillStyle = '#ff6b6b';
  ctx1.fillRect(0, 0, 200, 200);
  ctx1.fillStyle = '#ffffff';
  ctx1.font = '20px Arial';
  ctx1.fillText('Image 1', 60, 110);
  
  const buffer1 = canvas1.toBuffer('image/jpeg');
  fs.writeFileSync(path.join(samplesDir, 'pic1.jpg'), buffer1);

  // Generate pic2.jpg
  const canvas2 = createCanvas(200, 200);
  const ctx2 = canvas2.getContext('2d');
  ctx2.fillStyle = '#4ecdc4';
  ctx2.fillRect(0, 0, 200, 200);
  ctx2.fillStyle = '#ffffff';
  ctx2.font = '20px Arial';
  ctx2.fillText('Image 2', 60, 110);
  
  const buffer2 = canvas2.toBuffer('image/jpeg');
  fs.writeFileSync(path.join(samplesDir, 'pic2.jpg'), buffer2);

  // Generate pic3.jpg
  const canvas3 = createCanvas(200, 200);
  const ctx3 = canvas3.getContext('2d');
  ctx3.fillStyle = '#45b7d1';
  ctx3.fillRect(0, 0, 200, 200);
  ctx3.fillStyle = '#ffffff';
  ctx3.font = '20px Arial';
  ctx3.fillText('Image 3', 60, 110);
  
  const buffer3 = canvas3.toBuffer('image/jpeg');
  fs.writeFileSync(path.join(samplesDir, 'pic3.jpg'), buffer3);

  console.log('✅ Image fixtures generated successfully');
}

async function main() {
  try {
    await generatePDFFixtures();
    generateImageFixtures();
    console.log('🎉 All fixtures generated successfully!');
  } catch (error) {
    console.error('❌ Error generating fixtures:', error);
    process.exit(1);
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { generatePDFFixtures, generateImageFixtures };
