import { readdir, stat, mkdir, rm } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'
import { execFileSync } from 'node:child_process'
import sharp from 'sharp'

const PUBLIC = path.resolve('public')
const report = []

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name)
    if (entry.isDirectory()) yield* walk(p)
    else yield p
  }
}

async function convertImages() {
  for await (const file of walk(path.join(PUBLIC, 'work'))) {
    if (!file.endsWith('.png')) continue
    const out = file.replace(/\.png$/, '.webp')
    const before = (await stat(file)).size
    await sharp(file)
      .resize({ width: 1800, withoutEnlargement: true })
      .webp({ quality: 85 })
      .toFile(out)
    const after = (await stat(out)).size
    await rm(file)
    report.push({ file: path.relative(PUBLIC, file), before, after, kind: 'img' })
  }

  const about = path.join(PUBLIC, 'about', 'photo.png')
  if (existsSync(about)) {
    const out = about.replace(/\.png$/, '.webp')
    const before = (await stat(about)).size
    await sharp(about)
      .resize({ width: 1200, withoutEnlargement: true })
      .webp({ quality: 85 })
      .toFile(out)
    const after = (await stat(out)).size
    await rm(about)
    report.push({ file: 'about/photo.png', before, after, kind: 'img' })
  }
}

async function reencodeVideos() {
  for await (const file of walk(PUBLIC)) {
    if (!file.endsWith('.mp4')) continue
    const rel = path.relative(PUBLIC, file)
    const before = (await stat(file)).size
    const tmp = file.replace(/\.mp4$/, '.tmp.mp4')
    execFileSync('ffmpeg', [
      '-y', '-i', file,
      '-c:v', 'libx264', '-crf', '23', '-preset', 'slow', '-pix_fmt', 'yuv420p',
      '-an', '-movflags', '+faststart',
      tmp,
    ], { stdio: 'ignore' })
    const after = (await stat(tmp)).size
    if (after < before * 0.9) {
      await rm(file)
      execFileSync('cmd', ['/c', 'move', '/y', tmp, file], { stdio: 'ignore' })
    } else {
      await rm(tmp)
    }
    report.push({ file: rel, before, after: after < before * 0.9 ? after : before, kind: 'video' })
  }
}

await convertImages()
await reencodeVideos()

const sum = (arr, key) => arr.reduce((s, r) => s + r[key], 0)
for (const kind of ['img', 'video']) {
  const rows = report.filter(r => r.kind === kind)
  const beforeMB = (sum(rows, 'before') / 1048576).toFixed(1)
  const afterMB = (sum(rows, 'after') / 1048576).toFixed(1)
  console.log(`${kind}: ${rows.length} files, ${beforeMB} MB -> ${afterMB} MB`)
}
console.log('TOTAL:', (sum(report, 'before') / 1048576).toFixed(1), '->', (sum(report, 'after') / 1048576).toFixed(1), 'MB')
