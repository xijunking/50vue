<script setup lang="ts">
import { onMounted, onUnmounted, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { 
  ArrowLeft, 
  RefreshRight, 
  VideoPause, 
  VideoPlay, 
  CaretTop, 
  CaretBottom, 
  CaretLeft, 
  CaretRight, 
  Download 
} from '@element-plus/icons-vue'
import FluidBackground from '@/components/FluidBackground.vue'
import { useTetris, type TetrominoType } from '@/composables/games/useTetris'

const router = useRouter()

const {
  displayBoard,
  score,
  level,
  lines,
  isGameOver,
  isPaused,
  nextPieceType,
  ghostPiecePos,
  currentPiece,
  startGame,
  pauseGame,
  moveLeft,
  moveRight,
  moveDown,
  rotate,
  hardDrop,
  stopGame
} = useTetris()

const intervalId = ref<number | null>(null)

const startRepeat = (action: () => void) => {
  action()
  // 首次延迟稍微长一点，避免误触连续移动
  setTimeout(() => {
    if (intervalId.value === null) { // 已经被停止了
        return
    }
    stopRepeat() // 清除可能的旧 interval
    intervalId.value = window.setInterval(action, 100)
  }, 200)
  // 标记开始，用一个临时的 timer id 占位，防止 setTimeout 还没执行就被 stopRepeat 清理逻辑忽略
  intervalId.value = -1 
}

const stopRepeat = () => {
  if (intervalId.value !== null) {
    clearInterval(intervalId.value)
    intervalId.value = null
  }
}

// 键盘事件处理
const handleKeydown = (e: KeyboardEvent) => {
  if (isGameOver.value) return

  switch (e.code) {
    case 'ArrowLeft':
      moveLeft()
      break
    case 'ArrowRight':
      moveRight()
      break
    case 'ArrowDown':
      moveDown()
      break
    case 'ArrowUp':
      rotate()
      break
    case 'Space':
      hardDrop()
      break
    case 'KeyP':
      pauseGame()
      break
  }
}

// 颜色映射
const typeColors: Record<TetrominoType, string> = {
  I: '#06b6d4', // Cyan
  O: '#fbbf24', // Yellow
  T: '#a855f7', // Purple
  S: '#22c55e', // Green
  Z: '#ef4444', // Red
  J: '#3b82f6', // Blue
  L: '#f97316'  // Orange
}

// 获取格子样式
const getCellClass = (type: TetrominoType | null, rowIndex: number, colIndex: number) => {
  const classes = ['cell']
  if (type) {
    classes.push(`type-${type}`)
  }
  
  // 检查是否是 ghost piece
  if (!type && currentPiece.value && ghostPiecePos.value) {
    const { shape } = currentPiece.value
    const ghostX = ghostPiecePos.value.x
    const ghostY = ghostPiecePos.value.y
    
    // 检查当前坐标是否在 ghost shape 内
    const relativeY = rowIndex - ghostY
    const relativeX = colIndex - ghostX
    
    if (
      relativeY >= 0 && relativeY < shape.length &&
      relativeX >= 0 && relativeX < shape[0].length &&
      shape[relativeY][relativeX]
    ) {
      classes.push('ghost')
    }
  }
  
  return classes
}

// 预览块的形状
const getPieceShape = (type: TetrominoType) => {
  const shapes: Record<TetrominoType, number[][]> = {
    I: [[1, 1, 1, 1]],
    J: [[1, 0, 0], [1, 1, 1]],
    L: [[0, 0, 1], [1, 1, 1]],
    O: [[1, 1], [1, 1]],
    S: [[0, 1, 1], [1, 1, 0]],
    T: [[0, 1, 0], [1, 1, 1]],
    Z: [[1, 1, 0], [0, 1, 1]]
  }
  return shapes[type]
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
  startGame()
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
  stopRepeat()
  stopGame() // 清理游戏循环
})
</script>

<template>
  <div class="tetris-page">
    <FluidBackground />
    
    <div class="game-container">
      <!-- 头部/导航 -->
      <header class="header">
        <RouterLink to="/games" class="back-btn">
          <el-icon><ArrowLeft /></el-icon>
          <span>退出</span>
        </RouterLink>
        <h1 class="game-title">NEON <span class="highlight">TETRIS</span></h1>
      </header>

      <div class="game-layout">
        <!-- 左侧信息栏 (桌面端) -->
        <div class="side-panel left-panel">
          <div class="stat-box">
            <span class="label">SCORE</span>
            <span class="value">{{ score }}</span>
          </div>
          <div class="stat-box">
            <span class="label">LEVEL</span>
            <span class="value">{{ level }}</span>
          </div>
          <div class="stat-box">
            <span class="label">LINES</span>
            <span class="value">{{ lines }}</span>
          </div>
        </div>

        <!-- 游戏主区域 -->
        <div class="board-container">
          <div class="game-board">
            <div 
              v-for="(row, rowIndex) in displayBoard" 
              :key="rowIndex" 
              class="row"
            >
              <div 
                v-for="(cell, colIndex) in row" 
                :key="colIndex"
                :class="getCellClass(cell, rowIndex, colIndex)"
              ></div>
            </div>
            
            <!-- 游戏结束遮罩 -->
            <div v-if="isGameOver" class="overlay game-over">
              <h2>GAME OVER</h2>
              <p>Final Score: {{ score }}</p>
              <button class="retry-btn" @click="startGame">
                <el-icon><RefreshRight /></el-icon> TRY AGAIN
              </button>
            </div>

            <!-- 暂停遮罩 -->
            <div v-if="isPaused && !isGameOver" class="overlay paused">
              <h2>PAUSED</h2>
              <button class="resume-btn" @click="pauseGame">
                <el-icon><VideoPlay /></el-icon> RESUME
              </button>
            </div>
          </div>
        </div>

        <!-- 右侧信息栏 -->
        <div class="side-panel right-panel">
          <div class="next-piece-box">
            <span class="label">NEXT</span>
            <div class="piece-preview">
              <div 
                v-for="(row, rIdx) in getPieceShape(nextPieceType)" 
                :key="rIdx" 
                class="preview-row"
              >
                <div 
                  v-for="(cell, cIdx) in row" 
                  :key="cIdx" 
                  class="preview-cell"
                  :class="{ filled: cell }"
                  :style="{ backgroundColor: cell ? typeColors[nextPieceType] : 'transparent' }"
                ></div>
              </div>
            </div>
          </div>

          <div class="controls-hint">
            <div class="key-row"><kbd>↑</kbd> Rotate</div>
            <div class="key-row"><kbd>←</kbd><kbd>↓</kbd><kbd>→</kbd> Move</div>
            <div class="key-row"><kbd>Space</kbd> Drop</div>
            <div class="key-row"><kbd>P</kbd> Pause</div>
          </div>
          
          <button class="mobile-pause-btn" @click="pauseGame">
            <el-icon v-if="isPaused"><VideoPlay /></el-icon>
            <el-icon v-else><VideoPause /></el-icon>
            {{ isPaused ? 'RESUME' : 'PAUSE' }}
          </button>
        </div>
      </div>

      <!-- 移动端控制区 -->
      <div class="mobile-controls">
        <div class="d-pad">
          <button 
            class="control-btn up" 
            @touchstart.prevent="rotate" 
            @mousedown.prevent="rotate"
          >
            <el-icon><CaretTop /></el-icon>
          </button>
          <button 
            class="control-btn left" 
            @touchstart.prevent="startRepeat(moveLeft)" 
            @touchend.prevent="stopRepeat" 
            @mousedown.prevent="startRepeat(moveLeft)" 
            @mouseup.prevent="stopRepeat" 
            @mouseleave.prevent="stopRepeat"
          >
            <el-icon><CaretLeft /></el-icon>
          </button>
          <button 
            class="control-btn right" 
            @touchstart.prevent="startRepeat(moveRight)" 
            @touchend.prevent="stopRepeat" 
            @mousedown.prevent="startRepeat(moveRight)" 
            @mouseup.prevent="stopRepeat" 
            @mouseleave.prevent="stopRepeat"
          >
            <el-icon><CaretRight /></el-icon>
          </button>
          <button 
            class="control-btn down" 
            @touchstart.prevent="startRepeat(moveDown)" 
            @touchend.prevent="stopRepeat" 
            @mousedown.prevent="startRepeat(moveDown)" 
            @mouseup.prevent="stopRepeat" 
            @mouseleave.prevent="stopRepeat"
          >
            <el-icon><CaretBottom /></el-icon>
          </button>
        </div>
        <div class="action-buttons">
          <button class="control-btn big-btn drop" @touchstart.prevent="hardDrop" @mousedown.prevent="hardDrop">
            <el-icon><Download /></el-icon>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.tetris-page {
  min-height: 100vh;
  width: 100%;
  background-color: #0f172a;
  color: #fff;
  font-family: 'Inter', sans-serif;
  overflow: hidden;
  touch-action: none; /* 防止移动端滚动 */
}

.game-container {
  position: relative;
  z-index: 10;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
}

.header {
  width: 100%;
  max-width: 600px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.back-btn {
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 0.3s;
  /* 增加点击区域和层级 */
  padding: 10px;
  margin: -10px;
  position: relative;
  z-index: 50; 
  touch-action: auto; /* 恢复触摸交互，防止被父级 none 影响 */
  text-decoration: none;
  color: inherit;
}

.back-btn:hover {
  opacity: 1;
}

.game-title {
  font-size: 1.5rem;
  font-weight: 800;
  margin: 0;
  letter-spacing: 2px;
}

.highlight {
  color: #a855f7;
  text-shadow: 0 0 10px rgba(168, 85, 247, 0.5);
}

.game-layout {
  display: flex;
  gap: 20px;
  align-items: flex-start;
  justify-content: center;
  flex: 1;
}

/* 游戏面板 */
.board-container {
  padding: 10px;
  background: rgba(15, 23, 42, 0.8);
  border: 2px solid #334155;
  border-radius: 8px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
}

.game-board {
  display: grid;
  grid-template-rows: repeat(20, 1fr);
  gap: 1px;
  background: #1e293b;
  position: relative;
  /* 宽高比 10:20 */
  width: 30vh; 
  height: 60vh;
  max-width: 80vw;
  max-height: 160vw;
}

.row {
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: 1px;
}

.cell {
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.05);
  transition: background-color 0.1s;
}

/* 方块颜色样式 */
.cell.type-I { background: #06b6d4; box-shadow: 0 0 8px #06b6d4; border: 1px solid rgba(255,255,255,0.3); }
.cell.type-O { background: #fbbf24; box-shadow: 0 0 8px #fbbf24; border: 1px solid rgba(255,255,255,0.3); }
.cell.type-T { background: #a855f7; box-shadow: 0 0 8px #a855f7; border: 1px solid rgba(255,255,255,0.3); }
.cell.type-S { background: #22c55e; box-shadow: 0 0 8px #22c55e; border: 1px solid rgba(255,255,255,0.3); }
.cell.type-Z { background: #ef4444; box-shadow: 0 0 8px #ef4444; border: 1px solid rgba(255,255,255,0.3); }
.cell.type-J { background: #3b82f6; box-shadow: 0 0 8px #3b82f6; border: 1px solid rgba(255,255,255,0.3); }
.cell.type-L { background: #f97316; box-shadow: 0 0 8px #f97316; border: 1px solid rgba(255,255,255,0.3); }

/* Ghost Piece */
.cell.ghost {
  background: rgba(255, 255, 255, 0.1);
  border: 1px dashed rgba(255, 255, 255, 0.5);
  box-shadow: none;
}

/* 侧边面板 */
.side-panel {
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 120px;
}

.stat-box {
  background: rgba(255, 255, 255, 0.05);
  padding: 10px;
  border-radius: 8px;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.label {
  display: block;
  font-size: 0.8rem;
  color: #94a3b8;
  margin-bottom: 5px;
}

.value {
  font-size: 1.2rem;
  font-weight: 700;
  color: #fff;
}

.next-piece-box {
  background: rgba(255, 255, 255, 0.05);
  padding: 15px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100px;
}

.piece-preview {
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin-top: 10px;
}

.preview-row {
  display: flex;
  gap: 2px;
}

.preview-cell {
  width: 15px;
  height: 15px;
  border-radius: 2px;
}

.preview-cell.filled {
  box-shadow: 0 0 5px currentColor;
}

.controls-hint {
  font-size: 0.8rem;
  color: #64748b;
  margin-top: 20px;
}

.key-row {
  margin-bottom: 8px;
}

kbd {
  background: #334155;
  padding: 2px 6px;
  border-radius: 4px;
  margin-right: 5px;
  font-family: monospace;
}

/* 遮罩层 */
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 20;
}

.overlay h2 {
  font-size: 2rem;
  margin-bottom: 10px;
  color: #fff;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
}

.retry-btn, .resume-btn {
  background: #6366f1;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 20px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 20px;
  transition: all 0.2s;
}

.retry-btn:hover, .resume-btn:hover {
  background: #4f46e5;
  transform: scale(1.05);
}

/* 移动端控制 */
.mobile-controls {
  display: none; /* 默认隐藏 */
  width: 100%;
  max-width: 400px;
  justify-content: space-between;
  align-items: flex-end;
  margin-top: 20px;
  padding: 0 20px;
}

.d-pad {
  position: relative;
  width: 120px;
  height: 120px;
}

.control-btn {
  position: absolute;
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  backdrop-filter: blur(5px);
  -webkit-tap-highlight-color: transparent;
}

.control-btn:active {
  background: rgba(99, 102, 241, 0.5);
  transform: scale(0.95);
}

.control-btn.up { top: 0; left: 40px; }
.control-btn.down { bottom: 0; left: 40px; }
.control-btn.left { top: 40px; left: 0; }
.control-btn.right { top: 40px; right: 0; }

.action-buttons {
  display: flex;
  gap: 20px;
}

.big-btn {
  position: static;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: rgba(168, 85, 247, 0.2);
  border-color: rgba(168, 85, 247, 0.4);
}

.big-btn:active {
  background: rgba(168, 85, 247, 0.6);
}

.mobile-pause-btn {
  display: none;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #fff;
  padding: 5px 10px;
  border-radius: 15px;
  margin-top: 10px;
  width: 100%;
  cursor: pointer;
}

/* 响应式适配 */
@media (max-width: 768px) {
  .tetris-page {
    /* 移动端强制不允许滚动，内容需适配屏幕 */
    position: fixed;
    height: 100%;
    overflow: hidden;
  }

  .game-container {
    padding: 10px;
    height: 100%;
    justify-content: space-between; /* 分散对齐，确保底部控件在底部 */
  }

  .header {
    margin-bottom: 10px;
    flex-shrink: 0; /* 防止被压缩 */
  }

  .game-layout {
    flex-direction: column;
    align-items: center;
    gap: 10px;
    width: 100%;
    flex: 1;
    min-height: 0; /* 允许 flex item 压缩 */
    justify-content: flex-start;
  }

  .left-panel {
    flex-direction: row;
    width: 100%;
    justify-content: center;
    gap: 10px;
    flex-shrink: 0;
  }
  
  .stat-box {
    flex: 1;
    padding: 5px;
    /* 减小字号 */
  }
  
  .stat-box .label { font-size: 0.7rem; }
  .stat-box .value { font-size: 1rem; }

  .right-panel {
    /* 移动端将右侧面板移到顶部与左侧面板合并或紧随其后 */
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    flex-shrink: 0;
    margin-bottom: 5px;
  }
  
  .next-piece-box {
    min-height: auto;
    padding: 5px 10px;
    flex-direction: row;
    gap: 10px;
    flex: 1;
    justify-content: center;
  }
  
  .piece-preview {
    margin-top: 0;
    flex-direction: column;
    transform: scale(0.8); /* 缩小预览 */
  }

  .mobile-pause-btn {
    width: auto;
    margin-top: 0;
    font-size: 0.8rem;
    padding: 5px 10px;
  }

  .controls-hint {
    display: none;
  }
  
  .board-container {
    padding: 5px;
    flex-shrink: 1; /* 允许压缩 */
    display: flex;
    align-items: center;
    justify-content: center;
    /* 确保容器不会超出剩余空间 */
    max-height: 55vh; 
    overflow: hidden;
  }

  .game-board {
    /* 使用 vh 确保在垂直方向上适配，同时限制最大宽度 */
    height: 50vh;
    width: 25vh; /* 保持 1:2 比例 */
    
    /* 兜底：如果屏幕太窄，使用 vw */
    max-width: 70vw;
    max-height: 140vw;
  }

  .mobile-controls {
    display: flex;
    width: 100%;
    max-width: 400px;
    padding: 0 10px 20px 10px; /* 底部留白 */
    flex-shrink: 0;
    margin-top: auto; /* 推到底部 */
  }
  
  .d-pad {
    width: 140px; /* 稍微加大一点触控区 */
    height: 140px;
    transform: scale(0.9); /* 整体缩放适应小屏 */
    transform-origin: bottom left;
  }
  
  .action-buttons {
    transform: scale(0.9);
    transform-origin: bottom right;
  }
}
</style>
