import React from 'react'
import AddProduct from '../addProduct/AddProduct'

const AddWarehouse = ({corner,stringData,qte_capacite,pageType}) => {
  return (
    <AddProduct corner={corner} stringData={stringData} qte_capacite={qte_capacite} pageType={pageType}/>
  )
}

export default AddWarehouse
