import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Radio,
  RadioGroup,
  RadioGroupProps,
  Stack
} from "@chakra-ui/react"
import { Controller, RegisterOptions, useFormContext } from "react-hook-form"

interface RedioControllerProps extends Omit<RadioGroupProps, "children"> {
  label: string;
  name: string;
  formRules?: RegisterOptions;
  readOnly?: boolean;
  options: {
    id: string;
    name: string;
  }[];
}

const RedioController = ({
  name,
  formRules,
  label,
  options,
  ...props
}: RedioControllerProps): JSX.Element => {
  const { control, watch } = useFormContext()

  const defaultValue = (props.defaultValue ?? watch(name)) || ""
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
            <RadioGroup
              value={value}
              onBlur={onBlur}
              {...props}
              onChange={(e) => {
                onChange(e)
                props?.onChange?.(e)
              }}
            >
              <Stack direction="row">
                {options.map((option) => (
                  <Radio value={option.id} key={option.id}>
                    {option.name}
                  </Radio>
                ))}
              </Stack>
            </RadioGroup>
            {fieldState.invalid && (
              <FormErrorMessage>{fieldState.error?.message}</FormErrorMessage>
            )}
          </FormControl>
        )
      }}
    />
  )
}

export default RedioController 
