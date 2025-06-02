import React, { useState } from 'react'
import { Card, Badge, Button } from 'react-bootstrap'
import Rating from './Rating'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addToCart } from '../actions/cartActions'
import './Product.css'

function Product({ product }) {
    const [isHovered, setIsHovered] = useState(false)
    const dispatch = useDispatch()

    const addToCartHandler = (e) => {
        e.preventDefault()
        dispatch(addToCart(product._id, 1))
    }

    return (
        <Card 
            className={`product-card ${isHovered ? 'hovered' : ''}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="product-image-container">
                <Link to={`/product/${product._id}`}>
                    <Card.Img 
                        src={product.image} 
                        className="product-image"
                        alt={product.name}
                    />
                </Link>
                {product.countInStock === 0 && (
                    <Badge bg="danger" className="out-of-stock-badge">
                        Out of Stock
                    </Badge>
                )}
                {product.countInStock > 0 && (
                    <Button
                        variant="primary"
                        className="add-to-cart-btn"
                        onClick={addToCartHandler}
                    >
                        <i className="fas fa-shopping-cart"></i> Add to Cart
                    </Button>
                )}
            </div>

            <Card.Body className="product-body">
                <Link to={`/product/${product._id}`} className="product-title">
                    <Card.Title as="div">
                        <strong>{product.name}</strong>
                    </Card.Title>
                </Link>

                <div className="product-rating">
                    <Rating 
                        value={product.rating} 
                        text={`${product.numReviews} reviews`} 
                        color={'#f8e825'} 
                    />
                </div>

                <div className="product-price-container">
                    <Card.Text as="h3" className="product-price">
                        ${product.price}
                    </Card.Text>
                    {product.countInStock > 0 && (
                        <Badge bg="success" className="stock-badge">
                            In Stock: {product.countInStock}
                        </Badge>
                    )}
                </div>

                <div className="product-category">
                    <Badge bg="info" className="category-badge">
                        {product.category}
                    </Badge>
                </div>
            </Card.Body>
        </Card>
    )
}

export default Product
