import {
  Box,
  Button,
  SimpleGrid
} from "@chakra-ui/react"
import { FC } from "react"
import { useFieldArray, UseFormReturn } from "react-hook-form"
import InputController from "../../components/inputController"
import SelectController from "../../components/selectController"
import { ElementType, Page } from "../../types"

interface FieldsProps {
  formProviderProps: UseFormReturn<Page, any, undefined>
}

const Fields: FC<FieldsProps> = ({ formProviderProps }) => {

  const { fields, append, remove } = useFieldArray({
    control: formProviderProps.control,
    name: "elements"
  });

  const addField = () => {
    append({
      type: ElementType.Text,
      name: "",
      choices: [""],
      requiredIf: "",
      visibleIf: "",
      editableIf: "",
    })
  }

  return (
    <>
      {fields?.map((field, index) => (
        <Box border="1px" borderColor="gray.200" borderRadius="6" p={3} mt={4}>
          <SimpleGrid columns={3} spacingX="40px" spacingY="20px" mt={4} p={3} key={field.id}>
            <Box>
              <SelectController
                name={`elements.${index}.type`}
                label={"Type"}
                options={Object.keys(ElementType).map((key) => ({
                  id: key,
                  name: key,
                }))}
                formRules={{
                  required: { value: true, message: "Type is required" },
                }}
              />
            </Box>
            <Box>
              <InputController
                name={`elements.${index}.name`}
                label={"FieldName"}
                formRules={{
                  required: { value: true, message: "Name is required" },
                }}
              />
            </Box>
            <Box>
              <InputController
                name={`elements.${index}.choices`}
                label={"Choices"}
                helperText="(Enter options and seprate them by comma)"
              />
            </Box>
            <Box>
              <InputController name={`elements.${index}.requiredIf`} label={"RequiredIf"} />
            </Box>
            <Box>
              <InputController name={`elements.${index}.visibleIf`} label={"VisibleIf"} />
            </Box>
            <Box>
              <InputController name={`elements.${index}.editableIf`} label={"EditableIf"} />
            </Box>
            {index > 0 && <Box>
              <Button
                mt={4}
                colorScheme="blue"
                variant="outline"
                onClick={() => remove(index)}
              >
                Remove Field
            </Button>
            </Box>
            }
          </SimpleGrid>
        </Box>
      ))
      }
      <Button
        mt={4}
        colorScheme="blue"
        variant="outline"
        onClick={() => addField()}
      >
        Add New Field
      </Button>
    </>
  )
}

export default Fields 
