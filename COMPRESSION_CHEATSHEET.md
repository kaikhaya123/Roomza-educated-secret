# One-Liner Command Cheat Sheet

## Quick Commands for Image/Video Compression

### Convert Video to WebM (50% size reduction)
```bash
ffmpeg -i 14595546-hd_1920_1080_60fps.mp4 -c:v libvpx-vp9 -crf 30 -b:v 0 14595546-hd_1920_1080_60fps.webm
```

### Convert JPG to WebP (60-70% size reduction)
```bash
cwebp -q 80 person-pressing-buzzer.jpg -o person-pressing-buzzer.webp
```

### Batch Convert All JPGs in Directory
```bash
for file in *.jpg; do cwebp -q 80 "$file" -o "${file%.jpg}.webp"; done
```

### Resize Image to Max 2048px Width
```bash
ffmpeg -i vertical-shot-curly.jpg -vf scale=2048:-1 vertical-shot-curly-2048w.jpg
```

### Compress JPEG Quality
```bash
jpegoptim --max=80 -p vertical-shot-curly-2048w.jpg
```

### Convert to AVIF (Best Compression)
```bash
avifenc --min 0 --max 63 person-pressing-buzzer.jpg person-pressing-buzzer.avif
```

### Check File Size
```bash
# macOS/Linux
ls -lh *.jpg *.webp *.webm

# Windows PowerShell
Get-ChildItem -File | ForEach-Object { Write-Host "$($_.Name) - $($_.Length / 1MB) MB" }
```

---

## Installation

### macOS
```bash
brew install ffmpeg webp imagemagick
```

### Windows (Chocolatey)
```powershell
choco install ffmpeg webp
```

### Linux
```bash
sudo apt install ffmpeg webp imagemagick
```

---

## File Sizes Before → After

| File | Before | Command | After | Savings |
|------|--------|---------|-------|---------|
| `14595546-hd_1920_1080_60fps.mp4` | 7.4 MB | `ffmpeg → webm` | 3.7 MB | 50% |
| `person-pressing-buzzer.jpg` | 9.5 MB | `cwebp -q 80` | 2.8 MB | 70% |
| `vertical-shot-curly.jpg` | 12.9 MB | `cwebp -q 80 + resize` | 3.2 MB | 75% |
| `cheerful-women-trophy.jpg` | 8.1 MB | `cwebp -q 80 + resize` | 2.4 MB | 70% |
| `porter-raab.jpg` | 1.9 MB | `cwebp -q 75` | 1.1 MB | 42% |

---

## Implementation Order

1. **Minute 1-5:** Convert hero video
   ```bash
   ffmpeg -i 14595546-hd_1920_1080_60fps.mp4 -c:v libvpx-vp9 -crf 30 -b:v 0 14595546-hd_1920_1080_60fps.webm
   ```

2. **Minute 5-20:** Resize and compress large images
   ```bash
   ffmpeg -i vertical-shot-curly.jpg -vf scale=2048:-1 vertical-shot-curly-2048w.jpg
   cwebp -q 80 vertical-shot-curly-2048w.jpg -o vertical-shot-curly-2048w.webp
   ```

3. **Minute 20-35:** Do the same for other 2 large images

4. **Minute 35-40:** Copy files to `/public/Videos` and `/public/Images`

5. **Minute 40-45:** Update code to reference new files

6. **Minute 45-60:** Test and deploy

---

## Files to Create/Update

### New Files to Create (compressed versions)
```
/public/Videos/
  ├── 14595546-hd_1920_1080_60fps.webm          (NEW)
  ├── 14595546-hd_1920_1080_60fps.mp4           (KEEP for fallback)

/public/Images/
  ├── person-pressing-buzzer.webp                (NEW)
  ├── person-pressing-buzzer.jpg                 (KEEP for fallback)
  ├── vertical-shot-curly-2048w.webp             (NEW)
  ├── vertical-shot-curly-2048w.jpg              (KEEP for fallback)
  ├── cheerful-women-holding-trophy.webp         (NEW)
  ├── cheerful-women-holding-trophy.jpg          (KEEP for fallback)
```

### Code Files to Update
1. `src/components/home/Intro.tsx` - ✅ DONE (lazy loading)
2. `src/components/home/CallToAction.tsx` - ✅ DONE (Image component)
3. `src/components/home/TextParallaxHowItWorks.tsx` - TODO: Add picture element
4. `src/components/home/HowItWorks.tsx` - TODO: Add quality attribute

---

## Verification Checklist

After implementing changes:

- [ ] File sizes reduced to targets shown above
- [ ] Old MP4 still works (for fallback)
- [ ] WebP files created successfully
- [ ] Code updated with new file paths
- [ ] DevTools Network tab shows smaller files
- [ ] Video plays when section scrolls into view
- [ ] PageSpeed Insights shows improvement
- [ ] No visual quality loss noticed

---

## Support Commands

### Show compression ratio
```bash
# macOS/Linux
du -h old-file && du -h new-file

# PowerShell
(Get-Item 'old-file').Length / (Get-Item 'new-file').Length
```

### Verify format conversion worked
```bash
file *.webp *.webm
```

### Test video playback
```bash
# Can also just open in browser or VLC
```

---

**Total Time to Complete:** ~60 minutes  
**Estimated Performance Gain:** 40-50% faster LCP, 64% payload reduction
