/**
 * ==========================================================================
 * TEACHER TRIBUTE — ULTRA-PREMIUM APPLICATION ENGINE (app.js)
 * --------------------------------------------------------------------------
 * Architecture:
 * 1. Global Utilities & DOM Helpers
 * 2. Golden Stardust Particle Canvas Engine
 * 3. Custom Magnetic Cursor System (Desktop)
 * 4. 3D Card Tilt & Specular Glare Physics
 * 5. Preloader & Standalone Opening Experience
 * 6. Motion & Scroll Animation Engine (GSAP + MotionPath)
 * 7. Interactive Letter Card & Wax Seal Unfolding
 * 8. Gallery Manager & Dynamic View Switcher (Carousel vs Magazine)
 * 9. Luxury Theme Engine & Floating Picker
 * 10. Background Music Controller & Web Audio Melodic Synth
 * 11. Interactive Petal Blessing Cannon & Sound FX
 * 12. Social Share Drawer & Toast Manager
 * 13. Replay Experience Orchestrator
 * 14. Application Bootstrapper
 * ==========================================================================
 */

(function () {
    "use strict";

    /* ==========================================================================
       1. GLOBAL UTILITIES & DOM HELPERS
       ========================================================================== */
    const DOM = {
        get: (id) => document.getElementById(id),
        query: (selector) => document.querySelector(selector),
        queryAll: (selector) => document.querySelectorAll(selector),
        setText: (id, value) => {
            const el = document.getElementById(id);
            if (el && value !== undefined && value !== null) {
                el.textContent = value;
            }
        },
        setImage: (id, src, alt) => {
            const el = document.getElementById(id);
            if (el && src) {
                el.src = src;
                if (alt) el.alt = alt;
            }
        },
        showToast: (message) => {
            const toast = document.getElementById("toast-notification");
            if (!toast) return;
            toast.textContent = message;
            toast.classList.add("show");
            setTimeout(() => {
                toast.classList.remove("show");
            }, 2500);
        }
    };

    /* ==========================================================================
       2. GOLDEN STARDUST PARTICLE CANVAS ENGINE
       --------------------------------------------------------------------------
       Ultra-lightweight 60FPS drifting ambient golden sparks and stardust.
       ========================================================================== */
    const ParticleEngine = {
        canvas: null,
        ctx: null,
        particles: [],
        animId: null,
        mouse: { x: -1000, y: -1000, radius: 120 },
        isReducedMotion: false,

        init() {
            this.canvas = DOM.get("ambient-particle-canvas");
            if (!this.canvas) return;

            this.ctx = this.canvas.getContext("2d");
            this.isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
            if (this.isReducedMotion) return;

            this.resize();
            this.createParticles();
            this.bindEvents();
            this.render();
        },

        resize() {
            if (!this.canvas) return;
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
        },

        createParticles() {
            this.particles = [];
            const count = Math.min(38, Math.floor(window.innerWidth / 30));
            const colors = ["#C9A45C", "#EAD7AD", "#E8C9C9", "#A8B89A", "#FFF3F0"];

            for (let i = 0; i < count; i++) {
                this.particles.push({
                    x: Math.random() * this.canvas.width,
                    y: Math.random() * this.canvas.height,
                    radius: Math.random() * 2.2 + 0.6,
                    color: colors[Math.floor(Math.random() * colors.length)],
                    vx: (Math.random() - 0.5) * 0.45,
                    vy: (Math.random() * -0.5) - 0.15,
                    alpha: Math.random() * 0.6 + 0.2,
                    alphaSpeed: Math.random() * 0.015 + 0.005,
                    alphaDir: 1
                });
            }
        },

        bindEvents() {
            window.addEventListener("resize", () => {
                this.resize();
                this.createParticles();
            });

            window.addEventListener("mousemove", (e) => {
                this.mouse.x = e.clientX;
                this.mouse.y = e.clientY;
            });

            window.addEventListener("mouseleave", () => {
                this.mouse.x = -1000;
                this.mouse.y = -1000;
            });
        },

        render() {
            if (!this.ctx || this.isReducedMotion) return;

            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

            for (let i = 0; i < this.particles.length; i++) {
                const p = this.particles[i];

                p.x += p.vx;
                p.y += p.vy;

                // Alpha pulsing
                p.alpha += p.alphaSpeed * p.alphaDir;
                if (p.alpha > 0.85) { p.alpha = 0.85; p.alphaDir = -1; }
                else if (p.alpha < 0.15) { p.alpha = 0.15; p.alphaDir = 1; }

                // Boundary wrap
                if (p.y < -10) p.y = this.canvas.height + 10;
                if (p.x < -10) p.x = this.canvas.width + 10;
                if (p.x > this.canvas.width + 10) p.x = -10;

                // Mouse subtle repulsion/attraction
                const dx = p.x - this.mouse.x;
                const dy = p.y - this.mouse.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < this.mouse.radius) {
                    const force = (1 - dist / this.mouse.radius) * 0.8;
                    p.x += (dx / dist) * force;
                    p.y += (dy / dist) * force;
                }

                // Draw spark
                this.ctx.save();
                this.ctx.globalAlpha = p.alpha;
                this.ctx.fillStyle = p.color;
                this.ctx.shadowBlur = p.radius * 3;
                this.ctx.shadowColor = p.color;
                this.ctx.beginPath();
                this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                this.ctx.fill();
                this.ctx.restore();
            }

            this.animId = requestAnimationFrame(() => this.render());
        }
    };

    /* ==========================================================================
       3. CUSTOM MAGNETIC CURSOR SYSTEM (Desktop)
       ========================================================================== */
    const CursorEngine = {
        dot: null,
        ring: null,
        mousePos: { x: -100, y: -100 },
        ringPos: { x: -100, y: -100 },

        init() {
            if (!window.matchMedia("(pointer: fine)").matches) return;

            this.dot = DOM.get("custom-cursor-dot");
            this.ring = DOM.get("custom-cursor-ring");
            if (!this.dot || !this.ring) return;

            document.addEventListener("mousemove", (e) => {
                this.mousePos.x = e.clientX;
                this.mousePos.y = e.clientY;
                if (this.dot) {
                    this.dot.style.left = `${this.mousePos.x}px`;
                    this.dot.style.top = `${this.mousePos.y}px`;
                }
            });

            this.bindHoverElements();
            this.render();
        },

        bindHoverElements() {
            const interactives = "button, a, .tilt-card, .memory-card, .dock-btn, .letter-seal-wrapper, .open-book-wrap";
            document.addEventListener("mouseover", (e) => {
                if (e.target.closest(interactives)) {
                    if (this.ring) this.ring.classList.add("hovering");
                }
            });

            document.addEventListener("mouseout", (e) => {
                if (e.target.closest(interactives)) {
                    if (this.ring) this.ring.classList.remove("hovering");
                }
            });
        },

        render() {
            // Smooth lerp ring towards cursor
            this.ringPos.x += (this.mousePos.x - this.ringPos.x) * 0.18;
            this.ringPos.y += (this.mousePos.y - this.ringPos.y) * 0.18;

            if (this.ring) {
                this.ring.style.left = `${this.ringPos.x}px`;
                this.ring.style.top = `${this.ringPos.y}px`;
            }

            requestAnimationFrame(() => this.render());
        }
    };

    /* ==========================================================================
       4. 3D CARD TILT & SPECULAR GLARE PHYSICS
       ========================================================================== */
    const Card3DEngine = {
        init() {
            if (!window.matchMedia("(pointer: fine)").matches) return;

            const cards = DOM.queryAll(".tilt-card");
            cards.forEach(card => {
                const maxTilt = parseFloat(card.getAttribute("data-tilt-max")) || 10;
                const glare = card.querySelector(".card-glare");

                card.addEventListener("mousemove", (e) => {
                    const rect = card.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;

                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;

                    const rotateX = ((y - centerY) / centerY) * -maxTilt;
                    const rotateY = ((x - centerX) / centerX) * maxTilt;

                    card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;

                    if (glare) {
                        const glareX = (x / rect.width) * 100;
                        const glareY = (y / rect.height) * 100;
                        glare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.35) 0%, rgba(255, 255, 255, 0) 65%)`;
                    }
                });

                card.addEventListener("mouseleave", () => {
                    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
                });
            });
        }
    };

    /* ==========================================================================
       5. PRELOADER & STANDALONE OPENING EXPERIENCE
       ========================================================================== */
    const Preloader = {
        openingTl: null,
        safetyTimer: null,
        isReducedMotion: false,

        init() {
            this.isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
            this.playOpening();
        },

        playOpening(isReplay = false) {
            const screen = DOM.get("opening-screen");
            const petalContainer = DOM.get("opening-petal-container");
            const badge = DOM.get("opening-badge");
            const text1 = DOM.get("opening-text-1") || DOM.query(".opening-text-1");
            const text2 = DOM.get("opening-text-2") || DOM.query(".opening-text-2");
            const progressFill = DOM.get("opening-progress-fill");
            const progressTrack = DOM.query(".opening-progress-track");
            const skipBtn = DOM.get("opening-skip");

            if (!screen) return;

            if (this.safetyTimer) {
                clearTimeout(this.safetyTimer);
                this.safetyTimer = null;
            }

            if (this.isReducedMotion && !isReplay) {
                screen.classList.add("hidden");
                screen.style.opacity = "0";
                screen.style.visibility = "hidden";
                AnimationEngine.animateHeroEntrance();
                return;
            }

            // Fail-safe max timeout (3.5s)
            this.safetyTimer = setTimeout(() => {
                if (screen && !screen.classList.contains("hidden")) {
                    this.dismiss();
                }
            }, 3500);

            if (typeof gsap === "undefined") {
                setTimeout(() => this.dismiss(), 1500);
                return;
            }

            screen.classList.remove("hidden");
            screen.style.opacity = "1";
            screen.style.visibility = "visible";

            if (this.openingTl) this.openingTl.kill();

            const randomStartX = gsap.utils.random(-30, 30);

            if (petalContainer) {
                gsap.set(petalContainer, {
                    y: -140,
                    x: randomStartX,
                    rotationZ: -20,
                    rotationY: 28,
                    rotationX: 18,
                    scale: 0.75,
                    opacity: 0,
                    filter: "blur(2px)"
                });
            }

            if (badge) gsap.set(badge, { opacity: 0, y: 14, scale: 0.9 });
            if (progressTrack) gsap.set(progressTrack, { opacity: 0 });
            if (progressFill) gsap.set(progressFill, { width: "0%" });
            if (skipBtn) gsap.set(skipBtn, { opacity: 0, y: 16 });

            gsap.set([text1, text2].filter(Boolean), {
                opacity: 0,
                y: 18,
                filter: "blur(10px)"
            });

            this.openingTl = gsap.timeline({
                onComplete: () => {
                    this.dismiss();
                }
            });

            // 1. Petal entrance & physics descent
            if (petalContainer) {
                this.openingTl.to(petalContainer, {
                    opacity: 1,
                    filter: "blur(0px)",
                    duration: 0.35,
                    ease: "power2.out"
                }, 0);

                this.openingTl.to(petalContainer, {
                    y: 0,
                    duration: 1.3,
                    ease: "power2.out"
                }, 0);

                this.openingTl.to(petalContainer, {
                    keyframes: [
                        { scale: 1.08, duration: 0.65, ease: "sine.out" },
                        { scale: 0.95, duration: 0.35, ease: "sine.inOut" },
                        { scale: 1.0, duration: 0.3, ease: "sine.out" }
                    ]
                }, 0);

                this.openingTl.to(petalContainer, {
                    keyframes: [
                        { x: randomStartX + 24, duration: 0.4, ease: "sine.inOut" },
                        { x: randomStartX - 16, duration: 0.45, ease: "sine.inOut" },
                        { x: randomStartX + 8, duration: 0.25, ease: "sine.inOut" },
                        { x: 0, duration: 0.2, ease: "sine.out" }
                    ]
                }, 0);

                this.openingTl.to(petalContainer, {
                    keyframes: [
                        { rotationZ: 25, rotationY: -20, rotationX: -12, duration: 0.4, ease: "sine.inOut" },
                        { rotationZ: -16, rotationY: 18, rotationX: 14, duration: 0.45, ease: "sine.inOut" },
                        { rotationZ: 6, rotationY: -6, rotationX: -4, duration: 0.25, ease: "sine.inOut" },
                        { rotationZ: 0, rotationY: 0, rotationX: 0, duration: 0.2, ease: "sine.out" }
                    ]
                }, 0);
            }

            // 2. Badge reveal
            if (badge) {
                this.openingTl.to(badge, {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.45,
                    ease: "back.out(1.4)"
                }, 0.3);
            }

            // 3. Text 1 reveal
            if (text1) {
                this.openingTl.to(text1, {
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                    duration: 0.55,
                    ease: "power3.out"
                }, 0.5);
            }

            // 4. Text 2 reveal
            if (text2) {
                this.openingTl.to(text2, {
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                    duration: 0.6,
                    ease: "power3.out"
                }, 1.0);
            }

            // 5. Progress line fill
            if (progressTrack && progressFill) {
                this.openingTl.to(progressTrack, { opacity: 1, duration: 0.3 }, 0.4);
                this.openingTl.to(progressFill, { width: "100%", duration: 1.8, ease: "power1.inOut" }, 0.4);
            }

            // 6. Enter CTA fade in
            if (skipBtn) {
                this.openingTl.to(skipBtn, {
                    opacity: 1,
                    y: 0,
                    duration: 0.45,
                    ease: "back.out(1.2)"
                }, 0.7);
            }

            this.openingTl.to({}, { duration: 0.4 }, 2.0);

            // Click interactions
            if (skipBtn) {
                skipBtn.onclick = (e) => {
                    e.stopPropagation();
                    if (this.openingTl) this.openingTl.kill();
                    this.dismiss();
                };
            }

            screen.onclick = () => {
                if (this.openingTl) this.openingTl.kill();
                this.dismiss();
            };
        },

        dismiss() {
            const screen = DOM.get("opening-screen");
            if (!screen) return;

            if (this.safetyTimer) {
                clearTimeout(this.safetyTimer);
                this.safetyTimer = null;
            }

            SoundFX.playChime();

            if (typeof gsap !== "undefined") {
                gsap.to(screen, {
                    opacity: 0,
                    scale: 1.04,
                    filter: "blur(8px)",
                    duration: 0.55,
                    ease: "power2.inOut",
                    onComplete: () => {
                        screen.classList.add("hidden");
                        gsap.set(screen, { clearProps: "scale,filter" });
                        AnimationEngine.animateHeroEntrance();
                    }
                });
            } else {
                screen.classList.add("hidden");
                AnimationEngine.animateHeroEntrance();
            }
        }
    };

    /* ==========================================================================
       6. MOTION & SCROLL ANIMATION ENGINE (GSAP + ScrollTrigger)
       ========================================================================== */
    const AnimationEngine = {
        sigTl: null,
        isReducedMotion: false,
        petalShowerTimeouts: [],
        petalCounter: 0,

        init() {
            if (typeof gsap !== "undefined") {
                if (typeof ScrollTrigger !== "undefined") gsap.registerPlugin(ScrollTrigger);
                if (typeof MotionPathPlugin !== "undefined") gsap.registerPlugin(MotionPathPlugin);
            }

            this.isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

            this.initScrollAnimations();
            this.initScrollProgressBar();
            Card3DEngine.init();
        },

        animateHeroEntrance() {
            const heroElements = [
                ".hero-flourish",
                ".hero-date-badge",
                ".hero-greeting",
                ".hero-portrait-wrapper",
                ".hero-teacher-name",
                ".hero-teacher-title",
                ".hero-tagline",
                ".scroll-indicator"
            ];

            if (typeof gsap !== "undefined") {
                gsap.fromTo(
                    heroElements,
                    { opacity: 0, y: 22 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.75,
                        stagger: 0.09,
                        ease: "power3.out",
                        onComplete: () => {
                            this.startHeroKenBurns();
                        }
                    }
                );
            } else {
                this.startHeroKenBurns();
            }
        },

        startHeroKenBurns() {
            const heroImg = DOM.query(".hero-portrait-frame img");
            if (!heroImg || this.isReducedMotion) return;
            heroImg.classList.add("ken-burns-active");
        },

        initScrollAnimations() {
            if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") return;

            const dur = this.isReducedMotion ? 0.01 : undefined;

            // 1. Personal Letter Section
            gsap.fromTo(
                ".letter-wrapper",
                { y: 30, opacity: 0, rotate: 1.0 },
                {
                    y: 0,
                    opacity: 1,
                    rotate: 0.4,
                    duration: dur || 0.85,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: ".personal-letter-section",
                        start: "top 82%",
                        toggleActions: "play none none none"
                    }
                }
            );

            // 2. Cinematic Banner Parallax
            if (!this.isReducedMotion) {
                gsap.fromTo(
                    ".cinematic-img",
                    { scale: 1.08 },
                    {
                        scale: 1.0,
                        ease: "none",
                        scrollTrigger: {
                            trigger: ".cinematic-section",
                            start: "top bottom",
                            end: "bottom top",
                            scrub: 1.2
                        }
                    }
                );
            }

            // 3. Thank You Section Stagger
            const thankYouTl = gsap.timeline({
                scrollTrigger: {
                    trigger: ".thankyou-section",
                    start: "top 80%",
                    toggleActions: "play none none none"
                }
            });

            thankYouTl.fromTo(
                ".thankyou-badge",
                { opacity: 0, scale: 0.7 },
                { opacity: 1, scale: 1, duration: dur || 0.5, ease: "back.out(1.2)" },
                0
            );

            thankYouTl.fromTo(
                ".thankyou-heading",
                { opacity: 0, y: 16, filter: "blur(6px)" },
                { opacity: 1, y: 0, filter: "blur(0px)", duration: dur || 0.65, ease: "power3.out" },
                0.12
            );

            thankYouTl.fromTo(
                ".thankyou-line-item",
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: dur || 0.55, stagger: 0.12, ease: "power3.out" },
                0.3
            );

            thankYouTl.to(
                "#thankyou-gold-line",
                {
                    duration: dur || 0.7,
                    ease: "power2.out",
                    onStart: () => {
                        const line = DOM.get("thankyou-gold-line");
                        if (line) line.classList.add("drawn");
                    }
                },
                ">-0.2"
            );

            thankYouTl.fromTo(
                ".thankyou-final",
                { opacity: 0, y: 12 },
                { opacity: 1, y: 0, duration: dur || 0.5, ease: "power3.out" },
                ">-0.15"
            );

            // 4. Quote Card Reveal
            const quoteTl = gsap.timeline({
                scrollTrigger: {
                    trigger: ".quote-section",
                    start: "top 84%",
                    toggleActions: "play none none none"
                }
            });

            quoteTl.fromTo(
                ".quote-mark",
                { opacity: 0, scale: 0.7 },
                { opacity: 1, scale: 1, duration: dur || 0.5, ease: "back.out(1.2)" },
                0
            );

            quoteTl.fromTo(
                ".quote-card",
                { opacity: 0, y: 26, scale: 0.98 },
                { opacity: 1, y: 0, scale: 1, duration: dur || 0.7, ease: "power3.out" },
                0
            );

            // 5. Signature Animation
            this.initSignatureAnimation(dur);

            // 6. Book Unfolding & Sprout
            this.initBookAnimation(dur);

            // 7. Creator Branding Section
            const creatorTl = gsap.timeline({
                scrollTrigger: {
                    trigger: ".creator-footer-section",
                    start: "top 88%",
                    toggleActions: "play none none none"
                }
            });

            creatorTl.fromTo(
                [".creator-divider", ".creator-info-card"],
                { opacity: 0, y: 18 },
                { opacity: 1, y: 0, duration: dur || 0.6, stagger: 0.12, ease: "power3.out" },
                0
            );

            creatorTl.fromTo(
                ".creator-order-wrap",
                { opacity: 0, y: 22, scale: 0.95 },
                { opacity: 1, y: 0, scale: 1, duration: dur || 0.65, ease: "back.out(1.4)" },
                0.2
            );
        },

        initSignatureAnimation(dur) {
            if (this.sigTl) {
                if (this.sigTl.scrollTrigger) this.sigTl.scrollTrigger.kill();
                this.sigTl.kill();
                this.sigTl = null;
            }

            const sigSvg = DOM.query(".signature-svg");
            const sigPath = DOM.query(".signature-svg .sig-path");
            const sigLine = DOM.query(".signature-svg .sig-line");
            const pen = DOM.get("fountain-pen");

            if (!sigSvg || !sigPath || !sigLine || !pen) return;

            if (typeof MotionPathPlugin !== "undefined") {
                sigSvg.classList.add("gsap-animated");
                sigSvg.classList.remove("drawn");

                gsap.set(sigPath, { strokeDasharray: 400, strokeDashoffset: 400 });
                gsap.set(sigLine, { strokeDasharray: 300, strokeDashoffset: 300 });
                gsap.set(pen, { opacity: 0, scale: 1, x: 0, y: 0 });

                const isMobile = window.innerWidth < 480;
                const sigDuration = isMobile ? 2.8 : 3.2;
                const lineDuration = isMobile ? 1.2 : 1.5;

                this.sigTl = gsap.timeline({
                    scrollTrigger: {
                        trigger: ".signature-container",
                        start: "top 85%",
                        toggleActions: "play none none none"
                    }
                });

                // Pen fade in
                this.sigTl.to(pen, { opacity: 1, duration: dur || 0.25, ease: "power1.out" });

                // Pen writes signature & ink draws simultaneously
                this.sigTl.to(pen, {
                    motionPath: {
                        path: sigPath,
                        align: sigPath,
                        alignOrigin: [0.03, 0.97]
                    },
                    duration: dur || sigDuration,
                    ease: "power1.inOut"
                }, "-=0.1");

                this.sigTl.to(sigPath, {
                    strokeDashoffset: 0,
                    duration: dur || sigDuration,
                    ease: "power1.inOut"
                }, "<");

                // Pen fade out
                this.sigTl.to(pen, { opacity: 0, duration: dur || 0.2, ease: "power1.inOut" });

                // Brief pause
                this.sigTl.to({}, { duration: this.isReducedMotion ? 0 : 0.2 });

                // Reposition pen for underline
                this.sigTl.set(pen, {
                    motionPath: {
                        path: sigLine,
                        align: sigLine,
                        alignOrigin: [0.03, 0.97],
                        start: 0,
                        end: 0
                    }
                });

                this.sigTl.to(pen, { opacity: 1, duration: dur || 0.2, ease: "power1.inOut" });

                // Draw underline
                this.sigTl.to(pen, {
                    motionPath: {
                        path: sigLine,
                        align: sigLine,
                        alignOrigin: [0.03, 0.97]
                    },
                    duration: dur || lineDuration,
                    ease: "power1.inOut"
                });

                this.sigTl.to(sigLine, {
                    strokeDashoffset: 0,
                    duration: dur || lineDuration,
                    ease: "power1.inOut"
                }, "<");

                // Pen lifts away
                this.sigTl.to(pen, {
                    opacity: 0,
                    y: "-=14",
                    x: "+=6",
                    duration: dur || 0.4,
                    ease: "power1.in",
                    onComplete: () => {
                        sigSvg.classList.add("drawn");
                    }
                });

                // Trigger Petal Shower
                this.sigTl.to({}, {
                    duration: this.isReducedMotion ? 0 : 0.25,
                    onComplete: () => {
                        if (!this.isReducedMotion) {
                            PetalBlessingEngine.triggerPetalShower();
                        }
                    }
                });
            }
        },

        initBookAnimation(dur) {
            const bookWrap = DOM.get("open-book-wrap");
            const leftWing = DOM.query(".page-left-wing");
            const rightWing = DOM.query(".page-right-wing");
            const sprout = DOM.get("book-sprout");
            const ribbon = DOM.query(".book-ribbon");
            const sproutLeaves = sprout ? sprout.querySelectorAll("path") : [];

            if (!bookWrap) return;

            gsap.set(bookWrap, { opacity: 0, y: 22, scale: 0.88 });
            if (leftWing) gsap.set(leftWing, { transformOrigin: "80px 50px", scaleX: 0.65, rotateY: 35 });
            if (rightWing) gsap.set(rightWing, { transformOrigin: "80px 50px", scaleX: 0.65, rotateY: -35 });
            if (sprout) gsap.set(sprout, { transformOrigin: "81px 26px", scale: 0, opacity: 0, y: 10, rotation: -4 });
            if (ribbon) gsap.set(ribbon, { transformOrigin: "80px 27px", scaleY: 0.5, opacity: 0 });

            const bookTl = gsap.timeline({
                scrollTrigger: {
                    trigger: ".final-greeting-section",
                    start: "top 82%",
                    toggleActions: "play none none none"
                }
            });

            bookTl.to(bookWrap, { opacity: 1, y: 0, scale: 1, duration: dur || 0.7, ease: "power2.out" });

            bookTl.to([leftWing, rightWing], {
                scaleX: 1,
                rotateY: 0,
                duration: dur || 0.8,
                ease: "back.out(1.1)"
            }, "-=0.4");

            bookTl.to(sprout, {
                scale: 1,
                opacity: 1,
                y: 0,
                rotation: 0,
                duration: dur || 0.7,
                ease: "power3.out"
            }, "-=0.35");

            if (sproutLeaves.length > 0) {
                gsap.set(sproutLeaves, { opacity: 0, scale: 0.8 });
                bookTl.to(sproutLeaves, {
                    opacity: 1,
                    scale: 1,
                    duration: dur || 0.4,
                    stagger: 0.06,
                    ease: "power2.out"
                }, "<+0.15");
            }

            bookTl.to(ribbon, {
                scaleY: 1,
                opacity: 1,
                duration: dur || 0.5,
                ease: "power2.out"
            }, "-=0.3");

            // Book click interaction
            bookWrap.addEventListener("click", () => {
                PetalBlessingEngine.triggerPetalShower();
                SoundFX.playChime();
                gsap.fromTo(bookWrap, { scale: 0.92 }, { scale: 1, duration: 0.4, ease: "back.out(1.5)" });
            });
        },

        initScrollProgressBar() {
            const progressBar = DOM.get("scroll-progress");
            if (!progressBar || typeof gsap === "undefined") return;

            gsap.to(progressBar, {
                width: "100%",
                ease: "none",
                scrollTrigger: {
                    trigger: document.documentElement,
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 0.3
                }
            });
        }
    };

    /* ==========================================================================
       7. INTERACTIVE LETTER CARD & WAX SEAL UNSEALING
       ========================================================================== */
    const LetterEngine = {
        isUnsealed: false,

        init() {
            const sealWrapper = DOM.get("letter-seal-wrapper");
            if (!sealWrapper) return;

            sealWrapper.addEventListener("click", () => this.unseal());
            sealWrapper.addEventListener("keydown", (e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    this.unseal();
                }
            });
        },

        unseal() {
            if (this.isUnsealed) return;
            this.isUnsealed = true;

            const sealImg = DOM.get("letter-seal-img");
            const letterCard = DOM.get("letter-card");
            const letterBody = DOM.get("letter-body");

            SoundFX.playChime();
            PetalBlessingEngine.triggerPetalShower();
            DOM.showToast("স্মৃতির চিঠি উন্মোচিত হলো 💌");

            if (typeof gsap !== "undefined" && sealImg) {
                gsap.to(sealImg, {
                    scale: 1.3,
                    rotation: 20,
                    duration: 0.25,
                    yoyo: true,
                    repeat: 1,
                    ease: "power1.inOut"
                });

                if (letterCard) {
                    gsap.fromTo(letterCard,
                        { scale: 0.98, boxShadow: "0 0 30px rgba(201, 164, 92, 0.6)" },
                        { scale: 1, boxShadow: "var(--card-shadow)", duration: 0.6, ease: "power2.out" }
                    );
                }

                if (letterBody) {
                    gsap.fromTo(letterBody,
                        { opacity: 0.4, y: 8 },
                        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
                    );
                }
            }
        }
    };

    /* ==========================================================================
       8. GALLERY & DYNAMIC VIEW SWITCHER (Carousel vs Magazine Grid)
       ========================================================================== */
    const GalleryManager = {
        data: { items: [] },
        swiper: null,
        currentLightboxIndex: -1,
        activeMode: "carousel",

        init(galleryData) {
            this.data = galleryData || { items: [] };
            this.render();
            this.initSwiper();
            this.initViewSwitcher();
            this.bindLightboxEvents();
        },

        render() {
            const swiperWrapper = DOM.get("swiper-wrapper");
            const desktopGrid = DOM.get("gallery-desktop-grid");

            if (!swiperWrapper || !desktopGrid) return;

            swiperWrapper.innerHTML = "";
            desktopGrid.innerHTML = "";

            this.data.items.forEach((item, index) => {
                const caption = item.caption || "A cherished memory…";

                // Mobile Swiper Slide
                const slide = document.createElement("div");
                slide.className = "swiper-slide";
                slide.innerHTML = `
                    <div class="memory-card tilt-card" data-tilt-max="8" data-index="${index}" role="button" tabindex="0" aria-label="View photo: ${item.title}">
                        <div class="card-glare" aria-hidden="true"></div>
                        <div class="memory-card-img-wrap">
                            <img src="${item.src}" alt="${item.title}" loading="lazy" />
                        </div>
                        <div class="memory-card-content">
                            <h4 class="memory-card-title">${item.title}</h4>
                            <p class="memory-card-caption">${caption}</p>
                        </div>
                    </div>`;
                swiperWrapper.appendChild(slide);

                // Desktop Magazine Collage Item
                const collageItem = document.createElement("div");
                collageItem.className = `memory-card tilt-card collage-item collage-item-${(index % 5) + 1}`;
                collageItem.setAttribute("data-tilt-max", "7");
                collageItem.setAttribute("data-index", index);
                collageItem.setAttribute("role", "button");
                collageItem.setAttribute("tabindex", "0");
                collageItem.setAttribute("aria-label", `View photo: ${item.title}`);
                collageItem.innerHTML = `
                    <div class="card-glare" aria-hidden="true"></div>
                    <div class="memory-card-img-wrap">
                        <img src="${item.src}" alt="${item.title}" loading="lazy" />
                    </div>
                    <div class="memory-card-content">
                        <h4 class="memory-card-title">${item.title}</h4>
                        <p class="memory-card-caption">${caption}</p>
                    </div>`;
                desktopGrid.appendChild(collageItem);
            });

            this.updateCounter(0);
            Card3DEngine.init();
        },

        initSwiper() {
            if (typeof Swiper === "undefined") return;

            const swiperContainer = DOM.query(".gallery-swiper-container");
            if (!swiperContainer) return;

            this.swiper = new Swiper(".gallery-swiper-container", {
                slidesPerView: "auto",
                centeredSlides: true,
                spaceBetween: 16,
                grabCursor: true,
                speed: 800,
                autoplay: {
                    delay: 4500,
                    disableOnInteraction: true,
                    pauseOnMouseEnter: true
                },
                pagination: {
                    el: ".swiper-pagination",
                    clickable: true,
                    dynamicBullets: true
                },
                keyboard: { enabled: true },
                on: {
                    slideChange: (swiper) => {
                        this.updateCounter(swiper.activeIndex);
                        this.applyKenBurns(swiper);
                    },
                    init: (swiper) => {
                        this.updateCounter(0);
                        this.applyKenBurns(swiper);
                    }
                }
            });
        },

        initViewSwitcher() {
            const btnCarousel = DOM.get("view-mode-carousel");
            const btnMagazine = DOM.get("view-mode-magazine");
            const carouselView = DOM.get("gallery-carousel-view");
            const magazineView = DOM.get("gallery-desktop-grid");

            if (!btnCarousel || !btnMagazine || !carouselView || !magazineView) return;

            btnCarousel.addEventListener("click", () => {
                if (this.activeMode === "carousel") return;
                this.activeMode = "carousel";
                btnCarousel.classList.add("active");
                btnCarousel.setAttribute("aria-checked", "true");
                btnMagazine.classList.remove("active");
                btnMagazine.setAttribute("aria-checked", "false");

                magazineView.classList.remove("active-view");
                carouselView.classList.remove("hidden-view");
                if (this.swiper) this.swiper.update();
            });

            btnMagazine.addEventListener("click", () => {
                if (this.activeMode === "magazine") return;
                this.activeMode = "magazine";
                btnMagazine.classList.add("active");
                btnMagazine.setAttribute("aria-checked", "true");
                btnCarousel.classList.remove("active");
                btnCarousel.setAttribute("aria-checked", "false");

                carouselView.classList.add("hidden-view");
                magazineView.classList.add("active-view");
            });
        },

        updateCounter(activeIndex) {
            const counterEl = DOM.get("gallery-counter");
            if (!counterEl) return;
            const total = this.data.items.length;
            const current = String(activeIndex + 1).padStart(2, "0");
            const totalStr = String(total).padStart(2, "0");
            counterEl.textContent = `${current} / ${totalStr}`;
        },

        applyKenBurns(swiper) {
            if (typeof gsap === "undefined") return;
            const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
            if (isReduced) return;

            const allImgs = DOM.queryAll(".gallery-swiper-container .memory-card-img-wrap img");
            allImgs.forEach(img => {
                gsap.killTweensOf(img);
                gsap.set(img, { scale: 1 });
            });

            const activeSlide = swiper.slides[swiper.activeIndex];
            if (activeSlide) {
                const img = activeSlide.querySelector(".memory-card-img-wrap img");
                if (img) {
                    gsap.to(img, { scale: 1.05, duration: 4.5, ease: "none" });
                }
            }
        },

        bindLightboxEvents() {
            const overlay = DOM.get("lightbox-overlay");
            const closeBtn = DOM.get("lightbox-close");

            document.addEventListener("click", (e) => {
                const card = e.target.closest(".memory-card");
                if (card) {
                    const index = parseInt(card.getAttribute("data-index"), 10);
                    if (!isNaN(index) && this.data.items[index]) {
                        this.openLightbox(index);
                    }
                }
            });

            document.addEventListener("keydown", (e) => {
                if (e.key === "Enter") {
                    const card = document.activeElement?.closest(".memory-card");
                    if (card) {
                        const index = parseInt(card.getAttribute("data-index"), 10);
                        if (!isNaN(index) && this.data.items[index]) {
                            this.openLightbox(index);
                        }
                    }
                }
            });

            if (closeBtn) closeBtn.addEventListener("click", () => this.closeLightbox());
            if (overlay) {
                overlay.addEventListener("click", (e) => {
                    if (e.target === overlay) this.closeLightbox();
                });
            }

            document.addEventListener("keydown", (e) => {
                if (!overlay || !overlay.classList.contains("active")) return;
                if (e.key === "Escape") this.closeLightbox();
                else if (e.key === "ArrowRight") {
                    e.preventDefault();
                    this.navigateLightbox(1);
                } else if (e.key === "ArrowLeft") {
                    e.preventDefault();
                    this.navigateLightbox(-1);
                }
            });

            this.initLightboxSwipe();
        },

        initLightboxSwipe() {
            const overlay = DOM.get("lightbox-overlay");
            if (!overlay) return;

            let startX = 0;
            let startY = 0;
            let isDragging = false;

            overlay.addEventListener("touchstart", (e) => {
                startX = e.touches[0].clientX;
                startY = e.touches[0].clientY;
                isDragging = true;
            }, { passive: true });

            overlay.addEventListener("touchend", (e) => {
                if (!isDragging) return;
                isDragging = false;

                const endX = e.changedTouches[0].clientX;
                const endY = e.changedTouches[0].clientY;
                const diffX = endX - startX;
                const diffY = endY - startY;

                if (Math.abs(diffX) > 50 && Math.abs(diffX) > Math.abs(diffY) * 1.5) {
                    if (diffX < 0) this.navigateLightbox(1);
                    else this.navigateLightbox(-1);
                }
            }, { passive: true });
        },

        openLightbox(index) {
            const overlay = DOM.get("lightbox-overlay");
            const img = DOM.get("lightbox-img");
            const title = DOM.get("lightbox-title");
            const desc = DOM.get("lightbox-desc");

            if (!overlay || !img) return;

            this.currentLightboxIndex = index;
            const item = this.data.items[index];

            img.src = item.src;
            img.alt = item.title || "Memory Photo";
            if (title) title.textContent = item.title || "";
            if (desc) desc.textContent = item.caption || "";

            overlay.classList.add("active");
            document.body.style.overflow = "hidden";

            if (typeof gsap !== "undefined") {
                gsap.fromTo(img,
                    { scale: 0.92, opacity: 0 },
                    { scale: 1, opacity: 1, duration: 0.35, ease: "power2.out" }
                );
            }
        },

        navigateLightbox(direction) {
            if (this.currentLightboxIndex < 0) return;

            const total = this.data.items.length;
            const newIndex = (this.currentLightboxIndex + direction + total) % total;
            const img = DOM.get("lightbox-img");

            if (typeof gsap !== "undefined" && img) {
                gsap.to(img, {
                    opacity: 0,
                    scale: 1.03,
                    duration: 0.2,
                    ease: "power1.in",
                    onComplete: () => {
                        this.currentLightboxIndex = newIndex;
                        const item = this.data.items[newIndex];
                        img.src = item.src;
                        img.alt = item.title || "Memory Photo";
                        DOM.setText("lightbox-title", item.title || "");
                        DOM.setText("lightbox-desc", item.caption || "");

                        gsap.fromTo(img,
                            { opacity: 0, scale: 0.97 },
                            { opacity: 1, scale: 1, duration: 0.3, ease: "power2.out" }
                        );
                    }
                });
            } else {
                this.openLightbox(newIndex);
            }
        },

        closeLightbox() {
            const overlay = DOM.get("lightbox-overlay");
            const img = DOM.get("lightbox-img");
            if (!overlay) return;

            if (typeof gsap !== "undefined" && img) {
                gsap.to(img, {
                    opacity: 0,
                    scale: 0.95,
                    duration: 0.2,
                    ease: "power1.in",
                    onComplete: () => {
                        overlay.classList.remove("active");
                        document.body.style.overflow = "";
                        this.currentLightboxIndex = -1;
                    }
                });
            } else {
                overlay.classList.remove("active");
                document.body.style.overflow = "";
                this.currentLightboxIndex = -1;
            }
        }
    };

    /* ==========================================================================
       9. LUXURY THEME ENGINE & FLOATING PICKER
       ========================================================================== */
    const ThemeEngine = {
        currentTheme: "sunset-bloom",

        init() {
            const config = window.TRIBUTE_CONFIG || {};
            const initialTheme = config.theme || "sunset-bloom";
            const savedTheme = localStorage.getItem("teacher_tribute_theme") || initialTheme;
            this.apply(savedTheme);
            this.renderPicker();
            this.bindEvents();
        },

        apply(themeName) {
            const config = window.TRIBUTE_CONFIG || {};
            const palette = config.themePalettes && config.themePalettes[themeName];
            if (!palette) return;

            this.currentTheme = themeName;
            localStorage.setItem("teacher_tribute_theme", themeName);

            const root = document.documentElement;
            Object.keys(palette).forEach(key => {
                root.style.setProperty(key, palette[key]);
            });

            document.body.setAttribute("data-theme", themeName);

            // Update active state in picker
            const optionBtns = DOM.queryAll(".theme-option-btn");
            optionBtns.forEach(btn => {
                if (btn.getAttribute("data-theme") === themeName) {
                    btn.classList.add("active");
                } else {
                    btn.classList.remove("active");
                }
            });
        },

        renderPicker() {
            const container = DOM.get("theme-options-list");
            if (!container) return;

            const config = window.TRIBUTE_CONFIG || {};
            const themes = config.themeList || [];

            container.innerHTML = "";
            themes.forEach(t => {
                const btn = document.createElement("button");
                btn.className = `theme-option-btn ${t.id === this.currentTheme ? "active" : ""}`;
                btn.setAttribute("data-theme", t.id);
                btn.innerHTML = `
                    <div class="theme-option-left">
                        <span class="theme-dot" style="background-color: ${t.primary}; border-color: ${t.bg};"></span>
                        <span>${t.name}</span>
                    </div>
                    <span>${t.icon}</span>`;
                btn.addEventListener("click", () => {
                    this.apply(t.id);
                    this.closeDropdown();
                    DOM.showToast(`থিম পরিবর্তন করা হয়েছে: ${t.name}`);
                });
                container.appendChild(btn);
            });
        },

        bindEvents() {
            const themeBtn = DOM.get("dock-theme-btn");
            const dropdown = DOM.get("theme-dropdown");

            if (!themeBtn || !dropdown) return;

            themeBtn.addEventListener("click", (e) => {
                e.stopPropagation();
                const isOpen = dropdown.classList.contains("active");
                if (isOpen) {
                    this.closeDropdown();
                } else {
                    dropdown.classList.add("active");
                    themeBtn.setAttribute("aria-expanded", "true");
                }
            });

            document.addEventListener("click", (e) => {
                if (!e.target.closest("#theme-dropdown") && !e.target.closest("#dock-theme-btn")) {
                    this.closeDropdown();
                }
            });
        },

        closeDropdown() {
            const dropdown = DOM.get("theme-dropdown");
            const themeBtn = DOM.get("dock-theme-btn");
            if (dropdown) dropdown.classList.remove("active");
            if (themeBtn) themeBtn.setAttribute("aria-expanded", "false");
        }
    };

    /* ==========================================================================
       10. BACKGROUND MUSIC CONTROLLER & WEB AUDIO SYNTH
       ========================================================================== */
    const MusicController = {
        config: {},
        isPlaying: false,
        hasUserInteracted: false,
        useSynth: false,
        audio: new Audio(),
        synthCtx: null,
        synthGain: null,
        synthInterval: null,

        init(musicConfig) {
            this.config = musicConfig || {};

            if (this.config.src) {
                this.audio.src = this.config.src;
                this.audio.loop = true;
                this.audio.volume = 0.5;
            }

            const toggleBtn = DOM.get("music-toggle");
            const dockMusicBtn = DOM.get("dock-music-btn");

            if (toggleBtn) toggleBtn.addEventListener("click", () => this.togglePlay());
            if (dockMusicBtn) dockMusicBtn.addEventListener("click", () => this.togglePlay());

            const unlockAudio = () => {
                if (!this.hasUserInteracted) {
                    this.hasUserInteracted = true;
                    if (this.synthCtx && this.synthCtx.state === "suspended") {
                        this.synthCtx.resume();
                    }
                }
                window.removeEventListener("click", unlockAudio);
                window.removeEventListener("touchstart", unlockAudio);
            };

            window.addEventListener("click", unlockAudio, { once: true });
            window.addEventListener("touchstart", unlockAudio, { once: true });

            this.audio.addEventListener("error", () => {
                this.useSynth = true;
            });
        },

        togglePlay() {
            if (this.isPlaying) this.pause();
            else this.play();
        },

        play() {
            this.isPlaying = true;
            this.updateUI(true);

            if (!this.useSynth && this.config.src) {
                const playPromise = this.audio.play();
                if (playPromise !== undefined) {
                    playPromise.catch(() => {
                        this.startAmbientSynth();
                    });
                }
            } else {
                this.startAmbientSynth();
            }
        },

        pause() {
            this.isPlaying = false;
            this.updateUI(false);
            this.audio.pause();
            this.stopAmbientSynth();
        },

        updateUI(playing) {
            const musicBars = DOM.get("music-bars");
            const musicIcon = DOM.get("music-icon");
            const toggleBtn = DOM.get("music-toggle");
            const dockMusicBtn = DOM.get("dock-music-btn");
            const dockTooltip = DOM.get("dock-music-tooltip");

            if (playing) {
                if (musicBars) musicBars.classList.add("playing");
                if (toggleBtn) toggleBtn.classList.add("is-playing");
                if (dockMusicBtn) dockMusicBtn.classList.add("is-playing");
                if (dockTooltip) dockTooltip.textContent = "Melody Playing";
                if (musicIcon) {
                    musicIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="4" height="16" x="6" y="4"></rect><rect width="4" height="16" x="14" y="4"></rect></svg>`;
                }
            } else {
                if (musicBars) musicBars.classList.remove("playing");
                if (toggleBtn) toggleBtn.classList.remove("is-playing");
                if (dockMusicBtn) dockMusicBtn.classList.remove("is-playing");
                if (dockTooltip) dockTooltip.textContent = "Melody Muted";
                if (musicIcon) {
                    musicIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="6 3 20 12 6 21 6 3"></polygon></svg>`;
                }
            }
        },

        startAmbientSynth() {
            try {
                const AudioCtx = window.AudioContext || window.webkitAudioContext;
                if (!AudioCtx) return;

                if (!this.synthCtx) this.synthCtx = new AudioCtx();
                if (this.synthCtx.state === "suspended") this.synthCtx.resume();

                if (!this.synthGain) {
                    this.synthGain = this.synthCtx.createGain();
                    this.synthGain.gain.setValueAtTime(0.16, this.synthCtx.currentTime);
                    this.synthGain.connect(this.synthCtx.destination);
                }

                const chords = [
                    [261.63, 329.63, 392.00, 523.25], // C
                    [246.94, 293.66, 392.00, 493.88], // G
                    [220.00, 261.63, 329.63, 440.00], // Am
                    [261.63, 349.23, 440.00, 523.25]  // F
                ];

                let chordIndex = 0;
                let noteStep = 0;

                const playNote = () => {
                    if (!this.isPlaying || !this.synthCtx) return;

                    const chord = chords[chordIndex];
                    const freq = chord[noteStep % chord.length];
                    noteStep++;

                    if (noteStep % 4 === 0) {
                        chordIndex = (chordIndex + 1) % chords.length;
                    }

                    const osc = this.synthCtx.createOscillator();
                    const noteGain = this.synthCtx.createGain();

                    osc.type = "sine";
                    osc.frequency.setValueAtTime(freq, this.synthCtx.currentTime);

                    const now = this.synthCtx.currentTime;
                    noteGain.gain.setValueAtTime(0.001, now);
                    noteGain.gain.exponentialRampToValueAtTime(0.1, now + 0.08);
                    noteGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.0);

                    osc.connect(noteGain);
                    noteGain.connect(this.synthGain);

                    osc.start(now);
                    osc.stop(now + 2.1);
                };

                playNote();
                this.synthInterval = setInterval(playNote, 700);
            } catch (e) {
                console.warn("Synthesizer note warning:", e);
            }
        },

        stopAmbientSynth() {
            if (this.synthInterval) {
                clearInterval(this.synthInterval);
                this.synthInterval = null;
            }
        }
    };

    /* ==========================================================================
       11. SOUND FX & CHIMES
       ========================================================================== */
    const SoundFX = {
        ctx: null,

        getAudioContext() {
            if (!this.ctx) {
                const AudioCtx = window.AudioContext || window.webkitAudioContext;
                if (AudioCtx) this.ctx = new AudioCtx();
            }
            if (this.ctx && this.ctx.state === "suspended") {
                this.ctx.resume();
            }
            return this.ctx;
        },

        playChime() {
            try {
                const ctx = this.getAudioContext();
                if (!ctx) return;

                const freqs = [523.25, 659.25, 783.99, 1046.50];
                freqs.forEach((freq, idx) => {
                    const osc = ctx.createOscillator();
                    const gain = ctx.createGain();
                    const now = ctx.currentTime + idx * 0.08;

                    osc.type = "sine";
                    osc.frequency.setValueAtTime(freq, now);

                    gain.gain.setValueAtTime(0.001, now);
                    gain.gain.exponentialRampToValueAtTime(0.12, now + 0.02);
                    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.9);

                    osc.connect(gain);
                    gain.connect(ctx.destination);

                    osc.start(now);
                    osc.stop(now + 0.95);
                });
            } catch (e) {
                // Ignore audio restriction
            }
        }
    };

    /* ==========================================================================
       12. INTERACTIVE PETAL BLESSING CANNON
       ========================================================================== */
    const PetalBlessingEngine = {
        init() {
            const blessingBtn = DOM.get("petal-blessing-btn");
            const dockPetalBtn = DOM.get("dock-petal-btn");

            if (blessingBtn) {
                blessingBtn.addEventListener("click", () => {
                    this.triggerPetalShower();
                    SoundFX.playChime();
                    DOM.showToast("শ্রদ্ধার পুষ্পার্ঘ্য অর্পিত হলো 🌸✨");
                });
            }

            if (dockPetalBtn) {
                dockPetalBtn.addEventListener("click", () => {
                    this.triggerPetalShower();
                    SoundFX.playChime();
                    DOM.showToast("পুষ্পবৃষ্টি শুরু হলো 🌸");
                });
            }
        },

        triggerPetalShower() {
            let overlay = DOM.get("petal-shower-overlay");
            if (!overlay) {
                overlay = document.createElement("div");
                overlay.id = "petal-shower-overlay";
                overlay.className = "petal-shower-overlay";
                overlay.setAttribute("aria-hidden", "true");
                document.body.appendChild(overlay);
            }

            AnimationEngine.petalShowerTimeouts.forEach(t => clearTimeout(t));
            AnimationEngine.petalShowerTimeouts = [];

            const petalTemplates = [
                (id) => `
                    <svg viewBox="0 0 40 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <linearGradient id="pGrad1_${id}" x1="15%" y1="10%" x2="85%" y2="90%">
                          <stop offset="0%" stop-color="#FCE5E2" />
                          <stop offset="35%" stop-color="#E29E95" />
                          <stop offset="70%" stop-color="#C57067" />
                          <stop offset="100%" stop-color="#8F3C35" />
                        </linearGradient>
                      </defs>
                      <path d="M20 48 C15 42 7 34 5 25 C3 16 7 6 15 3 C19 1 23 2 27 5 C33 9 35 18 33 27 C31 36 24 43 20 48 Z" fill="url(#pGrad1_${id})" />
                    </svg>`,
                (id) => `
                    <svg viewBox="0 0 35 55" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <linearGradient id="pGrad2_${id}" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stop-color="#FFF0ED" />
                          <stop offset="30%" stop-color="#EAA69F" />
                          <stop offset="75%" stop-color="#B85F57" />
                          <stop offset="100%" stop-color="#7B2721" />
                        </linearGradient>
                      </defs>
                      <path d="M17.5 53 C13 46 4 35 3 24 C2 12 9 3 17.5 1 C26 3 33 12 32 24 C31 35 22 46 17.5 53 Z" fill="url(#pGrad2_${id})" />
                    </svg>`,
                (id) => `
                    <svg viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <linearGradient id="pGrad3_${id}" x1="30%" y1="0%" x2="70%" y2="100%">
                          <stop offset="0%" stop-color="#FFF5F2" />
                          <stop offset="40%" stop-color="#E59990" />
                          <stop offset="85%" stop-color="#AD4B42" />
                          <stop offset="100%" stop-color="#70221C" />
                        </linearGradient>
                      </defs>
                      <path d="M22.5 43 C16 38 4 29 2 19 C0 9 9 2 18 3 C20 3.2 21.5 4 22.5 5.5 C23.5 4 25 3.2 27 3 C36 2 45 9 43 19 C41 29 29 38 22.5 43 Z" fill="url(#pGrad3_${id})" />
                    </svg>`
            ];

            const totalPetals = 48;
            const winWidth = window.innerWidth;
            const winHeight = window.innerHeight;

            for (let i = 0; i < totalPetals; i++) {
                const spawnDelay = (i / totalPetals) * 2200;
                const timer = setTimeout(() => {
                    this.spawnShowerPetal(overlay, petalTemplates, winWidth, winHeight);
                }, spawnDelay);
                AnimationEngine.petalShowerTimeouts.push(timer);
            }
        },

        spawnShowerPetal(container, templates, winWidth, winHeight) {
            if (!container) return;

            AnimationEngine.petalCounter++;
            const petalId = `${Date.now()}_${AnimationEngine.petalCounter}`;
            const templateIdx = Math.floor(Math.random() * templates.length);

            const randLayer = Math.random();
            let layerClass, baseScale, maxOpacity, fallDuration, baseWidth, baseHeight;

            if (randLayer < 0.20) {
                layerClass = "layer-fg";
                baseScale = 1.2;
                maxOpacity = 0.95;
                fallDuration = 4.2;
                baseWidth = 32;
                baseHeight = 42;
            } else if (randLayer < 0.75) {
                layerClass = "layer-mg";
                baseScale = 0.95;
                maxOpacity = 0.88;
                fallDuration = 5.2;
                baseWidth = 24;
                baseHeight = 32;
            } else {
                layerClass = "layer-bg";
                baseScale = 0.65;
                maxOpacity = 0.65;
                fallDuration = 6.4;
                baseWidth = 16;
                baseHeight = 22;
            }

            const petalEl = document.createElement("div");
            petalEl.className = `shower-petal ${layerClass}`;
            petalEl.style.width = `${baseWidth}px`;
            petalEl.style.height = `${baseHeight}px`;
            petalEl.innerHTML = templates[templateIdx](petalId);
            container.appendChild(petalEl);

            const startX = Math.random() * (winWidth + 40) - 20;
            const startY = -60;
            const targetY = winHeight + 80;
            const swayAmount = (Math.random() * 80 + 30) * (Math.random() > 0.5 ? 1 : -1);
            const targetX = startX + swayAmount;

            if (typeof gsap !== "undefined") {
                gsap.set(petalEl, {
                    x: startX,
                    y: startY,
                    scale: baseScale,
                    rotationZ: Math.random() * 60 - 30,
                    opacity: 0
                });

                gsap.to(petalEl, {
                    y: targetY,
                    duration: fallDuration,
                    ease: "power1.inOut",
                    onComplete: () => petalEl.remove()
                });

                gsap.to(petalEl, {
                    keyframes: [
                        { x: startX + swayAmount * 0.45, duration: fallDuration * 0.35, ease: "sine.inOut" },
                        { x: startX - swayAmount * 0.2, duration: fallDuration * 0.35, ease: "sine.inOut" },
                        { x: targetX, duration: fallDuration * 0.3, ease: "sine.out" }
                    ]
                });

                gsap.to(petalEl, {
                    rotationZ: "+=120",
                    rotationY: "+=360",
                    duration: fallDuration,
                    ease: "sine.inOut"
                });

                gsap.to(petalEl, {
                    opacity: maxOpacity,
                    duration: 0.35,
                    ease: "power2.out"
                });

                gsap.to(petalEl, {
                    opacity: 0,
                    duration: 0.7,
                    delay: fallDuration - 0.7,
                    ease: "power1.in"
                });
            } else {
                setTimeout(() => petalEl.remove(), fallDuration * 1000);
            }
        }
    };

    /* ==========================================================================
       13. SOCIAL SHARE & CLIPBOARD MANAGER
       ========================================================================== */
    const ShareManager = {
        data: {},

        init(shareConfig) {
            this.data = shareConfig || {
                title: document.title,
                text: "আমাদের শ্রদ্ধেয় শিক্ষকের জন্য একটি বিশেষ শিক্ষক দিবস উপহার ও ডিজিটাল শ্রদ্ধার্ঘ্য দেখুন 🌸",
                url: window.location.href
            };

            const openShareBtns = DOM.queryAll(".btn-open-share");
            const closeBtn = DOM.get("share-close-btn");
            const modal = DOM.get("share-modal-overlay");

            openShareBtns.forEach(btn => {
                btn.addEventListener("click", () => this.openDrawer());
            });

            if (closeBtn) closeBtn.addEventListener("click", () => this.closeDrawer());
            if (modal) {
                modal.addEventListener("click", (e) => {
                    if (e.target === modal) this.closeDrawer();
                });
            }

            // WhatsApp Direct
            const waBtn = DOM.get("share-btn-whatsapp");
            if (waBtn) {
                waBtn.addEventListener("click", () => {
                    const text = `${this.data.text}\n${this.data.url}`;
                    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, "_blank");
                });
            }

            // Native Web Share API
            const nativeBtn = DOM.get("share-btn-native");
            if (nativeBtn) {
                nativeBtn.addEventListener("click", async () => {
                    if (navigator.share) {
                        try {
                            await navigator.share({
                                title: this.data.title,
                                text: this.data.text,
                                url: this.data.url
                            });
                            this.closeDrawer();
                        } catch (err) {
                            if (err.name !== "AbortError") {
                                this.copyToClipboard();
                            }
                        }
                    } else {
                        this.copyToClipboard();
                    }
                });
            }

            // 1-Click Copy Link
            const copyBtn = DOM.get("share-btn-copy");
            if (copyBtn) {
                copyBtn.addEventListener("click", () => this.copyToClipboard());
            }
        },

        openDrawer() {
            const modal = DOM.get("share-modal-overlay");
            if (modal) {
                modal.classList.add("active");
                document.body.style.overflow = "hidden";
            }
        },

        closeDrawer() {
            const modal = DOM.get("share-modal-overlay");
            if (modal) {
                modal.classList.remove("active");
                document.body.style.overflow = "";
            }
        },

        async copyToClipboard() {
            try {
                await navigator.clipboard.writeText(this.data.url);
                DOM.showToast("লিঙ্কটি কপি করা হয়েছে! (Link Copied)");
                this.closeDrawer();
            } catch (err) {
                const tempInput = document.createElement("input");
                tempInput.value = this.data.url;
                document.body.appendChild(tempInput);
                tempInput.select();
                document.execCommand("copy");
                document.body.removeChild(tempInput);
                DOM.showToast("লিঙ্কটি কপি করা হয়েছে! (Link Copied)");
                this.closeDrawer();
            }
        }
    };

    /* ==========================================================================
       14. DYNAMIC CONTENT INJECTOR
       ========================================================================== */
    function populateContent(config) {
        // 1. Opening Screen
        DOM.setText("opening-text-1", config.opening?.line1);
        DOM.setText("opening-text-2", config.opening?.line2);

        // 2. Hero Section
        DOM.setText("hero-date-badge", config.teacher?.heroDate);
        DOM.setText("hero-greeting", config.teacher?.greeting);
        DOM.setText("hero-teacher-name", config.teacher?.name);
        DOM.setText("hero-teacher-title", config.teacher?.title);
        DOM.setText("hero-tagline", config.teacher?.heroTagline);
        DOM.setImage("hero-portrait-img", config.teacher?.portrait, config.teacher?.name);

        // 3. Personal Letter Card
        DOM.setText("letter-heading-tag", config.personalMessage?.heading);
        DOM.setText("letter-salutation", config.personalMessage?.salutation);
        DOM.setText("letter-body", config.personalMessage?.body);
        DOM.setText("letter-footer-note", config.personalMessage?.note);

        // 4. Cinematic Section
        DOM.setText("cinematic-badge", config.cinematic?.badge);
        DOM.setText("cinematic-title", config.cinematic?.tagline);
        DOM.setImage("cinematic-img", config.cinematic?.image, config.teacher?.name);

        // 5. Gallery Section Headers
        DOM.setText("gallery-heading", config.gallery?.heading);
        DOM.setText("gallery-subtitle", config.gallery?.subtitle);

        // 6. Thank You Section
        DOM.setText("thankyou-badge", config.thankYou?.badge);
        DOM.setText("thankyou-heading", config.thankYou?.heading);
        DOM.setText("thankyou-final", config.thankYou?.finalStatement);

        const thankYouLinesContainer = DOM.get("thankyou-lines");
        if (thankYouLinesContainer && config.thankYou?.lines) {
            thankYouLinesContainer.innerHTML = "";
            config.thankYou.lines.forEach(lineText => {
                const lineEl = document.createElement("div");
                lineEl.className = "thankyou-line-item";
                lineEl.textContent = lineText;
                thankYouLinesContainer.appendChild(lineEl);
            });
        }

        // 7. Quote Section
        DOM.setText("quote-text", config.quoteSection?.quote);
        DOM.setText("quote-author", config.quoteSection?.author);
        DOM.setText("quote-subtext", config.quoteSection?.subtext);

        // 8. Student Signature Section
        DOM.setText("signature-prefix", config.signature?.prefix);
        DOM.setText("signature-name", config.signature?.studentName);
        DOM.setText("signature-role", config.signature?.role);

        // 9. Final Greeting
        DOM.setText("final-title", config.finalGreeting?.title);
        DOM.setText("final-teacher-name", config.finalGreeting?.teacherName);
        DOM.setText("final-emotional-line", config.finalGreeting?.emotionalLine);
        DOM.setText("replay-btn-text", config.finalGreeting?.replayText);
        DOM.setText("share-btn-text", "Share Tribute");
    }

    /* ==========================================================================
       15. REPLAY EXPERIENCE ORCHESTRATOR
       ========================================================================== */
    function replayExperience() {
        window.scrollTo({ top: 0, behavior: "smooth" });

        const overlay = DOM.get("petal-shower-overlay");
        if (overlay) overlay.innerHTML = "";
        AnimationEngine.petalShowerTimeouts.forEach(t => clearTimeout(t));
        AnimationEngine.petalShowerTimeouts = [];

        const sig = DOM.query(".signature-svg");
        if (sig) sig.classList.remove("drawn");

        const sigPath = DOM.query(".signature-svg .sig-path");
        const sigLine = DOM.query(".signature-svg .sig-line");
        const pen = DOM.get("fountain-pen");
        if (sigPath && sigLine && pen && typeof gsap !== "undefined") {
            gsap.set(sigPath, { strokeDashoffset: 400 });
            gsap.set(sigLine, { strokeDashoffset: 300 });
            gsap.set(pen, { opacity: 0, x: 0, y: 0 });
        }

        const bookWrap = DOM.get("open-book-wrap");
        if (bookWrap && typeof gsap !== "undefined") {
            gsap.set(bookWrap, { opacity: 0, y: 22, scale: 0.88 });
        }

        const goldLine = DOM.get("thankyou-gold-line");
        if (goldLine) goldLine.classList.remove("drawn");

        const heroImg = DOM.query(".hero-portrait-frame img");
        if (heroImg) heroImg.classList.remove("ken-burns-active");

        if (AnimationEngine.sigTl) {
            if (AnimationEngine.sigTl.scrollTrigger) AnimationEngine.sigTl.scrollTrigger.kill();
            AnimationEngine.sigTl.kill();
            AnimationEngine.sigTl = null;
        }

        setTimeout(() => {
            if (typeof ScrollTrigger !== "undefined") {
                ScrollTrigger.getAll().forEach(st => st.kill());
            }
            AnimationEngine.initScrollAnimations();
            AnimationEngine.initScrollProgressBar();
            Preloader.playOpening(true);
        }, 500);
    }

    /* ==========================================================================
       16. APPLICATION INITIALIZATION & FAULT-TOLERANT BOOTSTRAPPER
       ========================================================================== */
    function initApplication() {
        const config = window.TRIBUTE_CONFIG || {};

        // 1. Content Population
        populateContent(config);

        // 2. Particle Engine & Cursor
        ParticleEngine.init();
        CursorEngine.init();

        // 3. Theme Engine
        ThemeEngine.init();

        // 4. Preloader Opening Experience
        Preloader.init();

        // 5. Scroll & Motion Animations
        AnimationEngine.init();

        // 6. Letter Card Engine
        LetterEngine.init();

        // 7. Gallery & Lightbox
        GalleryManager.init(config.gallery);

        // 8. Music & Sound Controller
        MusicController.init(config.music);

        // 9. Petal Blessing Cannon
        PetalBlessingEngine.init();

        // 10. Social Share
        ShareManager.init(config.share);

        // 11. Replay Button
        const replayBtn = DOM.get("replay-btn");
        if (replayBtn) {
            replayBtn.addEventListener("click", replayExperience);
        }
    }

    // Lifecycle bootstrapper
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initApplication);
    } else {
        initApplication();
    }

    // Global Namespace Export
    window.TeacherTribute = {
        Preloader,
        AnimationEngine,
        ParticleEngine,
        Card3DEngine,
        GalleryManager,
        MusicController,
        ThemeEngine,
        ShareManager,
        PetalBlessingEngine,
        replayExperience
    };

})();
