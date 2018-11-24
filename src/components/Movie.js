import React from 'react';

const Movie = (props) => {
    const rating = [1, 2, 3, 4, 5];

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
                        { 
                            rating.map(score =>
                                <i className="star icon" 
                                    key={[props.id,score]}
                                    onClick={() => props.scoreAdded(props.id, score)}></i>
                            )
                        }
                        { Math.round(props.rating * 10 ) / 10 } rating
                    </span>
                </div>
            </div>
        </div>
    );
}

export default Movie;