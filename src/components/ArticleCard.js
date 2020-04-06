import React from 'react'
import { RichText } from 'prismic-reactjs'


class ArticleCard extends React.Component {
    constructor(){
        super()
        this.handleClick = this.handleClick.bind(this);
        this.state = {isActive: false}
    }

    handleClick(){
        this.setState({isActive: !this.state.isActive})
    }

    render() {
        if (this.state.isActive) {
            return (
                <div className="modal is-active">
                    <div className="modal-background" onClick={this.handleClick}></div>
                    <div className="modal-card">
                        <header className="modal-card-head">
                            <p className="modal-card-title">
                                {RichText.asText(this.props.article.data.title)}
                            </p>
                            <button className="delete" aria-label="close" onClick={this.handleClick}></button>
                        </header>
                        <div className="modal-card-body">
                            <img src={this.props.article.data.title_image.url} alt={this.props.article.data.title_image.alt}/>
                            {RichText.render(this.props.article.data.body)}
                        </div>
                        <footer class="modal-card-foot">
                            <button class="button" onClick={this.handleClick}>Close</button>
                        </footer>
                    </div>
                </div>
            )
        }
        else {
            return (
                <div className="column is-one-quarter">
                    <div className="card" onClick={this.handleClick}>
                        <div className="card-image">
                            <figure className="image is-4by3">
                            <img src={this.props.article.data.title_image.url} alt={this.props.article.data.title_image.alt}/>
                            </figure>
                        </div>
                        <div className="card-content">
                            <div className="media">
                            <div className="media-content">
                                <p className="title is-5 has-text-centered">
                                    {RichText.asText(this.props.article.data.title)}
                                </p>
                            </div>
                            </div>
                            <div className="content has-text-centered">
                                {this.props.article.data.preview}
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default ArticleCard