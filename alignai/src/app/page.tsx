import { CategoryGrid } from '@/components/CategoryGrid'
import { Header } from '@/components/Header'
import { InterviewCard } from '@/components/InterviewCard'
import { interviewData } from '@/data/interviews'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-gray-900 mb-6">
            Your perfect interview starts here
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Practice with 100+ expert-vetted interviews, get feedback on
            your performance, and land your dream opportunity.
          </p>
        </div>

        {/* Category Navigation */}
        <CategoryGrid />

        {/* Interview Cards Grid */}
        <div className="mt-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {interviewData.map((interview, index) => (
              <InterviewCard
                key={interview.id}
                interview={interview}
                index={index}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
