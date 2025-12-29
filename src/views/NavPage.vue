<template>
  <div class="nav-page">
    <FluidBackground />
    
    <div class="content-container">
      <!-- 头部 -->
      <header class="nav-header">
        <div class="back-btn" @click="router.push('/')">
          <el-icon><ArrowLeft /></el-icon>
          <span>返回首页</span>
        </div>
        <h1 class="page-title">网址导航 <span class="highlight">Navigator</span></h1>
        <p class="page-subtitle">精选优质开发资源与工具</p>
      </header>

      <!-- 搜索框 -->
      <div class="search-section">
        <div class="search-box">
          <el-icon class="search-icon"><Search /></el-icon>
          <input 
            type="text" 
            v-model="searchQuery" 
            placeholder="搜索资源..."
            class="search-input"
          />
        </div>
      </div>

      <!-- 分类导航与内容 -->
      <div class="main-content">
        <!-- 侧边栏分类 -->
        <aside class="sidebar">
          <div 
            v-for="category in categories" 
            :key="category.id"
            class="category-item"
            :class="{ active: currentCategory === category.id }"
            @click="scrollToCategory(category.id)"
          >
            <el-icon><component :is="category.icon" /></el-icon>
            <span>{{ category.name }}</span>
          </div>
        </aside>

        <!-- 网址列表 -->
        <main class="links-area" ref="linksAreaRef">
          <div 
            v-for="category in filteredCategories" 
            :key="category.id"
            :id="category.id"
            class="category-section"
          >
            <h2 class="category-title">
              <el-icon><component :is="category.icon" /></el-icon>
              {{ category.name }}
            </h2>
            
            <div class="links-grid">
              <a 
                v-for="link in category.links" 
                :key="link.url"
                :href="link.url"
                target="_blank"
                class="link-card"
                :title="link.desc"
              >
                <div class="card-icon">
                  <img 
                    :src="`https://www.google.com/s2/favicons?domain=${getDomain(link.url)}&sz=128`" 
                    @error="handleImageError"
                    alt="icon"
                  />
                </div>
                <div class="card-info">
                  <h3>{{ link.title }}</h3>
                  <p>{{ link.desc }}</p>
                </div>
                <div class="card-arrow">
                  <el-icon><TopRight /></el-icon>
                </div>
              </a>
            </div>
          </div>

          <!-- 无搜索结果提示 -->
          <div v-if="filteredCategories.length === 0" class="no-results">
            <el-icon :size="48"><Warning /></el-icon>
            <p>未找到相关资源</p>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import FluidBackground from '@/components/FluidBackground.vue'
import { 
  ArrowLeft, Search, Monitor, Brush, Tools, 
  Reading, Share, TopRight, Warning, Star, Cpu 
} from '@element-plus/icons-vue'

const router = useRouter()
const searchQuery = ref('')
const currentCategory = ref('tools')
const linksAreaRef = ref<HTMLElement | null>(null)
let isClickScrolling = false // 防止点击滚动时触发滚动监听

// 提取域名用于获取 favicon
const getDomain = (url: string) => {
  try {
    return new URL(url).hostname
  } catch {
    return 'github.com'
  }
}

const handleImageError = (e: Event) => {
  const target = e.target as HTMLImageElement
  // 默认图标 (Globe icon)
  target.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjOTRhM2I4IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMTAiPjwvY2lyY2xlPjxsaW5lIHgxPSIyIiB5MT0iMTIiIHgyPSIyMiIgeTI9IjEyIj48L2xpbmU+PHBhdGggZD0iTTEyIDJhMTUuMyAxNS4zIDAgMCAxIDQgMTAgMTUuMyAxNS4zIDAgMCAxLTQgMTAgMTUuMyAxNS4zIDAgMCAxLTQgLTEwIDE1LjMgMTUuMyAwIDAgMSA0IC0xMCI+PC9wYXRoPjwvc3ZnPg=='
}

const scrollToCategory = (id: string) => {
  currentCategory.value = id
  isClickScrolling = true
  
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    // 简单的防抖，等待滚动完成
    setTimeout(() => {
      isClickScrolling = false
    }, 1000)
  }
}

const handleScroll = () => {
  if (isClickScrolling || !linksAreaRef.value) return
  
  const container = linksAreaRef.value
  const sections = container.querySelectorAll('.category-section')
  const containerTop = container.scrollTop
  
  // 遍历所有 section，找到当前视口最上方的那个
  for (const section of sections) {
    const element = section as HTMLElement
    // 元素顶部距离容器顶部的距离
    const offsetTop = element.offsetTop
    const height = element.offsetHeight
    
    // 如果元素顶部在容器可视区域上半部分，或者是最后一个元素
    // 这里使用 offsetTop - 100 作为缓冲，让高亮更自然
    if (offsetTop <= containerTop + 100 && offsetTop + height > containerTop + 100) {
      if (currentCategory.value !== element.id) {
        currentCategory.value = element.id
      }
      break
    }
  }
}

onMounted(() => {
  if (linksAreaRef.value) {
    linksAreaRef.value.addEventListener('scroll', handleScroll)
  }
})

onBeforeUnmount(() => {
  if (linksAreaRef.value) {
    linksAreaRef.value.removeEventListener('scroll', handleScroll)
  }
})

// 数据源
const categories = [
  {
    id: 'tools',
    name: '在线工具',
    icon: 'Tools',
    links: [
      { title: 'iLovePDF', url: 'https://www.ilovepdf.com/zh-cn', desc: '在线处理 PDF 文件的全能工具' },
      { title: 'TinyPNG', url: 'https://tinypng.com/', desc: '智能 WebP, PNG 和 JPEG 压缩' },
      { title: 'Smallpdf', url: 'https://smallpdf.com/cn', desc: '全能 PDF 转换与编辑工具' },
      { title: '草料二维码', url: 'https://cli.im/', desc: '免费好用的二维码生成工具' },
      { title: 'Convertio', url: 'https://convertio.co/zh/', desc: '在线文件转换工具' },
      { title: 'Squoosh', url: 'https://squoosh.app/', desc: 'Google 出品的图片压缩工具' },
      { title: 'Carbon', url: 'https://carbon.now.sh/', desc: '生成漂亮的代码图片' },
      { title: 'JSON Formatter', url: 'https://jsonformatter.curiousconcept.com/', desc: 'JSON 格式化验证工具' },
      { title: 'RegExr', url: 'https://regexr.com/', desc: '正则表达式学习与测试' },
      { title: 'Canva', url: 'https://www.canva.com/', desc: '在线平面设计工具' },
    ]
  },
  {
    id: 'common',
    name: '日常推荐',
    icon: 'Star',
    links: [
      { title: 'Google', url: 'https://www.google.com/', desc: '全球最大的搜索引擎' },
      { title: '百度', url: 'https://www.baidu.com/', desc: '全球最大的中文搜索引擎' },
      { title: '哔哩哔哩', url: 'https://www.bilibili.com/', desc: '国内知名的视频弹幕网站' },
      { title: '腾讯视频', url: 'https://v.qq.com/', desc: '中国领先的在线视频媒体平台' },
      { title: 'YouTube', url: 'https://www.youtube.com/', desc: '全球最大的视频分享网站' },
    ]
  },
  {
    id: 'ai',
    name: 'AI 助手',
    icon: 'Cpu',
    links: [
      { title: 'ChatGPT', url: 'https://chat.openai.com/', desc: 'OpenAI 开发的智能对话模型' },
      { title: 'Claude', url: 'https://claude.ai/', desc: 'Anthropic 开发的 AI 助手' },
      { title: 'Kimi 智能助手', url: 'https://kimi.moonshot.cn/', desc: '月之暗面科技出品的 AI 助手' },
      { title: 'Midjourney', url: 'https://www.midjourney.com/', desc: '强大的 AI 绘画工具' },
      { title: 'Gamma', url: 'https://gamma.app/', desc: 'AI 驱动的 PPT 生成工具' },
    ]
  },
  {
    id: 'frontend',
    name: '前端开发',
    icon: 'Monitor',
    links: [
      { title: 'Vue.js', url: 'https://vuejs.org/', desc: '渐进式 JavaScript 框架' },
      { title: 'React', url: 'https://react.dev/', desc: '构建 Web 和原生交互界面的库' },
      { title: 'Vite', url: 'https://vitejs.dev/', desc: '下一代前端开发与构建工具' },
      { title: 'TypeScript', url: 'https://www.typescriptlang.org/', desc: 'JavaScript 的超集' },
      { title: 'Tailwind CSS', url: 'https://tailwindcss.com/', desc: '原子化 CSS 框架' },
      { title: 'Element Plus', url: 'https://element-plus.org/', desc: '基于 Vue 3 的组件库' },
    ]
  },
  {
    id: 'design',
    name: '设计资源',
    icon: 'Brush',
    links: [
      { title: 'Dribbble', url: 'https://dribbble.com/', desc: '设计师灵感社区' },
      { title: 'Behance', url: 'https://www.behance.net/', desc: '展示和发现创意作品' },
      { title: 'Google Fonts', url: 'https://fonts.google.com/', desc: '免费开源字体库' },
      { title: 'Color Hunt', url: 'https://colorhunt.co/', desc: '设计师的配色灵感' },
      { title: 'IconFont', url: 'https://www.iconfont.cn/', desc: '阿里巴巴矢量图标库' },
    ]
  },
  {
    id: 'learning',
    name: '学习社区',
    icon: 'Reading',
    links: [
      { title: 'MDN Web Docs', url: 'https://developer.mozilla.org/', desc: 'Web 开发权威文档' },
      { title: 'Stack Overflow', url: 'https://stackoverflow.com/', desc: '全球最大的开发者问答社区' },
      { title: 'GitHub', url: 'https://github.com/', desc: '代码托管与协作平台' },
      { title: '掘金', url: 'https://juejin.cn/', desc: '帮助开发者成长的社区' },
      { title: 'Dev.to', url: 'https://dev.to/', desc: '开发者分享社区' },
    ]
  }
]

// 搜索过滤
const filteredCategories = computed(() => {
  if (!searchQuery.value) return categories
  
  const query = searchQuery.value.toLowerCase()
  return categories.map(cat => ({
    ...cat,
    links: cat.links.filter(link => 
      link.title.toLowerCase().includes(query) || 
      link.desc.toLowerCase().includes(query)
    )
  })).filter(cat => cat.links.length > 0)
})
</script>

<style scoped>
.nav-page {
  min-height: 100vh;
  width: 100%;
  background-color: #0f172a;
  color: #fff;
  position: relative;
  font-family: 'Inter', sans-serif;
}

.content-container {
  position: relative;
  z-index: 10;
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
  height: 100vh;
  box-sizing: border-box;
}

/* Header */
.nav-header {
  margin-bottom: 30px;
  animation: fadeInDown 0.8s ease-out;
}

.back-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  color: #94a3b8;
  margin-bottom: 20px;
  transition: color 0.3s;
  font-size: 0.95rem;
}

.back-btn:hover {
  color: #fff;
}

.page-title {
  font-size: 2.5rem;
  font-weight: 800;
  margin: 0 0 10px;
}

.highlight {
  background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.page-subtitle {
  color: #94a3b8;
  font-size: 1.1rem;
  margin: 0;
}

/* Search */
.search-section {
  margin-bottom: 40px;
  animation: fadeIn 1s ease-out 0.2s backwards;
}

.search-box {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 12px 20px;
  display: flex;
  align-items: center;
  gap: 12px;
  max-width: 600px;
  transition: all 0.3s ease;
}

.search-box:focus-within {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(99, 102, 241, 0.5);
  box-shadow: 0 0 20px rgba(99, 102, 241, 0.2);
}

.search-icon {
  color: #94a3b8;
  font-size: 1.2rem;
}

.search-input {
  background: transparent;
  border: none;
  outline: none;
  color: #fff;
  width: 100%;
  font-size: 1rem;
}

.search-input::placeholder {
  color: #64748b;
}

/* Main Content Layout */
.main-content {
  display: flex;
  gap: 40px;
  flex: 1;
  overflow: hidden; /* 防止外层滚动 */
  animation: fadeInUp 1s ease-out 0.4s backwards;
}

/* Sidebar */
.sidebar {
  width: 200px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-right: 20px;
  border-right: 1px solid rgba(255, 255, 255, 0.05);
  overflow-y: auto;
}

.category-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 12px;
  color: #94a3b8;
  cursor: pointer;
  transition: all 0.3s ease;
}

.category-item:hover {
  background: rgba(255, 255, 255, 0.05);
  color: #fff;
}

.category-item.active {
  background: linear-gradient(90deg, rgba(99, 102, 241, 0.2) 0%, transparent 100%);
  color: #818cf8;
  border-left: 3px solid #818cf8;
}

/* Links Area */
.links-area {
  flex: 1;
  overflow-y: auto;
  padding-right: 10px;
  scroll-behavior: smooth;
}

.links-area::-webkit-scrollbar {
  width: 6px;
}

.links-area::-webkit-scrollbar-track {
  background: transparent;
}

.links-area::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
}

.category-section {
  margin-bottom: 50px;
  scroll-margin-top: 20px;
}

.category-title {
  font-size: 1.5rem;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
  color: #f1f5f9;
}

.links-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}

.link-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  padding: 20px;
  display: flex;
  align-items: flex-start;
  gap: 16px;
  text-decoration: none;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.link-card:hover {
  background: rgba(255, 255, 255, 0.08);
  transform: translateY(-4px);
  border-color: rgba(255, 255, 255, 0.2);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.card-icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  overflow: hidden;
}

.card-icon img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-info {
  flex: 1;
  min-width: 0;
}

.card-info h3 {
  margin: 0 0 6px;
  font-size: 1rem;
  color: #f1f5f9;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.card-info p {
  margin: 0;
  font-size: 0.85rem;
  color: #94a3b8;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-arrow {
  position: absolute;
  top: 16px;
  right: 16px;
  opacity: 0;
  transform: translate(-5px, 5px);
  transition: all 0.3s ease;
  color: #818cf8;
}

.link-card:hover .card-arrow {
  opacity: 1;
  transform: translate(0, 0);
}

.no-results {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 0;
  color: #64748b;
  gap: 16px;
}

/* Responsive */
@media (max-width: 768px) {
  .main-content {
    flex-direction: column;
  }

  .sidebar {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    padding-right: 0;
    padding-bottom: 10px;
    flex-direction: row;
    overflow-x: auto;
    padding-bottom: 15px;
  }

  .category-item {
    white-space: nowrap;
    flex-shrink: 0;
  }
  
  .category-item.active {
    border-left: none;
    border-bottom: 3px solid #818cf8;
    background: linear-gradient(180deg, transparent 0%, rgba(99, 102, 241, 0.1) 100%);
  }
  
  .content-container {
    padding: 20px;
    height: auto;
    min-height: 100vh;
  }
  
  .links-area {
    overflow: visible;
  }
}

@keyframes fadeInDown {
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
</style>