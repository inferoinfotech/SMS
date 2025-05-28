// components/EnhancedInvoicePDF.js
import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

// Register a custom font if needed
Font.register({
  family: "Oswald",
  src: "https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf",
});

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    padding: 40,
    fontFamily: "Helvetica",
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    borderBottom: 1,
    borderBottomColor: "#A7A7A7",
    borderBottomStyle: "solid",
    paddingBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333333",
  },
  section: {
    marginBottom: 10,
  },
  label: {
    fontSize: 12,
    color: "#A7A7A7",
    marginBottom: 5,
  },
  value: {
    fontSize: 14,
    color: "#4F4F4F",
    marginBottom: 15,
  },
  total: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333333",
    marginTop: 20,
  },
  footer: {
    position: "absolute",
    bottom: 40,
    left: 40,
    right: 40,
    textAlign: "center",
    fontSize: 10,
    color: "#A7A7A7",
  },
  line: {
    borderBottom: 1,
    borderBottomColor: "#A7A7A7",
    borderBottomStyle: "solid",
    marginVertical: 10,
  },
  highlight: {
    backgroundColor: "#F6F8FB",
    padding: 10,
    borderRadius: 5,
  },
  table: {
    display: "flex",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row",
  },
  tableCol: {
    width: "25%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCell: {
    margin: "auto",
    marginTop: 5,
    fontSize: 10,
  },
});

const EnhancedInvoicePDF = ({ invoice }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.title}>Maintenance Invoice</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Invoice ID</Text>
        <Text style={styles.value}>{invoice.id}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Owner Name</Text>
        <Text style={styles.value}>{invoice.ownerName}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Bill Date</Text>
        <Text style={styles.value}>{invoice.billDate}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Payment Date</Text>
        <Text style={styles.value}>{invoice.paymentDate}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Phone Number</Text>
        <Text style={styles.value}>{invoice.phoneNumber}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Email</Text>
        <Text style={styles.value}>{invoice.email}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Address</Text>
        <Text style={styles.value}>{invoice.address}</Text>
      </View>
      <View style={styles.line} />
      <View style={styles.section}>
        <Text style={styles.label}>Maintenance Amount</Text>
        <Text style={styles.value}>₹{invoice.maintenanceAmount}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Pending Amount</Text>
        <Text style={styles.value}>₹{invoice.pendingAmount}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Grand Total</Text>
        <Text style={styles.total}>₹{invoice.maintenanceAmount + invoice.pendingAmount}</Text>
      </View>
      <View style={styles.line} />
      <View style={styles.section}>
        <Text style={styles.label}>Note</Text>
        <Text style={[styles.value, styles.highlight]}>{invoice.note}</Text>
      </View>
     
    </Page>
  </Document>
);

export default EnhancedInvoicePDF;
