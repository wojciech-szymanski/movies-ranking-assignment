import React from 'react';

const Movie = (props) => {
    return  (
        <div className="column">
            <div className="ui fluid card">
                <div className="image">
                    <img src={ props.img } alt={ props.title } />
                </div>
                <div className="content">
                    <a className="header" href="/">{ props.title }</a>
                    <div className="description">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
                </div>
                <div className="extra content">
                    <span className="right floated star">
                        <i className="star icon"></i>
                        { props.rating } rating
                    </span>
                </div>
            </div>
        </div>
    );
}

export default Movie;