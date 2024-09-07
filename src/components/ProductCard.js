import { AddShoppingCartOutlined } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CardActionArea,
  Rating,
  Typography,
  Grid
} from "@mui/material";
import React from "react";
import "./ProductCard.css";

const ProductCard = ({ product, handleAddToCart }) => {
  let token = localStorage.getItem('token');
  return (
      <Card className="card">
        <CardActionArea className="card-container">
          <CardMedia
            component="img"
            height="140"
            image={product.image}
            alt="green iguana"
          />
          <CardContent className="card-content">
            <Typography gutterBottom variant="h5" component="div">
              {product.name}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            ${parseInt(product.cost)}
            </Typography>
            <Rating name="read-only" value={product.rating} readOnly />
          </CardContent>
        </CardActionArea>
        <CardActions>
        <Button size="" fullWidth color="primary" variant="contained" value={product._id} onClick={handleAddToCart}>
          <AddShoppingCartOutlined />  ADD TO CART
        </Button>
      </CardActions>
      </Card>
  );
};

export default ProductCard;
