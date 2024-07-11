import { useRouter } from 'next/router'
import { useEffect } from 'react'

const MyComponent = () => {
  const router = useRouter()

  useEffect(() => {
    router.push('https://openhouse.mwit.ac.th/')
  }, [])

//   return <div>Redirecting...</div>
}

export default MyComponent
