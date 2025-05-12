import { ReactNode } from "react";
interface CardProps {
  children: ReactNode;
  isCardShow: boolean;
}
function Card({ children, isCardShow }: CardProps) {
  return <>{isCardShow && <div>{children}</div>}</>;
}

export default Card;
