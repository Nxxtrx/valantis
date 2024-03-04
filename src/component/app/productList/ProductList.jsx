import React from 'react'
import './ProductList.css'



function ProductList({itemList, isLoading}) {
  return (
    <section className='products'>
      <h2 className='product__title'>Список продуктов</h2>
      <ul className='product__list'>
        {isLoading 
        ?<p>Идет загрузка...</p>
        : (itemList && itemList.map((product) => 
          <li key={product.id} className="product__item">
            <p className='product__name'>
              <span className='product__id'>{product.id}. </span>
              {product.product}.&nbsp;
              <span className='product__brand-name'>{product.brand}</span>
            </p>
            <p className='product__price'>{product.price} ₽</p>
          </li>
        ))
      }

      </ul>
      
    </section>
  )
}

export default ProductList