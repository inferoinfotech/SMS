import React, { useState, useEffect } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import images from '../../../Images';
import './style.css';
import CustomButton from '../../../components/customButton/CustomButton';
import AddNumber from '../../../components/addNumber/AddNumber';
import DeleteNumber from '../../../components/deleteNumber/DeleteNumber';
import RequestTable from '../requestTrackingScreen/RequestTable';
import ViewTracking from '../../../components/viewTracking/ViewTracking';
import EditRequest from '../../../components/editRequest/EditRequest';
import {
  getImportantNumbers,
  deleteImportantNumber,
  getMaintencePending,
  getUpcomingactivity,
  getalltotal,
  getImportantNumbersForResident,
  getresidentPendingMaintence,
  getresidentUpcomingactivity,
  getresidentalltotal,
} from '../../../api/importantNumberApi';
import { getRequestComplaints, getRequestComplaintsResident } from '@/api/requestComplaintApi';
import moment from 'moment';
import BalanceChart from './BalanceChart';

const Dashboard = () => {
  const role = localStorage.getItem('role'); // Get the role from localStorage
  const adminId = localStorage.getItem('adminId');
  const navigate = useNavigate();

  const [requests, setRequests] = useState([]);
  const [userRequests, setUserRequests] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [importantNumbers, setImportantNumbers] = useState([]);
  const [numberToEdit, setNumberToEdit] = useState(null);
  const [numberToDelete, setNumberToDelete] = useState(null);

  useEffect(() => {
    if (role === 'admin' && adminId && adminId !== "undefined" && adminId !== "") {
      fetchAdminData();
    } else if (role === 'resident') {
      fetchResidentData();
    }
  }, [role, adminId]);

  const fetchAdminData = async () => {
    try {
      await Promise.all([
        fetchRequests(),
        fetchImportantNumbers(),
        fetchAdminTotalData(),
        fetchAdminUpcomingActivities(),
        fetchAdminPendingMaintenances(),
      ]);
    } catch (error) {
      console.error('Error fetching admin data:', error);
    }
  };

  const fetchResidentData = async () => {
    try {
      await Promise.all([
        fetchUserRequests(),
        fetchImportantNumbersForResident(),
        fetchResidentTotalData(),
        fetchResidentUpcomingActivities(),
        fetchResidentPendingMaintenances(),
      ]);
    } catch (error) {
      console.error('Error fetching resident data:', error);
    }
  };

  const fetchRequests = async () => {
    try {
      const response = await getRequestComplaints();
      setRequests(response.requests);
    } catch (error) {
      console.error('Error fetching requests:', error);
    }
  };

  const fetchUserRequests = async () => {
    try {
      const response = await getRequestComplaintsResident();
      setUserRequests(response.requests);
    } catch (error) {
      console.error('Error fetching requests:', error);
    }
  };

  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [isViewPopupOpen, setIsViewPopupOpen] = useState(false);
  const [itemToEdit, setItemToEdit] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [itemToView, setItemToView] = useState(null);
  const [pendingMaintenances, setPendingMaintenances] = useState([]);

  const [totalData, setTotalData] = useState({
    totalIncome: 0,
    totalExpenses: 0,
    totalBalance: 0,
    totalUnits: 0,
    unitName: '' // Add this line to store the unitName
  });
  const [upcomingActivities, setUpcomingActivities] = useState([]);

  const fetchAdminTotalData = async () => {
    try {
      const totalResponse = await getalltotal();
      setTotalData(totalResponse);
    } catch (error) {
      console.error('Error fetching admin total data:', error);
    }
  };

  const fetchResidentTotalData = async () => {
    try {
      const totalResponse = await getresidentalltotal();
      setTotalData({
        totalIncome: totalResponse.totalIncome || 0,
        totalExpenses: totalResponse.totalExpenses || 0,
        totalBalance: totalResponse.totalBalance || 0,
        totalUnits: totalResponse.totalUnits || 0,
        unitName: totalResponse.unitName || '' // Add this line
      });
    } catch (error) {
      console.error('Error fetching resident total data:', error);
    }
  };
  const fetchAdminUpcomingActivities = async () => {
    try {
      const upcomingActivityResponse = await getUpcomingactivity();
  
      // Check if the response is an array or an object with a 'records' property
      let records = Array.isArray(upcomingActivityResponse)
        ? upcomingActivityResponse // If it's already an array
        : upcomingActivityResponse.records; // If it's an object with a 'records' property
  
      // If records is still undefined or not an array, handle it
      if (!records || !Array.isArray(records)) {
        console.error('API response is invalid or does not contain a valid records array:', upcomingActivityResponse);
        setUpcomingActivities([]); // Set to an empty array if the response is invalid
        return;
      }
  
      // Format the upcoming activities
      const formattedUpcomingActivities = records.map((item) => ({
        ...item,
        date: item.date ? moment(item.date).format('DD/MM/YY') : item.date,
        title_letter: item.Announcement_title ? item.Announcement_title.charAt(0).toUpperCase() : null,
      }));
  
      setUpcomingActivities(formattedUpcomingActivities);
    } catch (error) {
      console.error('Error fetching admin upcoming activities:', error);
      setUpcomingActivities([]); // Set to an empty array in case of an error
    }
  };  
  const fetchResidentUpcomingActivities = async () => {
    try {
      const upcomingActivityResponse = await getresidentUpcomingactivity();
  
      // Check if the response is an array or an object with a 'records' property
      let records = Array.isArray(upcomingActivityResponse)
        ? upcomingActivityResponse // If it's already an array
        : upcomingActivityResponse.records; // If it's an object with a 'records' property
  
      // If records is still undefined or not an array, handle it
      if (!records || !Array.isArray(records)) {
        console.error('API response is invalid or does not contain a valid records array:', upcomingActivityResponse);
        setUpcomingActivities([]); // Set to an empty array if the response is invalid
        return;
      }
  
      // Format the upcoming activities
      const formattedUpcomingActivities = records.map((item) => ({
        ...item,
        date: item.date ? moment(item.date).format('DD/MM/YY') : item.date,
        title_letter: item.Announcement_title ? item.Announcement_title.charAt(0).toUpperCase() : null,
      }));
  
      setUpcomingActivities(formattedUpcomingActivities);
    } catch (error) {
      console.error('Error fetching resident upcoming activities:', error);
      setUpcomingActivities([]); // Set to an empty array in case of an error
    }
  };

  const fetchAdminPendingMaintenances = async () => {
    try {
      const pendingMaintenanceResponse = await getMaintencePending();
      setPendingMaintenances(pendingMaintenanceResponse.records);
    } catch (error) {
      console.error('Error fetching admin pending maintenances:', error);
    }
  };

  const fetchResidentPendingMaintenances = async () => {
    try {
      const pendingMaintenanceResponse = await getresidentPendingMaintence();
      setPendingMaintenances(pendingMaintenanceResponse.records);
    } catch (error) {
      console.error('Error fetching resident pending maintenances:', error);
    }
  };
  const handleMaintenanceNavigation = () => {
    navigate('/maintenanceInvoices');
  };

  const handleUpcomingActivityNavigation = () => {
    navigate('/otherInvoice', { state: { activeTab: 'activity' } });
  };

  const handleEditRequest = (index) => {
    setItemToEdit({ ...requests[index], index });
    setIsEditPopupOpen(true);
  };

  const handleDeleteRequest = (index) => {
    setItemToDelete(index);
    setIsDeletePopupOpen(true);
  };

  const handleViewRequest = (index) => {
    setItemToView(requests[index]);
    setIsViewPopupOpen(true);
  };

  const closeEditPopup = () => {
    setIsEditPopupOpen(false);
    setItemToEdit(null);
  };

  const closeDeletePopup = () => {
    setIsDeletePopupOpen(false);
    setItemToDelete(null);
  };

  const closeViewPopup = () => {
    setIsViewPopupOpen(false);
    setItemToView(null);
  };

  const addRequest = (request) => {
    setRequests([...requests, request]);
  };

  const updateRequest = (index, updatedRequest) => {
    const updatedRequests = [...requests];
    updatedRequests[index] = updatedRequest;
    setRequests(updatedRequests);
    closeEditPopup();
  };

  const deleteRequest = (index) => {
    const updatedRequests = requests.filter((_, i) => i !== index);
    setRequests(updatedRequests);
    closeDeletePopup();
  };

  const fetchImportantNumbers = async () => {
    try {
      const data = await getImportantNumbers();
      if (!Array.isArray(data)) {
        console.error('API response is not an array:', data);
        setImportantNumbers([]);
      } else {
        setImportantNumbers(data);
      }
    } catch (error) {
      console.error('Error fetching important numbers:', error);
      setImportantNumbers([]);
    }
  };

  const fetchImportantNumbersForResident = async () => {
    try {
      const data = await getImportantNumbersForResident();
      if (!Array.isArray(data)) {
        console.error('API response is not an array:', data);
        setImportantNumbers([]);
      } else {
        setImportantNumbers(data);
      }
    } catch (error) {
      console.error('Error fetching important numbers:', error);
      setImportantNumbers([]);
    }
  };

  const handleAddNumber = (newNumber) => {
    setImportantNumbers([...importantNumbers, newNumber]);
  };

  const handleUpdateNumber = (updatedNumber) => {
    setImportantNumbers(
      importantNumbers.map((number) => (number._id === updatedNumber._id ? updatedNumber : number))
    );
  };

  const handleDeleteNumber = async (id) => {
    try {
      await deleteImportantNumber(id);
      setImportantNumbers(importantNumbers.filter((number) => number._id !== id));
    } catch (error) {
      console.error('Error deleting important number:', error);
    }
  };
  useEffect(() => {
  }, [pendingMaintenances]);
  const togglePopup = () => {
    setShowPopup(!showPopup);
    setNumberToEdit(null);
    Navigate('/residentManagementScreen'); // Redirect to /residentManagementScreen
  };

  const handleEdit = (number) => {
    setNumberToEdit(number);
    setShowPopup(true);
  };

  const handleDelete = (number) => {
    setNumberToDelete(number);
    setShowDeletePopup(true);
  };

  const handleDeleteConfirm = () => {
    if (numberToDelete) {
      handleDeleteNumber(numberToDelete._id);
    }
    setShowDeletePopup(false);
  };

  const handleDeleteCancel = () => {
    setShowDeletePopup(false);
  };

  return (
    <div className="dashboard">
      {/* First Row with 4 equal columns */}
      <div className="grid 2xl:grid-cols-4 xl:grid-cols-4 sm:grid-cols-2 grid-cols-1 sm:gap-5 gap-0">
        {role === 'admin' && adminId && adminId !== 'undefined' && adminId !== '' ? (
          <>
            <div className="component-wrapper transform hover:scale-[1.04] transition-transform duration-300">
              <div className="frame-8">
                <div className="frame-9">
                  <div className="total-balance">Total Balance</div>
                  <div className="group-4 undefined">
                    <img className="img" alt="rupee" src={images.rupeeBlack} />
                    <div className="element">{totalData.totalBalance}</div>
                  </div>
                </div>
                <img className="" alt="total-balance" src={images.totalBalance} />
              </div>
              <div className="rectangle-3 undefined"></div>
            </div>
            <div className="component-wrapper transform hover:scale-[1.04] transition-transform duration-300">
              <div className="frame-8">
                <div className="frame-9">
                  <div className="total-balance">Total Income</div>
                  <div className="group-4 component-12">
                    <img className="img" alt="rupee" src={images.rupeeBlack} />
                    <div className="element">{totalData.totalIncome}</div>
                  </div>
                </div>
                <img className="" alt="total-income" src={images.totalIncome} />
              </div>
              <div className="rectangle-3 component-12-instance"></div>
            </div>
            <div className="component-wrapper transform hover:scale-[1.04] transition-transform duration-300">
              <div className="frame-8">
                <div className="frame-9">
                  <div className="total-balance">Total Expense</div>
                  <div className="group-4 component-6">
                    <img className="img" alt="rupee" src={images.rupeeBlack} />
                    <div className="element">{totalData.totalExpenses}</div>
                  </div>
                </div>
                <img className="" alt="total-expense" src={images.totalExpense} />
              </div>
              <div className="rectangle-3 component-7"></div>
            </div>
            <div className="component-wrapper transform hover:scale-[1.04] transition-transform duration-300">
              <div className="frame-8">
                <div className="frame-9">
                  <div className="total-balance">Total Unit</div>
                  <div className="group-4 component-6">
                    <img className="img" alt="rupee" src={images.rupeeBlack} />
                    <div className="element">{totalData.totalUnits}</div>
                  </div>
                </div>
                <img className="" alt="total-unit" src={images.totalUnit} />
              </div>
              <div className="rectangle-3 component-8"></div>
            </div>
          </>
        ) : (
          <>
            <div className="component-wrapper transform hover:scale-[1.04] transition-transform duration-300">
              <div className="frame-8">
                <div className="frame-9">
                  <div className="total-balance">Total Expense</div>
                  <div className="group-4 component-6">
                    <img className="img" alt="rupee" src={images.rupeeBlack} />
                    <div className="element">{totalData.totalExpenses}</div>
                  </div>
                </div>
                <img className="" alt="total-expense" src={images.totalExpense} />
              </div>
              <div className="rectangle-3 component-7"></div>
            </div>
            <div className="component-wrapper transform hover:scale-[1.04] transition-transform duration-300">
              <div className="frame-8">
                <div className="frame-9">
                  <div className="total-balance">Sweet Home</div>
                  <div className="flex items-center py-[2px]">
                <  div className="flex items-center py-[2px]">
          <div className="font-black text-2xl pt-[1px] me-5">{totalData.unitName.charAt(0).toUpperCase()}</div>
          <div className="font-black text-2xl pt-[2px]">{totalData.unitName.slice(2)}</div>
        </div>
                  </div>
                </div>
                <img className="" alt="total-unit" src={images.totalUnit} />
              </div>
              <div className="rectangle-3 component-8"></div>
            </div>
          </>
        )}
      </div>

      {/* Second Row with 3 columns */}
      {role === 'admin' && adminId && adminId !== 'undefined' && adminId !== '' ? (
        <>
          <div className="grid 2xl:grid-cols-4 xl:grid-cols-4 lg:grid-cols-2 grid-cols-1 sm:gap-5 gap-0 mt-5">
            {/* Chart Presentation Start */}
            <div className="overlap-5 lg:col-span-2 col-span-1 bg-white p-4">
              <div className="group-37">
                <div className="overlap-6">
                  <div className="group-38">
                    <div className="frame-82">
                      <div className="text-wrapper-35">Total Balance</div>
                      <Link
                        className="month-btn hover-button-false border-button-true gray-button-false component-5"
                        to="/maintenanceDetail"
                      >
                        <div className="buttons component-17-instance">Month</div>
                        <img src={images.downArrow} alt="" />
                      </Link>
                    </div>
                    <div className="">
                      <BalanceChart />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Important Numbers Start */}
            <div className="frame-63">
              <div className="frame-68 h-[50px]">
                <div className="text-wrapper-35">Important Numbers</div>
                <CustomButton className="m-0" text="Add" imageType="Add" onClick={togglePopup} width="" />
              </div>
              <div className="w-full overflow-y-scroll h-[310px]">
                {Array.isArray(importantNumbers) && importantNumbers.length > 0 ? (
                  importantNumbers.map((data) => {
                    const { _id, name, phoneNumber, work } = data;
                    return (
                      <div className="frame-65" key={_id}>
                        <div className="frame-11">
                          <div className="frame-12">
                            <p className="name-hanna-donin">
                              <span className="span">Name : </span>
                              <span className="text-wrapper-9">{name}</span>
                            </p>
                            <p className="ph-number">
                              <span className="span">Ph Number : </span>
                              <span className="text-wrapper-9">{phoneNumber}</span>
                            </p>
                            <p className="work-plumber">
                              <span className="span">Work : </span>
                              <span className="text-wrapper-9">{work}</span>
                            </p>
                          </div>
                          <div className="frame-13">
                            <button
                              className="frame-50"
                              onClick={() => handleDelete({ _id, name, phoneNumber, work })}
                            >
                              <img className="" alt="delete-icon" src={images.deleteIcon} />
                            </button>
                            <button
                              className="frame-50"
                              onClick={() => handleEdit({ _id, name, phoneNumber, work })}
                            >
                              <img className="" alt="edit-icon" src={images.edit} />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="no-data-message text-center">
                    <p>No data found.</p>
                  </div>
                )}
              </div>
            </div>
            {showPopup && (
              <AddNumber
                onClose={togglePopup}
                onAdd={handleAddNumber}
                onUpdate={handleUpdateNumber}
                numberToEdit={numberToEdit}
              />
            )}
            {showDeletePopup && <DeleteNumber onCancel={handleDeleteCancel} onDelete={handleDeleteConfirm} />}

            {/* Pending Maintenances Start */}
            <div className="frame-66">
              <div className="frame-67">
                <div className="frame-68 h-[50px]">
                  <div className="text-wrapper-39">Pending Maintenances</div>
                  <CustomButton className="m-0" text="View all" onClick={handleMaintenanceNavigation} />
                </div>
                <div className="pending-maintenances design-component-instance-node-9 w-full overflow-y-scroll h-[312px]">
                  {pendingMaintenances && pendingMaintenances.length > 0 ? (
                    pendingMaintenances.map((maintenance, index) => {
                      return (
                        <div className="frame-15 w-full my-2" key={index}>
                          <div className="frame-16 flex justify-between items-center w-full">
                            <div className="maintenance-data flex items-center">
                              <img className="ellipse me-2" alt="Ellipse" src={images.ellipse1091} />
                              <div className="frame-17">
                                <div className="text-wrapper-10">{maintenance.residentName}</div>
                                <div className="text-wrapper-11">{maintenance.pendingDuration}</div>
                              </div>
                            </div>
                            <div className="frame-18 me-2">
                              <img className="group-5" alt="Group" src={images.rupeeRed} />
                              <div className="text-wrapper-12">{maintenance.totalAmount}</div>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="text-center w-full">No pending maintenances</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="grid 2xl:grid-cols-3 xl:grid-cols-3 lg:grid-cols-1 grid-cols-1 sm:gap-5 gap-0 mt-5">
            {/* Important Numbers Start */}
            <div className="frame-63">
              <div className="frame-68">
                <div className="text-wrapper-35">Society's Important Number List</div>
              </div>
              <div className="w-full overflow-y-scroll h-[310px]">
                {Array.isArray(importantNumbers) && importantNumbers.length > 0 ? (
                  importantNumbers.map((data) => {
                    const { _id, name, phoneNumber, work } = data;
                    return (
                      <div className="frame-65" key={_id}>
                        <div className="frame-11">
                          <div className="frame-12">
                            <p className="name-hanna-donin">
                              <span className="span">Name : </span>
                              <span className="text-wrapper-9">{name}</span>
                            </p>
                            <p className="ph-number">
                              <span className="span">Ph Number : </span>
                              <span className="text-wrapper-9">{phoneNumber}</span>
                            </p>
                            <p className="work-plumber">
                              <span className="span">Work : </span>
                              <span className="text-wrapper-9">{work}</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="no-data-message text-center">No data found.</div>
                )}
              </div>
            </div>
            {showPopup && (
              <AddNumber
                onClose={togglePopup}
                onAdd={handleAddNumber}
                onUpdate={handleUpdateNumber}
                numberToEdit={numberToEdit}
              />
            )}
            {showDeletePopup && <DeleteNumber onCancel={handleDeleteCancel} onDelete={handleDeleteConfirm} />}

            {/* Pending Maintenances Start */}
            <div className="frame-66">
              <div className="frame-67">
                <div className="frame-68 h-[50px]">
                  <div className="text-wrapper-39">Pending Maintenances</div>
                  <CustomButton className="m-0" text="View all" onClick={handleMaintenanceNavigation} />
                </div>
                <div className="pending-maintenances design-component-instance-node-9 w-full overflow-y-scroll h-[312px]">
                  {pendingMaintenances && pendingMaintenances.length > 0 ? (
                    pendingMaintenances.map((maintenance, index) => (
                      <div className="frame-15 w-full my-2" key={index}>
                        <div className="frame-16 flex justify-between items-center w-full">
                          <div className="maintenance-data flex items-center">
                            <img className="ellipse me-2" alt="Ellipse" src={images.ellipse1091} />
                            <div className="frame-17">
                              <div className="text-wrapper-10">{maintenance.residentName}</div>
                              <div className="text-wrapper-11">{maintenance.pendingDuration}</div>
                            </div>
                          </div>
                          <div className="frame-18 me-2">
                            <img className="group-5" alt="Group" src={images.rupeeRed} />
                            <div className="text-wrapper-12">{maintenance.totalAmount}</div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center w-full">No pending maintenances</div>
                  )}
                </div>
              </div>
            </div>

            {/* Upcoming Activity Start */}
            <div className="frame-63">
              <div className="frame-71">
                <div className="frame-72 h-[50px]">
                  <div className="text-wrapper-35">Upcoming Activity</div>
                  <CustomButton className="m-0" text="View all" onClick={handleUpcomingActivityNavigation} />
                </div>
                <div className="frame-73 w-full">
                  <div className="upcoming-activity design-component-instance-node-9 w-full overflow-y-scroll h-[312px]">
                    {upcomingActivities.length > 0 ? (
                      upcomingActivities.map((activity, index) => (
                        <div className="frame-19" key={index}>
                          <div className="frame-20">
                            <div className="group-6">
                              <div className="overlap-group-3">
                                <div className="ellipse-2 undefined"></div>
                                <div className="s undefined">{activity.title_letter}</div>
                              </div>
                            </div>
                            <div className="frame-21">
                              <div className="society-meeting">{activity.Announcement_title}</div>
                              <p className="p">{activity.time}</p>
                            </div>
                          </div>
                          <div className="frame-22">
                            <div className="text-wrapper-13">{activity.date}</div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center">No upcoming activities</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Third Row with 2 columns */}
      {role === 'admin' && adminId && adminId !== 'undefined' && adminId !== '' ? (
        <div className="grid 2xl:grid-cols-4 xl:grid-cols-4 grid-cols-1 sm:gap-5 gap-0 mt-5">
          {/* Request Table Start */}
          <div className="frame-43 col-span-3">
            <RequestTable
              requests={requests}
              onEdit={handleEditRequest}
              onDelete={handleDeleteRequest}
              onView={handleViewRequest}
            />

            {isEditPopupOpen && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div className="bg-white p-8 rounded-lg shadow-lg">
                  <EditRequest onClose={closeEditPopup} onUpdate={updateRequest} itemToEdit={itemToEdit} />
                </div>
              </div>
            )}

            {isDeletePopupOpen && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div className="bg-white p-8 rounded-lg shadow-lg">
                  <DeleteNumber onCancel={closeDeletePopup} onDelete={() => deleteRequest(itemToDelete)} />
                </div>
              </div>
            )}

            {isViewPopupOpen && (
              <ViewTracking complaint={itemToView} onClose={closeViewPopup} />
            )}
          </div>

          {/* Upcoming Activity Start */}
          <div className="frame-63-1">
            <div className="frame-71">
              <div className="frame-72 h-[50px]">
                <div className="text-wrapper-35">Upcoming Activity</div>
                <CustomButton className="m-0" text="View all" onClick={handleUpcomingActivityNavigation} />
              </div>
              <div className="frame-73 w-full">
                <div className="upcoming-activity design-component-instance-node-9 w-full overflow-y-scroll h-[275px]">
                  {upcomingActivities.length > 0 ? (
                    upcomingActivities.map((activity, index) => (
                      <div className="frame-19" key={index}>
                        <div className="frame-20">
                          <div className="group-6">
                            <div className="overlap-group-3">
                              <div className="ellipse-2 undefined"></div>
                              <div className="s undefined">{activity.title_letter}</div>
                            </div>
                          </div>
                          <div className="frame-21">
                            <div className="society-meeting">{activity.Announcement_title}</div>
                            <p className="p">{activity.time}</p>
                          </div>
                        </div>
                        <div className="frame-22">
                          <div className="text-wrapper-13">{activity.date}</div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center">No upcoming activities</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid 2xl:grid-cols-4 xl:grid-cols-4 grid-cols-1 sm:gap-5 gap-0 mt-5">
          {/* Request Table Start */}
          <div className="frame-43 col-span-4">
            <RequestTable
              requests={userRequests}
              onEdit={handleEditRequest}
              onDelete={handleDeleteRequest}
              onView={handleViewRequest}
            />

            {isEditPopupOpen && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div className="bg-white p-8 rounded-lg shadow-lg">
                  <EditRequest onClose={closeEditPopup} onUpdate={updateRequest} itemToEdit={itemToEdit} />
                </div>
              </div>
            )}

            {isDeletePopupOpen && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div className="bg-white p-8 rounded-lg shadow-lg">
                  <DeleteNumber onCancel={closeDeletePopup} onDelete={() => deleteRequest(itemToDelete)} />
                </div>
              </div>
            )}

            {isViewPopupOpen && (
              <ViewTracking complaint={itemToView} onClose={closeViewPopup} />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;