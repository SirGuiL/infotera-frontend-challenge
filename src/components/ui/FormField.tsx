import { ChangeEvent } from "react";
import {
  FieldErrors,
  UseFormRegister,
  Path,
  FieldValues,
} from "react-hook-form";

interface FormFieldProps<TFormValues extends FieldValues> {
  name: Path<TFormValues>;
  label: string;
  placeholder?: string;
  register: UseFormRegister<TFormValues>;
  errors: FieldErrors<TFormValues>;
  type?: string;
  className?: string;
  colSpan?: string;
  isTextarea?: boolean;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

type FieldProps<TFormValues extends FieldValues> = Omit<
  FormFieldProps<TFormValues>,
  "errors" | "label" | "errors" | "colSpan"
>;

export function FormField<TFormValues extends FieldValues>({
  errors,
  label,
  name,
  register,
  className,
  placeholder,
  type = "text",
  colSpan,
  onChange,
  isTextarea,
}: FormFieldProps<TFormValues>) {
  return (
    <div className={`flex col-span-${colSpan || "1"} flex-col gap-[5px]`}>
      <label
        htmlFor="contactName"
        className="font-semibold text-[13px] text-checkout-label leading-4 h-4"
      >
        {label}
      </label>

      <Field
        name={name}
        type={type}
        register={register}
        onChange={onChange}
        isTextarea={isTextarea}
        className={className}
        placeholder={placeholder}
      />

      {errors.contactName && (
        <p className="text-red-custom text-xs">
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  );
}

function Field<TFormValues extends FieldValues>({
  name,
  register,
  className,
  isTextarea,
  onChange,
  placeholder,
  type = "text",
}: FieldProps<TFormValues>) {
  if (isTextarea) {
    return (
      <textarea
        {...register(name)}
        className={`border border-[#DEDEDE] rounded w-full min-h-21 max-h-21 text-[13px] text-checkout-label leading-5 py-2 px-3 ring-0 focus:ring-0 focus:outline-none resize-none ${className}`}
        placeholder={placeholder}
        id={name}
      />
    );
  }

  return (
    <input
      {...register(name)}
      className={`border border-[#DEDEDE] rounded md:w-[205px] text-[13px] text-checkout-label leading-5 h-7 py-2 px-3 ring-0 focus:ring-0 focus:outline-none ${className}`}
      placeholder={placeholder}
      id={name}
      type={type}
      onChange={onChange}
    />
  );
}
