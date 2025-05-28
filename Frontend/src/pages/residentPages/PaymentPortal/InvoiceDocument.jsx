import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 20,
  },
  section: {
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  label: {
    fontSize: 12,
    color: '#A7A7A7',
    marginBottom: 5,
  },
  value: {
    fontSize: 12,
    marginBottom: 10,
  },
  totalSection: {
    marginTop: 20,
    borderTop: '1px solid #D3D3D3',
    paddingTop: 10,
  },
  totalLabel: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  totalValue: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'right',
  },
});

const InvoiceDocument = ({ event }) => {
  if (!event || !event.invoiceId) return null;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.title}>Event Invoices List</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.label}>Invoice ID</Text>
          <Text style={styles.value}>{event.invoiceId}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.label}>Owner Name</Text>
          <Text style={styles.value}>{event.residentId.firstName} {event.residentId.lastName}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.label}>Payment Date</Text>
          <Text style={styles.value}>{new Date(event.paymentDate).toLocaleDateString()}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.label}>Phone Number</Text>
          <Text style={styles.value}>{event.residentId.phoneNumber}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>{event.residentId.email}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.label}>Event Name</Text>
          <Text style={styles.value}>{event.Announcement_title}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.label}>Description</Text>
          <Text style={styles.value}>{event.description}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.label}>Maintenance Amount</Text>
          <Text style={styles.value}>₹ {event.amount}</Text>
        </View>
        <View style={styles.totalSection}>
          <Text style={styles.totalLabel}>Grand Total</Text>
          <Text style={styles.totalValue}>₹ {event.amount + event.pendingAmount}</Text>
        </View>
      </Page>
    </Document>
  );
};

export default InvoiceDocument;