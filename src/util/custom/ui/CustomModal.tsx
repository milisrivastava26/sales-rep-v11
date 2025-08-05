import { useRef } from "react";
import { IoClose } from "react-icons/io5";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
// import useClickOutside from "../../../hooks/useClickOutside";

interface types {
  data: any;
  children: React.ReactNode;
  isShowModal: boolean | any;
  onHideModal: any;
  isMode?: string;
}

const CustomModal: React.FC<types> = ({
  children,
  data,
  isShowModal,
  onHideModal,
  isMode,
}) => {
  const { title, cancelButton, iconHeader } = data;
  const modalRef = useRef<HTMLDivElement>(null);
  const { isLoading } = useSelector((state: RootState) => state.importLeads);

  return (
    <>
      <div className={`${isShowModal ? "block" : "hidden"}`}>
        <div className="bg-[#00000075] fixed top-0 left-0 w-full h-screen z-50"></div>
        <div
          ref={modalRef}
          className="bg-white shadow-lg border border-gray-400 w-full max-w-[95%] sm:max-w-[40rem] cursor-default fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-[9999]"
        >
          <div className="flex justify-between items-center mb-4 px-4 py-4 border-b">
            <div className="flex items-center">
              <h2 className="text-xl font-bold border-gray-200">{title}</h2>
              {iconHeader && iconHeader}
            </div>

            <button
              onClick={onHideModal}
              disabled={isMode === "importLead" && isLoading === "requestHit" ? true : false}
            >
              <IoClose
                size={26}
                color="gray"
                cursor="pointer"
                // Close popup when clicked
              />
            </button>
          </div>

          {children}

          {isMode !== "callingAction" && (
            <div className="flex justify-end px-4 mb-4 ">
              <button
                disabled={isMode === "importLead" && isLoading === "requestHit" ? true : false}
                className={
                  isMode === "quickAddForm"
                    ? `absolute right-7 bottom-7 bg-gray-200 text-gray-700 px-4 py-2 rounded mr-[70px]`
                    : isMode === "advanceSearch" ? "bg-blue-600 text-white px-4 py-2 rounded mr-[70px]" :  `bg-gray-200 text-gray-700 px-4 py-2 rounded mr-[70px]`
                }
                onClick={onHideModal} // Handle Cancel button
              >
                {cancelButton}
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CustomModal;
