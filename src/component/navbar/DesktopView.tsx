import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import store, { RootState } from "../../store";
import { Link, NavLink, useNavigate } from "react-router-dom";
import useClickOutside from "../../hooks/useClickOutside";
import useForLocation from "../../hooks/useForLocation";
import extractFirstName from "../../util/actions/extractFirstName";

import {
  onDashboardCloseHandler,
  onLeadsCloseHandler,
  onLeadsOpenHandler,
  onMobileMenuOpenHandler,
  onProfileCloseHandler,
  onToggleProfileHandler,
} from "../../store/ui/ui-slice";

import {
  logoutUser,
  resetAuth,
} from "../../store/auth/auth-Slice";

import {
  clearAllBarNotifications,
  removeBarNotification,
} from "../../store/notifications/notification-slice";

import { IoMdNotifications } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { DropdownItem } from "../../data/navbar-data";


interface Props {
  leadsItems: DropdownItem[];
  profileItems: DropdownItem[];
}

const DesktopView: React.FC<Props> = ({ leadsItems, profileItems }) => {
  const navigate = useNavigate();
  const dispatch = store.dispatch;
  const desktopRef = useRef(null);

  const { currentURL } = useForLocation();
  const [notifcationMenu, setNotificationMenu] = useState(false);

  const { isProfileOpen, isLeadsOpen } = useSelector((state: RootState) => state.ui);
  const { userDetails } = useSelector((state: RootState) => state.getLoggedInUserData);
  const notifications = useSelector((state: RootState) => state.notification.barList);

  const roles = userDetails?.authority || [];

  useClickOutside(
    [desktopRef],
    [
      () => dispatch(onLeadsCloseHandler()),
      () => dispatch(onDashboardCloseHandler()),
      () => dispatch(onProfileCloseHandler()),
    ]
  );

  const handleProfileDropdown = (label: string) => {
    dispatch(onProfileCloseHandler());
    if (label === "Log out") {
      dispatch(logoutUser({ email: userDetails.email, navigate }));
      dispatch(resetAuth());
    }
  };

  const visibleLeadsItems = leadsItems.filter(
    (item) => !item.roles || item.roles.some((role) => roles.includes(role))
  );


  return (
    <header ref={desktopRef} className="__header_gradient px-3 sm:px-6 flex justify-between items-center">
      <Link to="/" onClick={() => dispatch(onLeadsCloseHandler(), onDashboardCloseHandler(), onProfileCloseHandler())}>
        <img src="/logo.png" alt="Company Logo" className="h-16" />
      </Link>

      <div className="flex gap-x-7 items-center">
        <nav className="hidden md:flex gap-x-7">
          <div className="relative">
            <div
              className="text-[#545454] font-medium flex items-center gap-x-1 cursor-pointer"
              onClick={() => {
                dispatch(onLeadsOpenHandler());
                dispatch(onDashboardCloseHandler());
                dispatch(onProfileCloseHandler());
              }}
            >
              <span className={leadsItems.some((item) => item.href === currentURL) ? "underline underline-offset-2" : ""}>
                LEADS
              </span>
              <i className={`fa fa-chevron-down w-3 transition-all duration-500 mt-[2px] ${isLeadsOpen ? "rotate-180" : ""}`} />
            </div>

            {isLeadsOpen && (
              <div className="absolute left-0 top-[42px] z-50 min-w-[140px] bg-gray-100 border border-gray-200 shadow-lg rounded">
                {visibleLeadsItems.map((item, index) => (
                  <NavLink
                    key={index}
                    to={item.href}
                    onClick={() => dispatch(onLeadsCloseHandler())}
                    className={({ isActive }) =>
                      `block text-sm px-4 py-2 text-gray-700 font-medium border-b cursor-pointer text-nowrap hover:bg-white ${
                        isActive ? "underline underline-offset-2" : ""
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}

              </div>
            )}
          </div>
        </nav>

        <div className="flex gap-x-2 sm:gap-x-7 items-center">
          <span className="text-sm sm:text-base text-[#545454] font-medium">
            {userDetails?.fullName ? `Welcome ${extractFirstName(userDetails.fullName)}` : "loading..."}
          </span>

          <div
            className="bg-[#d581a1] text-[#fad2e0] w-[30px] h-[30px] rounded-full hidden md:flex justify-center items-center cursor-pointer relative"
            onClick={() => {
              dispatch(onToggleProfileHandler());
              dispatch(onDashboardCloseHandler());
              dispatch(onLeadsCloseHandler());
            }}
          >
            <i className="fas fa-user"></i>

            {isProfileOpen && (
              <div className="absolute top-[45px] -right-4 z-50 min-w-[140px] bg-blue-100 border border-gray-200 shadow-lg rounded">
                {profileItems.map((item, index) => (
                  <Link
                    key={index}
                    to={item.href}
                    onClick={() => handleProfileDropdown(item.label)}
                    className="block text-sm px-4 py-2 text-gray-700 font-medium border-b cursor-pointer hover:bg-white"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <i
            className="fa fa-bars text-xl cursor-pointer block md:hidden"
            onClick={() => dispatch(onMobileMenuOpenHandler())}
          />

          <div className="relative">
            <IoMdNotifications
              className="text-3xl text-blue-500 cursor-pointer"
              onClick={() => setNotificationMenu((prev) => !prev)}
            />
            {notifications.length > 0 && (
              <p className="text-xs absolute top-2 right-0">{notifications.length}</p>
            )}
            {notifcationMenu && (
              <div className="absolute top-16 right-0 w-[420px] h-screen bg-white shadow-lg rounded-lg p-6 overflow-y-auto pb-20 border border-gray-200">
                <div className="flex items-center justify-between mb-4 border-b pb-3 border-gray-300">
                  <h2 className="text-xl font-semibold text-blue-600">Notifications</h2>
                  {notifications.length > 0 && (
                    <button
                      onClick={() => dispatch(clearAllBarNotifications())}
                      className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Clear All
                    </button>
                  )}
                </div>
                {notifications.length === 0 ? (
                  <div className="text-gray-500 text-center mt-12">No notifications to show</div>
                ) : (
                  <div className="space-y-4">
                    {notifications.map((msg) => (
                      <div
                        key={msg.id}
                        className="bg-white rounded-lg shadow-md p-4 border border-gray-100 hover:shadow-lg transition-all duration-300 relative"
                      >
                        <button
                          onClick={() => dispatch(removeBarNotification(msg.id))}
                          className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
                        >
                          <IoClose className="text-lg" />
                        </button>
                        <div className="text-gray-800 text-sm pr-8">{msg.body}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default DesktopView;
