<script lang="ts">
  import '../app.css';
  import { onMount } from 'svelte';

  let { children } = $props();

  let cursorX = $state(0), cursorY = $state(0);
  let ringX = $state(0), ringY = $state(0);
  let hovering = $state(false);
  let menuOpen = $state(false);
  let scrolled = $state(false);
  let mounted = $state(false);

  const navLinks = [
    { href: '#about', label: 'About' },
    { href: '#projects', label: 'Projects' },
    { href: '#skills', label: 'Skills' },
    { href: '#contact', label: 'Contact' },
  ];

  onMount(() => {
    mounted = true;
    const moveCursor = (e: MouseEvent) => {
      cursorX = e.clientX; cursorY = e.clientY;
      ringX = e.clientX; ringY = e.clientY;
    };
    const checkHover = (e: MouseEvent) => {
      const t = e.target as Element;
      hovering = !!(t.closest('a') || t.closest('button') || t.closest('.hoverable'));
    };
    const onScroll = () => { scrolled = window.scrollY > 60; };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', checkHover);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', checkHover);
      window.removeEventListener('scroll', onScroll);
      observer.disconnect();
    };
  });
</script>

<svelte:head>
  <title>Ayo-Oluwole Oluwasomidotun John — Fullstack Developer</title>
</svelte:head>

<a href="#main" class="skip-link">Skip to content</a>

{#if mounted}
  <div class="cursor" class:hovering style="left: {cursorX}px; top: {cursorY}px;" aria-hidden="true"></div>
  <div class="cursor-ring" class:hovering style="left: {ringX}px; top: {ringY}px;" aria-hidden="true"></div>
{/if}

<div class="grid-bg" aria-hidden="true"></div>
<div class="orb orb-1" aria-hidden="true"></div>
<div class="orb orb-2" aria-hidden="true"></div>
<div class="orb orb-3" aria-hidden="true"></div>

<nav class="nav" class:scrolled aria-label="Main navigation">
  <div class="nav-inner">
    <a href="#hero" class="nav-logo" aria-label="Home">
      <span class="logo-bracket">[</span><span class="logo-text">AOJ</span><span class="logo-bracket">]</span>
    </a>
    <ul class="nav-links" role="list">
      {#each navLinks as link, i}
        <li><a href={link.href} class="nav-link"><span class="nav-num">0{i+1}.</span>{link.label}</a></li>
      {/each}
      <li><a href="#contact" class="btn-primary">Hire Me</a></li>
    </ul>
    <button class="hamburger" class:open={menuOpen} onclick={() => menuOpen = !menuOpen}
      aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen}>
      <span></span><span></span><span></span>
    </button>
  </div>
  {#if menuOpen}
    <div class="mobile-menu">
      <ul role="list">
        {#each navLinks as link}
          <li><a href={link.href} class="mobile-link" onclick={() => menuOpen = false}>{link.label}</a></li>
        {/each}
        <li><a href="#contact" class="btn-primary" onclick={() => menuOpen = false}>Hire Me</a></li>
      </ul>
    </div>
  {/if}
</nav>

<main id="main" tabindex="-1">
  {@render children()}
</main>

<footer class="footer">
  <div class="footer-inner">
    <p class="footer-text">Designed & built by <span class="neon-text">Ayo-Oluwole Oluwasomidotun John</span></p>
    <p class="footer-sub">Fullstack Developer · 2025</p>
  </div>
</footer>

<style>
  .nav { position: fixed; top: 0; left: 0; right: 0; z-index: 100; padding: 20px 0; transition: all 0.3s ease; }
  .nav.scrolled { background: rgba(2,4,8,0.92); backdrop-filter: blur(20px); padding: 12px 0; border-bottom: 1px solid var(--border); }
  .nav-inner { max-width: 1200px; margin: 0 auto; padding: 0 40px; display: flex; align-items: center; justify-content: space-between; }
  .nav-logo { font-family: var(--font-display); font-size: 1.1rem; font-weight: 700; text-decoration: none; color: var(--text-primary); }
  .logo-bracket { color: var(--neon-cyan); text-shadow: 0 0 10px var(--neon-cyan); }
  .nav-links { display: flex; align-items: center; gap: 32px; list-style: none; }
  .nav-link { font-family: var(--font-mono); font-size: 0.78rem; color: var(--text-secondary); text-decoration: none; transition: color 0.2s; display: flex; align-items: center; gap: 5px; }
  .nav-link:hover { color: var(--neon-cyan); }
  .nav-num { color: var(--neon-cyan); font-size: 0.7rem; }
  .hamburger { display: none; flex-direction: column; gap: 5px; background: none; border: none; padding: 4px; }
  .hamburger span { display: block; width: 24px; height: 2px; background: var(--text-primary); transition: all 0.3s; transform-origin: center; }
  .hamburger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
  .hamburger.open span:nth-child(2) { opacity: 0; }
  .hamburger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }
  .mobile-menu { padding: 20px 40px 28px; border-top: 1px solid var(--border); background: rgba(2,4,8,0.98); backdrop-filter: blur(20px); }
  .mobile-menu ul { list-style: none; display: flex; flex-direction: column; gap: 20px; }
  .mobile-link { font-family: var(--font-mono); font-size: 1rem; color: var(--text-secondary); text-decoration: none; transition: color 0.2s; }
  .mobile-link:hover { color: var(--neon-cyan); }
  main { position: relative; z-index: 2; }
  .footer { position: relative; z-index: 2; border-top: 1px solid var(--border); padding: 40px 0; text-align: center; }
  .footer-inner { max-width: 1200px; margin: 0 auto; padding: 0 40px; }
  .footer-text { font-family: var(--font-mono); font-size: 0.8rem; color: var(--text-secondary); margin-bottom: 6px; }
  .footer-sub { font-size: 0.75rem; color: var(--text-muted); font-family: var(--font-mono); }
  @media (max-width: 768px) { .nav-links { display: none; } .hamburger { display: flex; } .nav-inner { padding: 0 20px; } }
</style>
