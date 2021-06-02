function Home(props) {
    return (
    <>
    <div className="d-flex p-5 justify-content-center">
        <h1>Home Page</h1>

    </div>
    <div className="d-flex p-2 justify-content-center">
        <a href="/game">
          <button className="home-btn">
            PLAY
          </button>
        </a>
    </div>
    </>)
}

export default Home;