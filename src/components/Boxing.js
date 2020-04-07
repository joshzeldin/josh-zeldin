import React from 'react'
import Prismic from 'prismic-javascript'
import {RichText} from 'prismic-reactjs'
import {prismicClient} from '../connections/prismic'
import axios from 'axios'

function Boxing(){
    const [boxing_gyms, setBoxingGyms] = React.useState([])
    const [instagrams, setInstagrams] = React.useState([])
    
    React.useEffect(() => {
    const fetchPrismic = async () => {
        const response = await prismicClient.query(
        Prismic.Predicates.at('document.type', 'boxing_gym')
        )
        if (response) {
            setBoxingGyms(response.results)
        }
    }
    fetchPrismic()
    }, [])

    React.useEffect(() => {
        const fetchInstagram = async () => {
            let instagram_requests = boxing_gyms.map(gym => {
                return axios.get("https://api.instagram.com/oembed?url=" + gym.data.instagram_url)
            })
            const response = await Promise.all(instagram_requests)
            if (response) {
                setInstagrams(response.map(insta => insta.data.html))
                const instagramScript = document.createElement("script");
                    instagramScript.src = "//www.instagram.com/embed.js";
                    instagramScript.async = false;
                    document.body.appendChild(instagramScript)
            }
            if(window.instgrm){
                window.instgrm.Embeds.process()
            }

        }
        fetchInstagram()
        }, [boxing_gyms])

    return(
        <div className="section columns is-centered">
            {boxing_gyms.map((gym, index) => {
                return (
                    <div className="column is-half" key={gym.id}>
                        <p className="title is-3 has-text-centered">
                            {RichText.asText(gym.data.name)}
                        </p>
                        <p className="subtitle is-6 has-text-centered">
                            {"@" + gym.data.instagram_username}
                        </p>
                        <div dangerouslySetInnerHTML={{ __html: instagrams[index]}} />
                    </div>
                )
            })}
        </div>
    )
}

export default Boxing