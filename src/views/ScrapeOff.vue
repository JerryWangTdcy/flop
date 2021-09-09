<template>
  <div class="main">
    <!-- <canvas id="tutorial"></canvas> -->
    <canvas id="ticket"></canvas>
    <!-- <img :src="url" alt=""> -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      fileslist: [require('../assets/images/scrapeoff/bg.png'), require('../assets/images/scrapeoff/bg1.jpg'), require('../assets/images/scrapeoff/bg2.png'), require('../assets/images/scrapeoff/ticket.png')],
      // fileslist: ['https://teming.oss-cn-shanghai.aliyuncs.com/web/daochujihuozhuangtai.png', 'https://teming.oss-cn-shanghai.aliyuncs.com/web/daochujihuozhuangtai.png', 'https://teming.oss-cn-shanghai.aliyuncs.com/web/daochujihuozhuangtai.png', 'https://teming.oss-cn-shanghai.aliyuncs.com/web/daochujihuozhuangtai.png'],
      ticket: [require('../assets/images/scrapeoff/prize-bg.jpg'),require('../assets/images/scrapeoff/shave-layer.jpg')]
    }
  },
  mounted() {
    this.drawTicket()
    document.body.addEventListener('touchmove', function (e) {
      e.preventDefault(); //阻止默认的处理方式(阻止下拉滑动的效果)
    }, {passive: false}); //passive 参数不能省略，用来兼容ios和android
  },
  methods: {
    drawBg() {
      let img1 = new Image(),
      img2 = new Image(),
      img3 = new Image(),
      img4 = new Image()
      img1.src = this.fileslist[0]
      img2.src = this.fileslist[1]
      img3.src = this.fileslist[2]
      img4.src = this.fileslist[3]

      // 加载img1
      let pm1 = new Promise((res)=>{
        img1.onload = ()=>{
          res();
        }
      });
      // 加载img2
      let pm2 = new Promise((res)=>{
        img2.onload = ()=>{
          res();
        }
      });
      // 加载img3
      let pm3 = new Promise((res)=>{
        img3.onload = ()=>{
          res();
        }
      });
      // 加载img4
      let pm4 = new Promise((res)=>{
        img4.onload = ()=>{
          res();
        }
      });
      let dpr1 =  window.innerWidth / img1.width
      let dpr2 =  window.innerWidth / img2.width
      let dpr3 =  window.innerWidth / img3.width
      let dpr4 =  img4.width / 750
      // 两张图片都加载完成后绘制于Canva中
      Promise.all([pm1, pm2, pm3, pm4]).then(()=>{
        let canvas = document.getElementById('tutorial')
        let ctx = canvas.getContext('2d')
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
        ctx.drawImage(img2, 0, 0, img2.width * dpr2, img2.height * dpr2);
        ctx.drawImage(img3, 0, 0, img3.width * dpr3, img3.height * dpr3);
        ctx.drawImage(img1, 0, 0, img1.width * dpr1, img1.height * dpr1);
        ctx.drawImage(img4, (window.innerWidth - window.innerWidth * dpr4) / 2 , img1.height * dpr1 - (img4.height * window.innerWidth / img4.width / 2), window.innerWidth * dpr4, img4.height * window.innerWidth / img4.width);
      });
      this.drawTicket()
      // drawAllImg()
    },
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
      model.src = this.fileslist[3]
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
    }
  }
}
</script>
<style lang="stylus" scoped>
.main
  height 100vh
  position relative
  #tutorial 
    position relative
    z-index 1
  #ticket 
    position absolute
    top 0
    left 0
    z-index 999
</style>