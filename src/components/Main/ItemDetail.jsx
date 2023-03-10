import React from 'react';
import Contador from './Contador';

const ItemDetail = ({ item }) => {
    const discount = item.price - (item.price * item.descuento) / 100;
    return (
        <div className="container-page container-detail">
            <img src={item.img} alt="detail" />

            <article>
                <h2>{item.title}</h2>
                <section>
                    <h5>$ {item.price}.-</h5>
                </section>
                <span className="info-span">
                    Todos los precios están expresados en Pesos
                </span>
                <hr />
                <h3 className="cuotas">
                    Hasta <strong>12</strong> cuotas sin interes de
                    <strong> ${item.price / 12}</strong>
                </h3>
                <hr />
                <Contador stock={10} />
            </article>
        </div>
    );
};

export default ItemDetail;
