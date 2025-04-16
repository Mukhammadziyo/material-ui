import { useParams } from "react-router-dom";
import { Product } from "../utils/Interface";
import React from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Rating,
  Button,
  Chip,
  Card,
  Divider,
} from "@mui/material";

function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = React.useState<Product | null>(null);
  const [mainImage, setMainImage] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch(`https://dummyjson.com/products/${id}`);
      const data = await res.json();
      setProduct(data);
      setMainImage(data.images[0]);
    };
    fetchProduct();
  }, [id]);

  if (!product)
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
      </Box>
    );

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        px: 2,
        py: 4,
        backgroundColor: "#f5f7fa",
        minHeight: "100vh",
      }}
    >
      <Card
        sx={{
          width: "100%",
          maxWidth: 1100,
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          borderRadius: 4,
          boxShadow: 4,
          overflow: "hidden",
        }}
      >
        {/* LEFT: Image Gallery */}
        <Box
          sx={{
            width: { xs: "100%", md: "50%" },
            backgroundColor: "#fff",
            p: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            component="img"
            src={mainImage || product.images[0]}
            alt={product.title}
            sx={{
              width: "100%",
              maxHeight: 350,
              objectFit: "contain",
              borderRadius: 3,
              backgroundColor: "#f3f3f3",
              mb: 2,
            }}
          />
          <Box
            sx={{
              display: "flex",
              gap: 1,
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {product.images.map((img, index) => (
              <Box
                key={index}
                component="img"
                src={img}
                alt={`thumb-${index}`}
                onClick={() => setMainImage(img)}
                sx={{
                  width: 60,
                  height: 60,
                  objectFit: "contain",
                  cursor: "pointer",
                  border:
                    mainImage === img ? "2px solid #1976d2" : "1px solid #ccc",
                  borderRadius: 2,
                  backgroundColor: "#fff",
                  p: 0.5,
                  transition: "0.2s ease",
                  "&:hover": {
                    borderColor: "#1976d2",
                  },
                }}
              />
            ))}
          </Box>
        </Box>

        {/* RIGHT: Product Info */}
        <Box
          sx={{
            width: { xs: "100%", md: "50%" },
            p: { xs: 3, md: 4 },
            backgroundColor: "#ffffff",
          }}
        >
          <Typography variant="h4" fontWeight={700} gutterBottom>
            {product.title}
          </Typography>

          <Box sx={{ display: "flex", gap: 1, mb: 2, flexWrap: "wrap" }}>
            <Chip label={`Category: ${product.category}`} color="primary" />
            <Chip label={`Brand: ${product.brand}`} color="secondary" />
          </Box>

          <Typography
            variant="body1"
            sx={{ color: "text.secondary", mb: 2, lineHeight: 1.6 }}
          >
            {product.description}
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Typography
            variant="h5"
            color="primary"
            fontWeight={600}
            gutterBottom
          >
            ${product.price}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Discount: {product.discountPercentage}%
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Stock: {product.stock}
          </Typography>

          <Box mt={2} display="flex" alignItems="center" gap={1}>
            <Rating
              value={parseFloat(product.rating)}
              precision={0.5}
              readOnly
            />
            <Typography variant="body2" color="text.secondary">
              {product.rating} / 5
            </Typography>
          </Box>

          <Box mt={3} display="flex" gap={2} flexWrap="wrap">
            <Button variant="contained" size="large" color="primary">
              Add to Cart
            </Button>
            <Button variant="outlined" size="large" color="secondary">
              Buy Now
            </Button>
          </Box>
        </Box>
      </Card>
    </Box>
  );
}

export default ProductDetail;
