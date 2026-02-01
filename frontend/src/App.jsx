import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';


import './App.css'
import api from './api/api'



function App() {

const[customers,setCustomer]=useState([])
const{

  register,handleSubmit,formState:{errors},reset

}=useForm()

const getInfo=()=>{
  api.get().then((res)=>{
      // i set data 
      setCustomer(res.data);
      console.log(res.data)
     }
     )
}

// this is for getting data from api  
useEffect(()=>{
     getInfo();
    
},[])


const Onsubmit=async(data)=>{
  await api.post("",data);
  reset();
  getInfo();

}

  // const [count, setCount] = useState(0)

  return (

    <div>
      {/* this is the taking input sector  */}

      <form action="" onSubmit={handleSubmit(Onsubmit)}>
        <label htmlFor='name'>Name</label>
        <input type='text'  name='name' {...register('name',{required : true})}/>
        {errors.name && <span>This field is required</span>}

        

        <label htmlFor='email'>Email</label>
        <input type='email' name='email' {...register('email',{required:true})}/>
        {errors.email &&<span>Email is required</span>}


        <label htmlFor='address'>Address</label>
        <input type='text' name='address' {...register('address',{required:true})}/>
        {errors.email &&<span>Address  is required</span>}

        <label htmlFor='Phone'>Phone Number</label>
        <input type='text' name='Phone' {...register('Phone',{required:true})}/>
        {errors.email &&<span>Phone Number is required</span>}



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
