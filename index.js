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
                    hero_subtitle: 'The Decentralized Digital Fortress',
                    about_title: 'ABOUT CYBERLITOCOIN',
                    about_para1: 'Cyberlitocoin is not just a digital asset, it\'s a testament to the digital revolution. Built on a quantum-resilient blockchain, it\'s designed to withstand the threats of tomorrow, today.',
                    about_para2: 'We offer a sanctuary for your assets in the volatile sea of the digital world. Security, Speed, and Sovereignty are our guiding principles.',
                    guide_title: 'HOW TO GET CYBERLITOCOIN',
                    guide1_title: '1. Decentralized Crypto Exchanges (DEXs)',
                    guide1_desc: 'The most common way to get Cyberlitocoin is through crypto exchanges. Look for Cyberlitocoin on major decentralized exchanges (DEXs) that support trading pairs with tokens like ETH, BTC, or stablecoins.',
                    guide2_title: '2. Network Participation',
                    guide2_desc: 'You can earn Cyberlitocoin by participating in our network. Through the Proof-of-Synthesis mechanism, you can validate transactions and earn rewards.',
                    guide3_title: '3. Community Reward Programs',
                    guide3_desc: 'We regularly host bounty programs and airdrops for our valuable community members. Keep an eye on our official community channels for announcements and opportunities to earn free Cyberlitocoin.',
                    services_title: 'JOIN NOW, EXPLORE THE FUTURE',
                    services_subtitle: 'Cyberlitocoin is more than a currency, it\'s your key to digital sovereignty.',
                    service1_title: 'Quantum Shield',
                    service1_desc: 'Your transactions are guarded by the next generation of cryptographic security.',
                    service2_title: 'Light Speed',
                    service2_desc: 'Instant transactions for a frictionless digital experience.',
                    service3_title: 'Total Sovereignty',
                    service3_desc: 'Full control over your assets, free from third-party intervention.',
                    community_title: 'THE COLLECTIVE',
                    community_para1: 'The Collective is the backbone of Cyberlitocoin. A diverse group of cryptographers, digital nomads, and visionaries, all dedicated to the future of a free internet.',
                    community_para2: 'Join us in our secure channels and help shape the future of this network. Your expertise is our power.',
                    footer_text: '© 2025 Cyberlitocoin. All Rights Reserved.'
                },
                id: {
                    hero_subtitle: 'Benteng Digital yang Terdesentralisasi',
                    about_title: 'TENTANG CYBERLITOCOIN',
                    about_para1: 'Cyberlitocoin bukan sekadar aset digital, ini adalah bukti revolusi digital. Dibangun di atas blockchain yang tangguh terhadap kuantum, ia dirancang untuk menghadapi ancaman masa depan, hari ini.',
                    about_para2: 'Kami menawarkan tempat perlindungan untuk aset Anda di lautan dunia digital yang bergejolak. Keamanan, Kecepatan, dan Kedaulatan adalah prinsip panduan kami.',
                    guide_title: 'CARA MENDAPATKAN CYBERLITOCOIN',
                    guide1_title: '1. Pertukaran Kripto Terdesentralisasi (DEX)',
                    guide1_desc: 'Cara paling umum untuk mendapatkan Cyberlitocoin adalah melalui pertukaran kripto. Carilah Cyberlitocoin di pertukaran terdesentralisasi (DEX) utama yang mendukung pasangan perdagangan dengan token seperti ETH, BTC, atau stablecoin.',
                    guide2_title: '2. Partisipasi Jaringan',
                    guide2_desc: 'Anda dapat memperoleh Cyberlitocoin dengan berpartisipasi dalam jaringan kami. Melalui mekanisme Proof-of-Synthesis, Anda dapat memvalidasi transaksi dan mendapatkan hadiah.',
                    guide3_title: '3. Program Hadiah Komunitas',
                    guide3_desc: 'Kami secara rutin menyelenggarakan program hadiah dan airdrop untuk anggota komunitas yang berharga. Pantau terus saluran komunitas resmi kami untuk mendapatkan pengumuman dan peluang untuk mendapatkan Cyberlitocoin gratis.',
                    services_title: 'GABUNG SEKARANG, JELAJAHI MASA DEPAN',
                    services_subtitle: 'Cyberlitocoin bukan sekadar mata uang, ini adalah kunci Anda menuju kedaulatan digital.',
                    service1_title: 'Perisai Kuantum',
                    service1_desc: 'Transaksismu dilindungi oleh keamanan kriptografi generasi berikutnya.',
                    service2_title: 'Kecepatan Cahaya',
                    service2_desc: 'Transaksi instan untuk pengalaman digital yang tanpa hambatan.',
                    service3_title: 'Kedaulatan Total',
                    service3_desc: 'Kendali penuh atas asetmu, tanpa campur tangan pihak ketiga.',
                    community_title: 'KOLEKTIF',
                    community_para1: 'Kolektif adalah tulang punggung Cyberlitocoin. Kelompok beragam yang terdiri dari ahli kriptografi, nomad digital, dan visioner, semuanya berdedikasi untuk masa depan internet yang bebas.',
                    community_para2: 'Bergabunglah dengan kami di saluran aman kami dan bantu bentuk masa depan jaringan ini. Keahlian Anda adalah kekuatan kami.',
                    footer_text: '© 2025 Cyberlitocoin. Hak Cipta Dilindungi.'
                }
            };
            let currentLang = 'en';

            /**
             * Updates the canvas dimensions to match the window size.
             */
            function resizeCanvas() {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            }

            /**
             * A particle object for the background effect.
             * @param {number} x - The initial x-coordinate.
             * @param {number} y - The initial y-coordinate.
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
                 * Draws the particle on the canvas.
                 */
                draw() {
                    ctx.fillStyle = '#00FFFF';
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                    ctx.fill();
                }

                /**
                 * Updates the particle's position and interaction.
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
             * Initializes the particles array.
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
             * Connects particles with lines if they are close enough.
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
             * Main animation loop for the canvas.
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

            // Parallax and Scroll Animations
            const heroSection = document.getElementById('hero');

            /**
             * Handles the hero section parallax effect.
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
             * Language toggle functionality.
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
                
                // Update the button text based on the new language
                if (currentLang === 'id') {
                    langButton.textContent = 'English';
                } else {
                    langButton.textContent = 'Indonesia';
                }
            }

            langButton.addEventListener('click', toggleLanguage);

            // Initial setup
            resizeCanvas();
            initParticles();
            animateCanvas();
            window.addEventListener('resize', () => {
                resizeCanvas();
                initParticles();
            });
            window.addEventListener('scroll', handleParallax);
        });