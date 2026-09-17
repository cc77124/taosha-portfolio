import { useLayoutEffect, useRef } from 'react'

type Props = {
  src: string
  poster?: string
}

const SEEK_INTERVAL = 1000 / 27 // seek 节流：约 27 FPS（24~30 区间）
const MIN_DELTA = 1 / 60 // 与目标时间差小于 1 帧时不必 seek

export default function ScrubVideo({ src, poster }: Props) {
  const rootRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  useLayoutEffect(() => {
    const root = rootRef.current
    const video = videoRef.current
    if (!root || !video) return

    let rafId = 0
    let active = false // 首屏是否处于视口内
    let scrubbing = false // 交互进行中（驱动 rAF 循环）
    let dragging = false // 指针按下拖拽中（触屏/鼠标拖动）
    let duration = 0
    let targetTime = 0
    let lastSeekAt = 0

    const cancelLoop = () => {
      if (rafId) {
        cancelAnimationFrame(rafId)
        rafId = 0
      }
    }

    const loop = () => {
      const now = performance.now()
      const throttled = now - lastSeekAt >= SEEK_INTERVAL
      const stale = Math.abs(video.currentTime - targetTime) >= MIN_DELTA
      if (!video.seeking && throttled && stale) {
        try {
          video.currentTime = targetTime
        } catch {
          // metadata 被重置等极端情况，忽略本次 seek
        }
        lastSeekAt = now
      }
      rafId = scrubbing ? requestAnimationFrame(loop) : 0
    }

    const startScrub = () => {
      if (!scrubbing) {
        scrubbing = true
        if (!rafId) rafId = requestAnimationFrame(loop)
      }
    }

    const stopScrub = () => {
      scrubbing = false
      dragging = false
      cancelLoop()
    }

    const updateTarget = (clientX: number) => {
      if (!active || duration <= 0) return
      const rect = root.getBoundingClientRect()
      if (rect.width <= 0) return
      const progress = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width))
      targetTime = progress * duration
      startScrub()
    }

    const onLoadedMetadata = () => {
      const d = video.duration
      duration = Number.isFinite(d) && d > 0 ? d : 0
      if (duration > 0) {
        try {
          // 从 0.02s 起播：既显示首帧，又避开部分浏览器 0s 处的黑帧
          video.currentTime = 0.02
        } catch {
          // ignore
        }
      }
    }

    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType === 'mouse' && e.button !== 0) return
      dragging = true
      try {
        root.setPointerCapture(e.pointerId)
      } catch {
        // pointerId 已失效等异常，不影响核心流程
      }
      updateTarget(e.clientX)
    }

    const onPointerMove = (e: PointerEvent) => {
      // 鼠标悬停即可滑动；触屏仅按住拖动时才派发 pointermove
      updateTarget(e.clientX)
    }

    const onPointerUp = (e: PointerEvent) => {
      if (!dragging) return
      dragging = false
      try {
        if (root.hasPointerCapture(e.pointerId)) root.releasePointerCapture(e.pointerId)
      } catch {
        // ignore
      }
      // 鼠标抬起后仍可悬停继续 scrub；触屏抬起即停止
      if (e.pointerType !== 'mouse') stopScrub()
    }

    const onPointerCancel = (e: PointerEvent) => {
      if (!dragging && !scrubbing) return
      try {
        if (root.hasPointerCapture(e.pointerId)) root.releasePointerCapture(e.pointerId)
      } catch {
        // ignore
      }
      stopScrub()
    }

    const onPointerLeave = (e: PointerEvent) => {
      // 拖拽期间持有指针捕获，移出边界不中断；仅悬停移出时停止
      if (dragging) return
      if (e.pointerType === 'mouse') stopScrub()
    }

    root.addEventListener('pointerdown', onPointerDown)
    root.addEventListener('pointermove', onPointerMove)
    root.addEventListener('pointerup', onPointerUp)
    root.addEventListener('pointercancel', onPointerCancel)
    root.addEventListener('pointerleave', onPointerLeave)
    video.addEventListener('loadedmetadata', onLoadedMetadata)

    // 仅当首屏在视口内响应交互，离开后立即停止
    const io = new IntersectionObserver(
      entries => {
        const entry = entries[0]
        active = !!entry?.isIntersecting
        if (!active) stopScrub()
      },
      { threshold: 0 },
    )
    io.observe(root)

    return () => {
      root.removeEventListener('pointerdown', onPointerDown)
      root.removeEventListener('pointermove', onPointerMove)
      root.removeEventListener('pointerup', onPointerUp)
      root.removeEventListener('pointercancel', onPointerCancel)
      root.removeEventListener('pointerleave', onPointerLeave)
      video.removeEventListener('loadedmetadata', onLoadedMetadata)
      io.disconnect()
      cancelLoop()
    }
  }, [])

  return (
    <div className="hero-video" ref={rootRef}>
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        muted
        playsInline
        preload="auto"
        disablePictureInPicture
        disableRemotePlayback
        aria-hidden="true"
        tabIndex={-1}
      />
    </div>
  )
}
