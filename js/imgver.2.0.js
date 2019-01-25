function imgVer(Config) {
	var el = eval(Config.el);
	var w = Config.width;
	var h = Config.height;
	var imgLibrary = Config.img;
	var PL_Size = 48;
	var padding = 20;
	var MinN_X = padding + PL_Size;
	var MaxN_X = w - padding - PL_Size - PL_Size / 6;
	var MaxN_Y = padding;
	var MinN_Y = h - padding - PL_Size - PL_Size / 6;
	var bi = Config.lan;
	function RandomNum(minNum, maxNum) {
		switch(arguments.length){ 
		case 1: 
			return parseInt(Math.random()*minNum+1,10); 
		break; 
		case 2: 
			return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10); 
		break; 
			default: 
				return 0; 
			break; 
		}
	}
	function lang(lnum,bi)	{
		if(!bi)	{
			bi = 'cn';
		}
		
		cn = new Array();
		cn["lan1"] = "按住左边滑块，拖动完成上方拼图";
		cn["lan2"] = "验证通过";
		cn["lan3"] = "验证失败";
		cn["lan4"] = "拖动滑块将悬浮图像正确拼合";
		
		en = new Array();
		en["lan1"] = "Drag slider to finish the puzzle.";
		en["lan2"] = "Success";
		en["lan3"] = "Fail";
		en["lan4"] = "Complete the puzzle correctly.";
		
		return eval(bi)[lnum];
	}
	var imgRandom = RandomNum(1, imgLibrary.length)-1;
	var imgSrc = imgLibrary[imgRandom];
	//var imgSrc = Config.img;
	if(Config.randtox)
	{
		var X = Number(Config.randtox);
	}
	else
	{
		var X = RandomNum(MinN_X, MaxN_X);//68 184
	}
	var Y = RandomNum(MinN_Y, MaxN_Y);
	var left_Num = -X + 10;
	var html = '<div class="imgver_box"><div class="imgver_bg"></div><div class="imgver_main">';
	html += '<div style="position:relative;padding:16px 16px 28px;border:1px solid #ddd;background:#f2ece1;border-radius:16px;">';
	html += '<div style="position:relative;overflow:hidden;width:' + w + 'px;">';
	html += '<div style="position:relative;width:' + w + 'px;height:' + h + 'px;">';
	html += '<img id="scream" src="' + imgSrc + '" style="width:' + w + 'px;height:' + h + 'px;">';
	html += '<canvas id="puzzleBox" width="' + w + '" height="' + h + '" style="position:absolute;left:0;top:0;z-index:22;"></canvas>';
	html += '</div>';
	html += '<div class="puzzle-lost-box" style="position:absolute;width:' + w + 'px;height:' + h + 'px;top:0;left:' + left_Num + 'px;z-index:111;">';
	html += '<canvas id="puzzleShadow" width="' + w + '" height="' + h + '" style="position:absolute;left:0;top:0;z-index:22;"></canvas>';
	html += '<canvas id="puzzleLost" width="' + w + '" height="' + h + '" style="position:absolute;left:0;top:0;z-index:33;"></canvas>';
	html += '</div>';
	html += '<p class="ver-tips"></p>';
	html += '</div>';
	html += '<div class="re-btn"><a></a></div>';
	html += '</div>';
	html += '<br>';
	html += '<div style="position:relative;width:' + w + 'px;margin:auto;">';
	html += '<div style="border:1px solid #c3c3c3;border-radius:24px;background:#ece4dd;box-shadow:0 1px 1px rgba(12,10,10,0.2) inset;">';
	html += '<div style="padding-left:26px;"><p style="font-size:12px;color:#486c80;line-height:28px;text-align:center;">'+lang('lan1',bi)+'</p></div>';
	html += '</div>';
	html += '<div class="slider-btn"></div>';
	html += '</div>';
	html += '</div></div>';
	el.html(html);
	var d = PL_Size / 3;
	var c = document.getElementById("puzzleBox");
	var ctx = c.getContext("2d");
	ctx.globalCompositeOperation = "xor";
	ctx.shadowBlur = 10;
	ctx.shadowColor = "#fff";
	ctx.shadowOffsetX = 3;
	ctx.shadowOffsetY = 3;
	ctx.fillStyle = "rgba(0,0,0,0.7)";
	ctx.beginPath();
	ctx.lineWidth = "1";
	ctx.strokeStyle = "rgba(0,0,0,0)";
	ctx.moveTo(X, Y);
	ctx.lineTo(X + d, Y);
	ctx.bezierCurveTo(X + d, Y - d, X + 2 * d, Y - d, X + 2 * d, Y);
	ctx.lineTo(X + 3 * d, Y);
	ctx.lineTo(X + 3 * d, Y + d);
	ctx.bezierCurveTo(X + 2 * d, Y + d, X + 2 * d, Y + 2 * d, X + 3 * d, Y + 2 * d);
	ctx.lineTo(X + 3 * d, Y + 3 * d);
	ctx.lineTo(X, Y + 3 * d);
	ctx.closePath();
	ctx.stroke();
	ctx.fill();
	var c_l = document.getElementById("puzzleLost");
	var c_s = document.getElementById("puzzleShadow");
	var ctx_l = c_l.getContext("2d");
	var ctx_s = c_s.getContext("2d");
	var img = new Image();
	img.src = imgSrc;
	img.onload = function() {
		ctx_l.drawImage(img, 0, 0, w, h);
	}
	ctx_l.beginPath();
	ctx_l.strokeStyle = "rgba(0,0,0,0)";
	ctx_l.moveTo(X, Y);
	ctx_l.lineTo(X + d, Y);
	ctx_l.bezierCurveTo(X + d, Y - d, X + 2 * d, Y - d, X + 2 * d, Y);
	ctx_l.lineTo(X + 3 * d, Y);
	ctx_l.lineTo(X + 3 * d, Y + d);
	ctx_l.bezierCurveTo(X + 2 * d, Y + d, X + 2 * d, Y + 2 * d, X + 3 * d, Y + 2 * d);
	ctx_l.lineTo(X + 3 * d, Y + 3 * d);
	ctx_l.lineTo(X, Y + 3 * d);
	ctx_l.closePath();
	ctx_l.stroke();
	ctx_l.shadowBlur = 10;
	ctx_l.shadowColor = "black";
	ctx_l.clip();
	ctx_s.beginPath();
	ctx_s.lineWidth = "1";
	ctx_s.strokeStyle = "rgba(0,0,0,0)";
	ctx_s.moveTo(X, Y);
	ctx_s.lineTo(X + d, Y);
	ctx_s.bezierCurveTo(X + d, Y - d, X + 2 * d, Y - d, X + 2 * d, Y);
	ctx_s.lineTo(X + 3 * d, Y);
	ctx_s.lineTo(X + 3 * d, Y + d);
	ctx_s.bezierCurveTo(X + 2 * d, Y + d, X + 2 * d, Y + 2 * d, X + 3 * d, Y + 2 * d);
	ctx_s.lineTo(X + 3 * d, Y + 3 * d);
	ctx_s.lineTo(X, Y + 3 * d);
	ctx_s.closePath();
	ctx_s.stroke();
	ctx_s.shadowBlur = 20;
	ctx_s.shadowColor = "black";
	ctx_s.fill();
	var moveStart = '';
	$(".slider-btn").mousedown(function(e) {
		e = e || window.event;
		$(this).addClass("slider-hover");
		moveStart = e.pageX;
	});
	
	$('.slider-btn').on('touchstart', function(e) {
		var touch = e.originalEvent.targetTouches[0];
		moveStart = touch.pageX;
	});
	
	onmousemove = function(e) {
		e = e || window.event;
		var moveX = e.pageX;
		var d = moveX - moveStart;
		if (moveStart == '') {} else {
			if (d < 0 || d > (w - padding - PL_Size)) {} else {
				$(".slider-btn").css({"left":d+'px',"transition":"inherit"});
				$("#puzzleLost").css({"left":d+'px',"transition":"inherit"});
				$("#puzzleShadow").css({"left":d+'px',"transition":"inherit"});
			}
		}
	};
	
	$('.slider-btn').on('touchmove', function(e) {
		var touch = e.originalEvent.targetTouches[0];
		$(this).addClass("slider-hover");
		var moveX = touch.pageX;
		var d = moveX - moveStart;
		if (moveStart == '') {} else {
			if (d < 0 || d > (w - padding - PL_Size)) {} else {
				$(".slider-btn").css({"left":d+'px',"transition":"inherit"});
				$("#puzzleLost").css({"left":d+'px',"transition":"inherit"});
				$("#puzzleShadow").css({"left":d+'px',"transition":"inherit"});
			}
		}
	});
	
	onmouseup = function(e) {
		e = e || window.event;
		var moveEnd_X = e.pageX - moveStart;
		pizzend(moveEnd_X);
	}
	
	$('.slider-btn').on('touchend', function(e) {
		var touch = e.originalEvent.changedTouches[0];
		var moveEnd_X = touch.pageX - moveStart;
		pizzend(moveEnd_X);
	});
	
	function pizzend(moveEnd_X)
	{
		var ver_Num = X - 10;
		var deviation = 5;
		var Min_left = ver_Num - deviation;
		var Max_left = ver_Num + deviation;
		if (moveStart == '') {} else {
			if (Max_left > moveEnd_X && moveEnd_X > Min_left) {
				$(".ver-tips").html('<i class="success"></i><span style="color:#42ca6b;">'+lang('lan2',bi)+'</span><span></span>');
				$(".ver-tips").addClass("slider-tips");
				$(".puzzle-lost-box").addClass("imgver_hidden");
				$("#puzzleBox").addClass("imgver_hidden");
				setTimeout(function() {
					$(".ver-tips").removeClass("slider-tips");
					//imgVer(Config);
				},
				2000);
				imgver_code = '<input type="hidden" name="imgver_code" value="'+X+'" />';
				$(Config.form).append(imgver_code);
				//Config.form.imgver_code.value = X;
				Config.success();
			} else {
				$(".ver-tips").html('<i class="fail"></i><span style="color:red;">'+lang('lan3',bi)+':</span><span style="margin-left:4px;">'+lang('lan4',bi)+'</span>');
				$(".ver-tips").addClass("slider-tips");
				setTimeout(function() {
					$(".ver-tips").removeClass("slider-tips");
				},
				2000);
				Config.error();
			}
		}
		setTimeout(function() {
			$(".slider-btn").css({"left":'0',"transition":"left 0.5s"});
			$("#puzzleLost").css({"left":'0',"transition":"left 0.5s"});
			$("#puzzleShadow").css({"left":'0',"transition":"left 0.5s"});
		},
		1000);
		$(".slider-btn").removeClass("slider-hover");
		moveStart = '';
		$(".re-btn a").on("click",
		function() {
			//imgVer(Config);
			imgver_start(Config.form);
		})
	}
}