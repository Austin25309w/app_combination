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
// ES5
// function isSearched(searchTerm) {
//     return function(item){
//         return !searchTerm ||
//             item.title.toLowerCase().includes(searchTerm.toLowerCase());
//     }
// }
//ES6
const isSearched = searchTerm => 
    !searchTerm || item.title.toLowerCase().includes(searchTerm.toLowerCase());


class Exercise extends React.Component {
    constructor(props) {
        super();
        this.state = {
            list,
            searchTerm: '',
        };
        this.onSearchChange = this.onSearchChange.bind(this);
        this.onDismiss = this.onDismiss.bind(this);
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
        return (
            <div className="App">
                <Search 
                    value={searchTerm}
                    onChange={this.onSearchChange}
                >Search
                </Search>
                <Table 
                    list = {list}
                    pattern = {searchTerm}
                    onDismiss = {this.onDismiss}
                    />

                <form>
                    <input 
                    type ="text"
                    value= {searchTerm}
                    onChange={this.onSearchChange }/>
                </form>
               
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



class Table extends Component {
    render(){
        const { list, pattern, onDismiss } = this.props;
        return (
            <div>
                {list.filter(isSearched(pattern)).map(item =>
                    <div key={item.objectID}>
                        <span>
                            <a href = {item.url}>{item.title}</a>
                        </span>
                        <span>{item.author}</span>|
                        <span>{item.num_comments}</span>|
                        <span>{item.points}</span>

                        <span>
                            <Button onClick={() => onDismiss(item.objectID)}>
                                Dismiss
                            </Button>
                        </span>
                    </div>
                )}
            </div>
        )
    }
}

class Button extends Component {
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