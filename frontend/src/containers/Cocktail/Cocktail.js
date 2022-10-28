import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import FullCocktail from "../../components/FullCocktail/FullCocktail";
import {fetchCocktail, rateCocktail} from "../../store/actions/cocktailActions";
import Spinner from "../../components/UI/Spinner/Spinner";

const Cocktail = ({match}) => {
  const dispatch = useDispatch();
  const cocktail = useSelector(state => state.cocktails.cocktail);
  const user = useSelector(state => state.users.user);
  const loading = useSelector(state => state.cocktails.fetchLoading);
  const rateLoading = useSelector(state => state.cocktails.rateLoading);

  useEffect(() => {
    if (match.params.id) {
      dispatch(fetchCocktail(match.params.id));
    }
  }, [match.params.id, dispatch]);

  const onRateCocktail = async rate => {
    await dispatch(rateCocktail(match.params.id, rate));
    dispatch(fetchCocktail(match.params.id));
  };

  return loading ? <Spinner/> : (
    <>
      {cocktail && <FullCocktail cocktail={cocktail} onRate={onRateCocktail} user={user} loading={rateLoading}/>}
    </>
  );
};

export default Cocktail;