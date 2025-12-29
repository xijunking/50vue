import { ref, computed, onUnmounted } from 'vue'

// 类型定义
export type TetrominoType = 'I' | 'J' | 'L' | 'O' | 'S' | 'T' | 'Z'
export type Cell = { type: TetrominoType | null; active: boolean } // active表示是否是当前正在移动的方块的一部分，但在board状态中通常只存储固定的方块颜色/类型
export type Board = (TetrominoType | null)[][]

interface Position {
  x: number
  y: number
}

interface Tetromino {
  type: TetrominoType
  shape: number[][]
  pos: Position
}

// 方块形状定义
const TETROMINOS: Record<TetrominoType, number[][]> = {
  I: [
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ],
  J: [
    [1, 0, 0],
    [1, 1, 1],
    [0, 0, 0]
  ],
  L: [
    [0, 0, 1],
    [1, 1, 1],
    [0, 0, 0]
  ],
  O: [
    [1, 1],
    [1, 1]
  ],
  S: [
    [0, 1, 1],
    [1, 1, 0],
    [0, 0, 0]
  ],
  T: [
    [0, 1, 0],
    [1, 1, 1],
    [0, 0, 0]
  ],
  Z: [
    [1, 1, 0],
    [0, 1, 1],
    [0, 0, 0]
  ]
}

const ROWS = 20
const COLS = 10
const BASE_SPEED = 1000 // 初始下落速度 1000ms

export function useTetris() {
  const board = ref<Board>(createEmptyBoard())
  const score = ref(0)
  const level = ref(1)
  const lines = ref(0)
  const isGameOver = ref(false)
  const isPaused = ref(false)
  const nextPieceType = ref<TetrominoType>(randomType())
  
  // 当前方块
  const currentPiece = ref<Tetromino | null>(null)
  
  let gameLoop: number | null = null
  let dropInterval = BASE_SPEED

  // 创建空棋盘
  function createEmptyBoard(): Board {
    return Array.from({ length: ROWS }, () => Array(COLS).fill(null))
  }

  // 随机生成方块类型
  function randomType(): TetrominoType {
    const types: TetrominoType[] = ['I', 'J', 'L', 'O', 'S', 'T', 'Z']
    return types[Math.floor(Math.random() * types.length)]
  }

  // 生成新方块
  function spawnPiece() {
    const type = nextPieceType.value
    nextPieceType.value = randomType()
    
    const shape = TETROMINOS[type]
    // 初始位置居中
    const pos = {
      x: Math.floor((COLS - shape[0].length) / 2),
      y: 0
    }

    currentPiece.value = { type, shape, pos }

    // 检查生成即碰撞（游戏结束）
    if (checkCollision(pos, shape)) {
      isGameOver.value = true
      stopGame()
    }
  }

  // 碰撞检测
  function checkCollision(pos: Position, shape: number[][]): boolean {
    for (let y = 0; y < shape.length; y++) {
      for (let x = 0; x < shape[y].length; x++) {
        if (shape[y][x]) {
          const boardX = pos.x + x
          const boardY = pos.y + y

          // 边界检查
          if (boardX < 0 || boardX >= COLS || boardY >= ROWS) {
            return true
          }
          
          // 已有方块检查（忽略上方，因为初始生成可能在负坐标，虽然这里初始是0，但逻辑通用更好）
          if (boardY >= 0 && board.value[boardY][boardX] !== null) {
            return true
          }
        }
      }
    }
    return false
  }

  // 锁定方块到棋盘
  function lockPiece() {
    if (!currentPiece.value) return

    const { pos, shape, type } = currentPiece.value
    
    shape.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value) {
          const boardY = pos.y + y
          const boardX = pos.x + x
          if (boardY >= 0 && boardY < ROWS && boardX >= 0 && boardX < COLS) {
            board.value[boardY][boardX] = type
          }
        }
      })
    })

    clearLines()
    spawnPiece()
  }

  // 消除行
  function clearLines() {
    let linesCleared = 0
    
    // 从下往上检查
    for (let y = ROWS - 1; y >= 0; y--) {
      if (board.value[y].every(cell => cell !== null)) {
        board.value.splice(y, 1)
        board.value.unshift(Array(COLS).fill(null))
        linesCleared++
        y++ // 重新检查当前行，因为上面的行掉下来了
      }
    }

    if (linesCleared > 0) {
      lines.value += linesCleared
      // 经典计分规则
      const points = [0, 40, 100, 300, 1200]
      score.value += points[linesCleared] * level.value
      
      // 升级逻辑：每消除10行升一级
      level.value = Math.floor(lines.value / 10) + 1
      // 速度随等级增加，最快 100ms
      dropInterval = Math.max(100, BASE_SPEED - (level.value - 1) * 100)
      
      // 如果在游戏中，重置定时器以应用新速度
      if (!isPaused.value && !isGameOver.value) {
        stopGameLoop()
        startGameLoop()
      }
    }
  }

  // 移动逻辑
  function move(dx: number, dy: number): boolean {
    if (!currentPiece.value || isPaused.value || isGameOver.value) return false

    const newPos = {
      x: currentPiece.value.pos.x + dx,
      y: currentPiece.value.pos.y + dy
    }

    if (!checkCollision(newPos, currentPiece.value.shape)) {
      currentPiece.value.pos = newPos
      return true
    }
    
    // 如果向下移动发生碰撞，说明到底了
    if (dy > 0) {
      lockPiece()
    }
    return false
  }

  // 旋转逻辑
  function rotate() {
    if (!currentPiece.value || isPaused.value || isGameOver.value) return

    const originalShape = currentPiece.value.shape
    const N = originalShape.length
    const rotatedShape = originalShape[0].map((_, i) =>
      originalShape.map(row => row[i]).reverse()
    )

    // 简单的旋转墙踢（尝试推离墙壁）
    let offset = 0
    const pos = currentPiece.value.pos
    
    // 尝试原位，如果不行尝试左右移动一格
    if (!checkCollision(pos, rotatedShape)) {
      currentPiece.value.shape = rotatedShape
    } else if (!checkCollision({ ...pos, x: pos.x - 1 }, rotatedShape)) {
      currentPiece.value.pos.x -= 1
      currentPiece.value.shape = rotatedShape
    } else if (!checkCollision({ ...pos, x: pos.x + 1 }, rotatedShape)) {
      currentPiece.value.pos.x += 1
      currentPiece.value.shape = rotatedShape
    }
    // I型方块可能需要更多尝试，这里简化处理
  }

  // 硬掉落
  function hardDrop() {
    if (!currentPiece.value || isPaused.value || isGameOver.value) return
    while (move(0, 1)) {
      // 循环移动直到触底
      score.value += 2 // 硬掉落奖励分
    }
  }

  // 游戏循环控制
  function startGameLoop() {
    if (gameLoop) clearInterval(gameLoop)
    gameLoop = window.setInterval(() => {
      move(0, 1)
    }, dropInterval)
  }

  function stopGameLoop() {
    if (gameLoop) {
      clearInterval(gameLoop)
      gameLoop = null
    }
  }

  // 对外暴露的控制方法
  function startGame() {
    // 重置状态
    board.value = createEmptyBoard()
    score.value = 0
    level.value = 1
    lines.value = 0
    isGameOver.value = false
    isPaused.value = false
    dropInterval = BASE_SPEED
    nextPieceType.value = randomType()
    
    spawnPiece()
    startGameLoop()
  }

  function pauseGame() {
    if (isGameOver.value) return
    isPaused.value = !isPaused.value
    if (isPaused.value) {
      stopGameLoop()
    } else {
      startGameLoop()
    }
  }

  function stopGame() {
    stopGameLoop()
  }

  // 组合当前方块到棋盘用于渲染（不改变实际board数据）
  const displayBoard = computed(() => {
    // 深拷贝当前棋盘
    const display = board.value.map(row => [...row])
    
    if (currentPiece.value) {
      const { pos, shape, type } = currentPiece.value
      shape.forEach((row, y) => {
        row.forEach((value, x) => {
          if (value) {
            const boardY = pos.y + y
            const boardX = pos.x + x
            if (boardY >= 0 && boardY < ROWS && boardX >= 0 && boardX < COLS) {
              display[boardY][boardX] = type
            }
          }
        })
      })
    }
    return display
  })

  // 预测落点（Ghost Piece）
  const ghostPiecePos = computed(() => {
    if (!currentPiece.value) return null
    
    const { shape, pos } = currentPiece.value
    let ghostY = pos.y
    
    // 寻找最低有效位置
    while (true) {
      if (checkCollision({ x: pos.x, y: ghostY + 1 }, shape)) {
        break
      }
      ghostY++
    }
    
    return { x: pos.x, y: ghostY }
  })

  onUnmounted(() => {
    stopGameLoop()
  })

  return {
    board,
    displayBoard,
    score,
    level,
    lines,
    isGameOver,
    isPaused,
    nextPieceType,
    ghostPiecePos,
    currentPiece, // 暴露出来用于 ghost 渲染判断
    startGame,
    pauseGame,
    moveLeft: () => move(-1, 0),
    moveRight: () => move(1, 0),
    moveDown: () => move(0, 1),
    rotate,
    hardDrop
  }
}
