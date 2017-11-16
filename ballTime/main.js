var ran, marginL, marginT

window.onload = function () {
	var canvas = document.getElementById('canvas')
	var context = canvas.getContext('2d')

	canvas.width = 1000
	canvas.height = 300
	ran = parseInt(canvas.width/116-1)
    marginL = (canvas.width - 116*(ran+1) + 2*ran)/2
    marginT = (canvas.height - 20*(ran+1))/2

    arrange(context)
    setInterval(arrange, 1000, context);
}


//生成画面数字
function draw (marginL, num, ct) {
	var i, j
	for (i=0; i<digit[num].length; i++) {
		for (j=0; j<digit[num][i].length; j++) {
			if (digit[num][i][j] == 1) {
				ct.beginPath()
				ct.arc(marginL+(2*j+1)*(ran+1), marginT+(2*i+1)*(ran+1), ran, 0, 2*Math.PI)
				ct.fillStyle = "#0088ff"
				ct.fill()
			}
		}
	}
}

//处理显示什么
function arrange (ct) {
    var now = new Date()
	var hours = now.getHours()
	var minutes = now.getMinutes()
	var seconds =  now.getSeconds()

     ct.clearRect(0, 0, canvas.width, canvas.height)

	draw(marginL, parseInt(hours/10), ct)//小时十位
	draw(marginL+16*(ran+1), parseInt(hours%10), ct)//小时个位
	draw(marginL+32*(ran+1), 10, ct)//冒号
	draw(marginL+42*(ran+1), parseInt(minutes/10), ct)//分钟十位
	draw(marginL+58*(ran+1), parseInt(minutes%10), ct)//分钟个位
	draw(marginL+74*(ran+1), 10, ct)//冒号
	draw(marginL+84*(ran+1), parseInt(seconds/10), ct)//秒钟十位
	draw(marginL+100*(ran+1), parseInt(seconds%10), ct)//秒钟个位
}



