import { useContext,useEffect ,useState } from "react";

import CartIcon from "../Cart/CartIcon";
import CartContext from "../../store/cart-context";
import classes from "./HeaderCartButton.module.css";

const HeaderCartButton = (props) => {
    const [btnIsHighlighted,setBtnIsHighlighted] = useState(false);
    const cartCtx = useContext(CartContext);
    //   console.log(cartCtx);

  const {items}= cartCtx;

  const numberOfCartItems = items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  
  const btnClasses = `${classes.button} ${btnIsHighlighted ? classes.bump : ''}`;
  useEffect(()=>{
      if(items.length === 0)
      {
         return;
      }
    setBtnIsHighlighted(true);

    const timer = setTimeout(()=>{
        setBtnIsHighlighted(false);
    },300);

    // It is always better to add a cleanup function ..so that we can stop the timer running 
    // So when we re-run the useEffect we have a new timer
    return ()=>{
        clearTimeout(timer);
    }

    },[items]);
    

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
