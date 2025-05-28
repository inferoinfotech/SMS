// ViewMantenaceInvoice.jsx
import React, { useState, useEffect } from "react";
import InvoiceModal from "./InvoiceModal";
import images from "@/Images";
import { getInvoices, getInvoiceById } from "../../../api/invoiceApi";

const ViewMantenaceInvoice = () => {
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [invoices, setInvoices] = useState([]);
  const [filteredInvoices, setFilteredInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const data = await getInvoices();
        setInvoices(data);
        setFilteredInvoices(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchInvoices();
  }, []);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const years = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i);

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
    filterInvoices(e.target.value, selectedYear);
  };

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
    filterInvoices(selectedMonth, e.target.value);
  };

  const filterInvoices = (month, year) => {
    let filtered = invoices;
    if (month) {
      const monthIndex = parseInt(month) - 1;
      filtered = filtered.filter(invoice => new Date(invoice.billDate).getMonth() === monthIndex);
    }
    if (year) {
      const yearValue = parseInt(year);
      filtered = filtered.filter(invoice => new Date(invoice.billDate).getFullYear() === yearValue);
    }
    setFilteredInvoices(filtered);
  };

  const handleViewInvoice = async (invoiceId) => {
    try {
      // Find the invoice by its invoiceId
      const invoice = invoices.find(inv => inv.id === invoiceId);
      if (!invoice) {
        throw new Error('Invoice not found');
      }
      // Fetch the invoice details using the main ID (_id)
      const data = await getInvoiceById(invoice._id);
      setSelectedInvoice(data);
      setIsModalOpen(true);
    } catch (err) {
      setError(err);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleDownloadInvoice = () => {
    if (selectedInvoice) {
      // Implement your download logic here
      console.log("Downloading invoice:", selectedInvoice.id);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="mx-auto p-5 w-full bg-white rounded-2xl w-full">
      <div className="flex space-x-4 mb-4">
        <div className="flex items-center justify-between w-full">
          <h1 className="text-[20px] font-semibold text-[#202224]">Maintenance Invoices</h1>
          <div className="flex space-x-4">
            <select
              id="month"
              value={selectedMonth}
              onChange={handleMonthChange}
              className="mt-1 block pl-3 pr-10 py-3 text-base border border-[#D3D3D3] rounded-[10px] focus:outline-none focus:ring-[#D3D3D3] focus:border-[#D3D3D3] sm:text-sm"
            >
              <option value="">Month</option>
              {months.map((month, index) => (
                <option key={index} value={index + 1}>
                  {month}
                </option>
              ))}
            </select>
            <select
              id="year"
              value={selectedYear}
              onChange={handleYearChange}
              className="mt-1 block pl-3 pr-10 py-3 text-base border border-[#D3D3D3] rounded-[10px] focus:outline-none focus:ring-[#D3D3D3] focus:border-[#D3D3D3] sm:text-sm"
            >
              <option value="">Year</option>
              {years.map((year, index) => (
                <option key={index} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-[rgba(86,120,233,0.1)]">
            <tr>
              <th className="px-6 py-5 text-left text-xs font-semibold text-[#202224] tracking-wider">
                Invoice ID
              </th>
              <th className="px-6 py-5 text-left text-xs font-semibold text-[#202224] tracking-wider">
                Due Date
              </th>
              <th className="px-6 py-5 text-left text-xs font-semibold text-[#202224] tracking-wider">
                Payment Date
              </th>
              <th className="px-6 py-5 text-left text-xs font-semibold text-[#202224] tracking-wider">
                Maintenance Amount
              </th>
              <th className="px-6 py-5 text-left text-xs font-semibold text-[#202224] tracking-wider">
                Pending Amount
              </th>
              <th className="px-6 py-5 text-left text-xs font-semibold text-[#202224] tracking-wider">
                Action
              </th> 
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredInvoices.map((invoice) => (
              <tr key={invoice.id}>
                <td className="px-6 py-4 whitespace-nowrap text-[16px] font-medium text-[#4F4F4F]">{invoice.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-[16px] font-medium text-[#4F4F4F]">
                  {invoice.billDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-[16px] font-medium text-[#4F4F4F]">
                  {invoice.paymentDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-[16px] font-medium text-[#39973D]">
                  {invoice.maintenanceAmount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-[16px] font-medium text-[#E74C3C]">
                  {invoice.pendingAmount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button onClick={() => handleViewInvoice(invoice.id)}>
                    <img src={images.viewIcon} alt="View" className="w-full" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <InvoiceModal
          invoice={selectedInvoice}
          onClose={handleCloseModal}
          onDownload={handleDownloadInvoice}
        />
      )}
    </div>
  );
};

export default ViewMantenaceInvoice;
