import { lazy, Suspense } from "react"
import {Loading} from "../../components/loading"

const PageRenderer = lazy(() => import("./PageRenderer"))

function LazyPageRenderer() {
  return (
    <Suspense fallback={<Loading />}>
      <PageRenderer />
    </Suspense>
  )
}

export default LazyPageRenderer 