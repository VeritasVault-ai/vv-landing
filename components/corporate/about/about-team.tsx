"use client"

import { Linkedin, Twitter } from "lucide-react"
import Image from "next/image"

/**
 * Team section for the About page
 */
export function AboutTeam() {
  const teamMembers = [
    {
      name: "Eben Mare",
      role: "Chief Executive Officer",
      image: "/team/eben-ai.png",
      bio: "...",
      linkedin: "#",
      twitter: "#"
    },
    {
      name: "Hans Jurgens (Jurie) Smit",
      role: "Chief Technology Officer",
      image: "/team/jurie-ai.png",
      bio: "...",
      linkedin: "#",
      twitter: "#"
    }
  ]

  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-900">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">
            Our Leadership Team
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400">
            Meet the experts behind VeritasVault's innovative liquidity management solutions.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div 
              key={index} 
              className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-md border border-slate-200 dark:border-slate-700 transition-all hover:shadow-lg"
            >
              <div className="aspect-square relative bg-slate-200 dark:bg-slate-700">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                  {member.name}
                </h3>
                <p className="text-blue-600 dark:text-blue-400 mb-3">
                  {member.role}
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                  {member.bio}
                </p>
                <div className="flex space-x-3">
                  <a 
                    href={member.linkedin} 
                    className="text-slate-400 hover:text-blue-600 dark:hover:text-blue-400"
                    aria-label={`${member.name}'s LinkedIn`}
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                  <a 
                    href={member.twitter} 
                    className="text-slate-400 hover:text-blue-600 dark:hover:text-blue-400"
                    aria-label={`${member.name}'s Twitter`}
                  >
                    <Twitter className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Our team includes experts from leading financial institutions, technology companies, and regulatory bodies.
          </p>
          <a 
            href="/corporate-version/careers" 
            className="inline-flex items-center text-blue-600 dark:text-blue-400 font-medium mt-4 hover:underline"
          >
            Join our team
            <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}