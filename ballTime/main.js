var WINDOW_WIDTH = document.body.clientWidth
var WINDOW_HEIGHT = document.body.clientHeight
var ran, marginL, marginT, ct
var nowTime = new Date()

var balls = []



window.onload = function () {
	var canvas = document.getElementById('canvas')
	ct = canvas.getContext('2d')

	canvas.width = WINDOW_WIDTH - 10  //减10抵消滚动条的宽度。
	canvas.height = WINDOW_HEIGHT - 10 //避免出现滚动条

	ran = parseInt(canvas.width/116-1) //根据画布宽度设定半径
    marginL = (canvas.width - 116*(ran+1) + 2*ran)/2
    marginT = (canvas.height - 20*(ran+1))/2   //计算时钟居中显示

    setInterval(function () {
        arrange()
        update()
    }, 50);
}

function update () {
    nextTime = new Date()
    var nextHours = nextTime.getHours()
    var nextMinutes = nextTime.getMinutes()
    var nextSeconds =  nextTime.getSeconds()

    var nowHours = nowTime.getHours()
    var nowMinutes = nowTime.getMinutes()
    var nowSeconds =  nowTime.getSeconds()

    if (parseInt(nextHours/10) != parseInt(nowHours/10)) {
        
    }
    if (parseInt(nextHours%10) != parseInt(nowHours%10)) {

    }
    if (parseInt(nextMinutes/10) != parseInt(nowMinutes/10)) {

    }
    if (parseInt(nextMinutes%10) != parseInt(nowMinutes%10)) {
        
    }
    if (parseInt(nextSeconds/10) != parseInt(nowSeconds/10)) {
        console.log("ten seconds pass")
    }
    if (parseInt(nextSeconds%10) != parseInt(nowSeconds%10)) {
        console.log("one second pass")
    }
    nowTime = nextTime
}

function addBall () {
    balls.push()
}



//生成画面数字
function draw (loca, num) {
    ct.fillStyle = "#0088ff"

	var i, j
	for (i=0; i<digit[num].length; i++) {
		for (j=0; j<digit[num][i].length; j++) {
			if (digit[num][i][j] == 1) {
				ct.beginPath()
				ct.arc(loca+(2*j+1)*(ran+1), marginT+(2*i+1)*(ran+1), ran, 0, 2*Math.PI)
				
				ct.fill()
			}
		}
	}
}

//处理显示什么
function arrange () {
    var seconds
    var nowSeconds = nowTime.getSeconds()

    if (seconds != nowSeconds) { //避免每帧渲染，只有当秒数变化时才渲染。
        var hours = nowTime.getHours()
        var minutes = nowTime.getMinutes()
        var seconds =  nowTime.getSeconds()

        ct.clearRect(0, 0, canvas.width, canvas.height)

        draw(marginL, parseInt(hours/10))//小时十位
        draw(marginL+16*(ran+1), parseInt(hours%10))//小时个位
        draw(marginL+32*(ran+1), 10)//冒号
        draw(marginL+42*(ran+1), parseInt(minutes/10))//分钟十位
        draw(marginL+58*(ran+1), parseInt(minutes%10))//分钟个位
        draw(marginL+74*(ran+1), 10)//冒号
        draw(marginL+84*(ran+1), parseInt(seconds/10))//秒钟十位
        draw(marginL+100*(ran+1), parseInt(seconds%10))//秒钟个位
    }
}



