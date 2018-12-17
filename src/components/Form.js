import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

let Form = (props) => {
    return (
        <form className="form" onSubmit={props.weatherMethod}>
            {/* <input className="form__input" type="text" name="city" placeholder="Город"/> */}
            <TextField
                // id="outlined-search"
                label="Город"
                type="text"
                name="city"
                className="form__input"
                margin="normal"
                variant="outlined"
            />
            <Button type="submit" color="primary" variant="contained" className="form__btn">
                <Icon className="material-icons md-light">search</Icon>
            </Button>
        </form>
    )
}




export default Form;