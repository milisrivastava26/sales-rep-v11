import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { removePopupNotification } from '../../store/notifications/notification-slice';
import { IoClose } from 'react-icons/io5';

const NotificationPopup: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const popupNotifications = useSelector((state: RootState) => state.notification.popupList);

    if (popupNotifications.length === 0) return null;

    return (
        <div className="fixed top-6 right-6 z-50 max-h-[90vh] overflow-y-auto space-y-4 pr-1">
            {popupNotifications.map((notif) => (
                <div
                    key={notif.id}
                    className="w-[380px] backdrop-blur-md bg-white/30 border border-white/40 shadow-2xl rounded-xl px-3 py-2 text-[15px] text-gray-900 flex items-start space-x-4 relative"
                >
                    <div className="flex-1 font-medium tracking-wide">{notif.body}</div>
                    <button
                        onClick={() => dispatch(removePopupNotification(notif.id))}
                        className="absolute top-[21px] right-5 text-gray-700 hover:text-black"
                        aria-label="Close"
                    >
                        <IoClose className="text-xl" />
                    </button>
                </div>
            ))}
        </div>
    );
};

export default NotificationPopup;
