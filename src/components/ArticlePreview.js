import React from 'react'
import ArticleCard from './ArticleCard'
import Prismic from 'prismic-javascript'
import {prismicClient} from '../connections/prismic'


function ArticlePreview(props){  
        const [articles, setArticles] = React.useState([])
    
        React.useEffect(() => {
        const fetchData = async () => {
            const response = await prismicClient.query([
            Prismic.Predicates.at('document.type', 'articles'),
            Prismic.Predicates.at('my.articles.trip', props.trip.id)],
            { orderings: '[my.articles.date]' }
            )
            if (response) {
                setArticles(response.results)
            }
        }
        fetchData()
        }, [props])
        return(

                <div className="columns is-centered">
                        {articles.map(article => {
                            return <ArticleCard key={article.id} article={article} />
                        })}       
                </div>
        )
    }

export default ArticlePreview