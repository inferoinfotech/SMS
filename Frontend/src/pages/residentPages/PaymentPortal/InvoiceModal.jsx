// components/InvoiceModal.js
import React from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import EnhancedInvoicePDF from './EnhancedInvoicePDF';
import images from "@/Images";

const InvoiceModal = ({ invoice, onClose, onDownload }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[410px]">
        <div className="flex items-center justify-between w-full border-b border-solid border-[#F4F4F4] pb-3">
          <h2 className="text-[20px] font-semibold text-[#202224]">Maintenance Invoices</h2>
          <button onClick={onClose}>
            <img src={images.closeIcon} alt="" />
          </button>
        </div>
        <div className="mt-5">
          <div className="bg-[#F6F8FB] p-5 rounded-[10px]">
            <div className="grid grid-cols-2 gap-4 mb-5">
              <p>
                <strong className="block text-[16px] font-normal text-[#A7A7A7]">
                  Invoice ID
                </strong>
                {invoice.id}
              </p>
              <p>
                <strong className="block text-[16px] font-normal text-[#A7A7A7]">
                  Owner Name
                </strong>
                {invoice.ownerName}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-5">
              <p>
                <strong className="block text-[16px] font-normal text-[#A7A7A7]">
                  Bill Date
                </strong>
                {invoice.billDate}
              </p>
              <p>
                <strong className="block text-[16px] font-normal text-[#A7A7A7]">
                  Payment Date
                </strong>
                {invoice.paymentDate}
              </p>
            </div>
            <p className="mb-5">
              <strong className="block text-[16px] font-normal text-[#A7A7A7]">
                Phone Number
              </strong>
              {invoice.phoneNumber}
            </p>
            <p className="mb-5">
              <strong className="block text-[16px] font-normal text-[#A7A7A7]">
                Email
              </strong>
              {invoice.email}
            </p>
            <p>
              <strong className="block text-[16px] font-normal text-[#A7A7A7]">
                Address
              </strong>
              {invoice.address}
            </p>
          </div>
          <div className="bg-[#F6F8FB] p-5 rounded-[10px] my-5">
            <div className="flex items-center justify-between">
              <strong className="text-[16px] font-normal text-[#202224]">
                Maintenance Amount
              </strong>
              <p className="text-[16px] font-normal text-[#39973D]">
                ₹ {invoice.maintenanceAmount}
              </p>
            </div>
            <div className="flex items-center justify-between my-3 border-b border-solid border-[#D3D3D3] pb-4">
              <strong className="text-[16px] font-normal text-[#3e96ee]">
                Pending Amount
              </strong>
              <p className="text-[16px] font-normal text-[#E74C3C]">
                ₹ {invoice.pendingAmount}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <strong className="text-[16px] font-normal text-[#202224]">
                Grand Total
              </strong>
              <p className="text-[16px] font-medium text-[#202224]">
                ₹ {invoice.maintenanceAmount + invoice.pendingAmount}
              </p>
            </div>
          </div>
          <div className="bg-[#F6F8FB] p-5 rounded-[10px] mb-5">
            <p>
              <strong className="block text-[16px] font-normal text-[#A7A7A7]">
                Note
              </strong>
              {invoice.note}
            </p>
          </div>
        </div>
        <div className="mt-4">
        `  <PDFDownloadLink document={<EnhancedInvoicePDF invoice={invoice} />} fileName="invoice.pdf">
            {({ blob, url, loading, error }) =>
              loading ? 'Loading document...' : (
                <button
                  className="gap-2.5 px-2.5 py-3.5 rounded-xl flex items-center justify-center w-full text-white bg-[linear-gradient(90deg,#FE512E_0%,#F09619_100%)]"
                >
                  <img src={images.downloadArrow} alt="" />
                  Download Invoice
                </button>
              )
            }
          </PDFDownloadLink>`
        </div>
      </div>
    </div>
  );
};

export default InvoiceModal;