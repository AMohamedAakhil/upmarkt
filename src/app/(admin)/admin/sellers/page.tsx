import React from 'react'
import SellerClient from './(client)/SellerClient'
import { api } from '@/trpc/server';

const Sellers = async () => {
  const data = await api.seller.getSellers.query();

  return (
    <>
      <SellerClient data={data} />
    </>
  )
}

export default Sellers