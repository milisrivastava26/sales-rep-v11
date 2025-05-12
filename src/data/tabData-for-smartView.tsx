import { FaRegUser, FaWalking } from "react-icons/fa";
import NewLeads from "../component/smart-view/new-leads/NewLeads";
import { SlGraph } from "react-icons/sl";
import InboundAnswered from "../component/smart-view/inbound-answered/InboundAnswered";
import InboundMissed from "../component/smart-view/inbound-missed/InboundMissed";
import InboundDisconnectedAtIVR from "../component/smart-view/inbound-disconnectedAtIVR/InboundDisconnectedAtIVR";
import InboundDisconnectedAfterIVR from "../component/smart-view/inbound-disconnectedAfterIVR/InboundDisconnectedAfterIVR";
import Follow_Up from "../component/smart-view/todays-followUp/Follow_Up";
import { MdPayment } from "react-icons/md";
import PaymentSuccess from "../component/smart-view/payment/PaymentSuccess";
import PaymentFailed from "../component/smart-view/payment/PaymentFailed";
import TodayOutboundCallbacks from "../component/smart-view/today-outbound-callbacks/TodayOutboundCallbacks";
import { GoTasklist } from "react-icons/go";
import OverdueTasks from "../component/smart-view/overdue-tasks/OverdueTasks";
import Walkin from "../component/smart-view/walkin/Walkin";
import Counselling from "../component/smart-view/counselling/Counselling";
import { GiDiscussion } from "react-icons/gi";

// Data for each tab
const tabData = [
  {
    id: 1,
    content: "New Lead",
    icon: <FaRegUser />,
    data: <NewLeads />,
    count: 0,
  },
  {
    id: 2,
    content: "Today's Follow-up",
    icon: <i className="fa fa-calendar" aria-hidden="true"></i>,
    data: <Follow_Up />,
    count: 0,
  },
  {
    id: 13,
    content: "Overdue Tasks",
    icon: <GoTasklist className="text-lg" />,
    data: <OverdueTasks />,
    count: "2.44k",
  },
  {
    id: 7,
    content: "Inbound Call- Answered",
    icon: <SlGraph />,
    data: <InboundAnswered />,
    count: "2.44k",
  },
  {
    id: 9,
    content: "Inbound Call- Missed",
    icon: <SlGraph />,
    data: <InboundMissed />,
    count: "2.44k",
  },
  {
    id: 11,
    content: "Inbound Call Disconnected- At IVR",
    icon: <SlGraph />,
    data: <InboundDisconnectedAtIVR />,
    count: "2.44k",
  },
  {
    id: 12,
    content: "Inbound Call Disconnected- After IVR",
    icon: <SlGraph />,
    data: <InboundDisconnectedAfterIVR />,
    count: "2.44k",
  },
  {
    id: 12,
    content: "Payment Success",
    icon: <MdPayment />,
    data: <PaymentSuccess />,
    count: 0,
  },
  {
    id: 13,
    content: "Payment Failed ",
    icon: <MdPayment />,
    data: <PaymentFailed />,
    count: 0,
  },
  {
    id: 12,
    content: "Today's Outbound Callbacks",
    icon: <SlGraph />,
    data: <TodayOutboundCallbacks />,
    count: "2.44k",
  },
  {
    id: 14,
    content: "Walk-in",
    icon: <FaWalking />,
    data: <Walkin />,
    count: "2.44k",
  },
  {
    id: 15,
    content: "Counselling",
    icon: <GiDiscussion />,
    data: <Counselling />,
    count: "2.44k",
  },

];

// Custom Previous Arrow Component
export function PrevArrow(props: any) {
  const { className, onClick } = props;
  return (
    <div className={`${className} prev-arrow`} onClick={onClick}>
      <i className="fa fa-chevron-left" aria-hidden="true"></i>
    </div>
  );
}

// Custom Next Arrow Component
export function NextArrow(props: any) {
  const { className, onClick } = props;
  return (
    <div className={`${className} next-arrow`} onClick={onClick}>
      <i className="fa fa-chevron-right " aria-hidden="true"></i>
    </div>
  );
}

export default tabData;
