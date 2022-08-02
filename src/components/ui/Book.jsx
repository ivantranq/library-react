import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Price from './Price';
import Rating from './Rating';


const Book = (props) => {
    const [img, setImg] = useState();

    const mountedRef = useRef(true);

    useEffect (() => {
        const image = new Image();
        image.src = props.book.url;
        image.onload = () => {
            setTimeout(() => {
                if(mountedRef.current) {
                    setImg(image);
                }
            }, 300);
        };
        return () => {
            mountedRef.current = false;
        }
    })

    return (
        <div className="book">
            {
                img ? (
                    <>
                        <Link to={`/books/${props.book.id}`}>
                            <figure className="book__img--wrapper">
                                <img 
                                    src={img.src} 
                                    alt="" 
                                    className="book__img"
                                />
                            </figure>
                        </Link>
                        <div className="book__title">
                            <Link to={`/books/${props.book.id}`} className='book__title--link'>
                                {props.book.title}
                            </Link>
                        </div>
                        <Rating rating={props.book.rating} />
                        <Price book={props.book} />
                        
                    </>
                ) : (
                    <>
                        <div className="book__img--skeleton"></div>
                        <div className="skeleton book__title--skeleton"></div>
                        <div className="skeleton book__rating--skeleton"></div>
                        <div className="skeleton book__price--skeleton"></div>
                    </>
                )
            }
            
            
        </div>
    );
}

export default Book;
