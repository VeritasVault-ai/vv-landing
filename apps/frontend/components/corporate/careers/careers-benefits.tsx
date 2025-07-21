"use client"

/**
 * Benefits section for the Careers page
 */
export function CareersBenefits() {
  const benefits = [
    {
      title: "Competitive Compensation",
      description: "Salary packages that recognize your skills and experience, with equity options to share in our success.",
      icon: "💰",
    },
    {
      title: "Health & Wellness",
      description: "Comprehensive health insurance, mental health support, and wellness programs to keep you at your best.",
      icon: "🏥",
    },
    {
      title: "Flexible Work",
      description: "Remote-friendly policies and flexible schedules to help you maintain work-life balance.",
      icon: "🏠",
    },
    {
      title: "Professional Growth",
      description: "Learning stipends, conference attendance, and clear career progression paths.",
      icon: "📈",
    },
    {
      title: "Team Building",
      description: "Regular team retreats, social events, and collaborative projects to foster strong relationships.",
      icon: "🌐",
    },
    {
      title: "Time Off",
      description: "Generous paid time off, holidays, and parental leave policies to rest and recharge.",
      icon: "⏰",
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Benefits & Perks</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We believe in taking care of our team members. Here's what you can expect when you join VeritasVault.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div 
              key={index} 
              className="bg-gray-50 p-6 rounded-lg border border-gray-100"
            >
              <div className="text-3xl mb-4">{benefit.icon}</div>
              <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}