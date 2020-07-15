new Vue({
  el: '#app',
  data: {
    products: [],
    tempProduct: {},
    user: {
      token: '',
      uuid: 'e9fd54ce-9d42-40cb-ba4e-14553d1d6375'
    },
    pagination: {}
  },
  created() {
    // 取得token的cookies
    this.user.token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");

    if(this.user.token === '') {
      window.location = 'Login.html';
    }
    // 取得全部的產品
    this.getProducts();
  },
  methods: {
    getProducts(page = 1) {
      const apiUrl = `https://course-ec-api.hexschool.io/api/${this.user.uuid}/ec/products?page=${page}`

      axios.defaults.headers.common.Authorization = `Bearer ${this.user.token}`;

      axios.get(apiUrl)
        .then(res => {
          this.products = res.data.data  // 取得產品列表
          this.pagination = res.data.meta.pagination  // 取得分頁資訊
        })
    },
    openModal(status, item) {
      switch(status) {
        case 'new':
        this.tempProduct = {};
          $("#productModal").modal("show");
          break;

        case 'edit':
          this.tempProduct = Object.assign({}, item);
          $("#productModal").modal("show");
          break;

        case 'delete':
          this.tempProduct = Object.assign({}, item);
          $('#deleteModal').modal('show');
          break;
        default:
          break;
      }
    },
    updateProduct() {
      api = `https://course-ec-api.hexschool.io/api/${this.user.uuid}/admin/ec/product/${this.tempProduct.id}`;
      axios.defaults.headers.common.Authorization = `Bearer ${this.user.token}`;

      axios.patch(api, this.tempProduct)
        .then(() => {
          $("#productModal").modal("hide");
          console.log(this.tempProduct)
          this.getProducts();
        }).catch(error => {
          console.log(error);
        })
      // if(this.tempProduct.id) {
      //   const id = this.tempProduct.id
      //   this.products.forEach((item, index) => {
      //     if(item.id === id) {
      //       this.products[index] = this.tempProduct;
      //     }
      //   });
      // }else {
      //   const id = new Date().getTime();
      //   this.tempProduct.id = id;
      //   this.products.push(this.tempProduct);
      // }
      
    },
    deleteProduct() {
      if(this.tempProduct.id) {
        const id = this.tempProduct.id
        this.products.forEach((item, index) => {
          if(item.id === id) {
            this.products.splice(index, 1);
          }
        });
        this.tempProduct = {};
        $('#deleteModal').modal('hide');
      }
    },
    uploadFile() {

    }
  },
})