import React, { useEffect, useState } from 'react'
import { RiEditBoxLine } from "react-icons/ri";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FiSearch } from "react-icons/fi";

import './modifyproduct.css'
import { useNavigate } from 'react-router-dom';

const ModifyProduct = ({tableContain}) => {
  const navigate = useNavigate()
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [warehouses, setWarehouses] = useState([])
  const [selectedItems, setSelectedItems] = useState(null)
  const [searchValue, setSearchValue] = useState('')

  // fonction modifierProd :
  /*const modifierProd = async (product) => {
    try {
      // effectuer une requête PUT pour modifier le produit
      const response = await fetch(`http://localhost:5000/products/updateProduct/${product.id_prod}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(product)
      });
      // mettre à jour la liste de produits après la modification
      const updatedProducts = products.map(p => p.id_prod === product.id_prod ? product : p);
      setProducts(updatedProducts);
    } catch (err) {
      console.error(err.message)
    }
  }*/

  // button edit function
  const UIhandlerP = (item) => {
    return (
      <button onClick={() => navigate(`/modify-product/${item.id_prod}`)} className='editBtn'><RiEditBoxLine /></button>
    )
  }

  const UIhandlerC = (item) => {
    return (
      <button onClick={() => navigate(`/modify-category/${item.id_categorie}`)} className='editBtn'><RiEditBoxLine /></button>
    )
  }

 
    const UIhandlerW = (item) => {
      return (
        <button onClick={() => navigate(`/modify-warehouse/${item.id_entrepot}`)} className='editBtn'><RiEditBoxLine /></button>
      )
    }



  const getProducts = async () => {
    try {
      const response = await fetch(`http://localhost:5000/products/getAllProductsForUser/${localStorage.getItem('id')}`);
      const jsonData = await response.json();
      setProducts(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getProducts()
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

  const filtredArrayP = products.filter(item => item.nom_prod.toLowerCase().includes(searchValue.toLowerCase()))

  const filtredArrayC = categories.filter(item => item.nom_categorie.toLowerCase().includes(searchValue.toLowerCase()))

  const filtredArrayW = warehouses.filter(item => item.nom_entrepot.toLowerCase().includes(searchValue.toLowerCase()))

  return (
    <div className="modify">
{tableContain==="product" &&(  
      <div className='box'>
        <h3>Modifier Produit</h3>
        <p>Cherchez vous le produit que vous voulez le modifier.</p>
        <div className='search_part'>
          <h5>Tout les produits ({products.length})</h5>
          <div className="srch">
            <FiSearch />
            <input type="text" placeholder='Search' onChange={(e) => setSearchValue(e.target.value)} value={searchValue} />
          </div>
        </div>

        <div class="container">

          <DataTable
            value={filtredArrayP}
            selection={selectedItems}
            onSelectionChange={(e) => setSelectedItems(e.value)}
            stripedRows
            dataKey="id_prod"
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
              field="qte_prod"
              sortable
              header="Quantité Produit"
              style={{ padding: "15px" }}
            ></Column>
            <Column
              header=""
              style={{ padding: "15px" }}
              body={UIhandlerP}
            ></Column>
          </DataTable>
        </div>
      </div>
      )}

{tableContain==="category" &&(  
      <div className='box'>
      <h3>Modifier Categorie</h3>
      <p>Cherchez vous la categorie que vous voulez la modifier.</p>  
      <div className='search_part'>  
      <h5>Tous les categories ({categories.length})</h5> 
      <div className="srch">
        <FiSearch />
      <input type="text" placeholder='Search' onChange={(e) => setSearchValue(e.target.value)} value={searchValue} />
      </div>
      </div>
   


<div class="container">

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
              <Column
              header=""
              style={{ padding: "15px" }}
              body={UIhandlerC}
            ></Column>
          </DataTable>
</div>      {tableContain==="product" &&(  
      <div className='box'>
        <h3>Modify Product</h3>
        <p>Search the product you will modify.</p>
        <div className='search_part'>
          <h5>All products ({products.length})</h5>
          <div className="srch">
            <FiSearch />
            <input type="text" placeholder='Search' onChange={(e) => setSearchValue(e.target.value)} value={searchValue} />
          </div>
        </div>

        <div class="container">

          <DataTable
            value={filtredArrayP}
            selection={selectedItems}
            onSelectionChange={(e) => setSelectedItems(e.value)}
            stripedRows
            dataKey="id_prod"
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
              field="qte_prod"
              sortable
              header="Quantité Produit"
              style={{ padding: "15px" }}
            ></Column>
            <Column
              header=""
              style={{ padding: "15px" }}
              body={UIhandlerp}
            ></Column>
          </DataTable>
        </div>
      </div>
      )}



    </div>
 )}

{tableContain==="warehouse" &&(  
      <div className='box'>
      <h3>modifier Entrepôt</h3>
      <p>Cherchez vous l'entrepôt que vous voulez le modifier.</p>  
      <div className='search_part'>  
      <h5>Tous les entrepôts ({warehouses.length})</h5> 
      <div className="srch">
        <FiSearch />
      <input type="text" placeholder='Search' onChange={(e) => setSearchValue(e.target.value)} value={searchValue} />
      </div>
      </div>
   


<div class="container">

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
              <Column
              header=""
              style={{ padding: "15px" }}
              body={UIhandlerW}
            ></Column>
          </DataTable>
</div>

    </div>
 )}

    </div>
  )
}

export default ModifyProduct