import React, { Component} from 'react';
import { sortBy } from 'lodash';
import classNames from 'classnames'
import '../../App.css';


const DEFAULT_QUERY = "redux";
const DEFAULT_PAGE = 0;
const DEFAULT_HPP = '50';

const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const PARAM_PAGE = 'page=';
const PARAM_HPP = 'hitsPerPage=';

const Loading = () => 
    <div style = {{ color: 'red' }}>Loading ...</div>

const Sort = ({ sortKey, onSort, children, activeSortKey }) => {
    const sortClass = classNames(
        'button-inline',
        { 'button-active': sortKey === activeSortKey }
    )
    return (
        <Button onClick ={() => onSort(sortKey)}
            className="button-inline"
        >
            {children}
        </Button>
    )
}


const SORTS = {
    NONE: list => list,
    TITLE: list => sortBy(list, 'title'),
    AUTHOR: list => sortBy(list, 'author'),
    COMMENTS: list => sortBy(list, 'num_comments').reverse(),
    POINTS: list => sortBy(list, 'points').reverse(),
};
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
            isLoading: false,
            sortKey: 'NONE'
        };
        
        this.needsToSearchTopstoreis = this.needsToSearchTopstoreis.bind(this);
        this.setSearchTopstories = this.setSearchTopstories.bind(this);
        this.fetchSearchTopstories = this.fetchSearchTopstories.bind(this);
        this.onSearchChange = this.onSearchChange.bind(this);
        this.onSearchSubmit = this.onSearchSubmit.bind(this);
        this.onDismiss = this.onDismiss.bind(this);
        this.onSort = this.onSort.bind(this);
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
            results: {
                ...results,
                [searchKey]: { hits: updatedHits, page }
            }, 
            isLoading: false
        });
    }

    fetchSearchTopstories(searchTerm, page){
        this.setState({ isLoading: true });

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

        const isNotId = item => item.objectID !== id;
        const updatedHits = hits.filter(isNotId);

        this.setState({
            results: { 
                ...results, 
                [searchKey]: { hits: updatedHits, page} 
                }
        });
    }

    onSort(sortKey){
        this.setState({ sortKey });
    }

    getName(){
        return this.firstname + ' ' + this.lastname;
    }

    render(){
        const { searchTerm, 
                results, 
                searchKey,
                isLoading,
                sortKey
            }  = this.state;
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
                        sortKey = {sortKey}
                        onSort = {this.onSort}
                        onDismiss = {this.onDismiss}
                    />       
                    <div className ='interactions'>
                        <ButtonWithLoading
                            isLoading={isLoading}
                            onClick={() => this.fetchSearchTopstories(searchKey, page + 1)}>
                            More
                        </ButtonWithLoading>
                    
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
class Search extends Component {

    componentDidMount(){
        this.input.focus();
    }

    render(){
        const {
        value, 
        onChange, 
        children,
        onSubmit
    } = this.props;

        return(
            <form onSubmit = {onSubmit}>
                        <input
                            type = "text"
                            value = {value}
                            onChange={onChange}
                            ref={(node) => {this.input = node; }}
                            />
                        <button type = "submit">
                            {children} 
                        </button>
                    </form>
                )
            }
}


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


class Table extends Component { 
    constructor(props){
        super(props)
    }
    render(){
        const { list, sortKey, onSort, onDismiss,  } = this.props;
        const smallColumn = {
            width: '10%'
        }
        return(
            <div className = "table">
                <div className="table-header">

                    <span style ={{ width: '40%'}}>
                        <Sort 
                            sortKey = {'TITLE'}
                            onSort = {onSort}
                        >
                            Title
                        </Sort>
                    </span>
                    <span style ={{ width: '30% '}}>
                        <Sort
                            sortKey = {'AUTHOR'}
                            onSort = {onSort}
                        >
                            Author
                        </Sort>
                    </span>
                    <span style = {{ width: '10%'}}>
                        <Sort
                            sortKey={'COMMENTS'}
                            onSort = {onSort}
                        >
                            Comments
                        </Sort>
                    </span>
                    <span style ={{ width: '10%' }}>
                        <Sort
                            sortKey = {"COMMENTS"}
                            onSort={onSort}
                        >
                            Points
                        </Sort>
                    </span>
                    <span style ={{ width: '10%'}}>
                        Archive
                    </span>
                </div>
                {SORTS[sortKey](list).map(item =>
                    <div key={item.objectID} className="table-row">
                        <span style= { largeColumn }>
                            <a href = {item.url} target="_blank">{item.title}</a>
                        </span>
                        <span style = { midColumnm }>{item.author}</span>|
                        <span style = { smallColumn }>{item.num_comments}</span>|
                        <span style = { smallColumn }>{item.points}</span>|

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
        )
    }
}


const Button = ({ onClick, className ='', children}) => {
    return (
            <button
                onClick= {onClick}
                className={className}
                type="button"
                >{children}
            </button>
            )
    }




const withLoading = ( Component ) => (props) => 
    props.isLoading ? <Loading /> : <Component { ... props} />  

const ButtonWithLoading = withLoading(Button);

export {
    Button,
    Search,
    Table,
    Loading
}
export default Exercise






