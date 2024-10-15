import React from "react";
import "./PokemonCard.css";
import { useDispatch } from "react-redux";
import { setSelectedPokemon } from "../../redux/slices/pokemonSlice";
import addIcon from "../../assets/add.png";
import trashIcon from "../../assets/trash.png";

interface PokemonCard {
  id: number;
  label: string;
  imageUrl: string;
  isSelected: boolean;
  onClickIcon: () => void;
}

const Card: React.FC<PokemonCard> = ({
  id,
  label,
  imageUrl,
  isSelected,
  onClickIcon,
}) => {
  const dispatch = useDispatch();

  const handleImageClick = () => {
    dispatch(setSelectedPokemon(id));
  };

  const backgroundClass = isSelected ? "selected" : "not-selected";

  return (
    <div className="card">
      <div className={`card-image ${backgroundClass}`}>
        <label className="icon-button" onClick={onClickIcon}>
          <img src={isSelected ? trashIcon : addIcon} alt="" />
        </label>
        <img src={imageUrl} alt={label} onClick={handleImageClick} />
      </div>
      <div className="card-label">{label}</div>
    </div>
  );
};

export default Card;
