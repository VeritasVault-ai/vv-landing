"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

/**
 * FAQ section for the Pricing page
 */
export function PricingFAQ() {
  const faqs = [
    {
      question: "How does the 14-day free trial work?",
      answer: "Our 14-day free trial gives you full access to all features of your selected plan. No credit card is required to start. At the end of your trial, you can choose to subscribe to continue using the platform or your account will be automatically downgraded to a limited view-only mode."
    },
    {
      question: "Can I change plans later?",
      answer: "Yes, you can upgrade or downgrade your plan at any time. When upgrading, you'll be charged the prorated difference for the remainder of your billing cycle. When downgrading, the new lower rate will apply at the start of your next billing cycle."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, ACH bank transfers, and wire transfers for annual plans. For Enterprise customers, we can also accommodate purchase orders and other payment arrangements as needed."
    },
    {
      question: "Is there a setup fee?",
      answer: "There are no setup fees for our Growth and Professional plans. Enterprise plans may include a one-time implementation fee depending on the complexity of your requirements, which will be clearly outlined in your custom quote."
    },
    {
      question: "Do you offer discounts for startups or educational institutions?",
      answer: "Yes, we offer special pricing for qualified startups, educational institutions, and non-profit organizations. Please contact our sales team to discuss eligibility and available discounts."
    },
    {
      question: "What happens to my data if I cancel my subscription?",
      answer: "If you cancel your subscription, you'll maintain access to your account in a read-only mode for 30 days. During this period, you can export all your data. After 30 days, your data will be archived and can be restored if you reactivate your subscription within 90 days. After 90 days, your data will be permanently deleted in accordance with our data retention policy."
    },
    {
      question: "Can I add more users to my plan?",
      answer: "Yes, you can add additional users to any plan for an extra fee per user. The per-user cost varies by plan and is discounted for annual billing. You can add or remove users at any time from your account settings."
    },
    {
      question: "Do you offer a service level agreement (SLA)?",
      answer: "Professional plans include a standard SLA with 99.9% uptime guarantee and priority support. Enterprise plans include a customizable SLA with up to 99.99% uptime guarantee, dedicated support channels, and custom response time commitments."
    }
  ]

  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-900">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white text-center mb-12">
            Frequently Asked Questions
          </h2>
          
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden"
              >
                <AccordionTrigger className="px-6 py-4 text-left font-medium text-slate-900 dark:text-white hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-slate-600 dark:text-slate-300">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          
          <div className="mt-12 text-center">
            <p className="text-slate-600 dark:text-slate-400">
              Have more questions? <a href="/corporate-version/contact" className="text-blue-600 dark:text-blue-400 font-medium hover:underline">Contact our sales team</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}