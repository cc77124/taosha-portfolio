import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

const WORK = path.resolve('public', 'work')
let count = 0

for (const slug of fs.readdirSync(WORK)) {
  const dir = path.join(WORK, slug)
  if (!fs.statSync(dir).isDirectory()) continue
  for (const f of fs.readdirSync(dir)) {
    if (!/^\d+\.webp$/.test(f)) continue
    const src = path.join(dir, f)
    const base = f.replace('.webp', '')
    for (const w of [900, 1200]) {
      const out = path.join(dir, `${base}-${w}.webp`)
      await sharp(src).resize({ width: w, withoutEnlargement: true }).webp({ quality: 85 }).toFile(out)
    }
    count++
    console.log(`${slug}/${f} -> ${base}-900.webp, ${base}-1200.webp`)
  }
}

console.log(`\nDONE: ${count} images x2 variants`)
