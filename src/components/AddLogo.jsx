import jsPDF from 'jspdf';

export function SavePreview(formData, isPreview, logoFile) {
  const doc = new jsPDF();
  doc.text(`Invoice Date: ${formData.selectedDate.toDateString()}`, 10, 10);
  doc.text(`Invoice Number: ${formData.invoiceNumber}`, 10, 20);
  doc.text(`Client Name: ${formData.clientName}`, 10, 30);

  if (logoFile) {
    const reader = new FileReader();

    reader.onload = function (event) {
      const img = new Image();
      img.src = event.target.result;

      img.onload = function () {
        const maxWidth = doc.internal.pageSize.getWidth() / 2;
        const maxHeight = 50;
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height *= maxWidth / width;
          width = maxWidth;
        }
        if (height > maxHeight) {
          width *= maxHeight / height;
          height = maxHeight;
        }

        doc.addImage(img, 'JPEG', 10, 10, width, height);

        if (isPreview) {
          window.open(doc.output('bloburl'), '_blank');
        } else {
          const filename = `INV${formData.invoiceNumber}.pdf`;
          doc.save(filename);
        }
      };

      img.onerror = function (error) {
        console.error('Error loading logo:', error);
      };
    };

    reader.onerror = function (error) {
      console.error('Error reading logo file:', error);
    };

    reader.readAsDataURL(logoFile);
  } else {
    if (isPreview) {
      window.open(doc.output('bloburl'), '_blank');
    } else {
      const filename = `INV${formData.invoiceNumber}.pdf`;
      doc.save(filename);
    }
  }
}
