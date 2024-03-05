import md5 from "js-md5";

class ProductApi {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _check(res, callback) {
    if(res.ok) {
      return res.json();
    }else {
      console.error(`Ошибка: ${res.status}`);
      return callback();
    }
  }

  getProductId(productPage) {
    this._request = this._baseUrl
    return fetch(this._request, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        "action": "get_ids",
        "params": {"offset": (productPage - 1) * 50, "limit": 50}
      })
    }).then((res) => this._check(res, () => this.getProductId(productPage)))
  }

  getProductListLength() {
    this._request = this._baseUrl
    return fetch(this._request, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        "action": "get_ids",
      })
    }).then((res) => this._check(res, () => this.getProductListLength()))
  }

  getProductList(itemsIdList) {
    this._request = this._baseUrl
    return fetch(this._request, {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({
          "action": "get_items",
          "params": {"ids": itemsIdList}
        })
      }).then((res) => this._check(res, () => this.getProductList(itemsIdList)))
  }

  getBrands(){
    this._request = this._baseUrl
    return fetch(this._request, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        "action": "get_fields",
        "params": {"field": "brand"}
      })
    }).then((res) => this._check(res, () => this.getBrands()))
  }

  filterProductList(filterList){
    this._request = this._baseUrl
    return fetch(this._request, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        "action": "filter",
        "params": filterList
      })
    }).then((res) => this._check(res, () => this.filterProductList(filterList)))
  }

}

export const productApi = new ProductApi({
  baseUrl: 'http://api.valantis.store:40000/',
  headers: {
    'Content-Type': 'application/json',
    'X-Auth': md5(`Valantis_${new Date().toISOString().slice(0, 10).replace(/-/g, '')}`),
  }
});