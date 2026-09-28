/**
 * Sangili S | Full Stack Developer & SaaS Architect Portfolio
 * Interactive Script Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Dynamic Copyright Year
    const yearSpan = document.getElementById('copyrightYear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // 2. Navbar Scrolled Glassmorphism State
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 3. Smooth Scrolling for Internal Navigation Links
    document.querySelectorAll('a.nav-link, .footer-nav-link, a.btn[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#') && href.length > 1) {
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    e.preventDefault();
                    const headerOffset = 75;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });

                    // Close mobile navbar collapse if open
                    const navbarCollapse = document.getElementById('navbarNav');
                    if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                        const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                        if (bsCollapse) {
                            bsCollapse.hide();
                        }
                    }
                }
            }
        });
    });

    // 4. ScrollSpy for Active Navigation Link
    window.addEventListener('scroll', () => {
        let currentSection = '';
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        const scrollPosition = window.pageYOffset + 120;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });
});

/**
 * Filter Projects by Category
 */
function filterProjects(category) {
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        if (btn.getAttribute('data-filter') === category) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    const projectCards = document.querySelectorAll('.project-item-col');
    projectCards.forEach(col => {
        const itemCategory = col.getAttribute('data-category');
        if (category === 'all' || itemCategory === category) {
            col.classList.remove('d-none');
            setTimeout(() => {
                col.style.opacity = '1';
                col.style.transform = 'scale(1)';
            }, 30);
        } else {
            col.style.opacity = '0';
            col.style.transform = 'scale(0.96)';
            setTimeout(() => {
                col.classList.add('d-none');
            }, 250);
        }
    });
}

// 5. Comprehensive Case Study Modal Data & Renderer
const caseStudyData = {
    dsr: {
        title: "DSR Sarees — Full-Featured E-Commerce Website",
        category: "E-Commerce & Retail • 25 Days Execution",
        liveUrl: "https://dsrsarees.com/",
        challenge: "Developing an end-to-end ethnic fashion commerce platform capable of handling complex weight and distance-based courier tariffs, personalized and anniversary coupon workflows, high-resolution media storage, and reliable transaction reconciliation.",
        solution: "Built on Laravel and MySQL with modular controllers and service layers. Implemented automated shipping fee algorithms factoring in destination zip codes and volumetric weights. Created customer-specific coupon engines supporting anniversary and birthday triggers. Integrated AWS S3 for scalable media bucket storage and CCAvenue payment gateway with cryptographic transaction checksums.",
        metrics: "100% automated order-to-shipping pipeline; zero checkout bottlenecks during peak festival sale traffic; seamless sub-second image asset loading via AWS S3.",
        tech: ["Laravel", "PHP", "MySQL", "AWS S3", "CCAvenue Payment Gateway", "Bootstrap", "JavaScript", "AJAX", "REST APIs"]
    },
    tailee: {
        title: "Tailee — Geolocation-Driven E-Commerce Website",
        category: "Geo-Commerce & Retail • 15 Days Execution",
        liveUrl: "https://tailee.apps.org.in/",
        challenge: "Restricting product purchasing based on customer geolocation radius and store proximity, while implementing custom regulatory checkout rules (restricting cash-on-delivery for sensitive pet products) and handling fallback routing when products are unavailable locally.",
        solution: "Integrated Google Maps JavaScript API with client geolocation to determine exact user coordinates against branch delivery polygons. Built dynamic store selector fallback enabling customers to switch to alternate branches when local inventories were depleted. Implemented business validation middleware that toggles payment options based on shopping cart item classifications before dispatching to Razorpay.",
        metrics: "Delivered in 15 days from spec to production; eliminated out-of-zone delivery cancellations; 100% payment gateway validation compliance for regulated goods.",
        tech: ["Laravel", "PHP", "MySQL", "Google Maps JavaScript API", "Geolocation", "Razorpay Gateway", "Bootstrap", "AJAX"]
    },
    bashco: {
        title: "Bashco — Loyalty Rewards E-Commerce Website",
        category: "Retail & FinTech • 20+ Days Execution",
        liveUrl: "https://bashco.apps.org.in/",
        challenge: "Integrating an existing brick-and-mortar loyalty membership customer base into an e-commerce platform, enabling live points accumulation, real-time points-to-currency redemption, third-party delivery dispatch, and Caribbean payment gateway integration.",
        solution: "Engineered a loyalty account lookup engine keyed on customer loyalty numbers with race-condition prevention. Built an algorithmic conversion engine mapping 10 Loyalty Points = 1 Jamaican Dollar (JMD) with partial or full checkout point redemption. Integrated AmberPay payment gateway and automated waybill/dispatch creation via Tara Courier logistics APIs.",
        metrics: "Successfully processed thousands of loyalty customer registrations and point redemptions; automated delivery waybill generation eliminating manual dispatch overhead.",
        tech: ["Laravel", "PHP", "MySQL", "AmberPay Gateway", "Tara Courier API", "Bootstrap", "JavaScript", "AJAX", "REST APIs"]
    },
    monitoring: {
        title: "Employee Live Monitoring SaaS",
        category: "Enterprise SaaS • Production Telemetry",
        challenge: "Handling concurrent real-time screen captures, mouse and keyboard idle event streams, and time-tracking telemetry across 1,000+ distributed worker endpoints without CPU starvation or database connection exhaustion.",
        solution: "Architected a decoupled event ingestion pipeline powered by Node.js and Socket.io with lightweight binary telemetry packets. Designed compound MongoDB indexing ({ organizationId: 1, userId: 1, timestamp: -1 }) and optimized aggregation pipelines for instantaneous dashboard reporting. Encapsulated socket nodes into Docker microservices for horizontal scaling behind Nginx load balancers.",
        metrics: "Maintained 1,000+ concurrent active socket endpoints with <60ms event latency; reduced aggregation query latency on MongoDB by 40% while processing millions of daily activity logs.",
        tech: ["Next.js", "Node.js", "WebSockets", "Socket.io", "MongoDB", "Compound Indexing", "Docker", "Nginx"]
    },
    erp: {
        title: "Multi-Domain ERP & Business Management Suite",
        category: "Enterprise ERP • Operational Architectures",
        challenge: "Developing tailored business management systems across diverse, rigorous industries (Medical Agency inventory, Electronic Motor equipment diagnostics, Astrology consultancy, and WhatsApp Agent operations) with unique operational constraints and security requirements.",
        solution: "Designed domain-driven architectures with modular admin panels and workflow automation engines. Developed high-efficiency REST APIs using Node.js, NestJS, and Laravel. Implemented granular Role-Based Access Control (RBAC), multi-level authorization workflows, database query optimization across PostgreSQL and MySQL, and integrated third-party telemetry and payment gateways.",
        metrics: "Centralized cross-department operations across multiple commercial enterprises; reduced manual reporting hours by 65%; maintained 99.9% system availability.",
        tech: ["React.js", "Next.js", "Node.js", "Express.js", "NestJS", "Laravel", "PostgreSQL", "MySQL", "REST APIs", "GitLab CI/CD"]
    },
    aethera: {
        title: "Aethera — High-Performance Static Web Application",
        category: "Modern Web UI/UX • 1 Day Execution",
        liveUrl: "https://aethera.goodmayesonline.com/",
        challenge: "Rapidly designing, developing, and deploying a visually stunning, responsive static web experience within a strict 24-hour turnaround window without compromising visual hierarchy or mobile ergonomics.",
        solution: "Developed using React.js and Tailwind CSS utility architecture. Built custom component abstractions, fluid typography scaling, optimized SVG icon sprites, and dark mode contrast ratios. Configured automated build pipelines for high-performance static asset hosting.",
        metrics: "Delivered from zero to live production in 1 day; 100% responsive across mobile, tablet, and ultra-wide screens; achieved 98+ Lighthouse performance rating.",
        tech: ["React.js", "Tailwind CSS", "JavaScript (ES6+)", "Vite", "Responsive Design"]
    },
    whatsapp: {
        title: "Lead Management & WhatsApp Automation SaaS",
        category: "MarTech SaaS • Litz Tech India Private Limited",
        challenge: "High volume of inbound leads from multi-channel marketing campaigns experienced slow response times and dropped leads due to lack of real-time sales agent dispatching and unreliable webhook consumption.",
        solution: "Built an event-driven webhook ingestion gateway integrated with WhatsApp Cloud Business API. Implemented cryptographic HMAC signature verification, message deduplication, and dynamic sales assignment round-robin logic based on agent availability and language. Configured an automated conversational bot for instant lead qualification and real-time conversion KPI dashboards.",
        metrics: "Achieved 99.9% webhook delivery reliability; reduced lead first-response time from hours to under 8 seconds; increased qualified lead conversion rates by 32%.",
        tech: ["React.js", "Node.js", "Express", "Webhooks", "WhatsApp Business API", "MySQL", "HMAC Auth", "REST APIs"]
    },
    hostel: {
        title: "Multi-Tenant Hostel Management SaaS",
        category: "Multi-Tenant SaaS • Litz Tech India Private Limited",
        challenge: "Managing multi-property tenant lifecycle tracking, dynamic room allocation matrices, automated cyclical billing, and digital check-ins while strictly preventing cross-property tenant data leakage.",
        solution: "Engineered tenant database isolation schemas in PostgreSQL and Laravel. Developed dynamic room inventory allocation matrices, automated monthly invoice generation with PDF receipt dispatch, and QR-based digital check-in/out verification workflows with granular Role-Based Access Control.",
        metrics: "Zero cross-tenant data leaks; 100% automated invoicing pipeline saving 30+ administrative hours per month; instantaneous QR visitor and tenant validation.",
        tech: ["Laravel", "React.js", "PostgreSQL", "JWT Authentication", "Role-Based Access Control (RBAC)", "REST APIs", "Bootstrap"]
    },
    school: {
        title: "Smart School Management System",
        category: "EdTech ERP • Litz Tech India Private Limited",
        challenge: "Coordinating multi-tier administrative workflows across admissions, daily attendance logging, fee collections, exam scheduling, and instantaneous communication to thousands of parents with high deliverability.",
        solution: "Built a centralized educational ERP on React.js, Next.js, and Node.js with MySQL. Designed a daily attendance tracking module with an automated SMS dispatch engine triggering instant alerts to parents for absent students. Implemented an end-to-end fee collection accounting ledger with fee receipt generation and term reconciliation dashboards.",
        metrics: "Processed real-time attendance for thousands of students; automated instantaneous SMS absence alerts with 99.8% gateway delivery; reduced fee ledger manual reconciliation errors to zero.",
        tech: ["React.js", "Next.js", "TypeScript", "Node.js", "MySQL", "SMS Gateway API", "REST APIs", "Bootstrap 5"]
    }
};

/**
 * Open Case Study Architecture Modal
 */
function openCaseStudyModal(studyKey) {
    const data = caseStudyData[studyKey];
    if (!data) return;

    document.getElementById('caseStudyModalLabel').textContent = data.title;
    document.getElementById('modalCategoryBadge').textContent = data.category;
    document.getElementById('modalChallengeText').textContent = data.challenge;
    document.getElementById('modalSolutionText').textContent = data.solution;
    document.getElementById('modalMetricsText').textContent = data.metrics;

    const tagsContainer = document.getElementById('modalTechTags');
    tagsContainer.innerHTML = '';
    data.tech.forEach(tech => {
        const badge = document.createElement('span');
        badge.className = 'tech-chip';
        badge.textContent = tech;
        tagsContainer.appendChild(badge);
    });

    const actionContainer = document.getElementById('modalActionContainer');
    actionContainer.innerHTML = '';

    if (data.liveUrl) {
        const liveBtn = document.createElement('a');
        liveBtn.href = data.liveUrl;
        liveBtn.target = '_blank';
        liveBtn.rel = 'noopener noreferrer';
        liveBtn.className = 'btn btn-primary-gradient btn-sm';
        liveBtn.innerHTML = '<i class="bi bi-box-arrow-up-right me-1"></i> Open Live Site ↗';
        actionContainer.appendChild(liveBtn);

        document.getElementById('modalNdaNotice').innerHTML = '<i class="bi bi-check-circle-fill text-success me-1"></i> Live Production System';
    } else {
        document.getElementById('modalNdaNotice').innerHTML = '<i class="bi bi-shield-lock-fill text-warning me-1"></i> Enterprise NDA &bull; Proprietary System';
    }

    const closeBtn = document.createElement('button');
    closeBtn.type = 'button';
    closeBtn.className = 'btn btn-outline-custom btn-sm';
    closeBtn.setAttribute('data-bs-dismiss', 'modal');
    closeBtn.textContent = 'Close Overview';
    actionContainer.appendChild(closeBtn);

    const modalElement = document.getElementById('caseStudyModal');
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
}

/**
 * One-Click Copy Email to Clipboard
 */
function copyEmailToClipboard(btn) {
    const email = 'sangilis423@gmail.com';
    navigator.clipboard.writeText(email).then(() => {
        const originalHtml = btn.innerHTML;
        btn.innerHTML = '<i class="bi bi-check-lg text-success"></i> Copied!';
        setTimeout(() => {
            btn.innerHTML = originalHtml;
        }, 2200);
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
}

/**
 * Handle Contact Form Submission
 */
function handleContactSubmit(event) {
    event.preventDefault();
    const submitBtn = document.getElementById('submitBtn');
    const feedback = document.getElementById('formFeedback');
    const name = document.getElementById('userName').value.trim();
    const email = document.getElementById('userEmail').value.trim();
    const type = document.getElementById('projectType').value;

    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Transmitting...';

    // Simulate reliable dispatch
    setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="bi bi-check2-circle"></i> Message Transmitted!';
        
        feedback.style.display = 'block';
        feedback.className = 'mt-3 text-center small text-success';
        feedback.innerHTML = `<strong>Thank you, ${name}!</strong> Your inquiry regarding <em>${type}</em> has been registered. You can also reach me directly at <a href="mailto:sangilis423@gmail.com" class="text-info text-decoration-none">sangilis423@gmail.com</a>.`;

        document.getElementById('contactForm').reset();

        setTimeout(() => {
            submitBtn.innerHTML = '<i class="bi bi-send-fill"></i> Send Message';
        }, 4000);
    }, 700);
}
