import React, { useState,useEffect, useContext } from "react";
import "./addproduct.css";
import { FaPlus } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { userContext } from "../../Context/UserContext";
import { Toaster, toast } from "react-hot-toast";


const AddProduct = ({pageType, corner, havePrice , isSelectedIndex ,stringData,qte_capacite }) => {
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
  const {user} = useContext(userContext)
  const {id} = useParams()
  const navigate = useNavigate()
  const [nom_prod , setNomProd] = useState("");
  const [nom_categorie , setNomCat] = useState("");
  const [nom_entrepot , setNomEnt] = useState("");
  const [description_prod , setDescriptionProd] = useState("");
  const [description_categorie , setDescriptionCat] = useState("");
  const [adresse, setAdresse] = useState("");
  const [prix_unit , setPrixUnit] = useState(0);
  const [remise , setRemise] = useState(0);
  const [capacite , setCapacite] = useState(0);
  const [image_prod , setImgProd] = useState(""); //BUCKET AWS S3
  const [qte_prod ,setQteProd]= useState(0);
  const [id_categorie ,setIdCategorie]= useState(31);
  const [id_entrepot ,setIdEntrepot]= useState(26);
  const [loading , isLoading] = useState(false);
  const [loadingModified , isLoadingModified] = useState(false);
  const [productData , setProductData] = useState({});
  const [categoryData , setCategoryData] = useState({});
  const [warehouseData, setWarehouseData]=useState({})
  const [allNamesCategories, setAllNamesCategories]=useState([])
  const [allNamesWarehouses, setAllNamesWarehouses]=useState([])

  const getAllNamesCategories = async() =>{ 
    try {
      const response = await fetch(`http://localhost:5000/categories/getAllNamesCategories/${localStorage.getItem('id')}`);
      const jsonData = await response.json(); 
      setAllNamesCategories(jsonData); 
    } catch (err) {
      console.error(err.message);
    }
  };
    useEffect(()=> {
      getAllNamesCategories()
    }, []);

  const getAllNamesWarehouses = async() =>{ 
    try {
      const response = await fetch(`http://localhost:5000/warehouses/getAllNamesWarehouses/${localStorage.getItem('id')}`);
      const jsonData = await response.json(); 
      setAllNamesWarehouses(jsonData); 
    } catch (err) {
      console.error(err.message);
    }
  };
    useEffect(()=> {
      getAllNamesWarehouses()
    }, []);


    
// add product
  const onSubmitFormProd = async e => {
    isLoading(true)
    e.preventDefault();
    if(user.id_user){
      try {
        const newProduct={
          nom_prod,
          description_prod,
          prix_unit,
          remise,
          image_prod,
          qte_prod,
          id_categorie,
          id_entrepot,
          id_user: user.id_user
         };
  
        const body={newProduct};
        const response = await fetch("http://localhost:5000/products/addProduct",{
          method: "POST",
          headers :{ "Content-Type": "application/json"},
          body : JSON.stringify(newProduct)
        });

        /*
        const stockResponse = await fetch("http://localhost:5000/stock/addToStock", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id_prod: newProduct.id_prod, qte_stock:newProduct.qte_prod,seuil_stock:10,id_user:user.id_user }),
        }); */

        isLoading(false)
        setNomProd("")
        setDescriptionProd("")
        setPrixUnit(0)
        setRemise(0)
        setImgProd("")
        setQteProd(0)
        setIdCategorie(0)
        setIdEntrepot()
        handleSuccessNotify("Produit ajouté avec succés !")
        console.log(response)
        } catch (err) {
        console.error(err.message);
      }
    }

  }

  //add category
  const onSubmitFormCat = async e => {
    isLoading(true)
    e.preventDefault();
    try {
      const newCategory={
        nom_categorie,
        description_categorie,
        id_user: localStorage.getItem('id')
       };
      const body={newCategory};
      const response = await fetch("http://localhost:5000/categories/addCategory",{
        method: "POST",
        headers :{ "Content-Type": "application/json"},
        body : JSON.stringify(newCategory)
      });
      isLoading(false)
      setNomCat("")
      setDescriptionCat("")
      handleSuccessNotify("Categorie ajoutée avec succées !")
      } catch (err) {
      console.error(err.message);
      
    }
  }
  //add warehouse:
  const onSubmitFormEnt = async e => {
    isLoading(true)
    e.preventDefault();
    try {
      const newWarehouse={
        nom_entrepot,
        adresse,
        capacite, 
        id_user: localStorage.getItem('id')
      };
      const body={newWarehouse};
      const response = await fetch("http://localhost:5000/warehouses/addWarehouse",{
        method: "POST",
        headers :{ "Content-Type": "application/json"},
        body : JSON.stringify(newWarehouse)
      });
      isLoading(false)
      setNomEnt("")
      setAdresse("")
      setCapacite(0)
      handleSuccessNotify("Entrepôt ajouté avec succés !")
      } catch (err) {
      console.error(err.message);
      
    }
  }
  
  
/// modification de produit
  const getProductById = async() =>{ 
    try {
     const response = await fetch(`http://localhost:5000/products/getProduct/${id}`);
     const jsonData = await response.json(); 
     setProductData(jsonData);     
   } catch (err) {
       console.error(err.message);
       }
 };
   useEffect(()=> {
    getProductById()
    }, [id]);
    const modifierProd = async (e) => {
      e.preventDefault()
      try {
        // effectuer une requête PUT pour modifier le produit
        const response = await fetch(`http://localhost:5000/products/updateProduct/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            nom_prod : nom_prod || productData.nom_prod ,
            description_prod: description_prod || productData.description_prod,
            prix_unit: prix_unit || productData.prix_unit,
            remise: remise || productData.remise,
            qte_prod: qte_prod || productData.qte_prod,
            id_categorie: id_categorie || productData.id_categorie,
            id_entrepot: id_entrepot || productData.id_entrepot,
          })
        });
        navigate('/modify-product')
      } catch (err) {
        console.error(err.message)
      }
    }
/// modification de categorie
    const getCategoryById = async() =>{ 
      try {
       const response = await fetch(`http://localhost:5000/categories/getCategory/${id}`);
       const jsonData = await response.json(); 
       setCategoryData(jsonData);
     } catch (err) {
         console.error(err.message);
         }
   };
     useEffect(()=> {
      getCategoryById()
      }, [id]);
      const modifierCategorie = async (e) => {

        e.preventDefault()
        try {
     
          const response = await fetch(`http://localhost:5000/categories/updateCategory/${id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              nom_categorie : nom_categorie || categoryData.nom_categorie ,
              description_categorie: description_categorie || categoryData.description_categorie
            })
          });
          navigate('/modify-category')  
        } catch (err) {
          console.error(err.message)
        }
      }

      /// modification de entrepot
    const getWarehouseById = async() =>{ 
      try {
       const response = await fetch(`http://localhost:5000/warehouses/getWarehouse/${id}`);
       const jsonData = await response.json(); 
       setWarehouseData(jsonData);
     } catch (err) {
         console.error(err.message);
         }
   };
     useEffect(()=> {
      getWarehouseById()
      }, [id]);

      const modifierEntrepot = async (e) => {
        e.preventDefault()
        try {
          const response = await fetch(`http://localhost:5000/warehouses/updateWarehouse/${id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              nom_entrepot : nom_entrepot || warehouseData.nom_entrepot ,
              adresse:adresse|| warehouseData.nom_entrepot ,
              capacite:capacite|| warehouseData.capacite 
            })
          });
          navigate('/modify-warehouse')
        } catch (err) {
          console.error(err.message)
        }
      }
  return (
    <form >
    <div className="add" >
    <Toaster position="top-right" reverseOrder={false} />
      <div className="right_add">
      {stringData==="product" &&(
        <div className="upperBox box">
        <h3>Informations Générales</h3>
          <div className="contentBox">
            <h4>Nom du Produit</h4>
            <div className="contentItem">
              {id && (
                <input type="text"
                defaultValue={id ? productData.nom_prod : nom_prod }
                onChange={e => setNomProd(e.target.value)} 
                required
                />
              )}
              {!id && (
                <input type="text"
                value={id ? productData.nom_prod : nom_prod }
                onChange={e => setNomProd(e.target.value)} 
                required
                />
              )}
            </div>
          </div>
          <div className="contentBox">
            <h4>Description</h4>
            <div className="contentItem">
              {id && (
                  <input type="text"
                  defaultValue={id ? productData.description_prod : description_prod }
                  onChange={e => setDescriptionProd(e.target.value)} 
                  />
              )}
              {!id && (
                  <input type="text"
                  value={id ? productData.description_prod : description_prod}
                  onChange={e =>  setDescriptionProd(e.target.value)} 
                  />
              )}
            </div>
          </div>
        </div>
      )}
        {stringData==="category" &&(
        <div className="upperBox box">
        <h3>Informations Générales</h3>
          <div className="contentBox">
            <h4>Nom du Categorie</h4>
            <div className="contentItem">
              {id &&(
              <input type="text"
              defaultValue={id ? categoryData.nom_categorie : nom_categorie}
              onChange={e => setNomCat(e.target.value)} 
              required
              />
            )}
             {!id &&(
              <input type="text"
              value={id ? categoryData.nom_categorie : nom_categorie}
              onChange={e => setNomCat(e.target.value)} 
              required
              />
            )}
            </div>
          </div>
          <div className="contentBox">
            <h4>Description</h4>
            <div className="contentItem">
              {id &&(
              <textarea defaultValue={id ?  categoryData.description_categorie : description_categorie} onChange={e => setDescriptionCat(e.target.value)} ></textarea>
            )}
              {!id &&(
              <textarea value={id ?  categoryData.description_categorie : description_categorie} onChange={e => setDescriptionCat(e.target.value)} ></textarea>
            )}
            </div>
          </div>
        </div>
      )
      
      }

{stringData==="warehouse" &&(
        <div className="upperBox box">
        <h3>Informations Générales</h3>
          <div className="contentBox">
            <h4>Nom de l'entrepôt</h4>
            <div className="contentItem">
            {id &&(
              <input type="text"
              defaultValue={id? warehouseData.nom_entrepot:nom_entrepot}
              onChange={e => setNomEnt(e.target.value)} 
              required
              />
            )
            }
            {!id &&(
                <input type="text"
                value={id? warehouseData.nom_entrepot:nom_entrepot}
                onChange={e => setNomEnt(e.target.value)} 
                required
                />
            )
            }
            </div>
          </div>
          <div className="contentBox">
            <h4>Adresse</h4>
            <div className="contentItem">
              {id &&(
              <textarea defaultValue={id? warehouseData.adresse:adresse} onChange={e => setAdresse(e.target.value)} ></textarea>
            )}
             {!id &&(
              <textarea value={id? warehouseData.adresse:adresse} onChange={e => setAdresse(e.target.value)} ></textarea>
            )}
            </div>
          </div>
        </div>
      )}

        {havePrice && (
        <div className="midBox box">
        <h3>Prix & Remise</h3>
        <div className="contentBox">
          <h4>Prix</h4>
          <div className="contentItem">
            <span>TND</span>
            {id &&(
            <input type="text" className="priceInput"
             defaultValue={id ? productData.prix_unit : prix_unit} 
             onChange={e => setPrixUnit(e.target.value)}
            />
          )}
           {!id &&(
            <input type="text" className="priceInput" 
            value={id ? productData.prix_unit : prix_unit}
             onChange={e => setPrixUnit(e.target.value)} />
          )}
          </div>
        </div>
        <div className="contentBox">
          <h4>Remise %</h4>
          <div className="contentItem">
            <span>%</span>  
            {id &&(
            <input type="text" className="priceInput" 
            defaultValue={id ?  productData.remise : remise} 
            onChange={e => setRemise(e.target.value)}/>
          )}
           {!id &&(
            <input type="text" className="priceInput" 
            value={id ?  productData.remise : remise} 
            onChange={e => setRemise(e.target.value)}/>
          )}
          </div>
        </div>
      </div>
        )}
{ qte_capacite==="product"&&(
        <div className="downBox box">
          <h3>Quantité</h3>
          <div className="downBoxHolder">
            <div className="contentBox">
              <h4>Quantité du Produit</h4>
              <div className="contentItem">
                {id &&(
                <input type="text"
                defaultValue={id ?  productData.qte_prod : qte_prod} 
                onChange={e => setQteProd(e.target.value)}
                />
              )}
               {!id &&(
                <input type="text"
                value={id ?  productData.qte_prod : qte_prod} 
                onChange={e => setQteProd(e.target.value)}
                />
              )}
              </div>
            </div>
           {/* <div className="contentBox">
              <h4>Seuil du Quantité</h4>
              <div className="contentItem">
                <input type="text" />
              </div>
            </div>
            */}
          </div>
        </div>
        )}
 { qte_capacite==="warehouse"&&(
        <div className="downBox box">
          <h3>Capacité</h3>
          <div className="downBoxHolder">
            <div className="contentBox">
              <h4>Capacité</h4>
              <div className="contentItem">
                {id &&(
                <input type="text"
                defaultValue={id? warehouseData.capacite :capacite}
                onChange={e => setCapacite(e.target.value)}
                />
                )}
                {!id &&(
                <input type="text"
                value={id? warehouseData.capacite :capacite}
                onChange={e => setCapacite(e.target.value)}
                />
                )}
              </div>
            </div>
          </div>
        </div>
        )}       
      </div>
      <div className="left_add">
        {corner === "image" && (
        <div className="upperBox box">
        <h3>Image du Produit</h3>
        <div className="contentBox">
          <h4>Image du Produit</h4>
          <div className="uploadImg">
            <button value={image_prod} onChange={e => setImgProd(e.target.value)}>
              <FaPlus />
            </button>
          </div>
        </div>
      </div>
        )}
      {/*{corner === "map" && (
                <div className="upperBox box">
                  <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3175.760751148537!2d9.873545676461717!3d37.25338354202193!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12e31fb9239ec801%3A0xfba7de057b59781f!2sZarzouna!5e0!3m2!1sfr!2stn!4v1722033120189!5m2!1sfr!2stn" width="100%" height="400" style={{borderRadius: "12px", border: "0"}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
              </div>
      )}
              */}
      {isSelectedIndex &&(
        <div className="upperBox box">
          <h3>Catégorie & Entrepôt</h3>
          <div className="contentBox">
            <h4>Catégorie</h4>
            <div className="contentItem">
            {id && (
             <select onChange={e => setIdCategorie(e.target.value)}>
             {allNamesCategories.map(categorie => (
                <option key={categorie.id_categorie} defaultValue={categorie.nom_categorie}>
                    {categorie.nom_categorie}
                </option>
             ))}
          </select>
            )}
            {!id && (
                           <select onChange={e => setIdCategorie(e.target.value)} value={id_categorie}>
                           {allNamesCategories.map(categorie => (
                              <option key={categorie.id_categorie} value={categorie.id_categorie}>
                                  {categorie.nom_categorie}
                              </option>
                           ))}
                        </select>
            )}
              {/*<select>
                <option value={id_categorie} onChange={e => setIdCategorie(e.target.value)}>Categorie 1</option>
                <option value={id_categorie} onChange={e => setIdCategorie(e.target.value)}>Categorie 2</option>
                <option value="mercedes">Categorie 3</option>
                <option value="audi">Categorie 4</option>
              </select> */}
            </div>
          </div>
          <div className="contentBox">
            <h4>Entrepôt</h4>
            <div className="contentItem">
            <select onChange={e => setIdEntrepot(e.target.value)}>
                {allNamesWarehouses.map(warehouse => (
                   <option key={warehouse.id_entrepot} value={warehouse.nom_entrepot}>
                       {warehouse.nom_entrepot}
                   </option>
                ))}
             </select>

            {/*}  <select name="cars" id="cars">
                <option value={id_entrepot} onChange={e => setIdEntrepot(e.target.value)}>Entrepot 1</option>
                <option value="saab">Entrepot 2</option>
                <option value="mercedes">Entrepot 3</option>
                <option value="audi">Entrepot 4</option>
              </select> */}
            </div>
          </div>
        </div>
        )}
        <div className="optionBtnHolder">
            <div className="optBtn">
            <button className="rejectBtn" onClick={(e)=> {
              e.preventDefault()
              navigate(-1)
            }}>Annuler</button>
            {pageType === "modifyProdById" && (
            <button  type="submit"  onClick={modifierProd}>{loadingModified ? "loading...": "modifier"}</button>
            )}
            {pageType === "modifyCatById" && (
            <button  type="submit"  onClick={modifierCategorie}>{loadingModified ? "loading...": "modifier"}</button>
            )}
            {pageType === "modifyEntById" && (
            <button  type="submit"  onClick={modifierEntrepot}>{loadingModified ? "loading...": "modifier"}</button>
            )}
            {pageType === "confirmProduct" && (
            <button  type="submit" disabled={loading} onClick={onSubmitFormProd}>{loading ? "loading...": "confirmer"}</button>
            )}
            {pageType === "confirmCategory" && (
            <button  type="submit" disabled={loading} onClick={onSubmitFormCat}>{loading ? "loading...": "confirmer"}</button>
            )}
            {pageType === "confirmWarehouse" && (
            <button  type="submit" disabled={loading} onClick={onSubmitFormEnt}>{loading ? "loading...": "confirmer"}</button>
            )}
            </div>
        </div>
      </div>
    </div>
    </form>
  );
};

export default AddProduct;