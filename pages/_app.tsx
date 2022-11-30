import "../styles/globals.css";
import type { AppProps } from "next/app";
import { wrapper } from "../app/store";

function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default wrapper.withRedux(App);

// nav
// products
// - product card
// product
// cart
// - checkout page

//slices:
//products [{id: ''}]
//cart

//index
//products -
//products/id
//products/cart
//products/checkout

//platzi fake store api
