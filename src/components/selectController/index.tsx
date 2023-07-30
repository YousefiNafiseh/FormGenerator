import { FormControl, FormErrorMessage, FormLabel, Select, SelectProps } from "@chakra-ui/react"
import { Controller, RegisterOptions, useFormContext } from "react-hook-form"

interface SelectControllerProps extends SelectProps {
  label: string;
  name: string;
  formRules?: RegisterOptions;
  readOnly?: boolean;
  options: {
    id: string,
    name: string
  }[]
}

const SelectController = ({
  name,
  formRules,
  label,
  options,
  ...props
}: SelectControllerProps): JSX.Element => {
  const { control, watch } = useFormContext()

  const defaultValue = (props.defaultValue ?? watch(name)) || ""
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      rules={formRules}
      render={({ field: { onBlur, onChange, value }, fieldState }) => {
        return <FormControl isInvalid={fieldState.invalid}>
          {props.display !== "none" && <FormLabel>{label}</FormLabel>}
          <Select
            value={value}
            onBlur={onBlur}
            {...props}
            onChange={(e) => {
              onChange(e)
              props?.onChange?.(e)
            }}
          >
            {options.map((option) => (
              <option value={option.id} key={option.id}>{option.name}</option>
            ))}
          </Select>
          {fieldState.invalid &&
            <FormErrorMessage>{fieldState.error?.message}</FormErrorMessage>
          }
        </FormControl>
      }}
    />
  )
}

export default SelectController 
