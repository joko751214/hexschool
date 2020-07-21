// 匯入語系檔案
import zh_TW from './zh_TW.js';

// Class 設定檔案
VeeValidate.configure({
  classes: {
    valid: 'is-valid',
    invalid: 'is-invalid',
  }
});

// 加入至 VeeValidate 的設定檔案
VeeValidate.localize('tw', zh_TW);

// 插件
Vue.component('loading', VueLoading);
// 欄位驗證
Vue.component('ValidationProvider', VeeValidate.ValidationProvider);
// form 驗證
Vue.component('ValidationObserver', VeeValidate.ValidationObserver);

Vue.filter('money', function(num) {
  const parts = num.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return '$' + parts.join('.');
})



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
    statusId: '',
    carts: [],
    totalPrice: 0,
    isLoading: false,
    form: {
      name: '',
      email: '',
      tel: '',
      address: '',
      payment: '',
      message: ''
    }
	},
	methods: {
		getProducts(page = 1) {
      this.isLoading = true;
			const url = `${this.apiPath}/${this.uuid}/ec/products?page=${page}`;
			axios.get(url)
					.then(res => {
            this.products = res.data.data;
            this.isLoading = false;
				}).catch(err => {
					console.log(err);
				})
			},
		openModal(status, item) {
      switch (status) {
        case 'content':
          this.statusId = item.id
          this.tempProduct = Object.assign({}, item)
          this.getProduct(this.tempProduct.id);
          break;
        case 'confirm':
          $("#formModal").modal('show');
      }  
		},
		getProduct(id) {
      let api = `https://course-ec-api.hexschool.io/api/${this.uuid}/ec/product/${id}`;

      this.isLoading = true;
      axios.get(api)
        .then(res => {
          this.tempProduct = res.data.data;
          this.isLoading = false;
          $("#tempProductModal").modal("show");
          this.statusId = '';
        })
    },
    addToCart(item, num=1) {
      this.statusId = item.id;
      const url = `${this.apiPath}/${this.uuid}/ec/shopping`;
      
      const parm = {
        product: item.id,
        quantity: num
      };
      
      this.isLoading = true;
      axios.post(url, parm)
        .then( res => {
          this.getCartData();
          Swal.fire(
            '產品添加成功',
            '請至購物車結帳',
            'success'
          );
          this.isLoading = false;
          this.statusId = '';
        })
        .catch(err => {
          Swal.fire(
            '商品重複',
            err.response.data.errors[0],
            'error'
          );
          this.isLoading = false;
          this.statusId = '';
        })

      $("#tempProductModal").modal("hide");
    },
    amount() {
      console.log($(".btn.btn-sm.btn-cart"));
      this.totalPrice = 0;
      this.carts.forEach( item => {
        this.totalPrice += item.price*item.num;
      });
    },
    updateCartData(item, status) {
      switch(status){
        case '+':
          item.quantity += 1;
          break;
        case '-':
          item.quantity -= 1;
          break;
      }
      const url = `${this.apiPath}/${this.uuid}/ec/shopping`;
      
      const parm = {
        product: item.product.id,
        quantity: item.quantity
      };

      this.isLoading = true;
      axios.patch(url, parm)
        .then( res => {
          this.getCartData();
          this.isLoading = false;
          Swal.fire(
            '產品更新成功',
            '請至購物車結帳',
            'success'
          );
        })
        .catch(err => {
          console.log("錯誤信息:", err);
        })
    },
    getCartData() {
      const url = `${this.apiPath}/${this.uuid}/ec/shopping`;

      axios.get(url)
        .then( res => {
          this.carts = [...res.data.data];
        })
        .catch(err => {
          console.log(err);
        })
    },
    deleteCartList(item) {
      if(item) {    
        const url = `${this.apiPath}/${this.uuid}/ec/shopping/${item.id}`;
        const parm = {
          product: item.id
        };

        this.isLoading = true;
        axios.delete(url, parm)
          .then( res => {
            this.getCartData();
            this.isLoading = false;
            Swal.fire(
              '商品刪除',
              '可以再看看其他的',
              'success'
            );
          })
          .catch( err => {
            console.log(err);
          })
      }else {
        const url = `${this.apiPath}/${this.uuid}/ec/shopping/all/product`;

        this.isLoading = true;
        axios.delete(url)
          .then( res => {
            this.getCartData();
            this.isLoading = false;
            Swal.fire(
              '商品清空',
              '目前商品已全數清空',
              'success'
            );
          })
      }
      // 這邊要添加一個可以不讓表單摺疊回去的方法
    },
  },
	created() {
    this.getProducts();
    this.getCartData();
  },
  mounted() {
    
    $(".btn.btn-sm.btn-cart")[0].ariaExpanded = 'true';
    console.log($(".btn.btn-sm.btn-cart"))
    // $(".dropdown-menu.dropdown-menu-right")[0].draggable = true;
  }
})
