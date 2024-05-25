import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

import { userState } from "../../recoil/atoms";
import { useOrder } from "../../hooks/useOrder";
import { Order } from "../../db/types";

export function UserOrderTable() {
  const { getUserOrders, orders, deleteOrder, updateOrder } = useOrder();
  const user = useRecoilValue(userState);
  const [editingOrderId, setEditingOrderId] = useState<string | null>(null);
  const [updatedOrderData, setUpdatedOrderData] = useState<Partial<Order>>({});

  useEffect(() => {
    if (user) {
      getUserOrders(user.id);
    }
  }, [user, getUserOrders]);

  const handleEdit = (order: Order) => {
    setEditingOrderId(order.id);
    setUpdatedOrderData(order);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
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

  return (
    <div className="flex items-center justify-center flex-col gap-5">
      <h2 className="font-bold text-2xl">User Orders</h2>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Order ID
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
            {orders.map((order: Order) => (
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
                <td className="px-6 py-4">
                  {editingOrderId === order.id ? (
                    <input
                      type="text"
                      name="pickupLocation"
                      value={updatedOrderData.pickupLocation || ""}
                      onChange={handleChange}
                      className="bg-gray-200 dark:bg-gray-700 rounded-md"
                    />
                  ) : (
                    order.pickupLocation
                  )}
                </td>
                <td className="px-6 py-4">
                  {editingOrderId === order.id ? (
                    <input
                      type="text"
                      name="dropoffLocation"
                      value={updatedOrderData.dropoffLocation || ""}
                      onChange={handleChange}
                      className="bg-gray-200 dark:bg-gray-700 rounded-md"
                    />
                  ) : (
                    order.dropoffLocation
                  )}
                </td>
                <td className="px-6 py-4">
                  {editingOrderId === order.id ? (
                    <input
                      type="text"
                      name="receiverPhoneNo"
                      value={updatedOrderData.receiverPhoneNo || ""}
                      onChange={handleChange}
                      className="bg-gray-200 dark:bg-gray-700 rounded-md"
                    />
                  ) : (
                    order.receiverPhoneNo
                  )}
                </td>
                <td className="px-6 py-4">
                  <a
                    href="#"
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    {order.status}
                  </a>
                </td>
                <td className="px-6 py-4 flex gap-4">
                  {editingOrderId === order.id ? (
                    <button
                      onClick={() => handleSave(order.id)}
                      className="bg-green-400 px-2 py-1 rounded-sm font-semibold text-white text-md"
                    >
                      Save
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={() => handleEdit(order)}
                        className="bg-blue-400 px-2 py-1 rounded-sm font-semibold text-white text-md"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteOrder(order.id)}
                        className="bg-red-400 px-2 py-1 rounded-sm font-semibold text-white text-md"
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
