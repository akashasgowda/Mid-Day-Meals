import {useContext} from 'react';

import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';

const Cart = (props) => {

  // Getting access to CartContext
  const cartCtx = useContext(CartContext);

  const totalAmount = `₹ ${cartCtx.totalAmount.toFixed(2)}`;

  // To show order button only if cart has items
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = id=>{
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = item =>{
    cartCtx.addItem({...item,amount:1});
  };


  const cartItems = (
    <ul className={classes["cart-items"]}>
      {/* old version code-->static data
       {[
        {

          id: "c1",
          name: "Grilled Chicken",
          amount: 2,
          price: 180.0,
        },
      ].map((item) => (
        <li>{item.name}</li>
      ))} */}

      {cartCtx.items.map((item)=>(
        <CartItem 
            key={item.id}
            name={item.name}
            amount={item.amount}
            price={item.price}
            onRemove={cartItemRemoveHandler.bind(null,item.id)}
            onAdd={cartItemAddHandler.bind(null,item)}
        />
      ))}
    </ul>
  );
  return (
    <Modal onClose={props.onClose}>
      <div>{cartItems}</div>
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onClose}>Close</button>
        {hasItems && <button className={classes.button}>Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;
