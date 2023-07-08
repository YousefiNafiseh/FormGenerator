import { lazy, Suspense } from "react"

const PageList = lazy(() => import("./PageList"))

function LazyPageList() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PageList />
    </Suspense>
  )
}

export default LazyPageList 