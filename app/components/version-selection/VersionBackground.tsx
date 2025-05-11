"use client"

export function VersionBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-0 left-0 w-full h-full bg-[#0a1025]"></div>
      <div className="absolute -top-[40%] -right-[10%] w-[70%] h-[70%] rounded-full bg-blue-900/10 blur-3xl"></div>
      <div className="absolute top-[60%] -left-[5%] w-[40%] h-[40%] rounded-full bg-purple-900/10 blur-3xl"></div>
      
      {/* Additional background elements for visual interest */}
      <div className="absolute top-[20%] left-[30%] w-[15%] h-[15%] rounded-full bg-blue-500/5 blur-2xl"></div>
      <div className="absolute top-[70%] right-[20%] w-[25%] h-[25%] rounded-full bg-purple-500/5 blur-2xl"></div>
      
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-black/5 to-black/20"></div>
    </div>
  )
}