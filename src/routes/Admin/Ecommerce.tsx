import { ProductsTable } from "../../components/Admin/ProductsTable";
import { SideBar } from "../../components/Admin/SideBar";

export function Ecommerce() {
  return (
    <>
      <div className=" flex h-screen overflow-hidden">
        <SideBar />

        <div className=" w-screen flex justify-center align-middle ">
          <ProductsTable />
        </div>
      </div>
    </>
  );
}
