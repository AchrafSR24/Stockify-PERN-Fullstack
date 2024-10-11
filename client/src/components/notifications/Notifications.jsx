import React from 'react'
import './notifications.css'
import { FaCheck } from "react-icons/fa6";
import { AiOutlineDelete } from "react-icons/ai";
import { RiEditBoxLine } from "react-icons/ri";

const Notifications = () => {
  return (
    <div className="notif">
    <div className='box'>
      <h3>Notifications</h3>
      <div className="notif_container">
        <div className="notif_box_add">
          <div className="notif_icon">
            <FaCheck />
          </div>
          <div className="notif_desc">
            <h3>ajout effectué</h3>
            <p>Lorem ipsum dolor sit amet.</p>
          </div>
        </div>
        <div className="notif_box_delete">
          <div className="notif_icon">
            < AiOutlineDelete  />
          </div>
          <div className="notif_desc">
            <h3>suppression terminée</h3>
            <p>Lorem ipsum dolor sit amet.</p>
          </div>
        </div>
        <div className="notif_box_update">
          <div className="notif_icon">
            < RiEditBoxLine />
          </div>
          <div className="notif_desc">
            <h3>modification terminée</h3>
            <p>Lorem ipsum dolor sit amet.</p>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Notifications
