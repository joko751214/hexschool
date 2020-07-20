new Vue({
	el: '#app',
	data: {
		uuid: 'e9fd54ce-9d42-40cb-ba4e-14553d1d6375',
		apiPath: 'https://course-ec-api.hexschool.io/api',
    products: [],
    tempProduct: {
      image: []
    }
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
      this.$refs.temp.getProduct(this.tempProduct.id);
    }
  },
	created() {
		this.getProducts();
	},
})


// var obj = {
// 	data: {
// 		uuid: 'e9fd54ce-9d42-40cb-ba4e-14553d1d6375',
// 		apiPath: 'https://course-ec-api.hexschool.io/api',
// 		products: []
// 	},
// 	getData() {
// 		var vm = this;
// 		var url = `${vm.data.apiPath}/${vm.data.uuid}/ec/products`;
// 		axios.get(url)
// 			.then(function(res){
// 				vm.data.products = res.data.data
// 				vm.render()
// 		})
// 	},
// 	render() {
// 		var str = '';
// 		var productList = document.querySelector(".product")
// 		this.data.products.forEach(item => {
// 			str += `<div class="col-sm col-md-4 col-sm-4"><img class = "img-fluid" src="${item.imageUrl}"/>
// 				<div class="title">${item.title}</div>
// 				<div class="price">${item.price}</div>
// 				<button class="btn btn-outline-primary mt-2 float-left">查看內容</button>
// 			<button class="btn btn-outline-danger mt-2 float-right">加入購物車</button>
//     </div>`;
// 		})
// 		productList.innerHTML = str;
// 	}
// };
// obj.getData();