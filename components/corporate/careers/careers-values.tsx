"use client"

/**
 * Company values section for the Careers page
 */
export function CareersValues() {
  const values = [
    {
      title: "Innovation",
      description: "We push boundaries and embrace new technologies to solve complex problems in the digital asset space.",
      icon: "💡",
    },
    {
      title: "Integrity",
      description: "We operate with transparency and honesty in all our interactions with clients, partners, and team members.",
      icon: "🛡️",
    },
    {
      title: "Excellence",
      description: "We strive for the highest standards in our products, services, and professional development.",
      icon: "🏆",
    },
    {
      title: "Collaboration",
      description: "We believe in the power of diverse perspectives and teamwork to drive innovation and success.",
      icon: "🤝",
    },
  ]

  return (
    <section id="values" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Values</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            At VeritasVault, our values guide everything we do. They shape our culture, 
            inform our decisions, and define how we work together to achieve our mission.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <div 
              key={index} 
              className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="text-4xl mb-4">{value.icon}</div>
              <h3 className="text-xl font-bold mb-3">{value.title}</h3>
              <p className="text-gray-600">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}