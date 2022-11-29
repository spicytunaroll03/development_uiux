import "./ProductItem.css"
import { useState } from "react";
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import Row from 'react-bootstrap/Row';

// FOR EACH PRODUCT 
function ProductItem(props) {
    const [value, setValue] = useState([]);
    const handleChange = (val) => setValue(val);

    //props makes it different each time 
    return (
        <div className="ProductItem">
            <div className="card">
                <img className="card-img-top" src={props.item.image}/>
                <div className="card-body">
                    <h5 className="card-title">{props.item.name}</h5>
                    <p className="card-category"> ({props.item.category}) </p>
                    <p className="card-price">  ${props.item.price} </p>
                    <p className="card-text">{props.item.description}</p>
                    <p className="card-artist"> ~ {props.item.artist} </p>
                    <Row className="button-row">
                        <ToggleButtonGroup type="checkbox" value={value} onChange={ handleChange } className="toggle-button">
                            { props.cart.includes(props.item) ? 
                            <ToggleButton className="btn" id="tbg-btn-1" value={1} onClick={() => {props.removeFromCart(props.item)}}> Remove from Cart </ToggleButton> : 
                            <ToggleButton className="btn" id="tbg-btn-2" value={2} onClick={() => {props.addToCart(props.item)}}>Add to Cart</ToggleButton>}
                        </ToggleButtonGroup>
                    </Row>
                </div>
            </div>
        </div>

    );
}

export default ProductItem;

