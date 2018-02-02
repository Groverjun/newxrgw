$(".nav ul li").hover(function(){
	$(this).find(".nav_tow").stop().slideToggle()
})
$(".xrhead_banner").terseBanner({
	auto:1500
});

window.onload=function(){
	var sum=0;/*初始化曝光数*/
	var allsum;/*当前的曝光数*/
	var i=0;/*每秒的增长量*/
	var data= new Date();/*时间对象*/
	var time=data.getHours();/*小时*/
	var minu= data.getMinutes();/*分钟*/
	var sec=data.getSeconds();/*秒*/
	var times=(time*3600)+(minu*60)+sec;/*当前时间的总秒数**/
	if(times>=0&&times<=32400){/*时间段的总秒数：32400*/
		/* 0:00-9:00  */
		i=333333;
		allsum=times*i;
		sum=allsum
	}else if(times>=32400&&times<=43200){/*时间段的总秒数：10800*/
		/* 9:00-12:00*/
		i=555555;
		allsum=sum+(32400*10)+(times-32400)
		sum=allsum
	}else if(times>=43200&&times<=61200){/*时间段的总秒数：18000*/
		/* 12:00-17:00*/
		i=333333;
		allsum=sum+(32400*10)+ (10800*300)+(times-43200)
		sum=allsum
	}else if(times>=61200&&times<=75600){/*时间段的总秒数：14400*/
		/* 17:00-21:00*/
		i=239858;
		allsum=sum+(32400*10)+ (10800*300)+(18000*500)+(times-61200)
		sum=allsum

	}else if(times>=75600&&times<=86400){/*时间段的总秒数：10800*/
		/* 21:00-24:00*/
		i=139;
		allsum=sum+(32400*10)+ (10800*300)+(18000*500)+(14400*200)+(times-75600)
		sum=allsum
	}
	$(function() {
		setInterval(function(){
			show_num1(sum,i)
		},1000);
	});
	function show_num1(n,i) {
		sum=sum+i
		var it = $(".t_num1 i");
		var len = String(n).length;
		for(var i = 0; i < len; i++) {
			if(it.length <= i) {
				$(".t_num1").append("<i></i>");
			}
			var num = String(n).charAt(i);
			//根据数字图片的高度设置相应的值
			var y = -parseInt(num) * 58;
			var obj = $(".t_num1 i").eq(i);
			obj.animate({
				backgroundPosition: '(0 ' + String(y) + 'px)'
			}, 'slow', 'swing', function() {});
		}
		$("#cur_num").val(n);
	}
	
}