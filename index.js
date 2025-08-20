        document.addEventListener('DOMContentLoaded', () => {
            const canvas = document.getElementById('particles-canvas');
            const ctx = canvas.getContext('2d');
            let particles = [];
            const particleCount = 200;
            const heroTitle = document.querySelector('#hero h1');
            const heroSubtitle = document.querySelector('#hero p');
            const langButton = document.getElementById('lang-button');
            const langData = {
                en: {
                    hero_subtitle: 'SYNTHESIS',
                    about_title: 'ABOUT',
                    about_para1: 'We are a digital entity operating outside conventional boundaries. By combining historical data and predictive algorithms, we create virtual prototypes that reshape reality.',
                    about_para2: 'The future does not wait. We create it.',
                    guide_title: 'SERVICE GUIDE',
                    guide1_title: '1. Holographic Projection',
                    guide1_desc: 'To request a projection, provide us with a 3D data file (.obj, .fbx) and specify your desired dimensions. We will process it and deliver an interactive hologram preview to your terminal.',
                    guide2_title: '2. Data Reconstruction',
                    guide2_desc: 'Upload fragmented data. Our algorithms will analyze patterns and reconstruct the missing information. Processing time varies depending on the level of corruption.',
                    guide3_title: '3. Nanotechnology Design',
                    guide3_desc: 'Describe the desired functionality and materials. Our AI will create a customized molecular blueprint and simulate its behavior prior to fabrication.',
                    services_title: 'SYNTHESIS SERVICES',
                    service1_title: 'Holographic Projection',
                    service1_desc: 'Interactive and detailed 3D data visualization.',
                    service2_title: 'Data Reconstruction',
                    service2_desc: 'Restoring and analyzing corrupted information.',
                    service3_title: 'Nanotechnology Design',
                    service3_desc: 'Creating prototypes at a molecular scale.',
                    community_title: 'COMMUNITY',
                    community_para1: 'Join our network of forward-thinkers, digital artists, and ethical hackers. Share your ideas, collaborate on projects, and shape the cyber future with us.',
                    community_para2: 'Here, you\'ll find exclusive resources, secure discussion forums, and invitations to our private events. Let\'s connect and push the boundaries of reality.',
                    footer_text: '© 2025 Cyberpunk Synthesis. All Rights Reserved.'
                },
                id: {
                    hero_subtitle: 'SYNTHESIS',
                    about_title: 'TENTANG KAMI',
                    about_para1: 'Kami adalah entitas digital yang beroperasi di luar batas konvensional. Dengan menggabungkan data historis dan algoritma prediksi, kami menciptakan prototipe virtual yang mengubah realitas.',
                    about_para2: 'Masa depan tidak menunggu. Kita yang menciptakannya.',
                    guide_title: 'PANDUAN LAYANAN',
                    guide1_title: '1. Proyeksi Holografik',
                    guide1_desc: 'Untuk meminta proyeksi, berikan kami file data 3D (.obj, .fbx) dan tentukan dimensi yang Anda inginkan. Kami akan mengolahnya dan mengirimkan pratinjau hologram interaktif ke terminal Anda.',
                    guide2_title: '2. Rekonstruksi Data',
                    guide2_desc: 'Unggah fragmen data yang rusak. Algoritma kami akan menganalisis pola dan merekonstruksi informasi yang hilang. Waktu pemrosesan bervariasi tergantung pada tingkat kerusakan.',
                    guide3_title: '3. Desain Nanoteknologi',
                    guide3_desc: 'Jelaskan fungsionalitas dan bahan yang Anda inginkan. AI kami akan membuat cetak biru molekuler yang disesuaikan dan mensimulasikan perilakunya sebelum fabrikasi.',
                    services_title: 'LAYANAN SYNTESIS',
                    service1_title: 'Proyeksi Holografik',
                    service1_desc: 'Visualisasi data 3D yang interaktif dan detail.',
                    service2_title: 'Rekonstruksi Data',
                    service2_desc: 'Memulihkan dan menganalisis informasi yang hilang.',
                    service3_title: 'Desain Nanoteknologi',
                    service3_desc: 'Menciptakan prototipe pada skala molekuler.',
                    community_title: 'KOMUNITAS',
                    community_para1: 'Bergabunglah dengan jaringan individu berpandangan ke depan, seniman digital, dan peretas etis kami. Bagikan ide-ide Anda, berkolaborasi dalam proyek, dan bentuk masa depan siber bersama kami.',
                    community_para2: 'Di sini, Anda akan menemukan sumber daya eksklusif, forum diskusi yang aman, dan undangan ke acara pribadi kami. Mari terhubung dan mendorong batas-batas realitas.',
                    footer_text: '© 2025 Cyberpunk Synthesis. All Rights Reserved.'
                }
            };
            let currentLang = 'id';

            /**
            * Memperbarui dimensi kanvas agar sesuai dengan ukuran jendela.
            */
            function resizeCanvas() {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            }

            /**
             * Objek partikel untuk efek latar belakang.
             * @param {number} x - Koordinat x awal.
             * @param {number} y - Koordinat y awal.
             */
            class Particle {
                constructor(x, y) {
                    this.x = x;
                    this.y = y;
                    this.size = Math.random() * 2 + 0.5;
                    this.baseX = this.x;
                    this.baseY = this.y;
                    this.density = (Math.random() * 30) + 1;
                }

                /**
                 * Menggambar partikel pada kanvas.
                 */
                draw() {
                    ctx.fillStyle = '#00FFFF';
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                    ctx.fill();
                }

                /**
                 * Memperbarui posisi dan interaksi partikel.
                 */
                update() {
                    let dx = mouse.x - this.x;
                    let dy = mouse.y - this.y;
                    let distance = Math.sqrt(dx * dx + dy * dy);
                    let forceDirectionX = dx / distance;
                    let forceDirectionY = dy / distance;
                    let maxDistance = mouse.radius;
                    let force = (maxDistance - distance) / maxDistance;
                    let directionX = forceDirectionX * force * this.density;
                    let directionY = forceDirectionY * force * this.density;

                    if (distance < mouse.radius) {
                        this.x -= directionX;
                        this.y -= directionY;
                    } else {
                        if (this.x !== this.baseX) {
                            let dx = this.x - this.baseX;
                            this.x -= dx / 10;
                        }
                        if (this.y !== this.baseY) {
                            let dy = this.y - this.baseY;
                            this.y -= dy / 10;
                        }
                    }
                }
            }

            let mouse = {
                x: null,
                y: null,
                radius: 150
            };

            window.addEventListener('mousemove', (event) => {
                mouse.x = event.x;
                mouse.y = event.y;
            });

            window.addEventListener('mouseout', () => {
                mouse.x = undefined;
                mouse.y = undefined;
            });

            /**
             * Menginisialisasi susunan partikel.
             */
            function initParticles() {
                particles = [];
                for (let i = 0; i < particleCount; i++) {
                    let x = Math.random() * canvas.width;
                    let y = Math.random() * canvas.height;
                    particles.push(new Particle(x, y));
                }
            }

            /**
             * Menghubungkan partikel dengan garis jika jaraknya cukup dekat.
             */
            function connect() {
                let opacityValue = 1;
                for (let a = 0; a < particles.length; a++) {
                    for (let b = a; b < particles.length; b++) {
                        let distance = ((particles[a].x - particles[b].x) * (particles[a].x - particles[b].x)) +
                                       ((particles[a].y - particles[b].y) * (particles[a].y - particles[b].y));
                        if (distance < (canvas.width / 7) * (canvas.height / 7)) {
                            opacityValue = 1 - (distance / 20000);
                            ctx.strokeStyle = `rgba(0, 255, 255, ${opacityValue})`;
                            ctx.lineWidth = 1;
                            ctx.beginPath();
                            ctx.moveTo(particles[a].x, particles[a].y);
                            ctx.lineTo(particles[b].x, particles[b].y);
                            ctx.stroke();
                        }
                    }
                }
            }

            /**
             * Putaran animasi utama untuk kanvas.
             */
            function animateCanvas() {
                requestAnimationFrame(animateCanvas);
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                for (let i = 0; i < particles.length; i++) {
                    particles[i].update();
                    particles[i].draw();
                }
                connect();
            }

            // Animasi Paralaks dan Gulir
            const heroSection = document.getElementById('hero');

            /**
             * Menangani efek paralaks bagian pahlawan.
             */
            function handleParallax() {
                const scrollY = window.pageYOffset;
                heroTitle.style.transform = `translateY(${scrollY * 0.5}px)`;
                heroSubtitle.style.transform = `translateY(${scrollY * 0.3}px)`;
            }

            // Observer for fade-in animations
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.2 });

            const sectionsToAnimate = document.querySelectorAll('.fade-in-on-scroll');
            sectionsToAnimate.forEach(section => {
                observer.observe(section);
            });

            /**
             * Fungsionalitas pengalih bahasa.
             */
            function toggleLanguage() {
                currentLang = currentLang === 'id' ? 'en' : 'id';
                const elementsToTranslate = document.querySelectorAll('[data-lang-key]');
                elementsToTranslate.forEach(element => {
                    const key = element.getAttribute('data-lang-key');
                    if (langData[currentLang][key]) {
                        element.textContent = langData[currentLang][key];
                    }
                });
                
                // Perbarui teks tombol berdasarkan bahasa baru
                if (currentLang === 'id') {
                    langButton.textContent = 'English';
                } else {
                    langButton.textContent = 'Indonesia';
                }
            }

            langButton.addEventListener('click', toggleLanguage);

            // Pengaturan awal
            resizeCanvas();
            initParticles();
            animateCanvas();
            window.addEventListener('resize', () => {
                resizeCanvas();
                initParticles();
            });
            window.addEventListener('scroll', handleParallax);
        });