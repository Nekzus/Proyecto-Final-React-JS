import React from 'react';
import { Card } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import ItemCategories from '../Common/ItemCategories';
import ItemStatus from '../Common/ItemStatus';
import PriceItems from '../Common/PriceItems';
import RatingStars from '../Common/RatingStars';

const Item = ({ item }) => {

    const { id, poster_path, stock, title, vote_average, price_ticket, genre_txt } = item;

    return (
        <Card className="card-item col-12 col-md-4 mb-3 mt-3 mr-3 ml-3 text-center">
            <div className="image-item">
                {<ItemStatus itemId={id} stock={stock} />}
                <Card.Img className="card-img" src={poster_path} alt={title} />
            </div>
            <Card.Body className="card-body">
                <ItemCategories genre_txt={genre_txt} />
                <Card.Text>
                    <RatingStars rating={vote_average} />
                </Card.Text>
                {stock !== 0
                    ? <Card.Text className='price-card'>Valor ticket: <PriceItems value={price_ticket} /></Card.Text>
                    : <Card.Text className='price-card'>AGOTADO</Card.Text>}
                <Card.Footer className="card-footer">
                    <NavLink to={`/item/${id}`}><button className="btn btn-secondary">Ver detalle</button></NavLink>
                </Card.Footer>
            </Card.Body>
        </Card>
    )
};
export default Item;



