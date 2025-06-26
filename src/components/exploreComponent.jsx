import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import Button from "@mui/joy/Button";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../store/actions/productActions";
import GetProductById from "../api/getProductById";
import Carousel from 'react-material-ui-carousel'

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function ExploreComponent() {
  const [expanded, setExpanded] = React.useState(false);

  const { productId } = useParams();
  const [ProductData, setProductData] = React.useState();
  async function GetData() {
    const response = await GetProductById(productId);
    setProductData(response.data.product);
  }
  React.useEffect(() => {
    GetData();
  }, []);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const dispatch = useDispatch();
  const productInCart = useSelector((state) => state.cart.products);
  // console.log(productInCart);
  function isItemInCart() {
    return productInCart.some((oneObj) => oneObj.id == ProductData.id);
  }
  return (
    <>
      {ProductData && (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Card sx={{ minWidth: 500, maxWidth: 1000, backgroundColor: "whitesmoke" }}>
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                  {ProductData.title[0]}
                </Avatar>
              }
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
              title={ProductData.title}
              subheader={ProductData.category}
            />

            {ProductData.image.length > 1 ? (
              <Carousel>
                {ProductData.image.map((item, i) => (
                  <img style={{ width: "100%",height:"500px" , objectFit: "contain" }} key={i} src={item} alt="image" />
                ))}
              </Carousel>
            ) : (
              <CardMedia
                component="img"
                sx={{ objectFit: "contain" }}
                height="500"
                image={ProductData.image.length > 0 ? ProductData.image[0] : ProductData.image}
                alt="Paella dish"
              />
            )}

            <CardContent sx={{ textAlign: "center" }}>
              <Typography level="body-xs">Total price:</Typography>
              <Typography fontSize="20px" fontWeight="lg">
                ${ProductData.price}
              </Typography>
            </CardContent>
            <CardContent>
              <Typography variant="body2" color="black" fontSize={20}>
                {ProductData.description}
              </Typography>
            </CardContent>

            <CardActions disableSpacing>
              {isItemInCart() ? (
                <Button
                  onClick={() => dispatch(setProducts(ProductData))}
                  variant="outlined"
                  disabled
                  size="md"
                  aria-label="Explore Bahamas Islands"
                  sx={{
                    ml: "auto",
                    alignSelf: "center",
                    fontWeight: 600,
                    fontSize: "20px",
                    padding: "10px 20px",
                  }}
                >
                  Already Added
                </Button>
              ) : (
                <Button
                  onClick={() => dispatch(setProducts(ProductData))}
                  variant="contained"
                  size="md"
                  aria-label="Explore Bahamas Islands"
                  sx={{
                    ml: "auto",
                    alignSelf: "center",
                    fontWeight: 600,
                    fontSize: "20px",
                    padding: "10px 20px",
                    backgroundColor: "#007af3",
                    color: "white",
                  }}
                >
                  Add To Cart
                </Button>
              )}
              <IconButton aria-label="share">
                <ShareIcon />
              </IconButton>
              <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit></Collapse>
          </Card>
        </Box>
      )}
    </>
  );
}
