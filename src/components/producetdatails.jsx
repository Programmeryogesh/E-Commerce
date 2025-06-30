import { Box, Typography } from "@mui/material";
import ProductCard from "./producetCard";

function CardProduct({ ProductData, onDelete }) {
    if (!ProductData || ProductData.length === 0) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 200 }}>
                <Typography variant="h6" color="text.secondary">
                    No products found.
                </Typography>
            </Box>
        );
    }
    return (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            { ProductData.map((Product) => (
                <ProductCard key={Product.id} Product={Product} onDelete={onDelete} />
            ))}
        </Box>
    );
}

export default CardProduct;