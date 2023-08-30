import React from 'react'
import EditProductForm from './(components)/form'

const EditProduct = ({params}: {params: {productId: string}}) => {
  const {productId} = params
  console.log(productId)
  return (
    <div>
        <EditProductForm productId={productId} />
    </div>
  )
}

export default EditProduct