import "./Main.css"
import React, { useState, useEffect } from "react";

function Main(){

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

    function handleChange(){
        
    }

    useEffect(() => {
        fetch("https://carshop-edbk.onrender.com/transactions")
        .then(res => res.json())
        .then(data => {
            setTransactions(data)
        });
    })

    function handlePost(e){        
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
                setTransactions(data => data)  
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
    function searcherHandler(){
        let newTranscts = transactions.filter((transaction) => {
            return (
                transaction.category === search
            )
        })
        setTransactions(newTranscts);
    }
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
                <input type="Submit" value={"Search"} id="submit" onClick={searcherHandler}></input>
            </form>
        </div>

        <br></br>

        {/* Add Transaction */}
        <div className="form2">
            <form className="transactions-adder" onSubmit={preventDef}>
                <div className="form2-inputs">
                    <span>
                        <label htmlFor="date">Date: </label>
                        <input type="date" id="date" onChange={dateHandler}></input>
                    </span>

                    <input type="text" id="desc" placeholder="Description" onChange={descHandler}></input>

                    <input type="text" id="category" placeholder="Category" onChange={categoryHandler}></input>

                    <input type="number" id="amount" placeholder="Amount" onChange={amountHandler}></input>
                </div>

                <input type="submit" value={`Add Transaction`} id="form2-submit" onClick={handlePost}></input>
            </form>
        </div>

        <br></br>

        {/* table result */}
        <div className="result-table">
            <table>
                <tr>
                    <th>Date</th>
                    <th>Description</th>
                    <th>Category</th>
                    <th>Amount</th>
                </tr>

                {rows}

            </table>
        </div>
    </div>
    );
};
export default Main;