import React, { useState } from "react";
import { IoMdMenu } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { PiStudent } from "react-icons/pi";
import { IoSettingsSharp } from "react-icons/io5";
import { MdExitToApp } from "react-icons/md"; // Logout icon

const TeacherSidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false); // State to toggle the logout dialog
  const location = useLocation();
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const isLinkActive = (path) => location.pathname === path;

  const handleLogout = () => {
    localStorage.removeItem("token"); 
    localStorage.removeItem("user"); 
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    localStorage.removeItem("studentId");
    localStorage.removeItem("teacherId");
    localStorage.removeItem("uniqueId");
    // setUser(null); 
    navigate("/login"); 
    setIsDialogOpen(false); 
  };

  return (
    <div
      className={`flex flex-col ${isOpen ? "w-64" : "w-20"} h-screen bg-gradient-to-br from-blue-400 to-indigo-500
 text-white transition-all duration-300 shadow-lg`}
    >
      {/* Sidebar Header */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-blue-300">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-full bg-white text-blue-600 cursor-pointer hover:shadow-md transition-transform hover:scale-105"
        >
          <IoMdMenu size={28} />
        </button>
        {isOpen && <h1 className="text-xl font-bold">Teacher Menu</h1>}
      </div>

      {/* Sidebar Links */}
      <div className="flex flex-col mt-6 space-y-2 px-2">
        {/* Sidebar Link Component */}
        {[
          {
            to: "/dashboard-teacher/account",
            icon: <CgProfile size={28} />,
            label: "Account",
          },
          {
            to: "/dashboard-teacher/allstudents",
            icon: <PiStudent size={28} />,
            label: "Students",
          },
          {
            to: "/dashboard-teacher/setting",
            icon: <IoSettingsSharp size={28} />,
            label: "Setting",
          },
          {
            to: "#",
            icon: <MdExitToApp size={28} />,
            label: "Logout",
            onClick: () => setIsDialogOpen(true), // Open dialog when logout is clicked
          },
        ].map((link, index) => (
          <NavLink
            key={index}
            to={link.to}
            onClick={link.onClick}
            className={`flex items-center gap-4 px-3 py-2 rounded-lg ${
              isLinkActive(link.to)
                ? "bg-white text-blue-600 shadow-md"
                : "hover:bg-white hover:text-blue-600 transition-all"
            }`}
          >
            <div
              className={`p-2 rounded-full shadow-md ${
                isLinkActive(link.to)
                  ? "bg-blue-300 text-white"
                  : "bg-white text-blue-600"
              }`}
            >
              {link.icon}
            </div>
            {isOpen && <span className="text-lg font-semibold">{link.label}</span>}
          </NavLink>
        ))}
      </div>

      {/* Logout Confirmation Dialog */}
      {isDialogOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
  <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-8 rounded-2xl shadow-2xl max-w-md w-full transform transition-all duration-500 scale-100 hover:scale-105">
    <h2 className="text-2xl font-semibold text-center text-white mb-6">
      Are you sure you want to log out?
    </h2>
    <div className="flex justify-around space-x-4">
      <button
        onClick={() => setIsDialogOpen(false)} // Close dialog without logging out
        className="px-6 py-3 bg-white text-gray-700 rounded-lg shadow-md hover:bg-gray-200 transition-all duration-300 ease-in-out transform hover:scale-105"
      >
        Cancel
      </button>
      <button
        onClick={handleLogout}
        className="px-6 py-3 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition-all duration-300 ease-in-out transform hover:scale-105"
      >
        Yes, Log Out
      </button>
    </div>
  </div>
</div>

      )}
    </div>
  );
};

export default TeacherSidebar;
