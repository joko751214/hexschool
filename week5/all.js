new Vue({
	el: '#app',
	data: {
		uuid: 'e9fd54ce-9d42-40cb-ba4e-14553d1d6375',
		apiPath: 'https://course-ec-api.hexschool.io/api',
    products: [],
    tempProduct: {
			imageUrl: [],
			num: 0,
		},
    carts: {},
	},
	methods: {
		getProducts(page = 1) {
			const url = `${this.apiPath}/${this.uuid}/ec/products?page=${page}`;
			axios.get(url)
					.then(res => {
						this.products = res.data.data;
				}).catch(err => {
					console.log(err);
				})
			},
		openModal(item) {
      this.tempProduct = Object.assign({}, item)
			this.getProduct(this.tempProduct.id);
		},
		getProduct(id) {
      let api = `https://course-ec-api.hexschool.io/api/${this.uuid}/ec/product/${id}`;

      axios.get(api)
        .then(res => {
          this.tempProduct = res.data.data;
          $("#tempProductModal").modal("show");
        })
    },
    addToCart(item, num=1) {
      const url = `${this.apiPath}/${this.uuid}/ec/shopping`;

      const parm = {
        product: item.id,
        quantity: num
      };

      axios.post(url, parm)
        .then( res => {
          console.log('post:', res)
        })
        .catch(err => {
          console.log(err);
        })
      $("#tempProductModal").modal("hide");
    },
    getCartData() {
      const url = `${this.apiPath}/${this.uuid}/ec/shopping`;

      axios.get(url)
        .then( res => {
          console.log('get:', res)
        })
        .catch(err => {
          console.log(err);
        })
    }
  },
	created() {
		this.getProducts();
	},
})
