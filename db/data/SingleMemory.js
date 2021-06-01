import axios from 'axios'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom' 
import ReactMapGl, { Marker } from 'react-map-gl'



import Error from '../common/Error'
import { baseUrl, memoriesPath, headers } from '../../lib/api'




function SingleMemory() {


  const [ memory, setSingleMemory ] = useState(null)
  const { id } = useParams()
  const [ isError, setIsError ] = useState(false)
  const [ comments, setHasComments ] = useState(false)
  const isLoading = !memory && !isError

  //* for comments
  const [formData, setFormData] = useState({
    text: '',
  })



  //* For normal page content

  useEffect( () => {
    const getData = async () => {
      try {
        const result = await axios.get(`${baseUrl}${memoriesPath}/${id}`)
        setSingleMemory(result.data)
        setViewport({ ...viewport, latitude: (Number(result.data.location.coordinates[1])), longitude: (Number(result.data.location.coordinates[0])) })

      } catch (err) {
        setIsError(true)
      }
    }
    getData()
  },[id, comments])


  //* For map content-------------------
  const [ viewport, setViewport ] = useState({
    latitude: 51.51106,
    longitude: -0.13519,
    width: '500px',
    height: '500px',
    zoom: 14,
  })


  //* for comments

  // * Posting a comment
  const [formError, setFormError] = useState(formData)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })

  }


  const handleSubmit = async (e) => {
    e.preventDefault()
    if (formData.text) {
      try {
        const res = await axios.post(`${baseUrl}${memoriesPath}/${id}/comment`, formData,  headers()
        )
        console.log(res.data.comments)
        setHasComments(!comments)
        formData.text = ''
        setFormError('')
  
      } catch (err) {
        console.log(err)
        setFormError(err.message)
        // console.log(err.response.data.errMessage)
        // setFormError(res.data.errors)   
      }

    } else {
      return
    }
  }


  //* Delete a comment 
  const handleDelete = async (e) => {
    e.preventDefault()


    try {
      const res = await axios.delete(`${baseUrl}${memoriesPath}/${id}/comment/${e.target.name}`,  headers()
      )
      console.log(res)
      setHasComments(!comments)
      formData.text = ''
      setFormError('')
  
    } catch (err) {
      console.log(err)
      setFormError(err.message)
      // console.log(err.response.data.errMessage)
      // setFormError(res.data.errors)   
    }

  }





  return (
    <section>
      { isError && <Error />}
      { isLoading && <p> ... loading</p>}
      { memory && (
        <>

          {/* // version 2 - basic styling added */}
          <div className="card">    
            <div className="columns">
              <div className="column">
                <p className="column">{memory.title}</p>
                <h2 className="column">{memory.location.userInput}</h2>
                <div className="column is-60">{memory.description}</div>
                <div className="columns is-mobile">

                  <div className="column">
                    <p className="bd-notification is-info"> <img height ="540px" width="810px"  src={memory.image} alt={memory.title} /></p>
                  </div>

                  <div className="column">
                    <p className="bd-notification is-info">
                      <ReactMapGl {...viewport} 
                        mapboxApiAccessToken={'pk.eyJ1Ijoia2F0aGFja2V0aGFsIiwiYSI6ImNrcDJyeG15aDA4bm0ybm1rbnA4OGg0cDUifQ.13jXKE1MWMt27fdEfA1K9g'}
                        mapStyle="mapbox://styles/kathackethal/ckp5dwj7a02wb18rxnm537n5i"
                        onViewportChange={viewport => {
                          setViewport(viewport)
                        }}
                      >

                        <Marker latitude={Number(memory.location.coordinates[1])} longitude={Number(memory.location.coordinates[0])}>
                          <div>
                            <img height="40px" width="40px" src="https://i.imgur.com/6IzPeVa.png" />
                          </div>
                        </Marker>
                      

                      </ReactMapGl>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>  
          <div className="container">
            <div className="columns">
              <form
                className="column is-half is-offset-one-quarter box"
                onSubmit={handleSubmit}
              >
                <div className="field" htmlFor="text">
                  <label className="label">Comments</label>
                  <div className="control">
                    <input

                      className={`input ${formError.text ? 'is-danger' : ''}`}
                      placeholder="Type your comments here.."
                      name="text"
                      onChange={handleChange}
                      value={formData.text}
                    />
                  </div>
                  {formError && <p className="help is-danger">{formError.text}</p>}
                </div>

                <div className="field">
                  <button type="submit" className="button is-info is-fullwidth">
                Submit comment
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div>
            <> {memory.comments && memory.comments.map( comment =>
              <>
                <p>{comment.text}</p>
                {/* <p>{comment.user}</p> */}

                <button name={comment._id} onClick={handleDelete} className=" button is-info is-small is outline">Delete comment</button>
              </>
            )}

            </>
          </div>

        </>
      )}


    </section>
  )
}

export default SingleMemory