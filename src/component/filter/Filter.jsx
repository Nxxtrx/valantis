import React, { useState } from 'react'
import Search from '../app/search/Search'
import './Filter.css'

function Filter({brandList, filterProduct}) {
  const [filterList, setFilterList] = useState({})

  function handleBrandChange(e) {
    setFilterList({brand: e.target.value });
  }

  function handlePriceChange(e) {
    setFilterList({price: parseInt(e.target.value) })
  }

  function handleSumbit() {
    filterProduct(filterList)
  }

  return (
    <section className='filter'>
      <p className='filter__title'>Фильтр</p>
      <div className='filter__container'>
        <label>Брэнд
          <select className='filter__input-brand' value={filterList.brand ? filterList.brand : ''} onChange={handleBrandChange}>
            {brandList && brandList.map((item, index) => 
              (<option key={index} value={item}>{item}</option>)
            )}
          </select>
        </label>

        <label >Стоимость
          <input className='filter__input-price' type="number" min={0} value={filterList.price ? filterList.price : ''} onChange={handlePriceChange} step={100}/>
        </label>
        <Search setFilter={setFilterList} filterList={filterList}/>
        <button onClick={handleSumbit}>Поиск</button>
        <button onClick={handleSumbit}>Сбросить</button>
      </div>
    </section>
  )
}

export default Filter