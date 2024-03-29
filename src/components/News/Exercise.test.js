import renderer from 'react-test-renderer';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import Exercise, { Search, Button, Table } from './Exercise';

describe('Exercese', () => {

    it('renders', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Exercise/>, div)
    });

    test('snapshots', () => {
        const component = renderer.create(
            <Exercise />
        );
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    })
})

describe('Search', () => {

    it('renders', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Search>Search</Search>, div);
    });

    test('snapshots', () => {
        const component = renderer.create(
            <Search>Search</Search>
        );
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    })
})

describe('Button', () => {
    it('renders', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Button>Give Me More</Button>, div)
    })

    test('snapshots', () => {
        const component = renderer.create(
            <Button>Give Me More</Button>
        );
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
})

describe('Table', () => {
    const props = {
        list: [
            { title: '1', author: '1', num_comments: 1, points: 2, objectID: 'y' },
            { title: '2', author: '2', num_comments: 1, points: 2, object: 'z'}
        ],
    }

    it('renders', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Table { ...props }/>, div);
    })

    test('snapshots', () => {
        const component = renderer.create(
            <Table {...props }/>
        );
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    })
    it('shows two items in list', () => {
        const element = shallow(
            <Table { ...props }/>
        );
        expect(element.find('.table-row').length).toBe(2);
    });
})
