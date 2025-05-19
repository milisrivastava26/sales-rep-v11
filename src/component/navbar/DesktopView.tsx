import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import store, { RootState } from "../../store";
import useForLocation from "../../hooks/useForLocation";
import useClickOutside from "../../hooks/useClickOutside";
import { Link, NavLink, useNavigate } from "react-router-dom";
import extractFirstName from "../../util/actions/extractFirstName";
import { logoutUser, resetAuth } from "../../store/auth/auth-Slice";
import { IoMdNotifications } from "react-icons/io";
import {
  onDashboardCloseHandler,
  onLeadsCloseHandler,
  onLeadsOpenHandler,
  onMobileMenuOpenHandler,
  onProfileCloseHandler,
  onToggleProfileHandler,
} from "../../store/ui/ui-slice";
import { IoClose } from "react-icons/io5";
import { clearAllBarNotifications, removeBarNotification } from "../../store/notifications/notification-slice";

interface Type {
  dashboardItems: any;
  leadsItems: any;
  profileItems: any;
}

const DesktopView: React.FC<Type> = ({ leadsItems, profileItems }) => {
  const navigate = useNavigate();
  const desktopRef: any = useRef();
  const { currentURL } = useForLocation();
  const dispatch = store.dispatch;
  const { isProfileOpen, isLeadsOpen } = useSelector(
    (state: RootState) => state.ui
  );
  const { userDetails } = useSelector(
    (state: RootState) => state.getLoggedInUserData
  );
  const { email } = userDetails;
  const notifications = useSelector((state: RootState) => state.notification.barList);

  const closeLeadsHandler = () => dispatch(onLeadsCloseHandler());
  const closeDashboardHandler = () => dispatch(onDashboardCloseHandler());
  const closeProfileHandler = () => dispatch(onProfileCloseHandler());

  const [notifcationMenu, setNotificationMenu] = useState(false);

  useClickOutside(
    [desktopRef],
    [closeLeadsHandler, closeDashboardHandler, closeProfileHandler]
  );

  const handleProfileDropdown = (label: string) => {
    dispatch(onProfileCloseHandler());
    if (label === "Log out") {
      dispatch(onProfileCloseHandler());
      dispatch(logoutUser({ email, navigate }));
      dispatch(resetAuth());
    }
  };

  const handleManageTask = () => {
    navigate("/manage-task");
    dispatch(onLeadsCloseHandler())
  }

  return (
    <header
      className="__header_gradient  px-3 sm:px-6 flex justify-between items-center "
      ref={desktopRef}
    >
      <Link
        to={"/"}
        onClick={() => {
          closeLeadsHandler();
          closeDashboardHandler();
          closeProfileHandler();
        }}
      >
        <img src="/logo.png" alt="Company Logo" className="h-16" />
      </Link>
      <div className="flex gap-x-7 items-center">
        <nav className="hidden md:flex gap-x-7">
          <div className="relative">
            <div
              className={`text-[#545454] font-medium flex items-center gap-x-1 cursor-pointer
              }`}
              onClick={() =>
                store.dispatch(
                  onLeadsOpenHandler(),
                  store.dispatch(onDashboardCloseHandler()),
                  store.dispatch(onProfileCloseHandler())
                )
              }
            >
              <span
                className={
                  leadsItems.some((item: any) => item.href === currentURL)
                    ? "underline underline-offset-2"
                    : ""
                }
              >
                LEADS
              </span>
              <i
                className={`fa fa-chevron-down w-3 inline-block ${isLeadsOpen
                  ? "transition-all duration-500 rotate-[180deg] relative mt-[2px]"
                  : "transition-all duration-500 rotate-[0deg] mt-[2px]"
                  } `}
                aria-hidden="true"
              ></i>
            </div>
            {isLeadsOpen && (
              <div className="absolute left-[-50p] top-[42px] z-50 min-w-[140px] bg-gray-100 border border-gray-200 shadow-lg rounded">
                {!userDetails?.authority?.includes("ROLE_FINANCE") &&
                  !userDetails?.authority?.includes("ROLE_AUTHORITY") && (
                    <>
                      {leadsItems
                        .slice(0, 3)
                        .map((item: any, index: number) => {
                          return (
                            <NavLink
                              to={item.href}
                              key={index}
                              onClick={() =>
                                store.dispatch(onLeadsCloseHandler())
                              }
                              className={({ isActive }) =>
                                `block text-sm px-4 py-2 text-gray-700 font-medium border-b text-nowrap cursor-pointer ${isActive ? "underline underline-offset-2" : ""
                                } ${index % 2 === 0
                                  ? "bg-gray-100 hover:bg-white"
                                  : "bg-gray-100 hover:bg-white"
                                }`
                              }
                            >
                              {item.label}
                            </NavLink>
                          );
                        })}
                    </>
                  )}

                {userDetails?.authority?.includes("ROLE_FINANCE") && (
                  <>
                    {leadsItems.slice(4, 5).map((item: any, index: number) => {
                      return (
                        <NavLink
                          to={item.href}
                          key={index}
                          onClick={() => store.dispatch(onLeadsCloseHandler())}
                          className={({ isActive }) =>
                            `block text-sm px-4 py-2 text-gray-700 font-medium border-b text-nowrap cursor-pointer ${isActive ? "underline underline-offset-2" : ""
                            } ${index % 2 === 0
                              ? "bg-gray-100 hover:bg-white"
                              : "bg-gray-100 hover:bg-white"
                            }`
                          }
                        >
                          {item.label}
                        </NavLink>
                      );
                    })}
                  </>
                )}

                {userDetails?.authority?.includes("ROLE_AUTHORITY") && (
                  <>
                    {leadsItems.slice(3, 4).map((item: any, index: number) => {
                      return (
                        <NavLink
                          to={item.href}
                          key={index}
                          onClick={() => store.dispatch(onLeadsCloseHandler())}
                          className={({ isActive }) =>
                            `block text-sm px-4 py-2 text-gray-700 font-medium border-b text-nowrap cursor-pointer ${isActive ? "underline underline-offset-2" : ""
                            } ${index % 2 === 0
                              ? "bg-gray-100 hover:bg-white"
                              : "bg-gray-100 hover:bg-white"
                            }`
                          }
                        >
                          {item.label}
                        </NavLink>
                      );
                    })}
                  </>
                )}
                {(userDetails?.authority?.includes("ROLE_MANAGER") || userDetails?.authority?.includes("ROLE_ADMIN")) && (
                  <p
                    onClick={handleManageTask}
                    className={"block text-sm px-4 py-2 text-gray-700 font-medium border-b text-nowrap cursor-pointer"
                    }
                  >
                    Manage Task
                  </p>
                )}


              </div>
            )}
          </div>
        </nav>
        <div className="flex gap-x-2 sm:gap-x-7 items-center">
          {/* Conditionally render settings icon if user has ROLE_ADMIN */}
          {/* {userDetails?.authority?.includes("ROLE_ADMIN") && (
            <Link to={"http://10.8.20.38:4176/"}>
              <RiSettings5Fill className="text-[1.3em] sm:text-[1.5em]" />
            </Link>
          )} */}
          {/* <IoHelpCircle className="text-[1.5em] sm:text-[1.7em]" /> */}
          {/* <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 1024 1024">
            <path
              fill="#374151"
              d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448s448-200.6 448-448S759.4 64 512 64m0 708c-22.1 0-40-17.9-40-40s17.9-40 40-40s40 17.9 40 40s-17.9 40-40 40m62.9-219.5a48.3 48.3 0 0 0-30.9 44.8V620c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8v-21.5c0-23.1 6.7-45.9 19.9-64.9c12.9-18.6 30.9-32.8 52.1-40.9c34-13.1 56-41.6 56-72.7c0-44.1-43.1-80-96-80s-96 35.9-96 80v7.6c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V420c0-39.3 17.2-76 48.4-103.3C430.4 290.4 470 276 512 276s81.6 14.5 111.6 40.7C654.8 344 672 380.7 672 420c0 57.8-38.1 109.8-97.1 132.5"
            />
          </svg> */}
          <span
            className={` text-sm sm:text-base ${Object.keys(userDetails).length !== 0 ? "" : ""
              } text-[#545454] font-medium`}
          >
            {Object.keys(userDetails).length !== 0
              ? " Welcome " + extractFirstName(userDetails.fullName)
              : "loading..."}
          </span>
          <div
            className="bg-[#d581a1] relative cursor-pointer text-[#fad2e0] w-[30px] h-[30px] rounded-full justify-center items-center hidden md:flex"
            onClick={() =>
              dispatch(
                onToggleProfileHandler(),
                dispatch(onDashboardCloseHandler()),
                dispatch(onLeadsCloseHandler())
              )
            }
          >
            <i className="fas fa-user"></i>
            {isProfileOpen && (
              <div className="absolute top-[45px] -right-4 z-50 min-w-[140px] bg-blue-100 border border-gray-200 shadow-lg rounded">
                {profileItems.map((item: any, index: number) => (
                  <Link
                    to={item.href}
                    key={index}
                    onClick={() => {
                      handleProfileDropdown(item.label);
                    }}
                    className={`block text-sm px-4 py-2 text-gray-700 font-medium border-b text-nowrap cursor-pointer ${index % 2 === 0
                      ? "bg-gray-100 hover:bg-white"
                      : "bg-gray-100 hover:bg-white"
                      }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <i
            onClick={() => store.dispatch(onMobileMenuOpenHandler())}
            className="fa fa-bars text-xl cursor-pointer block md:hidden"
            aria-hidden="true"
          ></i>
        </div>
        <div>
          <IoMdNotifications className="text-3xl text-blue-500 cursor-pointer relative" onClick={(() => setNotificationMenu(!notifcationMenu))} />
          <p className="text-xs absolute top-2 right-[28px]">{notifications.length}</p>
        </div>

        {notifcationMenu && <div className="absolute top-16 right-0 w-[420px] h-screen bg-white shadow-lg rounded-lg p-6 overflow-y-auto pb-20 border border-gray-200">
          <div className="flex items-center justify-between mb-4 border-b pb-3 border-gray-300">
            <h2 className="text-xl font-semibold text-blue-600">Notifications</h2>
            {notifications.length > 0 && (
              <button
                onClick={() => dispatch(clearAllBarNotifications())}
                className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors duration-150"
              >
                Clear All
              </button>
            )}
          </div>

          {notifications.length === 0 ? (
            <div className="text-gray-500 text-center mt-12">
              No notifications to show
            </div>
          ) : (
            <div className="space-y-4">
              {notifications.map((msg) => (
                <div
                  key={msg.id}
                  className="bg-white rounded-lg shadow-md p-4 border border-gray-100 hover:shadow-lg transition-all duration-300 relative"
                >
                  <button
                    onClick={() => dispatch(removeBarNotification(msg.id))}
                    className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition-colors duration-150"
                  >
                    <IoClose className="text-lg" />
                  </button>
                  <div className="text-gray-800 text-sm leading-relaxed pr-8">
                    {msg.body}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>}


      </div>
    </header>
  );
};

export default DesktopView;
