import { Box, Button } from "@chakra-ui/react";
import {
  useMutation,
  useQuery,
  useQueryClient
} from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { useNavigate, useSearchParams } from "react-router-dom"
import Form from "../../components/form"
import InputController from "../../components/inputController"
import * as paths from "../../routeConfig/paths"
import { Element, ElementType, Page } from "../../types"
import Fields from "./Fields"

const CreatePage = () => {
  const [searchParams] = useSearchParams()
  const pageId = searchParams.get("pageId") ?? ""
  const { data } = useQuery(["pages", pageId], async () => {
    const response = await fetch(`/api/pages/${pageId}`)
    return response.json()
  })
  const navigate = useNavigate()
  const formProviderProps = useForm<Page>()
  const queryClient = useQueryClient()
  const [pageElements, setPageElements] = useState<Element[]>(() =>
    pageId
      ? []
      : [
        {
          type: ElementType.Text,
          name: "",
        },
      ]
  )

  const createPageFields = (element: Element, indexElement: number) => {
    const pageElementCopy = [...pageElements]
    pageElementCopy[indexElement] = element
    setPageElements([...pageElementCopy])
  }

  useEffect(() => {
    if (data && pageId) {
      const { name, elements } = data?.page as Page
      formProviderProps.setValue("name", name)
      setPageElements(elements)
    }
  }, [data])

  const renderFields = () => {
    return pageElements?.map((currentElement: Element, index: number) => (
      <Fields
        {...{ createPageFields }}
        indexElement={index}
        element={currentElement}
      />
    ))
  }
  const addNewElement = () => {
    setPageElements((prvElements) => [
      ...prvElements,
      {
        type: ElementType.Text,
        name: "",
      },
    ])
  }

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
        elements: pageElements,
      })
    } else {
      postMutate.mutate({
        name: data.name as string,
        elements: pageElements,
      })
    }
  }

  const showPages = ()=>{
    navigate(paths.PAGE)
  }

  return (
    <>
      {renderFields()}
      <Box mt={2}>
        <Button colorScheme="teal" onClick={addNewElement}>
          Add New Element
        </Button>
      </Box>
      <Box mt={4}>
        <Form {...{ formProviderProps, onSubmit }}>
          <InputController
            name={"name"}
            label={"Page Name"}
            formRules={{
              required: { value: true, message: "Page Name is required" },
            }}
          />
          <Button colorScheme="teal" type="submit">
            Submit Page
          </Button>
          <Button type="submit"  mx={4} onClick={()=>showPages()}>Close Form</Button>
        </Form>
      </Box>
    </>
  )
}

export default CreatePage 
