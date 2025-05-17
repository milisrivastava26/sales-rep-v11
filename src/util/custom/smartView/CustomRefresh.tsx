
interface typeRefresh {
  onRefresh: () => void;
}

const CustomRefresh: React.FC<typeRefresh> = ({ onRefresh }) => {
  // const [counter, setCounter] = useState(300); // 5 minutes = 300 seconds

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCounter((prev) => {
  //       if (prev === 1) {
  //         onRefresh();
  //         return 300; // Reset to 5 minutes
  //       }
  //       return prev - 1;
  //     });
  //   }, 1000); // Decrease every second

  //   return () => clearInterval(interval);
  // }, [onRefresh]); // Do not include `counter` here

  // const formatTime = (seconds: number) => {
  //   const mins = Math.floor(seconds / 60);
  //   const secs = seconds % 60;
  //   const paddedSecs = secs < 10 ? `0${secs}` : secs;
  //   return `${mins}:${paddedSecs}`;
  // };

  return (
    <div className="flex items-center text-[12px] sm:text-sm bg-gray-100 gap-x-2 px-2 rounded">
      {/* <div className="flex items-center py-1">
        <span className="w-3 h-3 bg-green-600 rounded-full block mr-2"></span>
        <span>
          {counter === 0
            ? "Refreshing..."
            : `Next refresh in ${formatTime(counter)}`}
        </span>
      </div> */}
      <div
        className="flex items-center gap-x-1 py-1 cursor-pointer text-blue-600"
        onClick={() => {
          onRefresh();
          // setCounter(300); 
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
        >
          <path
            fill="blue"
            d="M12.079 2.25c-4.794 0-8.734 3.663-9.118 8.333H2a.75.75 0 0 0-.528 1.283l1.68 1.666a.75.75 0 0 0 1.056 0l1.68-1.666a.75.75 0 0 0-.528-1.283h-.893c.38-3.831 3.638-6.833 7.612-6.833a7.66 7.66 0 0 1 6.537 3.643a.75.75 0 1 0 1.277-.786A9.16 9.16 0 0 0 12.08 2.25m8.761 8.217a.75.75 0 0 0-1.054 0L18.1 12.133a.75.75 0 0 0 .527 1.284h.899c-.382 3.83-3.651 6.833-7.644 6.833a7.7 7.7 0 0 1-6.565-3.644a.75.75 0 1 0-1.277.788a9.2 9.2 0 0 0 7.842 4.356c4.808 0 8.765-3.66 9.15-8.333H22a.75.75 0 0 0 .527-1.284z"
          />
        </svg>
        <span>refresh</span>
      </div>
    </div>
  );
};

export default CustomRefresh;
