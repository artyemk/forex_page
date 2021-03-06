/*!
 * slider jQuery Plugin v6.3.0
 *
 * by Anton Zhukov
 * toxa@toxa.ru
 *
 * USAGE:
 * $(selector).slider({options});
 * $(selector).slider('goTo', 0, duration);
 * $(selector).slider('goTo', 'item_id', duration);
 * $(selector).slider('goTo', '+1', duration);
 * $(selector).slider('goTo', '-2', duration);
 * $(selector).slider('on', 'change', function (index, id, reason) {});
 * $(selector).slider('destroy');
 */
"use strict";!function($){var e="slider",t="mouse",n=!1,o=!1,i=!1,s=!1,r=$(window),a=$(document),l="undefined"!=typeof window.onmousemove?window:document,d=function(){if(!n){n=!0;var e=navigator.userAgent.indexOf("iPhone")!=-1,t=navigator.userAgent.indexOf("iPad")!=-1,o=navigator.userAgent.match(/CPU[a-zA-Z ]* OS (\d+)/);o=o&&"string"==typeof o[1]?parseInt(o[1].replace(/_/g,"."),10)||0:"0","object"!=typeof $.browser&&($.browser={}),$.extend($.browser,{iPhone:e,iPad:t,iOSVersion:o}),jQuery.expr[":"]["really-hidden"]||jQuery.extend(jQuery.expr[":"],{"really-hidden":function(e){var t=jQuery(e),n=function(e){return 0!==e.length&&e.get(0)!==document.body&&("none"===e.css("display")||0==e.css("opacity")||n(e.parent()))};return"hidden"===t.css("visibility")||n(jQuery(e))}}),$.easing.slider=function(e){return 1-Math.pow(1-e,2)};var i,r,a=document.createElement("div");document.body.insertBefore(a,null);var l={webkitTransform:"-webkit-transform",OTransform:"-o-transform",msTransform:"-ms-transform",MozTransform:"-moz-transform",transform:"transform"};for(var d in l)if("undefined"!=typeof a.style[d]){a.style[d]="translateX(1px)",i=window.getComputedStyle(a).getPropertyValue(l[d]),a.style[d]="",a.style[d]="translateZ(1px)",r=window.getComputedStyle(a).getPropertyValue(l[d]);break}document.body.removeChild(a),$.extend($.support,{transform:"undefined"!=typeof i&&i.length>0&&"none"!==i,transform3d:"undefined"!=typeof r&&r.length>0&&"none"!==r}),$.browser.iOSVersion>0&&(s={passive:!1})}},c={isVertical:!1,isDraggable:!0,isMomentum:!1,isElastic:!0,isLooped:!1,isKeyboard:!1,isAutoSlide:!1,isAutoSlideRestart:!0,isTransform:!0,isTransform3d:!0,isFit:!1,start:1,margin:0,align:.5,durationDragMin:250,durationDragMax:250,durationItem:250,autoSlideInterval:5e3,easing:"slider",mouseThreshold:8,touchThreshold:0,speedThreshold:.3,elasticPercent:.15,fade:1,customDraw:null,onReady:function(e,t){},onLeave:function(e,t){},onChange:function(e,t,n){},onStep:function(e,t,n,o){},onComplete:function(e,t){},onPass:function(e,t){},onClick:function(e,t){},onPseudoClick:function(e,t){},onDragStart:function(){},onDragEnd:function(){},onMostlyVisible:function(e,t){},onMostlyInvisible:function(e,t){}},u=function(e){return"object"==typeof e&&"string"==typeof e.type&&0==e.type.indexOf(t)},f=function(e){return u(e)&&(0===e.which||3===e.which)},m=function(e){return i||(o=!u(e),i=!0),o},v=function(e,t){var n,o=Array.prototype.slice.call(arguments,2),i=[];if("function"==typeof e)return e.apply(t,o);if(e instanceof Array){for(n=0;n<e.length;n++)"function"==typeof e[n]&&i.push(e[n].apply(t,o));return i[0]}};$.fn[e]=function(n){if("string"==typeof n){var i=Array.prototype.slice.call(arguments,1);return this.each(function(){var t=$(this),o=t.data(e+"-methods");"undefined"!=typeof o&&"function"==typeof o[n]&&t.hasClass(e+"-ready")&&o[n].apply(this,i)})}return"object"==typeof n?(n=$.extend({},c,n),"boolean"!=typeof n.isVertical&&(n.isVertical=c.isVertical),"boolean"!=typeof n.isDraggable&&(n.isDraggable=c.isDraggable),"boolean"!=typeof n.isMomentum&&(n.isMomentum=c.isMomentum),"boolean"!=typeof n.isElastic&&(n.isElastic=c.isElastic),"boolean"!=typeof n.isLooped&&(n.isLooped=c.isLooped),"boolean"!=typeof n.isKeyboard&&(n.isKeyboard=c.isKeyboard),"boolean"!=typeof n.isAutoSlide&&(n.isAutoSlide=c.isAutoSlide),"boolean"!=typeof n.isAutoSlideRestart&&(n.isAutoSlideRestart=c.isAutoSlideRestart),"boolean"!=typeof n.isFit&&(n.isFit=c.isFit),n.start="number"==typeof n.start?parseInt(n.start,10):"string"==typeof n.start&&n.start.length>0?n.start:c.start,n.margin="number"==typeof n.margin?n.margin:c.margin,n.align="number"==typeof n.align&&n.align>=0&&n.align<=1?n.align:c.align,n.durationDragMin="number"==typeof n.durationDragMin?parseInt(n.durationDragMin,10):c.durationDragMin,n.durationDragMax="number"==typeof n.durationDragMax?parseInt(n.durationDragMax,10):c.durationDragMax,n.durationItem="number"==typeof n.durationItem?parseInt(n.durationItem,10):c.durationItem,n.autoSlideInterval="number"==typeof n.autoSlideInterval?parseInt(n.autoSlideInterval,10):c.autoSlideInterval,n.easing="string"==typeof n.easing?n.easing:c.easing,n.mouseThreshold="number"==typeof n.mouseThreshold?parseInt(n.mouseThreshold,10):c.mouseThreshold,n.touchThreshold=0,n.speedThreshold="number"==typeof n.speedThreshold?n.speedThreshold:c.speedThreshold,n.elasticPercent="number"==typeof n.elasticPercent?n.elasticPercent:c.elasticPercent,n.fade="number"==typeof n.fade?n.fade:c.fade,"function"!=typeof n.customDraw&&(n.customDraw=c.customDraw),"function"!=typeof n.onReady&&(n.onReady=c.onReady),"function"!=typeof n.onLeave&&(n.onLeave=c.onLeave),"function"!=typeof n.onChange&&(n.onChange=c.onChange),"function"!=typeof n.onStep&&(n.onStep=c.onStep),"function"!=typeof n.onComplete&&(n.onComplete=c.onComplete),"function"!=typeof n.onPass&&(n.onPass=c.onPass),"function"!=typeof n.onClick&&(n.onClick=c.onClick),"function"!=typeof n.onPseudoClick&&(n.onPseudoClick=c.onPseudoClick),"function"!=typeof n.onDragStart&&(n.onDragStart=c.onDragStart),"function"!=typeof n.onDragEnd&&(n.onDragEnd=c.onDragEnd),"function"!=typeof n.onMostlyVisible&&(n.onMostlyVisible=c.onMostlyVisible),"function"!=typeof n.onMostlyInvisible&&(n.onMostlyInvisible=c.onMostlyInvisible)):n=$.extend({},c),d(),this.each(function(){var i=$(this);if(!i.hasClass(e+"-ready")){var d,c,g,p,h,y,b=i.find("."+e),E=i.find("."+e+"-canvas").not(b.find("."+e+"-canvas")),L=i.find("."+e+"-item").not(b.find("."+e+"-item")),k=i.find("."+e+"-prev").not(b.find("."+e+"-prev")),C=i.find("."+e+"-next").not(b.find("."+e+"-next")),D=i.find("."+e+"-nav").not(b.find("."+e+"-nav")),x=i.find("."+e+"-nav-repeat").not(b.find("."+e+"-nav-repeat")),w=i.find("."+e+"-number-current").not(b.find("."+e+"-number-current")),I=i.find("."+e+"-number-total").not(b.find("."+e+"-number-total")),M=$({offset:0}),S=0,T=0,P=!1,A=0,X=0,Y=0,V=0,z=0,j=[],R=0,O=0,K=-1,F=0,Q={},H=n.isLooped,W=n.isFit,U=!1,Z=!1,q=!1,B=!1,_=!1,G=!1,J=!1,N=!1,ee=!1,te=!1,ne=!1,oe=0,ie=0,se=0,re=0,ae=!1,le=function(e,t){return n.isElastic&&c!==d?e/3*t/(e/3+t):0},de=function(e,t){return n.isVertical?t:e},ce=function(){var t=0,o=0,s=0;if(j=[],A=de(E.outerWidth(),E.outerHeight()),X=parseInt(E.css(de("padding-left","padding-top")),10)||0,Y=parseInt(E.css(de("padding-right","padding-bottom")),10)||0,z=n.margin,z>0&&z<1&&(z*=A),L.each(function(){var n,i=$(this);if("none"!=i.css("display")){var r=de(i.outerWidth(),i.outerHeight());o>0&&r<o&&(o=r),r>s&&(s=r),n=i.data(e+"-id"),n="undefined"==typeof n||"object"==typeof n?"":""+n,j.push({id:n,isVisible:!0,size:r,offset:t,element:this}),t+=r+z}}),V=t,d=0,c=j.length-1,n.isLooped&&(V-z-s<A-X?(H=!1,W=!0):(H=n.isLooped,W=n.isFit)),W&&!H){for(;c>0&&V-z-j[c-1].offset+X+Y<=A-(A-j[c-1].size)*n.align;)c--;for(;d<c&&j[d+1].offset<=(A-j[d+1].size)*n.align;)d++;i.toggleClass(e+"-fit",d===c)}},ue=function(e){var t,n,o,i=-1;if("string"==typeof e)for(t=0;t<j.length;t++)if(j[t].id==e){i=t;break}return i==-1&&(e=""+e,n=parseInt(e,10)||1,n.toString()===e?(i=n-1,o=j.length,i>=o&&(i=o-1),i<0&&(i=0)):i=0),i},fe=function(){var e=E.outerWidth(),t=E.outerHeight(),n=E.is(":really-hidden"),o=e!==S||t!==T||n!==P;return o&&(S=e,T=t,P=n),o},me=function(){var t=r.scrollTop(),o=r.scrollLeft(),s=r.width(),a=r.height(),l=a/2,d=s/2,c=i.outerWidth(),u=i.outerHeight(),f=i.offset(),m=f.top,g=f.left,p=i.is(":really-hidden"),h=!p&&t+a>=m&&t<=m+u,y=!p&&o+s>=g&&o<=g+c,b=!p&&t+l>=m&&t+l<=m+u,E=b,L=!p&&o+d>=g&&o+d<=g+c,k=L,C=h&&y,D=E&&k;if(C!=J&&(C?(i.addClass(e+"-visible"),n.isTransform&&n.isTransform3d&&$.support.transform3d&&i.addClass(e+"-3d"),tt(!1)):(i.removeClass(e+"-visible"),nt(!1),n.isTransform&&n.isTransform3d&&$.support.transform3d&&i.removeClass(e+"-3d")),xe()),D!=N){var x=he();D?(i.addClass(e+"-mostly"),v(n.onMostlyVisible,this,x,j[x].id.length>0?j[x].id:x+1)):(i.removeClass(e+"-mostly"),v(n.onMostlyInvisible,this,x,j[x].id.length>0?j[x].id:x+1))}J=C,N=D},ve=function(){return M.stop(!0),ce(),0==j.length?void ot():(i.toggleClass(e+"-single-item",1==j.length),ge(),F=be(),xe(),void(B=!1))},ge=function(){return H||(R>c&&(R=c),R<d&&(R=d)),R},pe=function(){if(H){var e=j.length;return Math.floor(R/e)}return 0},he=function(e){if("number"==typeof e&&isFinite(e)||(e=R),H){var t=j.length;return(e%t+t)%t}return e},ye=function(e){var t=j.length;return pe()*t+e},be=function(){var e=pe(),t=he(),o=-(V*e),i=-j[t].offset,s=(A-j[t].size)*n.align;return o+i+s},Ee=function(){var e,t,o,i,s,r,a,l,d=[{},{}],c=R;if(r=se/h,a=Math.abs(r)>=n.speedThreshold,a&&_&&(re>0&&se>0||re<0&&se<0))se<0?c++:c--;else{for(e=0;e<j.length;e++)for(i=j[e].offset+F+(j[e].size-A)*n.align,s=(i%V-V)%V,o=0;o<2;o++){for(t=0;t<2;t++)(0==t&&s<0&&("undefined"==typeof d[t].index||s>d[t].distance)||1==t&&s>0&&("undefined"==typeof d[t].index||s<d[t].distance))&&(d[t].index=(Math.floor(-i/V)+o)*j.length+e,d[t].distance=s);s+=V}l=d[0].distance+d[1].distance,c=a&&r>0||!a&&l>0?d[0].index:d[1].index}return re=se,c},Le=function(){var e,t,o,i,s,r,a=-1;for(e=0;e<j.length;e++)for(o=j[e].offset+F+(j[e].size-A)*n.align,i=(o%V-V)%V,t=0;t<2;t++)s=Math.abs(i),(a<0||s<a)&&(a=s,r=(Math.floor(-o/V)+t)*j.length+e),i+=V;return r=he(r),r>c&&(r=c),r<d&&(r=d),r},ke=function(){var t=he();D.each(function(){$(this).find("."+e+"-nav-item-current").removeClass(e+"-nav-item-current"),$(this).find("."+e+"-nav-item").eq(t).addClass(e+"-nav-item-current")}),w.html(t+1),H||(R==d?k.addClass(e+"-inactive"):k.removeClass(e+"-inactive"),R==c?C.addClass(e+"-inactive"):C.removeClass(e+"-inactive"))},Ce=function(t,o,i,s,r,a){var l=R,d=he();R=parseInt(t,10)||0,ge();var c=he();R!=l&&($(j[d].element).removeClass(e+"-item-current"),$(j[c].element).addClass(e+"-item-current"),o||ke(),B||v(n.onLeave,j[d].element,d,j[d].id.length>0?j[d].id:d+1),v(n.onChange,j[c].element,c,j[c].id.length>0?j[c].id:c+1,a)),(R!=l||o||s&&n.isElastic)&&(we(o,s,r),s&&!o?nt(n.isAutoSlideRestart):i||tt(n.isAutoSlideRestart))},De=function(e,t){var o=0;e=parseInt(e,10)||0,0!=e?(n.isElastic&&!H&&(e<0&&(R==d&&F>=be()||d==c)&&(o=-1),e>0&&(R==c&&F<=be()||d==c)&&(o=1)),Ce(R+e,!1,!1,o,null,t)):n.isElastic&&B&&!H&&R==d&&F>=be()||R==c&&F<=be()?Ce(R,!0,!1,!0,null,t):tt(n.isAutoSlideRestart)},xe=function(){var t,o,i,s,r,a,l,u,f,m,g,p,h,y;for(r=F,i=(A-j[d].size)*n.align-j[d].offset,s=(A-j[c].size)*n.align-j[c].offset,H||(F>i&&(r=i+le(F-i,A)),F<s&&(r=s+le(F-s,-A))),m=(j.length-(c-d))/j.length,f=H?-(((r-i)%V-V)%V)/j[c].offset:-(r-i)/j[c].offset,t=0;t<j.length;t++){for(p={},h={},y=n.fade,a=j[t].offset+r,l=a,"function"==typeof n.customDraw&&(h=n.customDraw(t,a,j[t].size,V),"object"!=typeof h&&(h={}),"number"==typeof h.finalOffset&&(l=h.finalOffset),"number"==typeof h.fade&&h.fade<1&&h.fade>=0&&(y=h.fade)),H&&(l=(l%V-V)%V),g=!1,o=0;!g&&o<(H?2:1);o++)g=l<=A-X+1&&l+j[t].size+X+1>=0,g||(l+=V);(j[t].isVisible||g)&&(g||(l=A-X+1),u=l.toFixed(2)+"px",n.isTransform&&$.support.transform?n.isTransform3d&&$.support.transform3d&&J?p.transform="translate3d("+de(u+", 0px, 0px","0px, "+u+", 0px")+")":p.transform="translate("+de(u+", 0px","0px, "+u)+")":p[de("left","top")]=u,g&&("number"==typeof h.opacity?p.opacity=h.opacity:y<1?p.opacity=(Math.max(0,1-Math.abs((l-(A-j[t].size)*n.align)/(A-(A-j[t].size)*(.5-Math.abs(n.align-.5)))))*(1-y)+y).toFixed(4):p.opacity=1),p.opacity>=1&&(p.opacity=""),(j.length>20||$.browser.iPad)&&(p.visibility=g?"":"hidden"),$(j[t].element).css(p)),j[t].isVisible=g}v(n.onStep,this,F,A,V,f,m),O=Le(),O!==K&&(K>=0&&$(j[K]&&j[K].element).removeClass(e+"-item-nearest"),$(j[O].element).addClass(e+"-item-nearest"),v(n.onPass,this,O,j[O].id.length>0?j[O].id:O+1),K=O)},we=function(t,o,s){var r,a;n.isElastic?a=A*n.elasticPercent:(a=0,o=0),M.stop(!0),r=o&&!t?o<0?be()+a:be()-a:be(),r!=F&&(B=!0,_=t,_||i.addClass(e+"-clickable"),"number"!=typeof s&&(o?s=Math.round(n.durationItem/2):t?(s=Math.abs(Math.round((r-F)/(se/h)*2)),s>n.durationDragMax&&(s=n.durationDragMax),s<n.durationDragMin&&(s=n.durationDragMin)):s=n.durationItem),M.prop({offset:F}),M.animate({offset:r},{duration:s,easing:n.isMomentum?n.easing:n.easing,step:function(e,t){F=e,xe()},complete:function(){!t&&o||(B=!1),_=!1;var s=he();i.addClass(e+"-clickable"),t&&ke(),v(n.onComplete,j[s].element,s,j[s].id.length>0?j[s].id:s+1)}}))},Ie=function(){var e=new Date;h=e-p,p=e},Me=function(e){var t,n={};if(m(e)&&!$.isEmptyObject(Q)){for(t=0;t<e.touches.length;t++)touch=e.touches.item(t),touch&&Q[touch.identifier]&&(n[touch.identifier]=!0);for(t in Q)"undefined"==typeof n[t]&&delete Q[t];$.isEmptyObject(Q)&&Ae(e)}},Se=function(e){var t=$(e.target);0!==t.closest(i).length&&e.preventDefault()},Te=function(e){var o,i=$(e.target);if(0!==i.closest(E).length&&0===i.closest(b).length&&m(e)!=u(e)&&!f(e)){if(Ie(),m(e))for(o=0;o<e.changedTouches.length;o++){var r=e.changedTouches.item(o);r&&(Q[r.identifier]={startX:r.pageX,startY:r.pageY,lastX:r.pageX,lastY:r.pageY})}else Q[t]={startX:e.pageX,startY:e.pageY,lastX:e.pageX,lastY:e.pageY};U||(U=!0,Z=!1,q=!1,ie=0,se=0,M.stop(!0),m(e)?(document.addEventListener("touchmove",Pe,s),document.addEventListener("touchend",Ae,s),document.addEventListener("touchcancel",Ae,s)):(l.addEventListener("mousemove",Pe),l.addEventListener("mouseup",Ae)),window.addEventListener("blur",Ae),nt(n.isAutoSlideRestart),v(n.onDragStart,e.target))}},Pe=function(o){var r,a,l,d=n.isVertical?1:0,c=[0,0],u=[0,0],g=[0,0],p=[0,0];if(f(o))return void Ae(o);if(U){if(Ie(),!Z){if(m(o)){for(r=0;r<o.changedTouches.length;r++)if(l=o.changedTouches.item(r),l&&Q[l.identifier])for(c[0]=l.pageX-Q[l.identifier].startX,c[1]=l.pageY-Q[l.identifier].startY,a=0;a<2;a++)c[a]>0&&c[a]>g[a]&&(g[a]=c[a]),c[a]<0&&c[a]<p[a]&&(p[a]=c[a]);for(a=0;a<2;a++)c[a]=g[a]+p[a]}else c[0]=o.pageX-Q[t].startX,c[1]=o.pageY-Q[t].startY;for(a=0;a<2;a++)u[a]=Math.abs(c[a]);if(Math.max(u[0],u[1])>=(m(o)?n.touchThreshold:n.mouseThreshold)){Z=!0,q=u[0]<u[1]==n.isVertical;for(r in Q)Q[r].lastX=Q[r].startX,Q[r].lastY=Q[r].startY}}if((!m(o)||q&&s)&&o.preventDefault(),q){if(m(o)){for(r=0;r<o.changedTouches.length;r++)if(l=o.changedTouches.item(r),l&&Q[l.identifier]){for(c[0]=l.pageX-Q[l.identifier].lastX,c[1]=l.pageY-Q[l.identifier].lastY,a=0;a<2;a++)c[a]>0&&c[a]>g[a]&&(g[a]=c[a]),c[a]<0&&c[a]<p[a]&&(p[a]=c[a]);Q[l.identifier].lastX=l.pageX,Q[l.identifier].lastY=l.pageY}for(a=0;a<2;a++)c[a]=g[a]+p[a]}else c[0]=o.pageX-Q[t].lastX,c[1]=o.pageY-Q[t].lastY,Q[t].lastX=o.pageX,Q[t].lastY=o.pageY;if(M.stop(!0,!0),M.prop({offset:F}),F+=c[d],se=c[d],ie+=se,!B){var h=he();v(n.onLeave,j[h].element,h,j[h].id.length>0?j[h].id:h+1),B=!0,i.removeClass(e+"-clickable")}xe()}}},Ae=function(e){var o;if(U){if(m(e)&&"blur"!=e.type)for(o=0;o<e.changedTouches.length;o++){var i=e.changedTouches.item(o);i&&delete Q[i.identifier]}else delete Q[t];if($.isEmptyObject(Q)){if(U=!1,m(e)?(document.removeEventListener("touchmove",Pe),document.removeEventListener("touchend",Ae),document.removeEventListener("touchcancel",Ae)):(l.removeEventListener("mousemove",Pe),l.removeEventListener("mouseup",Ae)),window.removeEventListener("blur",Ae),B&&(m(e)&&!s||e.preventDefault(),Ce(Ee(),!0,!1,null,null,"drag")),tt(n.isAutoSlideRestart),v(n.onDragEnd,e.target),!Z){var r=-1;if(L.each(function(t){var n=$(this);if(this===e.target||n.find(e.target).length>0)return r=t,!1}),r<0&&(r=he()),!(_&&ae||$(e.target).closest("a[href]").length>0))return v(n.onPseudoClick,j[r].element,r,j[r].id.length>0?j[r].id:r+1,B)}ae=Z,Z=!1,q=!1}Me(e)}},Xe=function(e){var t=$(e.target);0!==t.closest(E).length&&0===t.closest(b).length&&(U||B)&&(e.stopImmediatePropagation(),e.preventDefault())},Ye=function(t){var o=$(t.target),i=o.closest("."+e+"-link");if(0!==o.closest(E).length&&0===o.closest(b).length)if(U||B)t.preventDefault();else if(0===i.length){var s=-1;return L.each(function(e){var n=$(this);if(n.find(t.target).length>0)return s=e,!1}),s<0&&(s=he()),v(n.onClick,j[s].element,s,j[s].id.length>0?j[s].id:s+1)}},Ve=function(e){fe()&&(ve(),ke()),me()},ze=function(e){me()},je=function(e){L.find(document.activeElement).blur()},Re=function(e){m(e)||(te=!0,nt(n.isAutoSlideRestart))},Oe=function(e){m(e)||(te=!1,tt(n.isAutoSlideRestart))},Ke=function(e){if(!U){var t=he(),n=L.index($(e.target).closest(L));t!==n&&n>=0&&(E.scrollTop(0).scrollLeft(0),Ce(n,!1,!1,null,null,"focus"))}},Fe=function(t){var n=$(t.target),o=n.closest("."+e+"-link"),s=n.closest("."+e+"-prev");0!==o.length&&0!==s.length&&0!==n.closest(i).length&&0===n.closest(b).length&&(f(t)||(t.stopImmediatePropagation(),t.preventDefault(),m(t)!=u(t)&&(De(-parseInt(s.data(e+"-step"),10)||-1,"prev"),ke())))},Qe=function(n){var s=$(n.target),r=s.closest("."+e+"-link"),a=s.closest("."+e+"-prev");0!==r.length&&0!==a.length&&0!==s.closest(i).length&&0===s.closest(b).length&&(n.preventDefault(),o!=u(n)&&(m(n)&&n.targetTouches.length>0||"mouseleave"==n.type&&"undefined"!=typeof Q[t]||De(0,"prev")))},He=function(t){var n=$(t.target),o=n.closest("."+e+"-link"),s=n.closest("."+e+"-next");0!==o.length&&0!==s.length&&0!==n.closest(i).length&&0===n.closest(b).length&&(f(t)||(t.stopImmediatePropagation(),t.preventDefault(),m(t)!=u(t)&&(De(parseInt(s.data(e+"-step"),10)||1,"next"),ke())))},We=function(n){var s=$(n.target),r=s.closest("."+e+"-link"),a=s.closest("."+e+"-next");0!==r.length&&0!==a.length&&0!==s.closest(i).length&&0===s.closest(b).length&&(n.preventDefault(),o!=u(n)&&(m(n)&&n.targetTouches.length>0||"mouseleave"==n.type&&"undefined"!=typeof Q[t]||De(0,"next")))},Ue=function(t){var n=$(t.target),o=n.closest("."+e+"-link");0===o.length||0===n.closest("."+e+"-prev").length&&0===n.closest("."+e+"-next").length||0===n.closest(i).length||0!==n.closest(b).length||t.preventDefault()},Ze=function(t){var n=$(t.target),o=n.closest("."+e+"-link");0!==o.length&&0!==n.closest("."+e+"-nav").length&&0!==n.closest(i).length&&0===n.closest(b).length&&(f(t)||m(t)!=u(t)&&"undefined"==typeof o.data(e+"-link-clickable")&&(t.stopImmediatePropagation(),Ce(ye(parseInt(o.data("index"),10)||0),!1,!1,null,null,"navigation"),ke()))},qe=function(t){var n=$(t.target),o=n.closest("."+e+"-link");0!==o.length&&0!==n.closest("."+e+"-nav").length&&0!==n.closest(i).length&&0===n.closest(b).length&&t.preventDefault()},Be=function(t){var n=$(t.target),o=n.closest("."+e+"-link");0!==o.length&&0!==n.closest("."+e+"-nav").length&&0!==n.closest(i).length&&0===n.closest(b).length&&(t.ctrlKey||t.altKey||t.shiftKey||t.metaKey||(t.preventDefault(),B||"undefined"==typeof o.data(e+"-link-clickable")||(Ce(ye(parseInt(o.data("index"),10)||0),!1,!1,null,null,"navigation"),ke())))},_e=function(t){var n=$(t.target),o=n.closest("."+e+"-link");0!==o.length&&0!==n.closest("."+e+"-nav").length&&0!==n.closest(i).length&&0===n.closest(b).length&&t.preventDefault()},Ge=function(t){var n=$(t.target);if(n.hasClass(e+"-goto")&&0!==n.closest(i).length&&0===n.closest(b).length)if(t.preventDefault(),U||B)t.stopImmediatePropagation();else{var o=parseInt(n.data(e+"-goto-index"),10)||0,s=parseInt(n.data(e+"-goto-duration"),10)||0;Ce(o,!1,!1,!1,s,"goto")}},Je=function(t){var n=$(t.target);n.hasClass(e+"-goto")&&0!==n.closest(i).length&&0===n.closest(b).length&&t.preventDefault()},Ne=function(e){var t=37,n=38,o=39,i=40;ee||e.altKey||e.shiftKey||e.metaKey||("keydown"==e.type?(e.keyCode==de(t,n)&&(H||R!=d||e.keyCode!=oe)&&N&&(ne=!0,De(-1,"keyboard"),ke(),oe=e.keyCode),e.keyCode==de(o,i)&&(H||R!=c||e.keyCode!=oe)&&N&&(ne=!0,De(1,"keyboard"),ke(),oe=e.keyCode)):e.keyCode!=oe||e.keyCode!=de(t,n)&&e.keyCode!=de(o,i)||!N||(ne=!1,De(0,"keyboard"),oe=0))},$e=function(e){ee=!0},et=function(e){ee=!1},tt=function(e){n.isAutoSlide&&(nt(),U||te||ne||(G=!0,(e||"undefined"==typeof y)&&(clearInterval(y),y=setInterval(function(){G&&Ce(R+1,!1,!1,null,null,"auto")},n.autoSlideInterval))))},nt=function(e){n.isAutoSlide&&(G=!1,e&&clearInterval(y))},ot=function(){var t;M.stop(!0),"undefined"!=typeof y&&clearInterval(y),n.isDraggable&&(document.removeEventListener("touchstart",Te),document.removeEventListener("mousedown",Te),document.removeEventListener("click",Xe),a.off("click",Ye)),n.isKeyboard&&(a.off("keydown keyup",Ne),a.off("focus","input, textarea, select",$e),a.off("blur","input, textarea, select",et)),n.isAutoSlide&&(i.off("mouseover",Re),i.off("mouseleave",Oe)),document.removeEventListener("touchmove",Pe),document.removeEventListener("touchend",Ae),document.removeEventListener("touchcancel",Ae),document.removeEventListener("touchstart",Fe),document.removeEventListener("mousedown",Fe),document.removeEventListener("touchend",Qe),document.removeEventListener("touchcancel",Qe),document.removeEventListener("mouseup",Qe),document.removeEventListener("mouseleave",Qe),document.removeEventListener("click",Ue),document.removeEventListener("dblclick",Ue),document.removeEventListener("touchstart",He),document.removeEventListener("mousedown",He),document.removeEventListener("touchend",We),document.removeEventListener("touchcancel",We),document.removeEventListener("mouseup",We),document.removeEventListener("mouseleave",We),document.removeEventListener("click",Ue),document.removeEventListener("dblclick",Ue),document.removeEventListener("touchstart",Ze),document.removeEventListener("mousedown",Ze),document.removeEventListener("touchend",qe),document.removeEventListener("touchcancel",qe),document.removeEventListener("mouseup",qe),document.removeEventListener("mouseleave",qe),document.removeEventListener("click",Be),document.removeEventListener("dblclick",_e),a.off("click",Ge),a.off("dblclick",Je),document.removeEventListener("dragstart",Se),l.removeEventListener("mousemove",Pe),l.removeEventListener("mouseup",Ae),window.removeEventListener("blur",Ae),L.off("focus","*",Ke),r.off("load resize",Ve),r.off("scroll",ze),r.off("blur",je),i.removeData(e+"-methods");var o={visibility:"",opacity:""};n.isTransform&&$.support.transform?o.transform="":o[de("left","top")]="",L.css(o),L.removeClass(e+"-item-current "+e+"-item-nearest"),D.find("."+e+"-nav-item-current").removeClass(e+"-nav-item-current");var s=["ready","fit","visible","3d","mostly","inactive","clickable","touchable","draggable"];for(t=0;t<s.length;t++)s[t]=e+"-"+s[t];i.removeClass(s.join(" "))},it={goTo:function(e,t){var n=!1,o=0;"string"==typeof e&&["+","-"].indexOf(e.slice(0,1))!==-1&&(n=!0,o=parseInt(e,10)||0),Ce(n?R+o:ue(e),!1,!1,!1,t,"method")},on:function(e,t){if("string"==typeof e&&"function"==typeof t){var o="on"+e[0].toUpperCase()+e.slice(1);"string"==typeof e&&"function"==typeof t&&n[o]&&("function"==typeof n[o]&&(n[o]=[n[o]]),n[o].push(t))}},destroy:ot};i.data(e+"-methods",it),ce(),0!=j.length&&(i.toggleClass(e+"-single-item",1==j.length),R=ue(n.start),ge(),g=he(),$(j[g].element).addClass(e+"-item-current"),F=be(),"ontouchstart"in window&&i.addClass(e+"-touchable"),i.addClass(e+"-"+(n.isVertical?"vertical":"horizontal")),me(),x.each(function(){var e,t=$(this),n="",o=t.html();for(e=0;e<j.length;e++)n+=o.replace(/\{\{n\}\}/g,e+1).replace(/\{\{.*?\}\}/g,"");t.html(n)}),I.html(j.length),ke(),xe(),i.addClass(e+"-ready "+e+"-clickable"),v(n.onReady,j[g].element,g,j[g].id.length>0?j[g].id:g+1),document.addEventListener("dragstart",Se),r.one("load",Ve),r.on("resize",Ve),r.on("scroll",ze),r.on("blur",je),n.isAutoSlide&&(i.on("mouseover",Re),i.on("mouseleave",Oe)),L.on("focus","*",Ke),document.addEventListener("touchstart",Fe,s),document.addEventListener("mousedown",Fe),document.addEventListener("touchend",Qe,s),document.addEventListener("touchcancel",Qe,s),document.addEventListener("mouseup",Qe),document.addEventListener("mouseleave",Qe),document.addEventListener("click",Ue),document.addEventListener("dblclick",Ue),document.addEventListener("touchstart",He,s),document.addEventListener("mousedown",He),document.addEventListener("touchend",We,s),document.addEventListener("touchcancel",We,s),document.addEventListener("mouseup",We),document.addEventListener("mouseleave",We),document.addEventListener("click",Ue),document.addEventListener("dblclick",Ue),D.each(function(){$(this).find("."+e+"-nav-item").each(function(t){$(this).find("."+e+"-link").prop("href","#id="+(j[t]&&j[t].id.length>0?j[t].id:t+1)).data("index",t)})}),document.addEventListener("touchstart",Ze,s),document.addEventListener("mousedown",Ze),document.addEventListener("touchend",qe,s),document.addEventListener("touchcancel",qe,s),document.addEventListener("mouseup",qe),document.addEventListener("mouseleave",qe),document.addEventListener("click",Be),document.addEventListener("dblclick",_e),a.on("click",Ge),a.on("dblclick",Je),n.isDraggable&&(i.addClass(e+"-draggable"),document.addEventListener("touchstart",Te,s),document.addEventListener("mousedown",Te),document.addEventListener("click",Xe,Object.assign(s?s:{},{capture:!0})),a.on("click",Ye)),n.isKeyboard&&(a.on("keydown keyup",Ne),a.on("focus","input, textarea, select",$e),a.on("blur","input, textarea, select",et)))}})}}(jQuery);