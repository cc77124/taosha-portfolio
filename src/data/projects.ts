export type MediaItem = {
  type: 'image' | 'video'
  src: string
}

export type Project = {
  id: string
  index: string
  title: string
  titleEn: string
  year: string
  desc: string
  tools: string[]
  media: MediaItem[]
}

const media = (slug: string, ...files: string[]): MediaItem[] =>
  files
    .map(f => ({
      type: f.endsWith('.mp4') ? ('video' as const) : ('image' as const),
      src: `/work/${slug}/${f}`,
    }))
    .sort((a, b) => a.src.localeCompare(b.src, undefined, { numeric: true }))

const gzjj: Project = {
  id: 'gzjj',
  index: '01',
  title: '广州酒家',
  titleEn: 'Guangzhou Restaurant · Omnichannel Visual',
  year: '2025',
  desc: '负责广州酒家集团利口福全渠道视觉创意工作，涵盖产品包装设计、线上直播间视觉、线下品牌广告物料设计；同时承担趣味创意广告脚本策划，结合 AI 工具完成创意视频创作，实现品牌视觉内容多元化输出。',
  tools: ['Photoshop', 'Illustrator', 'Seedance 2.0', 'ACE Studio'],
  media: media('gzjj', '01.webp', '02.webp', '03.webp', '04.webp', '05.webp', '06.mp4', '07.mp4', '08.webp'),
}

const gt2: Project = {
  id: 'vivo-watch-gt2',
  index: '02',
  title: 'vivo Watch GT2',
  titleEn: 'Amazon & DTC · AI Motion',
  year: '2026',
  desc: 'vivo Watch GT2 跨境视觉项目，完成境外亚马逊主图 A+ 页面及独立站广告视觉设计，与 AI 视频创作。',
  tools: ['Photoshop', 'Blender', 'GPT IMG-2', 'Seedance 2.0', 'ACE Studio'],
  media: media('gt2', '01.webp', '02.webp', '03.webp', '04.mp4', '05.webp', '06.webp'),
}

const v70: Project = {
  id: 'vivo-v70',
  index: '03',
  title: 'vivo V70 Series',
  titleEn: 'Amazon & DTC · Prime Day Campaign',
  year: '2026',
  desc: 'vivo V70 系列手机跨境电商视觉项目，亚马逊主图、A+、独立站广告创意设计；以及 Prime Day、Summer Deals 等重点大促活动广告设计。',
  tools: ['Photoshop', 'GPT IMG-2', 'Seedance 2.0', 'ACE Studio'],
  media: media('v70', '01.webp', '02.webp', '03.webp', '04.webp', '05.webp', '06.webp'),
}

const haluo: Project = {
  id: 'haluo',
  index: '04',
  title: '嗨啰亲子',
  titleEn: 'HaLuo Family Travel · Brand & IP',
  year: '2022',
  desc: '嗨啰亲子旅游品牌视觉升级，围绕亲子出行场景重塑品牌识别系统，完成 LOGO 设计、IP 形象打造及线下活动视觉物料设计，强化品牌亲和力、记忆点与活动传播识别度。',
  tools: ['Photoshop', 'Illustrator', 'Blender'],
  media: media('haluo', '01.webp', '02.webp', '03.webp', '04.webp', '05.webp', '06.mp4', '07.webp', '08.webp'),
}

const mo: Project = {
  id: 'modelones',
  index: '05',
  title: 'MODELONES',
  titleEn: 'MODELONES · Amazon Visual',
  year: '2025',
  desc: '负责美妆品牌 MODELONES 亚马逊渠道主图、A+ 页面的修图与系列延展，针对产品本体、手模照片、胶体质地等素材做质感调校，保障品牌视觉一致性。',
  tools: ['Photoshop', 'Banana Pro'],
  media: media('mo', '01.webp', '02.webp', '03.webp', '04.webp', '05.webp', '06.webp'),
}

const tempo11: Project = {
  id: 'tempo-11',
  index: '06',
  title: '得宝 双 11',
  titleEn: 'Tempo · Tmall 11.11 Carnival',
  year: '2024',
  desc: '负责得宝天猫淘宝双 11 大促页面视觉设计，欧式品味主题结合品牌形象代言人宋茜，运用 3D 与 AI 完成店铺首页设计，强化双 11 大促氛围。',
  tools: ['Photoshop', 'Blender', 'Midjourney'],
  media: media('tempo-11', '01.webp', '02.webp', '03.webp', '04.webp'),
}

const tempo99: Project = {
  id: 'tempo-99',
  index: '07',
  title: '得宝 99 庆典',
  titleEn: 'Tempo · 99 Shopping Festival',
  year: '2024',
  desc: '得宝淘宝 99 庆典大促首页视觉设计。围绕「得宝品味车站」营销主题，结合 3D 建模与 AI 创意工具，独立完成店铺全页面视觉搭建落地。',
  tools: ['Photoshop', 'Blender', 'Stable Diffusion'],
  media: media('tempo-99', '01.webp', '02.webp', '03.webp', '04.webp'),
}

const tempoHua: Project = {
  id: 'tempo-hua',
  index: '08',
  title: '得宝 春游季',
  titleEn: 'Tempo · Spring Outing Campaign',
  year: '2025',
  desc: '得宝天猫淘宝春游专题视觉设计，以樱花香味纸巾为核心产品，构建「出游樱花小镇」创意场景；整合代言人虞书欣，借助 3D 软件与 AI 辅助创作，完成店铺完整页面视觉设计，烘托春日出游氛围，强化产品卖点传递。',
  tools: ['Photoshop', 'Blender', 'AI Flux'],
  media: media('tempo-hua', '01.webp', '02.webp', '03.webp', '04.webp'),
}

const tempoFan: Project = {
  id: 'tempo-fan',
  index: '09',
  title: '得宝 618 预热',
  titleEn: 'Tempo · 618 Pre-heat',
  year: '2025',
  desc: '得宝淘宝 618 预热首页设计，以「解密 618 优惠机密」为主题创意；代言人吴亦凡化身密探角色，完成店铺完整页面创意设计，预热 618 店铺大促氛围。',
  tools: ['Photoshop', 'Blender', 'AI Flux'],
  media: media('tempo-fan', '01.webp', '02.webp', '03.webp', '04.webp'),
}

const tempoVip: Project = {
  id: 'tempo-vip',
  index: '10',
  title: '得宝 会员页',
  titleEn: 'Tempo · Tmall Members Page',
  year: '2023',
  desc: '得宝天猫 Q2 会员页店铺视觉设计。以品牌「童话会员乐园」核心创意为基底，运用 3D 场景搭建与 AI 辅助设计，完成天猫店铺会员页全页面设计，强化会员营销氛围。',
  tools: ['Photoshop', 'Blender', 'Stable Diffusion'],
  media: media('tempo-vip', '01.webp', '02.webp', '03.webp', '04.webp'),
}

const sfund: Project = {
  id: 'sfund',
  index: '11',
  title: '广州基金',
  titleEn: 'SFUND · Corporate Annual Book',
  year: '2021',
  desc: '以广州金融国际中心建筑形态与广州城市发展脉络为核心视觉主题，整体贴合国有基金管理企业稳重专业的气质。通过可视化图形，系统呈现公司各项内容，做到数据层级清晰、信息逻辑严谨。',
  tools: ['Photoshop', 'Illustrator', 'InDesign'],
  media: media('sfund', '01.webp', '02.webp', '03.webp', '04.webp'),
}

const ddw: Project = {
  id: 'ddw',
  index: '12',
  title: '东莞名家具',
  titleEn: 'DDW · Design Week Catalog',
  year: '2021',
  desc: '负责国际家居设计赛事专属设计师宣传画册设计。以工业制造与美学设计相融的视觉语言，系统梳理展示设计师履历与参赛优质作品，具象化呈现东莞智造接轨全球、创新进阶的发展理念与品牌愿景。',
  tools: ['Photoshop', 'Illustrator', 'InDesign'],
  media: media('ddw', '01.webp', '02.webp', '03.webp', '04.webp'),
}

const sfc: Project = {
  id: 'sfc',
  index: '13',
  title: '南方财经媒体',
  titleEn: 'SFC · Media Group Book',
  year: '2021',
  desc: '南方财经全媒体集团画册设计，融合财经金融与新媒体视觉属性，可视化呈现媒体转型战略与「移动优先、产品牵引、数据驱动」企业核心理念。',
  tools: ['Photoshop', 'Illustrator', 'InDesign'],
  media: media('sfc', '01.webp', '02.webp', '03.webp', '04.webp'),
}

const huaqiao: Project = {
  id: 'huaqiao',
  index: '14',
  title: '华侨外语学校',
  titleEn: 'HQFLS · 65th Anniversary Badge',
  year: '2020',
  desc: '该徽章设计在广州华侨外国语学校 65 周年校庆徽章征集活动中荣获一等奖，并被正式采用为校庆活动官方标识。',
  tools: ['Photoshop', 'Illustrator', 'Blender'],
  media: media('huaqiao', '01.webp', '02.webp', '03.webp', '04.webp'),
}

const allProjects: Project[] = [
  gzjj,
  gt2,
  v70,
  haluo,
  mo,
  tempo11,
  tempo99,
  tempoHua,
  tempoFan,
  tempoVip,
  sfund,
  ddw,
  sfc,
  huaqiao,
]

export const projects: Project[] = [...allProjects].sort((a, b) =>
  a.index.localeCompare(b.index, undefined, { numeric: true }),
)

export const totalProjects = projects.length
