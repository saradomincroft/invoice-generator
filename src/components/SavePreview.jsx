import jsPDF from 'jspdf';

export function SavePreview(formData, isPreview, logoFile) {
    const doc = new jsPDF();

    function calculateCoordinates(doc, marginX, marginY, index, lineHeight = 10) {
        const x = marginX;
        const y = marginY + index * lineHeight;
        
        return { x, y };
    }
  
    const marginX = 10;
    const marginY = 10;
    const lineHeight = 10;
    let index = 0;
  
    // to be printed, using axis increments 
    doc.text('TAX INVOICE', ...Object.values(calculateCoordinates(doc, marginX, marginY, index++, lineHeight)));
    doc.text(`Invoice Date: ${formData.selectedDate.toDateString()}`, ...Object.values(calculateCoordinates(doc, marginX, marginY, index++, lineHeight)));
    doc.text(`Due Date: ${formData.dueDate.toDateString()}`, ...Object.values(calculateCoordinates(doc, marginX, marginY, index++, lineHeight)));
    doc.text(`Invoice Number: ${formData.invoiceNumber}`, ...Object.values(calculateCoordinates(doc, marginX, marginY, index++, lineHeight)));
    doc.text(`Client Name: ${formData.clientName}`, ...Object.values(calculateCoordinates(doc, marginX, marginY, index++, lineHeight)));

    // add logo to invoice if selected
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

        const marginFromRight = 10;
        const marginFromBottom = 10;

        const x = doc.internal.pageSize.getWidth() - width - marginFromRight;
        const y = doc.internal.pageSize.getHeight() - height - marginFromBottom;

        doc.addImage(img, 'JPEG', x, y, width, height);

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
