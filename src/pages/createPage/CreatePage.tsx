import { Box, Button, useDisclosure } from "@chakra-ui/react" 
import {
  useMutation,
  useQuery,
  useQueryClient
} from "@tanstack/react-query" 
import { useEffect } from "react" 
import { SubmitHandler, useForm } from "react-hook-form"  
import { useNavigate, useSearchParams } from "react-router-dom" 
import Form from "../../components/form" 
import InputController from "../../components/inputController" 
import * as paths from "../../routeConfig/paths" 
import { ElementType, Page } from "../../types" 
import Fields from "./Fields" 
import { FormModal } from "../../components/formModal"

const CreatePage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [searchParams] = useSearchParams()
  const pageId = searchParams.get("pageId") ?? ""
  const { data } = useQuery(["pages", pageId], async () => {
    const response = await fetch(`/api/pages/${pageId}`)
    return response.json()
  })
  const navigate = useNavigate()
  const formProviderProps = useForm<Page>(
    {
      defaultValues: {
        id: "0" ,
        name: "" ,
        elements: [{
          type: ElementType.Text,
          name: "" 
        }]
      }
    }
  )
  const queryClient = useQueryClient()

  useEffect(() => {
    if (data && pageId) {
      const { name, elements } = data?.page as Page
      formProviderProps.setValue("name", name)
      formProviderProps.reset(data.page)
    }
  }, [data])

  const postMutate = useMutation(
    (data: Page) =>
      fetch("/api/pages", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["pages"],
        })
        showPages()
      },
    }
  )

  const putMutation = useMutation(
    (data: Page) =>
      fetch(`/api/pages/${pageId}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["pages"],
        })
        showPages()
      },
    }
  )

  const onSubmit: SubmitHandler<Page> = (data) => {
    if (pageId) {
      putMutation.mutate({
        name: data.name as string,
        elements: data.elements
      })
    } else {
      postMutate.mutate({
        name: data.name as string,
        elements: data.elements
      })
    }
  }

  const showPages = () => {
    navigate(paths.PAGE)
  }

  const deleteMutation = useMutation(
    () =>
      fetch(`/api/pages/${pageId}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["pages"],
        })
        showPages()
      },
    }
  )

  const deletePage = () => {
    deleteMutation.mutate()
  }

  const closePage = () => {

  }

  return (
    <>
      <Box py={8} px={4} color={"gray.600"}>
        <Form {...{ formProviderProps, onSubmit }}>
          <Box>
            <InputController
              focusBorderColor={"green.300"}
              name={"name"}
              label={"Page Name"}
              formRules={{
                required: { value: true, message: "Page Name is required" },
              }}
            />
            <Fields {...{ formProviderProps }} />
          </Box>
          <Box mt={10} display={"flex"} justifyContent={"space-between"}>
            <Box>
              <Button
                mr={4}
                colorScheme="green" 
                variant="solid" 
                size= "lg" 
                type="submit">
                Submit Page
          </Button>
              {pageId &&
                <>
                  <Button
                    colorScheme="red"
                    variant="solid"
                    size= "lg"
                    onClick={()=>onOpen()}>
                    Delete Page
                  </Button>
                  <FormModal
                    {...{
                      isOpen,
                      onOpen,
                      onClose
                    }}
                    onAccept={() => deletePage()}
                    header={"Delete Field"}
                    body={"Are You Sure?"}
                  />
                </>
              }
            </Box>
            <Button
              ml={4}
              colorScheme= "green"
              size= "lg"
              variant="outline"
              onClick={() => showPages()}>
              Close
            </Button>
          </Box>
        </Form>
      </Box>
    </>
  )
}

export default CreatePage 
