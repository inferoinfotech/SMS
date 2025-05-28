import React, { useEffect, useState } from "react";
import MaintenanceCard from "../userPersonalDetailScreen/MaintenanceCard";
import MaintenanceOverview from "../userPersonalDetailScreen/MaintenanceOverview";
import { useNavigate } from "react-router-dom";
import {
  getMaintenanceData,
  initiatePayment,
  handlePaymentCallback,
} from "../../../api/maintenanceApi";
import axiosInstance from "@/axios";

const MaintenanceInvoices = () => {
  const navigate = useNavigate();
  const [maintenanceData, setMaintenanceData] = useState([]);

  useEffect(() => {
    const fetchMaintenanceData = async () => {
      try {
        const data = await getMaintenanceData();
        // Ensure data is an array
        if (Array.isArray(data)) {
          setMaintenanceData(data);
        } else {
          console.error("API response is not an array:", data);
        }
      } catch (error) {
        console.error("Error fetching maintenance data:", error);
      }
    };

    fetchMaintenanceData();
  }, []);

  const viewInvoice = () => {
    navigate("/viewMaintenanceInvoice");
  };

  const handlePayment = async (maintenanceId) => {
    try {
      const maintenance = maintenanceData.find(
        (item) => item._id === maintenanceId
      );
  
      if (!maintenance) {
        console.error("Maintenance data not found for ID:", maintenanceId);
        return;
      }
  
      const paymentResponse = await initiatePayment(maintenanceId);
      // Handle the payment response (e.g., redirect to Razorpay interface)
      console.log("Payment initiated:", paymentResponse);
      openRazorpay(paymentResponse.order, maintenanceId, maintenance.amount);
    } catch (error) {
      console.error("Error initiating payment:", error);
    }
  };

  const openRazorpay = (order, maintenanceId, grandTotal) => {
    if (typeof window.Razorpay === "undefined") {
      console.error("Razorpay SDK is not loaded");
      return;
    }
    const options = {
      key: "rzp_test_V7TeUgAIzcpzOL", 
      amount: grandTotal * 100, // Razorpay expects the amount in paise
      currency: order.currency,
      name: "Your Company Name",
      description: "Maintenance Payment",
      order_id: order.id,
      handler: async function (response) {
        console.log("Payment successful:", response);
        try {
          const callbackResponse = await handlePaymentCallback(
            maintenanceId,
            response.razorpay_payment_id
          );
          console.log("Payment callback response:", callbackResponse); // Log the response data
        } catch (error) {
          console.error("Error handling payment callback:", error);
        }
      },
      prefill: {
        name: "User Name",
        email: "user@example.com",
        contact: "1234567890",
      },
      notes: {
        address: "Your Address",
      },
      theme: {
        color: "#F37254",
      },
    };
  
    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const addDays = (dateString, days) => {
    const date = new Date(dateString);
    date.setDate(date.getDate() + days);
    return formatDate(date);
  };

  const filterMaintenanceData = (data) => {
    return data;
  };

  const calculateIsDue = (maintenance) => {
    const currentDate = new Date();
    const dueDate = new Date(maintenance.maintenanceDueDate);
    return dueDate < currentDate;
  };

  const pendingMaintenanceData = filterMaintenanceData(maintenanceData).filter(
    (maintenance) => calculateIsDue(maintenance) && maintenance.status !== "Done"
  );

  const dueMaintenanceData = filterMaintenanceData(maintenanceData).filter(
    (maintenance) => !calculateIsDue(maintenance) && maintenance.status !== "Done"
  );

  const completedMaintenanceData = filterMaintenanceData(maintenanceData).filter(
    (maintenance) => maintenance.status === "Done"
  );

  const calculateTotals = (data) => {
    return data.reduce(
      (totals, maintenance) => {
        totals.totalMaintenanceAmount += maintenance.maintenanceAmount;
        totals.totalPenaltyAmount += maintenance.penaltyAmount;
        return totals;
      },
      { totalMaintenanceAmount: 0, totalPenaltyAmount: 0 }
    );
  };

  const totals = calculateTotals(pendingMaintenanceData);

  return (
    <>
      <MaintenanceOverview
        maintenanceAmount={totals.totalMaintenanceAmount.toFixed(2)}
        penaltyAmount={totals.totalPenaltyAmount.toFixed(2)}
      />

      <section className="flex flex-col justify-center items-start p-5 mt-5 w-full bg-white rounded-2xl">
        <div className="flex flex-col w-full">
          <div className="flex md:flex-row flex-col items-center justify-between w-full">
            <h2 className="text-base font-semibold text-neutral-800">
              Pending Maintenance
            </h2>
            <button
              onClick={viewInvoice}
              className="gap-2.5 px-2.5 py-3.5 rounded-xl min-h-[49px] w-[135px] text-white bg-[linear-gradient(90deg,#FE512E_0%,#F09619_100%)]"
            >
              View Invoice
            </button>
          </div>
          <div className="flex flex-wrap justify-start gap-5 mt-4 w-full">
            {pendingMaintenanceData.length > 0 ? (
              pendingMaintenanceData.map((maintenance, index) => (
                <MaintenanceCard
                  _id = {maintenance._id}
                  key={index}
                  status={maintenance.status}
                  maintenanceAmount={maintenance.maintenanceAmount}
                  penaltyAmount={maintenance.penaltyAmount}
                  amount={maintenance.amount}
                  maintenanceDueDate={maintenance.maintenanceDueDate}
                  penaltyAppliedAfterDays={maintenance.penaltyAppliedAfterDays}
                  isDue={false}
                  onPayNow={() => handlePayment(maintenance._id)}
                />
              ))
            ) : (
              <p className="text-neutral-600">No pending maintenance.</p>
            )}
          </div>
        </div>
      </section>

      <section className="flex flex-col justify-center items-start p-5 mt-5 w-full bg-white rounded-2xl">
        <div className="flex flex-col w-full">
          <h2 className="text-base font-semibold text-neutral-800">
            Due Maintenance
          </h2>
          <div className="flex flex-wrap justify-start gap-5 mt-4 w-full">
            {dueMaintenanceData.length > 0 ? (
              dueMaintenanceData.map((maintenance, index) => (
                <MaintenanceCard
                _id = {maintenance._id}
                  key={index}
                  status={maintenance.status}
                  maintenanceAmount={maintenance.maintenanceAmount}
                  penaltyAmount={maintenance.penaltyAmount}
                  amount={maintenance.amount}
                  maintenanceDueDate={maintenance.maintenanceDueDate}
                  penaltyAppliedAfterDays={maintenance.penaltyAppliedAfterDays}
                  isDue={true}
                  onPayNow={() => handlePayment(maintenance._id)}
                />
              ))
            ) : (
              <p className="text-neutral-600">No due maintenance.</p>
            )}
          </div>
        </div>
      </section>

      <section className="flex flex-col justify-center items-start p-5 mt-5 w-full bg-white rounded-2xl">
        <div className="flex flex-col w-full">
          <h2 className="text-base font-semibold text-neutral-800">
            Completed Maintenance
          </h2>
          <div className="flex flex-wrap justify-start gap-5 mt-4 w-full">
            {completedMaintenanceData.length > 0 ? (
              completedMaintenanceData.map((maintenance, index) => (
                <MaintenanceCard
                  _id={maintenance._id}
                  key={index}
                  status={maintenance.status}
                  maintenanceAmount={maintenance.maintenanceAmount}
                  penaltyAmount={maintenance.penaltyAmount}
                  amount={maintenance.amount}
                  maintenanceDueDate={maintenance.maintenanceDueDate}
                  penaltyAppliedAfterDays={maintenance.penaltyAppliedAfterDays}
                  isDue={false}
                  isCompleted={true}
                  onPayNow={() => handlePayment(maintenance._id)}
                />
              ))
            ) : (
              <p className="text-neutral-600">No completed maintenance.</p>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default MaintenanceInvoices;