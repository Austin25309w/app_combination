import React from 'react';

const list = [
    {
        title: 'React',
        url: 'https://facebook.github.io/react/',
        author: 'Jordan Walke',
        num_comments: 3,
        points: 4,
        objectID: 0,
    }
]

const DEFAULT_QUERY = "redux";

const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';

const url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${DEFAULT_QUERY}`;
// ES5
// function isSearched(searchTerm) {
//     return function(item){
//         return !searchTerm ||
//             item.title.toLowerCase().includes(searchTerm.toLowerCase());
//     }
// }
//ES6
const isSearched = (searchTerm) => item =>
    !searchTerm || item.title.toLowerCase().includes(searchTerm.toLowerCase());


class Exercise extends React.Component {
    constructor(props) {
        super();
        this.state = {
            list,
            searchTerm: DEFAULT_QUERY,

        };
        this.setSearchTopstories = this.setSearchTopstories.bind(this);
        this.fetchSearchTopstories = this.fetchSearchTopstories.bind(this);
        this.onSearchChange = this.onSearchChange.bind(this);
        this.onDismiss = this.onDismiss.bind(this);
    }

    setSearchTopstories(result){
        this.setState({result});
    }

    fetchSearchTopstories(searchTerm){
        fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`)
            .then(response => response.json())
            .then(result => this.setSearchTopstories(result));
    }

    componentDidMount(){
        const {searchTerm} = this.state;
        this.fetchSearchTopstories(searchTerm);
    }

    onSearchChange(event){
        this.setState({searchTerm: event.target.value })
    }

    onDismiss(id){
        const isNotId = item => item.objectId !== id;
        const updatedList = this.state.list.filter(isNotId);
        this.setState({list: updatedList});
    }

    getName(){
        return this.firstname + ' ' + this.lastname;
    }

    render(){
        const {searchTerm, result } = this.state;

        if(!result){return null;}
        return (
            <div className="App">
                <div className="page">
                    <div className ="interactions">
                        <Search 
                            value={searchTerm}
                            onChange={this.onSearchChange}
                            >Search
                        </Search>
                    </div>
                
                    <Table 
                        list = {list.hits}
                        pattern = {searchTerm}
                        onDismiss = {this.onDismiss}
                        />        
                </div>
            </div>
        )
    }
}

// class Search extends Component {
//     render(){
//         const { value, onChange, children } = this.props;
//         return (
//             <form>
//                 {children} <input 
//                     type = "text"
//                     value = {value}
//                     onChange={onChange}
//                 />
//             </form>
//         );
//     }
// }
//ES6
 const Search = ({value, onChange, children}) =>
        <form>
            {children} <input
                type = "text"
                value = {value}
                onChange={onChange}
            />
        </form>

const largeColumn = {
    width: '40%',
}

const midColumnm = {
    width: '30%',
}

const smallColumn = {
    width: '10%'
}

const Table = ({list, pattern, onDismiss }) =>
            <div className = "table">
                {list.filter(isSearched(pattern)).map(item =>
                    <div key={item.objectID} className="table-row">
                        <span style= { largeColumn }>
                            <a href = {item.url}>{item.title}</a>
                        </span>
                        <span style = { midColumnm }>{item.author}</span>|
                        <span style = { smallColumn }>{item.num_comments}</span>|
                        <span style = { smallColumn }>{item.points}</span>

                        <span style = { smallColumn }>
                            <Button 
                                onClick={() => onDismiss(item.objectID)}
                                className = "button-inline"
                            >
                                Dismiss
                            </Button>
                        </span>
                    </div>
                )}
            </div>


class Button extends React.Component {
    render() {
        const {
            onClick,
            className = '',
            children,
        } = this.props
    

        return (
            <button
                onClick= {onClick}
                className={className}
                type="button"
            >
                {children}
            </button>
        )
    }
}

export default Exercise