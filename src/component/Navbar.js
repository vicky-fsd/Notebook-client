import { Link, useLocation, useNavigate } from "react-router-dom";
import noteContext from "../context/notes/noteContext";
import { FaHome, FaInfoCircle } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { MdNoteAdd } from "react-icons/md";
import { useContext } from "react";
import logo from "../asset/logo.png";
import onlyLogo from "../asset/onlyLogo.png";

const Navbar = () => {
  const context = useContext(noteContext)
  const { setAddModalOpen } = context;
  const location = useLocation();
  const navigate = useNavigate();
  const navItems = [
    {
      name: "Home",
      logo: <FaHome />,
      path: "/",
    },
    {
      name: "Add Note",
      logo: <MdNoteAdd />,
      path: "/",
    },
    {
      name: "About",
      logo: <FaInfoCircle />,
      path: "/about",
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <div className="flex justify-between items-center h-16 bg-white text-black relative shadow-sm px-2 sm:px-8 md:px-16">
      <Link to="/">
        <span className="font-bold text-xl tracking-tight hidden sm:block">
          <img src={logo} alt="CloudBook" className="w-40" />
        </span>
        <span className="font-bold text-xl tracking-tight sm:hidden">
          <img src={onlyLogo} alt="CloudBook" className="w-10" />
        </span>
      </Link>
      <div className="sm:block hidden">
        <div className="flex justify-between items-center">
          {navItems.map((item) => (
            <Link
              to={item.path}
              key={item.name}
              onClick={() => {
                if (item.name === "Add Note") {
                  setAddModalOpen(true);
                }
              }}
              className={`${
                location.pathname === item.path
                  ? "text-gray-900"
                  : "text-gray-500"
              } hover:text-gray-900 font-medium pr-4 text-md flex item-center`}
            >
              <span className="text-2xl mr-1">{item.logo}</span>
              <span>{item.name}</span>
            </Link>
          ))}
          {localStorage.getItem("token") && (
            <button
              onClick={handleLogout}
              className="inline-flex text-center items-center bg-gray-200 border-0 py-1 pl-1 pr-3 focus:outline-none hover:bg-gray-300 rounded text-md font-medium"
            >
              <BiLogOut className="text-2xl mr-1" />
              Logout
            </button>
          )}
        </div>
      </div>
      <div className="block sm:hidden">
        <div className="flex justify-between items-center">
          {navItems.map((item) => (
            <Link
              to={item.path}
              key={item.name}
              onClick={() => {
                if (item.name === "Add Note") {
                  setAddModalOpen(true);
                }
              }}
              className={`${
                location.pathname === item.path
                  ? "text-gray-900"
                  : "text-gray-500"
              } hover:text-gray-900 font-medium pr-4 text-xl`}
            >
              {item.logo}
            </Link>
          ))}
          {localStorage.getItem("token") && (
            <button
              onClick={handleLogout}
              className="inline-flex items-center 0 text-2xl"
            >
              <BiLogOut />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
