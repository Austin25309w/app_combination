import React, { Component, PropTypes } from 'react';
import '../../App.css';


const DEFAULT_QUERY = "redux";
const DEFAULT_PAGE = 0;
const DEFAULT_HPP = '100';

const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const PARAM_PAGE = 'page=';
const PARAM_HPP = 'hitsPerPage=';


// const url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${DEFAULT_QUERY}&${PARAM_PAGE}`;
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
        super(props);

        this.state = {
            results: null,
            searchKey: '',
            searchTerm: DEFAULT_QUERY,
        };
        
        this.needsToSearchTopstoreis = this.needsToSearchTopstoreis.bind(this);
        this.setSearchTopstories = this.setSearchTopstories.bind(this);
        this.fetchSearchTopstories = this.fetchSearchTopstories.bind(this);
        this.onSearchChange = this.onSearchChange.bind(this);
        this.onSearchSubmit = this.onSearchSubmit.bind(this);
        this.onDismiss = this.onDismiss.bind(this);
    }

    needsToSearchTopstoreis(searchTerm){
        return !this.state.results[searchTerm];
    }

    setSearchTopstories(result){
        const { hits, page } = result;
        const { searchKey, results } = this.state;

        const oldHits = results && results[searchKey]
            ? results[searchKey].hits
            : [];

        const updatedHits = [
            ...oldHits,
            ...hits
        ];

        this.setState({
            ...results,
            [searchKey]: { hits: updatedHits, page }
        })
    }

    fetchSearchTopstories(searchTerm, page){
        fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`)
            .then(response => response.json())
            .then(result => this.setSearchTopstories(result));
    }

    componentDidMount(){
        const {searchTerm} = this.state;
        this.setState({ searchKey: searchTerm });
        this.fetchSearchTopstories(searchTerm, DEFAULT_PAGE);
    }

    onSearchChange(event){
        this.setState({searchTerm: event.target.value })
    }

    onSearchSubmit(event){
        const { searchTerm } = this.state;
        this.setState({ searchKey: searchTerm });
        if(this.needsToSearchTopstoreis(searchTerm)){
            this.fetchSearchTopstories(searchTerm, DEFAULT_PAGE);
        }
        event.preventDefault();
    }

    onDismiss(id){
        const { searchKey, results } = this.state;
        const { hits, page } = results[searchKey];

        const isNotId = item => item.objectId !== id;
        const updatedHits = hits.filter(isNotId);

        this.setState({
            result: { 
            ...results, 
            [searchKey]: { hits: updatedHits, page} 
            }
        });
    }

    getName(){
        return this.firstname + ' ' + this.lastname;
    }

    render(){
        const { searchTerm, 
                results, 
                searchKey } = this.state;
        const page = ( 
                results && 
                results[searchKey] && 
                results[searchKey].page
            ) || 0;
        
        const list = (
            results &&
            results[searchKey] &&
            results[searchKey].hits
            ) || [];

        return (
            // <div className="App">
                <div className="page">
                    <div className ="interactions">
                        <Search 
                            value={searchTerm}
                            onChange={this.onSearchChange}
                            onSubmit={this.onSearchSubmit}
                            >Search
                        </Search>
                    </div>
                    <Table 
                        list = {list}
                        onDismiss = {this.onDismiss}
                    />       
                    <div className ='interactions'>
                        <Button onClick={() => this.fetchSearchTopstories(searchKey, page + 1)}>
                            More
                        </Button>
                    </div>
                </div>
            // </div>
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
 const Search = ({
     value, 
     onChange, 
     children,
     onSubmit
    }) =>
        <form onSubmit = {onSubmit}>
            <input
                type = "text"
                value = {value}
                onChange={onChange}
            />
            <button type = "submit">
                {children} 
            </button>
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
//p92
const Table = ({ list, onDismiss }) =>
            <div className = "table">
                { list.map(item =>
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


const Button = ({ onClick, className = '', children}) =>
            <button
                onClick= {onClick}
                className={className}
                type="button"
            >
                {children}
            </button>

// Button.defaultProps = {
//     className: '',
// }

// Button.propTypes = {
//     onClick: PropTypes.func.isRequired,
//     className: PropTypes.string,
//     children: PropTypes.node.isRequired,
// };

// Table.propTypes = {

//     list: PropTypes.arrayOf(
//         PropTypes.shape({
//             objectID: PropTypes.string.isRequired,
//             author: PropTypes.string,
//             url: PropTypes.string,
//             num_comments: PropTypes.number,
//             points: PropTypes.number,
//         })
//     ).isRequired,
//     onDismiss: PropTypes.func.isRequired,
// }


export default Exercise


export {
    Button,
    Search,
    Table,
}


