import { GetStaticPaths, GetStaticProps } from "next";
import { Product } from "../../features/Product/productSlice";
import Image from "next/image";
import styles from "./[id].module.css";
import Link from "next/link";
import Navbar from "../../components/Navbar/Navbar";
import { addToCart } from "../../features/Cart/cartSlice";
import { useAppDispatch } from "../../app/hooks";
import { useRef } from "react";

// return a list of possible paths
// has to be in the format -
// [
//     {
//         params: {
//             id: 'some_id'
//         }
//     },
//     {
//         params: {
//             id: 'another_id'
//         }
//     }
// ]

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch("https://fakestoreapi.com/products");

  const products: Product[] = await res.json();

  const paths = products.map((product) => {
    return {
      params: {
        id: product.id.toString(),
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const res = await fetch(`https://fakestoreapi.com/products/${params?.id}`);

  const product: Product[] = await res.json();
  return {
    props: {
      product,
    },
  };
};

type props = {
  product: Product;
};

export default function ProductContainer({ product }: props): JSX.Element {
  // const display = useRef("Add to Cart");
  const displayRef = useRef<HTMLSpanElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const dispatch = useAppDispatch();

  const addItems = () => {
    dispatch(addToCart(product));

    if (displayRef.current) {
      displayRef.current.textContent = "Added to Cart";
    }

    if (btnRef.current) {
      btnRef.current.classList.add(styles.buttonClicked);
    }
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
      <Link href="/checkout">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="#ffa31a"
          width="26"
          className={styles.basket}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
          />
        </svg>{" "}
      </Link>
      <div className={styles.productContainer}>
        <Image
          alt="Product Image"
          src={product.image}
          width="0"
          height="0"
          sizes="100vw"
          style={{
            width: "70%",
            height: "auto",
            margin: "auto",
          }}
        />

        <div className={styles.textDiv}>
          <h1 className={styles.title}>{product.title}</h1>
          <p>{product.description}</p>
          <span className={styles.amount}> $ {product.price}</span>
          <div className={styles.buttons}>
            <button className={styles.price} onClick={addItems} ref={btnRef}>
              {/* {display.current}{" "} */}
              <span ref={displayRef}>Add To Cart</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="white"
                width="20"
                className={styles.cart}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                />
              </svg>
            </button>
            <Link href="/checkout" className={styles.cart}>
              <button className={styles.checkout}>
                Checkout
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  width="20"
                  stroke="white"
                  className={styles.check}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
