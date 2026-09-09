import fs from 'node:fs'
import path from 'node:path'
import { execFileSync } from 'node:child_process'
import sharp from 'sharp'

const SRC = path.resolve('..')
const TARGET = path.resolve('public', 'work')

const FOLDERS = {
  '01 GZJJ': 'gzjj',
  '02 VIVO WATCH GT2': 'gt2',
  '03 VIVO V70 Series': 'v70',
  '04 HaLuo': 'haluo',
  '05 MO': 'mo',
  '06 Tempo 11': 'tempo-11',
  '07 Tempo 99': 'tempo-99',
  '08 Tempo hua': 'tempo-hua',
  '09 Tempo fan': 'tempo-fan',
  '10 Tempo vip': 'tempo-vip',
  '14 huaqiao': 'huaqiao',
}

const num = f => {
  const m = f.match(/(\d+)(?=\.(jpe?g|png|mp4)$)/i)
  return m ? parseInt(m[1]) : 9999
}

const manifest = {}

for (const [folder, slug] of Object.entries(FOLDERS)) {
  const srcDir = path.join(SRC, folder)
  const outDir = path.join(TARGET, slug)
  fs.rmSync(outDir, { recursive: true, force: true })
  fs.mkdirSync(outDir, { recursive: true })

  const files = fs
    .readdirSync(srcDir)
    .filter(f => /\.(jpe?g|png|mp4)$/i.test(f))
    .sort((a, b) => num(a) - num(b))

  manifest[slug] = []
  let i = 0
  for (const f of files) {
    i += 1
    const nn = String(i).padStart(2, '0')
    const src = path.join(srcDir, f)
    if (/\.mp4$/i.test(f)) {
      const out = path.join(outDir, `${nn}.mp4`)
      const tmp = path.join(outDir, `${nn}.tmp.mp4`)
      execFileSync('ffmpeg', ['-y', '-i', src, '-c:v', 'libx264', '-crf', '23', '-preset', 'slow', '-pix_fmt', 'yuv420p', '-an', '-movflags', '+faststart', tmp], { stdio: 'ignore' })
      if (fs.statSync(tmp).size < fs.statSync(src).size * 0.9) {
        fs.renameSync(tmp, out)
      } else {
        fs.rmSync(tmp)
        fs.copyFileSync(src, out)
      }
      manifest[slug].push(`${nn}.mp4`)
      console.log(`${slug}: ${f} -> ${nn}.mp4 (${(fs.statSync(out).size / 1048576).toFixed(2)} MB)`)
    } else {
      const out = path.join(outDir, `${nn}.webp`)
      await sharp(src).resize({ width: 1800, withoutEnlargement: true }).webp({ quality: 85 }).toFile(out)
      manifest[slug].push(`${nn}.webp`)
      console.log(`${slug}: ${f} -> ${nn}.webp (${(fs.statSync(out).size / 1024).toFixed(0)} KB)`)
    }
  }
}

fs.writeFileSync(path.resolve('scripts', 'media-manifest.json'), JSON.stringify(manifest, null, 2))
console.log('\nDONE. Manifest saved.')
