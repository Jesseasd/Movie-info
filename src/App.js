import './App.css'
import { useEffect, useState } from "react"
import uuid from "react-uuid"

function App() {

  const [endPoint, setEndPoint] = useState("")
  const [container, setContainer] = useState([])
  const [finalPoint, setFinalPoint] = useState("")

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '',
        'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com'
      }
    };

    fetch(`https://online-movie-database.p.rapidapi.com/auto-complete?q=${endPoint}`, options)
      .then(response => response.json())
      .then(
        (data) => {
          setContainer(data.d)
        }, (error) => {
          alert.error(error)
        }
      )

    const container = document.querySelector(".container")
    const element = document.querySelector(".card-container")

    container.addEventListener('wheel', (e) => {
      e.preventDefault()
      element.scrollLeft += e.deltaY < 0 ? -30 : 30
    })
  }, [finalPoint])

  const onChangeHandler = (e) => (
    setEndPoint(e.target.value)
  )

  const submitHandler = (e) => {
    e.preventDefault()
    setFinalPoint(endPoint)
  }

  return (
    <div className="container">
      
      <div className="wrapper">
        <h1>Search movie information</h1>
      </div>
        
        
        <form onSubmit={submitHandler}>
          <input type="text" value={endPoint} onChange={onChangeHandler} placeholder="Search for a movie..." />
          <div className="btn">
            <button type="submit">Search</button>
          </div>
        </form>
      

      <div className="card-container">
        {container.map((item) => {
          return (
            <div key={uuid()} className="card">
              <div className="image">
                <img src={item.i.imageUrl} />
              </div>
              <h3>{item.l}</h3>
              <p>{item.s}</p>
            </div>
          )
        })}
      </div>

    </div>
  )
}

export default App
