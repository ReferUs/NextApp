import {useRouter} from 'next/router'

export default function Aluminiprofile({stars}) {
  const router = useRouter()
  return (
    <div>
        <h1>{stars.name}</h1>
        <ul>
          <h3>email : {stars.email}</h3>
          <img src = {`${stars.picture}`} alt = {`${stars.name}`} />
        </ul>
    </div>)
  }

Aluminiprofile.getInitialProps = async (ctx) => {
  const {query} = ctx
  const response = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${query.keyword}`)
  const data = await response.json()
  return {stars: data}

}
