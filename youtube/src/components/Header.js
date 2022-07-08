import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './Header.css';
import img from '../images/ytb-icn.svg';

function Header(){
    const navigate = useNavigate();
    const [searchstring, setSearchString] = useState('');

    function handleChange(event){
        setSearchString(event.target.value);
    }

    function handleSubmit(event){
        if(event.key === 'Enter'){
            navigate(`/search?input=${searchstring}`);
        }
    }

    return (
        <div className='header'>
            <Link to="/" className="logo">
                <img src={img} id="logo-img"/>
            </Link>
            <input placeholder="Search" 
                   className="search-input" 
                   onChange={handleChange} 
                   value={searchstring} 
                   onKeyDown={handleSubmit}/>
        </div>
    );
}

export default Header;