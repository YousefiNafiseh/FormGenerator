import { lazy, Suspense } from "react"
import {Loading} from "../../components/loading"

const PageList = lazy(() => import("./PageList"))

function LazyPageList() {
  return (
    <Suspense fallback={<Loading />}>
      <PageList />
    </Suspense>
  )
}

export default LazyPageList 