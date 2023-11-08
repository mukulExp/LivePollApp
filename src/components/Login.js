
import React, { useEffect } from 'react';
import { Button, Checkbox, Label, TextInput } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';
import { toast,ToastContainer } from 'react-toastify';
import axios from 'axios';


function Login() {

    const [account, setAccount] = React.useState({ email: "", password: "" });
  
    const [error, setError] = React.useState({ email: "", password: "" });
    const history = useNavigate();
    const apiUrl = 'http://localhost:3001/';


    
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
  
    const handleChange = (property, data) => {
      const accountCopy = {
        ...account
      };
  
      accountCopy[property] = data;
      setAccount(accountCopy);
  
    //   validate(property);
    };
  
    const validate = (property) => {
      property === "email" ? validateEmail() : validatePassword();
    };
  
    const validateEmail =()=>{
        const errorCopy = { ...error };
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

      if (!emailPattern.test(account.email)) {
        toast.error( "Invalid email address");
        return false;
      }
  
     return true;

    }
    const handleSumit = async(e) => {
        e.preventDefault();
      if(validateEmail )
      {
        let response =  await axios.post(`${apiUrl}api/sign_in`,account)

        if(response.data.status)
        {
            localStorage.setItem('uToken',response.data.data.token);
            localStorage.setItem('username',response.data.data.username);

            history('/');
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
    <form  className="flex max-w-md mx-auto flex-col gap-4" style={{marginTop:'10vw'}} onSubmit={handleSumit}>
           <h1 style={{fontWeight: 'bold', fontSize: '5vw', margin: '2vw'}}>Login</h1>
           <ToastContainer/>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="Email" value="Your Email" />
        </div>
        <TextInput id="email1" type="email" onChange={(e)=> handleChange('email',e.target.value)} placeholder="Email" required />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="password1" value="Your password" />
        </div>
        <TextInput id="password1" onChange={(e)=> handleChange('password',e.target.value)} type="password" required />
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="remember" />
        <Label htmlFor="remember">Remember me</Label>
      </div>
      <Button type="submit">Submit</Button>
      <h2>Don't have a account ? <a href='http://localhost:3000/signup'> SignUp </a> </h2>

    </form>
  );
}

export default Login;
