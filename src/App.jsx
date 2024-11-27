import { useEffect, useState } from 'react'
import './App.css'
import IncomeModal from './components/IncomeModal'
import ExpenseModal from './components/ExpenseModal'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const notify = () => toast.success("Entery Deleted !",{
    position: "top-center",
    autoClose: 500,
    pauseOnHover: true,
  });

  const [yourincome, setYourincome] = useState(() => {
    const incomestore = JSON.parse(localStorage.getItem("yourincome"))
    return (incomestore) ? incomestore : 0
  });
  const [yourbalance, setYourbalance] = useState(0);
  const [totalexpense, setTotalexpense] = useState(0)
  const [yourexpenses, setYourexpenses] = useState(()=>{
    const updatedexp = JSON.parse(localStorage.getItem("yourexpenses"))
    return (updatedexp) ? updatedexp : []
  });
  const [ModalisOpen, setModalisOpen] = useState(false);
  const [ExpneseModalIsOpen, setExpneseModalIsOpen] = useState(false)



  // controle income modal
  const ModalOpen = () => {
    setModalisOpen(true);
  };
  const ModalClose = () => {
    setModalisOpen(false);
  };

  // controle expense modal

  const ExpenseModalOpen = () => {
    setExpneseModalIsOpen(true);
  };
  const ExpensModalClose = () => {
    setExpneseModalIsOpen(false);
  };



  const addincome = (RS) => {
    setYourincome(yourincome + +RS)
    ModalClose()
  }

  const exp = (expobj) => {
    const newexparr = [...yourexpenses, expobj]
    setYourexpenses(newexparr)
    ExpensModalClose();
  }

  // delete function
  const deletexp = (index) => {
    
      const updatedexp = yourexpenses.filter((elem, i) => i != index)
      setYourexpenses(updatedexp)
      notify()
    
  }








  useEffect(() => {
    let total = 0
    yourexpenses.forEach((exp) => {
      total += +exp.expense
    });
    setYourbalance(yourincome - total)
    setTotalexpense(total)

    // store in local storage
    localStorage.setItem("yourexpenses", JSON.stringify(yourexpenses))
    localStorage.setItem("yourincome", JSON.stringify(yourincome))
  }, [yourexpenses, yourincome])

  return (
    <>
      <div className='container'>
        <div className='bg-dark text-white p-3'>
          <h1 className='text-center mb-5'>Expense Tracker</h1>
          <div className='row'>
            <div className='col-md-4 text-center'>
              <h3>Total Income</h3>
              <h5 className='text-success'>${yourincome}</h5>
              <button className='btn btn-success' onClick={ModalOpen}>Add Income</button>
              <IncomeModal addincome={addincome} ModalisOpen={ModalisOpen} ModalClose={ModalClose} />
            </div>

            <div className='col-md-4 text-center'>
              <h3>Total Expenses</h3>
              <h5 className='text-warning' >${totalexpense}</h5>
            </div>


            <div className='col-md-4 text-center'>
              <h3>Remaining Balance</h3>
              <h5 className='text-danger'>${yourbalance}</h5>
              <button className='btn btn-danger' onClick={ExpenseModalOpen} >Add Expense</button>
              <ExpenseModal close={ExpensModalClose} isopen={ExpneseModalIsOpen} addexpense={exp} />

            </div>
          </div>
        </div>
        <div className='p-3 bg-white'>
          <table className='table'>
            <thead>
              <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Category</th>
                <th>Amount</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {
                yourexpenses.map((exp, i) => {
                  return (
                    <tr key={i}>
                      <td>{exp.date}</td>
                      <td>{exp.detail}</td>
                      <td>{exp.category}</td>
                      <td>${exp.expense}</td>
                      <td><button onClick={() => { deletexp(i) }} className='btn btn-sm btn-danger'>Delete</button></td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
      </div>
      
      <ToastContainer />


    </>
  )
}
export default App