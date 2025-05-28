import React, { useState, useEffect } from "react";
import "./style.css";
import '../../../static/css/remixicon.css';
import CreateSocietyModal from "../createSociety/CreateSocietyModal";
import { getAllSociety } from "../../api/societyApi";

const Dropdown = ({ onChange }) => {
  const [selectedSociety, setSelectedSociety] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [societies, setSocieties] = useState([]);

  const fetchSocietiesData = async () => {
    try {
      const societiesData = await getAllSociety();
      setSocieties(societiesData);
    } catch (error) {
      console.error("Failed to fetch societies", error);
    }
  };

  useEffect(() => {
    fetchSocietiesData();
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSelect = (society) => {
    setSelectedSociety(society.name); // Display the society name in the UI
    onChange(society._id); // Pass the society ID to the parent component
    setIsDropdownOpen(false);
  };

  const addNewSociety = (newSociety) => {
    setSocieties([...societies, newSociety]);
    setSelectedSociety(newSociety.name);
    setIsModalOpen(false);
    fetchSocietiesData(); // Re-fetch societies to ensure the list is up-to-date
  };

  return (
    <div className="dropdown-container">
      <div className="custom-dropdown" onClick={toggleDropdown}>
        {selectedSociety || "Select Society"}
        <span className="dropdown-arrow"><i className="ri-arrow-down-s-line"></i></span>
      </div>

      {isDropdownOpen && (
        <div className="dropdown-menu">
          <div className="dropdown-list">
            {societies.map((society, index) => (
              <div
                key={index}
                onClick={() => handleSelect(society)}
              >
                {society.name}
              </div>
            ))}
          </div>
          <div className="create-button">
            <button
              className="dropdown-button"
              onClick={() => {
                setIsModalOpen(true);
                setIsDropdownOpen(false);
              }}
            >
              Create Society
            </button>
          </div>
        </div>
      )}

      {isModalOpen && (
        <CreateSocietyModal
          onClose={() => setIsModalOpen(false)}
          onAddSociety={addNewSociety}
        />
      )}
    </div>
  );
};

export default Dropdown;