import React, { useState } from 'react'
import Search from '../search/Search'
import './Filter.css'

function Filter({brandList, filterProduct, setProductPage, setIsSearch}) {
  const [filterList, setFilterList] = useState({})

  function handleBrandChange(e) {
    setFilterList({brand: e.target.value });
  }

  function handlePriceChange(e) {
    setFilterList({price: parseInt(e.target.value) })
  }

  function handleSubmit() {
    if(Object.keys(filterList).length > 0){
      filterProduct(filterList)
    }
  }

  function handleReset() {
    if(Object.keys(filterList).length > 0){
      setIsSearch(false)
      setFilterList({})
    }
  }

  return (
    <section className='filter'>
      <p className='filter__title'>Фильтр</p>
      <div className='filter__container'>
        <label>Бренд
          <select className='filter__input-brand' value={filterList.brand ? filterList.brand : ''} onChange={handleBrandChange}>
            {brandList && brandList.map((item, index) => 
              <option key={index} value={item}>{item}</option>
            )}
          </select>
        </label>
        <label >Стоимость
          <input className='filter__input-price' type="number" min={0} value={filterList.price ? filterList.price : ''} onChange={handlePriceChange} step={100}/>
        </label>
        <Search setFilter={setFilterList} filterList={filterList}/>
        <div className='filter__btn-container'>
          <button className='filter__btn-submit' onClick={handleSubmit}>Поиск</button>
          <button className='filter__btn-reset' onClick={handleReset}>Сбросить</button>
        </div>
      </div>
    </section>
  )
}

export default Filter