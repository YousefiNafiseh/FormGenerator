import { lazy, Suspense } from "react"
import { Loading } from "../../components/loading"
const CreatePage = lazy(() => import("./CreatePage"))

function LazyCreatePage() {

  return (
    <Suspense fallback={<Loading />}>
      <CreatePage />
    </Suspense>
  )
}

export default LazyCreatePage