import React, { useState } from 'react'
function IncomeModal({ ModalClose, ModalisOpen, addincome }) {
    const [RS, setRS] = useState()
    if (ModalisOpen == false) {

        return null;
    }
    const addRS = () => {
        addincome(RS)
        setRS(0)
    }

    const addonenter = (e) => {
        if (e.key == "Enter") {
            addRS()
        }
    }
    return (
        <div className="mdl-overlay">
            <div className="mdl-container" onClick={(e) => e.stopPropagation()}>
                <div className="mdl-header">
                    <button onClick={ModalClose} className="close-button">X</button>
                </div>
                <div className="mdl-body">
                    <h5>Add Income</h5>
                    <div className='form-group d-flex gap-2'>
                        <input type="text" onKeyUp={addonenter} onChange={(e) => setRS(e.target.value)} className='form-control' placeholder="Enter Income" />
                        <button className="btn btn-primary btn-sm" onClick={addRS}>Add</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default IncomeModal