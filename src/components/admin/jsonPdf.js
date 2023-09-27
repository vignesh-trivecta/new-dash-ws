import React from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { useSelector } from 'react-redux';
import stringFormatter from '@/utils/stringFormatter';
import formatDate from '@/utils/format-date';

const PrintPDF = ({data, columns, fileName}) => {

  // redux
  const customerId = useSelector((state) => state.report.customerId);
  const broker = useSelector((state) => state.report.broker);
  const reportType = useSelector((state) => state.report.reportType);
  const startDate = useSelector((state) => state.report.startDate);
  const endDate = useSelector((state) => state.report.endDate);

  const now = formatDate(new Date().toISOString().split('T')[0]) + ' | ' + new Date().toLocaleTimeString();

  const generatePDF = () => {

    const doc = new jsPDF();
    console.log(data)

    const footer = `Report Generated On: ${now}`;
    const title = `Customer ${fileName.toUpperCase()} Report`
    
    // Define the columns and rows for your table
    // let rows = data?.map((item) => (Object.values(item)));
    const rows = data?.map((item) => {
      const keys = Object.values(item);
      let arr = [];
      for (let key of keys) {
        key = stringFormatter(key);
        arr.push(key)
      }
      return arr;
    });

    // Header text
    doc.setFontSize(14);
    doc.text(title, 15, 10)

    // Header table
    doc.autoTable({
      head: [[ "Customer Id", "Customer Name", "Broker", "Report Type", "From", "To" ]],
      body: [[ customerId.split('-')[0], customerId.split('-')[1], broker, reportType, stringFormatter(startDate.toISOString()).split(' ')[0], stringFormatter(endDate.toISOString()).split(' ')[0] ]],
      theme: 'grid',
    })

    // Main table
    doc.autoTable({
      head: [columns],
      body: rows,
      theme: 'grid',
      styles: {
        overflow: 'linebreak',
      },
    });

    // Footer
    doc.setFontSize(12);
    const pageHeight = doc.internal.pageSize.height;
    doc.text(footer, 10, pageHeight - 10);

    // Save or print the PDF
    doc.save(`${fileName}.pdf`); // To save the PDF
    // doc.autoPrint(); // To print the PDF (requires a browser with support for autoPrint)
  };

  return (
    <div>
      <button onClick={generatePDF}>Export</button>
    </div>
  );
};

export default PrintPDF;