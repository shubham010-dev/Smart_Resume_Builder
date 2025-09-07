const express = require('express');
const PDFDocument = require('pdfkit');
const Resume = require('../models/Resume');
const router = express.Router();

// Template 1: Classic
function generateClassicPDF(doc, resume) {
  doc.fontSize(20).text(resume.name, { underline: true });
  doc.moveDown();
  doc.fontSize(12).text(`Email: ${resume.email}`);
  doc.text(`Phone: ${resume.phone}`);
  doc.moveDown();

  doc.fontSize(16).text('Summary');
  doc.fontSize(12).text(resume.summary || '');
  doc.moveDown();

  doc.fontSize(16).text('Education');
  resume.education.forEach(edu => {
    doc.fontSize(12).text(`${edu.degree} at ${edu.school} (${edu.year})`);
  });
  doc.moveDown();

  doc.fontSize(16).text('Experience');
  resume.experience.forEach(exp => {
    doc.fontSize(12).text(`${exp.role} at ${exp.company} (${exp.duration})`);
    doc.text(exp.description || '');
    doc.moveDown();
  });

  doc.fontSize(16).text('Skills');
  doc.fontSize(12).text(resume.skills.join(', '));
}

// Template 2: Modern
function generateModernPDF(doc, resume) {
  // Header background
  doc.rect(0, 0, doc.page.width, 80).fill('#4F46E5');
  doc.fillColor('white').font('Helvetica-Bold').fontSize(24).text(resume.name, 40, 30, { align: 'left' });
  doc.font('Helvetica').fillColor('white').fontSize(12).text(`Email: ${resume.email} | Phone: ${resume.phone}`, 40, 55, { align: 'left' });
  doc.moveDown(2);
  doc.fillColor('black');

  // Section divider
  doc.moveDown();
  doc.fontSize(16).fillColor('#4F46E5').text('Summary', { underline: true });
  doc.fillColor('black').fontSize(12).text(resume.summary || '');
  doc.moveDown();

  doc.fontSize(16).fillColor('#4F46E5').text('Education', { underline: true });
  doc.fillColor('black');
  resume.education.forEach(edu => {
    doc.fontSize(12).font('Helvetica-Bold').text(`${edu.degree}`, { continued: true });
    doc.font('Helvetica').text(` at ${edu.school} (${edu.year})`);
  });
  doc.moveDown();

  doc.fontSize(16).fillColor('#4F46E5').text('Experience', { underline: true });
  doc.fillColor('black');
  resume.experience.forEach(exp => {
    doc.fontSize(12).font('Helvetica-Bold').text(`${exp.role}`, { continued: true });
    doc.font('Helvetica').text(` at ${exp.company} (${exp.duration})`);
    doc.fontSize(12).text(exp.description || '');
    doc.moveDown();
  });

  doc.fontSize(16).fillColor('#4F46E5').text('Skills', { underline: true });
  doc.fillColor('black').fontSize(12).text(resume.skills.join(', '));
}

router.get('/:id', async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);
    if (!resume) return res.status(404).json({ error: 'Resume not found' });

    const template = req.query.template || 'classic';
    const doc = new PDFDocument();
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=${resume.name}_resume.pdf`);
    doc.pipe(res);

    if (template === 'modern') {
      generateModernPDF(doc, resume);
    } else {
      generateClassicPDF(doc, resume);
    }

    doc.end();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;