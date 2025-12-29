<!-- 页面旋转 -->

<script setup lang="ts">
import { computed, ref } from 'vue';


const rotateData = ref(0);
const displace = ref(-20);

const boxStyle = computed(() => ({
    transform: `rotate(${rotateData.value}deg)`,
    transition: "transform 0.5s ease", // 平滑过渡
    transformOrigin: "top left", // 旋转中心点
}))

const iconStyle1 = computed(() => ({
    transform: `translateX(${displace.value + 30}px)`,
    transition: "transform 0.7s ease",
    bottom: "32px",
}))
const iconStyle2 = computed(() => ({
    transform: `translateX(${displace.value + 15}px)`,
    transition: "transform 0.7s ease",
    bottom: "82px",
}))
const iconStyle3 = computed(() => ({
    transform: `translateX(${displace.value}px)`,
    transition: "transform 0.7s ease",
    bottom: "132px",
}))


const changeAngle = () => {
    if (rotateData.value === 0) {
        rotateData.value = -22
    } else {
        rotateData.value = 0
    }

    if (displace.value === -20) {
        displace.value = 80
    } else {
        displace.value = -20
    }
}

</script>

<template>
    <div class="rotate-box">
        <div class="rotate-item" :style="boxStyle">

            <div class="rotate-content">
                <h1 class="rotate-title">水调歌头·重上井冈山</h1>
                <small>毛泽东</small>

                <p class="rotate-text">
                    <span>
                        久有凌云志，重上井冈山。千里来寻故地，旧貌变新颜。到处莺歌燕舞，更有潺潺流水，高路入云端。过了黄洋界，险处不须看。 　　
                    </span>
                    <br>
                    <span>
                        风雷动，旌旗奋，是人寰。三十八年过去，弹指一挥间。可上九天揽月，可下五洋捉鳖，谈笑凯歌还。世上无难事，只要肯登攀。
                    </span>
                </p>

                <p class="rotate-text">
                    　　1927年10月，毛泽东率秋收起义部队上井冈山，开辟了工农武装割据道路，并沿着这条农村包围城市的道路取得了中国革命的胜利。1965年5月，毛泽东又重上井冈山。阔别三十八年，他感慨良多，诗兴大发，写下这首词。

                    　　上阕起句“久有凌云志”，劈空而下，声势不凡。“凌云”既是形容山势之高，也昭示了词人志向的远大，这“凌云志”，就是当年初上井冈山，开创革命根据地之“志”，也是今天重上井冈山，开拓新征程之志。一个“久”字，连接今昔，指向未来。“重上”二字，显然是以井冈山的过去和现在作为审美背景的。“千里来寻故地，旧貌变新颜”。前句真挚地表达了对井冈山和老区人民的情意，“千里”写行程之远，“故地”写梦魂所系，“寻”写感情之殷。后句点出解放后的井冈山，变得如此壮美。这里的“变”字，连接了过去，突出了现在，回应了“久有”和“重上”。在描述“新颜”时，词人摄取了几个典型的镜头：莺歌燕舞、潺潺流水、高入云端的公路。这里，视觉和听觉融为一体。“高路入云端”，既赞美社会主义建设取得的成就，也说明井冈山之高峻。此时，词人的情绪格外轻松愉快，对未来充满信心。“过了黄洋界，险处不须看”，进一步体现了词人的豪壮情怀。黄洋界是井冈山五大哨口之一，最为险要。词人登上黄洋界，想起当年黄洋界保卫战，对未来信心更足。“不须看”表现了对困难的蔑视，也表现了对前途的自信与乐观。
                    　　下阕即转入作者对现实的感奋。“风雷动，旌旗奋，是人寰”，词人由过去的战斗生涯，自然地想到了眼前的世界形势。连续三个三字句，奏出了充满阳刚之气的时代强音，揭示了革命可以改变一切的客观真理。接下去的“三十八年过去，弹指一挥间”两句，饱含丰富的历史与感情的内涵。词人两次上井冈山，时间跨度达三十八年之久！这三十八年，从个人以及中国革命的历史看，该是多么的漫长啊！但从宇宙的历史看，从时间无限的角度看，它又仅仅是一瞬间。从这两句，可以看到毛泽东对宇宙和历史的俯视感，从而窥见其博大的情怀。继而“可上九天揽月，可下五洋捉鳖，谈笑凯歌还”三句，则充满了理想主义色彩，进一步衬托出了词人敢于斗争、敢于胜利的豪迈气概。作为一代伟人，毛泽东面对困难镇定自若，“谈笑凯歌还”形象地显现了他的气度与风采。最后二句“世上无难事，只要肯登攀”，从俗语化出。词人由登黄洋界以及对革命斗争历史的回顾，升华出这样饱含着深刻哲理的词句，既是作者重上井冈山的最大感受，也是此词的核心的思想情感。
                    　　这首词作者采用了现实主义和浪漫主义相结合的方法。它以登井冈山为题材，在忆旧颂新中将崇高的理想和伟大的实践精神相结合，将叙事、写景、抒情、议论溶于一炉，既包含着丰富的思想内容，具有高度的概括力，又不乏明快活泼、生动细致的景物描写，慷慨激昂，与诗人一贯的乐观主义和浪漫主义一脉相承。
                </p>

                <img class="rotate-img" src="https://images.unsplash.com/photo-1572276596237-5db2c3e16c5d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80" alt="">
                
            </div>

        </div>

        <div class="rotate-icon" :style="iconStyle1">
            <el-icon :size="28" color="#fff">
                <House />
            </el-icon>
            首页
        </div>
        <div class="rotate-icon" :style="iconStyle2">
            <el-icon :size="28" color="#fff">
                <FullScreen />
            </el-icon>
            缩放
        </div>
        <div class="rotate-icon" :style="iconStyle3">
            <el-icon :size="28" color="#fff">
                <Setting />
            </el-icon>
            设置
        </div>

    </div>

    <div class="rotate-btn" @click="changeAngle">
        <el-icon :size="24" color="#fff">
            <Refresh />
        </el-icon>
    </div>

</template>

<style scoped>
.rotate-box {
    width: 100%;
    height: 100vh;
    background-color: #333333;
    overflow-x: hidden;
    position: relative;
}

.rotate-item {
    width: 100%;
    background: #fafafa;
    display: flex;
    justify-content: center;
    padding-top: 100px;
    z-index: 99;
}

.rotate-content {
    width: 1000px;
}

.rotate-title {
    font-size: 34px;
    color: #222222;
}

.rotate-text {
    margin: 16px 0;
    color: #333333;
}

.rotate-img{
    width: 1000px;
    margin: 16px 0;
}

.rotate-btn {
    width: 126px;
    height: 126px;
    background-color: #ff7978;
    border-radius: 0% 0% 100% 0%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;
}

.rotate-icon {
    transform: translateX(-100px);
    display: flex;
    font-size: 38;
    place-items: center;
    position: absolute;
    bottom: 0;
    left: -20px;
    color: #fff;
}
</style>