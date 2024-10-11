import React ,{useEffect,useState} from 'react'
import "../editStock/editstock.css"
import { useNavigate, useParams } from "react-router-dom";

const EditStock = () => {
   
    const {id}=useParams();
    const navigate = useNavigate()
    const [stockData,setStockData]=useState({});
    const [qte_stock,setQteStock]=useState(0);
    const [seuil_stock,setSeuilStock]=useState(0);



    const getStockById = async() =>{ 
        try {
         const response = await fetch(`http://localhost:5000/stock/getStock/${id}`);
         const jsonData = await response.json(); 
         setStockData(jsonData);
       } catch (err) {
           console.error(err.message);
           }
     };
       useEffect(()=> {
        getStockById()
        }, [id]);
        const modifierStock = async () => {
          try {
       
            const response = await fetch(`http://localhost:5000/stock/updateStockProduct/${id}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                qte_stock : qte_stock || stockData.qte_stock ,
                seuil_stock: seuil_stock || stockData.seuil_stock
              })
            });
            navigate('/list-stock')
          } catch (err) {
            console.error(err.message)
          }
        }

  return (


    <div className='editStock'>
    <div className='box'>
      <div>
        <h3>Mettre à jour le Stock</h3>
      </div>
      
      <div className='stock-input'>
        <h4>Stock actuel (quantite de stock)</h4>
       <input type="text" className='inputs' defaultValue={qte_stock || stockData.qte_stock} onChange={e => setQteStock(e.target.value)}/>
       <h4>Seuil de stock</h4>
       <input type="text" className='inputs' defaultValue={seuil_stock || stockData.seuil_stock} onChange={e => setSeuilStock(e.target.value)}/>
      </div>
      <div className='optionBtnHolder'>
      <div className="optBtn">
        <button type="button" className='CloseBtn'onClick={()=> navigate('/list-stock')}>Fermer</button>
        <button type="button" onClick={modifierStock}>Modifier</button>
      </div>
      </div>
    </div>  
    </div>
  )
}

export default EditStock
