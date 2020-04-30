import React from 'react';
import Music from './Music/Music';
import News from './News/News';
import Snake from './Snake/Snake';
import Ecommerce from './Ecommerce/Ecommerce'
import Home from './Home'
import './custom.css'
import {
    BrowserRouter as Router, 
    Switch,
    Route,
    Link
} from "react-router-dom";

class Nav extends React.Component {
    render() {
        return (
            <Router>
                <div>
                    <nav>
                        <ul>
                            <li className="line">
                                <Link className="link" to="/">Home </Link>
                                <span className="link">|</span>
                            </li>
                            <li className="line">
                                <Link className="link" to="/hacker_news">Hacker_News </Link>
                                <span className="link">|</span>
                            </li>
                            <li className="line">
                                <Link className="link" to="/music_streaming">Music_Streaming </Link>
                                <span className="link">|</span>
                            </li>
                            <li className="line"> 
                                <Link className="link" to="/snake">Snake </Link>
                                <span className= "link">|</span>
                            </li>
                            <li className="line">
                                <Link className="link" to="/ecommerce">Ecommerce_app </Link>
                            </li>
                        </ul>
                    </nav>

                    <Switch>
                        <Route path="/snake">
                            <Snake />
                        </Route >
                        <Route path='/ecommerce'>
                            <Ecommerce />
                        </Route>
                        <Route path="/hacker_news">
                            <News />
                        </Route>
                        <Route path='/music_streaming'>
                            <Music />
                        </Route>
                        <Route path="/">
                            <Home />
                        </Route>
                    </Switch>
                </div>
            </Router>
        )
    }
}

export default Nav