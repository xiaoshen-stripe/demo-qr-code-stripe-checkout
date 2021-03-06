import React from 'react';
import { useState, useEffect } from 'react';
import QRcode from 'qrcode.react';

const Order = () => {

    const [products, setProducts] = useState();
    const [qrcode, setQrcode] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            const productsData = await fetch('/get-products').then(res => res.json());
            setProducts(productsData);
        };
        fetchProducts();
    }, []);

    const QrcodeDisplay = () => {
        const qrCodeDestination = `${window.location.origin}/checkout`;

        return (
            <QRcode
                value={qrCodeDestination}
                size={350}
                includeMargin={true}
            />
        );
    }

    const ProductsDisplay = () => {

        const handleClick = () => {
            setQrcode(true);
        }

        return (
            <div className="order">
                {products.map(product => (
                    <div className="product" key={product.id}>
                        <h2>{product.name}</h2>
                        <img src={product.images[0]} alt={product.name} />
                    </div>
                ))}
                <button onClick={handleClick}>Order with QR code</button>
            </div>
        );
    }

    const LoadingMsg = () => {
        return (<p className="loading-msg">Loading...</p>);
    }

    return (
        qrcode ? <QrcodeDisplay /> :
            products ?
                <ProductsDisplay /> : <LoadingMsg />
    )
}

export default Order;
