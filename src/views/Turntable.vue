<template>
  <div id="turntable">
    <div class="title">
      <img src="../assets/images/turntable/title.png" alt="">
    </div>
    <div class="main">
      <img class="start" @click="handleStart" src="../assets/images/turntable/pointer.png" alt="">
      <div id="turnUl">
        <div class="turntabl-wrapper">
          <img class="turntable-bg" src="../assets/images/turntable/turntable-bg.png" alt="">
          <img class="turntable" src="../assets/images/turntable/turntable.png" alt="">
        </div>
        <div class="prize-list">
          <div class="prize">
            <div class="info">
              <img src="../assets/images/turntable/prize-1.png" alt="">
            </div>
          </div>
          <div class="prize">
            <div class="info">
              <img src="../assets/images/turntable/prize-2.png" alt="">
            </div>
          </div>
          <div class="prize">
            <div class="info">
              <img src="../assets/images/turntable/prize-3.png" alt="">
            </div>
          </div>
          <div class="prize">
            <div class="info">
              <img src="../assets/images/turntable/prize-4.png" alt="">
            </div>
          </div>
          <div class="prize">
            <div class="info">
              <img src="../assets/images/turntable/prize-5.png" alt="">
            </div>
          </div>
          <div class="prize">
            <div class="info">
              <img src="../assets/images/turntable/prize-6.png" alt="">
            </div>
          </div>
        </div>
        <div class="prize-wrapper">
          <div class="prize"></div>
          <div class="prize"></div>
          <div class="prize"></div>
          <div class="prize"></div>
          <div class="prize"></div>
          <div class="prize"></div>
        </div>
      </div>
     
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      rotNum:  0, // 旋转圈数基数
      time: 5000, // 旋转时间
      timer: null,
      oTurntable: null
    }
  },
  mounted() {
    this.oTurntable = document.querySelector('#turnUl');
    this.oTurntable.style.webkitTransition = 'transform ' + this.time / 1000 + 's ease';
    this.init()
  },
  methods: {
    init() {
      
    },
    handleStart() {
      this.startrotate(60, () => {
        alert('六等奖')
      })
    },
    startrotate(angle, complete) {
      // 相应的角度 + 满圈 只是在原角度多转了几圈 360 * 6
      let rotate = 2160 * (this.rotNum + 1) + angle
      console.log(rotate, 'rotate')
      this.oTurntable.style.webkitTransform = 'rotate(' + rotate + 'deg)';
      clearTimeout(this.timer);
      // 设置5秒后停止旋转,处理接口返回的数据
      this.timer = setTimeout(() => {
        complete();
        this.rotNum++;
      }, this.time);
    },
  }
}
</script>
<style lang="stylus" scoped>
#turntable 
  width 100vw
  height 100vh
  background url('../assets/images/turntable/bg.png')
  background-size 100% auto
  overflow hidden
  box-sizing border-box
  position relative
  z-index 1
  .title
    width 375px
    img 
      width 100%
  .main
    position relative
    overflow hidden
    // width 355px
    height 355px
    border-radius 50%
    #turnUl
      // width 355px
      height 355px
      position absolute
      top 0
      left 0
      border-radius 50%
    .start
      width 140px
      position absolute
      top 35%
      left 50%
      transform translate(-50%, -35%)
      z-index 20
    .turntabl-wrapper
      width 355px
      height 355px
      padding 0 10px
      .turntable-bg
        width 355px
        position absolute
        top 0
        left 50%
        transform translateX(-50%)
        z-index 2
      .turntable
        width 313px
        position absolute
        top 50%
        left 50%
        transform translate(-50%, -50%)
        z-index 3
    .prize-list 
      width 313px
      height 313px
      position absolute
      top 50%
      left 50%
      transform translate(-50%, -50%)
      z-index 5
      font-size 14px
      user-select: none;
      display: flex;
      justify-content: center;
      align-items: center;
      .prize
        width 156px
        height 156px
        left 0
        top 0
        position absolute
        display flex
        align-items center
        // background yellow
        justify-content center
        transform-origin right bottom
        z-index 5
        for $i in 1..6
          &:nth-child({$i})
            transform rotate($i * 60deg) skew(30deg)
            .info
              transform skew(-30deg) rotate(-60deg)
              width 80px
              height 80px
              position absolute
              left 35%
              top 35%
              // transform translateY(-50%)
              img
                width 80px
                height 80px
    .prize-wrapper
      width 313px
      height 313px
      position absolute
      top 50%
      left 50%
      transform translate(-50%, -50%)
      z-index 4
      font-size 14px
      user-select: none;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius 50%
      overflow hidden
      .prize
        width 156px
        height 156px
        left 0
        top 0
        // background blue
        position absolute
        border-right 1px solid
        border-image url(../assets/images/turntable/border.png) 1 stretch
        transform-origin right bottom
        z-index 6
        for $i in 1..6
          &:nth-child({$i})
            transform rotate($i * 60deg) skew(30deg)
      img
        width 100%
</style>
