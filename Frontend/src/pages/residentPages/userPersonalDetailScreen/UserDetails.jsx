// src/components/UserDetails.jsx
import React from "react";

function UserDetails({ user }) {
  if (!user) {
    return <div>Loading user details...</div>;
  }

  const {
    firstName,
    lastName,
    phoneNumber,
    email,
    age,
    gender,
    wing,
    unit,
    relation,
    images,
  } = user;

  return (
    <section className="flex flex-col justify-center p-5 bg-white rounded-md max-md:max-w-full">
      <div className="flex flex-wrap gap-10 items-center justify-between max-md:max-w-full">
        <div className="flex flex-wrap gap-10 items-center self-stretch my-auto w-full">
          <div className="flex flex-col my-auto w-[170px]">
            <div className="flex flex-col max-w-full w-[170px]">
              <img
                loading="lazy"
                src={images.profilePhoto}
                alt="User profile"
                className="object-contain w-full rounded-full aspect-square"
              />
            </div>
          </div>
          <div className="flex flex-wrap grow gap-10 items-start text-lg">
            <div className="flex flex-col">
              <div className="flex flex-col">
                <h2 className="font-medium text-neutral-800">Full Name</h2>
                <p className="text-neutral-400">{`${firstName} ${lastName}`}</p>
              </div>
              <div className="flex flex-col self-start mt-4 whitespace-nowrap">
                <h2 className="font-medium text-neutral-800">Wing</h2>
                <p className="text-neutral-400">{wing}</p>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex flex-col">
                <h2 className="font-medium text-neutral-800">Phone Number</h2>
                <p className="text-neutral-400">{phoneNumber}</p>
              </div>
              <div className="flex flex-col self-start mt-4 whitespace-nowrap">
                <h2 className="font-medium text-neutral-800">Age</h2>
                <p className="text-neutral-400">{age}</p>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex flex-col">
                <h2 className="font-medium text-neutral-800">Email Address</h2>
                <p className="text-neutral-400">{email}</p>
              </div>
              <div className="flex flex-col self-start mt-4 whitespace-nowrap">
                <h2 className="font-medium text-neutral-800">Unit</h2>
                <p className="text-neutral-400">{unit}</p>
              </div>
            </div>
            <div className="flex flex-col whitespace-nowrap">
              <div className="flex flex-col self-start">
                <h2 className="font-medium text-neutral-800">Gender</h2>
                <p className="text-neutral-400">{gender}</p>
              </div>
              <div className="flex flex-col mt-4">
                <h2 className="font-medium text-neutral-800">Relation</h2>
                <p className="text-neutral-400">{relation}</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col self-stretch my-auto min-w-[240px] w-[386px]">
            <div className="flex flex-col justify-center p-2.5 w-full bg-white rounded-xl border border-solid border-neutral-300 max-w-[386px]">
              <div className="flex gap-1 items-center">
                <div className="flex gap-2.5 items-center self-stretch p-2 my-auto w-10 h-10 rounded-xl bg-slate-50">
                  <img
                    loading="lazy"
                    src={images.frontAadharCard}
                    alt=""
                    className="object-contain w-6 aspect-square"
                  />
                </div>
                <div className="flex flex-col self-stretch my-auto text-sm min-w-[240px]">
                  <p className="self-stretch text-neutral-800">
                    Syncfusion Essential Adharcard Front Side.JPG
                  </p>
                  <p className="self-start text-center text-neutral-400">
                    3.5 MB
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center items-start p-2.5 mt-4 w-full bg-white rounded-xl border border-solid border-neutral-300 max-w-[386px]">
              <div className="flex gap-1 items-center">
                <div className="flex gap-2.5 items-center self-stretch p-2 my-auto w-10 h-10 rounded-xl bg-slate-50">
                  <img
                    loading="lazy"
                    src={images.addressProof}
                    alt=""
                    className="object-contain w-6 aspect-square"
                  />
                </div>
                <div className="flex flex-col self-stretch my-auto text-sm">
                  <p className="self-stretch text-neutral-800">
                    Address Proof Front Side.PDF
                  </p>
                  <p className="self-start text-center text-neutral-400">
                    3.5 MB
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default UserDetails;
