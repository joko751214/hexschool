(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-bba33ba2"],{"60df":function(t,c,n){"use strict";var a=n("f758"),s=n.n(a);s.a},8418:function(t,c,n){"use strict";var a=n("c04e"),s=n("9bf2"),e=n("5c6c");t.exports=function(t,c,n){var o=a(c);o in t?s.f(t,o,e(0,n)):t[o]=n}},"99af":function(t,c,n){"use strict";var a=n("23e7"),s=n("d039"),e=n("e8b5"),o=n("861d"),r=n("7b0b"),i=n("50c4"),u=n("8418"),d=n("65f0"),l=n("1dde"),f=n("b622"),p=n("2d00"),h=f("isConcatSpreadable"),b=9007199254740991,v="Maximum allowed index exceeded",g=p>=51||!s((function(){var t=[];return t[h]=!1,t.concat()[0]!==t})),m=l("concat"),w=function(t){if(!o(t))return!1;var c=t[h];return void 0!==c?!!c:e(t)},_=!g||!m;a({target:"Array",proto:!0,forced:_},{concat:function(t){var c,n,a,s,e,o=r(this),l=d(o,0),f=0;for(c=-1,a=arguments.length;c<a;c++)if(e=-1===c?o:arguments[c],w(e)){if(s=i(e.length),f+s>b)throw TypeError(v);for(n=0;n<s;n++,f++)n in e&&u(l,f,e[n])}else{if(f>=b)throw TypeError(v);u(l,f++,e)}return l.length=f,l}})},e6dc:function(t,c,n){"use strict";n.r(c);var a=function(){var t=this,c=t.$createElement,n=t._self._c||c;return n("div",{staticClass:"row product"},t._l(t.products,(function(c){return n("div",{key:c.id,staticClass:"col-sm col-md-4 col-sm-4"},[n("img",{staticClass:"size",attrs:{src:c.imageUrl[0],alt:""}}),n("div",{staticClass:"title"},[t._v(t._s(c.title))]),n("div",{staticClass:"price"},[t._v(t._s(t._f("currency")(c.price)))]),n("router-link",{staticClass:"btn btn-outline-primary float-left",attrs:{to:"/product/"+c.id}},[t._v("查看內容")]),n("button",{staticClass:"btn btn-outline-danger mt-2 float-right",on:{click:function(n){return t.addToCart(c)}}},[t.statusId===c.id?n("b-spinner",{attrs:{small:"",type:"grow"}}):t._e(),t._v(" 加入購物車 ")],1)],1)})),0)},s=[],e=(n("99af"),{data:function(){return{products:[],statusId:""}},methods:{getProducts:function(){var t=this,c=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,n=this.$loading.show(),a="".concat("https://course-ec-api.hexschool.io/api","/").concat("e9fd54ce-9d42-40cb-ba4e-14553d1d6375","/ec/products");this.$http.get(a,{params:{page:c}}).then((function(c){console.log(c),t.products=c.data.data,n.hide()})).catch((function(t){console.log(t)}))},addToCart:function(t){var c=this;this.statusId=t.id;var n="".concat("https://course-ec-api.hexschool.io/api","/").concat("e9fd54ce-9d42-40cb-ba4e-14553d1d6375","/ec/shopping"),a={product:t.id,quantity:1};this.$http.post(n,a).then((function(){c.$bus.$emit("quantity",a.quantity),c.statusId="",c.$swal("產品添加成功","請至購物車結帳","success")})).catch((function(t){c.statusId="",c.$swal("商品重複",t.response.data.errors[0],"error")}))}},created:function(){this.getProducts()}}),o=e,r=(n("60df"),n("2877")),i=Object(r["a"])(o,a,s,!1,null,null,null);c["default"]=i.exports},f758:function(t,c,n){}}]);
//# sourceMappingURL=chunk-bba33ba2.72b3d36d.js.map