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
/*获取数据*/
$.ajax({
		type:"get",
		url:"http://dt.wayboo.net.cn/websitecontroller/officewebsite.action",
		async:false,
		dataType: "jsonp",
		success:function(str){
			data=str
			MinCarousel()
		}
});	

/*数据滚动**/
var MinCarousel=function(){
	var MinCarouselI=0;
	var j=4;
	var str=data.jsonp.sybbackstage;
	$(".xr_head_bottomRight>div>ul li").eq(0).html(str[0].supplier_data)
	$(".xr_head_bottomRight>div>ul li").eq(1).html(str[1].supplier_data)
	$(".xr_head_bottomRight>div>ul li").eq(2).html(str[2].supplier_data)
	$(".xr_head_bottomRight>div>ul li").eq(3).html(str[3].supplier_data)
	var Car=setInterval(function(){
		MinCarouselI+=90;
		if(MinCarouselI%360==0||MinCarouselI==0){
			if(j<20){
				$(".xr_head_bottomRight>div>ul li").eq(0).html(str[j].supplier_data)
				$(".xr_head_bottomRight>div>ul li").eq(1).html(str[j+1].supplier_data)
				$(".xr_head_bottomRight>div>ul li").eq(2).html(str[j+2].supplier_data)
				$(".xr_head_bottomRight>div>ul li").eq(3).html(str[j+3].supplier_data)
				j+=4;
			}else if(j==20){
				j=0
			}
		}
		$(".xr_head_bottomRight>div>ul").css("transform","rotateX("+MinCarouselI+"deg)")
	},1500)
}




/*地图*/
var arrmap = {
	'上海': [121.4648, 31.2891],
	'东莞': [113.8953, 22.901],
	'东营': [118.7073, 37.5513],
	'中山': [113.4229, 22.478],
	'临汾': [111.4783, 36.1615],
	'临沂': [118.3118, 35.2936],
	'丹东': [124.541, 40.4242],
	'丽水': [119.5642, 28.1854],
	'乌鲁木齐': [87.9236, 43.5883],
	'佛山': [112.8955, 23.1097],
	'保定': [115.0488, 39.0948],
	'兰州': [103.5901, 36.3043],
	'包头': [110.3467, 41.4899],
	'北京': [116.4551, 40.2539],
	'北海': [109.314, 21.6211],
	'南京': [118.8062, 31.9208],
	'南宁': [108.479, 23.1152],
	'南昌': [116.0046, 28.6633],
	'南通': [121.1023, 32.1625],
	'厦门': [118.1689, 24.6478],
	'台州': [121.1353, 28.6688],
	'合肥': [117.29, 32.0581],
	'呼和浩特': [111.4124, 40.4901],
	'咸阳': [108.4131, 34.8706],
	'哈尔滨': [127.9688, 45.368],
	'唐山': [118.4766, 39.6826],
	'嘉兴': [120.9155, 30.6354],
	'大同': [113.7854, 39.8035],
	'大连': [122.2229, 39.4409],
	'天津': [117.4219, 39.4189],
	'太原': [112.3352, 37.9413],
	'威海': [121.9482, 37.1393],
	'宁波': [121.5967, 29.6466],
	'宝鸡': [107.1826, 34.3433],
	'宿迁': [118.5535, 33.7775],
	'常州': [119.4543, 31.5582],
	'广州': [113.5107, 23.2196],
	'廊坊': [116.521, 39.0509],
	'延安': [109.1052, 36.4252],
	'张家口': [115.1477, 40.8527],
	'徐州': [117.5208, 34.3268],
	'德州': [116.6858, 37.2107],
	'惠州': [114.6204, 23.1647],
	'成都': [103.9526, 30.7617],
	'扬州': [119.4653, 32.8162],
	'承德': [117.5757, 41.4075],
	'拉萨': [91.1865, 30.1465],
	'无锡': [120.3442, 31.5527],
	'日照': [119.2786, 35.5023],
	'昆明': [102.9199, 25.4663],
	'杭州': [119.5313, 29.8773],
	'枣庄': [117.323, 34.8926],
	'柳州': [109.3799, 24.9774],
	'株洲': [113.5327, 27.0319],
	'武汉': [114.3896, 30.6628],
	'汕头': [117.1692, 23.3405],
	'江门': [112.6318, 22.1484],
	'沈阳': [123.1238, 42.1216],
	'沧州': [116.8286, 38.2104],
	'河源': [114.917, 23.9722],
	'泉州': [118.3228, 25.1147],
	'泰安': [117.0264, 36.0516],
	'泰州': [120.0586, 32.5525],
	'济南': [117.1582, 36.8701],
	'济宁': [116.8286, 35.3375],
	'海口': [110.3893, 19.8516],
	'淄博': [118.0371, 36.6064],
	'淮安': [118.927, 33.4039],
	'深圳': [114.5435, 22.5439],
	'清远': [112.9175, 24.3292],
	'温州': [120.498, 27.8119],
	'渭南': [109.7864, 35.0299],
	'湖州': [119.8608, 30.7782],
	'湘潭': [112.5439, 27.7075],
	'滨州': [117.8174, 37.4963],
	'潍坊': [119.0918, 36.524],
	'烟台': [120.7397, 37.5128],
	'玉溪': [101.9312, 23.8898],
	'珠海': [113.7305, 22.1155],
	'盐城': [120.2234, 33.5577],
	'盘锦': [121.9482, 41.0449],
	'石家庄': [114.4995, 38.1006],
	'福州': [119.4543, 25.9222],
	'秦皇岛': [119.2126, 40.0232],
	'绍兴': [120.564, 29.7565],
	'聊城': [115.9167, 36.4032],
	'肇庆': [112.1265, 23.5822],
	'舟山': [122.2559, 30.2234],
	'苏州': [120.6519, 31.3989],
	'莱芜': [117.6526, 36.2714],
	'菏泽': [115.6201, 35.2057],
	'营口': [122.4316, 40.4297],
	'葫芦岛': [120.1575, 40.578],
	'衡水': [115.8838, 37.7161],
	'衢州': [118.6853, 28.8666],
	'西宁': [101.4038, 36.8207],
	'西安': [109.1162, 34.2004],
	'贵阳': [106.6992, 26.7682],
	'连云港': [119.1248, 34.552],
	'邢台': [114.8071, 37.2821],
	'邯郸': [114.4775, 36.535],
	'郑州': [113.4668, 34.6234],
	'鄂尔多斯': [108.9734, 39.2487],
	'重庆': [107.7539, 30.1904],
	'金华': [120.0037, 29.1028],
	'铜川': [109.0393, 35.1947],
	'银川': [106.3586, 38.1775],
	'镇江': [119.4763, 31.9702],
	'长春': [125.8154, 44.2584],
	'长沙': [113.0823, 28.2568],
	'长治': [112.8625, 36.4746],
	'阳泉': [113.4778, 38.0951],
	'青岛': [120.4651, 36.3373],
	'韶关': [113.7964, 24.7028]
}
var $imgs = [{
		area: '北京',tel:"电话：021-61800231",map:"上海市中山路2709号杰底大厦907室"
	},
	{
		area: '上海',tel:"电话：021-61800231",map:"上海市中山路2709号杰底大厦907室"
	},
	{
		area: '哈尔滨',tel:"电话：021-61800231",map:"上海市中山路2709号杰底大厦907室"
	},
	{
		area: '长春',tel:"电话：021-61800231",map:"上海市中山路2709号杰底大厦907室"
	},
	{
		area: '沈阳',tel:"电话：021-61800231",map:"上海市中山路2709号杰底大厦907室"
	},
	{
		area: '大连',tel:"电话：021-61800231",map:"上海市中山路2709号杰底大厦907室"
	},
	{
		area: '天津',tel:"电话：021-61800231",map:"上海市中山路2709号杰底大厦907室"
	},
	{
		area: '石家庄',tel:"电话：021-61800231",map:"上海市中山路2709号杰底大厦907室"
	},
	{
		area: '保定',tel:"电话：021-61800231",map:"上海市中山路2709号杰底大厦907室"
	},
	{
		area: '沧州',tel:"电话：021-61800231",map:"上海市中山路2709号杰底大厦907室"
	},
	{
		area: '邯郸',tel:"电话：021-61800231",map:"上海市中山路2709号杰底大厦907室"
	},
	{
		area: '唐山',tel:"电话：021-61800231",map:"上海市中山路2709号杰底大厦907室"
	},
	{
		area: '济南',tel:"电话：021-61800231",map:"上海市中山路2709号杰底大厦907室"
	},
	{
		area: '烟台',tel:"电话：021-61800231",map:"上海市中山路2709号杰底大厦907室"
	},
	{
		area: '郑州',tel:"电话：021-61800231",map:"上海市中山路2709号杰底大厦907室"
	},
	{
		area: '南京',tel:"电话：021-61800231",map:"上海市中山路2709号杰底大厦907室"
	},
	{
		area: '苏州',tel:"电话：021-61800231",map:"上海市中山路2709号杰底大厦907室"
	},
	{
		area: '无锡',tel:"电话：021-61800231",map:"上海市中山路2709号杰底大厦907室"
	},
	{
		area: '南通',tel:"电话：021-61800231",map:"上海市中山路2709号杰底大厦907室"
	},
	{
		area: '西安',tel:"电话：021-61800231",map:"上海市中山路2709号杰底大厦907室"
	},
	{
		area: '重庆',tel:"电话：021-61800231",map:"上海市中山路2709号杰底大厦907室"
	},
	{
		area: '成都',tel:"电话：021-61800231",map:"上海市中山路2709号杰底大厦907室"
	},
	{
		area: '昆明',tel:"电话：021-61800231",map:"上海市中山路2709号杰底大厦907室"
	},
	{
		area: '厦门',tel:"电话：021-61800231",map:"上海市中山路2709号杰底大厦907室"
	}

]
var AllName=[
	{name: '北京' },
	{name: '上海' },
	{name: '哈尔滨' },
	{name: '长春',},
	{name: '沈阳',},
	{name: '大连',},
	{name: '天津',},
	{name: '石家庄',},
	{name: '保定' },
	{name: '沧州' },
	{name: '邯郸' },
	{name: '唐山',},
	{name: '济南',},
	{name: '烟台',},
	{name: '郑州',},
	{name: '南京',},
	{name: '苏州' },
	{name: '无锡' },
	{name: '南通' },
	{name: '西安',},
	{name: '重庆',},
	{name: '成都',},
	{name: '昆明',},
	{name: '厦门',}
]
$('#document').ready(function(){
	 getEcharts();
});
function getEcharts(){
    require.config({
        paths: {
            echarts: './js'
    }
});
require(
    [
        'echarts',
        'echarts/chart/map'
    ],
    function (ec) {
        var myChart2 = ec.init(document.getElementById('map'));
        myChart2.setOption({
			tooltip : {
	            trigger: 'item',
	            /*设置弹出框*/
	            formatter: function (params,ticket,callback){
	                var $pna = params.name;
	                var res = '';
	                for(var i = 0;i<$imgs.length;i++){
	                    if($imgs[i].area == $pna){
	                    	/*设置弹出的内容**/
	                        res = `
		                        <div class="maptxt" ">
			                       <div>
				                        <h2>信融${$pna}分公司</h2>
				                        <p>${$imgs[i].tel} </p>
				                        <p>${$imgs[i].map} </p>
			                       </div>
		                        </div>
	                        `;
	                        break;
						}else{
	                        res=$pna
						}
	                }
	                return res;
	            },
				axisPointer:{
				},
				textStyle: {
					color:"#000"/***/
				},
				backgroundColor: 'rgba(0,0,0,0)',/**提示框颜色*/
	       },
			series : [
				{
					type: 'map',
					roam: false,/*是否可拖拽*/
					hoverable: false,
					mapType: 'china',
					itemStyle:{
						normal:{
							borderColor:"#FFC97C",/**线条颜色*/
							borderWidth:0.2,/**线条宽*/
							areaStyle:{
								color: '#efeeee',/**地图颜色*/
							}
						},
						emphasis:{
							areaStyle:{
								color: '#FCF9F4',/**鼠标移入地图颜色*/
							}
						}
					},
					data:[],
					geoCoord:arrmap,
					markPoint : {
						symbol:'emptyCircle',
						symbolSize : function (v){
							return 10 + v/10
						},
						itemStyle:{
							normal:{
								borderColor:"#BDE4F4",/**圆圈颜色*/
							},
						},
						effect : {
							show: true,
							shadowBlur : 10
						},
						data : AllName
					}
				},
				{
					type: 'map',
					mapType: 'china',
					data:[],
					markPoint : {
						symbol:'emptyCircle',
						symbolSize : function (v){
							return 0.1
						},
						effect : {
							show: false,
							shadowBlur : 0
						},
						itemStyle:{
							normal:{
								label:{show:true,
										    position:'top',
										    textStyle: {
												fontSize: 14,/*字体大小**/
		                                        color:"#000",/*字体颜色**/
		                                        borderColor:"#000",
											},
											formatter:(params)=>{
												return params.name/**显示地区名*/
											}	
										}
								},
								emphasis: {
									label:{show:false}
								}
							},
							data :AllName
						}
					}
				]
        });
	});
}
function fun(t){
	alert(0)
}