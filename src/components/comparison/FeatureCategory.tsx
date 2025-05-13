export interface FeatureCategoryProps {
  title: string
}

export function FeatureCategory({ title }: FeatureCategoryProps) {
  return (
    <tr>
      <td colSpan={3} className="p-4 bg-slate-50 dark:bg-slate-800/50 font-medium">
        {title}
      </td>
    </tr>
  )
}