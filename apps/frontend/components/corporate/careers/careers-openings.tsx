"use client"

import { useState } from "react"

/**
 * Job openings section for the Careers page
 */
export function CareersOpenings() {
  const [activeFilter, setActiveFilter] = useState("All")
  
  const jobOpenings = [
    {
      title: "Senior Backend Engineer",
      department: "Engineering",
      location: "Remote (US)",
      type: "Full-time",
      description: "Design and implement scalable backend systems for our institutional liquidity management platform.",
    },
    {
      title: "Product Manager",
      department: "Product",
      location: "New York, NY",
      type: "Full-time",
      description: "Lead product strategy and roadmap for our enterprise solutions, working closely with clients and engineering teams.",
    },
    {
      title: "Security Analyst",
      department: "Security",
      location: "Remote (Global)",
      type: "Full-time",
      description: "Ensure the security and compliance of our platform through regular audits, penetration testing, and security reviews.",
    },
    {
      title: "UI/UX Designer",
      department: "Design",
      location: "San Francisco, CA",
      type: "Full-time",
      description: "Create intuitive and elegant user experiences for institutional clients managing digital assets.",
    },
    {
      title: "Business Development Representative",
      department: "Sales",
      location: "London, UK",
      type: "Full-time",
      description: "Identify and engage potential enterprise clients, building relationships and generating qualified leads.",
    },
    {
      title: "DevOps Engineer",
      department: "Engineering",
      location: "Remote (US)",
      type: "Full-time",
      description: "Build and maintain our cloud infrastructure, CI/CD pipelines, and deployment processes.",
    },
  ]

  const departments = ["All", "Engineering", "Product", "Design", "Sales", "Security"]
  
  const filteredJobs = activeFilter === "All" 
    ? jobOpenings 
    : jobOpenings.filter(job => job.department === activeFilter)

  return (
    <section id="openings" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Open Positions</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Join our team and help shape the future of institutional digital asset management. 
            Explore our current openings below.
          </p>
        </div>

        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {departments.map((dept) => (
            <button
              key={dept}
              onClick={() => setActiveFilter(dept)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeFilter === dept 
                  ? "bg-blue-600 text-white" 
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              {dept}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredJobs.map((job, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold">{job.title}</h3>
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                  {job.department}
                </span>
              </div>
              <p className="text-gray-600 mb-4">{job.description}</p>
              <div className="flex flex-wrap gap-3 mb-6">
                <span className="text-sm text-gray-500 flex items-center">
                  <span className="mr-1">📍</span> {job.location}
                </span>
                <span className="text-sm text-gray-500 flex items-center">
                  <span className="mr-1">⏱️</span> {job.type}
                </span>
              </div>
              <a 
                href={`/corporate-version/careers/${job.title.toLowerCase().replace(/\s+/g, '-')}`}
                className="text-blue-600 font-medium hover:text-blue-800 transition-colors flex items-center"
              >
                View Details
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No open positions in this department at the moment.</p>
            <p className="text-gray-500 mt-2">Please check back later or explore other departments.</p>
          </div>
        )}

        <div className="mt-16 text-center">
          <p className="text-lg mb-6">
            Don't see a position that matches your skills? We're always looking for talented individuals.
          </p>
          <a 
            href="mailto:careers@veritasvault.net" 
            className="bg-blue-600 text-white px-8 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors inline-block"
          >
            Send Us Your Resume
          </a>
        </div>
      </div>
    </section>
  )
}