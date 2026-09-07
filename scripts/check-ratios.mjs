import sharp from 'sharp'
import fs from 'node:fs'
import path from 'node:path'

const BASE = path.resolve('public')
const files = []
const walk = p => {
  for (const f of fs.readdirSync(p, { withFileTypes: true })) {
    const fp = path.join(p, f.name)
    if (f.isDirectory()) walk(fp)
    else if (/\.(webp|png|jpe?g)$/i.test(f.name)) files.push(fp)
  }
}
walk(BASE)

const bad = []
for (const fp of files) {
  const m = await sharp(fp).metadata()
  const r = m.width / m.height
  if (Math.abs(r - 16 / 9) > 0.02) {
    bad.push(`${path.relative(BASE, fp)} ${m.width}x${m.height} ratio=${r.toFixed(3)}`)
  }
}
console.log(bad.length ? `NOT 16:9:\n${bad.join('\n')}` : `ALL ${files.length} images are 16:9`)
