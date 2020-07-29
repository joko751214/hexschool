# 版面規劃

### router頁面

- 前台頁面
  * 首頁 /
  * 關於我們 /about
  * 線上商城(產品列表) /products
    * 單一產品頁面 / product
  * 聯絡我們 /contactus
  * 購物車(透過icon觸發) /cart
  * 購物成功(透過購物車頁面的button觸發) /checkout

- 後台管理頁面
  * 登入頁面 /login
  * 產品管理頁面 /admin/product
  * 優惠券管理頁面 /admin/coupons
  * 訂單管理頁面 /admin/manage

### 安裝套件
1.vue-loading-overlay
2.axios
3.bootstrap
4.font-awesome
5.vue-swal

### 未完善功能
1.將vue-loading-overlay傳遞到每個元件內，而不需要再多添加一個loading tag
2.購物車右邊浮現的數字目前還沒辦法隨時更新，只能透過點選之後，數字才會更新
3.products的 "加入購物車按鈕"，不知道能不能使用product裡面的方法
4.透過login登入頁面之後，整個畫面的樣式會跑掉，目前不知道是什麼原因
5.home & dashboard 的漢堡選單目前還沒辦法展開