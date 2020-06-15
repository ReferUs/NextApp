import Head from 'next/head'
import GoogleLogin from 'react-google-login';
import GitHubLogin from 'react-github-login';
import axios from 'axios';
import Router from 'next/router'


export default function Home() {

  const responseGoogleSuccess = (response)=>{
    console.log(response);
    console.log(response.profileObj);
    Router.push('/Aluminiprofile')
  }

  const responseGoogleFailure = (response)=>{
    console.log(response);
  }


  const getdata = (token) => {
    return axios.get(`https://api.github.com/user?access_token=${token}` ,{
      method: "POST",
      mode:"cors",
      headers: {
        Accept:"application/json",
        "content-type":"application/json"
  }
  })
  .then(response => {
      console.log(response.data)
      Router.push('/Studentprofile')
  })
  .catch(err => console.log(err))
}

  const gettoken = (code) => {
      return axios.get(`https://cors-anywhere.herokuapp.com/https://github.com/login/oauth/access_token?client_id=8244b51a8abe376aeb12&redirect_uri=http://localhost:3000/Studentprofile&client_secret=1218dd62d57ab5ecc966d759703063c9d21cebf0&code=${code}`, {
          method: "POST",
          mode:"cors",
          headers: {
            Accept:"application/json",
            "content-type":"application/json"

      }
      })
      .then(response => {
          console.log(response.data.access_token)
          const token = response.data.access_token
          getdata(token)
      })
      .catch(err => console.log(err))
  }

  const responseGithub = (response)=>{
    console.log(response);
    const code = response.code
    gettoken(code)
  }

  return (
    <div className="container">
      <Head>
        <title>ReferUs</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">
          ReferUs
        </h1>

        <p className="description">
          An MSc internship offer portal!
        </p>

        <div className="grid">
            <div className="card">
              <h3>Alumini</h3>
              <img src = "/google.jpg" alt="Google" className="mainlogo"/>
              <p>Sign in via</p>
              <GoogleLogin
                clientId="997301600069-9vmhq1sc8fbe3cstop7j2fk66dg43eug.apps.googleusercontent.com"
                buttonText="Login"
                onSuccess={responseGoogleSuccess}
                onFailure={responseGoogleFailure}
                cookiePolicy={'single_host_origin'}
              />
            </div>

            <div className="card">
              <h3>Student</h3>
              <img src = "/github.png" alt="Github" className="mainlogo"/>
              <p>Sign in via</p>
              <GitHubLogin clientId="8244b51a8abe376aeb12"
              redirectUri='http://localhost:3000/Studentprofile'
              onSuccess={responseGithub}
              onFailure={responseGithub}/>
            </div>
        </div>
      </main>

      <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h3>Copyright @ReferUs</h3>
        </a>
      </footer>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer img {
          margin-left: 0.5rem;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .title a {
          color: #0070f3;
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
        }

        .title,
        .description {
          text-align: center;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }

        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }

        .grid {
          display: flex;
          align-items: center;
          justify-content: center;


          max-width: 1000px;
          margin-top: 3rem;
        }

        .card {
          margin: 2rem;
          flex-basis: 45%;
          padding: 3rem;
          text-align: center;
          color: inherit;
          text-decoration: none;
          border: 3px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
        }

        .card:hover,
        .card:focus,
        .card:active {
          color: #0070f3;
          border-color: #0070f3;
        }

        .card h3 {
          margin: 0 0 1rem 0;
          font-size: 1.5rem;
        }

        .card p {
          margin: 0;
          font-size: 1.0rem;
          line-height: 1.5;
        }

        .logo {
          height: 1em;
        }

        .mainlogo {
          justify-content: center;
          height: 5em;
          width: 5em;
        }


        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}
