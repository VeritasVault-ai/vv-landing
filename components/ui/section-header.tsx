import { cn } from "@/lib/utils"
import { GradientText } from "@/components/ui/gradient-text"

interface SectionHeaderProps {
  title: string
  subtitle?: string
  description?: string
  align?: "left" | "center" | "right"
  className?: string
  titleClassName?: string
  subtitleClassName?: string
  descriptionClassName?: string
  useGradient?: boolean
  gradientFrom?: string
  gradientTo?: string
}

export function SectionHeader({
  title,
  subtitle,
  description,
  align = "center",
  className,
  titleClassName,
  subtitleClassName,
  descriptionClassName,
  useGradient = false,
  gradientFrom = "#3A86FF",
  gradientTo = "#8A2BE2",
}: SectionHeaderProps) {
  const alignmentClasses = {
    left: "text-left",
    center: "text-center mx-auto",
    right: "text-right ml-auto",
  }

  return (
    <div className={cn("max-w-3xl mb-12", alignmentClasses[align], className)}>
      {subtitle && (
        <p
          className={cn(
            "text-sm font-medium uppercase tracking-wider mb-3",
            "text-brand-blue dark:text-brand-aqua",
            subtitleClassName,
          )}
        >
          {subtitle}
        </p>
      )}
      <h2 className={cn("text-3xl md:text-4xl font-bold mb-4", titleClassName)}>
        {useGradient ? <GradientText text={title} from={gradientFrom} to={gradientTo} /> : title}
      </h2>
      {description && (
        <p className={cn("text-lg text-muted-foreground leading-relaxed", descriptionClassName)}>{description}</p>
      )}
    </div>
  )
}
