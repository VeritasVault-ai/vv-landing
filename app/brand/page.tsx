import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Logo } from "@/components/ui/logo"
import { LogoWithText } from "@/components/ui/logo-with-text"

export const metadata: Metadata = {
  title: "Brand Guide | NeuralLiquid",
  description: "NeuralLiquid brand guidelines and assets",
}

function ColorCard({ name, hex, description }: { name: string; hex: string; description: string }) {
  return (
    <div className="flex flex-col">
      <div className="h-24 rounded-t-md" style={{ backgroundColor: hex }}></div>
      <div className="bg-white/10 p-4 rounded-b-md">
        <h3 className="font-semibold text-white">{name}</h3>
        <p className="text-sm text-brand-gray">{description}</p>
        <p className="text-xs text-white/60 mt-1">{hex}</p>
      </div>
    </div>
  )
}

export default function BrandPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <h1 className="mb-8 text-4xl font-semibold">NeuralLiquid Brand Guide</h1>

      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-semibold">Brand Essence</h2>
        <p className="text-lg">
          NeuralLiquid represents the intersection of artificial intelligence and DeFi liquidity optimization. Our brand
          communicates sophistication, intelligence, and fluid adaptability.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-semibold">Logo</h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Primary Logo</CardTitle>
              <CardDescription>Full logo with circular neural network icon and NeuralLiquid wordmark</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center p-6">
              <LogoWithText className="h-12" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Icon Only</CardTitle>
              <CardDescription>For app icons, favicons, and small space applications</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center p-6">
              <Logo className="h-12 w-12" />
            </CardContent>
          </Card>
        </div>

        <div className="mt-6 bg-white/10 p-4 rounded-md">
          <h3 className="text-lg font-semibold mb-2">Logo Usage Guidelines</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>Minimum Size: Logo should never appear smaller than 30px in height</li>
            <li>Clear Space: Maintain clear space equal to the height of the "N" in NeuralLiquid around the logo</li>
            <li>Do not distort, rotate, or change the colors of the logo</li>
            <li>Do not place the logo on busy backgrounds that reduce visibility</li>
          </ul>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-semibold">Color Palette</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          <ColorCard name="Deep Electric Blue" hex="#2d7fff" description="Primary brand color" />
          <ColorCard name="Darker Aqua" hex="#00c0a3" description="Secondary brand color" />
          <ColorCard name="Richer Purple" hex="#8066ff" description="Accent color" />
          <ColorCard name="White" hex="#ffffff" description="Text and UI elements" />
          <ColorCard name="Mid-tone Gray" hex="#d0d5e1" description="Secondary text" />
          <ColorCard name="Dark Navy" hex="#0a0f2c" description="Background gradient start" />
          <ColorCard name="Black" hex="#000000" description="Background gradient end" />
        </div>
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-semibold">Typography</h2>
        <Card>
          <CardHeader>
            <CardTitle>Primary Font: Poppins</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="text-sm font-normal text-muted-foreground">Headers: SemiBold (600)</h3>
              <p className="text-2xl font-semibold">The quick brown fox jumps over the lazy dog</p>
            </div>
            <div>
              <h3 className="text-sm font-normal text-muted-foreground">Subheaders: Regular (400)</h3>
              <p className="text-xl font-normal">The quick brown fox jumps over the lazy dog</p>
            </div>
            <div>
              <h3 className="text-sm font-normal text-muted-foreground">Body Text: Light (300)</h3>
              <p className="text-base font-light">The quick brown fox jumps over the lazy dog</p>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-semibold">Voice & Tone</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Authoritative</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Communicate expertise without being overly technical</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Clear</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Explain complex concepts in accessible language</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Forward-thinking</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Emphasize innovation and future potential</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Trustworthy</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Focus on security, reliability, and transparency</p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-semibold">Brand Applications</h2>
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Website</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Dark background with bright UI elements</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Social Media</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Consistent use of logo, colors, and messaging</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Marketing Materials</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Focus on the neural network visualization</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Product UI</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Clean, minimal interface with subtle animations</p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-semibold">Contact</h2>
        <Card>
          <CardContent className="p-6">
            <p>
              For brand usage questions, contact:{" "}
              <a href="mailto:brand@neuralliquid.com" className="text-brand-blue hover:underline">
                brand@neuralliquid.com
              </a>
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
