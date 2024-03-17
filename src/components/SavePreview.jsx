import jsPDF from 'jspdf';

export function SavePreview(formData, isPreview) {
  const doc = new jsPDF();
  doc.text(`Invoice Date: ${formData.selectedDate.toDateString()}`, 10, 10);
  doc.text(`Invoice Number: ${formData.invoiceNumber}`, 10, 20);
  doc.text(`Client Name: ${formData.clientName}`, 10, 30);

  if (isPreview) {
    window.open(doc.output('bloburl'), '_blank');
  } else {
    const filename = `INV${formData.invoiceNumber}.pdf`;
    doc.save(filename);
  }
}
