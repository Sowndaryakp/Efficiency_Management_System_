// src/components/Sidebar.jsx
import React, { useState } from 'react';
import { Home, Plus, BarChart, Search, Upload, FileText, Users, BarChart2, Bell, Menu, ChevronRight, Eye, Files, FileClock, Award, Handshake, CalendarClock, FileStack, ChartNoAxesCombined, ChevronDown, UserRoundPlus, Hourglass } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import buhlerlogo from '../assets/buhlerpvt.svg';
import buhlerlogo1 from '../assets/buh.png';
import { useUser } from './UserContext';
import '../assets/css/sidebar.css'

const Logo = ({ isCollapsed }) => (
  <div className={`flex items-center px-4 py-5 ${isCollapsed ? 'justify-center' : ''}`}>
    <div className="h-8 w-8 rounded-full bg-gradient-to-r from-white to-white flex items-center justify-center text-white font-bold text-xl">
      <img
        src={buhlerlogo1}
        alt="Logo"
        style={{
          height: '100%',
          maxWidth: '100%',
          objectFit: 'contain',
        }}
      />
    </div>
    {!isCollapsed && (
      <span className="ml-2 text-white text-lg font-semibold">
        <div
          className="logo"
          style={{
            height: '50px',
            width: '90',
            margin: '1px',
            textAlign: 'center',
          }}
        >
          <img
            src={buhlerlogo1}
            alt="Logo"
            style={{
              height: '100%',
              maxWidth: '100%',
              objectFit: 'contain',
            }}
          />
        </div>
      </span>
    )}
  </div>
);

const MenuItem = ({ icon: Icon, label, onClick, isActive, hasNotification, notificationCount, isCollapsed, children }) => (
  <div className={`flex flex-col`}>
    <div
      className={`flex items-center px-4 py-2 ${isActive ? 'bg-persian-green-700' : 'hover:bg-big-stone-600'} rounded-lg cursor-pointer`}
      onClick={onClick}
    >
      <Icon size={20} className={`${isActive ? 'text-white' : 'text-persian-green-500'}`} />
      {!isCollapsed && (
        <>
          <span className={`ml-3 ${isActive ? 'text-white' : 'text-persian-green-900'}`}>{label}</span>
          {hasNotification && (
            <div className="ml-auto bg-green-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {notificationCount}
            </div>
          )}
        </>
      )}
    </div>
    {children && (
      <div className={`ml-4 ${isActive ? 'block' : 'hidden'}`}>
        {children}
      </div>
    )}
  </div>
);

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [activeItem, setActiveItem] = useState('admin_dashboard');
  const [isCasualLabourOpen, setIsCasualLabourOpen] = useState(false); // New state for Casual Labour dropdown
  const navigate = useNavigate();
  const { user } = useUser();

  const toggleSidebar = () => {
    setIsCollapsed((prevState) => !prevState);
  };

  const handleMenuClick = (path) => {
    setActiveItem(path);
    navigate(`/${path}`);
    setIsCollapsed(true);
  };

  const handleCasualLabourClick = () => {
    setIsCasualLabourOpen((prev) => !prev); // Toggle Casual Labour dropdown
  };

  return (
    <div
      className={`sidebar-shadow bg-white text-persian-green-950 font-bold h-full flex flex-col transition-all duration-300 ease-in-out ${isCollapsed ? 'w-16' : 'w-64'}`}
    >
      <div className="flex justify-between items-center p-4">
        <button onClick={toggleSidebar} className="text-persian-green focus:outline-none">
          {isCollapsed ? <ChevronRight size={24} /> : <Menu size={24} />}
        </button>
      </div>
      <div className="flex-grow overflow-y-auto">
        {user.role === 'Admin' && (
          <>
            <MenuItem 
              icon={Home} 
              label="Overview" 
              isActive={activeItem === 'admin_dashboard'}
              onClick={() => handleMenuClick('admin/dashboard')} 
              isCollapsed={isCollapsed} 
            />
            <MenuItem 
              icon={Users} 
              label={
                <span className="flex items-center">
                  <span className={`ml-3 ${isCasualLabourOpen ? 'text-white' : 'text-persian-green-300'}`}>Employee Management</span>
                  <ChevronDown size={16} className={`ml-1 ${isCasualLabourOpen ? 'text-white' : 'text-persian-green-300'}`} />
                </span>
              } 
              isActive={activeItem === 'casual_labour' || isCasualLabourOpen}
              onClick={handleCasualLabourClick} 
              isCollapsed={isCollapsed} 
            >
              <MenuItem 
              icon={UserRoundPlus} 
              label="Add Fulltime Employees" 
              isActive={activeItem === 'add_employee_management'}
              onClick={() => handleMenuClick('admin/employee_management')} 
              isCollapsed={isCollapsed} 
            />
               {/* <MenuItem 
                icon={Plus} 
                label="Add Job Card Entry" 
                isActive={activeItem === 'job_card_entry'}
                onClick={() => handleMenuClick('admin/casual_labour_job_card_entry')} 
                isCollapsed={isCollapsed} 
              /> */}
               <MenuItem 
              icon={Plus} 
              label="Job Card Entry" 
              isActive={activeItem === 'user_job_card_entry'}
              onClick={() => handleMenuClick('admin/user_job_card_entry')} 
              isCollapsed={isCollapsed} 
            />
            </MenuItem>
            <MenuItem 
              icon={Eye} 
              label="View All Job Cards" 
              isActive={activeItem === 'view_all_job_cards'}
              onClick={() => handleMenuClick('admin/view_all_job_cards')} 
              isCollapsed={isCollapsed} 
            />
            <MenuItem 
              icon={Files} 
              label="Activity Code Sheet" 
              isActive={activeItem === 'activity_code_sheet'}
              onClick={() => handleMenuClick('admin/activity_code_sheet')} 
              isCollapsed={isCollapsed} 
            />
            <MenuItem 
              icon={FileClock} 
              label="Efficiency Computation" 
              isActive={activeItem === 'efficiency_computation'}
              onClick={() => handleMenuClick('admin/efficiency_computation')} 
              isCollapsed={isCollapsed} 
            />
            <MenuItem 
              icon={Award} 
              label="Incentives" 
              isActive={activeItem === 'incentives'}
              onClick={() => handleMenuClick('admin/incentives')} 
              isCollapsed={isCollapsed} 
            />
            <MenuItem 
              icon={Handshake} 
              label="Employee Efficiency" 
              isActive={activeItem === 'employee_efficiency'}
              onClick={() => handleMenuClick('admin/employee_efficiency')} 
              isCollapsed={isCollapsed} 
            />
            <MenuItem 
                icon={Hourglass} 
                label="STD Hrs" 
                isActive={activeItem === 'std_hrs'}
                onClick={() => handleMenuClick('admin/std_hrs')} 
                isCollapsed={isCollapsed} 
              />
            <MenuItem 
              icon={FileStack} 
              label="Reports" 
              isActive={activeItem === 'reports'}
              onClick={() => handleMenuClick('admin/reports')} 
              isCollapsed={isCollapsed} 
            />
            <MenuItem 
                icon={ChartNoAxesCombined} 
                label="Analytics" 
                isActive={activeItem === 'analytics'}
                onClick={() => handleMenuClick('admin/analytics')} 
                isCollapsed={isCollapsed} 
              />
          </>
        )}
        {user.role === 'User' && (
          <>
            <MenuItem 
              icon={Home} 
              label="User Dashboard" 
              isActive={activeItem === 'user_dashboard'}
              onClick={() => handleMenuClick('user/dashboard')} 
              isCollapsed={isCollapsed} 
            />
            <MenuItem 
              icon={Users} 
              label="Job Card Entry" 
              isActive={activeItem === 'user_job_card_entry'}
              onClick={() => handleMenuClick('user/user_job_card_entry')} 
              isCollapsed={isCollapsed} 
            />
            <MenuItem 
              icon={FileText} 
              label="View User Job Cards" 
              isActive={activeItem === 'view_user_job_cards'}
              onClick={() => handleMenuClick('user/view_user_job_cards')} 
              isCollapsed={isCollapsed} 
            />
          </>
        )}
      </div>
      <Logo isCollapsed={isCollapsed} />
    </div>
  );
};

export default Sidebar;