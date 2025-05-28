import React, { useState, useEffect } from "react";
import images from "@/Images";
import { getAnnouncementinvoiceById } from "../../../api/AnnouncementApi";
import { PDFDownloadLink } from '@react-pdf/renderer';
import InvoiceDocument from './InvoiceDocument';

const EventModal = ({ eventId, onClose }) => {
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const fetchAnnouncementDetails = async () => {
      try {
        if (!eventId) {
          console.error("Event ID is undefined");
          return;
        }
        const data = await getAnnouncementinvoiceById(eventId);
        setEvent(data.record);
      } catch (error) {
        console.error("Error fetching announcement record by ID:", error);
      }
    };

    fetchAnnouncementDetails();
  }, [eventId]);

  if (!event || !event.invoiceId) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[410px]">
        <div className="flex items-center justify-between w-full border-b border-solid border-[#F4F4F4] pb-3">
          <h2 className="text-[20px] font-semibold text-[#202224]">
            Event Invoices List
          </h2>
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
                {event.invoiceId}
              </p>
              <p>
                <strong className="block text-[16px] font-normal text-[#A7A7A7]">
                  Owner Name
                </strong>
                {event.residentId.firstName} {event.residentId.lastName}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-5">
              <p>
                <strong className="block text-[16px] font-normal text-[#A7A7A7]">
                  Payment Date
                </strong>
                {new Date(event.paymentDate).toLocaleDateString()}
              </p>
              <p>
                <strong className="block text-[16px] font-normal text-[#A7A7A7]">
                  Phone Number
                </strong>
                {event.residentId.phoneNumber}
              </p>
            </div>
            <p className="mb-5">
              <strong className="block text-[16px] font-normal text-[#A7A7A7]">
                Email
              </strong>
              {event.residentId.email}
            </p>
            <p className="mb-5">
              <strong className="block text-[16px] font-normal text-[#A7A7A7]">
                Event Name
              </strong>
              {event.Announcement_title}
            </p>
            <p>
              <strong className="block text-[16px] font-normal text-[#A7A7A7]">
                Description
              </strong>
              {event.description}
            </p>
          </div>
          <div className="bg-[#F6F8FB] p-5 rounded-[10px] my-5">
            <div className="flex items-center justify-between border-b border-solid border-[#D3D3D3] pb-4 mb-3">
              <strong className="text-[16px] font-normal text-[#202224]">
                Maintenance Amount
              </strong>
              <p className="text-[16px] font-normal text-[#39973D]">
                ₹ {event.amount}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <strong className="text-[16px] font-normal text-[#202224]">
                Grand Total
              </strong>
              <p className="text-[16px] font-medium text-[#202224]">
                ₹ {event.amount + event.pendingAmount}
              </p>
            </div>
          </div>
          <div className="bg-[#F6F8FB] p-5 rounded-[10px] mb-5">
            <p>
              <strong className="block text-[16px] font-normal text-[#A7A7A7]">
                Note
              </strong>
              {event.note}
            </p>
          </div>
        </div>
        <div className="mt-4">
          <PDFDownloadLink document={<InvoiceDocument event={event} />} fileName={`invoice_${event.invoiceId}.pdf`}>
            {({ blob, url, loading, error }) =>
              loading ? "Loading document..." : (
                <button
                  className="gap-2.5 px-2.5 py-3.5 rounded-xl flex items-center justify-center w-full text-white bg-[linear-gradient(90deg,#FE512E_0%,#F09619_100%)]"
                >
                  <img src={images.downloadArrow} alt="" />
                  Download Invoice
                </button>
              )
            }
          </PDFDownloadLink>
        </div>
      </div>
    </div>
  );
};

export default EventModal;