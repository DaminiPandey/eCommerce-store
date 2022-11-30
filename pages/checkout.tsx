import { useAppDispatch, useAppSelector } from "../app/hooks";
import Image from "next/image";
import styles from "./checkout.module.css";
import Link from "next/link";
import { clearCart, removeFromCart } from "../features/Cart/cartSlice";
import { useState } from "react";

export default function Checkout() {
  const cartItems = useAppSelector((state) => state.cart.items);
  const [showModal, setShowModal] = useState(false);
  const total = cartItems.reduce((acc, item) => acc + item.price, 0);

  const dispatch = useAppDispatch();
  const handleDelete = (id: number) => {
    dispatch(removeFromCart(id));
  };

  const handleClick = () => {
    setShowModal(true);
  };

  const emptyCart = () => {
    setShowModal(false);
    dispatch(clearCart());
  };

  return (
    <div className={styles.container}>
      <Link href="/" className={styles.link}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          width="25"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
          />
        </svg>
        Back to Home{" "}
      </Link>

      {showModal && (
        <div className={styles.successContainer}>
          <h1> Order Placed Successfully!</h1>
          <button className={styles.btn} onClick={emptyCart}>
            Continue Shopping
          </button>
        </div>
      )}

      <div className={styles.overlay} hidden={!showModal}></div>

      {cartItems.length === 0 ? (
        <div className={styles.emptyCart}>
          <h1>Oops! Your Cart is empty. </h1>
        </div>
      ) : (
        <div className={styles.outerDiv}>
          {cartItems.map((item) => (
            <div className={styles.innerDiv} key={item.id}>
              <Image
                src={item.image}
                alt="Product Image"
                width="0"
                height="0"
                sizes="100vw"
                style={{
                  width: "30%",
                  height: "auto",
                }}
              />

              <div className={styles.innerMostDiv}>
                <p>{item.title}</p>
                <div className={styles.myDiv}>
                  <span className={styles.price}>$ {item.price}</span>
                  <button
                    className={styles.delete}
                    onClick={() => handleDelete(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
          <div className={styles.cartTotal}>
            <span>
              Total: <b>${total.toFixed(2)}</b>{" "}
              <p className={styles.shopping}>Happy Shopping!</p>
            </span>
            <button className={styles.purchaseBtn} onClick={handleClick}>
              Place Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
