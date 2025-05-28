import React from "react";
import SearchIcon from '../../../static/img/search-icon.svg'
import "./style.css";

export const SearchBox = () => {
  return (
    <div className={`searchBox`}>
      <div className="div-2">
        <img className="vuesax-bold-search" alt="Search" src={SearchIcon} />
        <input type="text" className={`text-wrapper-7`} placeholder="Search Here" />
      </div>
    </div>
  );
};
