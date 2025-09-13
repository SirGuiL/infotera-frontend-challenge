import { InputHTMLAttributes } from "react";

import { CheckboxChecked } from "@/components/icons/CheckboxChecked";

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export function Checkbox({ checked, onChange, ...props }: CheckboxProps) {
  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="sr-only"
        {...props}
      />

      <label htmlFor={props.id}>
        {checked ? (
          <div className="w-4 h-4 rounded-sm fill-primary">
            <CheckboxChecked />
          </div>
        ) : (
          <div className="w-4 h-4 rounded-sm border border-gray-300"></div>
        )}
      </label>
    </div>
  );
}
