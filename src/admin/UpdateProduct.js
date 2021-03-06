import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import {
  getCategories,
  getProduct,
  updateProduct,
} from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper";

export default function UpdateProduct({ match }) {
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    size: "",
    stock: "",
    photo: "",
    categories: [],
    category: "",
    loading: false,
    error: "",
    createdProduct: "",
    getRedirect: false,
    formData: "",
  });

  const {
    name,
    description,
    price,
    stock,
    size,
    photo,
    categories,
    category,
    loading,
    error,
    createdProduct,
    getRedirect,
    formData,
  } = values;

  const { user, token } = isAuthenticated();

  //function to preload all the categories from server
  const preloadCategories = () => {
    getCategories().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, categories: data, formData: new FormData() });
      }
    });
  };

  useEffect(() => {
    if(values.name) {
      preloadCategories();
    }
  },[values.name])

  //function to preload all the categories from server
  const preloadProducts = (productId) => {
    getProduct(productId).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: data.name,
          size: data.size,
          description: data.description,
          price: data.price,
          category: data.category._id,
          stock: data.stock,
          formData: new FormData(),
        });
      }
    });
  };

  //to call the preload function
  useEffect(() => {
    preloadProducts(match.params.productId);
  }, []);

  //function to go back to the admin dashboard
  const goBack = () => {
    return (
      <div className="mt-5">
        <Link className="btn btn-sm btn-dark mb-3" to="/admin/dashboard">
          Admin Home
        </Link>
      </div>
    );
  };

  //to fetch data entered in form to send server req
  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  //on submitting the form
  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });
    updateProduct(match.params.productId, user._id, token, formData).then(
      (data) => {
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setValues({
            name: "",
            description: "",
            photo: "",
            price: "",
            stock: "",
            loading: false,
            createdProduct: data.name,
          });
        }
      }
    );
  };

  //function to make success or error messages disappear
  const disappearMessage = () => {
    //to be done...
  };

  //to display pop up success message
  const successMessage = () => {
    return (
      <div
        id="hello"
        className="alert alert-success mt-3"
        style={{ display: createdProduct ? "" : "none" }}
      >
        <h4>Product updated successfully</h4>
      </div>
    );
  };

  //to display pop up warning message
  const errorMessage = () => {
    if (error) {
      return (
        <div
          id="hello"
          className="alert alert-danger mt-3"
          style={{ display: createdProduct ? "" : "none" }}
        >
          <h4>Unable to update the product</h4>
        </div>
      );
    }
  };

  //function to create add product form view
  const createProductForm = () => (
    <form>
      <span>Post photo</span>
      <div className="form-group">
        <label className="btn btn-block btn-success">
          <input
            onChange={handleChange("photo")}
            type="file"
            name="photo"
            accept="image"
            placeholder="choose a file"
          />
        </label>
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("name")}
          name="photo"
          className="form-control"
          placeholder="Name"
          value={name}
        />
      </div>
      <div className="form-group">
        <textarea
          onChange={handleChange("description")}
          name="photo"
          className="form-control"
          placeholder="Description"
          value={description}
        />
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("price")}
          type="number"
          className="form-control"
          placeholder="Price"
          value={price}
        />
      </div>
      <div>
        {console.log('values, ', values)}
        <label className="radio-inline"><input type="radio" name="optradio" value="S" checked={values.size === "S"} onChange={handleChange("size")} />S</label>
        <label className="radio-inline"><input type="radio" name="optradio" value="M" checked={values.size === "M"} onChange={handleChange("size")} />M</label>
        <label className="radio-inline"><input type="radio" name="optradio" value="L" checked={values.size === "L"} onChange={handleChange("size")} />L</label>
        <label className="radio-inline"><input type="radio" name="optradio" value="XL" checked={values.size === "XL"} onChange={handleChange("size")} />XL</label>
        <label className="radio-inline"><input type="radio" name="optradio" value="XXL" checked={values.size ==="XXL"} onChange={handleChange("size")} />XXL</label>
      </div>
      <div className="form-group">
        <select
          onChange={handleChange("category")}
          className="form-control"
          placeholder="Category"
        >
          <option>Select</option>
          {categories &&
            categories.map((cate, index) => {
              return (
                <option key={index} selected={values.category === cate._id} value={cate._id}>
                  {cate.name}
                </option>
              );
            })}
        </select>
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("stock")}
          type="number"
          className="form-control"
          placeholder="Quantity"
          value={stock}
        />
      </div>

      <button
        type="submit"
        onClick={onSubmit}
        className="btn btn-outline-success mb-3"
      >
        Update Product
      </button>
    </form>
  );

  return (
    <Base
      title="Add a Product"
      description="Create a new product here"
      className="container bg-info p-4"
    >
      {goBack()}
      <div className="row bg-dark text-white rounded">
        <div className="col-md-8 offset-md-2">
          {successMessage()}
          {errorMessage()}
          {disappearMessage()}
          {createProductForm()}
        </div>
      </div>
    </Base>
  );
}
