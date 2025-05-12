interface typeForFallback {
  icon: React.ReactNode;
  errorInfo: string;
  onBtnHandler?: () => void;
  style?: string;
  isCenter?: boolean;
}

const Fallback: React.FC<typeForFallback> = ({ icon, errorInfo, onBtnHandler, style, isCenter }) => {
  return (
    <div className={style ? style : `flex justify-center items-center w-full ${!isCenter ? "min-h-[calc(100vh-208px)]" : "min-h-[300px]"} `}>
      <div className="w-full max-w-[450px]">
        <div className={`flex justify-center ${onBtnHandler ? "cursor-pointer" : "cursor-default"}`} onClick={onBtnHandler ? () => onBtnHandler() : undefined}>
          {icon}
        </div>
        <h1 className="text-center text-xl text-gray-700 mt-3">{errorInfo}</h1>
      </div>
    </div>
  );
};

export default Fallback;
