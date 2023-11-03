import "./Main.css"
import React, { useState, useEffect } from "react";
import Table from "./Components/Table";
import Form2 from "./Components/Form2";

function Main(){

    // states
    const [transactions, setTransactions] = useState([]);

    const [search, setSearcher] = useState("");

    const [userDate, setUserDate] = useState("");
    const [userDesc, setUserDesc] = useState("");
    const [userCat, setUserCat] = useState("");
    const [userAmount, setUserAmount] = useState(0);

    const userInfo = {
        date: userDate,
        description: userDesc,
        category: userCat,
        amount: userAmount
    };

    function preventDef(event){
        return(
            event.preventDefault()
        );
    };
    function dateHandler(e){
        setUserDate(e.target.value);
    };
    function descHandler(e){
        setUserDesc(e.target.value);
    };
    function categoryHandler(e){
        setUserCat(e.target.value);
    };
    function amountHandler(e){
        setUserAmount(e.target.value);
    };

    useEffect(() => {
        fetch("https://carshop-edbk.onrender.com/transactions")
        .then(res => res.json())
        .then(data => {
            setTransactions(data)
        });
    }, [])

    const handlePost = function(e){        
        fetch("https://carshop-edbk.onrender.com/transactions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
                },
            body: JSON.stringify(userInfo)
        })
        .then(res => res.json())
        .then(data => {  
                setTransactions([...transactions, data])
        });        
    };

    // event handlers
    function preventDef(event){
        return(
            event.preventDefault()
        );
    };

    //input handlers
    function searchHandler(e){
        setSearcher(e.target.value.toString());
    };

    function descriptionSearcher(){
        let newTranscts = transactions.filter((transaction) => {
            return (
                transaction.description.toString() === search
            )
        })
        setTransactions(newTranscts);
    }

    // row generator
    const rows = transactions.map((transaction) => {
        return(
            <tr key={transaction.id}>
                <td>{transaction.date}</td>
                <td>{transaction.description}</td>
                <td>{transaction.category}</td>
                <td>{transaction.amount}</td>
            </tr>
        )
    })

    // JSX
    return(
    <div className="main">

        {/* Search Transaction By Category*/}
        <div className="search-div">
            <form className="transaction-searcher" onSubmit={preventDef}>
                <input type="text" placeholder="Search your Recent Transactions.." id="searcher" onChange={searchHandler}></input>             
                <input type="Submit" value={"Search"} id="submit" onClick={descriptionSearcher}></input>
            </form>
        </div>

        <br></br>

        {/* Add Transaction */}
        <Form2 
        handlePost={handlePost}
        dateHandler={dateHandler}
        preventDef={preventDef}
        descHandler={descHandler}
        categoryHandler={categoryHandler}
        amountHandler={amountHandler}
        >
        </Form2>

        <br></br>

        {/* table result */}
        <Table rows={rows}></Table>
    </div>
    );
};
export default Main;

// userInfo