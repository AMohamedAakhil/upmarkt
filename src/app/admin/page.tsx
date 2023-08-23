import React from 'react'
import { api } from "@/trpc/server";

const Admin = () => {
    const createNewOrder = async () => {
        try {
          const result = await api.order.create.mutate({
            userId: "29292",
            status: "Created",
            total: 100,
            addressId: "Lol"
          })
          console.log("New order created:", result);


        } catch (error) {
          console.error("Error creating new order:", error);
        }
      };

      void createNewOrder();

  return (
    <div>Admin</div>
  )
}

export default Admin