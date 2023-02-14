import { Link, Outlet } from "react-router-dom";

const BottomNav = () => (
  <div className="flex flex-row-reverse h-screen">
    <div className="bg-white text-black p-3 max-sm:w-full md:w-4/5">
      <Outlet />
    </div>
    <div className="bg-gray-50 fixed bottom-0 overflow-visible max-sm:w-full md:w-1/5 shadow-inner p-4 flex flex-row md:flex-col md:px-10 md:top-0 md:relative">
      <div className="flex flex-1 justify-center text-xs font-bold text-center md:py-4 md:flex-none md:justify-start">
        <Link to={`/`} className="md:inline-flex md:gap-2">
          <svg
            className="w-6 h-6 inline-block"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            ></path>
          </svg>
          <span className="block text-xs pt-1">Home</span>
        </Link>
      </div>

      <div className="flex flex-1 justify-center font-bold text-center md:py-4 md:order-5 md:flex-none md:justify-start">
        <Link to={`/`} className="md:inline-flex md:gap-2">
          <svg
            className="w-12 h-12 inline-block md:w-6 md:h-6 md:inline-block"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <span className="hidden md:block text-xs pt-1">Add</span>
        </Link>
      </div>
      <div className="flex flex-1 justify-center text-xs font-bold text-center md:py-4 md:flex-none md:justify-start">
        <Link to={`/settings`} className="md:inline-flex md:gap-2">
          <svg
            className="w-6 h-6 inline-block"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            ></path>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            ></path>
          </svg>
          <span className="block text-xs pt-1">Settings</span>
        </Link>
      </div>
    </div>
  </div>
);

export default BottomNav;
