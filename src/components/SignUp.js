
import React, { useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import config from './../config';
import 'react-toastify/dist/ReactToastify.css';


import { Button, Checkbox, Label, TextInput } from 'flowbite-react';
import { Link, useNavigate } from 'react-router-dom';

function SignUp() {
    const [account, setAccount] = React.useState({email:"", username: "", password: "" });
  
    const [error, setError] = React.useState({email :"", username: "", password: "" });
    const history = useNavigate();


    useEffect(()=>{
        checkAuth()
      })
    
      const checkAuth = ()=>{
        let token = localStorage.getItem('uToken');
        if(token)
        {
           history('/');  
        }
      }
  
    const handleChange = (property, event) => {
      const accountCopy = {
        ...account
      };
  
      accountCopy[property] = event.target.value;
      setAccount(accountCopy);
  
    //   validate(property);
    };
  
    // const validate = (property) => {
    //    validateUsername();
    //    validateEmail();
    //    validatePassword();
    // };
  
    const validateUsername = () => {
    
      if (account.username.includes(" ")) {
        toast.error("Username cannot contain a space");
        return false;
      } else if (account.username.length < 9) {
        toast.error("Username should be greater than 8 chars");
        return false;
      } 

      return true;
  
    };

    const validateEmail =()=>{
        const errorCopy = { ...error };
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

      if (!emailPattern.test(account.email)) {
        toast.error('Invalid email address')
        errorCopy.email = "Invalid email address";
        return false
      }
  
      return true;

    }
    const formSubmit = async (e) => {
      e.preventDefault();
     
      if (validatePassword() && validateEmail && validateUsername)
      {
        let response =  await axios.post(`${config.apiUrl}api/sign_up`,account)

        if(response.data.status)
        {
            localStorage.setItem('uToken',response.data.data.token);
            localStorage.setItem('username',response.data.data.username);

            history('/');
            toast.success('SignUp successfully')
        }
        else
        {
            toast.error(response.data.message || 'something went wrong !')
        }


      }
       //history.push("/dashboard");
    };
  
    const validatePassword = () => {
      const errorCopy = { ...error };
      if (account.password.length < 9) {
        toast.error("Password should be greater than 8 chars");
        return false;
      }

      return true;
    };

  return (
    <form className="flex max-w-md mx-auto flex-col gap-4" style={{marginTop:'10vw'}} onSubmit={formSubmit} >
        <ToastContainer/>
        <h1 style={{fontWeight: 'bold', fontSize: '5vw', margin: '2vw'}}>SignUp</h1>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="email2" value="Your email" />
        </div>
        <TextInput id="email2" type="email" placeholder="name@flowbite.com" onChange={(event)=> handleChange('email',event)} required shadow />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="username" value="Your username" />
        </div>
        <TextInput id="username" type="text" required shadow onChange={(e)=> handleChange('username',e)} />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="=password" value="Your password" />
        </div>
        <TextInput id="password" type="password" required shadow onChange={(e)=> handleChange('password',e)} />
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="agree" />
        <Label htmlFor="agree" className="flex">
          I agree with the&nbsp;
          {/* <link href="#" className="text-cyan-600 hover:underline dark:text-cyan-500"> */}
            terms and conditions
          {/* </link> */}
        </Label>
      </div>
      <Button type="submit">Register new account</Button>
      <h2>Already have account ? <a href='http://localhost:3000/login'> Login </a> </h2>
    </form>
  );
}

export default SignUp;