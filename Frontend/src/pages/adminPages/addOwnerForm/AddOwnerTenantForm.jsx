import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import images from "../../../Images";
import CustomButton from "@/components/customButton/CustomButton";
import {
  createResident,
  updateResident,
  getResidentById,
} from "@/api/residentApi";

function AddOwnerTenantForm({ initialData }) {
  const [activeTab, setActiveTab] = useState("Owner");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    age: "",
    gender: "",
    wing: "",
    unit: "",
    relation: "",
    ownerDetails: {},
    images: {}
  });
  const [memberCount, setMemberCount] = useState(1);
  const [vehicleCount, setVehicleCount] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Separate state for each file upload component
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [aadharFront, setAadharFront] = useState(null);
  const [aadharBack, setAadharBack] = useState(null);
  const [addressProof, setAddressProof] = useState(null);
  const [rentAgreement, setRentAgreement] = useState(null);

  // State for members and vehicles
  const [members, setMembers] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get("id");
    const activeTabFromUrl = searchParams.get("activeTab");
  
    if (id) {
      getResidentById(id)
        .then((data) => {
          // Prefill form data with fetched resident details
          setFormData({
            firstName: data.firstName || "",
            lastName: data.lastName || "",
            phoneNumber: data.phoneNumber || "",
            email: data.email || "",
            age: data.age || "",
            gender: data.gender || "",
            wing: data.wing || "",
            unit: data.unit || "",
            relation: data.relation || "",
            ownerDetails: data.ownerDetails || {},
            images: data.images || {},
          });
  
          // Set active tab based on resident type
          setActiveTab(data.owner ? "Owner" : "Tenant");
  
          // Prefill members and vehicles
          setMemberCount(data.members?.length || 1);
          setVehicleCount(data.vehicles?.length || 1);
          setMembers(data.members || []);
          setVehicles(data.vehicles || []);
  
          // Prefill file uploads
          setProfilePhoto(data.images?.profilePhoto || null);
          setAadharFront(data.images?.frontAadharCard || null);
          setAadharBack(data.images?.backAadharCard || null);
          setAddressProof(data.images?.addressProof || null);
          setRentAgreement(data.images?.rentAgreement || null);
        })
        .catch((error) => {
          console.error("Error fetching resident details:", error);
        });
    } else if (initialData) {
      // Handle initial data passed to the component
      setFormData(initialData);
    }
  }, [location.search, initialData]);
  console.log("Form Data:", formData);
  useEffect(() => {
    setMembers(
      Array.from({ length: memberCount }, (_, i) =>
        formData.members?.[i] || {
          fullName: "",
          phoneNumber: "",
          email: "",
          age: "",
          gender: "",
          relation: "",
        }
      )
    );
  }, [memberCount, formData.members]);

  useEffect(() => {
    setVehicles(
      Array.from({ length: vehicleCount }, (_, i) =>
        formData.vehicles?.[i] || {
          vehicleType: "",
          vehicleName: "",
          vehicleNumber: "",
        }
      )
    );
  }, [vehicleCount, formData.vehicles]);

  const handleChange = (e, index, type) => {
    const { name, value } = e.target;
  
    if (type === "member") {
      const updatedMembers = [...members];
      updatedMembers[index] = { ...updatedMembers[index], [name]: value };
      setMembers(updatedMembers);
    } else if (type === "vehicle") {
      const updatedVehicles = [...vehicles];
      updatedVehicles[index] = { ...updatedVehicles[index], [name]: value };
      setVehicles(updatedVehicles);
    } else if (name.includes("ownerDetails")) {
      const field = name.split(".")[1];
      // Direct mapping to schema field names
      const schemaFields = {
        name: 'ownerFullName',
        phone: 'ownerPhoneNumber',
        address: 'ownerAddress'
      };
      
      setFormData({
        ...formData,
        ownerDetails: {
          ...formData.ownerDetails,
          [schemaFields[field]]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };
  const handleFileChange = (e, setFile) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
    }
  };

  const handleDrop = (e, setFile) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    console.log("Dropped file:", file);
    setFile(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const residentData = {
        ...formData,
        members,
        vehicles,
        owner: activeTab === "Owner",
        // For tenant, include ownerDetails directly since it's already in the correct format
        ...(activeTab === "Tenant" && {
          ownerDetails: formData.ownerDetails
        })
      };

      // Convert data to FormData
      const formPayload = new FormData();

      const searchParams = new URLSearchParams(location.search);
      const id = searchParams.get("id");

      if (id) {
        // For update
        // Append basic form data
        for (const key in residentData) {
          if (key !== 'members' && key !== 'vehicles' && key !== 'images') {
            if (residentData[key] instanceof Object && !(residentData[key] instanceof Array)) {
              for (const subKey in residentData[key]) {
                formPayload.append(`${key}[${subKey}]`, residentData[key][subKey]);
              }
            } else {
              formPayload.append(key, residentData[key]);
            }
          }
        }

        // Append members and vehicles as JSON strings
        formPayload.append('members', JSON.stringify(members));
        formPayload.append('vehicles', JSON.stringify(vehicles));

        // Only append files that have been changed
        if (profilePhoto instanceof File) {
          formPayload.append('profilePhoto', profilePhoto);
        }
        if (aadharFront instanceof File) {
          formPayload.append('frontAadharCard', aadharFront);
        }
        if (aadharBack instanceof File) {
          formPayload.append('backAadharCard', aadharBack);
        }
        if (addressProof instanceof File) {
          formPayload.append('addressProof', addressProof);
        }
        if (rentAgreement instanceof File) {
          formPayload.append('rentAgreement', rentAgreement);
        }

        const response = await updateResident(id, formPayload);
        console.log("Update Response:", response);
        navigate("/residentManagementScreen");
      } else {
        // For create
        // Append main form data
        for (const key in residentData) {
          if (residentData[key] instanceof Array) {
            residentData[key].forEach((item, index) => {
              for (const subKey in item) {
                formPayload.append(`${key}[${index}][${subKey}]`, item[subKey]);
              }
            });
          } else if (residentData[key] instanceof Object) {
            for (const subKey in residentData[key]) {
              formPayload.append(`${key}[${subKey}]`, residentData[key][subKey]);
            }
          } else {
            formPayload.append(key, residentData[key]);
          }
        }

        // Append files
        if (profilePhoto) {
          formPayload.append('profilePhoto', profilePhoto);
        }
        if (aadharFront) {
          formPayload.append('frontAadharCard', aadharFront);
        }
        if (aadharBack) {
          formPayload.append('backAadharCard', aadharBack);
        }
        if (addressProof) {
          formPayload.append('addressProof', addressProof);
        }
        if (rentAgreement) {
          formPayload.append('rentAgreement', rentAgreement);
        }

        const response = await createResident(formPayload);
        console.log("Create Response:", response);
        navigate("/residentManagementScreen");
      }
    } catch (error) {
      console.error("Error creating/updating resident:", error);
    }
  };
  const handleCancel = () => {
    navigate("/residentManagementScreen");
  };

  return (
    <div className="flex flex-col w-full">
      <div className="flex items-start self-start text-sm font-semibold text-center">
        <button
          className={`rounded-t-xl border-b-2 border-solid min-h-[57px] w-[135px] ${activeTab === "Owner"
              ? "text-white bg-[linear-gradient(90deg,#FE512E_0%,#F09619_100%)]"
              : "bg-white text-neutral-800"
            }`}
          style={{
            borderBottom: "2px solid",
            borderImage: "linear-gradient(to right, #FE512E, #F09619) 1",
          }}
          onClick={() => setActiveTab("Owner")}
        >
          Owner
        </button>
        <button
          className={`rounded-t-xl border-b-2 border-solid min-h-[57px] w-[135px] ${activeTab === "Tenant"
              ? "text-white bg-[linear-gradient(90deg,#FE512E_0%,#F09619_100%)]"
              : "bg-white text-neutral-800"
            }`}
          style={{
            borderBottom: "2px solid",
            borderImage: "linear-gradient(to right, #FE512E, #F09619) 1",
          }}
          onClick={() => setActiveTab("Tenant")}
        >
          Tenant
        </button>
      </div>
      {activeTab === "Tenant" && (
        <div className="flex flex-col justify-center items-center p-5 bg-white rounded-xl rounded-tl-none w-full">
          <div className="flex gap-5 items-center w-full">
            <div className="flex flex-col grow self-stretch my-auto min-h-[96px] min-w-[240px] max-md:max-w-full">
              <InputField
                type="text"
                label="Owner Full Name"
                required
                placeholder="Enter Owner Full Name"
                name="ownerDetails.name"
                value={formData?.ownerDetails?.ownerFullName || ""}
                onChange={(e) => handleChange(e, null, null)}
              />
            </div>
            <div className="flex flex-col grow self-stretch my-auto min-h-[96px] min-w-[240px] max-md:max-w-full">
              <InputField
                type="tel"
                label="Owner Phone Number"
                required
                placeholder="Enter Phone Number"
                name="ownerDetails.phone"
                value={formData?.ownerDetails?.ownerPhoneNumber || ""}
                onChange={(e) => handleChange(e, null, null)}
              />
            </div>
            <div className="flex flex-col grow self-stretch my-auto min-h-[96px] min-w-[240px] max-md:max-w-full">
              <InputField
                type="text"
                label="Owner Address"
                placeholder="Enter Address"
                name="ownerDetails.address"
                value={formData?.ownerDetails?.ownerAddress || ""}
                onChange={(e) => handleChange(e, null, null)}
              />
            </div>
          </div>
        </div>
      )}
      <form
        className={`flex flex-col justify-center items-center p-5 bg-white rounded-xl w-full ${activeTab === "Tenant" ? "mt-5" : "mt-0 rounded-tl-none"
          }`}
        onSubmit={handleSubmit}
      >
        <div className="flex relative flex-col w-full">
          <div className="flex z-0 flex-col w-full">
            <div className="flex gap-10 items-center w-full">
              {/* TO UPLOAD PROFILE PHOTO */}
              <PhotoUpload
                selectedFile={
                  profilePhoto instanceof File
                    ? URL.createObjectURL(profilePhoto)
                    : profilePhoto
                }
                handleFileChange={(e) => handleFileChange(e, setProfilePhoto)}
                handleDrop={(e) => handleDrop(e, setProfilePhoto)}
                handleDragOver={handleDragOver}
                id="profilePhotoInput"
              />
              <div className="flex flex-col self-stretch my-auto w-full">
                <div className="flex flex-wrap gap-5 items-center max-md:max-w-full">
                  <div className="flex flex-col grow self-stretch my-auto min-h-[96px] min-w-[240px] max-md:max-w-full">
                    <InputField
                      type="text"
                      label="First Name"
                      required
                      placeholder="Enter First Name"
                      name="firstName"
                      value={formData?.firstName || ""}
                      onChange={(e) => handleChange(e, null, null)}
                    />
                  </div>
                  <div className="flex flex-col grow self-stretch my-auto min-h-[96px] min-w-[240px] max-md:max-w-full">
                    <InputField
                      type="text"
                      label="Last Name"
                      required
                      placeholder="Enter Last Name"
                      name="lastName"
                      value={formData?.lastName || ""}
                      onChange={(e) => handleChange(e, null, null)}
                    />
                  </div>
                  <div className="flex flex-col grow self-stretch my-auto min-h-[96px] min-w-[240px] max-md:max-w-full">
                    <InputField
                      type="tel"
                      label="Phone Number"
                      required
                      placeholder="Enter Phone Number"
                      name="phoneNumber"
                      value={formData?.phoneNumber || ""}
                      onChange={(e) => handleChange(e, null, null)}
                    />
                  </div>
                  <div className="flex flex-col grow self-stretch my-auto min-h-[96px] min-w-[240px] max-md:max-w-full">
                    <InputField
                      type="email"
                      label="Email Address"
                      placeholder="Enter Email Address"
                      name="email"
                      value={formData?.email || ""}
                      onChange={(e) => handleChange(e, null, null)}
                    />
                  </div>
                </div>
                <div className="flex gap-5 items-start mt-1 w-full">
                  <div className="flex flex-col grow self-stretch my-auto min-h-[96px] min-w-[240px] max-md:max-w-full">
                    <InputField
                      type="number"
                      label="Age"
                      required
                      placeholder="Enter Age"
                      min={1}
                      max={120}
                      name="age"
                      value={formData?.age || ""}
                      onChange={(e) => handleChange(e, null, null)}
                    />
                  </div>
                  <div className="flex flex-col grow self-stretch my-auto min-h-[96px] min-w-[240px] max-md:max-w-full">
                    <InputField
                      type="select"
                      label="Gender"
                      required
                      options={["Male", "Female", "Other"]}
                      name="gender"
                      value={formData?.gender}
                      onChange={(e) => handleChange(e, null, null)}
                    />
                  </div>
                  <div className="flex flex-col grow self-stretch my-auto min-h-[96px] min-w-[240px] max-md:max-w-full">
                    <InputField
                      type="text"
                      label="Wing"
                      required
                      placeholder="Enter Wing"
                      name="wing"
                      value={formData?.wing}
                      onChange={(e) => handleChange(e, null, null)}
                    />
                  </div>
                  <div className="flex flex-col grow self-stretch my-auto min-h-[96px] min-w-[240px] max-md:max-w-full">
                    <InputField
                      type="text"
                      label="Unit"
                      required
                      placeholder="Enter Unit"
                      name="unit"
                      value={formData?.unit || ""}
                      onChange={(e) => handleChange(e, null, null)}
                    />
                  </div>
                  <div className="flex flex-col grow self-stretch my-auto min-h-[96px] min-w-[240px] max-md:max-w-full">
                    <InputField
                      type="text"
                      label="Relation"
                      required
                      placeholder="Enter Relation"
                      name="relation"
                      value={formData?.relation || ""}
                      onChange={(e) => handleChange(e, null, null)}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-5 items-start mt-1 max-md:max-w-full">
              {/* TO UPLOAD DOCUMENT 1 */}
              <DocumentUpload
                label="Upload Aadhar Card (Front Side)"
                fileName="frontAadharCard"
                selectedFile={
                  aadharFront instanceof File
                    ? URL.createObjectURL(aadharFront)
                    : aadharFront
                }
                handleFileChange={(e) => handleFileChange(e, setAadharFront)}
                handleDrop={(e) => handleDrop(e, setAadharFront)}
                handleDragOver={handleDragOver}
                id="aadharFrontInput"
              />
              {/* TO UPLOAD DOCUMENT 2 */}
              <DocumentUpload
                label="Upload Aadhar Card (Back Side)"
                fileName="backAadharCard"
                selectedFile={
                  aadharBack instanceof File
                    ? URL.createObjectURL(aadharBack)
                    : aadharBack
                }
                handleFileChange={(e) => handleFileChange(e, setAadharBack)}
                handleDrop={(e) => handleDrop(e, setAadharBack)}
                handleDragOver={handleDragOver}
                id="aadharBackInput"
              />
              {/* TO UPLOAD DOCUMENT 3 */}
              <DocumentUpload
                label="Address Proof (Vera Bill OR Light Bill)"
                fileName="addressProof"
                selectedFile={
                  addressProof instanceof File
                    ? URL.createObjectURL(addressProof)
                    : addressProof
                }
                handleFileChange={(e) => handleFileChange(e, setAddressProof)}
                handleDrop={(e) => handleDrop(e, setAddressProof)}
                handleDragOver={handleDragOver}
                id="addressProofInput"
              />
              {/* TO UPLOAD DOCUMENT 4 */}
              <DocumentUpload
                label="Rent Agreement"
                fileName="rentAgreement"
                selectedFile={
                  rentAgreement instanceof File
                    ? URL.createObjectURL(rentAgreement)
                    : rentAgreement
                }
                handleFileChange={(e) => handleFileChange(e, setRentAgreement)}
                handleDrop={(e) => handleDrop(e, setRentAgreement)}
                handleDragOver={handleDragOver}
                id="rentAgreementInput"
              />
            </div>
          </div>
        </div>
        <MemberForm
          memberCount={memberCount}
          setMemberCount={setMemberCount}
          members={members}
          setMembers={setMembers}
          handleChange={handleChange}
        />
        <VehicleForm
          vehicleCount={vehicleCount}
          setVehicleCount={setVehicleCount}
          vehicles={vehicles}
          setVehicles={setVehicles}
          handleChange={handleChange}
          handleCancel={handleCancel}
          isEditing={!!location.search.includes("id")} // Check if the URL contains 'id' to determine if it's editing
        />
      </form>
    </div>
  );
}

function PhotoUpload({
  selectedFile,
  handleFileChange,
  handleDrop,
  handleDragOver,
  id,
}) {
  return (
    <div
      className="flex flex-col justify-center items-center self-stretch my-auto w-[100px]"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <input
        type="file"
        name="profilePhoto"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
        id={id}
      />
      <label
        htmlFor={id}
        className="flex flex-col max-w-full h-[100px] w-[100px] rounded-full overflow-hidden bg-slate-500 cursor-pointer"
      >
        {selectedFile ? (
          <img
            loading="lazy"
            src={`${import.meta.env.VITE_BASE_URL}/uploads/${selectedFile}`}
            alt="Profile"
            className="object-cover w-full h-full"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <span className="text-white">Upload</span>
          </div>
        )}
      </label>
      <label
        htmlFor={id}
        className="mt-5 text-base font-semibold text-indigo-500 cursor-pointer"
      >
        Add Photo
      </label>
    </div>
  );
}

function DocumentUpload({
  label,
  fileName,
  selectedFile,
  handleFileChange,
  handleDrop,
  handleDragOver,
  id,
}) {
  const [dragging, setDragging] = useState(false);

  const handleDragOverLocal = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  return (
    <div className="flex flex-col w-[370px] grow">
      <label className="text-sm font-medium text-neutral-800">{label}</label>
      <div
        className={`flex flex-col items-center h-[105px] mt-1.5 w-full bg-white rounded-xl border-2 ${dragging ? "border-indigo-500" : "border-dashed border-neutral-300"
          } max-md:px-5`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <input
          type="file"
          name={fileName}
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
          id={id}
        />
        <label
          htmlFor={id}
          className="flex flex-col h-[100%] w-[100%] px-1 py-1 rounded-xl overflow-hidden bg-slate-500 cursor-pointer mb-0"
        >
          {selectedFile ? (
            <img
              loading="lazy"
              src={`${import.meta.env.VITE_BASE_URL}/uploads/${selectedFile}`}
              alt="Profile"
              className="object-cover w-full h-full rounded-xl"
            />
          ) : (
            <div className="flex items-center justify-center h-full rounded-xl">
              <span className="text-white">Upload</span>
            </div>
          )}
        </label>
      </div>
    </div>
  );
}

function InputField({
  label,
  required,
  placeholder,
  type,
  min,
  max,
  options = [],
  name,
  value,
  onChange,
}) {
  const [inputValue, setInputValue] = useState(type === "tel" ? "+91 " : "");

  const handleInput = (e) => {
    let value = e.target.value;

    if (label === "Wing") {
      // Allow only a single character from A to Z
      value = value.toUpperCase().replace(/[^A-Z]/g, "");
      if (value.length > 1) {
        value = value.slice(0, 1);
      }
    } else if (label === "Unit") {
      // Allow only numbers with a max length of 4 digits
      value = value.replace(/[^0-9]/g, "");
      if (value.length > 4) {
        value = value.slice(0, 4);
      }
    } else if (type === "tel") {
      // Phone number logic (+91 XXXXX XXXXX format)
      value = value.replace(/[^0-9]/g, "");
      if (!value.startsWith("91")) {
        value = "91" + value;
      }
      if (value.length > 12) {
        value = value.slice(0, 12);
      }
      const formattedNumber =
        "+91 " +
        value.substring(2, 7) +
        (value.length > 7 ? " " + value.substring(7) : "");
      setInputValue(formattedNumber);
      return;
    } else if (label === "Age") {
      // Age logic: allow only numbers, restrict to 3 digits, and set max to 120
      value = value.replace(/[^0-9]/g, ""); // Allow only numeric characters

      // Restrict to a maximum of 3 digits
      if (value.length > 3) {
        value = value.slice(0, 3);
      }

      // If a 3-digit number is invalid, set it to 120
      const numericValue = parseInt(value, 10);
      if (numericValue > 120) {
        value = "120";
      }

      // Prevent entering more than 3 digits once valid input is reached
      if (value.length === 3 && numericValue <= 120) {
        e.target.maxLength = 3;
      }
    }

    setInputValue(value);
  };

  return (
    <>
      <label className="text-sm font-medium text-[#4F4F4F]">
        {label}{" "}
        {required && <span className="font-bold text-[#4F4F4F]">*</span>}
      </label>
      <div className="flex flex-col mt-1.5 w-full">
        {type === "select" ? (
          <select
            className="overflow-hidden flex-1 shrink gap-1 self-stretch px-3.5 py-2.5 w-full text-sm bg-white rounded-xl border border-solid border-neutral-800 text-neutral-800 max-md:max-w-full"
            name={name}
            value={value}
            onChange={onChange}
          >
            {options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        ) : (
          <input
            className="overflow-hidden flex-1 shrink gap-1 self-stretch px-3.5 py-2.5 w-full text-sm bg-white rounded-xl border border-solid border-neutral-800 text-neutral-800 max-md:max-w-full"
            type={type}
            placeholder={placeholder}
            value={value}
            onInput={handleInput}
            maxLength={
              label === "Wing"
                ? 1
                : label === "Unit"
                  ? 4
                  : type === "tel"
                    ? 15
                    : undefined
            }
            min={type === "number" ? min : undefined}
            max={type === "number" ? max : undefined}
            name={name}
            onChange={onChange}
          />
        )}
      </div>
    </>
  );
}

function MemberForm({
  memberCount,
  setMemberCount,
  members,
  setMembers,
  handleChange,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
    document.getElementById("memberSelect").focus();
  };

  return (
    <div className="flex flex-col justify-center items-center p-5 mt-5 w-full max-h-[605px] bg-white rounded-2xl">
      <div className="flex flex-col justify-center items-center w-full">
        <div className="flex flex-col justify-center items-center w-full">
          <div className="flex flex-col justify-center items-center w-full">
            <div className="flex items-center justify-between w-full">
              <h2 className="self-stretch my-auto text-base font-extrabold tracking-wide text-neutral-400">
                <span className="font-semibold leading-6 text-neutral-800">
                  Member Counting :{" "}
                </span>
                <span className="font-semibold leading-6 text-neutral-400">
                  (Other Members)
                </span>
              </h2>
              <div className="flex gap-2.5 items-center self-stretch my-auto text-neutral-800">
                <label
                  htmlFor="memberSelect"
                  className="self-stretch my-auto text-base font-semibold"
                >
                  Select Member
                </label>
                <div
                  className="relative flex gap-2.5 justify-center items-center self-stretch w-[70px] h-[42px] my-auto text-sm whitespace-nowrap bg-white rounded-xl border border-solid border-neutral-300 min-h-[42px] overflow-hidden"
                  onClick={handleToggle}
                >
                  <select
                    id="memberSelect"
                    className="absolute inset-0 opacity-1 cursor-pointer px-3 bg-transparent z-10"
                    value={memberCount}
                    onChange={(e) => setMemberCount(Number(e.target.value))}
                    style={{
                      appearance: "none",
                    }}
                  >
                    {[...Array(20)].map((_, i) => (
                      <option key={i} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>
                  <img
                    loading="lazy"
                    src={images?.dropdownIcon}
                    alt=""
                    className={`object-contain shrink-0 self-stretch my-auto w-6 aspect-square absolute top-2 right-2 transition-transform duration-300 ${isOpen ? "" : "rotate-180"
                      }`}
                    onClick={() =>
                      document.getElementById("memberSelect").focus()
                    }
                  />
                </div>
              </div>
            </div>
            <div className="mt-2.5 w-full min-h-0 border border-solid bg-zinc-100 border-zinc-100" />
          </div>
        </div>
        <div className="flex mt-2.5 w-full flex-col">
          {members?.map((member, index) => (
            <div
              key={index}
              className="flex gap-4 justify-center items-center mt-1 w-full"
            >
              <div className="flex flex-col grow-[2] self-stretch my-auto min-h-[96px] min-w-[305px]">
                <InputField
                  type="text"
                  label="Full Name"
                  placeholder="Enter Full Name"
                  required
                  name="fullName"
                  value={member?.fullName || ""}
                  onChange={(e) => handleChange(e, index, "member")}
                />
              </div>
              <div className="flex flex-col grow self-stretch my-auto min-h-[96px] min-w-[305px]">
                <InputField
                  type="tel"
                  label="Phone Number"
                  placeholder="+91"
                  required
                  name="phoneNumber"
                  value={member?.phoneNumber || ""}
                  onChange={(e) => handleChange(e, index, "member")}
                />
              </div>
              <div className="flex flex-col grow self-stretch my-auto min-h-[96px] min-w-[305px]">
                <InputField
                  type="email"
                  label="Email"
                  placeholder="Enter Email Address"
                  required
                  name="email"
                  value={member?.email || ""}
                  onChange={(e) => handleChange(e, index, "member")}
                />
              </div>
              <div className="flex flex-col grow self-stretch my-auto min-h-[96px] min-w-[175px]">
                <InputField
                  type="number"
                  label="Age"
                  placeholder="Enter Age"
                  min={1}
                  max={120}
                  required
                  name="age"
                  value={member?.age || ""}
                  onChange={(e) => handleChange(e, index, "member")}
                />
              </div>
              <div className="flex flex-col grow self-stretch my-auto min-h-[96px] min-w-[175px]">
                <InputField
                  type="select"
                  label="Gender"
                  options={["Male", "Female", "Other"]}
                  required
                  name="gender"
                  value={member?.gender || ""}
                  onChange={(e) => handleChange(e, index, "member")}
                />
              </div>
              <div className="flex flex-col grow self-stretch my-auto min-h-[96px] min-w-[175px]">
                <InputField
                  type="text"
                  label="Relation"
                  placeholder="Enter Relation"
                  required
                  name="relation"
                  value={member?.relation || ""}
                  onChange={(e) => handleChange(e, index, "member")}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function VehicleForm({
  vehicleCount,
  setVehicleCount,
  vehicles,
  setVehicles,
  handleChange,
  handleCancel,
  isEditing,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle1 = (e) => {
    e.stopPropagation(); // Prevent the event from bubbling up
    setIsOpen((prev) => !prev);
  };

  const handleSelectChange = (e) => {
    setVehicleCount(Number(e.target.value));
    setIsOpen(false); // Close dropdown when selection changes
  };

  // Close the dropdown if clicked outside
  const handleClickOutside = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (isOpen) {
      window.addEventListener("click", handleClickOutside);
    } else {
      window.removeEventListener("click", handleClickOutside);
    }
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="flex flex-col justify-center items-center p-5 mt-5 w-full bg-white rounded-2xl">
      <div className="flex flex-col w-full">
        <div className="flex flex-col w-full text-neutral-800">
          <div className="flex flex-col w-full">
            <div className="flex items-center justify-between gap-10 w-full">
              <h2 className="self-stretch my-auto text-base font-semibold">
                Vehicle Counting :{" "}
              </h2>
              <div className="flex gap-2.5 items-center self-stretch my-auto">
                <label
                  htmlFor="vehicleSelect"
                  className="self-stretch my-auto text-base font-semibold"
                >
                  Select Vehicle
                </label>
                <div className="relative flex gap-2.5 justify-center items-center self-stretch w-[70px] h-[42px] my-auto text-sm whitespace-nowrap bg-white rounded-xl border border-solid border-neutral-300 min-h-[42px] overflow-hidden">
                  <div onClick={handleToggle1}>
                    <select
                      id="vehicleSelect"
                      className="absolute inset-0 opacity-100 cursor-pointer px-3 bg-transparent z-10"
                      value={vehicleCount}
                      onChange={handleSelectChange}
                      style={{
                        appearance: "none",
                      }}
                    >
                      {[...Array(4)].map((_, i) => (
                        <option key={i} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                  <img
                    loading="lazy"
                    src={images?.dropdownIcon}
                    alt=""
                    className={`object-contain shrink-0 self-stretch my-auto w-6 aspect-square absolute top-2 right-2 transition-transform duration-300 ${isOpen ? "" : "rotate-180"
                      }`}
                    onClick={handleToggle1}
                  />
                </div>
              </div>
            </div>
            <div className="mt-2.5 w-full min-h-0 border border-solid bg-zinc-100 border-zinc-100" />
          </div>
        </div>
        <div className="flex flex-col mt-2.5 w-full">
          <div className="grid grid-cols-2 gap-4 w-full">
            {vehicles.map((vehicle, index) => (
              <div
                key={index}
                className="flex gap-[22px] px-5 pt-5 rounded-xl border border-solid border-neutral-300"
              >
                <div className="flex flex-col grow self-stretch my-auto min-h-[96px] min-w-[226px]">
                  <InputField
                    label="Vehicle Type"
                    required
                    type="select"
                    options={["Two Wheelers", "Four Wheelers", "Other"]}
                    name="vehicleType"
                    value={vehicle?.vehicleType || ""}
                    onChange={(e) => handleChange(e, index, "vehicle")}
                  />
                </div>
                <div className="flex flex-col grow self-stretch my-auto min-h-[96px] min-w-[226px]">
                  <InputField
                    label="Vehicle Name"
                    placeholder="Enter Name"
                    name="vehicleName"
                    value={vehicle?.vehicleName || ""}
                    onChange={(e) => handleChange(e, index, "vehicle")}
                  />
                </div>
                <div className="flex flex-col grow self-stretch my-auto min-h-[96px] min-w-[226px]">
                  <InputField
                    label="Vehicle Number"
                    placeholder="Enter Number"
                    name="vehicleNumber"
                    value={vehicle?.vehicleNumber || ""}
                    onChange={(e) => handleChange(e, index, "vehicle")}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-end gap-2.5 mt-5 text-lg font-semibold text-center text-neutral-800">
          <CustomButton
            text="Cancel"
            onClick={handleCancel}
            width=""
            bgColor="white"
          />
          <CustomButton
            text={isEditing ? "Update" : "Create"}
            type="submit"
            width=""
          />
        </div>
      </div>
    </div>
  );
}

export default AddOwnerTenantForm;
