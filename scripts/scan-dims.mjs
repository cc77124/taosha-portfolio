import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

const SRC = path.resolve('..')
const folders = fs.readdirSync(SRC).filter(n => /^\d/.test(n)).sort((a, b) => parseInt(a) - parseInt(b))

for (const folder of folders) {
  const files = fs.readdirSync(path.join(SRC, folder)).filter(f => /\.(jpe?g|png)$/i.test(f)).sort()
  const results = []
  for (const f of files) {
    const m = await sharp(path.join(SRC, folder, f)).metadata()
    const r = (m.width / m.height).toFixed(3)
    results.push(`${f} ${m.width}x${m.height} (${r})${Math.abs(r - 16 / 9) > 0.02 ? ' <-- NOT 16:9' : ''}`)
  }
  console.log(`\n== ${folder} ==`)
  console.log(results.join('\n'))
}
