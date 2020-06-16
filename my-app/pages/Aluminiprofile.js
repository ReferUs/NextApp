import {useRouter} from 'next/router'

export default function Home() {
  const router = useRouter()
  return (
    <div>
        <h1>hi...{router.query.keyword}</h1>
    </div>)
  }
