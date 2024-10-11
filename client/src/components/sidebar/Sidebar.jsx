import React, { useEffect, useState, useContext } from "react";
import logo from "../../assets/package-box.png";
import userImg from "../../assets/user.png";
import "./sidebar.css";
import { NavLink, useNavigate } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import { IoSettingsSharp, IoMoon, IoSunnySharp } from "react-icons/io5";
import { MdNotificationsActive } from "react-icons/md";
import { FaBox } from "react-icons/fa6";
import { FaThList } from "react-icons/fa";
import { FaWarehouse } from "react-icons/fa";
import { GoChevronDown } from "react-icons/go";
import { userContext } from "../../Context/UserContext";


const Sidebar = () => {
  const {user} = useContext(userContext)
  console.log(user);
  
  const [open0, setOpen0] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [theme, setTheme] = useState('dark');

  const entrepotMenu = () => setOpen0((x) => !x);
  const produitMenu = () => setOpen1((x) => !x);
  const categorieMenu = () => setOpen2((x) => !x);
  const stockMenu = () => setOpen3((x) => !x);
  useEffect(()=>{
    if(theme === 'dark') {
      document.body.classList.remove('light-mode')
    }else{
      document.body.classList.add('light-mode')
    }
  },[theme])

  return (
    <sidebar className="sideBar">
      <div className="logoHolder">
        <img src={logo} alt="logo" />
        <h3>Stockify</h3>
      </div>
      <div className="linksHolder">
        <ul>
          <li>
            <NavLink className="mainLink" to={"/"}>
              <MdDashboard /> Dashboard
            </NavLink>{" "}
          </li>
          <li onClick={entrepotMenu}>
            <div
              className={open0 ? "mainLink active" : "mainLink"}
              to={"/test2"}
            >
              <FaWarehouse />
              Entrepot
              <GoChevronDown className={open0 ? "chevron active" : "chevron"} />
            </div>{" "}
          </li>
          {open0 && (
            <div className="submenu">
              <div className="popup">
                <NavLink to="/add-warehouse" className="mainLink">
                  Ajouter entrepot
                </NavLink>
              </div>
              <div className="popup">
                <NavLink to="/modify-warehouse" className="mainLink">
                  Modifier entrepot
                </NavLink>
              </div>
              <div className="popup">
                <NavLink to="/delete-warehouse" className="mainLink">
                  Supprimer entrepot
                </NavLink>
              </div>
            </div>
          )}

          <li onClick={produitMenu}>
            <div className={open1 ? "mainLink active" : "mainLink"}>
              <FaShoppingCart />
              Produit
              <GoChevronDown className={open1 ? "chevron active" : "chevron"} />

            </div>
          </li>
          {open1 && (
            <div className="submenu">
              <div className="popup">
                <NavLink to="/add-product" className="mainLink">
                  Ajouter produit
                </NavLink>
              </div>
              <div className="popup">
                <NavLink to="/modify-product" className="mainLink">
                  Modifier produit
                </NavLink>
              </div>
              <div className="popup">
                <NavLink to="/delete-product" className="mainLink">
                  Supprimer produit
                </NavLink>
              </div>
            </div>
          )}

          <li onClick={categorieMenu}>
            <div
              className={open2 ? "mainLink active" : "mainLink"}
              to={"/test2"}
            >
              <FaThList />
              Categorie
              <GoChevronDown className={open2 ? "chevron active" : "chevron"} />
            </div>{" "}
          </li>
          {open2 && (
            <div className="submenu">
              <div className="popup">
                <NavLink to="/add-category" className="mainLink">
                  Ajouter categorie
                </NavLink>
              </div>
              <div className="popup">
                <NavLink to="/modify-category" className="mainLink">
                  Modifier categorie
                </NavLink>
              </div>
              <div className="popup">
                <NavLink to="/delete-category" className="mainLink">
                  Supprimer categorie
                </NavLink>
              </div>
            </div>
          )}
          <li onClick={stockMenu}>
            <div
              className={open3 ? "mainLink active" : "mainLink"}
              to={"/test2"}
            >
              <FaBox />
              Stock
              <GoChevronDown className={open3 ? "chevron active" : "chevron"} />
            </div>{" "}
          </li>
          {open3 && (
            <div className="submenu">
              <div className="popup">
                <NavLink to="/list-stock" className="mainLink">
                  Lister et mettre à jour le stock
                </NavLink>
              </div>
              {/*<div className="popup">
                <NavLink to="/update-stock" className="mainLink">
                  Mettre a jour
                </NavLink>
              </div>*/}
            </div>
          )}
          {/*<li>
            <NavLink className="mainLink" to={"/notifications"}>
              <MdNotificationsActive />
              Notifications
            </NavLink>{" "}
          </li> */}
          <li>
            <NavLink className="mainLink" to={"/parametres"}>
              <IoSettingsSharp />
              Paramètres
            </NavLink>{" "}
          </li>
        </ul>
      </div>
      <div className="session">
        <div className="sessionHolder">
          <img src={userImg} alt="user icon"/>
          <h3>{user.username}</h3>
          <p>{user.email}</p>
        </div>
        <div className="theme">
          <div className={theme === 'dark' ? "active theme-item" : "inactive theme-item"} onClick={() => setTheme("dark")}>
            <IoMoon />
          </div>
          <div className={theme === 'light' ? "active theme-item" : "inactive theme-item"} onClick={() => setTheme("light")}>
            <IoSunnySharp />
          </div>
        </div>
      </div>
    </sidebar>
  );
};

export default Sidebar;
