import React, { useState } from 'react'
function ExpenseModal({ close, isopen, addexpense }) {
    const [yourexpense, setYourepense] = useState({})

    if (isopen == false) {

        return null;
    }
    const handleInputUpdate = (e) => {
        const newexp = { ...yourexpense, [e.target.name]: e.target.value };
        setYourepense(newexp)
    }
    const handleSubmit = () => {
        // if (alert("Please enter detailes")) {

        // }

        const { expense, date, category, detail } = yourexpense;

        if (!expense || !date || !category || category === "-" || !detail.trim()) {
            alert("Please fill out all fields.");
            return;
        }

        addexpense(yourexpense);
        setYourepense({});
        close()

    }

    const addonenter = (e) => {
        if (e.key == "Enter") {
            handleSubmit()
        }
    }

    return (
        <div className="mdl-overlay">
            <div className="mdl-container" onClick={(e) => e.stopPropagation()}>
                <div className="mdl-header">
                    <button onClick={close} className="close-button">X</button>
                </div>
                <div className="mdl-body">
                    <h5>Add Expense</h5>
                    <div className='form-group'>
                        <form onSubmit={(e) => e.preventDefault()} onKeyUp={addonenter}>
                            <input type='number' onChange={handleInputUpdate} value={yourexpense.expense || ""} className='form-control mb-3' name='expense' placeholder='write expense amount' />
                            <input type='date' onChange={handleInputUpdate} className='form-control mb-3' name='date' placeholder='select date' />
                            <select className='form-select mb-3' name='category' onChange={handleInputUpdate}>
                                <option value="-">Select Category</option>
                                <option value='grocery'>Grocery</option>
                                <option value='personal'>Personal</option>
                                <option value='rent'>Rent</option>
                                <option value='medical'>Medical</option>
                                <option value='fee'>Fee</option>
                            </select>
                            <textarea onChange={handleInputUpdate} className='form-control mb-3' placeholder='description' name='detail'></textarea>
                            <button className='btn btn-sm w-100 btn-warning py-2' onClick={handleSubmit}>Add Expense</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ExpenseModal