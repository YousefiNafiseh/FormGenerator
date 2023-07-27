import { Box, Text,BoxProps } from "@chakra-ui/react"
import { AddIcon } from "@chakra-ui/icons"
import {FC, ReactElement, JSXElementConstructor} from "react"

interface FormButtonProps extends BoxProps{
  text:string,
  icon:ReactElement<any, string | JSXElementConstructor<any>>,
}

export const FormButton:FC<FormButtonProps> = ({text,icon,...otherProps})=>{
  return(
    <Box
      w={"180px"}
      p={4}
      border="2px"
      borderStyle={"dashed"}
      borderRadius="lg"
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      cursor={"pointer"}
      {...otherProps}
    >
      {icon}
      <Text color={otherProps.color}>{text}</Text>
    </Box>
  )
}