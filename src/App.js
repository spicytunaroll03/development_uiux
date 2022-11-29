import "./App.css";
import { useState } from "react";
import galleryData from "./assets/gallery-data.json";
import ProductItem from "./components/ProductItem.js";
import 'bootstrap/dist/css/bootstrap.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';

/* ####### DO NOT TOUCH -- this makes the image URLs work ####### */
galleryData.forEach((item) => {
  item.image = process.env.PUBLIC_URL + "/" + item.image;
});
/* ############################################################## */

function App() {
  // CART FUNCTIONALITY ########################################################
  const [cartItems, setCartItems] = useState([])

  function addToCart(item) {
    const exist = cartItems.find((x) => x.name === item.name)
    if (!exist) {
      setCartItems([...cartItems, item]) //cartItems is an array and the ... expands the array and this new item is appended to this array 
    }
    
  }

  function removeFromCart(item) {
    const index = cartItems.indexOf(item);
    if (index > -1) {
      cartItems.splice(index, 1);
      setCartItems([...cartItems]);
    }
  }

  function calculateTotal() {
    let total = 0.00
    for (let i = 0; i < cartItems.length; i++) {
      total += cartItems[i].price
    }
    return Math.round(total * 100)/100;
  }
  // ###########################################################################

  // FILTER FUNCTIONALITY ######################################################
  
  const [productGallery, setProductGallery] = useState([...galleryData]);
  const [filterCategory, setFilter] = useState("All"); // keeps track of one filter 
  const [filterArtist, setArtist] = useState("All");

  // function that handles the specific button pressed 
  function handleFilter(eventKey) {
    setFilter(eventKey);
  }
  
  function handleArtist(eventKey) {
    setArtist(eventKey);
  }
  

   // function that returns a boolean whether each item should show or not based on its filter pressed  
  const matchesFilterType = item => {
    //console.log(filterCategory)
    // selected only the artist filter 
    if ("All" === filterCategory && item.artist === filterArtist) {
      return true;
    } 
    // selected only the category filter 
    else if (item.category === filterCategory && filterArtist === "All") {
      return true;
    }
    // selected both the category and artist filter  
    else if (item.category === filterCategory && item.artist === filterArtist) {
      return true;
    }
    // if no filters are selected at all
    else if ("All" === filterCategory && "All" === filterArtist) {
      return true;
    }
    // if items don't match any of the filter options
    else {
      return false;
    }
  }

  // ###########################################################################

  // HANDLING SORT FUNCTIONALITY 
  const [sortedArray, setSortedGallery] = useState([...productGallery]);
  const [sortType, setSortType] = useState("Default");
  
  function handleAscendingSort(eventKey) {
    setSortType(eventKey);
    ascOrder();
  }
  function handleDescendingSort(eventKey) {
    setSortType(eventKey);
    descOrder();
  }

  function resetSort() {
    setSortedGallery([...productGallery]);
  }

  function ascOrder() {
    setSortedGallery(sortedArray.sort(function(a, b) {
      return a.price - b.price;
    }));
  }

  function descOrder() {
    setSortedGallery(sortedArray.sort(function(a, b) {
      return b.price - a.price;
    }));
  }

  // ###########################################################################

  const [value, setValue] = useState([]);
  const handleChange = (val) => setValue(val);

  return (
    <div className="App">
      <Row className="header">
        <h1 className="header-title"> the artist collection. </h1>
        <p className="header-desc"> come shop for unique artist pieces from 
          a diverse selection of mediums!
        </p>
      </Row>
     
    
      <Row className="sort-row">
        <div className="sort-container">
          <h1 className="sort-price-title"> Sort Price By:  </h1>
          <Button onClick={handleAscendingSort} className="btn btn-warning mb-4" id="ascending-bttn"> Ascending Order</Button>
          <Button onClick={handleDescendingSort} className="btn btn-warning mb-4"id="descending-bttn"> Descending Order</Button>
          <Button onClick={()=>resetSort()} className="btn btn-warning mb-4" id="reset-bttn">  Reset </Button>
        </div>
      </Row>
      
      <Row className="main-row">
        <div className="main">
          <Col md="2" className="filter-col">
            <div className="filters-sec">
              <Row className="filters-title">
                <h2 className="filters-title"> Filters </h2>
              </Row>
              <Row className="filter-row">
                <div className="medium-sec">
                <h3 className="filter-title"> Medium </h3>
                  <Navbar>
                    <Nav variant="pills" defaultActiveKey="All" onSelect={handleFilter} className="nav-filter">
                      <Nav.Item className="filter-pill"><Nav.Link eventKey="All">All</Nav.Link></Nav.Item>
                      <Nav.Item className="filter-pill"><Nav.Link eventKey="Acrylic">Acrylic</Nav.Link></Nav.Item>
                      <Nav.Item className="filter-pill"><Nav.Link eventKey="Water Color">Water Color</Nav.Link></Nav.Item>
                      <Nav.Item className="filter-pill"><Nav.Link eventKey="Digital">Digital</Nav.Link></Nav.Item>
                      <Nav.Item className="filter-pill"><Nav.Link eventKey="Color Pencil">Color Pencil</Nav.Link></Nav.Item>
                    </Nav>
                  </Navbar>
                </div>
              </Row> 
              <Row className="filter-row2">
                <div className="medium-sec">
                  <h3 className="filter-title"> Artist </h3>
                  <Navbar>
                    <Nav variant="pills" defaultActiveKey="All" onSelect={handleArtist} className="nav-filter">
                      <Nav.Item className="filter-pill"><Nav.Link eventKey="All">All</Nav.Link></Nav.Item>
                      <Nav.Item className="filter-pill"><Nav.Link eventKey="Giselle L.">Giselle L.</Nav.Link></Nav.Item>
                      <Nav.Item className="filter-pill"><Nav.Link eventKey="Anonymous Kat">Anonymous Kat</Nav.Link></Nav.Item>
                      <Nav.Item className="filter-pill"><Nav.Link eventKey="Euphoric Artist">Euphoric Artist</Nav.Link></Nav.Item>
                      <Nav.Item className="filter-pill"><Nav.Link eventKey="Saphire K.">Saphire K.</Nav.Link></Nav.Item>
                    </Nav> 
                  </Navbar> 
                </div>
              </Row>
            </div>
          </Col>
          
         
          {/*GALLERY OF PRODUCTS*/}
          <Col md="8"> 
            <div className="gallery"> 
              {sortedArray.filter(matchesFilterType).map((item) => ( 
                <ProductItem item={item} addToCart={addToCart} removeFromCart={removeFromCart} cart={cartItems} /> // this maps each product item to its data!
              ))}
            </div>
          </Col>
          {/*CART*/}
          <Col className="cart-col" md="1">
            <Row>
              <div className="cart-container">
                <Row> 
                  <div className="cart-title">
                    <h2 className="cart-title">Cart</h2> 
                  </div>
                </Row>
                <Row> 
                  { cartItems.map((item, index)=> <p className="item-name"> {item.name}</p>)}
                  <p className="price-title"> Total Price: ${calculateTotal()} </p>
                </Row>
              </div>
            </Row>
          </Col>
        </div>
      </Row>
    </div>
  );
}

export default App;
