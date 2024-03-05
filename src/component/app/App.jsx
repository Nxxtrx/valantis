import { useEffect, useState } from 'react';
import { Pagination } from '@mui/material'
import ProductList from '../productList/ProductList';
import Filter from '../filter/Filter';
import { productApi } from '../../api/ProductApi';
import uniqueArray from '../../utlis/uniqueArray';
import './App.css';

function App() {
  // количество страниц и текущая страница пагинации
  const [pages, setPages] = useState()
  const [productPage, setProductPage] = useState(1) 

  // состояние фильтрации и загрузки 
  const [isSearch, setIsSearch] = useState()
  const [isLoading, setIsLoading] = useState(false)

  // списки с id, товарами и брендами
  const [itemsIdList, setItemIdList] = useState()
  const [itemList, setItemList] = useState([])
  const [brandList, setBrandList] = useState()

  useEffect(() => {
    // получение количества страниц 
    productApi.getProductListLength()
    .then(data => setPages(Math.floor(data.result.length / 50)))
    .catch(err => console.log(err))

    // получение брендов для списка поиска
    productApi.getBrands()
    .then(data => setBrandList([...new Set(data.result)]))
    .catch(err => console.log(err))
  }, [])

// получение id товаров на странице
  useEffect(() => {
    if(!isSearch){
      productApi.getProductId(productPage)
      .then(data => {
        setItemIdList(data.result)
      })
      .catch(err => console.log(err))
    }
  }, [productPage, isSearch])

// получение списка товаров на странице
  useEffect(() => {
    setIsLoading(true)
    if(itemsIdList) {
      productApi.getProductList(itemsIdList)
      .then((data) => {
        setItemList(uniqueArray(data.result))
        setIsLoading(false)
      })
      .catch(err => console.log(err))
    }
  }, [itemsIdList])

  //  функция для фильтрации продуктов
  function filterProduct(filterList){
    productApi.filterProductList(filterList)
    .then(data => {
      setItemIdList(data.result)
      setIsSearch(true)
    })
    .catch(err => console.log(err))
  }
  
  return (
    <div className="App">
      <Filter brandList={brandList} filterProduct={filterProduct} setProductPage={setProductPage} setIsSearch={setIsSearch}/>
      <ProductList itemList={itemList} isLoading={isLoading}/>
      {pages > 1 && !isSearch && !isLoading
      ? <Pagination className='products__pagination' 
          count={pages} 
          page={productPage}
          onChange={(_, number) => setProductPage(number)} 
          variant="outlined" 
        />
      : ''
    }
    </div>
  );
}

export default App;
