import React, { useEffect, useRef, useState, useCallback, Suspense } from 'react';
import { Menu, X, Github, Linkedin, Mail, ArrowUpRight, Send } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere } from '@react-three/drei';

gsap.registerPlugin(ScrollTrigger);

// ============================================================================
// DATA MODULES
// ============================================================================
const projectsData = [
  {
    id: 'homeserver',
    title: 'HomeServer Frontend',
    category: 'Web Application',
    description: 'Developed a personal cloud storage platform featuring secure file upload/download, user authentication, and a responsive UI using React. Implemented modern UI/UX principles for cross-device compatibility with focus on data privacy and security.',
    tech: ['React', 'Node.js', 'UI/UX', 'Authentication'],
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200&q=80',
    githubLink: null, // No GitHub repo for this project
    alt: 'HomeServer cloud storage interface'
  },
  {
    id: 'product-details-application',
    title: 'Product Details Application',
    category: 'Full-Stack Application',
    description: 'Developed a comprehensive product management application for organizing and displaying product information. Features include product catalog management, detailed product views, and efficient data handling with modern web technologies.',
    tech: ['React', 'Node.js', 'Database', 'REST API'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80',
    githubLink: 'https://github.com/shanavasvb/product-details-application',
    alt: 'Product details management application'
  },
  {
    id: 'barcode-processor',
    title: 'Barcode Product Data Processor',
    category: 'Automation & AI',
    description: 'Created an automation script in Python for fetching data from barcodes in Excel. Integrated OpenFoodFacts, Google APIs, and DigiEyes API for data aggregation. Implemented AI-based product categorization using Gemini, GPT-3.5, and DeepSeek models with offline caching and batch processing for large datasets.',
    tech: ['Python', 'AI/ML', 'APIs', 'Excel Automation'],
    image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=1200&q=80',
    githubLink: 'https://github.com/shanavasvb/product-details-project-script',
    alt: 'Barcode scanning and data processing system'
  },
  {
    id: 'termigram',
    title: 'Termigram',
    category: 'CLI Application',
    description: 'Built a terminal-based Telegram client application allowing users to send and receive messages directly from the command line. Features include real-time messaging, contact management, and an intuitive CLI interface for power users who prefer terminal workflows.',
    tech: ['Python', 'Telegram API', 'CLI', 'Real-time'],
    image: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=1200&q=80',
    githubLink: 'https://github.com/shanavasvb/termigram',
    alt: 'Terminal-based Telegram client'
  },
  {
    id: 'family-directory',
    title: 'Family Directory',
    category: 'Full-Stack Application',
    description: 'Designed a web-based family directory app using React and Node.js with member profiles, event scheduling, and message boards. Focused on data privacy and responsive design across devices, creating an intuitive platform for family communication and organization.',
    tech: ['React', 'Node.js', 'MongoDB', 'Real-time Messaging'],
    image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=1200&q=80',
    githubLink: 'https://github.com/shanavasvb/familydirectory',
    alt: 'Family directory web application interface'
  }
];
const achievementsData = [


  {
    id: 1,
    image: 'src/images/kmm1.jpeg',
    title: 'Winner – Typing Challenge',
    description: 'Secured first place in typing challenge competition, showcasing speed and accuracy in technical typing skills essential for development work.',
    subtitle: 'Inter-College Competition'
  },
  {
    id: 2,
    image: 'src/images/takshak.jpeg',
    title: 'Winner – Web Designing Competition ,Takshak 2025',
    description: 'Won web designing competition at M.A College, demonstrating creative UI/UX design skills and modern web development techniques.',
    subtitle: 'M.A College – Design Competition'
  },
  {
    id: 3,
    image: 'src/images/kmm2.jpeg',
    title: 'Winner – Debugging Competition',
    description: 'Achieved first place in debugging competition, showcasing analytical thinking and problem-solving abilities in identifying and fixing code issues.',
    subtitle: 'Technical Competition'
  },
  {
    id: 4,
    image: 'https://placehold.co/800x500/8b5cf6/ffffff?text=KKEM+Bootcamp',
    title: 'Software Development Bootcamp',
    description: 'Successfully completed intensive software development bootcamp by Kerala Knowledge Economy Mission (KKEM), gaining hands-on experience in modern development practices.',
    subtitle: 'Kerala Knowledge Economy Mission'
  },
  {
  id: 5,
  image: 'https://placehold.co/800x500/ec4899/ffffff?text=Tech+Conferences',
  title: 'Tech Conference Participant',
  description: 'Actively participated in major tech conferences including Seasides and Cocoon, engaging with industry leaders, attending technical workshops, and networking with fellow developers. Gained valuable insights into emerging technologies, best practices, and industry trends while building connections within the tech community.',
  subtitle: 'Seasides & Cocoon Conferences'
}

 
];

const skillsData = [
  { name: 'React & Next.js', level: 65 },
  { name: 'Node.js & Express', level: 60 },
  { name: 'MongoDB & PostgreSQL', level: 65 },
  { name: 'Kotlin', level: 55 },
  { name: 'Swift', level: 60 },
];

const additionalTools = ['Git', 'Docker', 'AWS', 'Figma', 'Redux', 'GraphQL', 'REST APIs', 'CI/CD', 'Vercel'];

// ============================================================================
// PREMIUM LOADER COMPONENT
// ============================================================================
const PremiumLoader = ({ onComplete }) => {
  const loaderRef = useRef(null);
  const ringRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          gsap.to(loaderRef.current, {
            opacity: 0,
            duration: 0.8,
            ease: 'power2.inOut',
            onComplete: () => {
              document.body.style.overflow = 'auto';
              onComplete();
            }
          });
        }
      });

      tl.to(ringRef.current, {
        rotation: 360,
        duration: 1.5,
        ease: 'power2.inOut',
        repeat: 2
      });

      tl.fromTo(
        textRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        0.3
      );

      tl.to(
        textRef.current,
        { opacity: 0, y: -20, duration: 0.6, ease: 'power2.in' },
        2.5
      );
    }, loaderRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div 
      ref={loaderRef}
      className="fixed inset-0 z-[999] bg-black flex items-center justify-center"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-blue-900/20 animate-pulse"></div>
      
      <div className="relative">
        <div 
          ref={ringRef}
          className="relative w-32 h-32 mb-8"
        >
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-purple-500 border-r-pink-500 shadow-2xl shadow-purple-500/50"></div>
          <div className="absolute inset-2 rounded-full border-4 border-transparent border-b-blue-500 border-l-cyan-500 shadow-2xl shadow-blue-500/50"></div>
          <div className="absolute inset-4 rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 backdrop-blur-xl"></div>
        </div>

        <div ref={textRef} className="text-center">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
            Loading Portfolio...
          </h2>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// 3D NAVBAR LOGO COMPONENT
// ============================================================================
const Logo3D = () => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.1;
      meshRef.current.rotation.y += 0.01;
      
      if (hovered) {
        meshRef.current.scale.lerp(new THREE.Vector3(1.3, 1.3, 1.3), 0.1);
        meshRef.current.rotation.x += 0.02;
      } else {
        meshRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
      }
    }
  });

  return (
    <mesh
      ref={meshRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <octahedronGeometry args={[1, 0]} />
      <meshStandardMaterial
        color={hovered ? "#ec4899" : "#8b5cf6"}
        emissive={hovered ? "#ec4899" : "#8b5cf6"}
        emissiveIntensity={hovered ? 0.8 : 0.4}
        metalness={0.8}
        roughness={0.2}
      />
    </mesh>
  );
};

const NavbarLogo3D = () => {
  return (
    <div className="w-12 h-12" data-cursor-hover>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#3b82f6" />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ec4899" />
          <Logo3D />
        </Suspense>
      </Canvas>
    </div>
  );
};

// ============================================================================
// 3D FLOATING ORBS FOR HERO
// ============================================================================
const FloatingOrb = ({ position, color, scale = 1 }) => {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.5;
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <Sphere ref={meshRef} position={position} args={[scale, 32, 32]}>
        <MeshDistortMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.5}
          distort={0.3}
          speed={2}
          transparent
          opacity={0.6}
        />
      </Sphere>
    </Float>
  );
};

const HeroOrbs = () => {
  return (
    <>
      <FloatingOrb position={[-4, 2, -2]} color="#8b5cf6" scale={0.8} />
      <FloatingOrb position={[4, -2, -3]} color="#ec4899" scale={1} />
      <FloatingOrb position={[0, 3, -4]} color="#3b82f6" scale={0.6} />
      <FloatingOrb position={[-3, -3, -2]} color="#a855f7" scale={0.7} />
    </>
  );
};

// ============================================================================
// 3D ABSTRACT SHAPES FOR ABOUT
// ============================================================================
const AbstractShape = ({ position, geometry = 'box', color }) => {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.3;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.2;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.3}>
      <mesh ref={meshRef} position={position}>
        {geometry === 'box' && <boxGeometry args={[1, 1, 1]} />}
        {geometry === 'torus' && <torusGeometry args={[0.7, 0.3, 16, 32]} />}
        {geometry === 'cone' && <coneGeometry args={[0.5, 1, 32]} />}
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.3}
          metalness={0.7}
          roughness={0.3}
          transparent
          opacity={0.4}
          wireframe
        />
      </mesh>
    </Float>
  );
};

const AboutShapes = () => {
  return (
    <>
      <AbstractShape position={[-3, 1, -2]} geometry="box" color="#8b5cf6" />
      <AbstractShape position={[3, -1, -3]} geometry="torus" color="#ec4899" />
      <AbstractShape position={[0, 2, -4]} geometry="cone" color="#3b82f6" />
    </>
  );
};



// ============================================================================
// CUSTOM CURSOR COMPONENT
// ============================================================================
const CustomCursor = () => {
  const cursorOuterRef = useRef(null);
  const cursorInnerRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const cursorOuter = cursorOuterRef.current;
    const cursorInner = cursorInnerRef.current;
    
    if (!cursorOuter || !cursorInner) return;

    const xToOuter = gsap.quickTo(cursorOuter, 'x', { duration: 0.5, ease: 'power3' });
    const yToOuter = gsap.quickTo(cursorOuter, 'y', { duration: 0.5, ease: 'power3' });
    const xToInner = gsap.quickTo(cursorInner, 'x', { duration: 0.15, ease: 'power2' });
    const yToInner = gsap.quickTo(cursorInner, 'y', { duration: 0.15, ease: 'power2' });

    const handleMouseMove = (e) => {
      xToOuter(e.clientX);
      yToOuter(e.clientY);
      xToInner(e.clientX);
      yToInner(e.clientY);
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    const interactiveElements = document.querySelectorAll('a, button, input, textarea, [data-cursor-hover], .achievement-card');
    
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  useEffect(() => {
    if (cursorOuterRef.current) {
      gsap.to(cursorOuterRef.current, {
        scale: isHovering ? 1.8 : 1,
        duration: 0.3,
        ease: 'power2.out'
      });
    }
    if (cursorInnerRef.current) {
      gsap.to(cursorInnerRef.current, {
        scale: isHovering ? 0 : 1,
        duration: 0.3,
        ease: 'power2.out'
      });
    }
  }, [isHovering]);

  return (
    <>
      <div
        ref={cursorOuterRef}
        className="fixed top-0 left-0 w-12 h-12 pointer-events-none z-[9999] hidden md:block"
        style={{
          transform: 'translate(-50%, -50%)',
          border: '2px solid rgba(255, 255, 255, 0.3)',
          borderRadius: '50%',
          mixBlendMode: 'difference'
        }}
      />
      <div
        ref={cursorInnerRef}
        className="fixed top-0 left-0 w-2 h-2 bg-white pointer-events-none z-[9999] rounded-full hidden md:block"
        style={{
          transform: 'translate(-50%, -50%)',
          mixBlendMode: 'difference'
        }}
      />
    </>
  );
};

// ============================================================================
// THREE.JS HERO SCENE
// ============================================================================
const ThreeHeroScene = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    const geometry = new THREE.IcosahedronGeometry(1.5, 0);
    const material = new THREE.MeshPhongMaterial({
      color: 0x8b5cf6,
      emissive: 0x4c1d95,
      shininess: 100,
      transparent: true,
      opacity: 0.8,
      wireframe: true
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x3b82f6, 2);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    const pointLight2 = new THREE.PointLight(0x8b5cf6, 2);
    pointLight2.position.set(-5, -5, 5);
    scene.add(pointLight2);

    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (event) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      requestAnimationFrame(animate);

      mesh.rotation.x += 0.003;
      mesh.rotation.y += 0.005;
      mesh.rotation.x += (mouseY * 0.3 - mesh.rotation.x) * 0.05;
      mesh.rotation.y += (mouseX * 0.3 - mesh.rotation.y) * 0.05;
      mesh.position.y = Math.sin(Date.now() * 0.001) * 0.3;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0 opacity-40" />;
};

// ============================================================================
// CUSTOM HOOKS
// ============================================================================
const useLenisScroll = () => {
  const lenisRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      infinite: false,
    });

    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  const scrollTo = useCallback((target, options = {}) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, {
        offset: 0,
        duration: 1.5,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        ...options
      });
    }
  }, []);

  return { scrollTo, lenis: lenisRef.current };
};

const useMagneticButton = (strength = 0.5) => {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const xTo = gsap.quickTo(element, 'x', { duration: 0.6, ease: 'elastic.out(1, 0.3)' });
    const yTo = gsap.quickTo(element, 'y', { duration: 0.6, ease: 'elastic.out(1, 0.3)' });
    const scaleTo = gsap.quickTo(element, 'scale', { duration: 0.4, ease: 'power2.out' });
    const rotateTo = gsap.quickTo(element, 'rotateZ', { duration: 0.6, ease: 'elastic.out(1, 0.3)' });

    const handleMouseMove = (e) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;
      
      xTo(deltaX);
      yTo(deltaY);
      scaleTo(1.05);
      rotateTo((deltaX / rect.width) * 5);
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
      scaleTo(1);
      rotateTo(0);
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [strength]);

  return ref;
};

// ============================================================================
// NAVBAR COMPONENT
// ============================================================================
const Navbar = ({ currentSection, onNavigate }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const logoRef = useMagneticButton(0.3);
  const navRef = useRef(null);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    gsap.fromTo(nav, 
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: 'expo.out', delay: 0.5 }
    );
  }, []);

  const handleNavigate = (section) => {
    onNavigate(section);
    setMenuOpen(false);
  };

  return (
    <nav 
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-8"
      role="navigation"
    >
      <div className="max-w-[1600px] mx-auto flex justify-between items-center backdrop-blur-xl bg-white/5 px-8 py-5 rounded-full border border-white/10 shadow-2xl shadow-purple-500/10">
        <div
          ref={logoRef}
          onClick={() => onNavigate('hero')}
          className="cursor-pointer focus:outline-none"
          role="button"
          tabIndex={0}
          aria-label="Home"
          onKeyPress={(e) => e.key === 'Enter' && onNavigate('hero')}
        >
          <NavbarLogo3D />
        </div>
        
        <div className="hidden md:flex gap-12 items-center">
          {['About', 'Achievements', 'Projects', 'Skills', 'Contact'].map((item) => (
            <button
              key={item}
              onClick={() => handleNavigate(item.toLowerCase())}
              className={`text-sm uppercase tracking-[0.2em] transition-all duration-300 relative group ${
                currentSection === item.toLowerCase() ? 'text-white' : 'text-gray-400'
              }`}
              data-cursor-hover
            >
              {item}
              <span className={`absolute -bottom-2 left-0 h-[2px] bg-gradient-to-r from-purple-400 to-pink-400 transition-all duration-300 ${
                currentSection === item.toLowerCase() ? 'w-full' : 'w-0 group-hover:w-full'
              }`}></span>
            </button>
          ))}
        </div>

        <button 
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          data-cursor-hover
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden mt-4 backdrop-blur-xl bg-white/5 rounded-3xl border border-white/10 p-6">
          {['About', 'Achievements', 'Projects', 'Skills', 'Contact'].map((item) => (
            <button
              key={item}
              onClick={() => handleNavigate(item.toLowerCase())}
              className="block w-full text-left py-4 text-lg uppercase tracking-wider hover:text-white transition-all"
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};

// ============================================================================
// HERO COMPONENT
// ============================================================================
const Hero = ({ onNavigate }) => {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);
  const btn1Ref = useMagneticButton(0.5);
  const btn2Ref = useMagneticButton(0.5);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const title = titleRef.current;
      if (title) {
        const text = title.textContent;
        title.innerHTML = '';
        
        text.split('').forEach((char) => {
          const span = document.createElement('span');
          span.textContent = char === ' ' ? '\u00A0' : char;
          span.style.display = 'inline-block';
          title.appendChild(span);
        });

        gsap.fromTo(
          title.querySelectorAll('span'),
          {
            opacity: 0,
            y: 150,
            rotationX: -90,
            filter: 'blur(10px)',
          },
          {
            opacity: 1,
            y: 0,
            rotationX: 0,
            filter: 'blur(0px)',
            duration: 1.4,
            stagger: 0.03,
            ease: 'expo.out',
            delay: 0.5,
          }
        );
      }

      gsap.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 50, filter: 'blur(10px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.2, ease: 'expo.out', delay: 1.3 }
      );

      gsap.fromTo(
        ctaRef.current?.children,
        { opacity: 0, y: 50, scale: 0.8, filter: 'blur(10px)' },
        { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', duration: 1, stagger: 0.15, ease: 'back.out(1.7)', delay: 1.7 }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="hero" 
      ref={heroRef}
      className="min-h-screen flex items-center justify-center relative px-6 md:px-12 overflow-hidden"
    >
      <Suspense fallback={null}>
        <ThreeHeroScene />
      </Suspense>

      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 5 }}>
        <Canvas
          camera={{ position: [0, 0, 10], fov: 50 }}
          gl={{ alpha: true, antialias: true }}
          dpr={[1, 1.5]}
        >
          <Suspense fallback={null}>
            <ambientLight intensity={0.3} />
            <pointLight position={[10, 10, 10]} intensity={0.8} />
            <HeroOrbs />
          </Suspense>
        </Canvas>
      </div>

      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-blue-900/20"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.1),transparent_50%)]"></div>
      
      <div className="max-w-[1400px] mx-auto text-center relative z-10">
        <div className="mb-8">
          <span className="text-sm uppercase tracking-[0.3em] text-gray-400 font-light">
            Developer
          </span>
        </div>
        
        <h1 
          ref={titleRef}
          className="text-7xl md:text-9xl lg:text-[12rem] font-black mb-12 tracking-tighter leading-[0.9] bg-gradient-to-br from-white via-gray-200 to-gray-500 bg-clip-text text-transparent"
          style={{ perspective: '1000px' }}
        >
          Shanavas V B
        </h1>
        
        <p 
          ref={subtitleRef}
          className="text-2xl md:text-3xl text-gray-300 max-w-4xl mx-auto mb-16 font-light leading-relaxed"
        >
          Crafting digital experiences that blend innovation with functionality. 
          Specializing in modern web and mobile applications.
        </p>
        
        <div 
          ref={ctaRef}
          className="flex flex-col sm:flex-row gap-6 justify-center"
        >
          <button 
            ref={btn1Ref}
            onClick={() => onNavigate('projects')}
            className="group px-10 py-5 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-full hover:shadow-2xl hover:shadow-purple-500/50 transition-all flex items-center justify-center gap-3 relative overflow-hidden"
            data-cursor-hover
          >
            <span className="relative z-10">View Work</span>
            <ArrowUpRight size={22} className="relative z-10 group-hover:rotate-45 transition-transform" />
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </button>
          <button 
            ref={btn2Ref}
            onClick={() => onNavigate('contact')}
            className="px-10 py-5 backdrop-blur-xl bg-white/10 border-2 border-white/20 text-white font-semibold rounded-full hover:bg-white hover:text-black hover:border-white transition-all"
            data-cursor-hover
          >
            Get in Touch
          </button>
        </div>
      </div>

      <div className="absolute bottom-16 left-1/2 -translate-x-1/2">
        <div className="w-8 h-14 border-2 border-white/30 rounded-full flex justify-center pt-3">
          <div className="w-2 h-3 bg-white/50 rounded-full animate-bounce"></div>
        </div>
      </div>
    </section>
  );
};

// ============================================================================
// ABOUT COMPONENT
// ============================================================================
const About = () => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        textRef.current,
        { opacity: 0, x: -100, filter: 'blur(20px)' },
        {
          opacity: 1,
          x: 0,
          filter: 'blur(0px)',
          duration: 1.4,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          }
        }
      );

      gsap.fromTo(
        imageRef.current,
        { opacity: 0, scale: 0.8, rotateY: 20, filter: 'blur(20px)' },
        {
          opacity: 1,
          scale: 1,
          rotateY: 0,
          filter: 'blur(0px)',
          duration: 1.4,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="py-32 md:py-48 px-6 md:px-12 relative"
    >
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <Canvas
          camera={{ position: [0, 0, 8], fov: 50 }}
          gl={{ alpha: true, antialias: true }}
          dpr={[1, 1.5]}
        >
          <Suspense fallback={null}>
            <ambientLight intensity={0.3} />
            <pointLight position={[5, 5, 5]} intensity={0.5} />
            <AboutShapes />
          </Suspense>
        </Canvas>
      </div>

      <div className="max-w-[1400px] mx-auto">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          <div ref={textRef}>
            <h2 className="text-6xl md:text-8xl font-black mb-12 tracking-tighter bg-gradient-to-br from-white via-purple-200 to-purple-500 bg-clip-text text-transparent leading-[1]">
              About Me
            </h2>
            <div className="space-y-8 text-xl text-gray-300 leading-relaxed font-light">
              <p className="backdrop-blur-sm bg-white/5 p-8 rounded-3xl border border-white/10">
                I'm a passionate developer with a keen eye for design and a love for creating 
                seamless digital experiences. With expertise in modern web technologies, I transform 
                ideas into reality through clean code and innovative solutions.
              </p>
              <p className="backdrop-blur-sm bg-white/5 p-8 rounded-3xl border border-white/10">
                My journey in tech has been driven by curiosity and a commitment to excellence. 
                From building scalable applications to crafting pixel-perfect interfaces, I approach 
                every project with dedication and creativity.
              </p>
            </div>
          </div>
          
          <div ref={imageRef} className="relative group">
            <div className="aspect-square rounded-[3rem] overflow-hidden shadow-2xl shadow-purple-500/20 backdrop-blur-xl bg-white/5 border border-white/10">
              <img 
                src="src/images/myimage.jpeg" 
                alt="Modern developer workspace" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                loading="lazy"
              />
            </div>
            <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-full blur-3xl -z-10 group-hover:scale-150 transition-transform duration-1000"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================================================
// ACHIEVEMENTS COMPONENT
// ============================================================================
const Achievements = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const marqueeRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 80, filter: 'blur(10px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 1.2,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          }
        }
      );

      const marquee = marqueeRef.current;
      if (!marquee) return;

      const cards = marquee.children;
      const cardWidth = cards[0]?.offsetWidth || 400;
      const gap = 32;
      const totalWidth = (cardWidth + gap) * achievementsData.length;

      gsap.set(marquee, { x: 0 });

      const tl = gsap.timeline({
        repeat: -1,
        paused: isPaused,
      });

      tl.to(marquee, {
        x: -totalWidth,
        duration: 30,
        ease: 'none',
        modifiers: {
          x: gsap.utils.unitize(x => parseFloat(x) % totalWidth)
        }
      });

      marquee.timeline = tl;
      tl.play();

      return () => tl.kill();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const marquee = marqueeRef.current;
    if (marquee && marquee.timeline) {
      if (isPaused) {
        marquee.timeline.pause();
      } else {
        marquee.timeline.play();
      }
    }
  }, [isPaused]);

  return (
    <section 
      id="achievements" 
      ref={sectionRef}
      className="py-32 md:py-48 px-6 md:px-12 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-950/10 to-transparent"></div>

      <div className="max-w-[1600px] mx-auto relative">
        <div ref={headerRef} className="mb-24 text-center">
          <span className="inline-block px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full text-sm uppercase tracking-[0.3em] text-purple-400 font-semibold mb-6">
            Recognition
          </span>
          

          <h2 className="text-6xl md:text-8xl font-black tracking-tighter bg-gradient-to-br from-white via-purple-200 to-purple-500 bg-clip-text text-transparent mb-6 leading-[1]">
            Achievements
          </h2>
          <p className="text-2xl text-gray-400 font-light">Awards & Milestones</p>
        </div>

        <div 
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none"></div>

          <div className="overflow-hidden">
            <div 
              ref={marqueeRef}
              className="flex gap-8"
              style={{ width: 'fit-content' }}
            >
              {[...achievementsData, ...achievementsData].map((achievement, index) => (
                <div
                  key={`${achievement.id}-${index}`}
                  className="achievement-card group flex-shrink-0 w-[400px] md:w-[500px]"
                  data-cursor-hover
                >
                  <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-[3rem] overflow-hidden hover:bg-white/10 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/30">
                    <div className="relative h-64 overflow-hidden">
                      <img 
                        src={achievement.image}
                        alt={achievement.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                    </div>

                    <div className="p-8 space-y-4">
                      <span className="text-xs uppercase tracking-[0.3em] text-purple-400 font-semibold">
                        {achievement.subtitle}
                      </span>
                      <h3 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                        {achievement.title}
                      </h3>
                      <p className="text-gray-400 leading-relaxed">
                        {achievement.description}
                      </p>
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 via-pink-500/0 to-blue-500/0 group-hover:from-purple-500/10 group-hover:via-pink-500/10 group-hover:to-blue-500/10 transition-all duration-500 pointer-events-none"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center mt-12 text-sm text-gray-500 font-light">
          Hover to pause • Scroll to explore
        </div>
      </div>
    </section>
  );
};

// ============================================================================
// PROJECTS COMPONENT
// ============================================================================
const Projects = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 80 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 80%',
          }
        }
      );

      cardsRef.current.forEach((card) => {
        if (!card) return;

        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: 150,
            scale: 0.8,
            rotateX: 30,
            filter: 'blur(20px)',
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotateX: 0,
            filter: 'blur(0px)',
            duration: 1.4,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
            }
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="projects" 
      ref={sectionRef}
      className="py-32 md:py-48 px-6 md:px-12 relative"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-950/10 to-transparent"></div>
      
      <div className="max-w-[1400px] mx-auto relative">
        <div ref={headerRef} className="mb-24">
          <h2 className="text-6xl md:text-8xl font-black tracking-tighter bg-gradient-to-br from-white via-purple-200 to-purple-500 bg-clip-text text-transparent mb-6 leading-[1]">
            Selected Work
          </h2>
          <p className="text-2xl text-gray-400 font-light">Projects that define my journey</p>
        </div>

        <div className="space-y-32">
          {projectsData.map((project, index) => (
            <article 
              key={project.id}
              ref={(el) => (cardsRef.current[index] = el)}
              className="group"
            >
              <div className={`grid md:grid-cols-2 gap-16 items-center ${
                index % 2 === 1 ? 'md:flex-row-reverse' : ''
              }`}>
                <div className={`${index % 2 === 1 ? 'md:order-2' : ''} space-y-8`}>
                  <span className="text-xs uppercase tracking-[0.3em] text-purple-400 font-semibold">
                    {project.category}
                  </span>
                  <h3 className="text-5xl md:text-6xl font-black tracking-tighter bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent leading-[1.1]">
                    {project.title}
                  </h3>
                  <p className="text-xl text-gray-300 leading-relaxed font-light backdrop-blur-sm bg-white/5 p-8 rounded-3xl border border-white/10">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {project.tech.map((tech, i) => (
                      <span 
                        key={i} 
                        className="px-5 py-2 backdrop-blur-xl bg-purple-500/10 rounded-full text-sm border border-purple-500/20 text-purple-300 font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
{project.githubLink ? (
  <a 
    href={project.githubLink}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-3 px-6 py-3 backdrop-blur-xl bg-white/5 border border-white/10 rounded-full hover:bg-white/10 hover:border-purple-400/30 transition-all text-purple-400 font-semibold group/link"
    data-cursor-hover
  >
    <Github size={20} />
    <span>View on GitHub</span>
    <ArrowUpRight size={20} className="group-hover/link:rotate-45 transition-transform" />
  </a>
) : (
  <div className="inline-flex items-center gap-3 px-6 py-3 backdrop-blur-xl bg-white/5 border border-white/10 rounded-full text-gray-500 font-semibold">
    <Github size={20} className="opacity-50" />
    <span>Private Repository</span>
  </div>
)}
                </div>
                
                <div className={`${index % 2 === 1 ? 'md:order-1' : ''}`}>
                  <div className="relative rounded-[3rem] overflow-hidden shadow-2xl shadow-purple-500/20 group-hover:shadow-purple-500/40 transition-shadow duration-500" data-cursor-hover>
                    <img 
                      src={project.image} 
                      alt={project.alt}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-transparent to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================================================
// SKILLS COMPONENT
// ============================================================================
const Skills = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const skillsRef = useRef([]);
  const toolsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 80 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 80%',
          }
        }
      );

      skillsRef.current.forEach((skill) => {
        if (!skill) return;

        const bar = skill.querySelector('.skill-bar');
        const level = bar?.dataset.level;

        gsap.fromTo(
          skill,
          { opacity: 0, x: -80 },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: skill,
              start: 'top 85%',
            }
          }
        );

        if (bar && level) {
          gsap.fromTo(
            bar,
            { width: '0%' },
            {
              width: level,
              duration: 1.8,
              ease: 'expo.out',
              scrollTrigger: {
                trigger: skill,
                start: 'top 80%',
              }
            }
          );
        }
      });

      const tools = toolsRef.current?.querySelectorAll('span');
      if (tools) {
        gsap.fromTo(
          tools,
          { opacity: 0, y: 30, scale: 0.5 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.05,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: toolsRef.current,
              start: 'top 85%',
            }
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="skills" 
      ref={sectionRef}
      className="py-32 md:py-48 px-6 md:px-12 relative"
    >
      <div className="max-w-[1400px] mx-auto">
        <div ref={headerRef} className="mb-24">
          <h2 className="text-6xl md:text-8xl font-black tracking-tighter bg-gradient-to-br from-white via-purple-200 to-purple-500 bg-clip-text text-transparent mb-6 leading-[1]">
            Skills & Expertise
          </h2>
          <p className="text-2xl text-gray-400 font-light">Technologies I work with</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {skillsData.map((skill, index) => (
            <div 
              key={skill.name}
              ref={(el) => (skillsRef.current[index] = el)}
              className="backdrop-blur-xl bg-white/5 p-8 rounded-3xl border border-white/10 hover:bg-white/10 transition-all"
            >
              <div className="flex justify-between items-center mb-4">
                <span className="text-xl font-semibold">{skill.name}</span>
                <span className="text-sm text-gray-400 font-mono">{skill.level}%</span>
              </div>
              <div className="h-3 bg-black/50 rounded-full overflow-hidden relative">
                <div 
                  className="skill-bar h-full relative rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500"
                  data-level={`${skill.level}%`}
                  style={{ width: '0%' }}
                >
                  <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div ref={toolsRef}>
          <h3 className="text-4xl font-black mb-12 tracking-tighter">Additional Tools</h3>
          <div className="flex flex-wrap gap-4">
            {additionalTools.map((tool) => (
              <span 
                key={tool} 
                className="px-6 py-3 backdrop-blur-xl bg-white/5 border border-white/10 rounded-full hover:bg-purple-500/20 hover:border-purple-500/30 hover:scale-110 transition-all cursor-pointer"
                data-cursor-hover
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================================================
// CONTACT COMPONENT
// ============================================================================
const Contact = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const formRef = useRef(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState('idle');
  const submitBtnRef = useMagneticButton(0.5);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, scale: 0.9, y: 80 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1.4,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          }
        }
      );

      gsap.fromTo(
        formRef.current,
        { opacity: 0, y: 100 },
        {
          opacity: 1,
          y: 0,
          duration: 1.4,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 80%',
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus('sending');
    
    setTimeout(() => {
      setFormStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setFormStatus('idle'), 3000);
    }, 1500);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section 
      id="contact" 
      ref={sectionRef}
      className="py-32 md:py-48 px-6 md:px-12 relative"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-950/10 to-transparent"></div>

      <div className="max-w-[1000px] mx-auto relative">
        <div ref={headerRef} className="mb-20 text-center">
          <h2 className="text-6xl md:text-8xl font-black tracking-tighter bg-gradient-to-br from-white via-purple-200 to-purple-500 bg-clip-text text-transparent mb-6 leading-[1]">
            Let's Create Together
          </h2>
          <p className="text-2xl text-gray-400 font-light">Have a project in mind? Let's build something amazing.</p>
        </div>

        <div 
          ref={formRef}
          className="backdrop-blur-2xl bg-white/5 border border-white/10 rounded-[3rem] p-12 shadow-2xl"
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-3 ml-4">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-6 py-4 bg-black/50 border border-white/10 rounded-2xl focus:outline-none focus:border-purple-400/50 focus:ring-2 focus:ring-purple-400/20 transition-all text-white placeholder-gray-600"
                  placeholder="Name"
                  data-cursor-hover
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-3 ml-4">
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-6 py-4 bg-black/50 border border-white/10 rounded-2xl focus:outline-none focus:border-purple-400/50 focus:ring-2 focus:ring-purple-400/20 transition-all text-white placeholder-gray-600"
                  placeholder="name@example.com"
                  data-cursor-hover
                />
              </div>
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-3 ml-4">
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="6"
                className="w-full px-6 py-4 bg-black/50 border border-white/10 rounded-2xl focus:outline-none focus:border-purple-400/50 focus:ring-2 focus:ring-purple-400/20 transition-all text-white placeholder-gray-600 resize-none"
                placeholder="Tell me ..."
                data-cursor-hover
              ></textarea>
            </div>

            <button
              ref={submitBtnRef}
              type="submit"
              disabled={formStatus === 'sending'}
              className="w-full md:w-auto px-12 py-5 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-2xl hover:shadow-2xl hover:shadow-purple-500/50 transition-all disabled:opacity-50 flex items-center justify-center gap-3"
              data-cursor-hover
            >
              {formStatus === 'sending' ? 'Sending...' : formStatus === 'success' ? 'Message Sent! ✓' : 'Send Message'}
              {formStatus === 'idle' && <Send size={20} />}
            </button>

            {formStatus === 'success' && (
              <p className="text-green-400 text-center">Thank you! I'll get back to you soon.</p>
            )}
          </form>
        </div>

        <div className="mt-16 flex flex-wrap justify-center gap-6">
          <a 
            href="mailto:shanavasvb@example.com"
            className="px-8 py-4 backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 hover:border-purple-400/30 transition-all flex items-center gap-3"
            data-cursor-hover
          >
            <Mail size={20} />
            <span>Email</span>
          </a>
          <a 
            href="https://github.com/shanavasvb"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 hover:border-purple-400/30 transition-all flex items-center gap-3"
            data-cursor-hover
          >
            <Github size={20} />
            <span>GitHub</span>
          </a>
          <a 
            href="https://linkedin.com/in/shanavasvb"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 hover:border-purple-400/30 transition-all flex items-center gap-3"
            data-cursor-hover
          >
            <Linkedin size={20} />
            <span>LinkedIn</span>
          </a>
        </div>

        <div className="text-center text-gray-500 mt-12 space-y-2">
          <p>Based in Kerala, India</p>
          <p>Available for freelance opportunities</p>
        </div>
      </div>
    </section>
  );
};

// ============================================================================
// FOOTER COMPONENT
// ============================================================================
const Footer = () => {
  return (
    <footer className="py-12 px-6 md:px-12 border-t border-white/5">
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-gray-500 text-sm">
          © 2025 Shanavas V Basheer. All rights reserved.
        </p>
        <div className="flex gap-6">
          <a 
            href="https://github.com/shanavasvb" 
            className="text-gray-500 hover:text-white transition-colors"
            data-cursor-hover
            aria-label="GitHub"
          >
            <Github size={20} />
          </a>
          <a 
            href="https://linkedin.com/in/shanavasvb" 
            className="text-gray-500 hover:text-white transition-colors"
            data-cursor-hover
            aria-label="LinkedIn"
          >
            <Linkedin size={20} />
          </a>
          <a 
            href="mailto:shanavasvb@example.com" 
            className="text-gray-500 hover:text-white transition-colors"
            data-cursor-hover
            aria-label="Email"
          >
            <Mail size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
};

// ============================================================================
// MAIN PORTFOLIO COMPONENT
// ============================================================================
const Portfolio = () => {
  const [currentSection, setCurrentSection] = useState('hero');
  const [loading, setLoading] = useState(true);
  const { scrollTo } = useLenisScroll();

  useEffect(() => {
    let rafId;
    const sections = ['hero', 'about', 'achievements', 'projects', 'skills', 'contact'];
    
    const handleScroll = () => {
      if (rafId) return;
      
      rafId = requestAnimationFrame(() => {
        const scrollPosition = window.scrollY + 150;
        
        for (const section of sections) {
          const element = document.getElementById(section);
          if (element) {
            const { offsetTop, offsetHeight } = element;
            if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
              setCurrentSection(section);
              break;
            }
          }
        }
        
        rafId = null;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  const handleNavigate = useCallback((section) => {
    scrollTo(`#${section}`);
  }, [scrollTo]);

  return (
    <>
      {loading && <PremiumLoader onComplete={() => setLoading(false)} />}
      
      <div className={`bg-black text-white overflow-x-hidden ${loading ? 'invisible' : 'visible'}`}>
        <CustomCursor />
        
        <div className="fixed inset-0 noise-bg pointer-events-none z-0" aria-hidden="true"></div>
        
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0" aria-hidden="true">
          <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-purple-600/10 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-pink-600/5 rounded-full blur-[80px] animate-pulse" style={{ animationDelay: '4s' }}></div>
        </div>

        <Navbar currentSection={currentSection} onNavigate={handleNavigate} />
        
        <main className="relative z-10">
          <Hero onNavigate={handleNavigate} />
          <About />
          <Achievements />
          <Projects />
          <Skills />
          <Contact />
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Portfolio;