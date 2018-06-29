$(function(){

(function(){
var num = 0;
var timer = null;
$(".bander ul:first-child").find("li").eq(num).fadeIn().siblings().fadeOut();
$(".bander ul:last-child").find("li").eq(num).css("background","#ec7002").siblings().css("background","#4a4110");
 timer = setInterval(function(){
num++;
if(num==$(".bander ul:first-child li").length){
num = 0;
}
$(".bander ul:first-child").find("li").eq(num).fadeIn().siblings().fadeOut();
$(".bander ul:last-child").find("li").eq(num).css("background","#ec7002").siblings().css("background","#4a4110");
},2000); 
$(".bander ul:last-child").find("li").on({mouseenter:function(){
      var index = $(this).index();
      $(".bander ul:first-child").find("li").eq(index).fadeIn().siblings().fadeOut();
      $(".bander ul:last-child").find("li").eq(index).css("background","#ec7002").siblings().css("background","#4a4110");
      num = index;
      clearInterval(timer)
},mouseleave:function(){
 timer = setInterval(function(){
num++;
if(num==$(".bander ul:first-child li").length){
num = 0;
}
$(".bander ul:first-child").find("li").eq(num).fadeIn().siblings().fadeOut();
$(".bander ul:last-child").find("li").eq(num).css("background","#ec7002").siblings().css("background","#4a4110");
},2000)
}
});
}());
  
  

(function(){
var a = 0;
var b = null;
$(".bander2").find("li").eq(a).fadeIn().siblings().fadeOut();
$(".bander3").find("li").eq(a).css("background","#ec7002").siblings().css("background","#fff");
 b = setInterval(function(){
a++;
if(a==$(".bander2 li").length){
a= 0;
}
$(".bander2").find("li").eq(a).fadeIn().siblings().fadeOut();
$(".bander3").find("li").eq(a).css("background","#ec7002").siblings().css("background","#fff");
},2000);
$(".bander3").find("li").on({mouseenter:function(){
      var index = $(this).index();
      $(".bander2").find("li").eq(index).fadeIn().siblings().fadeOut();
      $(".bander3").find("li").eq(index).css("background","#ec7002").siblings().css("background","#fff");
      a = index;
      clearInterval(b);
},mouseleave:function(){
 b = setInterval(function(){
a++;
if(a==$(".bander2 li").length){
a = 0;
}
$(".bander2").find("li").eq(a).fadeIn().siblings().fadeOut();
$(".bander3").find("li").eq(a).css("background","#ec7002").siblings().css("background","#fff");
},2000)
}

});

}());
  
(function(){ 
 var starttime = new Date("2018/7/3");
  setInterval(function () {
    var nowtime = new Date();
    var time = starttime - nowtime;
    var hour = parseInt(time / 1000 / 60 / 60);
    var minute = parseInt(time / 1000 / 60 % 60);
    var seconds = parseInt(time / 1000 % 60);
    
    var hour_g = hour%10;
    var hour_s = parseInt(hour/10);
    var minute_g = minute%10;
    var minute_s = parseInt(minute/10);
    var seconds_g = seconds%10;
    var seconds_s = parseInt(seconds/10);
    $('.djs').html("<span>"+hour_s+"</span>"+"<span>"+hour_g+"</span>"+': '+"<span>"+minute_s+"</span>"+"<span>"+minute_g+"</span>"+': '+"<span>"+seconds_s+"</span>"+"<span>"+seconds_g+"</span>");
  }, 1000);   
   
}());  


(function(){
var all = 0;
setInterval(function(){
if(all == -3600){
$(".main3_lb").stop().animate({left:0},0);
	all = 0;
}
all += -1200
$(".main3_lb").stop().animate({left:all},300);
},2500);
}());

if($.cookie("username")!=undefined){
$(".yhxx").text("欢迎回来,"+$.cookie("username"))
}else{
$(".yhxx").text("您还未登录")
};
//获取列表
var classid = location.search.split("=")[1];

$.getJSON("http://datainfo.duapp.com/shopdata/getGoods.php?callback=?",{classID:classid},function(data){

	
	var str = "";
	$.each(data, function(index,item) {
		
	str += 	`<li>
					<a href="xq.html?goodsID=${item.goodsID}">
							<img src="${item.goodsListImg}" alt="" />
							<p>${item.goodsName}</p>
						</a>
					<p>￥${item.price}</p>
				</li>
			`;
	$(".lb_main3_ul").html(str);
	});  
});

//获取详情

var goodsid = location.search.split("=")[1];
$.getJSON("http://datainfo.duapp.com/shopdata/getGoods.php?callback=?",{goodsID:goodsid},function(data){
var  str = "";
console.log(data[0].imgsUrl)
var arr = 1;
	str = `<div>
				<div class="fdj1">
					<div class="fdj11">
					<img src="${data[0].goodsListImg}" alt="" class="fdj2"/>
					<p class="fdj3"></p>
					</div>
					<div class="fdj6">
					<img src="${data[0].goodsListImg}" alt="" class="fdj4"/>
					</div>
				</div>
				<div>
					<p>${data[0].goodsName}</p>
					<p>￥${data[0].price}</p>
					<p><span class="xq_gw_j">+</span><span class="xq_gw_s">${arr}</span><span class="xq_gw_i">-</span></p>
					<p class="gwc_btn">加入购物车</p>
				</div>
			</div>
			`;
$("#xq_main").html(str)
	
//加入购物车

$(".xq_gw_j").click(function(){
++arr;
$(".xq_gw_s").text(arr);


});
$(".xq_gw_i").click(function(){
--arr;
if(arr<=1){
arr = 1;
}
$(".xq_gw_s").text(arr);

})



$(".gwc_btn").click(function(){
		
		console.log("aa")
		$.get("http://datainfo.duapp.com/shopdata/updatecar.php",{userID:$.cookie("username"),goodsID:data[0].goodsID,number:arr},function(data){
		if(data == 0){
			alert("添加失败");
		}
		if(data == 1){
			alert("添加成功")
		}		
		})	
	})

});

//  查看购物车
$.getJSON("http://datainfo.duapp.com/shopdata/getCar.php?callback=?",{userID:$.cookie("username")},function(data){
	var str = "";
	$.each(data, function(index,item) {
	var nn =item.number*item.price
	
	str += 	` 
						
						<li>
							<img src="${item.goodsListImg}">
							<p><span>商品名称:</span>${item.goodsName}</p>
							<span class="jiage">单价:<span>${item.price}</span></span>
							<b class="gwc_b">数量:<span>${item.number}</span></b>
							<a class="zongjia">总价:<span>${nn}</span></a>
							<div class="gwc_j">+</div>
							<div class="gwc_jian">-</div>
							<div class="gwc_sc" dataid=${item.goodsID}>删除</div>
						</li>
						`
			;
	$(".gwc_main_ul").html(str);
	});
	
	$(".gwc_j").click(function(){
		var goodid = $(this).next().next().attr("dataid");
	var ttt = $(this).prev().prev().find("span").text();
		++ttt;
		
		$(this).prev().prev().find("span").text(ttt);
	var danjia = $(this).siblings(".jiage").find("span").text();
		$(this).siblings(".zongjia").find("span").text(ttt*danjia);
		
		$.get("http://datainfo.duapp.com/shopdata/updatecar.php",{userID:$.cookie("username"),goodsID:goodid,number:ttt},function(data){
	})
		/*$.getJSON("http://datainfo.duapp.com/shopdata/getCar.php?callback=?",{userID:$.cookie("username"),goodsID:goodid},function(data){
		
	$.each(data, function(index,item) {
		console.log(item.goodsID)
		
		if(item.goodsID == goodid){
		var numb = item.number
		++numb
		//$(".gwc_sc[dataid='goodid']").siblings(".gwc_b").find("span").text(numb);
		//}
	});

	})*/
	});
	
	$(".gwc_jian").click(function(){
		var goodid = $(this).next().attr("dataid");
	var ttt = $(this).prev().prev().prev().find("span").text();
		--ttt;
		if(ttt<=1){
			ttt = 1;
		}
		$(this).prev().prev().prev().find("span").text(ttt);
		var danjia = $(this).siblings(".jiage").find("span").text();
		$(this).siblings(".zongjia").find("span").text(ttt*danjia);
		$.get("http://datainfo.duapp.com/shopdata/updatecar.php",{userID:$.cookie("username"),goodsID:goodid,number:ttt},function(data){
	})
		});
	
	
	
	
	$(".gwc_sc").click(function(){
	var goodsid = $(this).attr("dataid")
	$(this).parent().remove();
	$.get("http://datainfo.duapp.com/shopdata/updatecar.php",{userID:$.cookie("username"),goodsID:goodsid,number:0},function(data){
	
	})
	
	
		
	


})



	
	
	
})







});


















