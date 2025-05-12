import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Register | VeritasVault.ai",
  description: "Create a new VeritasVault.ai corporate account.",
}

export default function CorporateRegisterPage() {
  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <a href="/" className="flex items-center">
              <span className="text-xl font-bold text-blue-900 dark:text-blue-300">
                <span>Veritas</span>
                <span className="text-blue-700 dark:text-blue-400">Vault</span>
                <span className="text-blue-500">.ai</span>
              </span>
            </a>
          </div>
        </div>
      </header>

      <main className="flex items-center justify-center min-h-[calc(100vh-4rem)] bg-slate-50 dark:bg-slate-900 py-12">
        <div className="w-full max-w-md p-8 bg-white dark:bg-slate-950 rounded-lg shadow-md border border-slate-200 dark:border-slate-800">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Create an Account</h1>
            <p className="text-slate-600 dark:text-slate-400">Register for a corporate account</p>
          </div>

          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-md bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                  placeholder="John"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-md bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                  placeholder="Doe"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-md bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                placeholder="you@company.com"
              />
            </div>

            <div>
              <label htmlFor="company" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Company
              </label>
              <input
                type="text"
                id="company"
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-md bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                placeholder="Acme Inc."
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-md bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                placeholder="••••••••"
              />
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-md bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                placeholder="••••••••"
              />
            </div>

            <div className="flex items-center">
              <input type="checkbox" id="terms" className="h-4 w-4 text-blue-600 border-slate-300 rounded" />
              <label htmlFor="terms" className="ml-2 block text-sm text-slate-700 dark:text-slate-300">
                I agree to the{" "}
                <a href="#" className="text-blue-700 dark:text-blue-400 hover:underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-blue-700 dark:text-blue-400 hover:underline">
                  Privacy Policy
                </a>
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-medium rounded-md"
            >
              Create Account
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Already have an account?{" "}
              <a href="/corporate/login" className="text-blue-700 dark:text-blue-400 hover:underline">
                Sign in
              </a>
            </p>
          </div>
        </div>
      </main>

      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 py-6">
        <div className="container mx-auto px-4">
          <p className="text-center text-slate-600 dark:text-slate-400">
            &copy; 2023 VeritasVault.ai. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  )
}
