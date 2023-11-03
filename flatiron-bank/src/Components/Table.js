import React from "react";

function Table({rows}){
    return(
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
    )
}

export default Table;