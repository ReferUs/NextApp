import { useRouter } from 'next/router'

export default function Studentprofile({ stars }) {
  const router = useRouter()
  return(
    <div>
      <div className="container">
      <h1>{router.query.keyword}</h1>
      <img className = "image" src = {`${stars[0].owner.avatar_url}`} alt = {router.query.keyword} />
      </div>
      <div className = "container">
      <ul>
      {stars.map((star,i) => (
        <div className = "card">
        <p key = {i}>
          <h3>Project: {star.name}</h3>
          <h4>Description: {star.description}</h4>
          <h4>Language: {star.language}</h4>
        </p>
        </div>
      ))}
    </ul>
    </div>

    <style jsx>{`

    .container {
      display: grid;
      grid-template-columns: auto auto auto auto;
      grid-gap: 10px;
      background-color: #ffffff;
      padding: 10px;
          }
    .card {
      margin: 1rem;
      flex-basis: 45%;
      padding: 1rem;
      text-align: left;
      color: inherit;
      text-decoration: none;
      border: 5px solid #eaeaea;
      border-radius: 50px;
      transition: color 0.15s ease, border-color 0.15s ease;
    }
    .image {
      justify-content: center;
      height: 10em;
      width: 10em;
    }

    `}</style>
    </div>
  )
}

Studentprofile.getInitialProps = async (ctx) => {
  const {query} = ctx
  const response = await fetch(`https://api.github.com/users/${query.keyword}/repos`);
  const data = await response.json();
  return { stars: data }
}
