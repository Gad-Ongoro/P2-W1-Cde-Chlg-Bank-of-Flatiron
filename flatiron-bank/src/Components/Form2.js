import React from "react";

function Form2({handlePost, preventDef, dateHandler, descHandler, categoryHandler, amountHandler}){ 
    return(
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
    )
}

export default Form2;