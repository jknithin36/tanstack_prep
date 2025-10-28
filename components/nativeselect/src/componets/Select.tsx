import * as React from "react";

type Option = { value: string; label: string; disabled?: boolean };
type Size = "sm" | "md" | "lg";

export type SelectProps = Omit<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  "size"
> & {
  label?: string;
  helperText?: string;
  error?: string;
  options: Option[];
  size?: Size;
  id?: string;
  containerClassName?: string;
};

const sizeClass: Record<Size, string> = {
  sm: "h-9 text-sm px-3",
  md: "h-10 text-sm px-3.5",
  lg: "h-11 text-base px-4",
};

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      helperText,
      error,
      options,
      id,
      size = "md",
      className = "",
      containerClassName = "",
      disabled,
      required,
      ...props
    },
    ref
  ) => {
    const selectId = id || React.useId();
    const describedById = React.useId();
    const hasHelper = Boolean(helperText);
    const hasError = Boolean(error);

    return (
      <div className={`w-full ${containerClassName}`}>
        {label ? (
          <label htmlFor={selectId} className="label">
            {label} {required ? <span className="text-red-600">*</span> : null}
          </label>
        ) : null}

        <div className="relative">
          {/* caret */}
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <svg
              aria-hidden="true"
              viewBox="0 0 20 20"
              fill="currentColor"
              className={`h-4 w-4 ${
                disabled ? "text-slate-400" : "text-slate-500"
              }`}
            >
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
                clipRule="evenodd"
              />
            </svg>
          </div>

          <select
            ref={ref}
            id={selectId}
            disabled={disabled}
            aria-invalid={hasError || undefined}
            aria-describedby={hasHelper || hasError ? describedById : undefined}
            required={required}
            className={[
              // shadcn-ish field look
              "block w-full appearance-none rounded-xl border bg-white outline-none transition",
              "border-slate-200 focus:ring-4 focus:ring-blue-100 focus:border-slate-300",
              // states
              hasError
                ? "border-red-500 focus:ring-red-100 focus:border-red-500"
                : "",
              disabled ? "cursor-not-allowed bg-slate-50 text-slate-500" : "",
              // sizing and caret space
              sizeClass[size],
              "pr-9",
              // text
              "text-slate-900 placeholder-slate-400",
              className,
            ].join(" ")}
            {...props}
          >
            {options.map((opt) => (
              <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {hasHelper && !hasError ? (
          <p id={describedById} className="field-helper">
            {helperText}
          </p>
        ) : null}

        {hasError ? (
          <p id={describedById} className="field-error" role="alert">
            {error}
          </p>
        ) : null}
      </div>
    );
  }
);

Select.displayName = "Select";
