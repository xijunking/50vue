import GameList from '@/views/games/GameList.vue'
import TetrisGame from '@/views/games/TetrisGame.vue'

export default [
    {
        path: '/games',
        name: 'games',
        component: GameList,
    },
    {
        path: '/games/tetris',
        name: 'tetris',
        component: TetrisGame
    }
]
