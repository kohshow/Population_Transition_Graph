(this.webpackJsonppopulation_trends=this.webpackJsonppopulation_trends||[]).push([[0],{12:function(e,t,n){e.exports=n(19)},17:function(e,t,n){},18:function(e,t,n){},19:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),s=n(4),i=n.n(s),o=(n(17),n(9)),c=n(5),l=n(6),u=n(10),p=n(7),h=n(1),d=n(11),f=n(2),m=n.n(f),v=n(8),g=n.n(v),y=(n(18),"6A0LtF6rtgpfpqnowcZeeSBdEz4tGPAVbc2lOBNe"),b=function(e){function t(){var e;return Object(c.a)(this,t),(e=Object(u.a)(this,Object(p.a)(t).call(this))).state={selected:Array(47).fill(!1),prefectures:{},series:[]},e._changeSelection=e._changeSelection.bind(Object(h.a)(e)),e}return Object(d.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){var e=this;fetch("https://opendata.resas-portal.go.jp/api/v1/prefectures",{headers:{"X-API-KEY":y}}).then((function(e){return e.json()})).then((function(t){e.setState({prefectures:t.result})}))}},{key:"_changeSelection",value:function(e){var t=this,n=this.state.selected.slice();if(n[e]=!n[e],this.state.selected[e]){for(var a=this.state.series.slice(),r=0;r<a.length;r++)a[r].name===this.state.prefectures[e].prefName&&a.splice(r,1);this.setState({selected:n,series:a})}else fetch("https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?cityCode=-&prefCode=".concat(e+1),{headers:{"X-API-KEY":y}}).then((function(e){return e.json()})).then((function(a){var r=[];Object.keys(a.result.data[0].data).forEach((function(e){a.result.data[0].data[e].year<2020&&r.push(a.result.data[0].data[e].value)}));var s={name:t.state.prefectures[e].prefName,data:r};t.setState({selected:n,series:[].concat(Object(o.a)(t.state.series),[s])})}))}},{key:"renderItem",value:function(e){var t=this;return r.a.createElement("div",{key:e.prefCode,style:{margin:"5px",display:"inline-block"}},r.a.createElement("input",{type:"checkbox",checked:this.state.selected[e.prefCode-1],onChange:function(){return t._changeSelection(e.prefCode-1)}}),e.prefName)}},{key:"render",value:function(){var e=this,t=this.state.prefectures,n={title:{text:""},yAxis:{title:{text:"\u4eba\u53e3\u6570"}},xAxis:{title:{text:"\u5e74\u5ea6"}},legend:{layout:"vertical",align:"right",verticalAlign:"top"},plotOptions:{series:{label:{connectorAllowed:!1},pointInterval:5,pointStart:1965}},series:this.state.series};return r.a.createElement("div",null,r.a.createElement("h1",null,"\u90fd\u9053\u5e9c\u770c\u5225\u306e\u7dcf\u4eba\u53e3\u63a8\u79fb\u30b0\u30e9\u30d5"),r.a.createElement("h2",null,"\u90fd\u9053\u5e9c\u770c"),Object.keys(t).map((function(n){return e.renderItem(t[n])})),r.a.createElement(g.a,{highcharts:m.a,options:n}))}}]),t}(a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(r.a.createElement(b,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[12,1,2]]]);
//# sourceMappingURL=main.b59392f4.chunk.js.map