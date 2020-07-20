Vue.component('tempProductModal', {
  template: `<div class="modal fade" id="tempProductModal" tabindex="-1" role="dialog" aria-labelledby="tempProductModalLabel" aria-hidden="true">
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="tempProductModalLabel">{{tempProduct.title}}</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <div class="text-center">
                      <img class="imgSize" style="height: 300px;width: 300px;" :src="tempProduct.imageUrl[0]"></img>
                    </div>
                    <div class="text-center mt-3">
                      <p class="text-left">{{tempProduct.content}}</p>
                      <p class="text-muted text-left" style="font-size: 8px;">{{tempProduct.description}}</p>
                      <p class="price text-right">{{tempProduct.price}}</p>
                    </div>
                    <select v-model="tempProduct.num" name class="form-control mt-3">
                      <option value="0" disabled selected>
                        請選擇數量
                      </option>
                      <option v-for="num in 10" :key="num" :value="num" >
                        選購 {{ num }} {{ tempProduct.unit }}
                      </option>
                    </select>
                  </div>
                  <div class="modal-footer">
                    <div v-if="tempProduct.num" class="text-muted">
                      小計 
                      <strong>{{ tempProduct.num * tempProduct.price }} 元</strong>
                    </div>
                    <button type="button" class="btn btn-primary" @click="confirm">加到購物車</button>
                  </div>
                </div>
              </div>
            </div>`,
  props: {
    uuid: {}
  },
  data() {
    return {
      tempProduct: {
        imageUrl: [],
        num: 0
      },
      cart: []
    }
  },
  methods: {
    getProduct(id) {
      let api = `https://course-ec-api.hexschool.io/api/${this.uuid}/ec/product/${id}`;

      axios.get(api)
        .then(res => {
          this.tempProduct = res.data.data;
          $("#tempProductModal").modal("show");
          console.log(this.tempProduct);
        })
    },
    confirm() {
      this.cart.push(this.tempProduct);
      $("#tempProductModal").modal("hide");
      this.tempProduct = {
        imageUrl: [],
        num: 0};
      console.log('cart:', this.cart);
    }
  },
  created() {
    console.log(this.tempProduct.num);
  }
})