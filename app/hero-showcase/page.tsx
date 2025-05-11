"use client"

import { useState } from "react"
import { NewsletterHero } from "@/components/heroes/newsletter-hero"
import { CaseStudyHero } from "@/components/heroes/case-study-hero"
import { ProductFeatureHero } from "@/components/heroes/product-feature-hero"
import { AlternativeHero } from "@/components/heroes/alternative-hero"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function HeroShowcasePage() {
  const [activeTab, setActiveTab] = useState("alternative")

  return (
    <div className="space-y-8">
      <div className="container mx-auto max-w-4xl py-8">
        <h1 className="mb-6 text-4xl font-bold">Hero Component Showcase</h1>
        <p className="mb-8 text-lg text-muted-foreground">
          Explore different hero components designed for the NeuralLiquid brand. Each hero serves a different purpose
          and can be used in various contexts.
        </p>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
            <TabsTrigger value="alternative">Main Hero</TabsTrigger>
            <TabsTrigger value="product">Product Features</TabsTrigger>
            <TabsTrigger value="case">Case Study</TabsTrigger>
            <TabsTrigger value="newsletter">Newsletter</TabsTrigger>
          </TabsList>
          <div className="mt-6">
            <TabsContent value="alternative">
              <AlternativeHero />
            </TabsContent>
            <TabsContent value="product">
              <ProductFeatureHero />
            </TabsContent>
            <TabsContent value="case">
              <CaseStudyHero />
            </TabsContent>
            <TabsContent value="newsletter">
              <NewsletterHero />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  )
}
