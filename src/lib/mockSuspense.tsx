import React, { Suspense, ReactNode } from 'react'

function MockSuspense({children}: {children: ReactNode}) {
  return (
    <div>
        <Suspense fallback={(<div>Real...</div>)}>
        {children}
        </Suspense>
    </div>
  )
}

export default MockSuspense