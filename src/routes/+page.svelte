<script lang="ts">
  import { onMount } from 'svelte';

  // --- HERO TYPED TEXT ---
  let typedText = $state('');
  const roles = ['Fullstack Developer', 'React Engineer', 'Node.js Architect', 'UI/UX Enthusiast', 'Problem Solver'];
  let roleIdx = 0;

  // --- CONTACT FORM ---
  let formName = $state('');
  let formEmail = $state('');
  let formMsg = $state('');
  let formSent = $state(false);
  let formError = $state('');

  // --- PROJECTS ---
  type Project = {
    title: string;
    category: 'Web App' | 'Dashboard' | 'Mobile' | 'Platform';
    desc: string;
    tech: string[];
    color: string;
    icon: string;
    live: string;
    github: string;
    impact: string;
    role: string;
    preview: string[];
  };

  const projects: Project[] = [
    {
      title: 'NexaCommerce',
      category: 'Platform',
      desc: 'A high-performance e-commerce platform with real-time inventory management, AI-powered recommendations, and seamless payment integration.',
      tech: ['React', 'Node.js', 'PostgreSQL', 'Redis', 'Stripe'],
      color: '#00f5ff',
      icon: 'NC',
      live: 'https://github.com/somidotun',
      github: 'https://github.com/somidotun',
      impact: 'Designed a conversion-focused storefront flow with cached catalog reads and resilient checkout states.',
      role: 'Frontend architecture, API contracts, dashboard UX, performance tuning',
      preview: ['Inventory sync', 'Checkout flow', 'Recommendations']
    },
    {
      title: 'DevPulse Analytics',
      category: 'Dashboard',
      desc: 'Real-time developer productivity dashboard with GitHub integration, sprint tracking, and intelligent bottleneck detection powered by ML.',
      tech: ['SvelteKit', 'Python', 'FastAPI', 'MongoDB', 'WebSocket'],
      color: '#7c3aed',
      icon: 'DP',
      live: 'https://github.com/somidotun',
      github: 'https://github.com/somidotun',
      impact: 'Built streaming metrics views that help teams spot review delays and sprint risk early.',
      role: 'SvelteKit UI, live charting, state modeling, API integration',
      preview: ['Sprint health', 'Review latency', 'Throughput']
    },
    {
      title: 'CloudNest',
      category: 'Web App',
      desc: 'Collaborative cloud workspace with live document editing, team permissions, version history, and end-to-end encryption.',
      tech: ['Next.js', 'TypeScript', 'AWS', 'Socket.io', 'Prisma'],
      color: '#00ff88',
      icon: 'CN',
      live: 'https://github.com/somidotun',
      github: 'https://github.com/somidotun',
      impact: 'Created a collaborative editing surface with permission-aware navigation and conflict-friendly save states.',
      role: 'Product UI, realtime collaboration, access control flows',
      preview: ['Document room', 'Permissions', 'Version history']
    },
    {
      title: 'SwiftChat',
      category: 'Mobile',
      desc: 'End-to-end encrypted messaging app with voice/video calls, file sharing, disappearing messages, and custom bots API.',
      tech: ['React Native', 'Go', 'WebRTC', 'Firebase', 'Docker'],
      color: '#ff006e',
      icon: 'SC',
      live: 'https://github.com/somidotun',
      github: 'https://github.com/somidotun',
      impact: 'Shaped a touch-first messaging experience with clear call states, delivery feedback, and encrypted media flows.',
      role: 'Mobile UX, WebRTC states, message lifecycle, deployment packaging',
      preview: ['Chat thread', 'Call room', 'Media vault']
    },
    {
      title: 'Cinematic Portfolio',
      category: 'Web App',
      desc: 'This portfolio experience, built with SvelteKit, particle animation, project filtering, theme persistence, and cinematic case-study transitions.',
      tech: ['SvelteKit', 'TypeScript', 'Canvas', 'CSS', 'Accessibility'],
      color: '#ff9500',
      icon: 'AO',
      live: 'https://github.com/somidotun',
      github: 'https://github.com/somidotun',
      impact: 'Turned a static portfolio into an interactive product showcase with motion, reduced-motion support, and keyboard-friendly controls.',
      role: 'Interaction design, Svelte state, responsive UI, accessibility pass',
      preview: ['Hero system', 'Case studies', 'Theme engine']
    },
    {
      title: 'AgriTrack',
      category: 'Platform',
      desc: 'Smart agriculture management platform for Nigerian farmers with IoT sensor integration, weather predictions, and market price analytics.',
      tech: ['Vue.js', 'Django', 'PostgreSQL', 'MQTT', 'TensorFlow'],
      color: '#00f5ff',
      icon: 'AT',
      live: 'https://github.com/somidotun',
      github: 'https://github.com/somidotun',
      impact: 'Designed farmer-friendly operational screens for sensor alerts, weather planning, and market price comparisons.',
      role: 'UX flows, dashboard composition, backend integration, data visualization',
      preview: ['Sensor alerts', 'Weather plan', 'Market prices']
    }
  ];
  const projectFilters = ['All', 'Web App', 'Dashboard', 'Mobile', 'Platform'] as const;
  let activeFilter = $state<(typeof projectFilters)[number]>('All');
  let selectedProject = $state<Project | null>(null);
  let filteredProjects = $derived(
    activeFilter === 'All' ? projects : projects.filter((project) => project.category === activeFilter)
  );

  // --- SKILLS ---
  const skillGroups = [
    {
      label: 'Frontend',
      icon: '⚡',
      skills: ['React', 'SvelteKit', 'Next.js', 'TypeScript', 'Vue.js', 'Tailwind CSS', 'GSAP', 'Three.js']
    },
    {
      label: 'Backend',
      icon: '🔧',
      skills: ['Node.js', 'Express', 'FastAPI', 'REST APIs']
    },
    {
      label: 'Database & Cloud',
      icon: '☁️',
      skills: ['PostgreSQL', 'MongoDB', 'Redis', 'MySQL', 'Firebase']
    },
    {
      label: 'Tools & Practices',
      icon: '🛠️',
      skills: ['Git', 'CI/CD', 'Agile/Scrum', 'Testing', 'WebSockets', 'WebRTC', 'Microservices', 'Linux']
    }
  ];

  onMount(() => {
    // Typing animation
    let charIdx = 0, deleting = false, delay = 0;
    const type = () => {
      const current = roles[roleIdx];
      if (!deleting) {
        typedText = current.slice(0, ++charIdx);
        if (charIdx === current.length) { deleting = true; delay = 1800; }
        else delay = 80;
      } else {
        typedText = current.slice(0, --charIdx);
        if (charIdx === 0) { deleting = false; roleIdx = (roleIdx + 1) % roles.length; delay = 400; }
        else delay = 40;
      }
      setTimeout(type, delay);
    };
    setTimeout(type, 1000);

    // Particle canvas
    initParticles();
  });

  function initParticles() {
    const canvas = document.getElementById('particles') as HTMLCanvasElement;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    let W = canvas.width = window.innerWidth;
    let H = canvas.height = window.innerHeight;

    const particles: { x: number; y: number; vx: number; vy: number; size: number; opacity: number }[] = [];
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * W, y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.5 + 0.1
      });
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 245, 255, ${p.opacity})`;
        ctx.fill();
      });
      // Draw lines between close particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0, 245, 255, ${0.08 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(draw);
    }
    draw();
    window.addEventListener('resize', () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; });
  }

  function handleContact(e: SubmitEvent) {
    e.preventDefault();
    if (!formName || !formEmail || !formMsg) { formError = 'Please fill in all fields.'; return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formEmail)) { formError = 'Enter a valid email address.'; return; }
    formError = '';
    const subject = encodeURIComponent(`Portfolio inquiry from ${formName}`);
    const body = encodeURIComponent(`${formMsg}\n\nFrom: ${formName}\nEmail: ${formEmail}`);
    window.location.href = `mailto:damilarejohns07@gmail.com?subject=${subject}&body=${body}`;
    formSent = true;
  }

  function resetForm() { formName = ''; formEmail = ''; formMsg = ''; formSent = false; }

  function closeModalFromBackdrop(e: MouseEvent) {
    if (e.target === e.currentTarget) selectedProject = null;
  }
</script>

<svelte:window onkeydown={(e) => e.key === 'Escape' && (selectedProject = null)} />

<!-- HERO -->
<section id="hero" class="hero">
  <canvas id="particles" class="particles" aria-hidden="true"></canvas>

  <div class="hero-content">
    <div class="hero-badge reveal">
      <span class="badge-dot"></span>
      <span>Available for hire</span>
    </div>

    <p class="hero-greeting reveal" style="animation-delay: 0.1s">Hello, World. I'm</p>

    <h1 class="hero-name reveal" style="animation-delay: 0.2s">
      <span class="name-first">Ayo-Oluwole</span><br>
      <span class="name-last">Oluwasomidotun</span>
    </h1>

    <div class="hero-role reveal" style="animation-delay: 0.3s">
      <span class="role-prefix">// </span>
      <span class="typed-text">{typedText}</span>
      <span class="cursor-blink">|</span>
    </div>

    <p class="hero-bio reveal" style="animation-delay: 0.4s">
      Crafting high-performance digital experiences from Lagos, Nigeria.
      I build scalable fullstack applications that merge technical excellence with stunning UI.
    </p>

    <div class="hero-actions reveal" style="animation-delay: 0.5s">
      <a href="#projects" class="btn-primary">View My Work →</a>
      <a href="#contact" class="btn-secondary">Get In Touch</a>
      <a href="/resume.txt" class="btn-secondary" download>Download Resume</a>
    </div>

    <div class="hero-socials reveal" style="animation-delay: 0.6s">
      <a href="https://github.com/somidotun" target="_blank" rel="noopener noreferrer" aria-label="GitHub" class="social-link">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
      </a>
      <a href="https://www.linkedin.com/in/ayo-oluwole-oluwasomidotun-51a94522a/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" class="social-link">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
      </a>
      <a href="mailto:damilarejohns07@gmail.com" aria-label="Email" class="social-link">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
      </a>
      <!-- <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" class="social-link">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
      </a> -->
    </div>
  </div>

  <div class="hero-decoration" aria-hidden="true">
    <div class="deco-ring deco-ring-1"></div>
    <div class="deco-ring deco-ring-2"></div>
    <div class="deco-ring deco-ring-3"></div>
    <div class="deco-code">
      <div class="code-line"><span class="c-purple">const</span> <span class="c-blue">developer</span> = {'{'}</div>
      <div class="code-line">  <span class="c-cyan">name</span>: <span class="c-green">"Ayo-Oluwole"</span>,</div>
      <div class="code-line">  <span class="c-cyan">stack</span>: [<span class="c-green">"React"</span>, <span class="c-green">"Node"</span>],</div>
      <div class="code-line">  <span class="c-cyan">location</span>: <span class="c-green">"Lagos, NG"</span>,</div>
      <div class="code-line">  <span class="c-cyan">available</span>: <span class="c-purple">true</span></div>
      <div class="code-line">{'}'}</div>
    </div>
  </div>

  <div class="hero-scroll-hint" aria-hidden="true">
    <span>scroll</span>
    <div class="scroll-line"></div>
  </div>
</section>

<!-- ABOUT -->
<section id="about" class="section">
  <div class="container">
    <div class="section-label reveal">About Me</div>
    <div class="about-grid">
      <div class="about-text">
        <h2 class="section-title reveal">
          Turning ideas into<br><span class="neon-text">digital reality</span>
        </h2>
        <p class="about-para reveal">
          I'm <strong>Ayo-Oluwole Oluwasomidotun John</strong>, a passionate Fullstack Developer based in Lagos, Nigeria.
          I specialize in building end-to-end web applications that are fast, accessible, and beautifully crafted.
        </p>
        <p class="about-para reveal">
          With expertise spanning from pixel-perfect frontends to robust backend architectures,
          I bridge the gap between design and engineering to deliver products users love.
          I thrive in teams that value clean code, thoughtful architecture, and continuous learning.
        </p>
        <div class="about-stats reveal">
          <div class="stat">
            <span class="stat-num neon-text">3+</span>
            <span class="stat-label">Years Experience</span>
          </div>
          <div class="stat">
            <span class="stat-num neon-text">20+</span>
            <span class="stat-label">Projects Shipped</span>
          </div>
          <div class="stat">
            <span class="stat-num neon-text">10+</span>
            <span class="stat-label">Happy Clients</span>
          </div>
        </div>
      </div>
      <div class="about-image-wrap reveal">
        <div class="about-image">
          <div class="img-placeholder">
            <div class="avatar-ring"></div>
            <div class="avatar-inner">
              <span class="avatar-initials">AOJ</span>
            </div>
          </div>
          <div class="img-deco-1"></div>
          <div class="img-deco-2"></div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- PROJECTS -->
<section id="projects" class="section">
  <div class="container">
    <div class="section-label reveal">Featured Work</div>
    <h2 class="section-title reveal">Projects that <span class="neon-text">ship</span></h2>
    <p class="section-sub reveal">A selection of products I've built — from idea to production.</p>

    <div class="project-filters reveal" aria-label="Project filters">
      {#each projectFilters as filter}
        <button
          class:active={activeFilter === filter}
          class="filter-btn"
          type="button"
          onclick={() => activeFilter = filter}
          aria-pressed={activeFilter === filter}
        >
          {filter}
        </button>
      {/each}
    </div>

    <div class="projects-grid">
      {#each filteredProjects as project, i}
        <article class="project-card glass-card reveal" style="animation-delay: {i * 0.1}s; --card-color: {project.color}">
          <figure class="project-preview" aria-label="{project.title} interface preview">
            <div class="preview-topbar"><span></span><span></span><span></span></div>
            <div class="preview-body">
              {#each project.preview as item, previewIndex}
                <span style="--preview-index: {previewIndex}">{item}</span>
              {/each}
            </div>
          </figure>
          <div class="project-header">
            <span class="project-icon">{project.icon}</span>
            <span class="project-category">{project.category}</span>
            <div class="project-links">
              <a href={project.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" class="project-link-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
              </a>
              <a href={project.live} target="_blank" rel="noopener noreferrer" aria-label="Live Demo" class="project-link-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              </a>
            </div>
          </div>
          <h3 class="project-title">{project.title}</h3>
          <p class="project-desc">{project.desc}</p>
          <div class="project-tech">
            {#each project.tech as tech}
              <span class="tech-tag">{tech}</span>
            {/each}
          </div>
          <button type="button" class="case-study-btn" onclick={() => selectedProject = project}>
            Open case study
          </button>
          <div class="project-glow" aria-hidden="true"></div>
        </article>
      {/each}
    </div>
  </div>
</section>

{#if selectedProject}
  <div class="modal-backdrop" role="presentation" onclick={closeModalFromBackdrop}>
    <div
      class="case-modal glass-card"
      role="dialog"
      aria-modal="true"
      aria-labelledby="case-title"
      style="--card-color: {selectedProject.color}"
    >
      <button class="modal-close" type="button" onclick={() => selectedProject = null} aria-label="Close case study">x</button>
      <div class="modal-preview project-preview" aria-label="{selectedProject.title} expanded interface preview">
        <div class="preview-topbar"><span></span><span></span><span></span></div>
        <div class="preview-body">
          {#each selectedProject.preview as item, previewIndex}
            <span style="--preview-index: {previewIndex}">{item}</span>
          {/each}
        </div>
      </div>
      <p class="project-category">{selectedProject.category}</p>
      <h3 id="case-title">{selectedProject.title}</h3>
      <p>{selectedProject.desc}</p>
      <div class="case-grid">
        <div>
          <span class="case-label">Impact</span>
          <p>{selectedProject.impact}</p>
        </div>
        <div>
          <span class="case-label">Role</span>
          <p>{selectedProject.role}</p>
        </div>
      </div>
      <div class="project-tech">
        {#each selectedProject.tech as tech}
          <span class="tech-tag">{tech}</span>
        {/each}
      </div>
      <div class="modal-actions">
        <a href={selectedProject.live} class="btn-primary" target="_blank" rel="noopener noreferrer">Live Demo</a>
        <a href={selectedProject.github} class="btn-secondary" target="_blank" rel="noopener noreferrer">GitHub Repo</a>
      </div>
    </div>
  </div>
{/if}

<!-- SKILLS -->
<section id="skills" class="section">
  <div class="container">
    <div class="section-label reveal">Technical Skills</div>
    <h2 class="section-title reveal">My <span class="neon-text">arsenal</span></h2>

    <div class="skills-grid">
      {#each skillGroups as group, i}
        <div class="skill-group glass-card reveal" style="animation-delay: {i * 0.1}s">
          <div class="skill-group-header">
            <span class="skill-icon">{group.icon}</span>
            <h3 class="skill-group-title">{group.label}</h3>
          </div>
          <div class="skill-tags">
            {#each group.skills as skill}
              <span class="skill-tag hoverable">{skill}</span>
            {/each}
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- CONTACT -->
<section id="contact" class="section">
  <div class="container">
    <div class="section-label reveal">Get In Touch</div>
    <h2 class="section-title reveal">Let's build something <span class="neon-text">great</span></h2>
    <p class="section-sub reveal">Open to fulltime roles, freelance projects, and collaborations.</p>

    <div class="contact-grid">
      <div class="contact-info reveal">
        <div class="contact-item">
          <span class="contact-icon">📍</span>
          <div>
            <p class="contact-label">Location</p>
            <p class="contact-value">Lagos, Nigeria</p>
          </div>
        </div>
        <div class="contact-item">
          <span class="contact-icon">📧</span>
          <div>
            <p class="contact-label">Email</p>
            <p class="contact-value">damilarejohns07@gmail.com</p>
          </div>
        </div>
        <div class="contact-item">
          <span class="contact-icon">💼</span>
          <div>
            <p class="contact-label">LinkedIn</p>
            <p class="contact-value">https://www.linkedin.com/in/ayo-oluwole-oluwasomidotun-51a94522a/</p>
          </div>
        </div>
        <div class="contact-item">
          <span class="contact-icon">⚡</span>
          <div>
            <p class="contact-label">Status</p>
            <p class="contact-value" style="color: var(--neon-green)">Available for hire</p>
          </div>
        </div>
      </div>

      <div class="contact-form-wrap reveal">
        {#if formSent}
          <div class="form-success">
            <div class="success-icon">✅</div>
            <h3>Message sent!</h3>
            <p>Thanks for reaching out. I'll get back to you within 24 hours.</p>
            <button class="btn-primary" onclick={resetForm}>Send another</button>
          </div>
        {:else}
          <form class="contact-form" onsubmit={handleContact} novalidate>
            {#if formError}<p class="form-error" role="alert">{formError}</p>{/if}
            <div class="form-group">
              <label for="name" class="form-label">Name</label>
              <input id="name" type="text" class="form-input" placeholder="Your name" bind:value={formName} autocomplete="name" />
            </div>
            <div class="form-group">
              <label for="email" class="form-label">Email</label>
              <input id="email" type="email" class="form-input" placeholder="your@email.com" bind:value={formEmail} autocomplete="email" />
            </div>
            <div class="form-group">
              <label for="message" class="form-label">Message</label>
              <textarea id="message" class="form-input form-textarea" placeholder="Tell me about your project..." bind:value={formMsg} rows="5"></textarea>
            </div>
            <button type="submit" class="btn-primary" style="width: 100%; justify-content: center;">
              Send Message →
            </button>
          </form>
        {/if}
      </div>
    </div>
  </div>
</section>

<style>
  /* HERO */
  .hero {
    position: relative;
    min-height: 100vh;
    display: flex;
    align-items: center;
    padding: 100px 40px 60px;
    overflow: hidden;
  }

  .particles {
    position: absolute;
    inset: 0;
    z-index: 0;
    opacity: 0.6;
  }

  .hero-content {
    position: relative;
    z-index: 2;
    max-width: 640px;
    flex: 1;
  }

  .hero-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 6px 14px;
    border: 1px solid rgba(0, 255, 136, 0.3);
    border-radius: 20px;
    background: rgba(0, 255, 136, 0.06);
    font-family: var(--font-mono);
    font-size: 0.72rem;
    color: var(--neon-green);
    letter-spacing: 0.08em;
    margin-bottom: 24px;
  }

  .badge-dot {
    width: 7px; height: 7px;
    background: var(--neon-green);
    border-radius: 50%;
    box-shadow: 0 0 8px var(--neon-green);
    animation: pulse-dot 2s ease-in-out infinite;
  }

  @keyframes pulse-dot {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.6; transform: scale(0.8); }
  }

  .hero-greeting {
    font-family: var(--font-mono);
    font-size: 0.9rem;
    color: var(--text-secondary);
    margin-bottom: 12px;
    letter-spacing: 0.05em;
  }

  .hero-name {
    font-family: var(--font-display);
    font-size: clamp(2.4rem, 6vw, 4.5rem);
    font-weight: 900;
    line-height: 1.05;
    margin-bottom: 20px;
    letter-spacing: -0.02em;
  }

  .name-first {
    display: block;
    color: var(--text-primary);
  }

  .name-last {
    display: block;
    background: linear-gradient(135deg, var(--neon-cyan), var(--neon-blue));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .hero-role {
    font-family: var(--font-mono);
    font-size: 1rem;
    color: var(--text-secondary);
    margin-bottom: 24px;
    min-height: 1.6em;
  }

  .c-purple { color: #c678dd; }
  .c-blue { color: #61afef; }
  .c-cyan { color: var(--neon-cyan); }
  .c-green { color: var(--neon-green); }

  .role-prefix { color: var(--neon-purple); }
  .typed-text { color: var(--neon-cyan); }
  .cursor-blink {
    color: var(--neon-cyan);
    animation: blink 0.8s step-end infinite;
  }
  @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }

  .hero-bio {
    font-size: 1.05rem;
    color: var(--text-secondary);
    line-height: 1.7;
    margin-bottom: 36px;
    max-width: 500px;
  }

  .hero-actions {
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
    margin-bottom: 40px;
  }

  .hero-socials {
    display: flex;
    gap: 16px;
  }

  .social-link {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px; height: 40px;
    border: 1px solid var(--border);
    border-radius: 8px;
    color: var(--text-secondary);
    text-decoration: none;
    transition: all 0.2s;
  }

  .social-link:hover {
    border-color: var(--neon-cyan);
    color: var(--neon-cyan);
    box-shadow: var(--glow-cyan);
    transform: translateY(-2px);
  }

  .hero-decoration {
    position: absolute;
    right: 8%;
    top: 50%;
    transform: translateY(-50%);
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .deco-ring {
    position: absolute;
    border: 1px solid;
    border-radius: 50%;
    animation: spin-slow linear infinite;
  }

  .deco-ring-1 {
    width: 320px; height: 320px;
    border-color: rgba(0, 245, 255, 0.1);
    animation-duration: 20s;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
  }

  .deco-ring-2 {
    width: 240px; height: 240px;
    border-color: rgba(124, 58, 237, 0.15);
    animation-duration: 14s;
    animation-direction: reverse;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
  }

  .deco-ring-3 {
    width: 160px; height: 160px;
    border-color: rgba(0, 245, 255, 0.2);
    animation-duration: 8s;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
  }

  @keyframes spin-slow { from { transform: translate(-50%, -50%) rotate(0deg); } to { transform: translate(-50%, -50%) rotate(360deg); } }

  .deco-code {
    font-family: var(--font-mono);
    font-size: 0.72rem;
    line-height: 1.8;
    color: var(--text-muted);
    background: rgba(5, 20, 40, 0.8);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 20px 24px;
    backdrop-filter: blur(12px);
    position: relative;
    z-index: 2;
    width: 260px;
  }

  .code-line { line-height: 1.9; }

  .hero-scroll-hint {
    position: absolute;
    bottom: 40px;
    left: 40px;
    display: flex;
    align-items: center;
    gap: 12px;
    font-family: var(--font-mono);
    font-size: 0.65rem;
    color: var(--text-muted);
    letter-spacing: 0.2em;
    text-transform: uppercase;
    writing-mode: vertical-rl;
  }

  .scroll-line {
    width: 1px; height: 60px;
    background: linear-gradient(to bottom, var(--neon-cyan), transparent);
    animation: scroll-pulse 2s ease-in-out infinite;
  }

  @keyframes scroll-pulse { 0%, 100% { opacity: 0.4; } 50% { opacity: 1; } }

  /* SECTIONS */
  .section { padding: 120px 0; position: relative; z-index: 2; }

  .container { max-width: 1200px; margin: 0 auto; padding: 0 40px; }

  .section-title {
    font-family: var(--font-display);
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 700;
    margin: 16px 0 12px;
    line-height: 1.2;
    letter-spacing: -0.02em;
  }

  .section-sub {
    color: var(--text-secondary);
    font-size: 1.05rem;
    margin-bottom: 60px;
    max-width: 480px;
  }

  /* ABOUT */
  .about-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 80px;
    align-items: center;
    margin-top: 40px;
  }

  .about-para {
    color: var(--text-secondary);
    font-size: 1rem;
    line-height: 1.8;
    margin-bottom: 16px;
  }

  .about-stats {
    display: flex;
    gap: 40px;
    margin-top: 40px;
    padding-top: 32px;
    border-top: 1px solid var(--border);
  }

  .stat { display: flex; flex-direction: column; gap: 4px; }

  .stat-num {
    font-family: var(--font-display);
    font-size: 2rem;
    font-weight: 900;
  }

  .stat-label {
    font-family: var(--font-mono);
    font-size: 0.7rem;
    color: var(--text-muted);
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  .about-image-wrap { display: flex; justify-content: center; }

  .about-image {
    position: relative;
    width: 300px; height: 300px;
  }

  .img-placeholder {
    width: 100%; height: 100%;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }

  .avatar-ring {
    position: absolute;
    inset: -8px;
    border-radius: 50%;
    border: 2px solid transparent;
    background: linear-gradient(135deg, var(--neon-cyan), var(--neon-purple)) border-box;
    mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
    -webkit-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    animation: spin-slow 8s linear infinite;
  }

  .avatar-inner {
    width: 100%; height: 100%;
    border-radius: 50%;
    background: linear-gradient(135deg, #071120, #0d1f35);
    border: 2px solid var(--border);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .avatar-initials {
    font-family: var(--font-display);
    font-size: 3rem;
    font-weight: 900;
    background: linear-gradient(135deg, var(--neon-cyan), var(--neon-blue));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .img-deco-1 {
    position: absolute;
    bottom: -10px; right: -10px;
    width: 80px; height: 80px;
    border: 2px solid var(--neon-cyan);
    border-radius: 12px;
    opacity: 0.3;
    animation: float1 4s ease-in-out infinite;
  }

  .img-deco-2 {
    position: absolute;
    top: -10px; left: -10px;
    width: 50px; height: 50px;
    background: var(--neon-purple);
    opacity: 0.15;
    border-radius: 8px;
    animation: float2 5s ease-in-out infinite;
  }

  /* PROJECTS */
  .project-filters {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin: 32px 0 28px;
  }

  .filter-btn,
  .case-study-btn,
  .modal-close {
    font-family: var(--font-mono);
    border: 1px solid var(--border);
    background: rgba(255,255,255,0.03);
    color: var(--text-secondary);
    border-radius: 4px;
    transition: all 0.2s ease;
  }

  .filter-btn {
    padding: 8px 14px;
    font-size: 0.7rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .filter-btn.active,
  .filter-btn:hover {
    border-color: var(--neon-cyan);
    color: var(--neon-cyan);
    background: rgba(0, 245, 255, 0.08);
    box-shadow: 0 0 16px rgba(0, 245, 255, 0.12);
  }

  .projects-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
  }

  .project-card {
    padding: 18px;
    position: relative;
    overflow: hidden;
    transition: all 0.3s ease;
  }

  .project-card:hover {
    transform: translateY(-6px);
  }

  .project-card:hover .project-glow {
    opacity: 1;
  }

  .project-glow {
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse at 50% 0%, color-mix(in srgb, var(--card-color) 12%, transparent), transparent 70%);
    opacity: 0;
    transition: opacity 0.4s;
    pointer-events: none;
    border-radius: inherit;
  }

  .project-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 18px;
  }

  .project-icon {
    width: 38px;
    height: 38px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: 1px solid color-mix(in srgb, var(--card-color) 45%, transparent);
    border-radius: 8px;
    color: var(--card-color);
    font-family: var(--font-display);
    font-size: 0.7rem;
    font-weight: 900;
    letter-spacing: 0.06em;
    background: color-mix(in srgb, var(--card-color) 10%, transparent);
  }

  .project-category {
    margin-right: auto;
    font-family: var(--font-mono);
    font-size: 0.62rem;
    color: var(--card-color);
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  .project-links { display: flex; gap: 12px; }

  .project-link-icon {
    color: var(--text-muted);
    text-decoration: none;
    transition: color 0.2s;
    display: flex;
  }

  .project-link-icon:hover { color: var(--neon-cyan); }

  .project-title {
    font-family: var(--font-display);
    font-size: 1.1rem;
    font-weight: 700;
    margin-bottom: 10px;
    color: var(--text-primary);
    letter-spacing: 0.02em;
  }

  .project-desc {
    font-size: 0.875rem;
    color: var(--text-secondary);
    line-height: 1.7;
    margin-bottom: 20px;
  }

  .project-tech { display: flex; flex-wrap: wrap; gap: 6px; }

  .tech-tag {
    font-family: var(--font-mono);
    font-size: 0.65rem;
    padding: 3px 8px;
    background: rgba(0, 245, 255, 0.06);
    border: 1px solid var(--border);
    border-radius: 3px;
    color: var(--text-muted);
    letter-spacing: 0.05em;
  }

  .project-preview {
    margin: 0 0 18px;
    border: 1px solid color-mix(in srgb, var(--card-color) 28%, transparent);
    border-radius: 8px;
    overflow: hidden;
    background:
      radial-gradient(circle at 20% 20%, color-mix(in srgb, var(--card-color) 22%, transparent), transparent 32%),
      linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02));
  }

  .preview-topbar {
    display: flex;
    gap: 5px;
    padding: 9px 10px;
    border-bottom: 1px solid var(--border);
    background: rgba(0,0,0,0.22);
  }

  .preview-topbar span {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: var(--card-color);
    opacity: 0.75;
  }

  .preview-body {
    min-height: 120px;
    padding: 18px;
    display: grid;
    gap: 10px;
    align-content: center;
  }

  .preview-body span {
    display: block;
    width: calc(78% - (var(--preview-index) * 9%));
    min-width: 46%;
    padding: 9px 12px;
    border-radius: 5px;
    color: var(--text-primary);
    background: color-mix(in srgb, var(--card-color) 15%, rgba(255,255,255,0.04));
    border: 1px solid color-mix(in srgb, var(--card-color) 22%, transparent);
    font-family: var(--font-mono);
    font-size: 0.66rem;
  }

  .case-study-btn {
    width: 100%;
    margin-top: 20px;
    padding: 10px 14px;
    color: var(--text-primary);
  }

  .case-study-btn:hover {
    color: var(--bg);
    background: var(--card-color);
    border-color: var(--card-color);
  }

  .modal-backdrop {
    position: fixed;
    inset: 0;
    z-index: 300;
    display: grid;
    place-items: center;
    padding: 24px;
    background: rgba(2,4,8,0.78);
    backdrop-filter: blur(14px);
  }

  .case-modal {
    width: min(760px, 100%);
    max-height: min(760px, calc(100vh - 48px));
    overflow-y: auto;
    padding: 28px;
    position: relative;
    animation: panel-in 0.24s ease-out;
  }

  .modal-close {
    position: absolute;
    top: 14px;
    right: 14px;
    width: 34px;
    height: 34px;
    color: var(--text-primary);
  }

  .modal-preview { margin-bottom: 22px; }

  .case-modal h3 {
    font-family: var(--font-display);
    font-size: clamp(1.5rem, 4vw, 2.4rem);
    margin: 8px 0 12px;
  }

  .case-modal p {
    color: var(--text-secondary);
    line-height: 1.7;
  }

  .case-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 18px;
    margin: 24px 0;
  }

  .case-label {
    display: block;
    margin-bottom: 6px;
    font-family: var(--font-mono);
    font-size: 0.65rem;
    color: var(--card-color);
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  .modal-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-top: 24px;
  }

  @keyframes panel-in {
    from { opacity: 0; transform: scale(0.96) translateY(12px); }
    to { opacity: 1; transform: scale(1) translateY(0); }
  }

  /* SKILLS */
  .skills-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
    margin-top: 40px;
  }

  .skill-group { padding: 28px; }

  .skill-group-header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 20px;
    padding-bottom: 16px;
    border-bottom: 1px solid var(--border);
  }

  .skill-icon { font-size: 1.4rem; }

  .skill-group-title {
    font-family: var(--font-display);
    font-size: 0.9rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--neon-cyan);
  }

  .skill-tags { display: flex; flex-wrap: wrap; gap: 8px; }

  .skill-tag {
    font-family: var(--font-mono);
    font-size: 0.78rem;
    padding: 6px 14px;
    border: 1px solid var(--border);
    border-radius: 4px;
    color: var(--text-secondary);
    background: rgba(255,255,255,0.02);
    transition: all 0.2s;
    cursor: default;
  }

  .skill-tag:hover {
    border-color: var(--neon-cyan);
    color: var(--neon-cyan);
    background: rgba(0, 245, 255, 0.05);
    transform: translateY(-1px);
  }

  /* CONTACT */
  .contact-grid {
    display: grid;
    grid-template-columns: 1fr 1.4fr;
    gap: 60px;
    margin-top: 40px;
  }

  .contact-info { display: flex; flex-direction: column; gap: 28px; }

  .contact-item {
    display: flex;
    align-items: flex-start;
    gap: 16px;
  }

  .contact-icon { font-size: 1.4rem; margin-top: 2px; }

  .contact-label {
    font-family: var(--font-mono);
    font-size: 0.65rem;
    color: var(--text-muted);
    letter-spacing: 0.15em;
    text-transform: uppercase;
    margin-bottom: 2px;
  }

  .contact-value {
    font-size: 0.9rem;
    color: var(--text-primary);
  }

  .contact-form { display: flex; flex-direction: column; gap: 20px; }

  .form-group { display: flex; flex-direction: column; gap: 6px; }

  .form-label {
    font-family: var(--font-mono);
    font-size: 0.7rem;
    color: var(--text-muted);
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  .form-input {
    background: rgba(5, 20, 40, 0.6);
    border: 1px solid var(--border);
    border-radius: 6px;
    padding: 12px 16px;
    color: var(--text-primary);
    font-family: var(--font-body);
    font-size: 0.9rem;
    transition: all 0.2s;
    outline: none;
  }

  .form-input:focus {
    border-color: var(--neon-cyan);
    box-shadow: 0 0 0 3px rgba(0, 245, 255, 0.08);
  }

  .form-input::placeholder { color: var(--text-muted); }

  .form-textarea { resize: vertical; min-height: 120px; font-family: var(--font-body); }

  .form-error {
    color: var(--neon-pink);
    font-family: var(--font-mono);
    font-size: 0.75rem;
    padding: 8px 12px;
    border: 1px solid rgba(255, 0, 110, 0.3);
    border-radius: 4px;
    background: rgba(255, 0, 110, 0.06);
  }

  .form-success {
    text-align: center;
    padding: 40px;
    border: 1px solid var(--border);
    border-radius: 12px;
    background: rgba(0, 255, 136, 0.03);
  }

  .success-icon { font-size: 3rem; margin-bottom: 16px; }
  .form-success h3 { font-family: var(--font-display); font-size: 1.4rem; margin-bottom: 8px; color: var(--neon-green); }
  .form-success p { color: var(--text-secondary); margin-bottom: 24px; font-size: 0.9rem; }

  /* RESPONSIVE */
  @media (max-width: 1024px) {
    .projects-grid { grid-template-columns: repeat(2, 1fr); }
  }

  @media (max-width: 768px) {
    .hero { padding: 100px 20px 60px; flex-direction: column; }
    .hero-decoration { display: none; }
    .hero-scroll-hint { display: none; }
    .section { padding: 80px 0; }
    .container { padding: 0 20px; }
    .about-grid { grid-template-columns: 1fr; gap: 40px; }
    .projects-grid { grid-template-columns: 1fr; }
    .skills-grid { grid-template-columns: 1fr; }
    .contact-grid { grid-template-columns: 1fr; gap: 40px; }
    .about-image-wrap { order: -1; }
    .case-grid { grid-template-columns: 1fr; }
    .modal-actions { flex-direction: column; }
  }
</style>
