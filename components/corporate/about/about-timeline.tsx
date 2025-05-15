("use client"

/**
 * Timeline section for the About page
 */
export function AboutTimeline() {
  const timelineEvents = [
    {
      year: "May 2025",
      title: "MVP Launch",
      description: "Successfully launched our Minimum Viable Product, marking the beginning of our journey to revolutionize institutional liquidity management."
    },
    {
      year: "Q3 2025",
      title: "Seed Funding (Planned)",
      description: "Planning to secure initial funding from venture capital firms specializing in fintech and blockchain technology."
    },
    {
      year: "Q4 2025",
      title: "Beta Platform (Planned)",
      description: "Planning to release our beta platform to select institutional partners for feedback and refinement."
    },
    {
      year: "Q1 2026",
      title: "Series A Funding (Planned)",
      description: "Aiming to raise Series A funding to accelerate product development and expand our team."
    },
    {
      year: "Q2 2026",
      title: "Official Launch (Planned)",
      description: "Planning to launch our enterprise platform to the public with comprehensive liquidity management solutions."
    },
    {
      year: "Q3 2026",
      title: "Strategic Partnerships (Planned)",
      description: "Intending to form strategic partnerships with major financial institutions and blockchain protocols."
    },
    {
      year: "2027",
      title: "Global Expansion (Planned)",
      description: "Planning to expand operations to Europe and Asia, serving clients across multiple jurisdictions."
    }
  ]

  return (
    <section className="py-20 bg-white dark:bg-slate-950">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">
            Our Journey
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400">
            From inception to our vision for the future, follow our path of innovation and growth.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-blue-200 dark:bg-blue-900/50"></div>
          
          {/* Timeline events */}
          <div className="space-y-12">
            {timelineEvents.map((event, index) => (
              <div key={index} className={`relative flex flex-col md:flex-row ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                <div className="flex-1 md:w-1/2"></div>
                
                {/* Timeline dot */}
                <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-blue-600 dark:bg-blue-500 border-4 border-white dark:border-slate-950 z-10"></div>
                
                {/* Content */}
                <div className={`flex-1 md:w-1/2 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'} pl-10 md:pl-0`}>
                  <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-lg shadow-sm border border-slate-200 dark:border-slate-800">
                    <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-sm font-medium rounded-full mb-3">
                      {event.year}
                    </span>
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                      {event.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400">
                      {event.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
})