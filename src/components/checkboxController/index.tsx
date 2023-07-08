import {
  Checkbox,
  CheckboxProps, FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel
} from "@chakra-ui/react"
import { Controller, RegisterOptions, useFormContext } from "react-hook-form"

interface CheckboxControllerProps extends CheckboxProps {
  label: string
  name: string
  formRules?: RegisterOptions
  readOnly?: boolean
  helperText?: string
}

const CheckboxController = ({
  name,
  formRules,
  label,
  helperText,
  ...props
}: CheckboxControllerProps): JSX.Element => {
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
            <FormLabel>{label}</FormLabel>
            <Checkbox
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              {...props}
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

export default CheckboxController 
