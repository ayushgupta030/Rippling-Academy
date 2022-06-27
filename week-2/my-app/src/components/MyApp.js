import React, {useEffect, useState} from 'react'
import {Element} from './Element'
import {PieChart} from './PieChart'
import './MyApp.css'
import './Element.css'
import { color } from 'highcharts'
function MyApp(){
    const [data,setData] = useState(<div display='none'>hi</div>);
    const [final,setFinal] = useState([]);
    const [s,setS] = useState({type:"Type", name:"", date:"", amount:""});
    const [budget,setBudget] = useState(0);
    const [currbudget,setCurrBudget] = useState("");
    const [totAmt,setTotAmt] = useState(0);
    const [pie,setPie] = useState([{}]);
    function addExpense(e){
       let temp = [...final];
       temp.push(s);
       setFinal(temp);
       window.localStorage.setItem("ayush",JSON.stringify(temp));
       setS({type:"Type", name:"", date:"", amount:""});
       //console.log(JSON.parse(window.localStorage.getItem("ayush")));
       //e.preventDefault();
    }
    function updateBudget(){
        setBudget(currbudget);
        window.localStorage.setItem("budget",currbudget);
        setCurrBudget("");
    }
    function imgClick(key){
        let temp = [...final];
        temp.splice(key,1);
        window.localStorage.setItem("ayush",JSON.stringify(temp));
        setFinal(temp);
    }
    useEffect(()=>{
        if(window.localStorage.getItem("ayush")!=null)
        {
            setFinal(JSON.parse(window.localStorage.getItem("ayush")));
        }
        if(window.localStorage.getItem("budget")!=null)
        {
            setBudget(window.localStorage.getItem("budget"));
        }
    },[])
    useEffect(()=>{
        const temp = final;
        let curr=0;
        let pie_temp=[];
        const temp1 = temp.map((val, index)=>{
            curr=parseInt(curr)+parseInt(val.amount);
            return <Element key={index} id={index} {...val} imgClick = {imgClick}/>;
        })
        temp.map((val,index)=>{
            const pie_curr={
                name: val.name,
                y: val.amount/curr
            }
            pie_temp.push(pie_curr);
        })
        setPie(pie_temp);
        setTotAmt(curr);
        setData(temp1);
    },[final])
    return (
            <div>
                <center>
                <h1>Expense Tracker</h1>
                <h6>Add Expense Below</h6>
            <div className='add-expense'>
            <select value={s.type} onChange={(e)=>setS({...s,type:e.target.value})} style={{"backgroundColor":"blue", color:"white"}}>
                <option value="Type" style={{display:"none"}}>Type</option>
                <option value="Card">Card</option>
                <option value="Cheque">Check</option>
            </select>
            <div>
            <label className='labl'>
                Name:
                <input className="content" type="text" value={s.name} onChange={(e)=>setS({...s,name:e.target.value})} placeholder="Name"></input>
            </label>
            </div>
            </div>
            <div className='add-expense'>
            <input className="date" type="date" value={s.date} onChange={(e)=>setS({...s,date:e.target.value})}/>
            <div>
            <label className='labl'>
                <span className='txtlabl'>Amount:</span>
                <input className="content" type="text" value={s.amount} onChange={(e)=>setS({...s,amount:e.target.value})} placeholder="Amount"></input>
            </label>
            </div>
            </div>
            <input type="button" value="Add Expense" onClick={addExpense} className="btn"/>
            <div className='new-budget'>
                <div className='budget'>
                <div style={{"font-weight":"bold"}}>
                <div>Remaining Balance: ${parseInt(budget)-parseInt(totAmt)}</div>
                <div>Current Budget: ${budget}</div>
                </div>
                <div className='upd-budget'>
                    <input type="text" value={currbudget} onChange={(e)=>setCurrBudget(e.target.value)} placeholder="Your current budget" style={{width:"50%", height:"50%"}}></input>
                    <input type="button" value="Update Budget" onClick={updateBudget} style={{width:"50%", height:"50%"}}></input>
                </div>
                </div>
                <div className="data">
                    <div className='element head'>
                        <div className="sub-element">Type</div>
                        <div className="sub-element">Name</div>
                        <div className="sub-element">Date</div>
                        <div className="sub-element">Amount</div>
                        <div className="sub-element">Delete</div>
                    </div>
                    {data}
                </div>
            </div>
            <PieChart val={pie}/>
            </center>
            </div>
    )
}
export {MyApp};