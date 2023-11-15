import "./Main.css"
import React, { useState, useEffect, useContext } from "react";
import TransactionSearcher from "./Components/TransactionSearcher";
import Table from "./Components/Table";
import Form2 from "./Components/Form2";
import { bankContext } from "./App";

function Main(){

    let {preventDef} = useContext(bankContext);

    // states
    const [transactions, setTransactions] = useState([]);

    const [form2Data, setForm2Data] = useState({});
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

    function form2DataHandler(e){
        let name = e.target.name;
        let value = e.target.value;

        setForm2Data({...form2Data, [name]:value})
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

    //GET data from API, used in the table
    useEffect(() => {
        fetch("https://carshop-edbk.onrender.com/transactions")
        .then(res => res.json())
        .then(data => {
            setTransactions(data)
        });
    }, [])

    //POST a new transaction
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

    //DELETE

    // row generator
    const rows = transactions.map((transaction) => {
        return(
            <tr key={transaction.id} id={transaction.id}>
                <td>{transaction.date}</td>
                <td>{transaction.description}</td>
                <td>{transaction.category}</td>
                <td>{transaction.amount}</td>
                <td 
                    className="delete" 
                    onClick={() => {
                        let idToDel = transaction.id;
                        fetch(`https://carshop-edbk.onrender.com/transactions/${idToDel}`, {
                            method: "DELETE"
                        }).then(res => res.json())
                        .then(() => {
                            let newTrans = transactions.filter((transaction) => {
                                return(
                                    transaction.id !== idToDel
                                )
                            })
                            setTransactions(newTrans);
                        }
                        )
                    }} 
                >
                    DEL
                </td>
            </tr>
        )
    })

    //state reseter
    function reseter(){
        fetch("https://carshop-edbk.onrender.com/transactions")
        .then(res => res.json())
        .then(data => {
            setTransactions(data)
        });
    }

    // JSX
    return(
    <div className="main">

        {/* Search Transaction By Category*/}
        <TransactionSearcher transactions={transactions} setTransactions={setTransactions}></TransactionSearcher>

        <br></br>

        {/* Reset Button */}
        <div className="reset">
            <button id="tableReset" onClick={reseter}>RESET TABLE</button>
        </div>

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