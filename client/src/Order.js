import { useState, useEffect } from 'react';
import QRcode from 'qrcode.react';

const Order = () => {

    const [products, setProducts] = useState();
    const [qrcode, setQrcode] = useState(false);

    // useEffects 
    // 1. get products info (name, image)

    useEffect(() => {
        const fetchProducts = async () => {
            const productsData = await fetch('/get-products').then(res => res.json());
            setProducts(productsData);
        };
        fetchProducts();
    }, []);

    // 2.0 display products sold with conditional rendering 

    // 3.0 render the buy button 


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

    // create htmls 
    // finalize rendering logic with loading function 
    return (
        qrcode ? <QrcodeDisplay /> :
            products ?
                <ProductsDisplay /> : <LoadingMsg />
    )
}

export default Order;
