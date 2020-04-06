import React from 'react'
import {Link} from 'react-router-dom'

class Navbar extends React.Component {
    state = { active : false }

    handleClick = () => { 
        const { active } = this.state;
        this.setState({ active: !active }); 
        console.log(this.state)
    }

    render () {
        return (
            <nav className="navbar is-info">
                <div className="container">
                    <div className="navbar-brand">
                        <Link to="/" className="navbar-item">Josh Zeldin</Link>
                        <span className={"navbar-burger burger " + (this.state.active ? 'is-active' : '')}
                            data-target="nav-menu"
                            onClick={this.handleClick}>
                            <span></span>
                            <span></span>
                            <span></span>
                        </span>
                    </div>
                    <div id="nav-menu" className={"navbar-menu " + (this.state.active ? 'is-active' : '')}>
                        <div className="navbar-start">
                            <Link to="/travel" className="navbar-item">Travel</Link>
                            <Link to="/work" className="navbar-item">Work</Link>
                            <Link to="/technology" className="navbar-item">Technology</Link>
                            <Link to="/finance" className="navbar-item">Finance</Link>
                            <Link to="/surfing" className="navbar-item">Surfing</Link>
                            <Link to="/boxing" className="navbar-item">Boxing</Link>
                            <Link to="/donate" className="navbar-item">Donate</Link>
                        </div>
                    </div>
                </div>
            </nav>
        )
    }
}

export default Navbar