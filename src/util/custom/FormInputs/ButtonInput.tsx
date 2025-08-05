interface btnType {
  icon?: any;
  style?: string;
  btnText?: string;
  isDisabled?: boolean;
  isEnableForAction: boolean;
  onAction?: (e: any) => void;
  btnType?: "button" | "submit" | "reset";
}

const ButtonInput: React.FC<btnType> = ({ isEnableForAction, btnType = "button", isDisabled, btnText, style, onAction, icon }) => {
  return (
    <button
    type={btnType} disabled={isDisabled} className={style} onClick={isEnableForAction === true ? onAction : undefined}>
      {icon ? icon : btnText}
    </button>
  );
};

export default ButtonInput;
