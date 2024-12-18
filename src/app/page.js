import AnimatedBackground from './components/AnimatedBackground/AnimatedBackground';
import FeatureChecklist from './components/FeatureChecklist';
import Hero from './components/Hero';

export const metadata = {
  title: 'LogTrade - Home Page',
  description: 'Track your daily stock trades and gain insights over time',
};

export default function Home() {
  return (
    <>
      <AnimatedBackground />
      <main className="flex flex-col min-h-screen">
        <div className="flex flex-col gap-8 flex-grow">
          <Hero />
          <FeatureChecklist />
        </div>
      </main>
    </>
  );
}
