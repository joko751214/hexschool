new Vue({
  el: '#app',
  data: {
    products: [],
    tempProduct: {
      imageUrl: []
    },
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
      const apiUrl = `https://course-ec-api.hexschool.io/api/${this.user.uuid}/admin/ec/products?page=${page}`

      axios.defaults.headers.common.Authorization = `Bearer ${this.user.token}`;

      axios.get(apiUrl)
        .then(res => {
          this.products = res.data.data  // 取得產品列表
          this.pagination = res.data.meta.pagination  // 取得分頁資訊
          console.log(res)
        })
    },
    openModal(status, item) {
      switch(status) {
        case 'new':
          this.tempProduct = {
            imageUrl: []
          };
          $("#productModal").modal("show");
          break;

        case 'edit':
          this.tempProduct = Object.assign({}, item);
          this.getProduct(item.id)
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
      let api = `https://course-ec-api.hexschool.io/api/${this.user.uuid}/admin/ec/product`;
      let httpMethod = 'post'
      
      axios.defaults.headers.common.Authorization = `Bearer ${this.user.token}`;

      if(this.tempProduct.id) {
        api = `https://course-ec-api.hexschool.io/api/${this.user.uuid}/admin/ec/product/${this.tempProduct.id}`
        httpMethod = 'patch'
      }

      axios[httpMethod](api, this.tempProduct)
        .then( () => {
          this.getProducts();
          $("#productModal").modal("hide");
        }).catch(error => {
          console.log(error);
        })      
    },
    getProduct(id) {
      let api = `https://course-ec-api.hexschool.io/api/${this.user.uuid}/admin/ec/product/${id}`;

      axios.get(api)
        .then(res => {
          this.tempProduct = res.data.data
          $("#productModal").modal("show");
        })
    },
    deleteProduct() {
      let api = `https://course-ec-api.hexschool.io/api/${this.user.uuid}/admin/ec/product/${this.tempProduct.id}`;

      axios.defaults.headers.common.Authorization = `Bearer ${this.user.token}`;

      axios.delete(api)
        .then( () => {
          this.getProducts();
          $("#deleteModal").modal("hide");
        })
    },
    uploadFile() {

    }
  },
})