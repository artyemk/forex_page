(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{306:function(t,e,r){"use strict";r(27),r(17);var c=r(13),n=r(14),l=(r(28),r(234),{position:"absolute",top:0,left:0,zIndex:99,width:"100%",minHeight:"100%",padding:"10px",background:"rgba(0,0,0,0.7)",color:"#fff",fontWeight:"bold"});function o(t){var{containerId:e,params:r,comment:c}=t||{};if(r&&(r=Object.entries(r).reduce((t,e)=>{var[r,c]=e;return t+="".concat(r,": ").concat(c,"<br>")},"")),c){var n={"\x3c!--":"","--\x3e":"<br>"},l=Object.keys(n).reduce((t,e,i)=>t+=0===i?e:"|"+e,""),o=new RegExp(l,"gi");c=c.replace(o,t=>n[t])}return"".concat(e,"<br><br>").concat(r,"<br>").concat(c)}function d(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,r)}return e}function _(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?d(Object(source),!0).forEach((function(e){Object(c.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):d(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var v={name:"Banner",props:{desktop:{type:Object,default:()=>({})},mobile:{type:Object,default:()=>({})},type:{type:String,default:""},param:{type:String,default:""}},data:()=>({isDebug:!1,debugStyles:l}),computed:_(_({},Object(n.b)({mobileDevice:"app/mobile"})),{},{debugOutput(){return this.isDebug&&o?o(this.mobileDevice&&this.mobile?this.mobile:this.desktop):""}}),mounted(){this.$nextTick(()=>{this.adFox()})},methods:{adFox(){this.desktop&&!1===this.mobileDevice?(void 0!==this.desktop.headerBidding&&setTimeout(()=>{this.createHeaderBidding(this.desktop)},1e3),this.createBanner(this.desktop.ownerId,this.desktop.containerId,this.desktop.params)):this.mobile&&!0===this.mobileDevice&&(void 0!==this.mobile.headerBidding&&setTimeout(()=>{this.createHeaderBidding(this.mobile)},1e3),this.createBanner(this.mobile.ownerId,this.mobile.containerId,this.mobile.params))},createBanner(t,e,r){return t&&e?window.Ya?void window.Ya.adfoxCode.create({ownerId:t,containerId:e,params:r,onLoad:data=>this.onLoad(data,this.name,e,this.type),onRender:()=>this.onRender(this.name,e,this.type),onError:t=>this.onError(t,this.name,e,this.type),onStub:()=>this.onStub(this.name,e,this.type)}):console.error("[adfox error]: there is no Ya in window"):console.error("[adfox error]: missing some arguments in createBanner of ".concat(this._name,": \n ownerId: ").concat(t," \n containerId: ").concat(e))},createHeaderBidding(object){var t=document.querySelector("#".concat(object.containerId));if(!t)return console.error("[adfox error]: there is no #".concat(object.containerId," in DOM"));if(!window.Ya||!window.Ya.headerBidding)return console.error("[adfox error]: there is no headerBidding in window.Ya");var e='window.Ya.headerBidding.pushAdUnits([{\n"code": "'+object.containerId+'",\n"bids": [{\n"bidder": "betweenDigital",\n"params": { "placementId": '+object.headerBidding.placementId+' }\n}],\n"sizes":'+object.headerBidding.sizes+"\n}]);",r=document.createElement("script"),c=document.createTextNode(e);r.appendChild(c),t.parentNode.insertBefore(r,t.nextSibling)},onLoad(data,t,e){var r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"",param=arguments.length>4&&void 0!==arguments[4]?arguments[4]:"";this.status(e,"onLoad",r,param)},onRender(t,e){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"",param=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"";if("adfox_4380714435"===e){var c=document.getElementsByClassName("a1oc4Rf");1===c.length&&(c[0].style["z-index"]=1e6)}this.status(e,"onRender",r,param)},onError(t,e,r){var c=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"",param=arguments.length>4&&void 0!==arguments[4]?arguments[4]:"";console.error("[adfox error]: error in",r,"with message",t),this.status(r,"onError",c,param)},onStub(t,e){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"",param=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"";console.error("[adfox stub]: stub in",e),this.status(e,"onStub",r,param)},status(t,e){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"",param=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"";this.$store.dispatch("banners/addBanner",{id:t,type:r,param:param,status:e})}}},m=(r(318),r(26)),component=Object(m.a)(v,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{class:{"--banner-debug":t.isDebug}},[!1===t.mobileDevice&&t.desktop?[t.desktop.comment?r("div",{directives:[{name:"show",rawName:"v-show",value:!1,expression:"false"}],domProps:{innerHTML:t._s(t.desktop.comment)}}):t._e(),t._v(" "),t.desktop.containerId?r("div",{attrs:{id:t.desktop.containerId}}):t._e(),t._v(" "),t.isDebug?r("div",{style:t.debugStyles,domProps:{innerHTML:t._s(t.debugOutput)}}):t._e()]:!0===t.mobileDevice&&t.mobile?[t.mobile.comment?r("div",{directives:[{name:"show",rawName:"v-show",value:!1,expression:"false"}],domProps:{innerHTML:t._s(t.mobile.comment)}}):t._e(),t._v(" "),t.mobile.containerId?r("div",{attrs:{id:t.mobile.containerId}}):t._e(),t._v(" "),t.isDebug?r("div",{style:t.debugStyles,domProps:{innerHTML:t._s(t.debugOutput)}}):t._e()]:t._e()],2)}),[],!1,null,null,null);e.a=component.exports},307:function(t,e,r){"use strict";var c={name:"Grid",props:{layout:{type:String},rowGap:{type:Number},colGap:{type:Number}},computed:{classes(){return{["grid-layout--"+this.layout]:this.layout,["grid-row--"+this.rowGap]:this.rowGap,["col-gap--"+this.colGap]:this.colGap}}}},n=r(26),component=Object(n.a)(c,(function(){var t=this.$createElement;return(this._self._c||t)("div",{class:["grid-layout",this.classes]},[this._t("default")],2)}),[],!1,null,null,null);e.a=component.exports},308:function(t,e,r){"use strict";var c={name:"cell",props:{row:{type:String},col:{type:String},lg:{type:String},md:{type:String},sm:{type:String}},computed:{lgClass(){if(this.lg)return"cell-col--".concat(this.lg)},mdClass(){if(this.md)return"cell-col-md--".concat(this.md)},smClass(){if(this.sm)return"cell-col-sm--".concat(this.sm)}}},n=r(26),component=Object(n.a)(c,(function(){var t=this.$createElement,e=this._self._c||t;return e("div",{class:["grid-cell","cell-row--"+this.row,this.lgClass,this.mdClass,this.smClass]},[e("div",{staticClass:"grid-cell__body"},[this._t("default")],2)])}),[],!1,null,null,null);e.a=component.exports},309:function(t,e,r){"use strict";var c=r(69),n={name:"Card",props:{article:{type:Object,require:!0},type:{type:String,default:()=>"default"},title:{type:Boolean,default:()=>!0},description:{type:Boolean,default:()=>!0},image:{type:Boolean,default:()=>!0},author:{type:Boolean,default:()=>!0},time:{type:Boolean,default:()=>!0},dateFormat:{type:String,default:()=>"timeAgo"},size:{type:String},media:{type:Boolean,default:()=>!1},wide:{type:Boolean,default:()=>!1},horizontal:{type:Boolean,default:()=>!1},background:{type:Boolean,default:()=>!1},related:{type:Boolean,default:()=>!1},views:{type:Boolean,default:()=>!1},popular:{type:Boolean,default:()=>!1}},computed:{cardSizeClass(){return{"is-big":"big"===this.size,"is-small":"small"===this.size,"card--wide":this.wide,"card--media":"media"===this.type,"card-background":this.background}}},methods:{cutUrl(t){var e=window.URL;if(this.popular)return t;try{var r=new e(t);if(/^(www\.)?forbes\.ru$/g.test(r.hostname))return r.pathname}catch(t){console.log(t)}return t},callDateFunction:(t,e)=>c.a.methods[t](e),resetPage(t){window.Ya.adfoxCode.clearSession(),this.$store.commit("posts/SET_PAGE_IN_DETAIL_POST",0)}}},l=r(26),component=Object(l.a)(n,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[t.popular?t.popular?r("a",{directives:[{name:"lazy-container",rawName:"v-lazy-container",value:{selector:"img"},expression:"{ selector: 'img' }"}],staticClass:"card",class:[{"is-horizontal":t.horizontal},t.cardSizeClass],attrs:{href:t.cutUrl(t.article.url),"data-id":t.article.id}},[r("div",{staticClass:"card-content"},[r("div",{staticClass:"card-content__body"},["default"===t.type?[t.horizontal?[t.article.image&&t.image?r("div",{staticClass:"card-content__picture"},[r("img",{staticClass:"card-content__image lazy-image",attrs:{"data-src":t.article.image.url,alt:t.article.image.alt}})]):t._e(),t._v(" "),r("div",{staticClass:"card-content__info"},[t.article.title&&t.title?r("div",{staticClass:"card-content__title"},[t._v("\n                "+t._s(t.article.title)+"\n              ")]):t._e(),t._v(" "),t.article.description&&t.description?r("div",{staticClass:"card-content__lead"},[t._v("\n                "+t._s(t.article.description)+"\n              ")]):t._e(),t._v(" "),r("div",{staticClass:"card-tools"},[t.article.author&&t.author?r("div",{staticClass:"card-tools__author"},[t._v("\n                  "+t._s(t.article.author.name)+"\n                ")]):t._e(),t._v(" "),t.article.created_ts&&t.time?r("div",{staticClass:"card-tools__time"},[t._v("\n                  "+t._s(t.callDateFunction(t.dateFormat,t.article.created_ts))+"\n                ")]):t._e()])])]:t.background?[r("div",{staticClass:"card-content__background"},[r("img",{staticClass:"card-content__image lazy-image",attrs:{"data-src":t.article.image.url,alt:t.article.image.alt}})]),t._v(" "),t.article.title&&t.title?r("div",{staticClass:"card-content__title"},[t._v("\n              "+t._s(t.article.title)+"\n            ")]):t._e(),t._v(" "),t.article.description&&t.description?r("div",{staticClass:"card-content__lead"},[t._v("\n              "+t._s(t.article.description)+"\n            ")]):t._e(),t._v(" "),r("div",{staticClass:"card-tools"},[t.article.author&&t.author?r("div",{staticClass:"card-tools__author"},[t._v("\n                "+t._s(t.article.author.name)+"\n              ")]):t._e(),t._v(" "),t.article.created_ts&&t.time?r("div",{staticClass:"card-tools__time"},[t._v("\n                "+t._s(t.callDateFunction(t.dateFormat,t.article.created_ts))+"\n              ")]):t._e()])]:[t.views?r("div",{staticClass:"card-content__views"},[t._v("\n              345 678\n            ")]):t._e(),t._v(" "),t.article.title&&t.title&&!t.related?r("div",{staticClass:"card-content__title"},[t._v("\n              "+t._s(t.article.title)+"\n            ")]):t._e(),t._v(" "),t.article.image&&t.image?r("div",{staticClass:"card-content__picture"},[r("img",{staticClass:"card-content__image lazy-image",attrs:{"data-src":t.article.image.url,alt:t.article.image.alt}})]):t._e(),t._v(" "),t.article.description&&t.description?r("div",{staticClass:"card-content__lead"},[t._v("\n              "+t._s(t.article.description)+"\n            ")]):t._e(),t._v(" "),t.article.title&&t.title&&t.related?r("div",{staticClass:"card-content__title"},[t._v("\n              "+t._s(t.article.title)+"\n            ")]):t._e(),t._v(" "),r("div",{staticClass:"card-tools"},[t.article.author&&t.author?r("div",{staticClass:"card-tools__author"},[t._v("\n                "+t._s(t.article.author.name)+"\n              ")]):t._e(),t._v(" "),t.article.created_ts&&t.time?r("div",{staticClass:"card-tools__time"},[t._v("\n                "+t._s(t.callDateFunction(t.dateFormat,t.article.created_ts))+"\n              ")]):t._e()])]]:"additional"===t.type?[t.article.image&&t.image?r("div",{staticClass:"card-content__picture"},[r("img",{staticClass:"card-content__image lazy-image",attrs:{"data-src":t.article.image.url,alt:t.article.image.alt}})]):t._e(),t._v(" "),r("div",{staticClass:"card-content__info"},[t.article.title&&t.title?r("div",{staticClass:"card-content__title"},[t._v("\n              "+t._s(t.article.title)+"\n            ")]):t._e(),t._v(" "),t.article.description&&t.description?r("div",{staticClass:"card-content__lead"},[t._v("\n              "+t._s(t.article.description)+"\n            ")]):t._e(),t._v(" "),r("div",{staticClass:"card-tools"},[r("div",{staticClass:"card-tools__row"},[t.article.section?r("div",{staticClass:"card-tools__section"},[t._v("\n                  "+t._s(t.article.section.title)+"\n                ")]):t._e(),t._v(" "),t.article.created_ts&&t.time?r("div",{staticClass:"card-tools__time"},[t._v("\n                  "+t._s(t.callDateFunction(t.dateFormat,t.article.created_ts))+"\n                ")]):t._e()]),t._v(" "),r("div",{staticClass:"card-tools__row"},[t.article.author&&t.author?[r("span",{staticClass:"card-tools__author is-dark"},[t._v(t._s(t.article.author.name)+",")]),t._v(" \n                  "),r("span",{staticClass:"card-tools__author-contributor"},[t._v(t._s(t.article.author.type.title))]),t._v(" "),t._l(t.article.authorAssistants,(function(e,c){return[r("span",{key:e.name+c,staticClass:"card-tools__author is-dark"},[t._v(t._s(e.name)+",")]),t._v(" \n                    "),r("span",{key:e.type+c,staticClass:"card-tools__author-contributor"},[t._v(t._s(e.type.title))])]}))]:t._e()],2)])])]:t._e(),t._v(" "),"media"===t.type?[t.article.title&&t.title?r("div",{staticClass:"card-content__title"},[t._v("\n            "+t._s(t.article.title)+"\n          ")]):t._e(),t._v(" "),r("div",{staticClass:"card-tools"},[t.article.author&&t.author?r("div",{staticClass:"card-tools__author"},[t._v("\n              "+t._s(t.article.author.name)+"\n            ")]):t._e(),t._v(" "),t.article.created_ts&&t.time?r("div",{staticClass:"card-tools__time"},[t._v("\n              "+t._s(t.callDateFunction(t.dateFormat,t.article.created_ts))+"\n            ")]):t._e()]),t._v(" "),t.article.image&&t.image?r("div",{staticClass:"card-content__picture"},[r("img",{staticClass:"card-content__image lazy-image",attrs:{"data-src":t.article.image.url,alt:t.article.image.alt}})]):t._e(),t._v(" "),t.article.description&&t.description?r("div",{staticClass:"card-content__lead"},[t._v("\n            "+t._s(t.article.description)+"\n          ")]):t._e()]:t._e()],2)])]):t._e():r("nuxt-link",{directives:[{name:"lazy-container",rawName:"v-lazy-container",value:{selector:"img"},expression:"{ selector: 'img' }"}],staticClass:"card",class:[{"is-horizontal":t.horizontal},t.cardSizeClass],attrs:{to:t.cutUrl(t.article.url),href:t.cutUrl(t.article.url),target:t.cutUrl(t.article.url).startsWith("/")?void 0:"_blank","data-id":t.article.id},nativeOn:{click:function(e){return t.resetPage(t.article.url)}}},[r("div",{staticClass:"card-content"},[r("div",{staticClass:"card-content__body"},["default"===t.type?[t.horizontal?[t.article.image&&t.image?r("div",{staticClass:"card-content__picture"},[r("img",{staticClass:"card-content__image lazy-image",attrs:{"data-src":t.article.image.url,alt:t.article.image.alt}})]):t._e(),t._v(" "),r("div",{staticClass:"card-content__info"},[t.article.title&&t.title?r("div",{staticClass:"card-content__title"},[t._v("\n                "+t._s(t.article.title)+"\n              ")]):t._e(),t._v(" "),t.article.description&&t.description?r("div",{staticClass:"card-content__lead"},[t._v("\n                "+t._s(t.article.description)+"\n              ")]):t._e(),t._v(" "),r("div",{staticClass:"card-tools"},[t.article.author&&t.author?r("div",{staticClass:"card-tools__author"},[t._v("\n                  "+t._s(t.article.author.name)+"\n                ")]):t._e(),t._v(" "),t.article.created_ts&&t.time?r("div",{staticClass:"card-tools__time"},[t._v("\n                  "+t._s(t.callDateFunction(t.dateFormat,t.article.created_ts))+"\n                ")]):t._e()])])]:t.background?[r("div",{staticClass:"card-content__background"},[r("img",{staticClass:"card-content__image lazy-image",attrs:{"data-src":t.article.image.url,alt:t.article.image.alt}})]),t._v(" "),t.article.title&&t.title?r("div",{staticClass:"card-content__title"},[t._v("\n              "+t._s(t.article.title)+"\n            ")]):t._e(),t._v(" "),t.article.description&&t.description?r("div",{staticClass:"card-content__lead"},[t._v("\n              "+t._s(t.article.description)+"\n            ")]):t._e(),t._v(" "),r("div",{staticClass:"card-tools"},[t.article.author&&t.author?r("div",{staticClass:"card-tools__author"},[t._v("\n                "+t._s(t.article.author.name)+"\n              ")]):t._e(),t._v(" "),t.article.created_ts&&t.time?r("div",{staticClass:"card-tools__time"},[t._v("\n                "+t._s(t.callDateFunction(t.dateFormat,t.article.created_ts))+"\n              ")]):t._e()])]:[t.views?r("div",{staticClass:"card-content__views"},[t._v("\n              345 678\n            ")]):t._e(),t._v(" "),t.article.title&&t.title&&!t.related?r("div",{staticClass:"card-content__title"},[t._v("\n              "+t._s(t.article.title)+"\n            ")]):t._e(),t._v(" "),t.article.image&&t.image?r("div",{staticClass:"card-content__picture"},[r("img",{staticClass:"card-content__image lazy-image",attrs:{"data-src":t.article.image.url,alt:t.article.image.alt}})]):t._e(),t._v(" "),t.article.description&&t.description?r("div",{staticClass:"card-content__lead"},[t._v("\n              "+t._s(t.article.description)+"\n            ")]):t._e(),t._v(" "),t.article.title&&t.title&&t.related?r("div",{staticClass:"card-content__title"},[t._v("\n              "+t._s(t.article.title)+"\n            ")]):t._e(),t._v(" "),r("div",{staticClass:"card-tools"},[t.article.author&&t.author?r("div",{staticClass:"card-tools__author"},[t._v("\n                "+t._s(t.article.author.name)+"\n              ")]):t._e(),t._v(" "),t.article.created_ts&&t.time?r("div",{staticClass:"card-tools__time"},[t._v("\n                "+t._s(t.callDateFunction(t.dateFormat,t.article.created_ts))+"\n              ")]):t._e()])]]:"additional"===t.type?[t.article.image&&t.image?r("div",{staticClass:"card-content__picture"},[r("img",{staticClass:"card-content__image lazy-image",attrs:{"data-src":t.article.image.url,alt:t.article.image.alt}})]):t._e(),t._v(" "),r("div",{staticClass:"card-content__info"},[t.article.title&&t.title?r("div",{staticClass:"card-content__title"},[t._v("\n              "+t._s(t.article.title)+"\n            ")]):t._e(),t._v(" "),t.article.description&&t.description?r("div",{staticClass:"card-content__lead"},[t._v("\n              "+t._s(t.article.description)+"\n            ")]):t._e(),t._v(" "),r("div",{staticClass:"card-tools"},[r("div",{staticClass:"card-tools__row"},[t.article.section?r("div",{staticClass:"card-tools__section"},[t._v("\n                  "+t._s(t.article.section.title)+"\n                ")]):t._e(),t._v(" "),t.article.created_ts&&t.time?r("div",{staticClass:"card-tools__time"},[t._v("\n                  "+t._s(t.callDateFunction(t.dateFormat,t.article.created_ts))+"\n                ")]):t._e()]),t._v(" "),r("div",{staticClass:"card-tools__row"},[t.article.author&&t.author?[r("span",{staticClass:"card-tools__author is-dark"},[t._v(t._s(t.article.author.name)+",")]),t._v(" \n                  "),r("span",{staticClass:"card-tools__author-contributor"},[t._v(t._s(t.article.author.type.title))]),t._v(" "),t._l(t.article.authorAssistants,(function(e,c){return[r("span",{key:e.name+c,staticClass:"card-tools__author is-dark"},[t._v(t._s(e.name)+",")]),t._v(" \n                    "),r("span",{key:e.type+c,staticClass:"card-tools__author-contributor"},[t._v(t._s(e.type.title))])]}))]:t._e()],2)])])]:t._e(),t._v(" "),"media"===t.type?[t.article.title&&t.title?r("div",{staticClass:"card-content__title"},[t._v("\n            "+t._s(t.article.title)+"\n          ")]):t._e(),t._v(" "),r("div",{staticClass:"card-tools"},[t.article.author&&t.author?r("div",{staticClass:"card-tools__author"},[t._v("\n              "+t._s(t.article.author.name)+"\n            ")]):t._e(),t._v(" "),t.article.created_ts&&t.time?r("div",{staticClass:"card-tools__time"},[t._v("\n              "+t._s(t.callDateFunction(t.dateFormat,t.article.created_ts))+"\n            ")]):t._e()]),t._v(" "),t.article.image&&t.image?r("div",{staticClass:"card-content__picture"},[r("img",{staticClass:"card-content__image lazy-image",attrs:{"data-src":t.article.image.url,alt:t.article.image.alt}})]):t._e(),t._v(" "),t.article.description&&t.description?r("div",{staticClass:"card-content__lead"},[t._v("\n            "+t._s(t.article.description)+"\n          ")]):t._e()]:t._e()],2)])])],1)}),[],!1,null,null,null);e.a=component.exports},312:function(t,e,r){},313:function(t,e,r){"use strict";var c={components:{banner:r(306).a},props:{pid:{type:String,default:()=>"0"}},methods:{getDesktop(){return{comment:"  \x3c!--AdFox START--\x3e\n  \x3c!--axelspringer--\x3e\n  \x3c!--Площадка: Forbes / * / *--\x3e\n  \x3c!--Тип баннера: 300х600--\x3e\n  \x3c!--Расположение: <верх страницы>--\x3e\n",ownerId:162070,containerId:"adfox_9366952877"+this.pid,params:{pp:"g",ps:"lyw",p2:"fbuu",puid1:""},headerBidding:{placementId:"3456511",sizes:"[[ 300, 600 ], [ 240, 400]]"}}}}},n=r(26),component=Object(n.a)(c,(function(){var t=this.$createElement;return(this._self._c||t)("banner",{attrs:{desktop:this.getDesktop()}})}),[],!1,null,null,null);e.a=component.exports},318:function(t,e,r){"use strict";var c=r(312);r.n(c).a},322:function(t,e,r){"use strict";var c={components:{banner:r(306).a},props:{pid:{type:String,default:()=>"0"}},methods:{getDesktop(){return{comment:"  \x3c!--AdFox START--\x3e\n  \x3c!--axelspringer--\x3e\n  \x3c!--Площадка: Forbes / * / *--\x3e\n  \x3c!--Тип баннера: 300х600--\x3e\n  \x3c!--Расположение: <середина страницы>--\x3e\n",ownerId:162070,containerId:"adfox_5386687980"+this.pid,params:{pp:"h",ps:"lyw",p2:"fbuu",puid1:""},headerBidding:{placementId:"3461686",sizes:"[[ 300, 600 ], [ 240, 400]]"}}}}},n=r(26),component=Object(n.a)(c,(function(){var t=this.$createElement;return(this._self._c||t)("banner",{attrs:{desktop:this.getDesktop()}})}),[],!1,null,null,null);e.a=component.exports}}]);