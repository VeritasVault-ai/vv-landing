"use client"

import { forwardRef } from "react"
import styles from "./switch.module.css"
import type { SwitchProps } from "./switch.types"
import { cn } from "@/lib/utils"

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  (
    {
      id,
      name,
      checked,
      defaultChecked,
      required = false,
      disabled = false,
      readOnly = false,
      value,
      onChange,
      onFocus,
      onBlur,
      className,
      label,
      labelPosition = "right",
      variant = "primary",
      size = "medium",
      ...rest
    },
    ref,
  ) => {
    const switchId = id || `switch-${Math.random().toString(36).substring(2, 9)}`
    
    const switchClasses = cn(
      styles.switch,
      styles[`switch--${variant}`],
      styles[`switch--${size}`],
      disabled && styles["switch--disabled"],
      className,
    )
    
    const labelClasses = cn(
      styles.label, 
      styles[`label--${labelPosition}`], 
      disabled && styles["label--disabled"]
    )
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!disabled && !readOnly && onChange) {
        onChange(e)
      }
    }
    
    const switchControl = (
      <div className={switchClasses}>
        <input
          type="checkbox"
          id={switchId}
          name={name}
          checked={checked}
          defaultChecked={defaultChecked}
          required={required}
          disabled={disabled}
          readOnly={readOnly}
          value={value}
          onChange={handleChange}
          onFocus={onFocus}
          onBlur={onBlur}
          className={styles.input}
          ref={ref}
          aria-checked={checked || defaultChecked || false}
          {...rest}
        />
        <span className={styles.slider}></span>
      </div>
    )
    
    if (label) {
      return (
        <label htmlFor={switchId} className={labelClasses}>
          {labelPosition === "left" && <span className={styles.labelText}>{label}</span>}
          {switchControl}
          {labelPosition === "right" && <span className={styles.labelText}>{label}</span>}
        </label>
      )
    }
    
    return switchControl
  },
)

Switch.displayName = "Switch"