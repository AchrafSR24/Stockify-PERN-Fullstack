import React, { useContext, useEffect, useState } from 'react'
import userIcon from "../../assets/user.png";
import './parametres.css'
import { useNavigate } from 'react-router-dom';
import { userContext } from '../../Context/UserContext';
import { Toaster, toast } from "react-hot-toast";
const Parametres = () => {
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
  const {user, getUserById} = useContext(userContext)
  console.log(user)
  const [openMdp,setOpenMdp]=useState(false)
  const [userData,setUserData]=useState({})
  const [username,setUsername]=useState("")
  const [email,setEmail]=useState("")
  const [mdp,setMdp]=useState("")
  const [newMdp,setNewMdp]=useState("")
  const [confirmMdp,setConfirmMdp]=useState("")
  const navigate=useNavigate()
  const updatePwd = async () => {
    if(mdp && newMdp){
    if(newMdp === confirmMdp){
    try {
      const response = await fetch(`http://localhost:5000/users/updatePwd`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: email || user.email,
          mdp,
          newMdp,
          id_user: localStorage.getItem('id'),
        })
      });
    } catch (err) {
      console.error(err.message)
    }
  }

  }
  }
  const modifyUser = async () => {
    try {
      const response = await fetch(`http://localhost:5000/users/updateUser/${user.id_user}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username : username || user.username ,
          email: email || user.email
        })
      });
      updatePwd()
      getUserById()
      handleSuccessNotify("Utilisateur modifié avec succés !")
    } catch (err) {
      console.error(err.message)
    }
  }

  return (
    <div className='setting'>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="box">
        <h3>Gérer mon compte</h3>
        <p>Photo Profil</p>
        <div className="user-setting">
        <div className="user-pic">
          <img src={userIcon} alt="user icon" />
          <button className='btnChange settingBtn'>Changer Photo</button>
          <button className='btnSupp settingBtn'>Supprimer Photo</button>
        </div>
        <div className='user-input'>
          <p>Username</p>
          <input type="text" className='inputs' defaultValue={username || user.username} onChange={e => setUsername(e.target.value)}/>
        </div>
        <div className='user-input'>
          <p>email</p>
          <input type="text" className='inputs' defaultValue={email || user.email} onChange={e => setEmail(e.target.value)} />
        </div>
        <p onClick={() => setOpenMdp(!openMdp)}>changer mot de passe</p>

        {openMdp && (
                  <>
                  <div className='user-input'>
                    <p>Mot de passe courant</p>
                    <input type="password" className='inputs' value={mdp} onChange={(e) => setMdp(e.target.value)} />
                  </div>
                  <div className='user-input'>
                    <p>Nouveau mot de passe</p>
                    <input type="password" className='inputs' value={newMdp} onChange={(e) => setNewMdp(e.target.value)}  />
                  </div>
                  <div className='user-inp'>
                    <p>Confirmer mot de passe</p>
                    <input type="password" className='inputs' value={confirmMdp} onChange={(e) => setConfirmMdp(e.target.value)}  />
                  </div>
                  </>
        )}
        <div className="param_bot">
        <div className="logout">
          <button type='submit' onClick={() => {
            localStorage.removeItem("token")
            localStorage.removeItem("id")
            navigate('/')
    window.location.reload()
            }}>Deconnexion</button>
        </div>
        <div className="validate">
          <button type="button" onClick={modifyUser} disabled={newMdp !== confirmMdp}>Enregistrer</button>
        </div>

        </div>

        </div>
      </div>
    </div>
  )
}

export default Parametres
