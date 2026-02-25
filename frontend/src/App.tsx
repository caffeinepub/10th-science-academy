import { useState } from 'react';
import {
  BookOpen,
  GraduationCap,
  FlaskConical,
  Star,
  Users,
  Award,
  Heart,
  Atom,
  TestTube2,
  Leaf,
  Calculator,
  Globe,
  Languages,
  FileText,
  Newspaper,
  Menu,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import PagesPage from '@/pages/PagesPage';
import PostsPage from '@/pages/PostsPage';

type View = 'home' | 'pages' | 'posts';

const features = [
  {
    icon: FlaskConical,
    title: 'Science Labs',
    description: 'State-of-the-art laboratories equipped for hands-on experiments in physics, chemistry, and biology.',
  },
  {
    icon: BookOpen,
    title: 'Expert Faculty',
    description: 'Learn from experienced educators dedicated to making science accessible and exciting for every student.',
  },
  {
    icon: Award,
    title: 'Academic Excellence',
    description: 'Consistently achieving top results with a proven curriculum designed for 10th grade success.',
  },
  {
    icon: Users,
    title: 'Collaborative Learning',
    description: 'Foster teamwork and critical thinking through group projects and peer-to-peer learning sessions.',
  },
];

const stats = [
  { value: '500+', label: 'Students Enrolled' },
  { value: '98%', label: 'Pass Rate' },
  { value: '25+', label: 'Expert Teachers' },
  { value: '15+', label: 'Years of Excellence' },
];

const subjects = [
  {
    icon: Atom,
    name: 'Physics',
    description: 'Explore mechanics, optics, electricity, and the fundamental laws governing the universe.',
  },
  {
    icon: TestTube2,
    name: 'Chemistry',
    description: 'Understand matter, reactions, periodic table, and chemical bonding through experiments.',
  },
  {
    icon: Leaf,
    name: 'Biology',
    description: 'Study life sciences including cells, genetics, ecosystems, and human physiology.',
  },
  {
    icon: Calculator,
    name: 'Mathematics',
    description: 'Master algebra, geometry, trigonometry, and statistics essential for science streams.',
  },
  {
    icon: Languages,
    name: 'English',
    description: 'Develop reading comprehension, writing skills, and effective communication abilities.',
  },
  {
    icon: Globe,
    name: 'Social Studies',
    description: 'Learn history, geography, civics, and economics to understand the world around us.',
  },
];

const navLinks: { label: string; view: View; icon?: React.ElementType }[] = [
  { label: 'About', view: 'home' },
  { label: 'Subjects', view: 'home' },
  { label: 'Programs', view: 'home' },
  { label: 'Pages', view: 'pages', icon: FileText },
  { label: 'Posts', view: 'posts', icon: Newspaper },
];

export default function App() {
  const [currentView, setCurrentView] = useState<View>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleClickMe = () => {
    alert('Hello Students!');
  };

  const navigate = (view: View, anchor?: string) => {
    setCurrentView(view);
    setMobileMenuOpen(false);
    if (view === 'home' && anchor) {
      setTimeout(() => {
        const el = document.getElementById(anchor);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground shadow-lg sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4 sm:py-5">
            <button
              onClick={() => navigate('home')}
              className="flex items-center gap-3 hover:opacity-90 transition-opacity"
            >
              <div className="bg-primary-foreground/15 rounded-full p-2.5">
                <GraduationCap className="w-7 h-7 text-primary-foreground" />
              </div>
              <div className="text-left">
                <h1 className="font-serif text-xl sm:text-2xl font-bold tracking-tight leading-tight">
                  10th Science Academy
                </h1>
                <p className="text-primary-foreground/75 text-xs sm:text-sm font-sans tracking-wide">
                  Excellence in Science Education
                </p>
              </div>
            </button>

            {/* Desktop Nav */}
            <nav className="hidden sm:flex items-center gap-1">
              <button
                onClick={() => navigate('home', 'about')}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  currentView === 'home'
                    ? 'text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10'
                    : 'text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10'
                }`}
              >
                About
              </button>
              <button
                onClick={() => navigate('home', 'subjects')}
                className="px-3 py-1.5 rounded-md text-sm font-medium text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10 transition-colors"
              >
                Subjects
              </button>
              <button
                onClick={() => navigate('home', 'features')}
                className="px-3 py-1.5 rounded-md text-sm font-medium text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10 transition-colors"
              >
                Programs
              </button>
              <div className="w-px h-5 bg-primary-foreground/20 mx-1" />
              <button
                onClick={() => navigate('pages')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  currentView === 'pages'
                    ? 'bg-primary-foreground/20 text-primary-foreground'
                    : 'text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                Pages
              </button>
              <button
                onClick={() => navigate('posts')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  currentView === 'posts'
                    ? 'bg-primary-foreground/20 text-primary-foreground'
                    : 'text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10'
                }`}
              >
                <Newspaper className="w-3.5 h-3.5" />
                Posts
              </button>
            </nav>

            {/* Mobile menu button */}
            <button
              className="sm:hidden p-2 rounded-md text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10 transition-colors"
              onClick={() => setMobileMenuOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {/* Mobile Nav */}
          {mobileMenuOpen && (
            <nav className="sm:hidden pb-4 flex flex-col gap-1 border-t border-primary-foreground/20 pt-3">
              <button
                onClick={() => navigate('home', 'about')}
                className="text-left px-3 py-2 rounded-md text-sm font-medium text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10 transition-colors"
              >
                About
              </button>
              <button
                onClick={() => navigate('home', 'subjects')}
                className="text-left px-3 py-2 rounded-md text-sm font-medium text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10 transition-colors"
              >
                Subjects
              </button>
              <button
                onClick={() => navigate('home', 'features')}
                className="text-left px-3 py-2 rounded-md text-sm font-medium text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10 transition-colors"
              >
                Programs
              </button>
              <div className="h-px bg-primary-foreground/20 my-1" />
              <button
                onClick={() => navigate('pages')}
                className={`flex items-center gap-2 text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentView === 'pages'
                    ? 'bg-primary-foreground/20 text-primary-foreground'
                    : 'text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10'
                }`}
              >
                <FileText className="w-4 h-4" />
                Pages
              </button>
              <button
                onClick={() => navigate('posts')}
                className={`flex items-center gap-2 text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentView === 'posts'
                    ? 'bg-primary-foreground/20 text-primary-foreground'
                    : 'text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10'
                }`}
              >
                <Newspaper className="w-4 h-4" />
                Posts
              </button>
            </nav>
          )}
        </div>
      </header>

      {/* Main Content */}
      {currentView === 'pages' ? (
        <main className="flex-1">
          <PagesPage />
        </main>
      ) : currentView === 'posts' ? (
        <main className="flex-1">
          <PostsPage />
        </main>
      ) : (
        <main className="flex-1">
          {/* Hero / Welcome Section */}
          <section
            id="about"
            className="relative overflow-hidden bg-primary text-primary-foreground"
          >
            <div className="absolute inset-0 opacity-5 pointer-events-none">
              <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-primary-foreground translate-x-1/3 -translate-y-1/3" />
              <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-primary-foreground -translate-x-1/3 translate-y-1/3" />
            </div>

            <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center">
              <div className="inline-flex items-center gap-2 bg-primary-foreground/15 rounded-full px-4 py-1.5 mb-6">
                <Star className="w-3.5 h-3.5 text-primary-foreground/80" />
                <span className="text-primary-foreground/90 text-xs font-semibold tracking-widest uppercase">
                  Welcome to Our Academy
                </span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4">
                Welcome to My Website
              </h2>

              <p className="text-primary-foreground/80 text-base sm:text-lg max-w-xl mx-auto mb-8 leading-relaxed">
                This website is created using HTML.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Button
                  onClick={handleClickMe}
                  size="lg"
                  className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-semibold px-8 py-3 rounded-md shadow-lg transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 animate-pulse-ring"
                >
                  Click Me
                </Button>
                <Button
                  onClick={() => navigate('pages')}
                  size="lg"
                  variant="outline"
                  className="border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10 font-semibold px-8 py-3 rounded-md"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  View Pages
                </Button>
                <Button
                  onClick={() => navigate('posts')}
                  size="lg"
                  variant="outline"
                  className="border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10 font-semibold px-8 py-3 rounded-md"
                >
                  <Newspaper className="w-4 h-4 mr-2" />
                  View Posts
                </Button>
              </div>
            </div>
          </section>

          {/* Subjects Section */}
          <section id="subjects" className="py-16 sm:py-20 bg-accent">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-1.5 mb-4">
                  <BookOpen className="w-3.5 h-3.5 text-primary" />
                  <span className="text-primary text-xs font-semibold tracking-widest uppercase">
                    Curriculum
                  </span>
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-foreground mb-3">
                  Subjects We Teach
                </h3>
                <p className="text-muted-foreground max-w-md mx-auto text-sm sm:text-base">
                  A well-rounded 10th grade curriculum covering all core science and academic disciplines.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {subjects.map((subject) => {
                  const Icon = subject.icon;
                  return (
                    <Card
                      key={subject.name}
                      className="group border border-border shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 bg-card"
                    >
                      <CardContent className="p-6 flex items-start gap-4">
                        <div className="shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors duration-300">
                          <Icon className="w-5 h-5 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                        </div>
                        <div>
                          <h4 className="font-serif font-bold text-foreground text-base mb-1">
                            {subject.name}
                          </h4>
                          <p className="text-muted-foreground text-xs leading-relaxed">
                            {subject.description}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Stats Bar */}
          <section className="bg-card border-b border-border shadow-xs">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
                {stats.map((stat) => (
                  <div key={stat.label} className="flex flex-col items-center gap-1">
                    <span className="font-serif text-2xl sm:text-3xl font-bold text-primary">
                      {stat.value}
                    </span>
                    <span className="text-muted-foreground text-xs sm:text-sm font-medium">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section id="features" className="py-16 sm:py-20 bg-background">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-foreground mb-3">
                  Why Choose Our Academy?
                </h3>
                <p className="text-muted-foreground max-w-md mx-auto text-sm sm:text-base">
                  We provide a comprehensive science education experience tailored for 10th grade students.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {features.map((feature) => {
                  const Icon = feature.icon;
                  return (
                    <Card
                      key={feature.title}
                      className="group border border-border shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 bg-card"
                    >
                      <CardContent className="p-6 flex flex-col items-center text-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center group-hover:bg-primary transition-colors duration-300">
                          <Icon className="w-5 h-5 text-accent-foreground group-hover:text-primary-foreground transition-colors duration-300" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground text-sm mb-1.5">
                            {feature.title}
                          </h4>
                          <p className="text-muted-foreground text-xs leading-relaxed">
                            {feature.description}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section id="contact" className="py-16 bg-accent">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-foreground mb-3">
                Ready to Excel in Science?
              </h3>
              <p className="text-muted-foreground max-w-md mx-auto mb-8 text-sm sm:text-base">
                Join hundreds of students who have achieved academic excellence with our proven programs.
              </p>
              <Button
                onClick={handleClickMe}
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-8 py-3 rounded-md shadow-md transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
              >
                Click Me
              </Button>
            </div>
          </section>
        </main>
      )}

      {/* Footer */}
      <footer className="bg-foreground text-background py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              onClick={() => navigate('home')}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <GraduationCap className="w-5 h-5 text-primary" />
              <span className="font-serif font-bold text-sm">10th Science Academy</span>
            </button>
            <p className="text-background/60 text-xs text-center">
              © {new Date().getFullYear()} 10th Science Academy. All rights reserved.
            </p>
            <p className="text-background/60 text-xs flex items-center gap-1">
              Built with{' '}
              <Heart className="w-3 h-3 text-primary fill-primary inline" />{' '}
              using{' '}
              <a
                href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== 'undefined' ? window.location.hostname : 'unknown-app')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 transition-colors underline underline-offset-2"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
