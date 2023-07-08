import {
  Box,
  Button,
  Divider,
  AbsoluteCenter,
  Wrap,
  WrapItem,
  Center,
} from "@chakra-ui/react"
import { createSearchParams, useNavigate } from "react-router-dom"
import * as paths from "../../routeConfig/paths"
import { Page } from "../../types"
import { useQuery } from "@tanstack/react-query"

function FormList() {
  const navigate = useNavigate()
  const handleOnclick = () => {
    navigate(paths.PAGE_CREATE)
  }

  const { data } = useQuery(["pages"], async () => {
    const response = await fetch("/api/pages")
    return response.json()
  })

  return (
    <>
      <Box>
        <Box m="5" ml="2">
          <Button
            colorScheme="blue"
            variant="outline"
            size="lg"
            onClick={handleOnclick}
          >
            Create New Page
          </Button>
        </Box>
        <Box position="relative" padding="10">
          <Divider />
          <AbsoluteCenter bg="white" px="4" fontSize="4xl">
            Page List
          </AbsoluteCenter>
        </Box>
      </Box>
      <Wrap>
        {data?.pages?.map((page: Page) => (
          <WrapItem>
            <Center
              w="180px"
              h="80px"
              bg="blue.600"
              color="white"
              borderRadius={6}
              cursor="pointer"
              onClick={() => {
                navigate({
                  pathname: paths.PAGE_RENDER,
                  search: createSearchParams({
                    pageId: page?.id ?? "1",
                  }).toString(),
                })
              }}
            >
              {page.name}
            </Center>
          </WrapItem>
        ))}
      </Wrap>
    </>
  )
}

export default FormList 
