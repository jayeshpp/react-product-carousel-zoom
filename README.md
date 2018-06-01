# Product Carousel with touch zoom

# Usage

```
import ProductGallery from 'react-product-carousel-zoom';

const source = {
    images : [
        {
            src: "product-image.jpg",
            attributes : {
                width: "375px",
                height: "375px",
                alt: "image 1"
            }
        },
        {
            src: "product-image.jpg",
            attributes : {
                width: "375px",
                height: "375px",
                alt: "image 1"
            }
        }
    ],
    thumbnails: [
         {
            src: "product-thumb.jpg",
            attributes : {
                width: "100px",
                height: "100px",
                alt: "image 1"
            }
        },
        {
            src: "product.jpg",
            attributes : {
                width: "100px",
                height: "100px",
                alt: "image 1"
            }
        }
    ]
}

<ProductGallery {...source}/>
``
