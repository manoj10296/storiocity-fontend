import React, { useState } from 'react';
import { getProducts } from './helper/coreapicalls';
import Card from "./Card";
import Base from './Base';
import { getCategories } from '../admin/helper/adminapicall';

const ProductsByCategory = (props) => {
  const [products, setProducts] = useState([]);
  const [categrories, setCategories] = useState({})

  const [error, setError] = useState(false);
  const loadAllProducts = () => {
    getProducts().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        const filtered = data.filter((s) => (s.category._id === props.match.params.id))
        setProducts(filtered);
      }
    });
  };

  React.useEffect(() => {
    loadAllProducts();
    getCategories().then((data) => {
      if(data.error) {
        setError(data.error);
      } else {
        const dict = data.reduce((memo, s) => {
          if(!memo[s._id]) {
            memo[s._id] = s
          }
          return memo
        }, {})
        setCategories(dict)
      }
    })
  }, [])

  return (
    <Base
      title={`${categrories && categrories[props.match.params.id] && categrories[props.match.params.id].name}`}
      description="Watch your favourite products"
      className="container bg-info p-4"
    >
      <div>
        {products.map((product, index) => {
          return (
            <div key={index} className="col-4 mb-4">
              <Card product={product} />
            </div>
          );
        })}
        {products.length === 0 && (
          <h3>
            No products under this category
          </h3>
        )}
      </div>
    </Base>
  )
}

export default ProductsByCategory