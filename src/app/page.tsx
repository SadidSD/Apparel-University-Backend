import Header from '@/components/Header';
import SummaryCard from '@/components/SummaryCard';
import UpdatePackageChart from '@/components/charts/UpdatePackageChart';
import ActiveStudentsChart from '@/components/charts/ActiveStudentsChart';
import BlogViewChart from '@/components/charts/BlogViewChart';

export default function Home() {
  return (
    <main className="w-full">
      <Header />
      
      {/* Top Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <SummaryCard number="500000" label="Students" />
        <SummaryCard number="1500" label="course" />
        <SummaryCard number="300" label="Blog" />
        <SummaryCard number="300" label="News Letter" />
      </div>

      {/* Main Chart Area */}
      <div className="mb-8">
        <UpdatePackageChart />
      </div>

      {/* Bottom Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <ActiveStudentsChart />
        <BlogViewChart />
      </div>

    </main>
  );
}
