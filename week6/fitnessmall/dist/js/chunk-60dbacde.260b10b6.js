(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-60dbacde"],{"057f":function(t,r,e){var n=e("fc6a"),i=e("241c").f,o={}.toString,a="object"==typeof window&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[],c=function(t){try{return i(t)}catch(r){return a.slice()}};t.exports.f=function(t){return a&&"[object Window]"==o.call(t)?c(t):i(n(t))}},"06c5":function(t,r,e){"use strict";e.d(r,"a",(function(){return i}));e("a630"),e("fb6a"),e("b0c0"),e("d3b7"),e("25f0"),e("3ca3");var n=e("6b75");function i(t,r){if(t){if("string"===typeof t)return Object(n["a"])(t,r);var e=Object.prototype.toString.call(t).slice(8,-1);return"Object"===e&&t.constructor&&(e=t.constructor.name),"Map"===e||"Set"===e?Array.from(t):"Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e)?Object(n["a"])(t,r):void 0}}},2532:function(t,r,e){"use strict";var n=e("23e7"),i=e("5a34"),o=e("1d80"),a=e("ab13");n({target:"String",proto:!0,forced:!a("includes")},{includes:function(t){return!!~String(o(this)).indexOf(i(t),arguments.length>1?arguments[1]:void 0)}})},2909:function(t,r,e){"use strict";e.d(r,"a",(function(){return s}));var n=e("6b75");function i(t){if(Array.isArray(t))return Object(n["a"])(t)}e("a4d3"),e("e01a"),e("d28b"),e("a630"),e("d3b7"),e("3ca3"),e("ddb0");function o(t){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}var a=e("06c5");function c(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function s(t){return i(t)||o(t)||Object(a["a"])(t)||c()}},"3ca3":function(t,r,e){"use strict";var n=e("6547").charAt,i=e("69f3"),o=e("7dd0"),a="String Iterator",c=i.set,s=i.getterFor(a);o(String,"String",(function(t){c(this,{type:a,string:String(t),index:0})}),(function(){var t,r=s(this),e=r.string,i=r.index;return i>=e.length?{value:void 0,done:!0}:(t=n(e,i),r.index+=t.length,{value:t,done:!1})}))},"4df4":function(t,r,e){"use strict";var n=e("0366"),i=e("7b0b"),o=e("9bdd"),a=e("e95a"),c=e("50c4"),s=e("8418"),u=e("35a1");t.exports=function(t){var r,e,f,d,l,p,b=i(t),h="function"==typeof this?this:Array,v=arguments.length,g=v>1?arguments[1]:void 0,y=void 0!==g,m=u(b),S=0;if(y&&(g=n(g,v>2?arguments[2]:void 0,2)),void 0==m||h==Array&&a(m))for(r=c(b.length),e=new h(r);r>S;S++)p=y?g(b[S],S):b[S],s(e,S,p);else for(d=m.call(b),l=d.next,e=new h;!(f=l.call(d)).done;S++)p=y?o(d,g,[f.value,S],!0):f.value,s(e,S,p);return e.length=S,e}},"5a34":function(t,r,e){var n=e("44e7");t.exports=function(t){if(n(t))throw TypeError("The method doesn't accept regular expressions");return t}},"6b75":function(t,r,e){"use strict";function n(t,r){(null==r||r>t.length)&&(r=t.length);for(var e=0,n=new Array(r);e<r;e++)n[e]=t[e];return n}e.d(r,"a",(function(){return n}))},"746f":function(t,r,e){var n=e("428f"),i=e("5135"),o=e("e538"),a=e("9bf2").f;t.exports=function(t){var r=n.Symbol||(n.Symbol={});i(r,t)||a(r,t,{value:o.f(t)})}},"81b1":function(t,r,e){"use strict";e.r(r);var n=function(){var t=this,r=t.$createElement,e=t._self._c||r;return e("div",{staticClass:"container mt-5"},[t.products.length>0?e("div",{staticClass:"row product"},[e("div",{staticClass:"col-md-4"},[e("ul",{staticClass:"list-group sticky-top rounded-0"},[e("a",{staticClass:"list-group-item list-group-item-action",class:{active:""===t.filterCategory},attrs:{href:"#"},on:{click:function(r){r.preventDefault(),t.filterCategory=""}}},[t._v(" 全部商品 ")]),t._l(t.categories,(function(r){return e("a",{key:r,staticClass:"list-group-item list-group-item-action",class:{active:r===t.filterCategory},attrs:{href:"#"},on:{click:function(e){e.preventDefault(),t.filterCategory=r}}},[t._v(" "+t._s(r)+" ")])}))],2)]),e("div",{staticClass:"col-md-8"},[e("div",{staticClass:"row"},t._l(t.filterCategories,(function(r){return e("div",{key:r.id,staticClass:"col-md-6"},[e("div",{staticClass:"card border-0 mb-4 position-relative position-relative"},[e("img",{staticClass:"card-img-top rounded-0",attrs:{src:r.imageUrl[0],alt:"..."}}),e("div",{staticClass:"card-body p-0"},[e("h4",{staticClass:"mb-0 mt-3"},[e("router-link",{attrs:{to:"/product/"+r.id}},[t._v(t._s(r.title))])],1),e("p",{staticClass:"card-text mb-0 price"},[t._v(t._s(t._f("currency")(r.price))+" "),e("span",{staticClass:"text-muted "},[e("del",[t._v(t._s(t._f("currency")(r.origin_price)))])])]),e("button",{staticClass:"btn btn-secondary mt-2 btn-block",on:{click:function(e){return t.addToCart(r)}}},[t.statusId===r.id?e("b-spinner",{attrs:{small:"",type:"grow"}}):t._e(),t._v(" 加入購物車 ")],1)])])])})),0)])]):t._e(),e("router-link",{staticClass:"cart px-2 py-3 bg-primary",attrs:{to:"/cart"}},[e("CartIcon")],1)],1)},i=[],o=(e("99af"),e("4de4"),e("caad"),e("2532"),function(){var t=this,r=t.$createElement,e=t._self._c||r;return e("div",[e("i",{staticClass:"fa fa-shopping-cart text-light fa-1x",staticStyle:{"font-size":"1.4rem",transform:"translateX(5px)"},attrs:{"aria-hidden":"true"}}),e("span",{staticClass:"badge badge-pill badge-danger",staticStyle:{transform:"translateX(1px) translateY(-2px)"}},[t._v(" "+t._s(t.carts.length)+" ")])])}),a=[],c=e("2909"),s={data:function(){return{carts:[]}},methods:{getCart:function(){var t=this,r="".concat("https://course-ec-api.hexschool.io/api","/").concat("e9fd54ce-9d42-40cb-ba4e-14553d1d6375","/ec/shopping");this.$http.get(r).then((function(r){t.carts=Object(c["a"])(r.data.data)})).catch((function(t){console.log(t)}))}},created:function(){var t=this;this.getCart(),this.$bus.$on("quantity",(function(){t.getCart()}))}},u=s,f=e("2877"),d=Object(f["a"])(u,o,a,!1,null,null,null),l=d.exports,p={components:{CartIcon:l},data:function(){return{products:[],statusId:"",categories:["沙拉","早餐套餐","水果拼盤"],filterCategory:""}},methods:{getProducts:function(){var t=this,r=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,e=this.$loading.show(),n="".concat("https://course-ec-api.hexschool.io/api","/").concat("e9fd54ce-9d42-40cb-ba4e-14553d1d6375","/ec/products");this.$http.get(n,{params:{page:r}}).then((function(r){t.products=r.data.data,e.hide()})).catch((function(){}))},addToCart:function(t){var r=this;this.statusId=t.id;var e="".concat("https://course-ec-api.hexschool.io/api","/").concat("e9fd54ce-9d42-40cb-ba4e-14553d1d6375","/ec/shopping"),n={product:t.id,quantity:1};this.$http.post(e,n).then((function(){r.$bus.$emit("quantity",n.quantity),r.statusId="",r.$swal("產品添加成功","請至購物車結帳","success")})).catch((function(t){r.statusId="",r.$swal("商品重複",t.response.data.errors[0],"error")}))}},computed:{filterCategories:function(){var t=this;return this.filterCategory?this.products.filter((function(r){var e=r.category.toLowerCase().includes(t.filterCategory.toLowerCase());return e})):this.products}},created:function(){this.getProducts()}},b=p,h=(e("ac44"),Object(f["a"])(b,n,i,!1,null,null,null));r["default"]=h.exports},8418:function(t,r,e){"use strict";var n=e("c04e"),i=e("9bf2"),o=e("5c6c");t.exports=function(t,r,e){var a=n(r);a in t?i.f(t,a,o(0,e)):t[a]=e}},"99af":function(t,r,e){"use strict";var n=e("23e7"),i=e("d039"),o=e("e8b5"),a=e("861d"),c=e("7b0b"),s=e("50c4"),u=e("8418"),f=e("65f0"),d=e("1dde"),l=e("b622"),p=e("2d00"),b=l("isConcatSpreadable"),h=9007199254740991,v="Maximum allowed index exceeded",g=p>=51||!i((function(){var t=[];return t[b]=!1,t.concat()[0]!==t})),y=d("concat"),m=function(t){if(!a(t))return!1;var r=t[b];return void 0!==r?!!r:o(t)},S=!g||!y;n({target:"Array",proto:!0,forced:S},{concat:function(t){var r,e,n,i,o,a=c(this),d=f(a,0),l=0;for(r=-1,n=arguments.length;r<n;r++)if(o=-1===r?a:arguments[r],m(o)){if(i=s(o.length),l+i>h)throw TypeError(v);for(e=0;e<i;e++,l++)e in o&&u(d,l,o[e])}else{if(l>=h)throw TypeError(v);u(d,l++,o)}return d.length=l,d}})},a4d3:function(t,r,e){"use strict";var n=e("23e7"),i=e("da84"),o=e("d066"),a=e("c430"),c=e("83ab"),s=e("4930"),u=e("fdbf"),f=e("d039"),d=e("5135"),l=e("e8b5"),p=e("861d"),b=e("825a"),h=e("7b0b"),v=e("fc6a"),g=e("c04e"),y=e("5c6c"),m=e("7c73"),S=e("df75"),w=e("241c"),C=e("057f"),O=e("7418"),x=e("06cf"),_=e("9bf2"),j=e("d1e7"),A=e("9112"),$=e("6eeb"),k=e("5692"),E=e("f772"),I=e("d012"),P=e("90e3"),T=e("b622"),N=e("e538"),q=e("746f"),F=e("d44e"),J=e("69f3"),D=e("b727").forEach,M=E("hidden"),L="Symbol",R="prototype",U=T("toPrimitive"),X=J.set,z=J.getterFor(L),Q=Object[R],W=i.Symbol,Y=o("JSON","stringify"),B=x.f,G=_.f,H=C.f,K=j.f,V=k("symbols"),Z=k("op-symbols"),tt=k("string-to-symbol-registry"),rt=k("symbol-to-string-registry"),et=k("wks"),nt=i.QObject,it=!nt||!nt[R]||!nt[R].findChild,ot=c&&f((function(){return 7!=m(G({},"a",{get:function(){return G(this,"a",{value:7}).a}})).a}))?function(t,r,e){var n=B(Q,r);n&&delete Q[r],G(t,r,e),n&&t!==Q&&G(Q,r,n)}:G,at=function(t,r){var e=V[t]=m(W[R]);return X(e,{type:L,tag:t,description:r}),c||(e.description=r),e},ct=u?function(t){return"symbol"==typeof t}:function(t){return Object(t)instanceof W},st=function(t,r,e){t===Q&&st(Z,r,e),b(t);var n=g(r,!0);return b(e),d(V,n)?(e.enumerable?(d(t,M)&&t[M][n]&&(t[M][n]=!1),e=m(e,{enumerable:y(0,!1)})):(d(t,M)||G(t,M,y(1,{})),t[M][n]=!0),ot(t,n,e)):G(t,n,e)},ut=function(t,r){b(t);var e=v(r),n=S(e).concat(bt(e));return D(n,(function(r){c&&!dt.call(e,r)||st(t,r,e[r])})),t},ft=function(t,r){return void 0===r?m(t):ut(m(t),r)},dt=function(t){var r=g(t,!0),e=K.call(this,r);return!(this===Q&&d(V,r)&&!d(Z,r))&&(!(e||!d(this,r)||!d(V,r)||d(this,M)&&this[M][r])||e)},lt=function(t,r){var e=v(t),n=g(r,!0);if(e!==Q||!d(V,n)||d(Z,n)){var i=B(e,n);return!i||!d(V,n)||d(e,M)&&e[M][n]||(i.enumerable=!0),i}},pt=function(t){var r=H(v(t)),e=[];return D(r,(function(t){d(V,t)||d(I,t)||e.push(t)})),e},bt=function(t){var r=t===Q,e=H(r?Z:v(t)),n=[];return D(e,(function(t){!d(V,t)||r&&!d(Q,t)||n.push(V[t])})),n};if(s||(W=function(){if(this instanceof W)throw TypeError("Symbol is not a constructor");var t=arguments.length&&void 0!==arguments[0]?String(arguments[0]):void 0,r=P(t),e=function(t){this===Q&&e.call(Z,t),d(this,M)&&d(this[M],r)&&(this[M][r]=!1),ot(this,r,y(1,t))};return c&&it&&ot(Q,r,{configurable:!0,set:e}),at(r,t)},$(W[R],"toString",(function(){return z(this).tag})),$(W,"withoutSetter",(function(t){return at(P(t),t)})),j.f=dt,_.f=st,x.f=lt,w.f=C.f=pt,O.f=bt,N.f=function(t){return at(T(t),t)},c&&(G(W[R],"description",{configurable:!0,get:function(){return z(this).description}}),a||$(Q,"propertyIsEnumerable",dt,{unsafe:!0}))),n({global:!0,wrap:!0,forced:!s,sham:!s},{Symbol:W}),D(S(et),(function(t){q(t)})),n({target:L,stat:!0,forced:!s},{for:function(t){var r=String(t);if(d(tt,r))return tt[r];var e=W(r);return tt[r]=e,rt[e]=r,e},keyFor:function(t){if(!ct(t))throw TypeError(t+" is not a symbol");if(d(rt,t))return rt[t]},useSetter:function(){it=!0},useSimple:function(){it=!1}}),n({target:"Object",stat:!0,forced:!s,sham:!c},{create:ft,defineProperty:st,defineProperties:ut,getOwnPropertyDescriptor:lt}),n({target:"Object",stat:!0,forced:!s},{getOwnPropertyNames:pt,getOwnPropertySymbols:bt}),n({target:"Object",stat:!0,forced:f((function(){O.f(1)}))},{getOwnPropertySymbols:function(t){return O.f(h(t))}}),Y){var ht=!s||f((function(){var t=W();return"[null]"!=Y([t])||"{}"!=Y({a:t})||"{}"!=Y(Object(t))}));n({target:"JSON",stat:!0,forced:ht},{stringify:function(t,r,e){var n,i=[t],o=1;while(arguments.length>o)i.push(arguments[o++]);if(n=r,(p(r)||void 0!==t)&&!ct(t))return l(r)||(r=function(t,r){if("function"==typeof n&&(r=n.call(this,t,r)),!ct(r))return r}),i[1]=r,Y.apply(null,i)}})}W[R][U]||A(W[R],U,W[R].valueOf),F(W,L),I[M]=!0},a630:function(t,r,e){var n=e("23e7"),i=e("4df4"),o=e("1c7e"),a=!o((function(t){Array.from(t)}));n({target:"Array",stat:!0,forced:a},{from:i})},ab13:function(t,r,e){var n=e("b622"),i=n("match");t.exports=function(t){var r=/./;try{"/./"[t](r)}catch(e){try{return r[i]=!1,"/./"[t](r)}catch(n){}}return!1}},ac44:function(t,r,e){"use strict";var n=e("dc16"),i=e.n(n);i.a},b0c0:function(t,r,e){var n=e("83ab"),i=e("9bf2").f,o=Function.prototype,a=o.toString,c=/^\s*function ([^ (]*)/,s="name";n&&!(s in o)&&i(o,s,{configurable:!0,get:function(){try{return a.call(this).match(c)[1]}catch(t){return""}}})},caad:function(t,r,e){"use strict";var n=e("23e7"),i=e("4d64").includes,o=e("44d2"),a=e("ae40"),c=a("indexOf",{ACCESSORS:!0,1:0});n({target:"Array",proto:!0,forced:!c},{includes:function(t){return i(this,t,arguments.length>1?arguments[1]:void 0)}}),o("includes")},d28b:function(t,r,e){var n=e("746f");n("iterator")},dc16:function(t,r,e){},ddb0:function(t,r,e){var n=e("da84"),i=e("fdbc"),o=e("e260"),a=e("9112"),c=e("b622"),s=c("iterator"),u=c("toStringTag"),f=o.values;for(var d in i){var l=n[d],p=l&&l.prototype;if(p){if(p[s]!==f)try{a(p,s,f)}catch(h){p[s]=f}if(p[u]||a(p,u,d),i[d])for(var b in o)if(p[b]!==o[b])try{a(p,b,o[b])}catch(h){p[b]=o[b]}}}},e01a:function(t,r,e){"use strict";var n=e("23e7"),i=e("83ab"),o=e("da84"),a=e("5135"),c=e("861d"),s=e("9bf2").f,u=e("e893"),f=o.Symbol;if(i&&"function"==typeof f&&(!("description"in f.prototype)||void 0!==f().description)){var d={},l=function(){var t=arguments.length<1||void 0===arguments[0]?void 0:String(arguments[0]),r=this instanceof l?new f(t):void 0===t?f():f(t);return""===t&&(d[r]=!0),r};u(l,f);var p=l.prototype=f.prototype;p.constructor=l;var b=p.toString,h="Symbol(test)"==String(f("test")),v=/^Symbol\((.*)\)[^)]+$/;s(p,"description",{configurable:!0,get:function(){var t=c(this)?this.valueOf():this,r=b.call(t);if(a(d,t))return"";var e=h?r.slice(7,-1):r.replace(v,"$1");return""===e?void 0:e}}),n({global:!0,forced:!0},{Symbol:l})}},e538:function(t,r,e){var n=e("b622");r.f=n},fb6a:function(t,r,e){"use strict";var n=e("23e7"),i=e("861d"),o=e("e8b5"),a=e("23cb"),c=e("50c4"),s=e("fc6a"),u=e("8418"),f=e("b622"),d=e("1dde"),l=e("ae40"),p=d("slice"),b=l("slice",{ACCESSORS:!0,0:0,1:2}),h=f("species"),v=[].slice,g=Math.max;n({target:"Array",proto:!0,forced:!p||!b},{slice:function(t,r){var e,n,f,d=s(this),l=c(d.length),p=a(t,l),b=a(void 0===r?l:r,l);if(o(d)&&(e=d.constructor,"function"!=typeof e||e!==Array&&!o(e.prototype)?i(e)&&(e=e[h],null===e&&(e=void 0)):e=void 0,e===Array||void 0===e))return v.call(d,p,b);for(n=new(void 0===e?Array:e)(g(b-p,0)),f=0;p<b;p++,f++)p in d&&u(n,f,d[p]);return n.length=f,n}})}}]);
//# sourceMappingURL=chunk-60dbacde.260b10b6.js.map