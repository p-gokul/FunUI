import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";

export type FormInputTextProps = {
  name: string;
  label: string;
  placeholder?: string;
  readOnly?: boolean;
};

export type FormInputNumberProps = {
  name: string;
  label: string;
  placeholder?: string;
};

export type FormInputDateProps = {
  name: string;
  label: string;
  readOnly?: boolean;
};

// ✅ TEXT INPUT
export const FormInputText = ({
  name,
  label,
  placeholder,
  readOnly = false,
}: FormInputTextProps) => {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              {...field}
              placeholder={placeholder}
              readOnly={readOnly}
              value={field.value || ""}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

// ✅ NUMBER INPUT
export const FormInputNumber = ({
  name,
  label,
  placeholder,
}: FormInputNumberProps) => {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              type="number"
              placeholder={placeholder}
              {...field}
              value={field.value ?? ""}
              onChange={(e) => field.onChange(Number(e.target.value))}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

// ✅ DATE INPUT
export const FormInputDate = ({
  name,
  label,
  readOnly = false,
}: FormInputDateProps) => {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              type="date"
              value={
                field.value instanceof Date
                  ? field.value.toISOString().slice(0, 10)
                  : ""
              }
              readOnly={readOnly}
              onChange={(e) => {
                field.onChange(new Date(`${e.target.value}T00:00:00`));
              }}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
