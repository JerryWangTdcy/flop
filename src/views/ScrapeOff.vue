<template>
  <div class="main">
    <!-- <canvas id="tutorial"></canvas> -->
    <div class="back">
      <img src="https://wincode-game.oss-cn-shanghai.aliyuncs.com/scrape/bg.png" />
      <img src="https://wincode-game.oss-cn-shanghai.aliyuncs.com/scrape/ticket.png" class="ticket-bg" alt="">
    </div>
    <canvas id="ticket"></canvas>
    <!-- <img :src="url" alt=""> -->
  </div>
</template>
<script>
import ScrapAward from '../utils/ScrapAward'
export default {
  data() {
    return {
      fileslist: ['https://wincode-game.oss-cn-shanghai.aliyuncs.com/scrape/bg.png', 'https://wincode-game.oss-cn-shanghai.aliyuncs.com/scrape/ticket.png'],
      ticket: ['https://wincode-game.oss-cn-shanghai.aliyuncs.com/scrape/prize-bg.jpg','https://wincode-game.oss-cn-shanghai.aliyuncs.com/scrape/shave-layer1.jpg']
    }
  },
  mounted() {
    this.init()
    document.body.addEventListener('touchmove', function (e) {
      e.preventDefault(); //阻止默认的处理方式(阻止下拉滑动的效果)
    }, {passive: false}); //passive 参数不能省略，用来兼容ios和android
  },
  methods: {
    drawTicket() {
      let canvas = document.getElementById('ticket')
      let ctx = canvas.getContext('2d')
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      canvas.addEventListener('touchstart', eventDown);
      canvas.addEventListener('touchmove', eventMove);
      canvas.addEventListener('touchend', eventUp);
      let img = new Image(),
      model = new Image(),
      img1 = new Image()
      model.src = this.fileslist[0]
      model.src = this.fileslist[1]
      img.src = this.ticket[0]
      img1.src = this.ticket[1]
      // 加载img1
      let pm = new Promise((res)=>{
        img.onload = ()=>{
          // 
          res();
        }
      });
      // 加载img1
      let pm1 = new Promise((res)=>{
        img1.onload = ()=>{
          res();
        }
      });
      let dpr =  img.width / 750
      Promise.all([pm, pm1]).then(()=>{
        ctx.drawImage(img, (window.innerWidth - window.innerWidth * dpr) / 2 , 400, img.width * dpr - 40, img.height * dpr);
        ctx.drawImage(img1, (window.innerWidth - window.innerWidth * dpr) / 2 , 400, img1.width * dpr - 40, img1.height * dpr);
      });
      function eventDown(e) {
        e.preventDefault()
        console.log('开始', e)
      }
      function eventMove(e) {
        // let ctx = that.ctx;
        e.preventDefault();
        ctx.globalCompositeOperation = 'destination-out'
        // if (this.mousedown) {
        //     if (e.changedTouches) {
        //         e = e.changedTouches[0];
        //     }
        // var touch = e.targetTouches[0].pageX

        // var y = touch.pageY;
        var x = e.targetTouches[0].pageX,
            y = e.targetTouches[0].pageY
        console.log(e, '移动事件', x, y)

        ctx.beginPath();
        ctx.arc(x, y, 20, 0, Math.PI * 2);
        ctx.fill();
        // }
      }
      function eventUp() {
        console.log('抬起事件')
      }
      // drawAllImg1()
    },
    init() {
      let _widht = window.innerWidth
      let _height = window.innerHeight
      var scrapAward = new ScrapAward({
        canvasId: 'ticket',
        width: _widht,
        height: _height,
        backgroundImageUrl: 'https://wincode-game.oss-cn-shanghai.aliyuncs.com/scrape/prize-bg.jpg',
        coverImage: {
            url: 'https://wincode-game.oss-cn-shanghai.aliyuncs.com/scrape/shave-layer1.jpg',
            width: 352,
            height: 150,
        },
        callback: () => {
            alert('刮奖结束');
            setTimeout(() => {
              scrapAward.restart()
            }, 2000)
            
        }
      })
      // scrapAward().init()
    }
  }
}
</script>
<style lang="stylus" scoped>
.main
  width 100vw
  height 100vh
  background url('https://wincode-game.oss-cn-shanghai.aliyuncs.com/scrape/bg1.jpg')
  background-size 100% auto
  overflow hidden
  box-sizing border-box
  position relative
  z-index 1
  .back
    position relative
    width 100vw
    z-index 2
    top 0
    img 
      width 100%
      height auto
    .ticket-bg 
      width 342px
      box-sizing border-box
      position absolute
      bottom -50px
      left 50%
      transform translateX(-50%)
      img 
        width 100%
        height auto
  #tutorial 
    position relative
    z-index 1
  #ticket 
    position absolute
    top 395px
    left 28px
    z-index 999
</style>