import React, { useEffect, useState } from 'react'
import { RiEditBoxLine } from "react-icons/ri";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FiSearch } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';
import '../modifyProduct/modifyproduct.css'
import EditStock from '../editStock/EditStock';
const SelectActualStock = () => {
  const [stock, setStock] = useState([]);
  const [selectedItems, setSelectedItems] = useState(null);
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();

  const getStock = async () => {
    try {
      const response = await fetch(`http://localhost:5000/stock/showActualStock/${localStorage.getItem('id')}`);
      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }
      const jsonData = await response.json();
      const stockWithEtat = jsonData.map(item => ({
        ...item,
        etat: getEtat(item.qte_stock, item.seuil_stock)
      }));
      setStock(stockWithEtat);
    } catch (err) {
      console.error(err.message);
    }
  };
   
  useEffect(() => {
    getStock();
  }, []);


  const getEtat = (qte_stock, seuil_stock) => {
    if (qte_stock > seuil_stock) {
      return 'En stock';
    } else if (qte_stock < seuil_stock && qte_stock !== 0) {
      return 'Faible stock';
    } else {
      return 'Hors stock';
    }
  };

  const getEtatStyle = (etat) => {
    switch (etat) {
      case 'En stock':
        return { backgroundColor: '#2e7d32', color: 'var(--text-color)', padding: '5px 10px', borderRadius: '4px',width:'36%' };
      case 'Faible stock':
        return { backgroundColor:  '#ff6d00', color: 'var(--text-color)', padding: '5px 10px', borderRadius: '4px',width:'40%'  };
      case 'Hors stock':
        return { backgroundColor: '#d50000', color: 'var(--text-color)', padding: '5px 10px', borderRadius: '4px',width:'38%'  };
      default:
        return {};
    }
  };

  const UIhandler = (item) => {
    return (
      <button onClick={() => navigate(`/list-stock/${item.id_stock}`)} className='editBtn'><RiEditBoxLine /></button>
    )
  }

  const filteredArray = stock.filter(item => item.nom_prod.toLowerCase().includes(searchValue.toLowerCase()))

  return (
    <div className="modify">
      <div className='box'>
        <h3>Liste de Stock </h3>
        <p>Cherchez vous le produit que vous voulez lister leur stock et le mettre à jour.</p>
        <div className='search_part'>
          <h5>Tout le stock ({stock.length})</h5>
          <div className="srch">
            <FiSearch />
            <input type="text" placeholder='Search' onChange={(e) => setSearchValue(e.target.value)} value={searchValue} />
          </div>
        </div>

        <div className="container">
          <DataTable
            value={filteredArray}
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
            />
            <Column
              field="image_prod"
              header="Image"
              style={{ padding: "15px" }}
            />
            <Column
              field="nom_categorie"
              sortable
              header="Categorie"
              style={{ padding: "15px" }}
            />
            <Column
              field="etat"
              header="Etat"
              body={(item) => (
                <div style={getEtatStyle(item.etat)}>{item.etat}</div>
              )}
              style={{ padding: "15px" }}
            />
            <Column
              field="prix_unit"
              sortable
              header="Prix Unitaire"
              style={{ padding: "15px" }}
            />
            <Column
              header=""
              style={{ padding: "15px" }}
              body={UIhandler}
            />
          </DataTable>
        </div>
      </div>
    </div>
  )
}

export default SelectActualStock
 
   

