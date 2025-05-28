import React from 'react';
import images from "../../../Images";
import { formatDate, formatTime } from '../../../utils';

function GuardTableRow({ name, email, phoneNumber, shift, shiftDate, shiftTime, gender, photo, onEdit, onDelete, onView }) {
    const shiftClass = shift === "Night" ? "text-white bg-neutral-600" : "text-amber-500 bg-zinc-100";
    const genderClass = gender === "Male" ? "text-indigo-500 bg-sky-500 bg-opacity-10" : "text-pink-400 bg-pink-400 bg-opacity-10";
    
    // Default image URL
    const defaultImage = 'path/to/default/image.png';

    return (
        <div className="flex flex-col justify-center py-px w-full max-md:max-w-full overflow-y-hidden overflow-x-auto">
            <div className="flex items-center px-5 py-3.5 w-full bg-white border-b border-solid border-b-slate-50 max-md:max-w-full">
                <div className="md:w-[200px] grow w-full flex gap-2.5 items-center  text-base font-medium text-neutral-600">
                    <img 
                        loading="lazy" 
                        src={photo || defaultImage} 
                        className="object-contain shrink-0  my-auto w-10 aspect-square min-h-[40px]" 
                        alt="" 
                    />
                    <div className=" my-auto w-[152px]">{name}</div>
                </div>

                <div className="md:w-[380px] shrink-0 w-full text-center text-base font-medium text-neutral-600">
                    {email}
                </div>

                <div className="md:w-[175px] shrink-0 w-full text-center text-base font-medium text-neutral-600">
                    {phoneNumber}
                </div>

                <div className="md:w-[165px] shrink-0 w-full flex items-center justify-center">
                    <div className={`w-[113px] flex gap-1.5 justify-center items-center px-3 py-1.5 my-auto text-sm font-medium whitespace-nowrap rounded-[58px] ${shiftClass}`}>
                        {shift === "Day"
                            ? <img src='../../../../static/img/day-shift.svg' alt=""></img>
                            : <img src='../../../../static/img/night-shift.svg' alt=""></img>
                        }
                        <div className=" my-auto">{shift}</div>
                    </div>
                </div>

                <div className="md:w-[150px] shrink-0 w-full text-center my-auto text-base font-medium text-neutral-600">{formatDate(shiftDate)}</div>

                <div className="md:w-[130px] shrink-0 w-full flex items-center justify-center">
                    <div className="w-[113px] gap-2.5 px-4 py-1.5 my-auto text-base font-medium bg-slate-50 rounded-[80px] text-neutral-600 text-center">
                        {formatTime(shiftTime)}
                    </div>
                </div>

                <div className={'md:w-[140px] shrink-0 w-full flex items-center justify-center'}>
                    <div className={`w-[113px] flex gap-1.5 justify-center items-center px-3 py-1.5 my-auto text-sm font-medium whitespace-nowrap rounded-[58px] ${genderClass}`}>
                        {gender === "Male"
                            ? <img src='../../../../static/img/male-icon.svg' alt=""></img>
                            : <img src='../../../../static/img/female-icon.svg' alt=""></img>
                        }
                        <div className=" my-auto">{gender}</div>
                    </div>
                </div>

                <div className="md:w-[160px] shrink-0 w-full flex gap-2.5 items-start justify-center">
                    <button onClick={onEdit} className="flex gap-2.5 justify-center items-center px-2 w-10 h-10 rounded-xl bg-slate-50" aria-label="Edit">
                        <img loading="lazy" src={images.edit} className="object-contain my-auto w-6 aspect-square" alt="" />
                    </button>
                    <button onClick={onView} className="flex gap-2.5 justify-center items-center px-2 w-10 h-10 rounded-xl bg-slate-50" aria-label="View">
                        <img src={images.showIcon} alt="" />
                    </button>
                    <button onClick={onDelete} className="flex gap-2.5 justify-center items-center px-2 w-10 h-10 rounded-xl bg-slate-50" aria-label="Delete">
                        <img loading="lazy" src={images.deleteIcon} className="object-contain my-auto w-6 aspect-square" alt="" />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default GuardTableRow;