(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4307e5dd"],{"3f2d":function(t,a,e){"use strict";e.r(a);var s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",[e("div",{staticClass:"text-right mt-4"},[e("button",{staticClass:"btn btn-primary",attrs:{type:"button"},on:{click:function(a){return t.openModal("new")}}},[t._v("新增圖片")])]),e("table",{staticClass:"table mt-4"},[t._m(0),e("tbody",t._l(t.storages,(function(a,s){return e("tr",{key:s},[e("td",{staticStyle:{"vertical-align":"middle"}},[t._v("#"+t._s(s+1))]),e("td",[e("img",{staticClass:"img-fluid",attrs:{width:"100px",src:a.path,alt:"美味的餐點"}})]),e("td",{staticStyle:{"vertical-align":"middle"}},[e("div",{staticClass:"btn-group"},[e("button",{staticClass:"btn btn-outline-danger btn-sm",attrs:{type:"button"},on:{click:function(e){return t.openModal("delete",a,s)}}},[t._v("刪除")])])])])})),0)]),e("div",{staticClass:"modal fade",attrs:{id:"storageModal",tabindex:"-1",role:"dialog","aria-labelledby":"storageModalLabel","aria-hidden":"true"}},[e("div",{staticClass:"modal-dialog",attrs:{role:"document"}},[e("div",{staticClass:"modal-content"},[t._m(1),e("div",{staticClass:"modal-body"},[e("form",[e("div",{staticClass:"form-group"},[e("input",{ref:"file",staticClass:"form-control mt-3",attrs:{id:"customFile",type:"file"},on:{change:t.uploadFile}}),e("img",{staticClass:"img-fluid mt-3",attrs:{src:t.filePath,alt:"美味的餐點"}})])])]),e("div",{staticClass:"modal-footer"},[t.status?e("button",{staticClass:"btn btn-primary",attrs:{type:"button","data-dismiss":"modal"},on:{click:t.confirm}},[t._v("圖片上傳成功")]):t._e()])])])]),e("div",{staticClass:"modal fade",attrs:{id:"deleteModal",tabindex:"-1",role:"dialog","aria-labelledby":"deleteModalLabel","aria-hidden":"true"}},[e("div",{staticClass:"modal-dialog",attrs:{role:"document"}},[e("div",{staticClass:"modal-content"},[t._m(2),e("div",{staticClass:"modal-body"},[t._v("是否刪除 "),e("strong",{staticClass:"text-danger"},[t._v("第"+t._s(t.index+1)+"張")]),t._v(" 圖片(刪除後將無法恢復)。 ")]),e("div",{staticClass:"modal-footer"},[e("button",{staticClass:"btn btn-outline-secondary",attrs:{type:"button","data-dismiss":"modal"}},[t._v("取消")]),e("button",{staticClass:"btn btn-danger",attrs:{type:"button"},on:{click:function(a){return t.deleteStorage(t.tempStorage.id)}}},[t.mode?e("b-spinner",{attrs:{small:"",type:"grow"}}):t._e(),t._v(" 確認刪除 ")],1)])])])])])},o=[function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("thead",{staticClass:"thead-dark"},[e("tr",[e("th",[t._v("#")]),e("th",[t._v("圖片")]),e("th",[t._v("操作")])])])},function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"modal-header bg-dark text-white"},[e("h5",{staticClass:"modal-title ",attrs:{id:"exampleModalLabel"}},[t._v(" 上傳圖片 ")]),e("button",{staticClass:"close",attrs:{type:"button","data-dismiss":"modal","aria-label":"Close"}},[e("span",{attrs:{"aria-hidden":"true"}},[t._v("×")])])])},function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"modal-header bg-danger text-white"},[e("h5",{staticClass:"modal-title ",attrs:{id:"exampleModalLabel"}},[e("span",[t._v("刪除圖片")])]),e("button",{staticClass:"close",attrs:{type:"button","data-dismiss":"modal","aria-label":"Close"}},[e("span",{attrs:{"aria-hidden":"true"}},[t._v("×")])])])}],i=(e("99af"),e("ac1f"),e("5319"),{data:function(){return{storages:[],mode:!1,tempStorage:"",index:"",filePath:"",status:!1}},methods:{openModal:function(t,a,e){switch(t){case"new":$("#storageModal").modal("show");break;case"delete":this.tempStorage=Object.assign({},a),this.index=e,$("#deleteModal").modal("show");break;default:break}},getStorages:function(){var t=this,a="".concat("https://course-ec-api.hexschool.io/api","/").concat("e9fd54ce-9d42-40cb-ba4e-14553d1d6375","/admin/storage"),e=document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,"$1");this.$http.defaults.headers.common.Authorization="Bearer ".concat(e);var s=this.$loading.show();this.$http.get(a).then((function(a){t.storages=a.data.data,s.hide()})).catch((function(a){t.$swal("伺服器狀況",a.response.data.errors[0],"error")}))},deleteStorage:function(t){var a=this,e="".concat("https://course-ec-api.hexschool.io/api","/").concat("e9fd54ce-9d42-40cb-ba4e-14553d1d6375","/admin/storage/").concat(t);this.mode=!0,this.$http.delete(e).then((function(){a.mode=!1,$("#deleteModal").modal("hide"),a.getStorages()}))},uploadFile:function(){var t=this,a=this.$refs.file.files[0],e=new FormData;e.append("file",a);var s="".concat("https://course-ec-api.hexschool.io/api","/").concat("e9fd54ce-9d42-40cb-ba4e-14553d1d6375","/admin/storage"),o=this.$loading.show();this.$http.post(s,e,{headers:{"Content-Type":"multipart/form-data"}}).then((function(a){t.filePath=a.data.data.path,t.tempStorage=a.data.data,o.hide(),t.status=!0})).catch((function(a){t.$swal("伺服器狀況",a.response.data.errors[0],"error")}))},confirm:function(){this.getStorages()}},created:function(){this.getStorages()}}),n=i,r=e("2877"),d=Object(r["a"])(n,s,o,!1,null,null,null);a["default"]=d.exports},8418:function(t,a,e){"use strict";var s=e("c04e"),o=e("9bf2"),i=e("5c6c");t.exports=function(t,a,e){var n=s(a);n in t?o.f(t,n,i(0,e)):t[n]=e}},"99af":function(t,a,e){"use strict";var s=e("23e7"),o=e("d039"),i=e("e8b5"),n=e("861d"),r=e("7b0b"),d=e("50c4"),l=e("8418"),c=e("65f0"),u=e("1dde"),h=e("b622"),m=e("2d00"),f=h("isConcatSpreadable"),b=9007199254740991,p="Maximum allowed index exceeded",g=m>=51||!o((function(){var t=[];return t[f]=!1,t.concat()[0]!==t})),v=u("concat"),C=function(t){if(!n(t))return!1;var a=t[f];return void 0!==a?!!a:i(t)},_=!g||!v;s({target:"Array",proto:!0,forced:_},{concat:function(t){var a,e,s,o,i,n=r(this),u=c(n,0),h=0;for(a=-1,s=arguments.length;a<s;a++)if(i=-1===a?n:arguments[a],C(i)){if(o=d(i.length),h+o>b)throw TypeError(p);for(e=0;e<o;e++,h++)e in i&&l(u,h,i[e])}else{if(h>=b)throw TypeError(p);l(u,h++,i)}return u.length=h,u}})}}]);
//# sourceMappingURL=chunk-4307e5dd.48c6ea30.js.map