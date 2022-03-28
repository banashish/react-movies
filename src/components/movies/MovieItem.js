import { useContext, useEffect, useState } from "react";
import SettingsContext from "../../store/settings-context";
import classes from "./MovieItem.module.css"

const MovieItem = props => {
  const {config_url, backdrop_sizes} = useContext(SettingsContext);
    const [imageURL, setImageURL] = useState('');
    useEffect(() => {
      if (config_url && props.backdrop) {
        
        const url = new URL(
          `${config_url}${backdrop_sizes[0]}/${props.backdrop}`
        );
        const params = new URLSearchParams({
          api_key: "7b60c2cffaf2430c6939fed57f8ec4d5",
        }).toString();
        url.search = params;
        setImageURL(url);
      }
    },[config_url])
    return (
        <div className={`card col-3 rounded-2 shadow m-2 ${classes['movie-item']}`}>
            <img src={imageURL ? imageURL : ''} className={`card-img-top ${classes['movie-item-image']}`} alt="image not available" />
            <div className ="card-body">
                <h5 className ="card-title">{props.title}</h5>
                <p className ={`card-text ${classes['movie-item-description']}`}>{props.description}</p>
                <small className ={`card-text ${classes['movie-item-release']}`}>Release: {props.release}</small>
            </div>
        </div>
    )
}

export default MovieItem;