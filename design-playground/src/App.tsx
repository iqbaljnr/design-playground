import { lazy, Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { MotionConfig } from 'motion/react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { PresentationOverlay } from './components/mentor/PresentationOverlay';
import { Home } from './pages/Home';
import { LearningHub } from './pages/LearningHub';
import { LearningModule } from './pages/LearningModule';
import { FigmaGuide } from './pages/FigmaGuide';
import { DesignLab } from './pages/DesignLab';
import { Challenges } from './pages/Challenges';
import { AssetLibrary } from './pages/AssetLibrary';

const KnowledgeCheck = lazy(() =>
  import('./pages/KnowledgeCheck').then((m) => ({ default: m.KnowledgeCheck }))
);

function RouteLoadingFallback() {
  return (
    <main id="main-content" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="rounded-2xl border border-border-subtle bg-elevated p-8 font-display text-lg font-semibold text-ink">
        Loading Workshop Space...
      </div>
    </main>
  );
}

export function App() {
  return (
    <MotionConfig reducedMotion="user">
      <BrowserRouter>
        <div className="flex min-h-dvh flex-col bg-canvas text-ink">
          <Navbar />
          <div className="flex-1">
            <Suspense fallback={<RouteLoadingFallback />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/hub" element={<LearningHub />} />
                <Route path="/learn/:chapterId" element={<LearningModule />} />
                <Route path="/figma" element={<FigmaGuide />} />
                <Route path="/challenges" element={<Challenges />} />
                <Route path="/challenges/:challengeId" element={<Challenges />} />
                <Route path="/assets" element={<AssetLibrary />} />
                <Route path="/lab" element={<DesignLab />} />
                <Route path="/quiz" element={<KnowledgeCheck />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Suspense>
          </div>
          <Footer />
          <PresentationOverlay />
        </div>
      </BrowserRouter>
    </MotionConfig>
  );
}

export default App;
