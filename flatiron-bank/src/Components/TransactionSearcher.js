import React, { useState, useContext } from "react";
import { bankContext } from "../App";

function TransactionSearcher({transactions, setTransactions}){
    //hooks
    const [search, setSearcher] = useState("");
    let {preventDef} = useContext(bankContext);

    //input handlers
    function searchHandler(e){
        setSearcher(e.target.value.toString());
    };

    //filter
    function descriptionSearcher(){
        let newTranscts = transactions.filter((transaction) => {
            return (
                transaction.description.toString() === search
            )
        })
        setTransactions(newTranscts);
    }

    return(
        <>
            {/* Search Transaction By Category*/}
            <div className="search-div">
                <form className="transaction-searcher" onSubmit={preventDef}>
                    <input type="text" placeholder="Search your Recent Transactions.." id="searcher" onChange={searchHandler}></input>             
                    <input type="Submit" value={"Search"} id="submit" onClick={descriptionSearcher}></input>
                </form>
            </div>
        </>
    );
};

export default TransactionSearcher;