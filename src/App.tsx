import { Box } from "@chakra-ui/react"
import React, { FC } from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import { Layout } from "./layout"
import * as paths from "./routeConfig/paths"
import routes from "./routeConfig/router"

const renderComponent = (Component: FC<any>) => (props: any) => {
  return <Component {...props} />
}

function App() {
  return (
    <Box>
      <Routes>
        {routes.map((item) => {
          const Component = renderComponent(item?.component ?? Box)
          return (<Route
            key={item.title}
            path={item.path}
            element={<Layout><Component /></Layout>}
          />)
        })}
        <Route path="*" element={<Navigate to={paths.PAGE} replace={true} />} />
      </Routes>
    </Box>
  )
}

export default App 
