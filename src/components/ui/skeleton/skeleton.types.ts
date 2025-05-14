import type { HTMLAttributes } from "react"

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Width of the skeleton
   */
  width?: string | number
  /**
   * Height of the skeleton
   */
  height?: string | number
  /**
   * Whether to show the skeleton with a border radius
   */
  rounded?: boolean
  /**
   * Whether to make the skeleton a circle
   */
  circle?: boolean
  /**
   * Animation type
   */
  animation?: "pulse" | "wave" | "none"
  /**
   * Additional CSS class names
   */
  className?: string
}

export interface SkeletonAvatarProps extends Omit<SkeletonProps, "circle"> {
  /**
   * Size of the avatar skeleton
   */
  size?: "small" | "medium" | "large" | number
}