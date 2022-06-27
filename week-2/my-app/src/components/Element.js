import React from 'react'
import './Element.css'
import bin from './images/trash.png'
function Element({id, type, name, date, amount, imgClick}){
    return (
        // <div style={{display:"flex", "flex-wrap":"wrap"}}>
        <div className="element">
            <div className="sub-element">{type}</div>
            <div className="sub-element">{name}</div>
            <div className="sub-element">{date}</div>
            <div className="sub-element">${amount}</div>
            <div className="sub-element" style={{width:"15px", height:"15px", margin:"2px"}}><img src={bin} onClick={(e)=>{imgClick(id);}} style={{width:"100%", height:"100%"}}/></div>
        </div>
    )
}
export {Element};