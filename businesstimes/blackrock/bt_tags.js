// preview script
function querystring(key) {
   var re=new RegExp('(?:\\?|&)'+key+'=(.*?)(?=&|$)','gi');
   var r=[], m;
   while ((m=re.exec(document.location.search)) != null) r[r.length]=m[1];
   return r;
}
var key ='dfp_preview';
var keycode = querystring(key);
// preview script