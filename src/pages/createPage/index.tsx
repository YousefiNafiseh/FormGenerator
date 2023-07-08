import { lazy, Suspense } from "react"

const CreatePage = lazy(() => import("./CreatePage"))

function LazyCreatePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CreatePage />
    </Suspense>
  )
}

export default LazyCreatePage