"use client"

import Image from "next/image"

/**
 * Hero section for the Careers page
 */
export function CareersHero() {
  return (
    <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Join Our Team at VeritasVault
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              Help us build the future of institutional liquidity management for digital assets. 
              We're looking for talented individuals who are passionate about innovation and excellence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="#openings" 
                className="bg-white text-blue-900 px-8 py-3 rounded-md font-medium hover:bg-blue-50 transition-colors text-center"
              >
                View Open Positions
              </a>
              <a 
                href="#values" 
                className="border border-white text-white px-8 py-3 rounded-md font-medium hover:bg-blue-800 transition-colors text-center"
              >
                Our Values
              </a>
            </div>
          </div>
          <div className="hidden lg:block relative h-96">
            <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-lg overflow-hidden">
              <div className="grid grid-cols-2 grid-rows-2 gap-2 p-4 h-full">
                <div className="bg-blue-800/50 rounded-lg p-4 flex items-center justify-center">
                  <span className="text-lg font-medium">Innovation</span>
                </div>
                <div className="bg-blue-800/50 rounded-lg p-4 flex items-center justify-center">
                  <span className="text-lg font-medium">Collaboration</span>
                </div>
                <div className="bg-blue-800/50 rounded-lg p-4 flex items-center justify-center">
                  <span className="text-lg font-medium">Excellence</span>
                </div>
                <div className="bg-blue-800/50 rounded-lg p-4 flex items-center justify-center">
                  <span className="text-lg font-medium">Integrity</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}