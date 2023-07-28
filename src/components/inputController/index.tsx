import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  InputProps
} from "@chakra-ui/react"
import { Controller, RegisterOptions, useFormContext } from "react-hook-form"

interface InputControllerProps extends InputProps {
  label: string;
  name: string;
  formRules?: RegisterOptions;
  readOnly?: boolean;
  helperText?: string;
}

const InputController = ({
  name,
  formRules,
  label,
  helperText,
  ...props
}: InputControllerProps): JSX.Element => {
  const { control, watch } = useFormContext()

  const defaultValue = watch(name) || ""
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      rules={formRules}
      render={({ field: { onBlur, onChange, value }, fieldState }) => {
        return (
          <FormControl isInvalid={fieldState.invalid}>
            {props.display !== "none" && <FormLabel>{label}</FormLabel>}
            <Input
              value={value}
              {...props}
              onChange={(e) => {
                onChange(e)
                props?.onChange?.(e)
              }}
              onBlur={onBlur}
              placeholder={label}
            />
            {!fieldState.invalid ? (
              <FormHelperText>{helperText}</FormHelperText>
            ) : (
                <FormErrorMessage>{fieldState.error?.message}</FormErrorMessage>
              )}
          </FormControl>
        )
      }}
    />
  )
}

export default InputController 
