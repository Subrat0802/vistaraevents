# Animation Reference Guide - Vistara Events

## Quick Animation Overview

### 🎬 Entrance Animations (Scroll-triggered)

| Section | Animation | Duration | Delay |
|---------|-----------|----------|-------|
| Stats | Fade-in + Scale up | 0.6s | Staggered 0.1s |
| Services | Fade-in + 3D Rotate | 0.6s | Staggered 0.1s |
| Gallery Items | Scale + Rotate | 0.5s | Staggered 0.05s |
| About Tags | Scale + Fade | 0.4s | Staggered 0.05s |
| Testimonials | 3D Flip | 0.6s | Sequential |
| Contact Fields | Fade + Slide | 0.5s | Staggered 0.1s |

---

### 🎯 Hover Animations

#### Stats Cards
```
Scale: 1 → 1.05
Duration: 0.3s
Easing: ease-out
```

#### Service Cards
```
Scale: 1 → 1.02
Number: Scale 1 → 1.2
Text Color: Muted → Gold
Duration: 0.3s
```

#### Gallery Items
```
Scale: 1 → 1.03
Image Zoom: 1 → 1.1
Overlay Fade: 0 → 1
Play Button Scale: 1 → 1.15
Duration: 0.3s
```

#### Contact Elements
```
Container: Scale 1 → 1.03, translateX +4px
Icon: Scale 1 → 1.15
Duration: 0.3s
```

#### Form Inputs
```
Border Color: Charcoal → Gold
Letter Spacing: 0 → 0.05em
Duration: 0.3s
```

#### Buttons
```
On Hover: Letter spacing increase
On Click: Scale down (0.98)
On Submit: Scale back to normal
Duration: 0.3s
```

---

### ✨ Continuous Animations (Infinite Loop)

#### Stats Numbers
```
Glow Effect: Text-shadow pulse
Duration: 3s
Repeat: Infinite
Delay between repeats: 2s
```

#### About Tags
```
Float Up/Down: y: [0, -3, 0]
Duration: 3s
Repeat: Infinite
Stagger: Each tag starts at different time
```

#### Testimonials Quote Mark
```
Scale Pulse: [0.8, 1, 0.8]
Opacity Pulse: [0.15, 0.35, 0.15]
Duration: 3s
Repeat: Infinite
```

#### Success Message (Contact)
```
Symbol Rotation: [0, 10, -10, 0]
Symbol Scale: [1, 1.1, 1]
Duration: 2s
Repeat: Infinite
```

---

### 🌊 Scroll-Based Animations

#### Hero Background Image
```
Transform: Parallax effect
Based on: scrollY [0, 600] → [0, 180]
Creates depth perception
```

#### Hero Title Opacity
```
Fade: Based on scrollY [0, 500] → [1, 0]
Creates fade-out effect as you scroll
```

---

### 📱 Mobile-Specific Animations

All animations scale based on device:
- **Reduced motion**: Respects `prefers-reduced-motion` if set
- **Smaller delays**: On mobile, stagger delays are maintained
- **Responsive typography**: Font sizes scale with viewport
- **Touch-friendly**: Larger hover targets on mobile

---

## Animation Timing Reference

### Spring Physics (Used in most animations)
```javascript
{
  type: "spring",
  stiffness: 100-120,
  damping: 25
}
```

### Standard Easing
```javascript
ease: "easeOut"      // For entrance animations
ease: "easeInOut"    // For continuous animations
ease: [0.25,0.1,0.25,1]  // Cubic-bezier for complex sequences
```

### Transition Durations
```
Very Fast:   0.3s  (Hover effects, color changes)
Fast:        0.4s  (Item entrance)
Medium:      0.6s  (Section entrance)
Slow:        0.8s  (Large section entry, complex sequences)
Very Slow:   1.2s  (Hero title entrance)
Infinite:    2-3s  (Continuous pulsing effects)
```

---

## Viewport Trigger Settings

```javascript
// Standard viewport detection
viewport={{
  once: true,           // Trigger animation only once
  margin: "-100px"      // Start animation 100px before entering
}}

// For gallery items
viewport={{
  once: true,
  margin: "-50px"       // Slightly earlier trigger for gallery
}}
```

---

## Color Animation Reference

### On Hover
```
Text: Muted (#7A7267) → Gold (#C9A84C)
Border: Transparent → Gold
Background: Transparent → Gold
```

### On Focus (Form inputs)
```
Border-bottom: Charcoal (#1A1A1A, 0.15) → Gold (#C9A84C)
```

### Preserved
```
No font color changes
All colors maintained from original design
```

---

## Performance Tips for Developers

1. **Animation GPU Acceleration**: All animations use `transform` and `opacity`
2. **Will-change**: Not explicitly set but implied by Framer Motion
3. **Reduced Motion**: Test with `prefers-reduced-motion: reduce` media query
4. **Frame Rate**: Optimized for 60fps on modern devices
5. **Memory**: Infinite animations have reasonable durations (2-3s)

---

## Testing Checklist

- [ ] All animations smooth on 60fps devices
- [ ] Mobile animations don't cause jank
- [ ] Hover states work on touch devices
- [ ] Scroll animations trigger at right times
- [ ] Form animations complete before submission
- [ ] Gallery zoom works on all browsers
- [ ] Testimonials auto-rotate at 5s intervals
- [ ] Stats counters reach target numbers

---

## Browser Support

- ✅ Chrome 90+
- ✅ Safari 14+
- ✅ Firefox 88+
- ✅ Edge 90+
- ⚠️ Mobile browsers: iOS Safari 14+, Chrome Mobile 90+

---

## Custom Animation Properties

### Stagger Delays Pattern
```javascript
// For 3-item grid
delay: (i % 3) * 0.1  // 0s, 0.1s, 0.2s, 0s, 0.1s, 0.2s...

// For sequential items
delay: 0.5 + i * 0.05  // 0.5s, 0.55s, 0.6s, 0.65s...
```

### Responsive Scale Values
```javascript
// Hover scale increases based on importance
Service card: 1.02   // Subtle
Stats card: 1.05     // More pronounced
Icon in contact: 1.15  // Most pronounced
```

---

**Last Updated**: April 7, 2026
**Version**: 1.0
**Status**: Production Ready ✅
