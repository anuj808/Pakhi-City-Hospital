const PDFDocument = require("pdfkit");

function generateReceipt(res, data) {
  const doc = new PDFDocument({ margin: 50 });

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename=receipt_${Date.now()}.pdf`
  );

  doc.pipe(res);

  doc.fontSize(22).text("Pakhi Hospital", { align: "center" });
  doc.moveDown();
  doc.fontSize(16).text("Payment Receipt", { align: "center" });
  doc.moveDown(2);

  doc.fontSize(12);
  doc.text(`Receipt No: ${Date.now()}`);
  doc.text(`Date: ${new Date().toLocaleString()}`);
  doc.moveDown();

  doc.text(`Patient Name: ${data.name}`);
  doc.text(`Phone: ${data.phone}`);
  doc.text(`Token Number: ${data.token}`);
  doc.moveDown();

  doc.text("Registration Fee: ₹305");
  doc.text("Payment Status: SUCCESS");

  doc.moveDown(2);
  doc.text("Thank you for choosing Pakhi Hospital.", {
    align: "center",
  });

  doc.end();
}

module.exports = generateReceipt;