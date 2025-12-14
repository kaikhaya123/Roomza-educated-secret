# Quick Payload Optimization Implementation Guide

## Changes Made So Far ✅

### 1. Intro.tsx - Hero Video Optimization
**Status:** ✅ IMPLEMENTED

**Changes:**
- Removed `autoPlay` attribute (was auto-playing 7.4 MB video immediately on page load)
- Changed `preload="metadata"` to `preload="none"` (loads only metadata, not video data)
- Implemented Intersection Observer for lazy loading
- Video now only plays when section comes into view (25% threshold)
- Added fallback for when autoplay is blocked by browser

**Impact:** Saves 7.4 MB initial download, defers to when user scrolls to section

**Before:**
```tsx
<video autoPlay loop muted playsInline preload="auto">
  {/* Loads entire 7.4MB video immediately on page load */}
</video>
```

**After:**
```tsx
<video loop muted playsInline preload="none">
  {/* Only loads when user scrolls section into view */}
</video>
```

---

### 2. CallToAction.tsx - Background Image Optimization
**Status:** ✅ IMPLEMENTED

**Changes:**
- Converted from CSS `backgroundImage` to Next.js `Image` component
- Added quality reduction (quality={75})
- Enabled lazy loading (loading="lazy")
- Set priority={false} since it's below the fold
- Added proper responsive sizes

**Impact:** Saves ~30-40% on image size through Next.js optimization

**Before:**
```tsx
<section style={{ backgroundImage: `url('/Images/porter-raab-*.jpg')` }}>
  {/* Full quality image loaded regardless of priority */}
</section>
```

**After:**
```tsx
<section className="relative">
  <Image
    src="/Images/porter-raab-Ucr4Yp-t364-unsplash.jpg"
    fill
    quality={75}
    loading="lazy"
    sizes="100vw"
  />
</section>
```

---

## Next Steps - Manual Implementation Required

These require video/image re-encoding and compression. **Must be done BEFORE production deployment:**

### HIGH PRIORITY (Week 1)

#### 1. **Convert Hero Video to WebM Format**
**File:** `14595546-hd_1920_1080_60fps.mp4` (7.4 MB)

**Command:**
```bash
# Install ffmpeg first
# macOS: brew install ffmpeg
# Windows: choco install ffmpeg
# Linux: sudo apt install ffmpeg

# Convert to WebM (better compression)
ffmpeg -i 14595546-hd_1920_1080_60fps.mp4 \
  -c:v libvpx-vp9 \
  -crf 30 \
  -b:v 0 \
  14595546-hd_1920_1080_60fps.webm
```

**Expected output:** 3.7 MB (50% smaller)

**Update code in Intro.tsx:**
```tsx
<video loop muted playsInline preload="none">
  <source src="/Videos/14595546-hd_1920_1080_60fps.webm" type="video/webm" />
  <source src="/Videos/14595546-hd_1920_1080_60fps.mp4" type="video/mp4" />
</video>
```

---

#### 2. **Compress Large Images to WebP/AVIF**

| Image | Size | Target | Tool |
|-------|------|--------|------|
| vertical-shot-curly...jpg | 12.9 MB | 2-3 MB | cwebp/imagemin |
| person-pressing-buzzer.jpg | 9.5 MB | 2-3 MB | cwebp/imagemin |
| cheerful-women-holding-trophy.jpg | 8.1 MB | 2-3 MB | cwebp/imagemin |

**Command (using cwebp):**
```bash
# Install webp tools
# macOS: brew install webp
# Windows: choco install webp

# Convert single image
cwebp -q 80 person-pressing-buzzer.jpg -o person-pressing-buzzer.webp

# Batch convert all JPGs
for file in *.jpg; do
  cwebp -q 80 "$file" -o "${file%.jpg}.webp"
done
```

**Expected results:**
- JPEG→WebP: 60-70% smaller
- Even better: Use AVIF for 20-30% further reduction

---

#### 3. **Reduce Image Dimensions**

Large parallax images are too big. Resize to web-appropriate dimensions:

```bash
# Reduce vertical-shot-curly to max 2048px width
ffmpeg -i "vertical-shot-curly-haired-millennial-girl-sits-crossed-legs-uses-mobile-phone-laptop-computer-connected-wireless.jpg" \
  -vf scale=2048:-1 \
  vertical-shot-curly-2048w.jpg

# Compress the resized version
jpegoptim --max=80 -p vertical-shot-curly-2048w.jpg
```

---

### MEDIUM PRIORITY (Week 2)

#### 4. **Create Responsive Image Variants**

For parallax images, create multiple sizes:

```bash
# Create 3 variants for responsive loading
for width in 768 1024 1920; do
  ffmpeg -i person-pressing-buzzer.jpg \
    -vf scale=$width:-1 \
    person-pressing-buzzer-${width}w.jpg
done

# Then convert each to WebP
for file in person-pressing-buzzer-*.jpg; do
  cwebp -q 80 "$file" -o "${file%.jpg}.webp"
done
```

Then update components to use responsive sizes:

```tsx
// TextParallaxHowItWorks.tsx
<picture>
  <source 
    srcSet="/Images/person-pressing-buzzer-1920w.webp 1920w,
            /Images/person-pressing-buzzer-1024w.webp 1024w,
            /Images/person-pressing-buzzer-768w.webp 768w"
    type="image/webp"
  />
  <img 
    src="/Images/person-pressing-buzzer.jpg"
    srcSet="/Images/person-pressing-buzzer-1920w.jpg 1920w,
            /Images/person-pressing-buzzer-1024w.jpg 1024w,
            /Images/person-pressing-buzzer-768w.jpg 768w"
    sizes="100vw"
    alt="Step content"
    loading="lazy"
  />
</picture>
```

---

#### 5. **Optimize Lottie Animations**

**Option A: Replace with CSS Animation (saves 0.7 MB)**
```tsx
// Instead of:
<DotLottiePlayer src="/lottie-files/Rewards Programme.lottie" />

// Use CSS keyframes:
<div className="rewards-animation">
  {/* CSS animation in styles */}
</div>

<style jsx>{`
  @keyframes slideIn {
    0% { transform: translateY(100%); opacity: 0; }
    100% { transform: translateY(0); opacity: 1; }
  }
  
  .rewards-animation {
    animation: slideIn 0.6s ease-out forwards;
  }
`}</style>
```

**Option B: Lazy load Lottie player**
```tsx
import dynamic from 'next/dynamic';

const DotLottiePlayer = dynamic(
  () => import('@dotlottie/react-player').then(mod => mod.DotLottiePlayer),
  { loading: () => <div>Loading...</div>, ssr: false }
);
```

---

## File Compression Tools

### Recommended Setup

**Install these tools:**
```bash
npm install --save-dev imagemin imagemin-webp imagemin-avif imagemin-mozjpeg

# Or use system tools
brew install ffmpeg webp imageoptim  # macOS
choco install ffmpeg webp            # Windows
sudo apt install ffmpeg webp         # Linux
```

---

## Testing Before & After

### Using DevTools Network Tab:

1. **Before:**
   - Open DevTools → Network tab
   - Reload page
   - Check total transfer size: ~43.9 MB
   - Check video file: 7.4 MB loading immediately

2. **After implementation:**
   - Total transfer should be < 16 MB
   - Hero video: 3.7 MB (and lazy-loaded)
   - Images: 2-3 MB each instead of 8-13 MB

### Using PageSpeed Insights:

1. Go to https://pagespeed.web.dev
2. Enter your site URL
3. Run audit
4. Check "Opportunity" section for "Large network payloads"
5. Should show significant improvement after changes

---

## Performance Impact Estimate

| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| Total Payload | 43.9 MB | ~16 MB | **64% reduction** |
| LCP | High | 2-3 sec | **40-50% faster** |
| FCP | High | 1-2 sec | **30-40% faster** |
| Mobile Data (4G) | ~12 sec | ~4 sec | **3x faster** |

---

## Priority Checklist

- [ ] Convert 14595546 video to WebM (7.4 MB → 3.7 MB)
- [ ] Compress person-pressing-buzzer.jpg to WebP (9.5 MB → 2-3 MB)
- [ ] Compress vertical-shot-curly image to WebP (12.9 MB → 2-3 MB)
- [ ] Compress cheerful-women-trophy image to WebP (8.1 MB → 2-3 MB)
- [ ] Reduce image dimensions to max 2048px width
- [ ] Update TextParallaxHowItWorks to use Next.js Image
- [ ] Optional: Replace Lottie with CSS animations
- [ ] Test with PageSpeed Insights
- [ ] Deploy and verify improvements

---

## Support

For questions on image compression:
- FFmpeg docs: https://ffmpeg.org/
- WebP guide: https://developers.google.com/speed/webp
- AVIF guide: https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Image_types#avif
