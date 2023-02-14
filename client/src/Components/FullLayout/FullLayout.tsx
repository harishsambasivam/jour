import { Outlet } from "react-router-dom";
import CopyRight from "../CopyRight/CopyRight";

const BottomNav = () => (
  <>
    <div className="flex flex-row-reverse ">
      <div className="w-screen h-screen mx-auto p-4 flex flex-col justify-center items-center">
        <Outlet />
      </div>
      <div className="bg-gray-50 fixed bottom-0 overflow-visible w-full shadow-inner p-4 flex flex-row justify-center items-center">
        <CopyRight />
      </div>
    </div>
  </>
);

export default BottomNav;
