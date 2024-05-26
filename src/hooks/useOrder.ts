import { useRecoilState } from 'recoil';
import { db } from '../db/firebase';
import { orderState } from '../recoil/atoms';
import { Order, User } from '../db/types';
import { doc, runTransaction, arrayUnion, getDocs, where, collection, query, getDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';

export const useOrder = () => {
  const [orders, setOrders] = useRecoilState(orderState);

  const addOrder = async (userId: string, order: Omit<Order, 'userId' | 'id'>): Promise<void> => {
    const userRef = doc(db, 'users', userId);
    const orderRef = doc(db, 'orders', `${Date.now()}-${Math.random()}`);
  
    try {
      await runTransaction(db, async (transaction) => {
        const userDoc = await transaction.get(userRef);
        if (!userDoc.exists()) {
          throw new Error('User does not exist');
        }
  
        const currentDateTime = new Date();
        const formattedDateTime = currentDateTime.toISOString(); // Example: '2024-05-26T12:00:00.000Z'
  
        const newOrder: Order = { 
          id: orderRef.id, 
          userId, 
          ...order,
          createdAt: formattedDateTime // Add createdAt field with formatted date and time
        };
  
        transaction.set(orderRef, newOrder);
        transaction.update(userRef, {
          orders: arrayUnion(orderRef.id)
        });
  
        setOrders((prevOrders) => [...prevOrders, newOrder]);
      });
  
      toast.success('Order added successfully');
    } catch (error) {
      toast.error('Error');
      console.error(error);
    }
  };

  const getUserOrders = async (userId: string): Promise<void> => {
    const q = query(collection(db, 'orders'), where('userId', '==', userId));

    try {
      const querySnapshot = await getDocs(q);
      const userOrders: Order[] = [];
      querySnapshot.forEach((doc) => {
        userOrders.push(doc.data() as Order);
      });

      setOrders(userOrders);
    } catch (error) {
      toast.error('Error');
      console.error(error);
    }
  };

  const deleteOrder = async (orderId: string): Promise<void> => {
    const orderRef = doc(db, 'orders', orderId);
  
    try {
      await runTransaction(db, async (transaction) => {
        const orderDoc = await transaction.get(orderRef);
        if (!orderDoc.exists()) {
          throw new Error('Order does not exist');
        }
  
        // Get the userId from the order
        const userId = orderDoc.data().userId;
  
        // Get the user document
        const userRef = doc(db, 'users', userId);
        const userDoc = await transaction.get(userRef);
  
        if (!userDoc.exists()) {
          throw new Error('User does not exist');
        }
  
        // Remove the orderId from the user's order array
        const userOrders = userDoc.data().orders.filter((order: string) => order !== orderId);
        transaction.update(userRef, { orders: userOrders });
  
        // Delete the order document
        transaction.delete(orderRef);
  
        // Update the local state to remove the deleted order
        setOrders((prevOrders) => prevOrders.filter(order => order.id !== orderId));
      });
  
      toast.success('Order deleted successfully');
    } catch (error) {
      toast.error('Error');
      console.error(error);
    }
  };

  const updateOrder = async (orderId: string, updatedOrderData: Partial<Order>): Promise<void> => {
    const orderRef = doc(db, 'orders', orderId);
  
    try {
      await runTransaction(db, async (transaction) => {
        const orderDoc = await transaction.get(orderRef);
        if (!orderDoc.exists()) {
          throw new Error('Order does not exist');
        }
  
        const existingOrderData = orderDoc.data() as Order;
  
        // Ensure properties are defined before assigning them
        const updatedOrder: Partial<Order> = {
          ...existingOrderData,
          ...updatedOrderData
        };
  
        transaction.update(orderRef, updatedOrder);
  
        setOrders((prevOrders) =>
          prevOrders.map((order) => (order.id === orderId ? { ...order, ...updatedOrderData } : order))
        );
      });
  
      toast.success('Order updated successfully');
    } catch (error) {
      toast.error('Error');
      console.error(error);
    }
  };

  const getAllOrders = async (): Promise<void> => {
    const q = query(collection(db, 'orders'));

    try {
      const querySnapshot = await getDocs(q);
      const allOrders: Order[] = [];
      for (const docSnap of querySnapshot.docs) {
        const orderData = docSnap.data() as Order;
        const userRef = doc(db, 'users', orderData.userId);
        const userDoc = await getDoc(userRef);
        const userData = userDoc.exists() ? (userDoc.data() as User) : null;

        allOrders.push({ ...orderData, user: userData });
      }

      setOrders(allOrders);
    
    } catch (error) {
      toast.error('Error');
      console.error(error);
    }
  };

  return { orders, addOrder, getUserOrders, getAllOrders, updateOrder, deleteOrder };
};
