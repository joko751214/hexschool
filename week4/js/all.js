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

    this.getProducts();
  },
  methods: {
    // 取得所有產品
    getProducts(page = 1) {
      const apiUrl = `https://course-ec-api.hexschool.io/api/${this.user.uuid}/admin/ec/products?page=${page}`

      axios.defaults.headers['Authorization'] = `Bearer ${this.user.token}`;

      axios.get(apiUrl)
        .then(res => {
          this.products = res.data.data  // 取得產品列表
          this.pagination = res.data.meta.pagination  // 取得分頁資訊
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
          this.$refs.productModal.getProduct(this.tempProduct.id)
          break;

        case 'delete':
          this.tempProduct = Object.assign({}, item);
          $('#deleteModal').modal('show');
          break;
        default:
          break;
      }
    },
    
    uploadFile() {

    }
  },
})