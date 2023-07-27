import { Grid, GridItem } from "@chakra-ui/react"
import { ReactNode,FC } from "react"
import { Sidebar } from '../components/sidebar'

interface LayoutProps{
  children:ReactNode
}

export const Layout:FC<LayoutProps> = ({children}) => {
  
   return (
    <Grid h={'100vh'} templateColumns={'1fr 4fr'}>
      <GridItem bg='green.300'>
        <Sidebar />
      </GridItem>
      <GridItem bg='blackAlpha.100'>
        {children}
      </GridItem>
    </Grid>
  )
}