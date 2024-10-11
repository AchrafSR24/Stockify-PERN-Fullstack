import React, { useEffect, useState } from 'react'
import './login.css'
import { IoMailOutline } from "react-icons/io5";
import { IoKeyOutline } from "react-icons/io5";
import logo from '../../assets/package-box.png'
import shape from '../../assets/shape.webp'
import data from '../../assets/data1.jpg'
import { useNavigate } from 'react-router-dom';
import { FaRegUser } from "react-icons/fa6";
import { Toaster, toast } from "react-hot-toast";

const Login = () => {
  const handleSuccessNotify = (message) => {
    toast.success(message, {
      style: {
        marginLeft: "1270px",
         padding: "8px 14px",
        color: "#279b37",
        background: "#a6ffb2",
        fontWeight: 700,
      },
      iconTheme: {
        primary: "#279b37",
        secondary: "#FFFAEE",
      },
    });
  };
    const handleErrorNotify = (message) => {
      toast.error(message, {
          style: {
              marginLeft: "1270px",
              padding: "8px 14px",
              color: "#ff4d4d",
              background: "#ffb2b2",
              fontWeight: 700,
          },
          iconTheme: {
              primary: "#ff4d4d",
              secondary: "#FFFAEE",
          },
      });
  
  }; 
  const navigate = useNavigate()
  const [username,setUsername]=useState("");
  const [email,setEmail]=useState("");
  const [mdp,setMdp]=useState("");
  const [loginState, setLoginState]=useState("login");
  const [loading , isLoading] = useState(false);
  
  const signupHandler = async (e) => {
    try {
      e.preventDefault();
      isLoading(true);
  
      const newUser = {
        username,
        email,
        mdp,
      };
  
      const response = await fetch('http://localhost:5000/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }else{
      handleSuccessNotify("Nouveau utilisateur ajouté avec succés!")
      }
      
      // Traiter la réponse de succès ici
    } catch (error) {
      console.error(error);
    } finally {
      isLoading(false);
    }
  };


const loginHandler = async (e) => {
  e.preventDefault()
  try {

    const response = await fetch('http://localhost:5000/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, mdp }),
    });
  
    if (!response.ok) {
      handleErrorNotify("Email ou mot de passe incorrect !")
      const errorData = await response.json();
      throw new Error(errorData.message);
    }
  
    const test = await response.json();
    
    localStorage.setItem("token", test.token)
    localStorage.setItem("id", test.existedUser.rows[0].id_user)
    window.location.reload()
    navigate("/")
    
    } catch (err) {
    console.error(err.message);
    
  }
}
  return (
    <div className='login'>
    <Toaster position="top-right" reverseOrder={false} />
      {loginState==="login" ?(
      <div className="left_side">
        <img src={shape} alt="" className='shape shape1' />
        <img src={shape} alt="" className='shape shape2' />
        <div className="login_logo">
          <img src={logo} alt="" />
        <h3>Stockify</h3>
        </div>
        <div className="input_holder">
          <div className="input_item">
            <h4>email</h4>
            <div className="main_input">
              <IoMailOutline />
              <input type="text" placeholder='contact@softt365.com' value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
          </div>
          <div className="input_item">
            <h4>password</h4>
            <div className="main_input">
              <IoKeyOutline />
              <input type="password" placeholder='password' value={mdp} onChange={(e) => setMdp(e.target.value)} />
            </div>
          </div>
          <div className="forgetPw">
            <p>forget password?</p>
          </div>
          <button className='signBtn' onClick={loginHandler}>sign in</button>
          <div className="create_acc">
            <p>new in stockify? <span onClick={()=>setLoginState("register")}>create account</span></p>
          </div>
        </div>
      </div>

      )
      :(
         
      <div className="left_side">
        <img src={shape} alt="" className='shape shape1' />
        <img src={shape} alt="" className='shape shape2' />
        <div className="login_logo">
          <img src={logo} alt="" />
        <h3>Stockify</h3>
        </div>
        <div className="input_holder">
        <div className="input_item">
            <h4>username</h4>
            <div className="main_input">
              <FaRegUser />
              <input type="text" placeholder='username' value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
          </div>
          <div className="input_item">
            <h4>email</h4>
            <div className="main_input">
              <IoMailOutline />
              <input type="text" placeholder='contact@softt365.com' value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
          </div>
          <div className="input_item">
            <h4>password</h4>
            <div className="main_input">
              <IoKeyOutline />
              <input type="password" placeholder='password' value={mdp} onChange={(e) => setMdp(e.target.value)} />
            </div>
          </div>
          <button className='signBtn' onClick={signupHandler}>Register</button>
          <div className="create_acc">
            <p onClick={() => setLoginState("login")}>Go back</p>
          </div>

        </div>
      </div>
        )}
      <div className="right_side">
        <img src={data} alt="" />
      </div>
    </div>
  )
}

export default Login
