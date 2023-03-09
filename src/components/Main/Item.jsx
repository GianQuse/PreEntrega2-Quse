import React from 'react';
import { Link } from 'react-router-dom';

const Item = ({ producto }) => {
    const discount =
        producto.price - (producto.price * producto.descuento) / 100;
    return (
        <div className="item">
            <Link className="ver-detalle" to={`/detail/${producto.id}`}>
                <img src={producto.img} width="200px" alt={producto.title} />
            </Link>
            <article className="info">
                <h2>{producto.title}</h2>
                <div className="info-price">
                    <h5>${producto.price}.-</h5>
                </div>
            </article>
        </div>
    );
};

export default Item;
