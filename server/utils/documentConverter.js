const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const libre = require('libreoffice-convert');
const { v4: uuidv4 } = require('uuid');

// Convert libre's callback-based method to a Promise-based one
const libreConvert = promisify(libre.convert);

/**
 * Convert a document to PDF format
 * @param {Buffer} inputBuffer - The document buffer to convert
 * @param {string} sourceFormat - The source format extension (e.g., 'docx')
 * @returns {Promise<Buffer>} - A promise that resolves to the PDF buffer
 */
async function convertToPdf(inputBuffer, sourceFormat) {
  try {
    // Convert the document to PDF
    const pdfBuffer = await libreConvert(inputBuffer, sourceFormat, 'pdf');
    return pdfBuffer;
  } catch (error) {
    console.error('Error converting document to PDF:', error);
    throw error;
  }
}

/**
 * Save a buffer to a file
 * @param {Buffer} buffer - The buffer to save
 * @param {string} outputPath - The path where to save the file
 * @returns {Promise<string>} - A promise that resolves to the file path
 */
async function saveBufferToFile(buffer, outputPath) {
  return new Promise((resolve, reject) => {
    fs.writeFile(outputPath, buffer, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(outputPath);
      }
    });
  });
}

/**
 * Convert a document to PDF and save it
 * @param {string} inputPath - The path to the document to convert
 * @param {string} outputDir - The directory where to save the PDF
 * @returns {Promise<string>} - A promise that resolves to the PDF path
 */
async function convertDocumentToPdf(inputPath, outputDir = 'public/converted') {
  try {
    // Create the output directory if it doesn't exist
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Read the input file
    const inputBuffer = fs.readFileSync(inputPath);
    
    // Get the file extension
    const sourceFormat = path.extname(inputPath).substring(1);
    
    // Generate a unique filename for the output
    const outputFilename = `${path.basename(inputPath, path.extname(inputPath))}-${uuidv4()}.pdf`;
    const outputPath = path.join(outputDir, outputFilename);
    
    // Convert the document to PDF
    const pdfBuffer = await convertToPdf(inputBuffer, sourceFormat);
    
    // Save the PDF
    await saveBufferToFile(pdfBuffer, outputPath);
    
    return outputPath;
  } catch (error) {
    console.error('Error converting document:', error);
    throw error;
  }
}

/**
 * Convert a document from a URL to PDF
 * @param {string} url - The URL of the document to convert
 * @param {string} outputDir - The directory where to save the PDF
 * @returns {Promise<string>} - A promise that resolves to the PDF path
 */
async function convertUrlDocumentToPdf(url, outputDir = 'public/converted') {
  try {
    // Create the output directory if it doesn't exist
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Download the file
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    // Get the file extension from the URL
    const urlPath = new URL(url).pathname;
    const sourceFormat = path.extname(urlPath).substring(1);
    
    // Generate a unique filename for the output
    const outputFilename = `document-${uuidv4()}.pdf`;
    const outputPath = path.join(outputDir, outputFilename);
    
    // Convert the document to PDF
    const pdfBuffer = await convertToPdf(buffer, sourceFormat);
    
    // Save the PDF
    await saveBufferToFile(pdfBuffer, outputPath);
    
    return outputPath;
  } catch (error) {
    console.error('Error converting document from URL:', error);
    throw error;
  }
}

module.exports = {
  convertToPdf,
  convertDocumentToPdf,
  convertUrlDocumentToPdf
};
