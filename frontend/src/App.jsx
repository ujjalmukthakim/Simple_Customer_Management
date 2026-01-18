import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form';


import './App.css'
import api from './api/api'



function App() {

const[customers,setCustomer]=useState([])
const{

  register,handleSubmit,formState:{errors}

}=useForm()



// this is for getting data from api  
useEffect(()=>{
     api.get().then((res)=>{
      // i set data 
      setCustomer(res.data);
      console.log(res.data)
     }
     )
    
},[])


  // const [count, setCount] = useState(0)

  return (

    <div>
      {/* this the the taking input sector  */}

      <form action="" onClick={handleSubmit()}>
        <label htmlFor='name'>Name</label>
        <input type='text'  name='name' {...register('name',{required : true})}/>
        {errors.name && <span>This field is required</span>}


        <button type='submit'>Add Customer</button>
      </form>







    {/* this is the table sector */}
    <div>
      {customers.map((customer)=>(
        <p key={customer.id}>{customer.name} - {customer.email} - {customer.address}-{customer.Phone}</p>
      ))}
    </div>
    </div>

  )
}

export default App
