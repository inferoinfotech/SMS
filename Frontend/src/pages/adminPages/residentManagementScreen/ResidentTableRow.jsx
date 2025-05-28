import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import imagesIcons from "../../../Images";
import ViewOwner from "../../../components/viewOwner/ViewOwner";
import ViewTenant from "../../../components/viewTenant/ViewTenant";
import { getResidentById } from '../../../api/residentApi';

function ResidentTableRow({
  _id,
  profileImage,
  firstName,
  lastName,
  wing,
  unit,
  isOccupied,
  owner,
  phoneNumber,
  members,
  vehicles,
  images,
}) {
  
  const status = isOccupied ? "Occupied" : "Vacate";
  const residentType = owner ? "Owner" : "Tenant";
  const isVacant = status === "Vacate";
  const navigate = useNavigate();

  const [showPopup, setShowPopup] = useState(false);
  const [residentDetails, setResidentDetails] = useState(null);
  const handleEdit = async () => {
    try {
      console.log(`Fetching resident details for ID: ${_id}`);
      const details = await getResidentById(_id);
      console.log('Fetched resident details:,,,,,,,,,,,,,,,,,,,,,,,,', details);
      navigate(`/addOwnerTenantForm?id=${_id}&activeTab=${residentType}`, { state: { residentData: details } });
    } catch (error) {
      console.error("Error fetching resident details:", error);
      alert("Failed to fetch resident details. Please try again later.");
    }
  };

  const handleOpenPopup = async () => {
    try {
      const details = await getResidentById(_id);
      console.log("details", details);
      setResidentDetails(details);
      setShowPopup(true);
    } catch (error) {
      console.error("Error fetching resident details:", error);
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="flex w-full py-[14px] px-5 bg-white border-b border-solid border-b-zinc-100 max-md:max-w-full">
      <div className="md:min-w-[236px] shrink-0 grow flex gap-2.5 items-center md:text-base text-[14px] font-medium text-neutral-600">
        <img
          loading="lazy"
          src={isVacant ? imagesIcons.noUser : profileImage}
          alt=""
          className="object-contain shrink-0 w-10 aspect-square min-h-[40px] md:block hidden"
        />
        <div className="">{firstName + " " + lastName}</div>
      </div>
      <div className="w-[182px] flex items-center pl-14 gap-1.5 whitespace-nowrap">
        <div className="flex flex-col text-sm font-bold text-center text-indigo-500">
          <div className="px-2 w-7 rounded-full bg-slate-50 fill-slate-50">
            {wing}
          </div>
        </div>
        <div className="md:text-base text-[14px] font-medium text-neutral-600">
          {unit}
        </div>
      </div>
      <Link
        to="/login"
        className="w-[182px] flex items-center justify-center"
      >
        <StatusBadge status={status} />
      </Link>
      <div className="w-[224px] flex items-center justify-center">
        <ResidentTypeBadge type={residentType} />
      </div>

      {phoneNumber ? (
        <div className="w-[209px] flex items-center justify-center md:text-base text-[14px] font-medium text-center text-neutral-600">
          {phoneNumber}
        </div>
      ) : (
        <div className="w-[209px] flex items-center justify-center">
          <div className="w-[170px] flex items-center justify-center font-medium text-center whitespace-nowrap bg-slate-50 min-h-[31px] rounded-[70px] text-neutral-600">
            --
          </div>
        </div>
      )}

      {members ? (
        <div className="w-[184px] flex items-center justify-center md:text-base text-[14px] font-medium text-center text-neutral-600">
          {members.length}
        </div>
      ) : (
        <div className="w-[184px] flex items-center justify-center">
          <div className="px-2.5 w-7 h-7 rounded-full bg-slate-50 fill-slate-50">
            -
          </div>
        </div>
      )}

      {vehicles ? (
        <div className="w-[184px] flex items-center justify-center md:text-base text-[14px] font-medium text-center text-neutral-600">
          {vehicles.length}
        </div>
      ) : (
        <div className="w-[184px] flex items-center justify-center">
          <div className="px-2.5 w-7 h-7 rounded-full bg-slate-50 fill-slate-50">
            -
          </div>
        </div>
      )}

      {isVacant ? (
        <div className="w-[170px] flex items-center justify-center font-medium text-center whitespace-nowrap bg-slate-50 min-h-[31px] rounded-[70px] text-neutral-600">
          --
        </div>
      ) : (
        <div className="w-[170px] flex items-center justify-center gap-2">
          <button
            className="flex gap-2.5 justify-center items-center px-2 w-10 h-10 rounded-xl bg-slate-50"
            onClick={handleEdit}
          >
            <img
              loading="lazy"
              src={imagesIcons.edit}
              alt=""
              className="object-contain w-6 aspect-square"
            />
          </button>
          <button className="flex gap-2.5 justify-center items-center px-2 w-10 h-10 rounded-xl bg-slate-50" onClick={handleOpenPopup}>
            <img
              loading="lazy"
              src={imagesIcons.showIcon}
              alt=""
              className="object-contain w-6 aspect-square"
            />
          </button>
        </div>)
      }
      {showPopup && residentDetails && (
        residentDetails.owner ? (
          <ViewOwner
            onCancel={handleClosePopup}
            residentDetails={residentDetails}
            images={images}
          />
        ) : (
          <ViewTenant
            onCancel={handleClosePopup}
            residentDetails={residentDetails}
            images={images}
          />
        )
      )}
    </div>
  );
}

function StatusBadge({ status }) {
  const statusClasses = {
    Occupied: "text-teal-500 bg-cyan-50",
    Vacate: "text-purple-600 bg-fuchsia-50",
  };

  return (
    <div
      className={`w-[131px] flex gap-2 justify-center items-center self-stretch px-3 py-1.5 text-sm font-medium text-center whitespace-nowrap rounded-[40px] ${statusClasses[status]}`}
    >
      <img
        loading="lazy"
        src={status === "Occupied" ? imagesIcons.occupied : imagesIcons.vacate}
        alt=""
        className="object-contain shrink-0 w-4 aspect-square"
      />
      <div className="self-stretch my-auto">{status}</div>
    </div>
  );
}

function ResidentTypeBadge({ type }) {
  if (type === "") return null;
  const typeClasses = {
    Tenant: "text-pink-500 bg-pink-50",
    Owner: "text-indigo-600 bg-indigo-50",
  };

  return (
    <div
      className={`flex gap-2 justify-center items-center self-stretch px-3 py-1.5 text-sm font-medium rounded-[40px] ${typeClasses[type]}`}
    >
      <img
        loading="lazy"
        src={type === "Tenant" ? imagesIcons.tenant : imagesIcons.owner}
        alt=""
        className="object-contain shrink-0 w-4 aspect-square"
      />
      <div className="self-stretch my-auto">{type}</div>
    </div>
  );
}

export default ResidentTableRow;