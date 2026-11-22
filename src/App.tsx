import { useCallback, useEffect, useRef, useState } from 'react';
import { BrowserRouter, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Lenis from 'lenis';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { HeroScene } from './components/hero/HeroScene';
import { HeroOverlay } from './components/hero/HeroOverlay';
import { FloatingNav } from './components/nav/FloatingNav';
import { EditorialIntro } from './components/sections/EditorialIntro';
import { ProjectStack } from './components/sections/ProjectStack';
import { ExperienceSection } from './components/sections/ExperienceSection';
import { FooterSection } from './components/sections/FooterSection';
import { CreativeLab } from './pages/CreativeLab';

function AppShell() {
  const [hasMoved, setHasMoved] = useState(false);
  const [isHeroVisible, setIsHeroVisible] = useState(true);
  const heroRef = useRef<HTMLElement>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const handleFirstMove = useCallback(() => {
    setHasMoved(true);
  }, []);

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = window.requestAnimationFrame(raf);
    };
    rafId = window.requestAnimationFrame(raf);

    return () => {
      window.cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (location.pathname !== '/') return;

    const el = heroRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHeroVisible(entry.isIntersecting);
      },
      { threshold: 0.01 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [location.pathname]);

  const scrollToSection = useCallback((sectionId: string) => {
    const target = document.getElementById(sectionId);
    if (!target) return;

    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, { duration: 1.1 });
    } else {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const handleNavigateSection = useCallback(
    (sectionId: string) => {
      if (location.pathname !== '/') {
        navigate('/');
        window.setTimeout(() => scrollToSection(sectionId), 80);
        return;
      }
      scrollToSection(sectionId);
    },
    [location.pathname, navigate, scrollToSection]
  );

  const handleNavigateRoute = useCallback(
    (path: string) => {
      if (location.pathname === path) {
        if (lenisRef.current) {
          lenisRef.current.scrollTo(0, { duration: 0.9 });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        return;
      }
      navigate(path);
      if (lenisRef.current) {
        lenisRef.current.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo(0, 0);
      }
    },
    [location.pathname, navigate]
  );

  return (
    <div className="min-h-screen bg-[#F3F5F6] text-[#0C1016]">
      <FloatingNav
        currentPath={location.pathname}
        onNavigateSection={handleNavigateSection}
        onNavigateRoute={handleNavigateRoute}
      />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <main>
                <section
                  id="hero"
                  ref={heroRef}
                  className="relative h-dvh w-full overflow-hidden bg-[#262b33]"
                >
                  <HeroScene
                    active={location.pathname === '/' && isHeroVisible}
                    onFirstMove={handleFirstMove}
                  />
                  <HeroOverlay hasMoved={hasMoved} />
                </section>

                <EditorialIntro />
                <ProjectStack />
                <ExperienceSection />
              </main>
              <FooterSection onNavigate={handleNavigateSection} />
            </>
          }
        />
        <Route
          path="/creative"
          element={
            <>
              <CreativeLab onBackHome={() => handleNavigateRoute('/')} />
              <FooterSection onNavigate={handleNavigateSection} />
            </>
          }
        />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppShell />
      <SpeedInsights />
      <Analytics />
    </BrowserRouter>
  );
}

export default App;
