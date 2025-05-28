import React, { useState, useEffect } from "react";
import {
  getMaintenceDetails,
  getUserDetailsById,
  getAnnouncement,
} from "../../../api/userPersonalDetailApi";
import UserDetails from "./UserDetails";
import MemberCard from "./MemberCard";
import VehicleCard from "./VehicleCard";
import MaintenanceCard from "./MaintenanceCard";
import MaintenanceOverview from "./MaintenanceOverview";
import UserAnnouncementCard from "./UserAnnouncementCard";
import {
  getMaintenanceData,
  initiatePayment,
  handlePaymentCallback,
} from "../../../api/maintenanceApi";
import { getsingleuserAnnouncement } from "@/api/AnnouncementApi";

const UserPersonalDetails = () => {

  const userId = localStorage.getItem('residentId');

  const [userDetails, setUserDetails] = useState(null);
  const [announcement, setAnnouncement] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [maintenanceData, setMaintenanceData] = useState([]);
  const [isOwnerStatus, setIsOwnerStatus] = useState(false);

  useEffect(() => {
    console.log("userId:", userId); // Add this line for debugging
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


    const fetchUserDetails = async () => {
      if (!userId) {
        setError(new Error("User ID is undefined"));
        setLoading(false);
        return;
      }

      try {
        const [userData, announcementData] = await Promise.all([
          getUserDetailsById(userId),

          getsingleuserAnnouncement()
        ]);

        setUserDetails(userData);
        setIsOwnerStatus(userData.owner === true ? "Owner" : "Tenant");
        setAnnouncement(announcementData);

      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUserDetails();
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!userDetails) {
    return <div>No user details found</div>;
  }

  const handlePayment = async (maintenanceId) => {
    try {
      const paymentResponse = await initiatePayment(maintenanceId);
      console.log("Payment initiated:", paymentResponse);
      openRazorpay(paymentResponse.order, maintenanceId);
    } catch (error) {
      console.error("Error initiating payment:", error);
    }
  };

  const openRazorpay = (order, maintenanceId) => {
    if (typeof window.Razorpay === "undefined") {
      console.error("Razorpay SDK is not loaded");
      return;
    }

    const options = {
      key: "rzp_test_V7TeUgAIzcpzOL",
      amount: order.amount,
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
          console.log("Payment callback response:", callbackResponse);
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
    return data.filter((maintenance) => maintenance.status !== "Done");
  };

  const pendingMaintenanceData = filterMaintenanceData(maintenanceData);
  const dueMaintenanceData = pendingMaintenanceData.filter((maintenance) => maintenance.isDue);

  const calculateTotals = (data) => {
    return data.reduce(
      (totals, maintenance) => {
        totals.totalMaintenanceAmount += maintenance.amount;
        totals.totalPenaltyAmount += maintenance.penaltyAmount;
        return totals;
      },
      { totalMaintenanceAmount: 0, totalPenaltyAmount: 0 }
    );
  };

  const totals = calculateTotals(pendingMaintenanceData);
  console.log("user Detsaisakljsaklfh", userDetails)
  return (
    <div className="flex flex-col rounded-none h-full">
      <div>
        <div className="flex items-start self-start text-sm font-semibold text-center whitespace-nowrap">
          {isOwnerStatus === "Owner" ? (
            <button className="gap-2.5 px-2.5 py-3.5 rounded-xl rounded-b-none border-b-2 border-solid min-h-[49px] w-[135px] text-white bg-[linear-gradient(90deg,#FE512E_0%,#F09619_100%)] border-b-red-500" >
              Owner
            </button>
          ) : (
            <button className="gap-2.5 px-2.5 py-3.5 rounded-xl rounded-b-none border-b-2 border-solid min-h-[49px] w-[135px] text-white bg-[linear-gradient(90deg,#FE512E_0%,#F09619_100%)] border-b-red-500" >
              Tenant
            </button>
          )
          }
        </div>
      </div>

      {isOwnerStatus === "Owner" ? (
        <div className="flex flex-col h-full overflow-y-scroll">
          <UserDetails user={userDetails} />
          <section className="flex flex-col max-md:max-w-full">
            <div className="flex flex-col justify-center p-5 mt-5 bg-white rounded-2xl max-md:max-w-full">
              <h2 className="text-base font-semibold text-neutral-800">
                Member : ({userDetails.members?.length || 0})
              </h2>
              <div className="flex flex-wrap gap-5 items-start mt-4 max-md:max-w-full">
                {userDetails.members?.length > 0 ? (
                  userDetails.members.map((member, index) => (
                    <MemberCard key={index} {...member} />
                  ))
                ) : (
                  <div className="text-slate-600 font-medium text-xl">No members found</div>
                )}
              </div>
            </div>

            <div className="flex flex-col justify-center p-5 mt-5 bg-white rounded-2xl max-md:max-w-full">
              <h2 className="text-base font-semibold text-neutral-800">
                Vehicle : ({userDetails.vehicles?.length || 0})
              </h2>
              <div className="flex flex-wrap gap-5 items-start mt-4 max-md:max-w-full">
                {userDetails.vehicles?.length > 0 ? (
                  userDetails.vehicles.map((vehicle, index) => (
                    <VehicleCard key={index} {...vehicle} />
                  ))
                ) : (
                  <div className="text-slate-600 font-medium text-xl">No vehicles found</div>
                )}
              </div>
            </div>

            <MaintenanceOverview
              maintenanceAmount={totals.totalMaintenanceAmount.toFixed(2)}
              penaltyAmount={totals.totalPenaltyAmount.toFixed(2)}
            />

            <section className="flex overflow-hidden flex-col justify-center items-start p-5 mt-5 w-full bg-white rounded-2xl max-md:max-w-full">
              <div className="flex flex-col max-md:max-w-full">
                <h2 className="text-base font-semibold text-neutral-800">
                  Pending Maintanance
                </h2>
                <div className="flex flex-wrap gap-5 justify-start items-start mt-4 max-md:max-w-full">
                  {pendingMaintenanceData.length > 0 ? (
                    pendingMaintenanceData.map((maintenance, index) => (
                      <MaintenanceCard
                        _id={maintenance._id}
                        key={index}
                        status={maintenance.status}
                        amount={maintenance.amount}
                        penaltyAmount={maintenance.penaltyAmount}
                        billDate={formatDate(maintenance.createdAt)}
                        pendingDate={addDays(
                          maintenance.createdAt,
                          maintenance.penaltyAppliedAfterDays
                        )}
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

            <section className="flex overflow-hidden flex-col justify-center items-start p-5 mt-5 w-full bg-white rounded-2xl max-md:max-w-full">
              <div className="flex flex-col max-md:max-w-full">
                <h2 className="text-base font-semibold text-neutral-800">
                  Due Maintanance
                </h2>
                <div className="flex flex-wrap gap-5 justify-center items-center mt-4 max-md:max-w-full">
                  {dueMaintenanceData.length > 0 ? (
                    dueMaintenanceData.map((maintenance, index) => (
                      <MaintenanceCard
                        _id={maintenance._id}
                        key={index}
                        status={maintenance.status}
                        amount={maintenance.amount}
                        penaltyAmount={maintenance.penaltyAmount}
                        billDate={formatDate(maintenance.maintenanceDueDate)}
                        pendingDate={addDays(
                          maintenance.maintenanceDueDate,
                          maintenance.penaltyAppliedAfterDays
                        )}
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

            <section className="flex flex-col justify-center p-5 mt-5 bg-white rounded-2xl max-md:max-w-full">
              <div className="flex flex-col max-md:max-w-full">
                <h2 className="text-base font-semibold text-neutral-800">
                  Announcement Details
                </h2>
                <div className="flex flex-wrap gap-5 items-start mt-4 max-md:max-w-full">
                  {announcement?.announcements?.length > 0 ? (
                    announcement.announcements.map((announcement, index) => (
                      <UserAnnouncementCard key={index} {...announcement} />
                    ))
                  ) : (
                    <div className="text-slate-600 font-medium text-xl">No announcements found</div>
                  )}
                </div>
              </div>
            </section>
          </section>
        </div>
      ) : (
        <>
          <section className="flex flex-col justify-center p-5 bg-white rounded-md max-md:max-w-full mb-[20px]">
            <div className="md:flex block items-center">
              <div>
                <p className="font-medium">Owner Name</p>
                <span className="text-slate-600">{userDetails.ownerDetails.ownerFullName}</span>
              </div>
              <div className="md:mx-[55px] mx-0 md:my-0 my-4">
                <p className="font-medium">Owner Phone</p>
                <span className="text-slate-600">{userDetails.ownerDetails.ownerPhoneNumber}</span>
              </div>
              <div>
                <p className="font-medium">Owner Address</p>
                <span className="text-slate-600 text-[14px]">
                  {userDetails.ownerDetails.ownerAddress}
                </span>
              </div>
            </div>
          </section>
          <UserDetails user={userDetails} />
          <section className="flex flex-col max-md:max-w-full">
            <div className="flex flex-col justify-center p-5 mt-5 bg-white rounded-2xl max-md:max-w-full">
              <h2 className="text-base font-semibold text-neutral-800">
                Member : ({userDetails.members?.length || 0})
              </h2>
              <div className="flex flex-wrap gap-5 items-start mt-4 max-md:max-w-full">
                {userDetails.members?.length > 0 ? (
                  userDetails.members.map((member, index) => (
                    <MemberCard key={index} {...member} />
                  ))
                ) : (
                  <div className="text-slate-600 font-medium text-xl">No members found</div>
                )}
              </div>
            </div>

            <div className="flex flex-col justify-center p-5 mt-5 bg-white rounded-2xl max-md:max-w-full">
              <h2 className="text-base font-semibold text-neutral-800">
                Vehicle : ({userDetails.vehicles?.length || 0})
              </h2>
              <div className="flex flex-wrap gap-5 items-start mt-4 max-md:max-w-full">
                {userDetails.vehicles?.length > 0 ? (
                  userDetails.vehicles.map((vehicle, index) => (
                    <VehicleCard key={index} {...vehicle} />
                  ))
                ) : (
                  <div className="text-slate-600 font-medium text-xl">No vehicles found</div>
                )}
              </div>
            </div>

            <MaintenanceOverview
              maintenanceAmount={totals.totalMaintenanceAmount.toFixed(2)}
              penaltyAmount={totals.totalPenaltyAmount.toFixed(2)}
            />

            <section className="flex overflow-hidden flex-col justify-center items-start p-5 mt-5 w-full bg-white rounded-2xl max-md:max-w-full">
              <div className="flex flex-col max-md:max-w-full">
                <h2 className="text-base font-semibold text-neutral-800">
                  Pending Maintanance
                </h2>
                <div className="flex flex-wrap gap-5 justify-center items-center mt-4 max-md:max-w-full">
                  {pendingMaintenanceData.length > 0 ? (
                    pendingMaintenanceData.map((maintenance, index) => (
                      <MaintenanceCard
                        _id={maintenance._id}
                        key={index}
                        status={maintenance.status}
                        amount={maintenance.amount}
                        penaltyAmount={maintenance.penaltyAmount}
                        billDate={formatDate(maintenance.createdAt)}
                        pendingDate={addDays(
                          maintenance.createdAt,
                          maintenance.penaltyAppliedAfterDays
                        )}
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

            <section className="flex overflow-hidden flex-col justify-center items-start p-5 mt-5 w-full bg-white rounded-2xl max-md:max-w-full">
              <div className="flex flex-col max-md:max-w-full">
                <h2 className="text-base font-semibold text-neutral-800">
                  Due Maintanance
                </h2>
                <div className="flex flex-wrap gap-5 justify-center items-center mt-4 max-md:max-w-full">
                  {dueMaintenanceData.length > 0 ? (
                    dueMaintenanceData.map((maintenance, index) => (
                      <MaintenanceCard
                        _id={maintenance._id}
                        key={index}
                        status={maintenance.status}
                        amount={maintenance.amount}
                        penaltyAmount={maintenance.penaltyAmount}
                        billDate={formatDate(maintenance.maintenanceDueDate)}
                        pendingDate={addDays(
                          maintenance.maintenanceDueDate,
                          maintenance.penaltyAppliedAfterDays
                        )}
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

            <section className="flex flex-col justify-center p-5 mt-5 bg-white rounded-2xl max-md:max-w-full">
              <div className="flex flex-col max-md:max-w-full">
                <h2 className="text-base font-semibold text-neutral-800">
                  Announcement Details
                </h2>
                <div className="flex flex-wrap gap-5 items-start mt-4 max-md:max-w-full">
                  {announcement?.announcements?.length > 0 ? (
                    announcement.announcements.map((announcement, index) => (
                      <UserAnnouncementCard key={index} {...announcement} />
                    ))
                  ) : (
                    <div className="text-slate-600 font-medium text-xl">No announcements found</div>
                  )}
                </div>
              </div>
            </section>
          </section>
        </>
      )}
    </div>
  );
};

export default UserPersonalDetails;
