import L from "leaflet";
export const CustomCanvas = L.Canvas.extend({
    /**
     * 重写 绘制圆形 方法
     */
    _updateCircle(layer) {
      // 源码部分 start
      if (!this._drawing || layer._empty()) { return }
  
      const p = layer._point
      const ctx = this._ctx
      const r = Math.max(Math.round(layer._radius), 1)
      const s = (Math.max(Math.round(layer._radiusY), 1) || r) / r
  
      if (s !== 1) {
        ctx.save()
        ctx.scale(1, s)
      }
  
      ctx.beginPath()
      ctx.arc(p.x, p.y / s, r, 0, Math.PI * 2, false)
  
      if (s !== 1) {
        ctx.restore()
      }
  
      this._fillStroke(ctx, layer)
      // 源码部分 end
  
      // 增加渐变颜色圆配置
      const { fillGradient } = layer.options
      if (fillGradient) {
        const g = ctx.createLinearGradient(
          p.x + fillGradient.position[0],
          p.y / s + fillGradient.position[1],
          p.x + fillGradient.position[2],
          p.y / s + fillGradient.position[3]
        )
        fillGradient.colorStops.forEach((agrs) => {
          g.addColorStop(...agrs)
        })
        ctx.fillStyle = g
        ctx.fill()
      }
    }
})
  
export function DroneMarkerCanvas(options) {
    return new CustomCanvas(options)
}
