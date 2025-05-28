import React from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import StyledInvoice from "./StyledInvoice";

const ActivityModal = ({ event, onClose }) => {
  const downloadInvoiceAsPDF = () => {
    const invoiceElement = document.getElementById("styled-invoice");
    
    html2canvas(invoiceElement).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save(`invoice_${event.id}.pdf`);
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[410px]">
        <div className="flex items-center justify-between w-full border-b border-solid border-[#F4F4F4] pb-3">
          <h2 className="text-[20px] font-semibold text-[#202224]">
            Activity Invoices List
          </h2>
          <button onClick={onClose}>
            <img src={images.closeIcon} alt="" />
          </button>
        </div>
        <div id="styled-invoice">
          <StyledInvoice event={event} />
        </div>
        <div className="mt-4">
          <button
            onClick={downloadInvoiceAsPDF}
            className="gap-2.5 px-2.5 py-3.5 rounded-xl flex items-center justify-center w-full text-white bg-[linear-gradient(90deg,#FE512E_0%,#F09619_100%)]"
          >
            <img src={images.downloadArrow} alt="" />
            Download Invoice
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActivityModal;