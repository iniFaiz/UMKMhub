import { reactive } from 'vue'

export const homeSearchState = reactive({
  query: '',
  docked: false
})

export const themeState = reactive({
  theme: 'auto',
  isDark: false
})

export function applyTheme(theme) {
  themeState.theme = theme
  localStorage.setItem('theme', theme)
  
  let shouldBeDark = false
  if (theme === 'auto') {
    shouldBeDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  } else {
    shouldBeDark = theme === 'dark'
  }
  
  themeState.isDark = shouldBeDark
  
  if (shouldBeDark) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

export function setThemeWithAnimation(newTheme, event) {
  const currentIsDark = themeState.isDark
  
  let nextIsDark = false
  if (newTheme === 'auto') {
    nextIsDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  } else {
    nextIsDark = newTheme === 'dark'
  }
  
  // Check if mobile screen to prevent backdrop-blur screenshot flicker
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
  
  // If no change, prefers-reduced-motion, no startViewTransition support, or is mobile:
  if (
    currentIsDark === nextIsDark ||
    !document.startViewTransition ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
    isMobile
  ) {
    applyTheme(newTheme)
    return
  }

  // Get mouse coordinates, or fall back to center of screen
  const x = event ? event.clientX : window.innerWidth / 2
  const y = event ? event.clientY : window.innerHeight / 2
  
  const endRadius = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y)
  )

  // Disable transitions and force solid backgrounds before capturing the old screenshot
  document.documentElement.classList.add('disable-transitions')
  if (typeof window !== 'undefined') {
    // Force synchronous layout reflow
    const _ = document.documentElement.offsetHeight
  }

  const transition = document.startViewTransition(() => {
    applyTheme(newTheme)
  })

  transition.ready.then(() => {
    document.documentElement.style.setProperty('--ripple-x', `${x}px`)
    document.documentElement.style.setProperty('--ripple-y', `${y}px`)
    document.documentElement.style.setProperty('--ripple-radius', `${endRadius}px`)
  })

  // Ensure standard CSS transitions are restored after view transition is finished
  transition.finished.then(() => {
    document.documentElement.classList.remove('disable-transitions')
  }).catch(() => {
    document.documentElement.classList.remove('disable-transitions')
  })
}

// Watch for system preference changes when 'auto' is active
if (typeof window !== 'undefined') {
  // Set initial state
  const initialTheme = localStorage.getItem('theme') || 'auto'
  
  let shouldBeDark = false
  if (initialTheme === 'auto') {
    shouldBeDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  } else {
    shouldBeDark = initialTheme === 'dark'
  }
  themeState.isDark = shouldBeDark
  themeState.theme = initialTheme
  
  if (shouldBeDark) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (themeState.theme === 'auto') {
      applyTheme('auto')
    }
  })
}
