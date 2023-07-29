import { AddIcon } from "@chakra-ui/icons"
import {
  Box,
} from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"
import * as paths from "../../routeConfig/paths"

function FormList() {
  const navigate = useNavigate()
  const createNewForm = () => {
    navigate(paths.PAGE_CREATE)
  }

  return (
    <>
      <Box display={"flex"} justifyContent={"center"} alignItems={"center"} h={"100vh"}>
        <Box
          w={"200px"}
          p={4}
          border="2px"
          borderColor="green.400"
          borderStyle={"dashed"}
          borderRadius="lg"
          color={"green.400"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          cursor={"pointer"}
          onClick={createNewForm}
        >
          <AddIcon boxSize={4} color={"green.400"} mr={2} />
          <span color={"white"}>Create New Form</span>
        </Box>
      </Box>
    </>
  )
}

export default FormList 