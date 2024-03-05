import React, { useState } from 'react'
import './Search.css'

function Search({setFilter, filterList}) {
  const [value, setValue] = useState('')

  const handleChange = (e) => {
    e.preventDefault()
    setValue(e.target.value)
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