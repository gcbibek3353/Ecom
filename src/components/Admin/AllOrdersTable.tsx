import { useEffect, useState } from "react";
import { useOrder } from "../../hooks/useOrder";
import { Order } from "../../db/types";

export function AllOrdersTable() {
  const { getAllOrders, orders, updateOrder, deleteOrder } = useOrder();
  const [editingOrderId, setEditingOrderId] = useState<string | null>(null);
  const [updatedOrderData, setUpdatedOrderData] = useState<Partial<Order>>({});

  useEffect(() => {
    getAllOrders();
  }, [getAllOrders]);

  const handleEdit = (order: Order) => {
    setEditingOrderId(order.id);
    setUpdatedOrderData(order);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setUpdatedOrderData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = (orderId: string) => {
    updateOrder(orderId, updatedOrderData);
    setEditingOrderId(null);
  };

  if (!orders) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex items-center justify-center flex-col gap-5">
      <h2 className="font-bold text-2xl">All Orders</h2>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Order ID
              </th>
              <th scope="col" className="px-6 py-3">
                User Name
              </th>
              <th scope="col" className="px-6 py-3">
                User Email
              </th>
              <th scope="col" className="px-6 py-3">
                Pickup Location
              </th>
              <th scope="col" className="px-6 py-3">
                Dropoff Location
              </th>
              <th scope="col" className="px-6 py-3">
                Receiver Phone No.
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {order.id}
                </th>
                <td className="px-6 py-4">{order.user?.name}</td>
                <td className="px-6 py-4">{order.user?.email}</td>
                <td className="px-6 py-4">{order.pickupLocation}</td>
                <td className="px-6 py-4">{order.dropoffLocation}</td>
                <td className="px-6 py-4">{order.receiverPhoneNo}</td>
                <td className="px-6 py-4">
                  {editingOrderId === order.id ? (
                    <select
                      name="status"
                      value={updatedOrderData.status || order.status}
                      onChange={handleChange}
                      className="px-2 py-1 rounded"
                    >
                      <option value="pending">Pending</option>
                      <option value="in-progress">In-progress</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  ) : (
                    order.status
                  )}
                </td>
                <td className="px-6 py-4">
                  {editingOrderId === order.id ? (
                    <button
                      onClick={() => handleSave(order.id)}
                      className="bg-green-400 px-2 py-1 rounded"
                    >
                      Save
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={() => handleEdit(order)}
                        className="bg-blue-400 px-2 py-1 rounded mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteOrder(order.id)}
                        className="bg-red-400 px-2 py-1 rounded"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
