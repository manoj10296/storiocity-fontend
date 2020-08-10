import React from 'react'
import accessories  from '../assets/accessories.jpg'
import jewellery from '../assets/jewellery.jpg'
import men from '../assets/men.jpg'
import women from '../assets/women.jpg'
import formals from '../assets/formals.jpg'
import other from '../assets/other.png'


const getImage = (name) => {
  if (name ==='jewellry')
    return jewellery

    if (name ==='Men')
    return men

    if (name ==='Women')
    return women

    if (name ==='Formals')
    return formals

    return other
}

const CategoryCard = ({ category,link }) => {
  console.log(category)
  return (
    <div className="card m-5 pb-5"
      style= {{"width": "18rem"}}
      onClick={() => link(`/category/${category._id}/products`)}
    >
  <img class="card-img-top" src={getImage(category.name)} alt="Card image cap" width="250" height="400" />
  <div className="card-body">
    <p className="card-text text-danger h3">{category.name.charAt(0).toUpperCase() + category.name.slice(1)}</p>
  </div>
  </div>
  )
}

export default CategoryCard