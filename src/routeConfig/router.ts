import CreatePage from "../pages/createPage"
import PageList from "../pages/pageList"
import PageRenderer from "../pages/pageRenderer"
import * as paths from "./paths"

const routes = [
  {
    title: "Page List",
    path: paths.PAGE,
    component: PageList,
  },
  {
    title: "Create Page",
    path: paths.PAGE_CREATE,
    component: CreatePage,
  },
  {
    title: "Render Page",
    path: paths.PAGE_RENDER,
    component: PageRenderer,
  },
] 
export default routes 
