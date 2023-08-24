import { Button } from '@/ui/button'
import React from 'react'
import Link from 'next/link'

const Products = () => {
      return (
    <div className="p-5 flex w-full">
        <h1 className="text-xl mb-5">Products</h1>
        <Button>
            <Link href="/admin/products/addproduct">Add Product</Link>
        </Button>
    </div>
  )
}

export default Products