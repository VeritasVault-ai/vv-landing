"use client"

import { Shield, TrendingUp, Lock, Globe } from "lucide-react"

/**
 * Mission section for the About page
 */
export function AboutMission() {
  const values = [
    {
      icon: <Shield className="h-8 w-8 text-blue-600 dark:text-blue-400" />,
      title: "Security First",
      description: "We prioritize the security of our clients' assets above all else, implementing industry-leading security protocols and regular audits."
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-blue-600 dark:text-blue-400" />,
      title: "Innovation",
      description: "We continuously push the boundaries of what's possible in liquidity management through cutting-edge AI and blockchain technology."
    },
    {
      icon: <Lock className="h-8 w-8 text-blue-600 dark:text-blue-400" />,
      title: "Compliance",
      description: "We maintain the highest standards of regulatory compliance, ensuring our clients can operate with confidence in any jurisdiction."
    },
    {
      icon: <Globe className="h-8 w-8 text-blue-600 dark:text-blue-400" />,
      title: "Global Perspective",
      description: "We understand the global nature of digital assets and provide solutions that work across borders and regulatory frameworks."
    }
  ]

  return (
    <section className="py-20 bg-white dark:bg-slate-950">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">
            Our Mission & Values
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400">
            Our mission is to empower institutional investors with the tools and infrastructure they need to navigate the complex world of digital asset liquidity with confidence and precision.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {values.map((value, index) => (
            <div 
              key={index} 
              className="flex flex-col p-8 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800"
            >
              <div className="mb-4">
                {value.icon}
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
                {value.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                {value.description}
              </p>
            </div>
          ))}
        </div>
        
        <div className="mt-20 bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-8 md:p-12">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              Our Commitment
            </h3>
            <p className="text-lg text-slate-700 dark:text-slate-300 mb-6">
              At VeritasVault, we are committed to building a more transparent, efficient, and secure financial ecosystem for institutional investors. We believe that by combining cutting-edge technology with deep financial expertise, we can help our clients navigate the complexities of digital asset management and unlock new opportunities for growth.
            </p>
            <p className="text-lg text-slate-700 dark:text-slate-300">
              Our team of experts works tirelessly to stay at the forefront of industry developments, ensuring that our clients always have access to the most advanced and reliable liquidity management solutions available.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}