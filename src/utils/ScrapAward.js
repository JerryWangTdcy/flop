class ScrapAward {
  constructor(options) {
    this.option = {
      canvasId: options.canvasId,
      backgroundImageUrl: '',
      width: 320, // canvas宽度
      height: 160, // canvas高度
      // backgroundSize: width height,
      coverImage: { // 覆盖图层背景图url
          url: '',
          width: 320,
          height: 160,
      },
      x: 0,
      y: 0,
      callback: () => {}, // 刮奖完成的回调函数
    }
    this.ctx = null;
    this.init(options); // 初始化
  }
  // 初始化方法
  init(options) {
    // 合并配置项
    console.log(this.option)
    Object.assign(this.option, options)
    // 定义一系列变量
    let that = this,
    img = (this.img = new Image()), // 背景图片
    imgLoaded = false, // 背景图是否加载完成
    canvas = (this.canvas = document.querySelector(`#${this.option.canvasId}`)),
    hastouch = 'ontouchstart' in window ? true : false,
    tapstart = hastouch ? 'touchstart' : 'mousedown',
    tapmove = hastouch ? 'touchmove' : 'mousemove',
    tapend = hastouch ? 'touchend' : 'mouseup',
    coverImg = (this.coverImg = new Image()),
    hasDone = false, // 是否刮奖完毕
    coverImgLoad = false
    that.mousedown = false // 鼠标的mousedown事件或者touchmove事件是否开启
    // 移除事件监听，用于重新开始
    if (this.canvas) {
      this.canvas.removeEventListener(tapstart, eventDown)
      this.canvas.removeEventListener(tapend, eventUp)
      this.canvas.removeEventListener(tapmove, eventMove)
    }
    coverImg.src = this.option.coverImage.url
    coverImg.crossOrigin = 'Anonymous'; // 解决一些跨域问题
    img.src = this.option.backgroundImageUrl
    var w = (img.width = this.option.coverImage.width),
        h = (img.height = this.option.coverImage.height)
    this.canvasOffsetX = canvas.offsetLeft
    this.canvasOffsetY = canvas.offsetTop
    canvas.width = w
    canvas.height = h
    this.ctx = canvas.getContext('2d')
    let ctx = this.ctx
    this.img.addEventListener('load', backgroundImageLoaded)
    this.option.coverImage.url && this.coverImg.addEventListener('load', coverImageLoaded)
    // 背景图片加载完成后
    function backgroundImageLoaded() {
      imgLoaded = true
      fillCanvas().then(() => {
        // renderPrize(ctx, '一等奖', '40px Calibri', '#000', 0)
      })
      canvas.style.background = 'url(' + img.src + ') no-repeat'
      canvas.style.backgroundSize = that.option.backgroundSize || 'contain'
    }
    /**
     * 渲染奖品文字
     * @param {*} _paint context对象
     * @param {*} _text 要写的字
     * @param {*} _fontSzie 字体
     * @param {*} _color 颜色
     * @param {*} _height 绘制的高度
     */
    // function renderPrize(_paint, _text, _fontSzie, _color, _height) {
    //   _paint.font = _fontSzie;
    //   _paint.fillStyle = _color;
    //   _paint.textAlign = "center";
    //   _paint.textBaseline = "middle";
    //   _paint.fillText(_text, canvas.width / 2, h / 2 - _height / 2 );
    //   // _paint.fillText(_text, canvas.width / 2, _height );
    // }
    // 覆蓋图片加载完成后
    function coverImageLoaded() {
      coverImgLoad = true
      canvas.style.background = 'url(' + img.src + ') no-repeat'
      canvas.style.backgroundSize = that.option.backgroundSize || 'contain'
      // renderPrize(ctx, '一等奖', '40px Calibri', '#000', 0)
      fillCanvas()
    }

    // 绘制canvas
    function fillCanvas() {
      return new Promise(resolve => {
        if (that.option.coverImage.url && (!imgLoaded || !coverImgLoad)) return
        if (!that.option.coverImage.url) {
          ctx.fillStyle = that.option.coverImage.color || 'gray'
          ctx.fillRect(0, 0, w, h)
        } else {
          ctx.drawImage(coverImg, 0, 0, that.option.coverImage.width, that.option.coverImage.height)
        }
        ctx.globalCompositeOperation = 'destination-out'
        canvas.addEventListener(tapstart, eventDown)
        canvas.addEventListener(tapend, eventUp)
        canvas.addEventListener(tapmove, eventMove)
        resolve()
      })
    }
    // 点击开始事件
    function eventDown(e) {
      e.preventDefault()
      that.mousedown = true
    }
    // 点击结束事件
    function eventUp(e) {
      e.preventDefault()
      that.mousedown = false
    }
    // 刮奖事件
    function eventMove(e) {
      if (hasDone) return // 刮奖结束则return
      let ctx = that.ctx
      e.preventDefault()
      if (that.mousedown) {
        if (e.changedTouches) {
            e = e.changedTouches[0]
        }
        var x = (e.clientX + document.body.scrollLeft || e.pageX) - that.canvasOffsetX || 0,
            y = (e.clientY + document.body.scrollTop || e.pageY) - that.canvasOffsetY || 0;

        ctx.beginPath()
        ctx.arc(x, y, 20, 0, Math.PI * 2)
        ctx.fill()
      }
      handleFilledPercentage(getFilledPercentage())
    }
    // 计算已经刮过的区域占整个区域的百分比
    function getFilledPercentage() {
      let imgData = that.ctx.getImageData(0, 0, w, h);
      // imgData.data是个数组，存储着指定区域每个像素点的信息，数组中4个元素表示一个像素点的rgba值
      let pixels = imgData.data;
      let transPixels = [];
      for (let i = 0; i < pixels.length; i += 4) {
          // 严格上来说，判断像素点是否透明需要判断该像素点的a值是否等于0，
          // 为了提高计算效率，这儿设置当a值小于128，也就是半透明状态时就可以了
          if (pixels[i + 3] < 128) {
              transPixels.push(pixels[i + 3]);
          }
      }
      return ((transPixels.length / (pixels.length / 4)) * 100).toFixed(2) + '%';
    }
    // 设置阈值，去除灰色涂层
    function handleFilledPercentage(percentage) {
      percentage = percentage || 0
      if (parseInt(percentage) > 50) {
          // 当像素点的个数超过  50% 时，清空画布，显示底图
          ctx.clearRect(0, 0, w, h);
          hasDone = true;
          that.option.callback();
      }
    }
  }
  // 重新开始也是一次初始化
  restart(options) {
    if (options) {
      this.init(options)
    } else {
      this.init({})
    }
  }
}
export default ScrapAward