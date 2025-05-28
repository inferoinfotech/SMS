import React from "react";
import "./style.css";
import backIcon from "../../../static/img/back.svg";
import profileImage from "../../../static/img/profile.png";
import eyeImage from "../../../static/img/eye.svg";

const ViewTenant = ({ onCancel, residentDetails, images }) => {
  if (!residentDetails) return null;
  console.log("images", images);

  const { wing, unit, age, gender, ownerDetails, members } = residentDetails;
  console.log("ownerDetails", ownerDetails);
  // Create documents array from images, excluding profile photo
  const documentsList = [
    { name: 'Aadhar Card (Front)', file: images?.frontAadharCard },
    { name: 'Aadhar Card (Back)', file: images?.backAadharCard },
    { name: 'Address Proof', file: images?.addressProof },
    { name: 'Rent Agreement', file: images?.rentAgreement }
  ].filter(doc => doc.file); // Only include documents that exist

  return (
    <div className="element-view-tenant fixed inset-0 bg-black bg-opacity-50 flex justify-end items-center z-50">
      <div className="overlay w-full md:w-1/2 lg:w-[500px]" >
        <div className="pop-up h-[1064px] overflow-y-scroll">
          <div className="flex flex-col">
            <div className="flex flex-col w-full max-md:px-5 max-md:max-w-full">
              <div className="flex z-10 flex-col mb-0 max-md:mb-2.5 max-md:max-w-full">
                <div className="flex flex-col w-full max-w-[450px] max-md:max-w-full">
                  <div className="flex gap-8 items-center self-start">
                    <div
                      className="flex gap-2.5 justify-center items-center self-stretch px-2 my-auto w-10 h-10 border border-solid border-zinc-100 min-h-[40px] rounded-[30px] cursor-pointer"
                      onClick={onCancel}
                    >
                      <div className="flex overflow-hidden gap-2.5 items-start self-stretch px-1.5 py-0.5 my-auto">
                        <img
                          loading="lazy"
                          src={backIcon}
                          className="object-contain w-3 aspect-[0.6] fill-neutral-600"
                          alt="Back"
                        />
                      </div>
                    </div>
                    <div className="self-stretch my-auto text-xl font-semibold text-neutral-800">
                      View Tenant Details
                    </div>
                  </div>
                  <div className="mt-2.5 w-full border border-solid bg-zinc-100 border-zinc-100 min-h-[1px]" />
                </div>
                <div className="flex flex-col items-center mt-6 max-w-full w-[450px]">
                  <div className="flex flex-col items-center text-center">
                    <img
                      loading="lazy"
                      src={`${import.meta.env.VITE_BASE_URL}/uploads/${images.profilePhoto}` || profileImage}
                      className="object-contain aspect-square min-h-[90px] w-[90px] rounded-full"
                      alt={residentDetails.firstName}
                    />
                    <div className="flex flex-col items-center mt-3">
                      <div className="text-2xl font-semibold text-neutral-800">
                        {residentDetails.firstName + " " + residentDetails.lastName}
                      </div>
                      <div className="text-base text-neutral-600">
                        {residentDetails.email}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col mt-6 w-full">
                    <div className="flex flex-col justify-center p-4 w-full text-base whitespace-nowrap bg-white rounded-2xl shadow-lg">
                      <div className="flex flex-col w-full">
                        <div className="flex flex-col justify-between w-full min-h-[24px]">
                          <div className="flex gap-10 justify-between items-center w-full">
                            <div className="self-stretch my-auto font-semibold text-neutral-800">
                              Wing
                            </div>
                            <div className="self-stretch my-auto font-medium text-right text-neutral-600">
                              {wing}
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col mt-2 w-full max-w-[420px]">
                          <div className="w-full border border-solid opacity-30 bg-neutral-300 border-neutral-300 min-h-[1px]" />
                          <div className="flex gap-10 justify-between items-center mt-2 w-full">
                            <div className="self-stretch my-auto font-semibold text-neutral-800">
                              Unit
                            </div>
                            <div className="self-stretch my-auto font-medium text-right text-neutral-600">
                              {unit}
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col mt-2 w-full max-w-[420px]">
                          <div className="w-full border border-solid opacity-30 bg-neutral-300 border-neutral-300 min-h-[1px]" />
                          <div className="flex gap-10 justify-between items-center mt-2 w-full">
                            <div className="self-stretch my-auto font-semibold text-neutral-800">
                              Age
                            </div>
                            <div className="self-stretch my-auto font-medium text-right text-neutral-600">
                              {age}
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col mt-2 w-full max-w-[420px]">
                          <div className="w-full border border-solid opacity-30 bg-neutral-300 border-neutral-300 min-h-[1px]" />
                          <div className="flex gap-10 justify-between items-center mt-2 w-full">
                            <div className="self-stretch my-auto font-semibold text-neutral-800">
                              Gender
                            </div>
                            <div className="self-stretch my-auto font-medium text-right text-neutral-600">
                              {gender}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col justify-center p-4 mt-4 bg-white rounded-2xl shadow-lg max-md:max-w-full">
                      <div className="flex flex-col">
                        <div className="text-base font-semibold text-neutral-800 mb-4">
                          Uploaded Documents
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          {documentsList.map((doc, index) => (
                            <div 
                              key={index} 
                              className="flex flex-col p-3 bg-white rounded-xl border border-solid border-zinc-100 hover:shadow-md transition-shadow cursor-pointer"
                              onClick={() => window.open(`${import.meta.env.VITE_BASE_URL}/uploads/${doc.file}`, '_blank')}
                            >
                              <div className="flex flex-col items-center">
                                <div className="flex justify-center items-center w-full h-32 bg-slate-50 rounded-lg mb-2 overflow-hidden">
                                  <img
                                    src={`${import.meta.env.VITE_BASE_URL}/uploads/${doc.file}`}
                                    alt={doc.name}
                                    className="object-cover w-full h-full"
                                  />
                                </div>
                                <div className="text-sm font-medium text-neutral-800 text-center">
                                  {doc.name}
                                </div>
                                <div className="flex items-center mt-2 text-xs text-neutral-500">
                                  <img
                                    src={eyeImage}
                                    alt="View"
                                    className="w-4 h-4 mr-1"
                                  />
                                  View
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col mt-4 w-full rounded-none">
                      <div className="flex z-10 flex-col justify-center p-4 w-full text-base font-semibold text-white bg-[#5678E9] rounded-2xl rounded-b-none max-md:max-w-full">
                        <div className="gap-10 self-stretch">Owner Details</div>
                      </div>
                      <div className="flex flex-col justify-center px-4 py-4 text-sm rounded-t-none rounded-3xl border border-[#5678E9] border-solid bg-white bg-opacity-30 max-md:max-w-full">
                        <div className="flex flex-col justify-center p-2.5 bg-white rounded-2xl shadow-2xl">
                          <div className="flex flex-col w-full max-w-[400px]">
                            <div className="flex gap-10 justify-between items-center w-full">
                              <div className="self-stretch my-auto font-semibold text-neutral-800">
                                Name
                              </div>
                              <div className="self-stretch my-auto font-medium text-neutral-600">
                                {ownerDetails?.ownerFullName}
                              </div>
                            </div>
                            <div className="flex flex-col mt-2 w-full whitespace-nowrap">
                              <div className="w-full border border-solid bg-zinc-100 border-zinc-100 min-h-[1px]" />
                              <div className="flex gap-10 justify-between items-center mt-2 w-full">
                                <div className="self-stretch my-auto font-semibold text-neutral-800">
                                  Phone
                                </div>
                                <div className="self-stretch my-auto font-medium text-neutral-600">
                                  {ownerDetails?.ownerPhoneNumber}
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-col mt-2 w-full">
                              <div className="w-full border border-solid bg-zinc-100 border-zinc-100 min-h-[1px]" />
                              <div className="flex gap-10 justify-between items-center mt-2 w-full">
                                <div className="self-stretch my-auto font-semibold text-neutral-800">
                                  Address
                                </div>
                                <div className="self-stretch my-auto font-medium text-neutral-600">
                                  {ownerDetails?.ownerAddress}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col pb-4 mt-4 w-full rounded-none">
                      <div className="flex z-10 flex-col justify-center p-4 w-full text-base font-semibold text-white bg-[#5678E9] rounded-2xl rounded-b-none max-md:max-w-full">
                        <div className="flex gap-10 justify-between items-center">
                          <div className="self-stretch my-auto">
                            Member Counting
                          </div>
                          <div className="self-stretch my-auto">
                            {members ? members.length.toString().padStart(2, "0") : '00'}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col justify-center px-4 py-4 text-sm rounded-t-none rounded-3xl border border-[#5678E9] border-solid bg-white bg-opacity-30 max-md:max-w-full">
                        <div className="flex z-10 flex-col mx-4 mt-0 text-sm max-md:mx-2.5">
                          {members && members.length > 0 ? (
                            members.map((member, index) => (
                              <div
                                key={index}
                                className="flex flex-col justify-center p-2.5 max-w-full bg-white rounded-2xl shadow-2xl w-[420px] mt-4 first:mt-0"
                              >
                                <div className="flex flex-col w-full max-w-[400px]">
                                  <div className="flex gap-10 justify-between items-center w-full">
                                    <div className="self-stretch my-auto font-semibold text-neutral-800">
                                      First Name
                                    </div>
                                    <div className="self-stretch my-auto font-medium text-neutral-600">
                                      {member?.fullName}
                                    </div>
                                  </div>
                                  <div className="flex flex-col mt-2 w-full">
                                    <div className="w-full border border-solid bg-zinc-100 border-zinc-100 min-h-[1px]" />
                                    <div className="flex gap-10 justify-between items-center mt-2 w-full">
                                      <div className="self-stretch my-auto font-semibold text-neutral-800">
                                        Phone No
                                      </div>
                                      <div className="self-stretch my-auto font-medium text-neutral-600">
                                        {member?.phoneNumber}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="flex flex-col mt-2 w-full whitespace-nowrap">
                                    <div className="w-full min-h-0 border border-solid bg-zinc-100 border-zinc-100" />
                                    <div className="flex gap-10 justify-between items-center mt-2 w-full">
                                      <div className="self-stretch my-auto font-semibold text-neutral-800">
                                        Age
                                      </div>
                                      <div className="self-stretch my-auto font-medium text-neutral-600">
                                        {member?.age}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="flex flex-col mt-2 w-full whitespace-nowrap">
                                    <div className="w-full min-h-0 border border-solid bg-zinc-100 border-zinc-100" />
                                    <div className="flex gap-10 justify-between items-center mt-2 w-full">
                                      <div className="self-stretch my-auto font-semibold text-neutral-800">
                                        Gender
                                      </div>
                                      <div className="self-stretch my-auto font-medium text-neutral-600">
                                        {member?.gender}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="flex flex-col mt-2 w-full whitespace-nowrap">
                                    <div className="w-full min-h-0 border border-solid bg-zinc-100 border-zinc-100" />
                                    <div className="flex gap-10 justify-between items-center mt-2 w-full">
                                      <div className="self-stretch my-auto font-semibold text-neutral-800">
                                        Relation
                                      </div>
                                      <div className="self-stretch my-auto font-medium text-neutral-600">
                                        {member?.relation}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))
                          ) : (
                            <div className="text-neutral-600">No members available</div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewTenant;