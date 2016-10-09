$(function(){
	var audio=$('audio').get(0);//获取audio
	var baofangZanting=$('.controls .baofang-zanting');
	var jinDu=$('.jindu');
	var jinDucir=$('.jindu .yuan');
	var vJindu=$('.yin-jindu');
	var vcir=$('.yin-jindu .yuan');
	var preSong=$('.presong');
	var nextSong=$('.nextsong');
	var index=0;
	var shuju=[
		{name:"Baby don't cry",src:"mp3/俞更寅姐姐团 - Baby don't cry 俞更寅.mp3",sing:"俞更寅",time:"01.17",url:"1.png"},
		{name:"公主披风",src:"mp3/SNH48 - 公主披风.mp3",sing:"SNH48",time:"03.25",url:"gzpf.jpg"},
		{name:"error",src:"mp3/俞更寅姐姐团 - error (纯净版）俞更寅组.mp3",sing:"俞更寅",time:"03.06",url:"1.png"},
		{name:"柴米油盐酱醋茶",src:"mp3/俞更寅姐姐团 - 柴米油盐酱醋茶-俞更寅.mp3",sing:"俞更寅",time:"03.53",url:"1.png"},
		{name:"小幸运",src:"mp3/双笙 - 小幸运.mp3",sing:"双笙",time:"04.50",url:"xxy.jpg"},
		{name:"下雨的日子",src:"mp3/俞更寅姐姐团 - 俞更寅 蔡徐坤 戴景耀 金鸣-【下雨的日子】.mp3",sing:"俞更寅",time:"02.57",url:"1.png"},
		{name:"ParaPara Sakura",src:"mp3/俞更寅姐姐团 - 俞更寅&戴景耀&蔡徐坤&金鸣—ParaPara Sakura.mp3",sing:"俞更寅",time:"03.07",url:"1.png"},
		{name:"在光化门",src:"mp3/俞更寅姐姐团 - 俞更寅-【在光化门】.mp3",sing:"俞更寅",time:"01.18",url:"1.png"}	
	];
	$.each(shuju,function(i,v){
		$('<li><div class="kuang"><input type="checkbox"></div><div class="name-box"><div class="names">'+v.name+'</div><div class="hov-box"><a class="bo"></a><a class="ad"></a><a class="xial"></a><a class="fenxi"></a></div></div><div class="singer">'+v.sing+'</div><div class="times">'+v.time+'</div></li>').appendTo('.gequ');
	})
	//播放下一首
	nextSong.on('click',function(){
		index++;
		if(index==shuju.length){
			index=0;
		}
		audio.src=shuju[index].src;
		audio.play();
	})
	//播放上一首
	preSong.on('click',function(){
		index--;
		if(index==-1){
			index=shuju.length-1;
		}
		audio.src=shuju[index].src;
		audio.play();
	})
	
	//点击歌名，播放歌曲
	$('.gequ').on('click','li',function(){
		var index=$(this).index();
		audio.src=shuju[index].src;
		$('.geci-box .album-tu').css({
			backgroundImage:"url(img/"+shuju[index].url+")"
		})
		$('.album-scri .gqm').text("歌曲名:"+shuju[index].name+"")
		$('.album-scri .gsm').text("歌手名:"+shuju[index].sing+"")
		$('.album-scri .zjm').text("专辑名:"+shuju[index].name+"")
		audio.play();
		baofangZanting.addClass('zanting').siblings().removeClass('zanting');
	})		

	//播放按钮点击事件
	baofangZanting.on('click',function(){
		if(audio.paused){
			baofangZanting.addClass('zanting');
			audio.play();
		}else{
			baofangZanting.removeClass('zanting');
			audio.pause();
		}
	})
	//当前播放时间和总时间
	audio.ontimeupdate = function(){
		jinDucir.css({
			left:jinDu.width()*(audio.currentTime/audio.duration)
		});
		$('.controls .jindu-mask').css({
			width:jinDu.width()*(audio.currentTime/audio.duration)+5
		})
			$('.shijian #dangqian').text(studyTime(audio.currentTime));
			$('.shijian #zongshi').text(studyTime(audio.duration));		
	}
	
	//处理时间格式函数
	var h=0,m=0,s=0;
	function studyTime(t){
		m=parseInt(t/60);
		s=parseInt(t%60);
		m=m<10?'0'+m:m;
		s=s<10?'0'+s:s;
		return m+":"+s;
	}
	//歌曲进度点击事件
	jinDu.on('click',function(e){
		jinDucir.css({
			left:e.offsetX
		})
		jinDu.css({zIndex:13})
		audio.currentTime=audio.duration*(e.offsetX/jinDu.width())
	})
	jinDucir.on('click',false)
		
	
	
	//声音进度点击事件
	vJindu.on('click',function(e){
		vcir.css({
			left:e.offsetX
		})
		$('.load-box .yin-jindu1').css({
			width:e.offsetX+5
		})
		audio.volume=e.offsetX/vJindu.width()
		$('.volum').attr('save',audio.volume)
	})
	vcir.on('click',false);
	//静音非静音点击事件
	$('.yinliang .volum').on('click',function(){
		if(audio.volume==0){
			audio.volume=$(this).attr('save');
			$('.yinliang .volum').removeClass('yin-gang')
			vcir.css({
				left:audio.volume*vJindu.width()
			})
			$('.load-box .yin-jindu1').css({
				width:audio.volume*vJindu.width()+5
			})
		}else{
			audio.volume=0;
			$('.yinliang .volum').addClass('yin-gang');
			vcir.css({
				left:0
			})
		}		
	})
	
	//删除事件
	$('.zuo-sj .zuo-zs').on('click',function(){
		$('.gequ-box .gequ .kuang input:checked').parent().parent().remove()
			
		
	})
	
	
	
})
