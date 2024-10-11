import React, { useState,useEffect } from 'react'
import './dashboard.css'
import { FiSearch } from "react-icons/fi";
import { FaListUl } from "react-icons/fa6";
import { BsFillGridFill } from "react-icons/bs";
import { FaShoppingCart } from "react-icons/fa";
import { FaThList } from "react-icons/fa";
import { FaWarehouse } from "react-icons/fa";
import { FaBox } from "react-icons/fa6";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import PieEcharts from '../echarts/PieEcharts';


const Dashboard = () => {
  const [products,setProducts]=useState([])
  const [categories,setCategories]=useState([])
  const [warehouses,setWarehouses]=useState([])
  const [selectedItems,setSelectedItems]=useState(null)
  const [stock,setStock]=useState([])
  const [searchValue,setSearchValue]=useState('')
  const [tableType, setTableType] = useState('produit'); 
      //get products:
      const getProducts = async() =>{ 
        try {
          const response = await fetch(`http://localhost:5000/products/getAllProductsForUser/${localStorage.getItem('id')}`);
          const jsonData = await response.json(); 
          setProducts(jsonData); //Cette ligne met à jour l'état de la variable products avec la valeur de jsonData en utilisant la fonction setProducts
        } catch (err) {
          console.error(err.message);
        }
      };
        useEffect(()=> {
          getProducts()//Le tableau vide [] en deuxième argument de useEffect indique que la fonction getProducts ne doit être appelée qu'une seule fois, lors du montage du composant.
        }, []);
    
        //get categories:
        const getCategories = async() =>{ 
          try {
            const response = await fetch(`http://localhost:5000/categories/getAllCategoriesForUser/${localStorage.getItem('id')}`);
            const jsonData = await response.json(); 
            setCategories(jsonData); 
          } catch (err) {
            console.error(err.message);
          }
        };
          useEffect(()=> {
            getCategories()
          }, []);
    
        //get warehouse:
        const getWarehouses = async() =>{ 
          try {
            const response = await fetch(`http://localhost:5000/warehouses/getAllWarehousesForUser/${localStorage.getItem('id')}`);
            const jsonData = await response.json(); 
            setWarehouses(jsonData); 
          } catch (err) {
            console.error(err.message);
          }
        };
          useEffect(()=> {
            getWarehouses()
          }, []);

          const getStock = async() =>{ 
            try {
              const response = await fetch(`http://localhost:5000/stock/showActualStock/${localStorage.getItem('id')}`);
              const jsonData = await response.json(); 
              setStock(jsonData); 
            } catch (err) {
              console.error(err.message);
            }
          };
            useEffect(()=> {
              getStock()
            }, []);      

const filtredArrayP = products.filter(item => item.nom_prod?.toLowerCase().includes(searchValue.toLowerCase()))
const filtredArrayW = warehouses.filter(item => item.nom_entrepot.toLowerCase().includes(searchValue.toLowerCase()))
const filtredArrayC = categories.filter(item => item.nom_categorie.toLowerCase().includes(searchValue.toLowerCase()))


  return (
    <div className='dashboard'>
      <div className="dashboard_header">
        <div className="dashboad_header_search">
          <input type="search" onChange={(e) => setSearchValue(e.target.value)} value={searchValue} placeholder='Search' />
          <FiSearch />
          </div>
      </div>
      <div className="dashboard_mid">
        <div className='card'>
        <div className='card-inner'>
          <h3>PRODUITS</h3>
          <FaShoppingCart className='card_icon'/>
        </div>
          <h1>{products.length}</h1>
        </div>  

        <div className='card'>
        <div className='card-inner'>
          <h3>CATEGORIES</h3>
          <FaThList className='card_icon'/>
        </div>
          <h1>{categories.length}</h1>
        </div>  
        <div className='card'>
        <div className='card-inner'>
          <h3>ENTREPÔTS</h3>
          <FaWarehouse className='card_icon'/>
        </div>
          <h1>{warehouses.length}</h1>
        </div>  
        <div className='card'>
        <div className='card-inner'>
          <h3>STOCK</h3>
          <FaBox className='card_icon'/>
        </div>
          <h1>{stock.length}</h1>
        </div>  
      </div>
      <div className="dashboard_footer">

        <div className="footer_1 dsh_footer">
        <div className='charts'>
        <PieEcharts/>
        </div>
        </div>


        <div className="footer_2 dsh_footer">
         <div className="footer_2_list">
           <select value={tableType} onChange={(e) => setTableType(e.target.value)}>
             <option value="produit">Produits</option>
             <option value="categorie">Categories</option>
             <option value="entrepot">Entrepôts</option>
           </select>
         </div>
         <div className="table_contain">
         {tableType === 'categorie' && (
              <DataTable
                value={filtredArrayC}
                selection={selectedItems}
                onSelectionChange={(e) => setSelectedItems(e.value)}
                stripedRows
                dataKey="id_categorie"
                tableStyle={{ minWidth: "50rem" }}
                paginator
                rows={5}
                size={"large"}
                removableSort
                rowsPerPageOptions={[5, 10, 25, 50]}
              >
            <Column
              field="nom_categorie"
              sortable
              header="Categorie"
              style={{ padding: "15px" }}
            ></Column>
            <Column
              field="description_categorie"
              header="Description"
              style={{ padding: "15px" }}
            ></Column>
              </DataTable>
            )}
            {tableType === 'produit' && (
              <DataTable
                value={filtredArrayP}
                selection={selectedItems}
                onSelectionChange={(e) => setSelectedItems(e.value)}
                stripedRows
                dataKey="id_produit"
                tableStyle={{ minWidth: "50rem" }}
                paginator
                rows={5}
                size={"large"}
                removableSort
                rowsPerPageOptions={[5, 10, 25, 50]}
              >
            <Column
              field="nom_prod"
              sortable
              header="Nom Produit"
              style={{ padding: "15px" }}
            ></Column>
            <Column
              field="description_prod"
              header="Description"
              style={{ padding: "15px" }}
            ></Column>
            <Column
              field="prix_unit"
              sortable
              header="Prix Unitaire"
              style={{ padding: "15px" }}
            ></Column>
            <Column
              field="remise"
              sortable
              header="Remise"
              style={{ padding: "15px" }}
            ></Column>
            <Column
              field="qte_prod"
              sortable
              header="Quantité Produit"
              style={{ padding: "15px" }}
            ></Column>
              </DataTable>
            )}
            {tableType === 'entrepot' && (
              <DataTable
                value={filtredArrayW}
                selection={selectedItems}
                onSelectionChange={(e) => setSelectedItems(e.value)}
                stripedRows
                dataKey="id_entrepot"
                tableStyle={{ minWidth: "50rem" }}
                paginator
                rows={5}
                size={"large"}
                removableSort
                rowsPerPageOptions={[5, 10, 25, 50]}
              >
            <Column
              field="nom_entrepot"
              sortable
              header="Nom Entrepôt"
              style={{ padding: "15px" }}
            ></Column>
            <Column
              field="adresse"
              sortable
              header="Adresse"
              style={{ padding: "15px" }}
            ></Column>
            <Column
              field="capacite"
              sortable
              header="Capacité"
              style={{ padding: "15px" }}
            ></Column>
              </DataTable>
            )}
         </div>   
   
        </div>
        
        </div>
      </div>
    
  )
}

export default Dashboard
