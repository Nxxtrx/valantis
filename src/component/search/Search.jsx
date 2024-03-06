import React from 'react'
import './Search.css'

function Search({setFilter, filterList}) {
  const handleChange = (e) => {
    e.preventDefault()
    setFilter({product: e.target.value})
  }

  return (
    <section className='search'>
      <label className='search__label'>Название
        <input className='search__input' type="text" value={filterList.product ? filterList.product : ''} onChange={handleChange}/>
      </label>
    </section>
  )
}

export default Search