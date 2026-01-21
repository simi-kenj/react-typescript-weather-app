//
import { useState } from "react"

//
import Form from "./components/Form"
import Loading from "./components/Loading"
import Results from "./components/Results"
import Title from "./components/Title"

//
type ResultsState = {
  country: string
  cityName: string
  temperature: string
  conditionText: string
  icon: string
}

//
const App = () => {
  //
  const [loading, setLoading] = useState<boolean>(false)

  //
  const [city, setCity] = useState<string>("")

  //
  const [results, setResults] = useState<ResultsState>({
    country: "",
    cityName: "",
    temperature: "",
    conditionText: "",
    icon: ""
  })

  //
  const getWeather = (e: React.FormEvent<HTMLFormElement>) => {
    //<form> を送信する時にデフォルトでリロードが起きる動作への対応
    e.preventDefault()

    //
    setLoading(true)

    //
    fetch(`https://api.weatherapi.com/v1/current.json?key=51562c11f3a14c8fbf730341262101&q=${city}&aqi=no`)
      .then(res => res.json())
      // .then(data => console.log(data))
      .then(data => {
        setResults({
          country: data.location.country,
          cityName: data.location.name,
          temperature: data.current.temp_c,
          conditionText: data.current.condition.text,
          icon: data.current.condition.icon
        })
        setLoading(false)
      })
  }

  //
  return (
    <div className="wrapper">
      <div className="container">
        <Title />
        <Form setCity={setCity} getWeather={getWeather} />
        {loading ? <Loading/> : <Results results={results}/>}
      </div>
    </div >
  )
}

//
export default App
