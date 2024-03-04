import { useEffect, useState } from 'react';
import './App.css';
import md5 from 'js-md5';
import ProductList from './productList/ProductList';
import { Pagination } from '@mui/material'
import Search from './search/Search';
import Filter from '../filter/Filter';
import { productApi } from '../../api/ProductApi';

function App() {
  const [pages, setPages] = useState()
  const [productPage, setProductPage] = useState(1)

  const [isSearch, setIsSearch] = useState()
  const [isLoading, setIsLoading] = useState(false)

  const [itemsIdList, setItemIdList] = useState()
  const [itemList, setItemList] = useState([])
  const [brandList, setBrandList] = useState()



  useEffect(() => {
    productApi.getProductListLength()
    .then(data => setPages(Math.floor(data.result.length / 50)))

    productApi.getBrands()
    .then(data => setBrandList([...new Set(data.result)]))
  }, [])

// получение id товаров
  useEffect(() => {
    productApi.getProductId(productPage)
    .then(data => {
      setItemIdList(data.result)
      setIsSearch(false)
    })
  }, [productPage])

// получение списка товаров
  useEffect(() => {
    setIsLoading(true)
    if(itemsIdList) {
      productApi.getProductList(itemsIdList)
      .then((data) => {
        setItemList(uniqueArray(data.result))
        setIsLoading(false)
      })
    }
  }, [itemsIdList])

  function filterProduct(filterList){
    productApi.filterProductList(filterList)
    .then(data => {
      setItemIdList(data.result)
      setIsSearch(true)
    })
  }


  const uniqueArray = (array) =>Object.values(array.reduce((acc, cur) => {
    acc[cur.id] = acc[cur.id] || cur;
    return acc;
  }, {}));


  return (
    <div className="App">
      <Filter brandList={brandList} filterProduct={filterProduct}/>
      <ProductList itemList={itemList} isLoading={isLoading}/>
      {pages > 1 && !isSearch
      ? <Pagination className='products__pagination' 
          count={pages} 
          onChange={(_, number) => setProductPage(number)} 
          variant="outlined" 
        />
      : ''
    }
    </div>
  );
}

export default App;
