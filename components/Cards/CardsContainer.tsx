import React from "react";
import Card from "../Card/Card";
import { Product } from "../../features/Product/productSlice";
import styles from "./CardsContainer.module.css";

const CardsContainer = ({ products }: { products: Product[] }): JSX.Element => {
  return (
    <div
      style={{
        backgroundColor: "#fff",
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        rowGap: "2rem",
        columnGap: "4rem",
        padding: "5.5rem",
        alignItems: "flex-end",
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='199' viewBox='0 0 100 199'%3E%3Cg fill='%23ffa31a' fill-opacity='0.2'%3E%3Cpath d='M0 199V0h1v1.99L100 199h-1.12L1 4.22V199H0zM100 2h-.12l-1-2H100v2z'%3E%3C/path%3E%3C/g%3E%3C/svg%3E")`,
        gridAutoRows: "1fr",
      }}
      className={styles.cardsContainer}
    >
      {products.map((product) => (
        <Card
          id={product.id}
          title={product.title}
          price={product.price}
          image={product.image}
          category={product.category}
          key={product.id}
        />
      ))}
    </div>
  );
};

export default CardsContainer;
