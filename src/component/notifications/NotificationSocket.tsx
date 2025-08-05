import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Client, IMessage } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { baseURL } from "../../config";
import { Link } from "react-router-dom";
import { makeCallRequest } from "../../store/lead-contact-phone/make-call-slice";
import store, { RootState } from "../../store";
import toast from "react-hot-toast";
import { addBarNotification, addPopupNotification } from "../../store/notifications/notification-slice";
import { extractDateTime } from "../../util/actions/extractDateAndTime";

const NotificationSocket = () => {
  const dispatch = useDispatch();
  const { userDetails } = useSelector((state: RootState) => state.getLoggedInUserData);
  const { phone: executiveNum } = userDetails;

  const roles = ["ROLE_MANAGER"];

  const isManager = userDetails?.authority?.some((role: string) => roles.includes(role));

  const formatBody = (body: string) => {
    const handleCall = (phoneNumber: string, leadCaptureId: any) => {
      const leadSourceId = leadCaptureId;
      const leadStageId = 1;
      const leadNum = phoneNumber;
      if (leadStageId) {
        store.dispatch(makeCallRequest({ executiveNum, leadNum, leadSourceId, leadStageId }));
      } else {
        toast("Sorry 😔,This Lead is not able to make call.", {
          duration: 6000,
        });
      }
    };

    try {
      const parsed = JSON.parse(body);
      const { timeFormatted } = extractDateTime(parsed.notifyTime);
      return (
        <div className="p-3 max-w-md rounded-md bg-blue-50 border border-blue-100 shadow-sm text-sm text-gray-800 space-y-2">
          <h3 className="text-sm font-semibold text-blue-700 flex items-center gap-1">📞 New Lead Inbound Call</h3>

          {parsed.leadCaptureId !== null && (
            <div className="flex items-start gap-1 ml-[20px]">
              <span className="text-gray-600 font-medium text-nowrap">🆔 Lead ID:</span>
              <Link
                to={`/manage-leads-v1/details/${parsed.leadCaptureId}`}
                state={{ viaButton: true }}
                className="text-blue-600 hover:underline font-medium cursor-pointer"
              >
                {parsed.leadCaptureId}
              </Link>
            </div>
          )}

          <div className="flex items-start gap-1 ml-[20px]">
            <span className="text-gray-600 font-medium text-nowrap">📱 Phone:</span>
            {parsed.leadCaptureId === null ? (
              <span className="text-gray-600 font-medium">{parsed.phone}</span>
            ) : (
              <span
                onClick={() => {
                  handleCall(parsed.phone, parsed.leadCaptureId);
                }}
                className="text-blue-500 cursor-pointer hover:underline font-medium"
              >
                {parsed.phone}
              </span>
            )}
          </div>

          {parsed.career !== null && (
            <div className="flex items-start gap-1 ml-[20px]">
              <span className="text-gray-600 font-medium text-nowrap">🎓 Career:</span>
              <span>{parsed.career}</span>
            </div>
          )}

          {parsed.program !== null && (
            <div className="flex items-start gap-1 ml-[20px]">
              <span className="text-gray-600 font-medium text-nowrap">📘 Program:</span>
              <span>{parsed.program}</span>
            </div>
          )}
          {parsed.owner !== null && (
            <div className="flex items-start gap-1 ml-[20px]">
              <span className="text-gray-600 font-medium text-nowrap">👤 Owner:</span>
              <span>{parsed.owner}</span>
            </div>
          )}
          <div className="flex items-start gap-1 ml-[20px]">
            <span className="text-gray-600 font-medium text-nowrap">🕖 Notify Time:</span>
            <span>{timeFormatted}</span>
          </div>
        </div>
      );
    } catch {
      return body;
    }
  };

  useEffect(() => {
    const socket = new SockJS(`${baseURL}:9892/ws`);
    const client = new Client({
      webSocketFactory: () => socket,
      onConnect: () => {
        client.subscribe("/topic/notification", (msg: IMessage) => {
          try {
            const parsed = JSON.parse(msg.body);

            // Assuming 'userDetails.name' or 'userDetails.id' is used to match the 'owner'
            if (parsed.owner === userDetails.fullName || parsed.manager === userDetails.fullName) {
              const bodyContent = formatBody(msg.body);

              dispatch(
                addBarNotification({
                  id: Date.now().toString(),
                  body: bodyContent,
                })
              );

              dispatch(
                addPopupNotification({
                  id: Date.now().toString(),
                  body: bodyContent,
                })
              );
            } else if (parsed.manager === null && parsed.owner === null && isManager) {
              const bodyContent = formatBody(msg.body);
              dispatch(
                addBarNotification({
                  id: Date.now().toString(),
                  body: bodyContent,
                })
              );

              dispatch(
                addPopupNotification({
                  id: Date.now().toString(),
                  body: bodyContent,
                })
              );
            }
          } catch (err) {
            console.error("Invalid message format:", err);
          }
        });
      },
      onStompError: (frame) => {
        console.error("Broker error:", frame.headers["message"], frame.body);
      },
    });

    client.activate();
    return () => {
      client.deactivate();
    };
  }, [dispatch]);

  return null;
};

export default NotificationSocket;