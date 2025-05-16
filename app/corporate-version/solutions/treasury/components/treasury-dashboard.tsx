export function TreasuryDashboard() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Treasury Dashboard</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our intuitive dashboard provides a comprehensive view of your treasury operations, with real-time data and actionable insights.
          </p>
        </div>
        
        <div className="relative rounded-xl overflow-hidden shadow-xl max-w-5xl mx-auto">
          <div className="bg-gray-800 h-8 flex items-center px-4">
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
          </div>
          <div className="bg-gray-200 h-96 flex items-center justify-center">
            <span className="text-gray-500">Treasury Dashboard Screenshot</span>
          </div>
        </div>
      </div>
    </section>
  )
}