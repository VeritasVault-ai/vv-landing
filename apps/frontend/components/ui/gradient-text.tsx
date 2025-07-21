interface GradientTextProps {
  text: string
  from: string
  to: string
  className?: string
}

export function GradientText({ text, from, to, className = "" }: GradientTextProps) {
  const gradientStyle = {
    backgroundImage: `linear-gradient(to right, ${from}, ${to})`,
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    textFillColor: "transparent",
    display: "inline-block",
  }

  return (
    <span style={gradientStyle} className={className}>
      {text}
    </span>
  )
}
