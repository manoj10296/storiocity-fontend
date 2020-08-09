import React, { useEffect, useState } from "react";
import "../styles.css";
import Base from "./Base";
import Card from "./Card";
import { getProducts } from "./helper/coreapicalls";
import { getCategories } from "../admin/helper/adminapicall";
import CategoryCard from "./CategoryCard";

export default function Home(props) {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);
  const [categrories, setCategories] = useState([])

  const loadAllCategories = () => {
    getCategories().then((data) => {
      if(data.error) {
        setError(data.error);
      } else {
        setCategories(data)
      }
    })
  }

  // console.log(categrories, products)
  useEffect(() => {
    // loadAllProducts();
    loadAllCategories();
  }, []);

  return (
    <Base title="StoreoCity" description="Welcome to StoreoCity">
      <div className="row text-center">
        <div className="row">
          {/* {products.map((product, index) => {
            return (
              <div key={index} className="col-4 mb-4">
                <Card product={product} />
              </div>
            );
          })} */}
          {
            categrories.map((cat, index) => {
              return (
                <div>
                  <CategoryCard
                    category={cat}
                    link={props.history.push}
                  />
                </div>
              )
            })
          }
        </div>
      </div>
    </Base>
  );
}
