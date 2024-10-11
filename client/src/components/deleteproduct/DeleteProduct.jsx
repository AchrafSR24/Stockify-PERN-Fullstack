import React, { useEffect, useState } from 'react'
import { RiDeleteBin6Line } from "react-icons/ri";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FiSearch } from "react-icons/fi";

import './deleteproduct.css'
const DeleteProduct = ({tableContain}) => {
  const [products,setProducts]=useState([])
  const [categories,setCategories]=useState([])
  const [warehouses,setWarehouses]=useState([])
  const [selectedItems,setSelectedItems]=useState(null)
  const [searchValue,setSearchValue]=useState('')

// fonction supprimerProd :

  const supprimerProd = async(id) => { // fonction asynchrone permettant de supprimer un produit.
    try {
    const deleteProduct = await fetch(`http://localhost:5000/products/deleteProduct/${id}`,{  // effectuer une requete delete.
      method : "DELETE"
    });
    setProducts(products?.filter(product=>product.id_prod !==id)); // mettre a jour la liste de produit apres la suppression 
                                                                 // La méthode filter() crée une nouvelle liste contenant tous les produits
                                                                 // dont l'id_prod est différent de l'id passé en paramètre à la fonction. 
   } catch (err) {
    console.error(err.message)  
  } 
 } 

 // fonction supprimerCat :

 const supprimerCat = async(id) => { 
  try {
  const deleteCategory = await fetch(`http://localhost:5000/categories/deleteCategory/${id}`,{  
    method : "DELETE"
  });
  setCategories(categories?.filter(category=>category.id_categorie !==id));  
 } catch (err) {
  console.error(err.message)  
} 
} 

 // fonction supprimerEnt :
const supprimerEnt = async(id) => { 
  try {
  const deleteWarehouse = await fetch(`http://localhost:5000/warehouses/deleteWarehouse/${id}`,{  
    method : "DELETE"
  });
  setWarehouses(warehouses?.filter(warehouse=>warehouse.id_entrepot !==id));  
 } catch (err) {
  console.error(err.message)  
} 
} 


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


    //delete button function for products
  const UIhandlerP = (item) => {
    return (
     <button onClick={()=>supprimerProd(item.id_prod)} className='deleteBtn'><RiDeleteBin6Line /></button> 
    )
  }
      //delete button function for categoires
  const UIhandlerC = (item) => {
        return (
         <button onClick={()=>supprimerCat(item.id_categorie)} className='deleteBtn'><RiDeleteBin6Line /></button> 
        )
      }

      //delete button function for warehouse
  const UIhandlerW = (item) => {
    return (
     <button onClick={()=>supprimerEnt(item.id_entrepot)} className='deleteBtn'><RiDeleteBin6Line /></button> 
    )
  }

  //barre de recherche comparaision du valeurSerch par les nom du produits existants.
  const filtredArrayP = products?.filter(item => item?.nom_prod?.toLowerCase().includes(searchValue.toLowerCase()))
  
  

  const filtredArrayC = categories?.filter(item => item.nom_categorie.toLowerCase().includes(searchValue.toLowerCase()))

  const filtredArrayW = warehouses?.filter(item => item.nom_entrepot.toLowerCase().includes(searchValue.toLowerCase()))

  return (
    <div className="delete">
      {tableContain==="product" &&(  
      <div className='box'>
      <h3>Supprimer Produit</h3>
      <p>Cherchez vous le produit que vous voulez le supprimer.</p>  
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
      <h3>Supprimer Categorie</h3>
      <p>Cherchez vous la categorie que vous voulez la supprimer.</p>  
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
</div>



    </div>
 )}

{tableContain==="warehouse" &&(  
      <div className='box'>
      <h3>Supprimer Entrepôt</h3>
      <p>Cherchez vous l'entrepôt que vous voulez le supprimer.</p>  
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

export default DeleteProduct;
