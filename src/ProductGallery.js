import React, {Component} from 'react';
import Swipe from 'swipejs';
import { MemoryRouter } from 'react-router'
import '../style.css'

class ProductGallery extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            isModal: false,
            startSlide: 0,
            errorMessage: "",
            hasError: false
        }
    }

    componentDidMount() {
        const element = document.querySelector(".normal-slider .swipe");
        const _self = this;
        const options = {
            startSlide: _self.state.startSlide,
            speed: 400,
            continuous: false,
            callback: function(index) {
                _self.handleActiveItem(index);
            },
            transitionEnd: function(index, elem) {}
        };
        window.normalSwipe = new Swipe(element, options);

        this.handleThumbnailClick();
        //this.handleCarouselClick();
        //this.handleErrors();
        
        console.log("did mount");
        
    }
    
    componentDidUpdate() {
        /* const element = document.querySelector(".fullscreen-slider .swipe");
        const _self = this;
        const options = {
            startSlide: _self.state.startSlide,
            speed: 400,
            callback: function(index) {
                _self.handleActiveItem(index);
            },
            transitionEnd: function(index, elem) {}
        };
        window.fsSwipe = new Swipe(element, options);

        this.handleThumbnailClick(); */
        //this.handleCarouselClick();

        console.log("did update");
        
    }

    componentWillReceiveProps(nextProps) {
        // will be true
        const locationChanged = nextProps.location !== this.props.location
        console.log(locationChanged, "will receive props");
        
    }

    handleErrors() {
        if(this.props.images.length !== this.props.thumbnails.length) {
            this.setState({
                hasError: true,
                errorMessage: "Gallery and Thumbnail should have same length"
            })
        }
    }

    handleActiveItem(index) {
        const thumbs = Array.prototype.slice.call(document.querySelectorAll(".slider-thumbnails-inner > div"));
        thumbs.forEach((element, index) => {
            element.classList.remove("active");
        });
        thumbs[index].classList.add("active");
        const thumbContainer = document.querySelector(".slider-thumbnails-inner");
        if(index > 3) {
            thumbContainer.scroll(500,0);
        }else {
            thumbContainer.scroll(-500,0);
        }
    }

    handleThumbnailClick () {
        const thumbs = Array.prototype.slice.call(document.querySelectorAll(".slider-thumbnails-inner > div"));
        thumbs.forEach((element, index) => {
            element.addEventListener("click", function(){
                normalSwipe.slide(index);
                thumbs.forEach((element, index) => {
                    element.classList.remove("active");
                })
                this.classList.add("active");
            });
        });
    }
    
    handleCarouselClick () {
        const thumbs = Array.prototype.slice.call(document.querySelectorAll(".swipe-wrap > div img"));
        const sliderWrapper = document.querySelector(".normal-slider");
        const sliderContainer = document.querySelector(".slider-container");
        const _this = this;
        thumbs.forEach((element, index) => {
            element.addEventListener("click", function(){
                _this.setState({
                    isModal: true
                })
            });
        });
    }

    render() {
        const _self = this;
        
        const ErrorMessage = (props) => {
            if(props.hasError) {
                return (
                    <div className="pl-error-screen">
                        <p>{props.message}</p>
                    </div>
                )
            }else {
                return null
            }
        } 
        
        const Gallery = (props) => {
            return (
                <div className="slider-container">
                    <div className="swipe">
                        <Carousel {...props}/>
                    </div>
                    <div className="slider-thumbnails">
                        <Thumbnails {...props}  activeSlide={_self.state.startSlide}/>
                    </div>
                </div>
            )
        }

        const Images = (props) => {
            return (
                <div key={props.index} className={`items ${(props.index === 0 ? "active" : "")}`}>
                <MemoryRouter
                            initialEntries={[ location.pathname ]}
                            initialIndex={0}
                        >
                    <img src={props.item.src} {...props.item.attributes} />
                    </MemoryRouter>
                </div>
            )
        }

        const Video = (props) => {
            return (
                <div key={props.index} className={`items video ${(props.index === 0 ? "active" : "")}`}>
                    <video {...props.item.attributes}>
                        <source src={props.item.src} />
                    </video>
                </div>
            )
        }
    
        const Carousel = (props) => {
            return (
                <div className="swipe-wrap">
                    {props.images.map((item, index, array) => {
                        return (
                            checkURL(item.src) ? <Images item={item} index={index}/> : <Video item={item} index={index}/>
                        )
                    })}
                </div>
            )
        }

        const Thumbnails = (props) => {
            return(
                <div className="slider-thumbnails-inner">
                    {props.thumbnails.map((item, index) => {
                        return (
                            <div key={index} className={`items ${(index === props.activeSlide ? "active": "")}`}>
                                <img src={item.src} {...item.attributes}/>
                            </div>
                        )
                    })}
                </div>
            )
        }

        return (
            <div>
                <div className="normal-slider">
                    <Gallery {...this.props}/>
                </div>
                {this.state.isModal ? 
                    <div className="fullscreen-slider">
                        <Gallery {...this.props}/>
                    </div>
                : null}
                {/* <ErrorMessage hasError={(this.props.images.length !== this.props.thumbnails.length) ? true : false} message="length not matching"/> */}
            </div>
        )
    }
}

function checkURL(url) {
    return(url.match(/\.(jpeg|jpg|gif|png)$/) != null);
}

export default ProductGallery;