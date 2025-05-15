export function TreasuryCaseStudy() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-blue-50 p-8 rounded-lg border border-blue-100">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-16 w-16 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-gray-400">Logo</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold">Case Study: Global Financial Services Firm</h3>
                <p className="text-gray-600">Treasury Management Transformation</p>
              </div>
            </div>
            
            <blockquote className="text-lg italic text-gray-600 mb-6">
              "VeritasVault's treasury management solution has transformed how we manage our digital asset holdings. 
              We've improved our yield by 24% while maintaining the liquidity we need for operations."
            </blockquote>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-white p-4 rounded-lg">
                <p className="text-3xl font-bold text-blue-700">$1.2B</p>
                <p className="text-sm text-gray-600">Assets Managed</p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <p className="text-3xl font-bold text-blue-700">24%</p>
                <p className="text-sm text-gray-600">Yield Improvement</p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <p className="text-3xl font-bold text-blue-700">40%</p>
                <p className="text-sm text-gray-600">Operational Efficiency</p>
              </div>
            </div>
            
            <a 
              href="/corporate-version/case-studies/global-financial-services" 
              className="inline-flex items-center text-blue-700 font-medium hover:underline"
            >
              Read the full case study
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}