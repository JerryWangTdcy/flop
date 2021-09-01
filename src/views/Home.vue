<template>
  <div class="home">
    <ul class="flop">
      <li v-for="item in list" :key="item.id" :class="['flip-container', item.checked ? 'rotate' : '', 'flipper', ids.indexOf(item.id) > -1 ? 'flip' : '', item.disabled ? 'disabled' : '']" @click="handleClick(item)">
        <div class="front"><img src="../assets/images/card.png" /></div>
        <div class="back"><img :src="'/assets/images/' + item.url + '.png' "/></div>
      </li>
    </ul>
    <van-popup v-model="show" overlay-class="pop-up" get-container="body" :close-on-click-overlay="false">
      <div class="pop-main">
        <div class="title">
          <img src="../assets/images/pop-title.png" alt="">
        </div>
        <div class="pop-info">
          您的成绩为: 6分
        </div>
        <div class="game-btns">
          <van-button round type="info" color="linear-gradient(to right, #ff6034, #ee0a24)" @click="handleAgain">再玩一次</van-button>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>

export default {
  name: 'Home',
  data() {
    return {
      files: ['cloud', 'cake', 'flower', 'grass', 'sun', 'tree'],
      list: [],
      ids: [],
      code: '',
      show: false
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    // 随机生成卡片组
    init() {
      let array = []
      for ( let i = 0; i < 6; i++) {
        rang()
      }
      function rang() {
        var rand = parseInt(Math.random() * 6)
        for(var i = 0 ; i < array.length; i++) {
          if(array[i] == rand) {
            rang()
            return false
          }
        } 
        array.push(rand)
      }
      array = array.concat(array)
      console.log(array, 'array')
      // function getCode() {
      //   var rand = parseInt(Math.random() * (array.length - 1))
      //   let val = array[rand]
      //   array.slice(rand, rand+1)
      //   return val
      // }
      let files = this.files.concat(this.files)
      this.list = files.map((item, index) => {
        return {
          code: array[index],
          id: index,
          disabled: false,
          url: item,
          checked: false
        }
      })
      function randomsort() {
        return Math.random()>.5 ? -1 : 1;
        //用Math.random()函数生成0~1之间的随机数与0.5比较，返回-1或1
      }
      this.list.sort(randomsort)
      console.log(this.list, '卡片列表')
    },
    // 点击卡片
    handleClick(item) {
      if (this.ids.indexOf(item.id) > -1) return false
      if (this.ids.length < 2) {
        this.ids.push(item.id)
        if (this.code === item.code) {
          setTimeout(() => {
            this.list.forEach(ele => {
              if (ele.code === item.code) {
                ele.checked = true
              }
            })
            this.ids = []
            this.code = ''
            let len = this.list.filter(ele => !ele.checked).length
            console.log(len)
            if (!len) this.show = true
          }, 350)
        } else {
          this.code = item.code
        }
      } else {
        this.ids = []
        this.ids.push(item.id)
        this.code = item.code
      }
    },
    // 再玩一次
    handleAgain() {
      this.ids = []
      this.code = ''
      this.list = []
      this.init()
      this.show = false
    }
  }
}
</script>
<style lang="stylus" scoped>
.home 
  padding 20px
* {
  margin: 0;
  padding: 0;
}
ul,
li {
  list-style: none;
  margin: 0;
  padding: 0;
}
.flop 
  display grid
  grid: auto-flow / 1fr 1fr 1fr
  gap 10px
  position fixed
  top 40%
  left 50%
  transform translate(-50%, -50%)
  .flip-container 
    width 105px
    height 105px
    img 
      width 100%
      height 100%
.disabled {
  display none
}
  .front,
  .back
    backface-visibility hidden
    transition 0.6s ease-out
    -webkit-transition 0.6s ease-out
    -webkit-transform-style preserve-3d
    -moz-transform-style preserve-3d
    -ms-transform-style preserve-3d
    -o-transform-style preserve-3d
    transform-style preserve-3d
    position absolute
    top 0
    left 0
  .front 
    z-index 2
    transform rotateY(0deg)
    transform rotateY(0deg)
    -webkit-transform rotateY(0deg)
    -moz-transform rotateY(0deg)
    -ms-transform rotateY(0deg)
    -o-transform rotateY(0deg)
    backface-visibility hidden
  .back
    z-index 1
    transform rotateY(-180deg)
    transform rotateY(-180deg)
    -webkit-transform rotateY(-180deg)
    -moz-transform rotateY(-180deg)
    -ms-transform rotateY(-180deg)
    -o-transform rotateY(-180deg)
    backface-visibility hidden
  .flip-container 
    perspective 1000
    -webkit-perspective 1000px /*父类容器中  perspective  子类允许透视*/
    -moz-perspective 1000px
    -ms-perspective 1000px
    -o-perspective 1000px
    perspective 1000px
    margin 0px auto
  .flipper
    transition transform 0.6s ease-out
    transition transform 0.5s ease-in-out
    -webkit-transition transform 0.5s ease-in-out
    -moz-transition transform 0.5s ease-in-out
    -ms-transition transform 0.5s ease-in-out
    -o-transition transform 0.5s ease-in-out
    -webkit-transform-style preserve-3d /*使其子类变换后得以保留 3d转换后的位置*/
    -moz-transform-style preserve-3d
    -ms-transform-style preserve-3d
    -o-transform-style preserve-3d
    transform-style preserve-3d
    display block
    position relative
  .flip .back
    transform rotateY(0deg)
    -webkit-transform rotateY(0deg)
    -moz-transform rotateY(0deg)
    -ms-transform rotateY(0deg)
    -o-transform rotateY(0deg)
    z-index 2
    
  .flip .front
    transform rotateY(180deg)
    -webkit-transform rotateY(180deg)
    -moz-transform rotateY(180deg)
    -ms-transform rotateY(180deg)
    -o-transform rotateY(180deg)
    z-index 1

  .rotate 
    // transition all 0.3s linear 0.3s
    // transform scale(0.5) rotate(405deg)
    // -webkit-transform scale(0.5) rotate(405deg)
    // -moz-transform scale(0.5) rotate(405deg)
    // -ms-transform scale(0.5) rotate(405deg)
    // -o-transform scale(0.5) rotate(405deg)
    backface-visibility hidden
    animation disappear .4s ease-in-out
    animation-fill-mode forwards
@keyframes disappear
  0%
    transform scale(1) rotate(0)
    opacity 1
  75%
    transform scale(0.5) rotate(405deg)
    opacity .65
  100%
    transform scale(0.5) rotate(405deg)
    opacity 0
.van-popup
  background: transparent
  overflow-y initial
.pop-main
  width 315px
  height 340px
  background-color #0090ff
  border-radius 12px
  position relative
  padding-top 35px
  box-sizing border-box
  .title 
    width 195px
    height 85px
    top -52px
    left 50%
    transform translateX(-50%)
    position absolute
    z-index 10
    img 
      width 100%
      height 100%
  .pop-info
    margin 55px auto 150px
    font-size 14px
    text-align center
    color #fff
  .game-btns
    margin-top 90px
    text-align center
    padding 0 60px
    .van-button 
      width 100%
// .flip-container:hover .back {
//   transform: rotateY(0deg);
//   -webkit-transform: rotateY(0deg);
//   -moz-transform: rotateY(0deg);
//   -ms-transform: rotateY(0deg);
//   -o-transform: rotateY(0deg);
//   z-index: 2;
// }
// .flip-container:hover .front {
//   transform: rotateY(180deg);
//   -webkit-transform: rotateY(180deg);
//   -moz-transform: rotateY(180deg);
//   -ms-transform: rotateY(180deg);
//   -o-transform: rotateY(180deg);
//   z-index: 1;
// }
// // .flip-container,
// // .front,
// // .back {
// //   width: 283px;
// //   height: 283px;
// // }


</style>

