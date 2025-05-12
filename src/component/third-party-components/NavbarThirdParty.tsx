import { useSelector } from "react-redux";
import store, { RootState } from "../../store";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser, resetAuth } from "../../store/auth/auth-Slice";

const NavbarThirdParty: React.FC = () => {
   const navigate = useNavigate();
   const dispatch = store.dispatch;
   const { userDetails:{email} } = useSelector((state: RootState) => state.getLoggedInUserData);

   const onLogout=()=>{
    dispatch(logoutUser({ email, navigate }));
    dispatch(resetAuth());
   }
  return (
    <header className="__header_gradient  px-3 sm:px-6 flex justify-between items-center ">
      <Link to={"/"}>
        <img src="/logo.png" alt="Company Logo" className="h-16" />
      </Link>
      <div className="flex gap-x-7 items-center">
        <nav className="hidden md:flex gap-x-7"></nav>
      </div>
      <div className="flex gap-x-2 sm:gap-x-7 items-center cursor-pointer" onClick={onLogout}>
        <button>Logout</button>
      </div>
    </header>
  );
};

export default NavbarThirdParty;
