import {
  Box, Button,


  Flex, SimpleGrid,


  Spacer
} from "@chakra-ui/react"
import { FC, useEffect } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import Form from "../../components/form"
import InputController from "../../components/inputController"
import SelectController from "../../components/selectController"
import { Element as PageElement, ElementType } from "../../types"

interface FieldsProps {
  createPageFields: (fieldData: PageElement, indexElement: number) => void;
  element: PageElement;
  indexElement: number;
}

interface Element {
  type: ElementType;
  name: string;
  choices?: string;
  requiredIf?: string;
  visibleIf?: string;
  editableIf?: string;
}

const Fields: FC<FieldsProps> = ({
  createPageFields,
  element,
  indexElement,
}) => {
  const formProviderProps = useForm<Element>()
  useEffect(() => {
    formProviderProps.reset({
      ...element,
      choices: element?.choices?.join(","),
    });
  }, [element])

  const onSubmit: SubmitHandler<Element> = (data, event) => {
    event?.preventDefault()
    const { choices, ...otherData } = data
    createPageFields(
      { ...otherData, choices: choices?.split(",") ?? [] },
      indexElement
    )
  }

  return (
    <Form {...{ formProviderProps, onSubmit }}>
      <Box border="1px" borderColor="gray.200" borderRadius="6" p={3} mt={4}>
        <SimpleGrid columns={3} spacingX="40px" spacingY="20px" mt={4} p={3}>
          <Box>
            <SelectController
              name={"type"}
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
              name={"name"}
              label={"Name"}
              formRules={{
                required: { value: true, message: "Name is required" },
              }}
            />
          </Box>
          <Box>
            <InputController
              name={"choices"}
              label={"Choices"}
              helperText="(Enter options and seprate them by comma)"
            />
          </Box>
          <Box>
            <InputController name={"requiredIf"} label={"RequiredIf"} />
          </Box>
          <Box>
            <InputController name={"visibleIf"} label={"VisibleIf"} />
          </Box>
          <Box>
            <InputController name={"editableIf"} label={"EditableIf"} />
          </Box>
        </SimpleGrid>
        <Box>
          <Flex>
            <Spacer />
            <Box>
              <Button colorScheme="teal" type={"submit"}>
                Submit Element
              </Button>
            </Box>
          </Flex>
        </Box>
      </Box>
    </Form>
  )
}

export default Fields 
