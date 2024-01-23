import React from 'react';
import jsPDF from 'jspdf';
import img from '../assets/certificate-background.png';
import { Landscape, Portrait } from '@mui/icons-material';

const generateCertificate = (name, course, scoreText) => {
  // Create a new jsPDF instance
  const doc = new jsPDF({
    orientation: Portrait,
  });

  // Add background image
  doc.addImage(
    img,
    'PNG',
    0,
    0,
    doc.internal.pageSize.getWidth(),
    doc.internal.pageSize.getHeight(),
  );

  // Add recipient name
  doc.setFontSize(36);
  doc.setFont('helvetica'); // Change the font family and style
  doc.text(name, 105, 160, { align: 'center' }); // 105 and 160: horizontal and vertical positions of the text

  // Add course name
  doc.setFontSize(20);
  doc.text(course, 105, 195, { align: 'center' });
  doc.text(scoreText, 95, 175, { align: 'center' }); // 105 and 195: horizontal and vertical positions of the text

  // Save the PDF
  doc.save(`${name}-${course}.pdf`);
};

export default generateCertificate;
