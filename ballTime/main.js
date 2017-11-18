var WINDOW_WIDTH = document.body.clientWidth
var WINDOW_HEIGHT = document.body.clientHeight
var ran,  // 小球半径
    marginL,  // 左边距离
    marginT,  // 上边距离
    ct  // 储存context

var nowTime = new Date() //储存当前显示的时间
var balls = [] //储存动画出现的彩色小球

window.onload = function () {
	var canvas = document.getElementById('canvas')
	ct = canvas.getContext('2d')

	canvas.width = WINDOW_WIDTH - 10  //减10抵消滚动条的宽度。
	canvas.height = WINDOW_HEIGHT - 10 //避免出现滚动条

	ran = parseInt(canvas.width/116-1) //根据画布宽度设定半径
    marginL = (canvas.width - 116*(ran+1) + 2*ran)/2
    marginT = (canvas.height - 20*(ran+1))/2   //计算时钟居中显示

    setInterval(function () {
        arrange() // 数字显示方法
        update()  // 特效更新方法
    }, 50);
}


// 动画刷新方法
function update () {
    nextTime = new Date()
    var nextHours = nextTime.getHours()
    var nextMinutes = nextTime.getMinutes()
    var nextSeconds =  nextTime.getSeconds()

    var nowHours = nowTime.getHours()
    var nowMinutes = nowTime.getMinutes()
    var nowSeconds =  nowTime.getSeconds()

    if (nextTime != nowTime) { //节约性能，先进行总的判断，再细分判断
        if (parseInt(nextHours/10) != parseInt(nowHours/10)) {
            draw(marginL, parseInt(nowHours/10))
        }
        if (parseInt(nextHours%10) != parseInt(nowHours%10)) {
            draw(marginL+16*(ran+1), parseInt(nowHours%10))
        }
        if (parseInt(nextMinutes/10) != parseInt(nowMinutes/10)) {
            draw(marginL+42*(ran+1), parseInt(nowMinutes/10))
        }
        if (parseInt(nextMinutes%10) != parseInt(nowMinutes%10)) {
            draw(marginL+58*(ran+1), parseInt(nowMinutes%10))
        }
        if (parseInt(nextSeconds/10) != parseInt(nowSeconds/10)) {
            addBall(marginL+84*(ran+1), parseInt(nowSeconds/10))
        }
        if (parseInt(nextSeconds%10) != parseInt(nowSeconds%10)) {
            addBall(marginL+100*(ran+1),parseInt(nowSeconds%10))
        }
        nowTime = nextTime
    }

    updateBall()
}

function addBall (left, num) {
    var i,j
    for (i=0; i<digit[num].length; i++) {
        for (j=0; j<digit[num][i].length; j++) {
            if (digit[num][i][j] == 1) {
                var aball = {
                    x: left+(2*j+1)*(ran+1),    // x轴起始位置
                    y: marginT+(2*i+1)*(ran+1), // y轴起始位置
                    g: 1.5+Math.random(),       // 加速度
                    vx: 8,                      // x轴方向速度
                    vy: -5                      // y轴方向速度
                }
                balls.push(aball)
            }
        }
    }
    
}

function updateBall () {
    var i
    for (i=0; i<balls.length; i++) {
        ct.beginPath()
        ct.fillStyle = "#aaa"
        ct.arc(balls[i].x, balls[i].y, ran, 0, 2*Math.PI)

        ct.fill()

        balls[i].x += balls[i].vx
        balls[i].y += balls[i].vy
        balls[i].vy += balls[i].g

        if (balls[i].y > 2*(WINDOW_HEIGHT + ran + 1)) {
            // 判断小球飞出范围就从数组中移除
            // 2倍是为了解决小球闪烁的问题。
            balls.splice(i,1)
        }
    }
}


//生成画面数字
function draw (left, num) {
    ct.fillStyle = "#0088ff"

	var i, j
	for (i=0; i<digit[num].length; i++) {
		for (j=0; j<digit[num][i].length; j++) {
			if (digit[num][i][j] == 1) {
				ct.beginPath()
				ct.arc(left+(2*j+1)*(ran+1), marginT+(2*i+1)*(ran+1), ran, 0, 2*Math.PI)
				//      距离左边框距离     ， 距离上边框距离

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



