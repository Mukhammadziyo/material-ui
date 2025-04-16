import { Link, useLoaderData } from "react-router-dom";
import { Product } from "../utils/Interface";
import Rating from "../components/Rating";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  useTheme,
} from "@mui/material";

function ProductList() {
  const { products } = useLoaderData() as { products: Product[] };
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: 3,
        p: 3,
        justifyContent: "center",
      }}
    >
      {products.map((p: Product) => (
        <Box key={p.id}>
          <Link to={`/product/${p.id}`} style={{ textDecoration: "none" }}>
            <Card
              sx={{
                width: 300,
                height: 450,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                borderRadius: 3,
                boxShadow: 3,
                "&:hover": {
                  transform: "translateY(-6px)",
                  boxShadow: 6,
                },
              }}
            >
              <CardMedia
                component="img"
                image={p.images[0]}
                alt={p.title}
                sx={{
                  height: 180,
                  objectFit: "contain",
                  p: 2,
                  backgroundColor:
                    theme.palette.mode === "light" ? "#f9f9f9" : "#1e1e1e",
                  borderTopLeftRadius: 12,
                  borderTopRightRadius: 12,
                }}
              />
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  flexGrow: 1,
                  overflow: "hidden",
                }}
              >
                <Box sx={{ flexGrow: 1 }}>
                  <Typography
                    variant="h6"
                    component="div"
                    gutterBottom
                    sx={{ fontWeight: 600 }}
                  >
                    {p.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      mb: 1,
                    }}
                  >
                    {p.description}
                  </Typography>
                </Box>
                <Rating value={parseFloat(p.rating)} />
              </CardContent>
              <Box sx={{ px: 2, pb: 2 }}>
                <Typography
                  variant="subtitle1"
                  color="primary"
                  sx={{ fontWeight: "bold" }}
                >
                  ${p.price}
                </Typography>
              </Box>
            </Card>
          </Link>
        </Box>
      ))}
    </Box>
  );
}

export default ProductList;
