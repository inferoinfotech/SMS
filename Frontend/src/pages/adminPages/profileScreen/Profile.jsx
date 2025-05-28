import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import "./style.css";
import images from "../../../Images";
import CustomButton from "../../../components/customButton/CustomButton";
import {
  getAdminProfileDetails,
  updateAdminProfile,
  getUserProfileDetails,
  getSecurityGuardProfile,
} from "../../../api/profileApi";
import { getSocietyById, getAllSociety } from "../../../api/societyApi";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    society: "",
    country: "",
    state: "",
    city: "",
  });
  const [profileDetails, setProfileDetails] = useState({
    profileImage: images.noUser,
  });
  const [errors, setErrors] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);
  const [originalFormData, setOriginalFormData] = useState({});
  const [societies, setSocieties] = useState([]);
  const [userRole, setUserRole] = useState("");
  useEffect(() => {
    const fetchProfileDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const p_token = Cookies.get("token");
        console.log("Profile Screen token", p_token);
  
        const role = localStorage.getItem("role"); // Assuming role is stored in localStorage
        setUserRole(role);
  
        let data;
        if (role === "admin") {
          data = await getAdminProfileDetails(token);
        } else if (role === "resident") {
          const residentId = localStorage.getItem("residentId"); // Assuming residentId is stored in localStorage
          data = await getUserProfileDetails(residentId);
        } else if (role === "security") {
          const securityId = localStorage.getItem("securityId"); // Assuming securityId is stored in localStorage
          data = await getSecurityGuardProfile(securityId);
        }
  
        // Extract data based on the role
        const {
          firstName = "NA",
          lastName = "NA",
          phoneNumber = "NA",
          email = "NA",
          society = "NA",
          country = "India", // Default value
          state = "Gujarat", // Default value
          city = "Surat", // Default value
          profileImage = images.noUser,
          name = "NA", // For security guard
          phone = "NA", // For security guard
          gender = "NA", // For security guard
          shift = "NA", // For security guard
          shiftDate = "NA", // For security guard
          shiftTime = "NA", // For security guard
          aadharCard = "NA", // For security guard
          photo = images.noUser, // For security guard
        } = data?.data || data; // Adjust based on the API response structure
  
        // Split name into firstName and lastName for security guard
        let securityFirstName = "NA";
        let securityLastName = "NA";
        if (role === "security" && name) {
          const nameParts = name.split(" ");
          securityFirstName = nameParts[0] || "NA";
          securityLastName = nameParts.slice(1).join(" ") || "NA";
        }
  
        // Set form data based on the role
        const initialFormData =
          role === "security"
            ? {
                firstName: securityFirstName, // Split name for security guard
                lastName: securityLastName, // Split name for security guard
                phone: phoneNumber, // Use phoneNumber for security guard
                email,
                society: society?.name || "NA", // Use society name for security guard
                country, // Default value
                state, // Default value
                city, // Default value
              }
            : {
                firstName,
                lastName,
                phone: phoneNumber,
                email,
                society,
                country,
                state,
                city,
              };
  
        setFormData(initialFormData);
        setOriginalFormData({
          ...initialFormData,
          profileImage: role === "security" ? photo : profileImage, // Use photo for security guard
        });
        setProfileDetails({
          profileImage: role === "security" ? photo : profileImage, // Use photo for security guard
        });
  
        // Fetch society name by ID (if not already fetched)
        if (society && role !== "security") {
          const societyDetails = await getSocietyById(society);
          setFormData((prev) => ({ ...prev, society: societyDetails.name }));
        }
  
        // Fetch all societies
        const allSocieties = await getAllSociety();
        setSocieties(allSocieties);
      } catch (error) {
        console.error("Error fetching profile details:", error);
      }
    };
  
    fetchProfileDetails();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setErrors({
      ...errors,
      [name]: value ? "" : errors[name],
    });

    if (name === "society") {
      // Find the selected society by its name and set the society ID
      const selectedSociety = societies.find(
        (society) => society.name === value
      );
      setFormData({
        ...formData,
        [name]: selectedSociety ? selectedSociety._id : value,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setProfileDetails({
      ...profileDetails,
      profileImage: file ? URL.createObjectURL(file) : images.noUser,
    });
  };

  const handleEdit = () => {
    if (userRole === "admin") {
      setIsEditing(true);
    }
  };

  const handleUpdate = async () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = "First Name is required";
    if (!formData.lastName) newErrors.lastName = "Last Name is required";
    if (!formData.phone) newErrors.phone = "Phone Number is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.society) newErrors.society = "Select Society is required";
    if (!formData.country) newErrors.country = "Country is required";
    if (!formData.state) newErrors.state = "State is required";
    if (!formData.city) newErrors.city = "City is required";
  
    if (Object.keys(newErrors).length === 0) {
      try {
        const token = localStorage.getItem("token");
        const u_token = Cookies.get("token");
        console.log("Profile Update Screen token", u_token);
  
        const formDataToSend = new FormData();
        formDataToSend.append("firstName", formData.firstName);
        formDataToSend.append("lastName", formData.lastName);
        formDataToSend.append("phoneNumber", formData.phone); // Change "phone" to "phoneNumber"
        formDataToSend.append("email", formData.email);
        formDataToSend.append("society", formData.society);
        formDataToSend.append("country", formData.country);
        formDataToSend.append("state", formData.state);
        formDataToSend.append("city", formData.city);
        if (selectedFile) {
          formDataToSend.append("profileImage", selectedFile);
        }
  
        // Log FormData content
        for (let [key, value] of formDataToSend.entries()) {
          console.log(key, value);
        }
  
        let response;
        if (userRole === "admin") {
          response = await updateAdminProfile(token, formDataToSend);
        } else if (userRole === "resident") {
          const residentId = localStorage.getItem("residentId");
          response = await updateUserProfile(residentId, formDataToSend);
        }
  
        console.log("Profile updated successfully:", response);
        setIsEditing(false);
        setOriginalFormData(formData);
      } catch (error) {
        console.error("Error updating profile:", error);
        console.error("Error response:", error.response); // Log the error response for more details
      }
    } else {
      setErrors(newErrors);
    }
  };

  const handleCancel = () => {
    setFormData(originalFormData);
    setProfileDetails({
      profileImage: originalFormData.profileImage || images.noUser,
    });
    setSelectedFile(null);
    setIsEditing(false);
  };

  console.log("Getting Profile Image", profileDetails.profileImage);

  return (
    <div className="overlap-88">
      <div className="frame-922">
        <div className="group-691">
          <img className="pngwing" alt="Pngwing" src={images.pngWing1} />
          <img className="pngwing-2" alt="Pngwing" src={images.pngWing1} />
          <img className="pngwing-3" alt="Pngwing" src={images.pngWing1} />
        </div>
      </div>
  
      <div className="group-692">
        <div className="frame-923">
          {!isEditing ? (
            <div className="text-wrapper-524">Profile</div>
          ) : (
            <div className="text-wrapper-524" style={{ margin: "10px 0" }}>
              Edit Profile
            </div>
          )}
          {userRole === "admin" && !isEditing && (
            <CustomButton
              text="Edit Profile"
              onClick={handleEdit}
              width="161px"
              imageType="Edit"
            />
          )}
        </div>
  
        <div className="group-693">
          <div className="group-694">
            <div className="group-695">
              <div className="group-696">
                <div className="text-181">
                  {formData.firstName} {formData.lastName}
                </div>
                <div className="overlap-group-53">
                  <div className="w-full h-full flex justify-center items-center absolute rounded-full border overflow-hidden">
                    <img
                      className="w-full h-full"
                      alt="Profile"
                      src={profileDetails.profileImage}
                    />
                  </div>
                  {!isEditing ? (
                    <div className=""></div>
                  ) : (
                    <div className="vuesax-bold-edit-wrapper cursor-pointer">
                      <input
                        type="file"
                        accept="image/*"
                        name="profileImage"
                        onChange={handleFileChange}
                        style={{ display: "none" }}
                        id="profile-image-upload"
                      />
                      <label htmlFor="profile-image-upload">
                        <img
                          className="cursor-pointer"
                          src={images.editProfile}
                          alt="Edit Profile"
                        />
                      </label>
                    </div>
                  )}
                </div>
              </div>
            </div>
  
            <div className="group-697">
              {/* First Name */}
              <div className="input-field-79">
                <label className="label-33" htmlFor="first-name">
                  <span className="text-wrapper-525">First Name</span>
                  <span className="text-wrapper-526">*</span>
                </label>
                <input
                  type="text"
                  id="first-name"
                  name="firstName"
                  className="input-label"
                  value={formData.firstName}
                  onChange={handleChange}
                  disabled={!isEditing || userRole !== "admin"}
                />
                {errors.firstName && (
                  <div className="error">{errors.firstName}</div>
                )}
              </div>
  
              {/* Last Name */}
              <div className="input-field-79">
                <label className="label-33" htmlFor="last-name">
                  <span className="text-wrapper-525">Last Name</span>
                  <span className="text-wrapper-526">*</span>
                </label>
                <input
                  type="text"
                  id="last-name"
                  name="lastName"
                  className="input-label"
                  value={formData.lastName}
                  onChange={handleChange}
                  disabled={!isEditing || userRole !== "admin"}
                />
                {errors.lastName && (
                  <div className="error">{errors.lastName}</div>
                )}
              </div>
  
              {/* Phone Number */}
              <div className="input-field-79">
                <label className="label-33" htmlFor="phone-number">
                  <span className="text-wrapper-525">Phone Number</span>
                  <span className="text-wrapper-526">*</span>
                </label>
                <input
                  type="tel"
                  id="phone-number"
                  name="phone"
                  className="input-label"
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={!isEditing || userRole !== "admin"}
                />
                {errors.phone && <div className="error">{errors.phone}</div>}
              </div>
  
              {/* Email Address */}
              <div className="input-field-79">
                <label className="label-33" htmlFor="email-address">
                  <span className="text-wrapper-525">Email Address</span>
                  <span className="text-wrapper-526">*</span>
                </label>
                <input
                  type="email"
                  id="email-address"
                  name="email"
                  className="input-label"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={!isEditing || userRole !== "admin"}
                />
                {errors.email && <div className="error">{errors.email}</div>}
              </div>
  
              {/* Select Society */}
              <div className="input-field-79">
                <label className="label-33" htmlFor="select-society">
                  <span className="text-wrapper-525">Select Society</span>
                  <span className="text-wrapper-526">*</span>
                </label>
                {isEditing ? (
                  <select
                    id="select-society"
                    name="society"
                    className="input-label"
                    value={formData.society}
                    onChange={handleChange}
                  >
                    <option value="">Select Society</option>
                    {societies.map((society) => (
                      <option key={society._id} value={society._id}>
                        {society.name}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="text"
                    id="select-society"
                    name="society"
                    className="input-label"
                    value={formData.society}
                    onChange={handleChange}
                    disabled={!isEditing || userRole !== "admin"}
                  />
                )}
                {errors.society && (
                  <div className="error">{errors.society}</div>
                )}
              </div>
  
              {/* Country */}
              <div className="input-field-79">
                <label className="label-33" htmlFor="country">
                  <span className="text-wrapper-525">Country</span>
                  <span className="text-wrapper-526">*</span>
                </label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  className="input-label"
                  value={formData.country}
                  onChange={handleChange}
                  disabled
                />
                {errors.country && (
                  <div className="error">{errors.country}</div>
                )}
              </div>
  
              {/* State */}
              <div className="input-field-79">
                <label className="label-33" htmlFor="state">
                  <span className="text-wrapper-525">State</span>
                  <span className="text-wrapper-526">*</span>
                </label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  className="input-label"
                  value={formData.state}
                  onChange={handleChange}
                  disabled
                />
                {errors.state && <div className="error">{errors.state}</div>}
              </div>
  
              {/* City */}
              <div className="input-field-79">
                <label className="label-33" htmlFor="city">
                  <span className="text-wrapper-525">City</span>
                  <span className="text-wrapper-526">*</span>
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  className="input-label"
                  value={formData.city}
                  onChange={handleChange}
                  disabled
                />
                {errors.city && <div className="error">{errors.city}</div>}
              </div>
  
              {/* Update Profile Button at the bottom */}
              {isEditing && userRole === "admin" && (
                <div className="w-full flex sm:justify-end justify-start">
                  <div className="flex sm:flex-row flex-col gap-3">
                    <div className="update-button">
                      <CustomButton
                        text="Update Profile"
                        onClick={handleUpdate}
                        width="161px"
                        imageType=""
                      />
                    </div>
                    <div className="cancel-button">
                      <CustomButton
                        text="Cancel"
                        onClick={handleCancel}
                        width="161px"
                        imageType=""
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;