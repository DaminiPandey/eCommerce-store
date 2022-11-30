import React from "react";
import Image from "next/image";
import styles from "./Card.module.css";
import Link from "next/link";

type CardProps = {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
};
const Card = ({
  id,
  title,
  price,
  image,
  category,
}: CardProps): JSX.Element => {
  return (
    <div className={styles.card}>
      <Link href={`/products/${id}`}>
        <Image
          className={styles.image}
          alt="Product Image"
          src={image}
          width="0"
          height="0"
          sizes="100vw"
          style={{
            width: "100%",
            height: "auto",
          }}
        />
      </Link>
      <span
        className={styles.category}
      >{`${category[0].toUpperCase()}${category.slice(1)}`}</span>
      <div className={styles.text}>
        <Link href={`/products/${id}`} className={styles.titleText}>
          {title}
        </Link>

        <Link href={`/products/${id}`}>
          <button className={styles.priceButton}>
            <span className={styles.mySpan}> $ {price}</span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Card;
