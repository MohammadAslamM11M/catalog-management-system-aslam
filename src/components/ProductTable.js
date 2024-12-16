import React, { useState, useEffect } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import {
  Box,
  Button,
  TextField,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import debounce from "lodash.debounce";
import { fetchProducts } from "../services/api";

const ProductTable = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const navigate = useNavigate();

  const loadProducts = async () => {
    setLoading(true);
    try {
      const data = await fetchProducts(page, "", "");
      const mappedProducts =
        data.products?.map((product) => ({
          id: product.id,
          name: product.name,
          price: product.mrp?.mrp || 0,
          main_category: product.main_category,
        })) || [];

      const filteredProducts = mappedProducts
        .filter((product) =>
          search
            ? product.name.toLowerCase().includes(search.toLowerCase())
            : true
        )
        .filter((product) =>
          category ? product.main_category === category : true
        );

      setProducts(filteredProducts);

      const uniqueCategories = [
        ...new Set(mappedProducts.map((product) => product.main_category)),
      ].filter((cat) => cat);
      setCategories(uniqueCategories);
    } catch (error) {
      console.error("Failed to fetch products", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, [page, search, category]);

  const debouncedSearch = debounce((value) => {
    setSearch(value);
    setPage(0);
  }, 300);

  const handleSearchChange = (e) => {
    debouncedSearch(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setPage(0);
  };

  const handleRowClick = (params) => {
    navigate(`/details/${params.id}`);
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Box sx={{ marginBottom: 3, textAlign: "center" }}>
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          Product List
        </Typography>
      </Box>

      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        justifyContent="center"
        alignItems="center"
        sx={{ marginBottom: 2 }}
      >
        <Box sx={{ flex: 1, minWidth: 200 }}>
          <TextField
            fullWidth
            label="Search"
            variant="outlined"
            onChange={handleSearchChange}
            sx={{ boxShadow: 1 }}
          />
        </Box>

        <Box sx={{ flex: 1, minWidth: 200 }}>
          <TextField
            fullWidth
            select
            label="Category"
            value={category}
            onChange={handleCategoryChange}
            sx={{ boxShadow: 1 }}
          >
            <MenuItem value="">All</MenuItem>
            {categories.map((cat, index) => (
              <MenuItem key={index} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </TextField>
        </Box>
      </Stack>

      <Box sx={{ height: 600, width: "100%" }}>
        <DataGrid
          rows={products}
          columns={[
            { field: "id", headerName: "ID", width: 90 },
            { field: "name", headerName: "Product Name", flex: 1 },
            { field: "price", headerName: "Price", width: 120 },
            {
              field: "actions",
              headerName: "Actions",
              width: 150,
              renderCell: (params) => (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleRowClick(params.row)}
                >
                  View Details
                </Button>
              ),
            },
          ]}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          pageSizeOptions={[10]}
          pagination
          components={{ Toolbar: GridToolbar }}
          loading={loading}
          onPageChange={(newPage) => setPage(newPage + 1)}
          getRowId={(row) => row.id ?? row.name}
        />
      </Box>
    </Box>
  );
};

export default ProductTable;
