import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  CircularProgress,
  Box,
  Button,
  Typography,
  Stack,
  Snackbar,
  Alert,
} from "@mui/material";
import { fetchProductDetails } from "../services/api";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  
  // useEffect(() => {
  //   const loadProductDetails = async () => {
  //     setLoading(true);
  //     try {
  //       const data = await fetchProductDetails(id);
  //       setProduct(data); // Correctly set the product data
  //     } catch (error) {
  //       console.error("Failed to fetch product details", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   loadProductDetails();
  // }, [id]);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      const dummyProduct = {
        id: 1,
        name: "Sample Product",
        description: "This is a sample product.",
        price: 100,
        category: "Sample Category",
      };
      setProduct(dummyProduct);
      setLoading(false);
    }, 1000);
  }, []);

  const handleAddToCart = () => {
    navigate("/cart", { state: { product } });
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress size={50} />
      </Box>
    );
  }

  if (!product) {
    return (
      <Box sx={{ textAlign: "center", padding: 3 }}>
        <Typography variant="h5" color="error">
          Product Not Found
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 3, maxWidth: 1200, margin: "0 auto" }}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={4}
        sx={{
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <Box
          sx={{
            width: { xs: "100%", sm: "40%" },
            maxWidth: "100%",
            height: 300,
            backgroundColor: "grey.200",
            borderRadius: 2,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h6">Image Here</Typography>
        </Box>

        <Stack
          direction="column"
          spacing={2}
          sx={{
            width: { xs: "100%", sm: "60%" },
            textAlign: { xs: "center", sm: "left" },
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            {product.name}
          </Typography>

          <Typography variant="body1">
            {product.description || product.details}
          </Typography>

          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Price: ${product.price || product.mrp}
          </Typography>

          <Typography variant="body1">
            Category: {product.category || product.main_category}
          </Typography>

          <Button
            variant="contained"
            color="primary"
            sx={{ padding: "10px 20px" }}
            onClick={handleAddToCart}
          >
            Add to Cart
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default ProductDetails;
