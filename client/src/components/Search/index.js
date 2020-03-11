import './styles.css';
import React, {useState} from 'react';
import { connect } from 'react-redux';

const Search = ({onSubmit}) => {
    const [query,changeQuery] = useState('')
    return (
        <div className="search">
            <input
            className="query"
            type="text"
            placeholder=" Search"
            value={query}
            onChange={e => changeQuery(e.target.value)}
            onKeyUp={e=> onSubmit(e.target.value)}
            />
        </div>
    )
}

export default connect(
    undefined,
    dispatch => ({
        onSubmit(value){
            console.log(value)
        }
    })
)(Search)