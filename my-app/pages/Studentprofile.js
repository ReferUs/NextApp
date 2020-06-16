import { useRouter } from 'next/router'

function Studentprofile({ stars }) {
  const router = useRouter()
  return(
    <div>
      <h1>hii...{router.query.keyword}</h1>
      <ul>
      {stars.map((star) => (
        <li>
          <h3>Project: {star.name}</h3>
          <h4>Description: {star.description}</h4>
          <h4>Language: {star.language}</h4>
          <h4>-------------------------</h4>

        </li>
      ))}
    </ul>
    </div>
  )
}

Studentprofile.getInitialProps = async (ctx) => {
  const {query} = ctx
  const response = await fetch(`https://api.github.com/users/${query.keyword}/repos`);
  const data = await response.json();
  return { stars: data }
}

export default Studentprofile
