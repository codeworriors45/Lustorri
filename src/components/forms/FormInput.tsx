"use client";

import { memo, forwardRef } from "react";
import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

// ============================================
// Base Input Styles
// ============================================

const baseInputStyles = cn(
  "w-full px-4 py-3 border border-border bg-background",
  "font-sans text-foreground placeholder:text-muted-foreground",
  "focus:outline-none focus:border-gold transition-colors",
  "disabled:opacity-50 disabled:cursor-not-allowed"
);

// ============================================
// FormInput Component
// ============================================

export interface FormInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  /** Label text */
  label?: string;
  /** Error message */
  error?: string;
  /** Helper text */
  helperText?: string;
  /** Size variant */
  size?: "sm" | "md" | "lg";
  /** Whether label is required indicator */
  required?: boolean;
  /** Container class name */
  containerClassName?: string;
}

const inputSizes = {
  sm: "px-3 py-2 text-sm",
  md: "px-4 py-3",
  lg: "px-5 py-4 text-lg",
} as const;

export const FormInput = memo(
  forwardRef<HTMLInputElement, FormInputProps>(function FormInput(
    {
      label,
      error,
      helperText,
      size = "md",
      required,
      containerClassName,
      className,
      id,
      ...props
    },
    ref
  ) {
    const inputId = id || props.name;

    return (
      <div className={containerClassName}>
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-sans font-medium text-foreground mb-2"
          >
            {label}
            {required && <span className="text-primary ml-1">*</span>}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            baseInputStyles,
            inputSizes[size],
            error && "border-primary focus:border-primary",
            className
          )}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : undefined}
          {...props}
        />
        {error && (
          <p
            id={`${inputId}-error`}
            className="mt-1 text-sm font-sans text-primary"
          >
            {error}
          </p>
        )}
        {helperText && !error && (
          <p className="mt-1 text-sm font-sans text-muted-foreground">
            {helperText}
          </p>
        )}
      </div>
    );
  })
);

FormInput.displayName = "FormInput";

// ============================================
// FormTextarea Component
// ============================================

export interface FormTextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Label text */
  label?: string;
  /** Error message */
  error?: string;
  /** Helper text */
  helperText?: string;
  /** Show character count */
  showCount?: boolean;
  /** Maximum characters */
  maxLength?: number;
  /** Current value (needed for character count) */
  value?: string;
  /** Container class name */
  containerClassName?: string;
}

export const FormTextarea = memo(
  forwardRef<HTMLTextAreaElement, FormTextareaProps>(function FormTextarea(
    {
      label,
      error,
      helperText,
      showCount,
      maxLength,
      value = "",
      containerClassName,
      className,
      id,
      ...props
    },
    ref
  ) {
    const textareaId = id || props.name;
    const currentLength = typeof value === "string" ? value.length : 0;

    return (
      <div className={containerClassName}>
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-sm font-sans font-medium text-foreground mb-2"
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          value={value}
          maxLength={maxLength}
          className={cn(
            baseInputStyles,
            "resize-none min-h-[80px]",
            error && "border-primary focus:border-primary",
            className
          )}
          aria-invalid={!!error}
          aria-describedby={error ? `${textareaId}-error` : undefined}
          {...props}
        />
        <div className="flex justify-between mt-1">
          {error ? (
            <p
              id={`${textareaId}-error`}
              className="text-sm font-sans text-primary"
            >
              {error}
            </p>
          ) : helperText ? (
            <p className="text-sm font-sans text-muted-foreground">
              {helperText}
            </p>
          ) : (
            <span />
          )}
          {showCount && maxLength && (
            <p className="text-xs text-muted-foreground">
              {currentLength}/{maxLength}
            </p>
          )}
        </div>
      </div>
    );
  })
);

FormTextarea.displayName = "FormTextarea";

// ============================================
// FormCheckbox Component
// ============================================

export interface FormCheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  /** Label text */
  label: string;
  /** Container class name */
  containerClassName?: string;
}

export const FormCheckbox = memo(
  forwardRef<HTMLInputElement, FormCheckboxProps>(function FormCheckbox(
    { label, containerClassName, className, id, ...props },
    ref
  ) {
    const checkboxId = id || props.name;

    return (
      <div className={cn("flex items-center gap-3", containerClassName)}>
        <input
          ref={ref}
          type="checkbox"
          id={checkboxId}
          className={cn("w-4 h-4 accent-primary", className)}
          {...props}
        />
        <label
          htmlFor={checkboxId}
          className="text-sm font-sans text-muted-foreground cursor-pointer"
        >
          {label}
        </label>
      </div>
    );
  })
);

FormCheckbox.displayName = "FormCheckbox";

// ============================================
// FormSelect Component
// ============================================

export interface FormSelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface FormSelectProps
  extends Omit<InputHTMLAttributes<HTMLSelectElement>, "size"> {
  /** Label text */
  label?: string;
  /** Select options */
  options: FormSelectOption[];
  /** Placeholder option */
  placeholder?: string;
  /** Error message */
  error?: string;
  /** Size variant */
  size?: "sm" | "md" | "lg";
  /** Container class name */
  containerClassName?: string;
}

export const FormSelect = memo(
  forwardRef<HTMLSelectElement, FormSelectProps>(function FormSelect(
    {
      label,
      options,
      placeholder,
      error,
      size = "md",
      containerClassName,
      className,
      id,
      ...props
    },
    ref
  ) {
    const selectId = id || (props.name as string);

    return (
      <div className={containerClassName}>
        {label && (
          <label
            htmlFor={selectId}
            className="block text-sm font-sans font-medium text-foreground mb-2"
          >
            {label}
          </label>
        )}
        <select
          ref={ref}
          id={selectId}
          className={cn(
            baseInputStyles,
            inputSizes[size],
            "appearance-none bg-no-repeat bg-right",
            "bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%3E%3Cpath%20fill%3D%22%23666%22%20d%3D%22M6%208L1%203h10z%22%2F%3E%3C%2Fsvg%3E')]",
            "bg-[length:12px] bg-[right_1rem_center] pr-10",
            error && "border-primary focus:border-primary",
            className
          )}
          aria-invalid={!!error}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </select>
        {error && (
          <p className="mt-1 text-sm font-sans text-primary">{error}</p>
        )}
      </div>
    );
  })
);

FormSelect.displayName = "FormSelect";
