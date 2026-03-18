<script setup lang="ts">
import { computed, ref } from 'vue'
import { ElMessage } from 'element-plus'
import deckData from '@/data/hearthstone-decks.json'
import type { HearthstoneDeck } from '@/types/deck'

const decks = deckData as HearthstoneDeck[]
const searchKeyword = ref('')
const copiedDeckId = ref('')

const filteredDecks = computed(() => {
  const keyword = searchKeyword.value.trim().toLowerCase()

  if (!keyword) {
    return decks
  }

  return decks.filter((deck) => {
    const searchableText = [
      deck.name,
      deck.rawName,
      deck.className,
      deck.sourceAuthor,
      deck.sourceType,
      deck.sourceFile,
      deck.batch,
    ]
      .join(' ')
      .toLowerCase()

    return searchableText.includes(keyword)
  })
})

const resultSummary = computed(() => {
  if (!searchKeyword.value.trim()) {
    return `共 ${decks.length} 套卡组`
  }

  return `找到 ${filteredDecks.value.length} / ${decks.length} 套卡组`
})

const copyDeckCode = async (deck: HearthstoneDeck) => {
  try {
    await copyText(deck.deckCode)
    copiedDeckId.value = deck.id
    ElMessage.success(`已复制：${deck.name}`)

    window.setTimeout(() => {
      if (copiedDeckId.value === deck.id) {
        copiedDeckId.value = ''
      }
    }, 1800)
  } catch {
    ElMessage.error('复制失败，请手动复制卡组代码')
  }
}

const clearSearch = () => {
  searchKeyword.value = ''
}

const copyText = async (text: string) => {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text)
    return
  }

  const textarea = document.createElement('textarea')
  textarea.value = text
  textarea.setAttribute('readonly', 'true')
  textarea.style.position = 'fixed'
  textarea.style.opacity = '0'
  textarea.style.pointerEvents = 'none'

  document.body.appendChild(textarea)
  textarea.select()

  const copied = document.execCommand('copy')
  document.body.removeChild(textarea)

  if (!copied) {
    throw new Error('copy failed')
  }
}
</script>

<template>
  <div class="deck-tool-page">
    <div class="deck-tool-shell">
      <header class="hero-card">
        <div class="hero-text">
          <p class="eyebrow">炉石传说卡组速查</p>
          <h1>搜索一下，复制就走</h1>
          <p class="description">
            这里只做一件事：帮你更快找到卡组代码，并一键复制。
          </p>
        </div>
        <div class="hero-meta">
          <span>{{ resultSummary }}</span>
        </div>
      </header>

      <section class="toolbar-card">
        <div class="search-box">
          <el-icon class="search-icon"><Search /></el-icon>
          <input
            v-model="searchKeyword"
            type="text"
            class="search-input"
            placeholder="搜索卡组名、职业、作者"
          />
        </div>
        <button
          v-if="searchKeyword"
          type="button"
          class="clear-btn"
          @click="clearSearch"
        >
          清空
        </button>
      </section>

      <section v-if="filteredDecks.length" class="deck-list">
        <article
          v-for="deck in filteredDecks"
          :key="deck.id"
          class="deck-card"
        >
          <div class="deck-header">
            <div class="deck-main">
              <h2>{{ deck.name }}</h2>
              <div class="deck-tags">
                <span class="deck-tag class-tag">{{ deck.className || '未分类' }}</span>
                <span v-if="deck.sourceAuthor" class="deck-tag muted-tag">{{ deck.sourceAuthor }}</span>
                <span v-if="deck.batch" class="deck-tag muted-tag">{{ deck.batch }}</span>
              </div>
            </div>

            <button
              type="button"
              class="copy-btn"
              :class="{ copied: copiedDeckId === deck.id }"
              @click="copyDeckCode(deck)"
            >
              {{ copiedDeckId === deck.id ? '已复制' : '复制卡组' }}
            </button>
          </div>

          <div class="deck-info">
            <span v-if="deck.sourceType">{{ deck.sourceType }}</span>
            <span v-if="deck.publishedAt">发布时间：{{ deck.publishedAt }}</span>
            <span v-else-if="deck.collectedAt">收集时间：{{ deck.collectedAt }}</span>
          </div>

          <div class="code-panel">
            <code>{{ deck.deckCode }}</code>
          </div>
        </article>
      </section>

      <section v-else class="empty-card">
        <el-icon class="empty-icon"><Search /></el-icon>
        <h2>没有找到匹配的卡组</h2>
        <p>试试职业、作者名，或者换一个更短的关键词。</p>
      </section>

      <footer class="page-footer">
        本页面内容仅用于个人整理与检索使用。如涉及侵权或内容不当，请联系
        <a href="mailto:xijun2131@qq.com">xijun2131@qq.com</a>
        ，我会第一时间处理或删除。
      </footer>
    </div>
  </div>
</template>

<style scoped>
.deck-tool-page {
  min-height: 100vh;
  padding: 24px 16px 40px;
  background:
    radial-gradient(circle at top, rgba(255, 210, 140, 0.26), transparent 28%),
    linear-gradient(180deg, #fff8ef 0%, #f5efe5 46%, #eee7dc 100%);
}

.deck-tool-shell {
  width: min(100%, 980px);
  margin: 0 auto;
}

.hero-card,
.toolbar-card,
.deck-card,
.empty-card {
  background: rgba(255, 252, 247, 0.88);
  border: 1px solid rgba(109, 80, 46, 0.12);
  border-radius: 24px;
  box-shadow: 0 18px 40px rgba(89, 60, 27, 0.08);
  backdrop-filter: blur(10px);
}

.hero-card {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  padding: 28px;
  margin-bottom: 18px;
}

.eyebrow {
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: #8f5f26;
  text-transform: uppercase;
}

.hero-text h1 {
  margin-top: 8px;
  font-size: clamp(2rem, 5vw, 3.2rem);
  line-height: 1.05;
  font-weight: 800;
  color: #26180a;
}

.description {
  margin-top: 12px;
  max-width: 560px;
  color: #65533f;
  font-size: 1rem;
}

.hero-meta {
  min-width: fit-content;
  display: flex;
  align-items: flex-start;
}

.hero-meta span {
  padding: 10px 14px;
  border-radius: 999px;
  background: #fff0d8;
  color: #8c5e2f;
  font-weight: 700;
  white-space: nowrap;
}

.toolbar-card {
  display: flex;
  gap: 12px;
  align-items: center;
  padding: 16px;
  margin-bottom: 18px;
  position: sticky;
  top: 12px;
  z-index: 20;
}

.search-box {
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: center;
  gap: 10px;
  background: #fff;
  border: 1px solid rgba(117, 84, 45, 0.14);
  border-radius: 16px;
  padding: 0 14px;
}

.search-icon {
  color: #9d7650;
  font-size: 1rem;
}

.search-input {
  width: 100%;
  border: none;
  background: transparent;
  color: #2f2113;
  font-size: 1rem;
  padding: 14px 0;
  outline: none;
}

.search-input::placeholder {
  color: #a79683;
}

.clear-btn,
.copy-btn {
  border: none;
  border-radius: 16px;
  cursor: pointer;
  transition: transform 0.18s ease, box-shadow 0.18s ease, background-color 0.18s ease;
}

.clear-btn {
  padding: 12px 16px;
  background: #efe6d8;
  color: #6b543d;
  font-weight: 700;
}

.copy-btn {
  min-width: 108px;
  padding: 12px 18px;
  background: linear-gradient(135deg, #bf6c18 0%, #da8731 100%);
  color: #fff;
  font-weight: 800;
  box-shadow: 0 10px 24px rgba(192, 107, 23, 0.28);
}

.copy-btn.copied {
  background: linear-gradient(135deg, #4d8f51 0%, #69aa6d 100%);
  box-shadow: 0 10px 24px rgba(85, 151, 90, 0.22);
}

.deck-list {
  display: grid;
  gap: 16px;
}

.deck-card {
  padding: 20px;
}

.deck-header {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  align-items: flex-start;
}

.deck-main {
  min-width: 0;
}

.deck-main h2 {
  color: #24170b;
  font-size: 1.2rem;
  font-weight: 800;
  line-height: 1.3;
}

.deck-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 10px;
}

.deck-tag {
  display: inline-flex;
  align-items: center;
  min-height: 28px;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 0.84rem;
  font-weight: 700;
}

.class-tag {
  background: #fde5c4;
  color: #8b581d;
}

.muted-tag {
  background: #f3ede4;
  color: #6c5b48;
}

.deck-info {
  display: flex;
  flex-wrap: wrap;
  gap: 10px 18px;
  margin-top: 14px;
  color: #8f7e6d;
  font-size: 0.9rem;
}

.code-panel {
  margin-top: 16px;
  padding: 14px 16px;
  background: #fffdf8;
  border: 1px dashed rgba(128, 94, 53, 0.26);
  border-radius: 16px;
  overflow-x: auto;
}

.code-panel code {
  display: block;
  color: #3e2b17;
  font-size: 0.92rem;
  line-height: 1.7;
  word-break: break-all;
  font-family: 'SFMono-Regular', 'Menlo', 'Consolas', monospace;
}

.empty-card {
  padding: 42px 20px;
  text-align: center;
}

.empty-icon {
  font-size: 2rem;
  color: #b4864e;
}

.empty-card h2 {
  margin-top: 12px;
  color: #301f10;
  font-size: 1.25rem;
  font-weight: 800;
}

.empty-card p {
  margin-top: 8px;
  color: #7d6954;
}

.page-footer {
  margin-top: 22px;
  padding: 0 4px;
  color: #8c7965;
  font-size: 0.88rem;
  line-height: 1.8;
  text-align: center;
}

.page-footer a {
  color: #9a5e24;
  font-weight: 700;
}

@media (hover: hover) {
  .clear-btn:hover,
  .copy-btn:hover {
    transform: translateY(-1px);
  }
}

@media (max-width: 720px) {
  .deck-tool-page {
    padding: 14px 12px 24px;
  }

  .hero-card {
    padding: 20px;
    flex-direction: column;
  }

  .toolbar-card {
    top: 8px;
    padding: 12px;
    flex-direction: column;
    align-items: stretch;
  }

  .clear-btn {
    width: 100%;
  }

  .deck-card {
    padding: 16px;
  }

  .deck-header {
    flex-direction: column;
  }

  .copy-btn {
    width: 100%;
  }

  .deck-main h2 {
    font-size: 1.1rem;
  }
}
</style>
