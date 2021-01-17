import React from 'react'
import ArticlePreview from './ArticlePreview'
import Prismic from 'prismic-javascript'
import { Date, RichText } from 'prismic-reactjs'
import {prismicClient} from '../connections/prismic'

function Travel(){
    const [trips, setTrips] = React.useState([])
    
    React.useEffect(() => {
    const fetchData = async () => {
        const response = await prismicClient.query(
        Prismic.Predicates.at('document.type', 'trip'),
            { orderings: '[my.trip.startdate]' }
        )
        if (response) {
            setTrips(response.results)
        }
    }
    fetchData()
    }, [])

    return(
        <div className="section">
            {trips.map(trip => {
                return (
                    <div key={trip.id} className="section">
                        <p className="title is-3 has-text-centered">{RichText.asText(trip.data.title)}</p>
                        <p className="subtitle is-6 has-text-centered">{
                                    Date(trip.data.startdate).toDateString()} to {Date(trip.data.enddate).toDateString()}
                        </p>
                        <div className="columns is-centered">
                            <div className="column is-three-quarters">
                                <p className="subtitle is-6 has-text-centered">{trip.data.description}</p>
                            </div>
                        </div>
                        <ArticlePreview  trip={trip} />
                    </div>
                )
            })}
        </div>
    )
}

export default Travel