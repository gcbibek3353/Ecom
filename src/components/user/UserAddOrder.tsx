import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";

import { Order } from "../../db/types";
import { userState } from "../../recoil/atoms";
import { useOrder } from "../../hooks/useOrder";

const UserAddOrder: React.FC = () => {
  const navigate = useNavigate();
  const { addOrder } = useOrder();
  const user = useRecoilValue(userState);
  const [formData, setFormData] = useState<Omit<Order, "id" | "userId">>({
    pickupLocation: "",
    dropoffLocation: "",
    receiverPhoneNo: "",
    status: "pending",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!user) {
        throw new Error("User not logged in");
      }
      const userId = user.id;
      const addedOrder = await addOrder(userId, formData);
      console.log("Order added:", addedOrder);
      setFormData({
        pickupLocation: "",
        dropoffLocation: "",
        receiverPhoneNo: "",
        status: "pending",
      });
      navigate("/dashboard"); // Adjust the route as needed
    } catch (error) {
      console.error("Error adding order:", error);
    }
  };

  return (
    <div className="bg-slate-100 w-full flex items-center justify-center">
      <div className="flex flex-col gap-5 bg-white shadow-lg p-5 rounded-md items-center justify-center w-2/3 ">
        <h2 className="font-bold text-2xl text-orange-600">Add Order</h2>
        <form
          onSubmit={handleSubmit}
          className="flex items-center justify-center flex-col gap-5 w-2/3"
        >
          <div className="flex justify-center items-center w-full">
            <label htmlFor="pickupLocation" className="font-semibold w-1/3">
              Pickup Location:
            </label>
            <input
              type="text"
              id="pickupLocation"
              name="pickupLocation"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600  w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              // className="border-zinc-600 border-2 rounded-md m-3"
              value={formData.pickupLocation}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex items-center justify-center w-full">
            <label htmlFor="dropoffLocation" className="font-semibold  w-1/3">
              Dropoff Location:
            </label>
            <input
              type="text"
              id="dropoffLocation"
              name="dropoffLocation"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              // className="border-zinc-600 border-2 rounded-md m-3"
              value={formData.dropoffLocation}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex items-center justify-center w-full">
            <label htmlFor="receiverPhoneNo" className="font-semibold  w-1/3">
              Receiver Phone No:
            </label>
            <input
              type="text"
              id="receiverPhoneNo"
              name="receiverPhoneNo"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              // className="border-zinc-600 border-2 rounded-md m-3"
              value={formData.receiverPhoneNo}
              onChange={handleInputChange}
            />
          </div>
          <button
            type="submit"
            className="bg-orange-600 px-2 py-1 rounded-md font-semibold text-white text-md"
          >
            Add Order
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserAddOrder;
