// api/invoiceApi.js
import axiosInstance, { endpoints } from '../axios';

export const getInvoices = async () => {
  try {
    const response = await axiosInstance.get(endpoints.invoices.getInvoices);
    const mappedInvoices = response.data.records
      .filter(record => record.status === 'Done' && record.invoiceId !== null)
      .map(record => ({
        id: record.invoiceId || record._id, // Use invoiceId for display
        _id: record._id, // Store the main ID for fetching details
        ownerName: `${record.residentId.firstName} ${record.residentId.lastName}`,
        billDate: new Date(record.maintenanceDueDate).toLocaleDateString(),
        paymentDate: record.paymentDate ? new Date(record.paymentDate).toLocaleDateString() : 'N/A',
        phoneNumber: record.residentId.phoneNumber,
        email: record.residentId.email,
        maintenanceAmount: record.maintenanceAmount,
        pendingAmount: record.penaltyAmount,
        address: `${record.residentId.wing} ${record.residentId.unit}, ${record.society.address}, ${record.society.city}, ${record.society.state}, ${record.society.country}, ${record.society.zipCode}`,
        note: 'A visual representation of your spending categories visual representation.'
      }));
    return mappedInvoices;
  } catch (error) {
    console.error('Error fetching invoices:', error);
    throw error;
  }
};

export const getInvoiceById = async (id) => {
  try {
    const response = await axiosInstance.get(`${endpoints.invoices.getInvoicesById}/${id}`);
    const record = response.data.record;
    const mappedInvoice = {
      id: record.invoiceId || record._id,
      ownerName: `${record.residentId.firstName} ${record.residentId.lastName}`,
      billDate: new Date(record.maintenanceDueDate).toLocaleDateString(),
      paymentDate: record.paymentDate ? new Date(record.paymentDate).toLocaleDateString() : 'N/A',
      phoneNumber: record.residentId.phoneNumber,
      email: record.residentId.email,
      maintenanceAmount: record.maintenanceAmount,
      pendingAmount: record.penaltyAmount,
      address: `${record.residentId.wing} ${record.residentId.unit}, ${record.society.address}, ${record.society.city}, ${record.society.state}, ${record.society.country}, ${record.society.zipCode}`,
      note: 'A visual representation of your spending categories visual representation.'
    };
    return mappedInvoice;
  } catch (error) {
    console.error('Error fetching invoice by ID:', error);
    throw error;
  }
};