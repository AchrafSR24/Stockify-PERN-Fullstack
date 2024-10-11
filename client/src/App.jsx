import Dashboard from './components/dashboard/Dashboard'
import Login from './components/login/Login';
import "./App.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Link,
  Outlet,
  RouterProvider
} from "react-router-dom";
import Sidebar from './components/sidebar/Sidebar';
import AddProduct from './components/addProduct/AddProduct';
import ModifyProduct from './components/modifyProduct/ModifyProduct';
import DeleteProduct from './components/deleteproduct/DeleteProduct';
import AddWarehouse from './components/addWarehouse/AddWarehouse';
import ModifyWarehouse from './components/modifyWarehouse/ModifyWarehouse';
import DeleteWarehouse from './components/deleteWarehouse/DeleteWarehouse';
import AddCategory from './components/addCategory/AddCategory';
import DeleteCategory from './components/deleteCategory/DeleteCategory';
import ModifyCategory from './components/modifyCategory/ModifyCategory';
import SelectActualStock from './components/selectActualStock/SelectActualStock';
import Notifications from './components/notifications/Notifications';
import Parametres from './components/parametres/Parametres';
import EditStock from './components/editStock/EditStock';
import { userContext } from './Context/UserContext';
import { useEffect, useState } from 'react';

function App() {
  
  const [user,setUser]=useState([])

  const getUserById = async() =>{ 
    try {
     const response = await fetch(`http://localhost:5000/users/getUser/${localStorage.getItem('id')}`);
     const jsonData = await response.json(); 
     console.log(jsonData);
     
     setUser(jsonData);     
   } catch (err) {
       console.error(err.message);
       }
 };
 useEffect(()=> {
  getUserById()
}, []);
  const router = createBrowserRouter(
    createRoutesFromElements(
    <Route path="/" element={<Root user={user} getUserById={getUserById} />}>
      <Route index element={<Dashboard/>}/>
      <Route path="/delete-product" element={<DeleteProduct tableContain={"product"}/>}/>
      <Route path="/modify-product" element={<ModifyProduct tableContain={"product"}/>}/>
      <Route path="/modify-product/:id" element={<AddProduct pageType={"modifyProdById"} corner={"image"} qte_capacite={"product"} isSelectedIndex={true} stringData={"product"} havePrice={true}/>}/>
      <Route path="/add-product" element={<AddProduct pageType={"confirmProduct"} corner={"image"} qte_capacite={"product"} isSelectedIndex={true} stringData={"product"} havePrice={true}/>}/>
      <Route path="/add-warehouse" element={<AddWarehouse pageType={"confirmWarehouse"} corner={"map"} qte_capacite={"warehouse"} isSelectedIndex={false} stringData={"warehouse"} havePrice={false}/>}/>
      <Route path="/modify-warehouse" element={<ModifyWarehouse tableContain={"warehouse"}/>}/>
      <Route path="/modify-warehouse/:id" element={<AddWarehouse pageType={"modifyEntById"} corner={"map"} qte_capacite={"warehouse"} isSelectedIndex={false} stringData={"warehouse"} havePrice={false}/>}/>
      <Route path="/delete-warehouse" element={<DeleteWarehouse tableContain={"warehouse"}/>}/>
      <Route path="/add-category" element={<AddCategory corner={"none"} pageType ={"confirmCategory"} isSelectedIndex={false} stringData={"category"} havePrice={false}/>}/>
      <Route path="/modify-category" element={<ModifyCategory tableContain={"category"}/>}/>
      <Route path="/modify-category/:id" element={<AddCategory corner={"none"} pageType={"modifyCatById"}  isSelectedIndex={false} stringData={"category"} havePrice={false}/>}/>
      <Route path="/delete-category" element={<DeleteCategory tableContain={"category"}/>}/>
      <Route path="/list-stock" element={<SelectActualStock/>}/>
      <Route path="/list-stock/:id" element={<EditStock/>}/>
      <Route path="/notifications" element={<Notifications/>}/>
      <Route path="/parametres" element={<Parametres/>}/>
    </Route>)
  );

  return (
    <RouterProvider router={router} />
  );
}
const Root = ({user, getUserById}) => {
  return (
 
    <userContext.Provider value={{user, getUserById}}>
  <>
    {localStorage.getItem("token") ? 
   <div className='df allBody'>

   <Sidebar />

   <>
     <Outlet/>
   </>
 </div>
 :
 <Login/>

     }

    </>
    </userContext.Provider>
  );
};

export default App;
