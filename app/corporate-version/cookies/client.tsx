"use client"

import { RobustThemeProvider } from "@/src/context/RobustThemeProvider"
import { EXPERIENCE_TYPES, CORPORATE_VARIANTS, COLOR_MODES } from "@/src/constants/theme"
import { CorporateHeader } from "@/components/corporate/corporate-header"
import { CorporateFooter } from "@/components/corporate/corporate-footer"

/**
 * Client component for the Cookie Policy page
 */
export function CookiesClient() {
  return (
    <RobustThemeProvider 
      defaultExperience={EXPERIENCE_TYPES.CORPORATE}
      defaultVariant={CORPORATE_VARIANTS.CORPORATE}
      defaultColorMode={COLOR_MODES.LIGHT}
    >
      <div className="min-h-screen flex flex-col">
        
        <main className="flex-grow">
          <div className="container mx-auto px-4 py-16">
            <h1 className="text-3xl md:text-4xl font-bold mb-8">Cookie Policy</h1>
            
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <p className="text-lg mb-6">Last updated: May 15, 2025</p>
              
              <h2>What are cookies?</h2>
              <p>
                Cookies are small text files that are placed on your device when you visit a website. 
                They are widely used to make websites work more efficiently and provide information to 
                the website owners. Cookies enhance your browsing experience by allowing websites to 
                remember your preferences and understand how you use their services.
              </p>
              
              <h2>How we use cookies</h2>
              <p>
                VeritasVault Enterprise uses cookies for various purposes, including:
              </p>
              <ul>
                <li>
                  <strong>Essential cookies:</strong> These cookies are necessary for the website to function 
                  properly. They enable core functionality such as security, network management, and account access. 
                  You cannot opt out of these cookies.
                </li>
                <li>
                  <strong>Performance cookies:</strong> These cookies collect information about how visitors use 
                  our website, such as which pages they visit most often and if they receive error messages. 
                  They help us improve how our website works and understand user behavior.
                </li>
                <li>
                  <strong>Functionality cookies:</strong> These cookies allow the website to remember choices you 
                  make (such as your username, language, or region) and provide enhanced, personalized features.
                </li>
                <li>
                  <strong>Analytics cookies:</strong> We use analytics cookies to gather information about how 
                  users interact with our website, which helps us improve its functionality and user experience.
                </li>
                <li>
                  <strong>Marketing cookies:</strong> These cookies track your online activity to help advertisers 
                  deliver more relevant advertising or to limit how many times you see an ad.
                </li>
              </ul>
              
              <h2>Types of cookies we use</h2>
              <table className="w-full border-collapse border border-gray-300 dark:border-gray-700 my-6">
                <thead>
                  <tr className="bg-gray-100 dark:bg-gray-800">
                    <th className="border border-gray-300 dark:border-gray-700 p-3 text-left">Category</th>
                    <th className="border border-gray-300 dark:border-gray-700 p-3 text-left">Purpose</th>
                    <th className="border border-gray-300 dark:border-gray-700 p-3 text-left">Duration</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-700 p-3">Session Cookies</td>
                    <td className="border border-gray-300 dark:border-gray-700 p-3">These temporary cookies expire when you close your browser. They enable the website to remember your choices as you navigate between pages.</td>
                    <td className="border border-gray-300 dark:border-gray-700 p-3">Session</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-700 p-3">Persistent Cookies</td>
                    <td className="border border-gray-300 dark:border-gray-700 p-3">These cookies remain on your device for a specified period. They enable the website to recognize you when you return.</td>
                    <td className="border border-gray-300 dark:border-gray-700 p-3">1 day to 2 years</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-700 p-3">First-Party Cookies</td>
                    <td className="border border-gray-300 dark:border-gray-700 p-3">These cookies are set by our website directly.</td>
                    <td className="border border-gray-300 dark:border-gray-700 p-3">Varies</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-700 p-3">Third-Party Cookies</td>
                    <td className="border border-gray-300 dark:border-gray-700 p-3">These cookies are set by third parties, such as analytics providers or advertising networks.</td>
                    <td className="border border-gray-300 dark:border-gray-700 p-3">Varies</td>
                  </tr>
                </tbody>
              </table>
              
              <h2>Managing cookies</h2>
              <p>
                Most web browsers allow you to manage your cookie preferences. You can:
              </p>
              <ul>
                <li>Delete cookies from your device</li>
                <li>Block cookies by activating the setting on your browser that allows you to refuse all or some cookies</li>
                <li>Set your browser to notify you when you receive a cookie</li>
              </ul>
              <p>
                Please note that if you choose to block or delete cookies, you may not be able to access certain areas or features of our website, 
                and some services may not function properly.
              </p>
              
              <h2>How to control and delete cookies</h2>
              <p>
                To manage cookies in different browsers, please click on the relevant link below:
              </p>
              <ul>
                <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">Google Chrome</a></li>
                <li><a href="https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">Mozilla Firefox</a></li>
                <li><a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">Microsoft Edge</a></li>
                <li><a href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">Safari</a></li>
              </ul>
              
              <h2>Changes to this Cookie Policy</h2>
              <p>
                We may update this Cookie Policy from time to time to reflect changes in technology, regulation, or our business practices. 
                Any changes will be posted on this page, and if the changes are significant, we will provide a more prominent notice.
              </p>
              
              <h2>Contact us</h2>
              <p>
                If you have any questions about our use of cookies, please contact us at privacy@veritasvault.com.
              </p>
            </div>
          </div>
        </main>
        
      </div>
    </RobustThemeProvider>
  )
}