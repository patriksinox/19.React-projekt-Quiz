import React from "react";
import { useState, useContext } from "react";

const kategoria = {
  sport: 21,
  animals: 27,
  celebrities: 26,
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [otazky, setOtazky] = useState([]);
  const [cakanie, setCakanie] = useState(true);
  const [nacitanie, setNacitanie] = useState(false);
  const [error, setError] = useState(false);
  const [vyhodnotenie, setVyhodnotenie] = useState(false);
  const [index, setIndex] = useState(0);
  const [spravne, setSpravne] = useState(0);
  const [nastavenia, setNastavenia] = useState({
    pocet: 10,
    kategoria: 21,
    obtiaznost: "easy",
  });

  const handleZmeny = (e) => {
    const nazov = e.target.name;
    const hodnota = e.target.value;
    if (nazov === "kategoria")
      return setNastavenia({ ...nastavenia, [nazov]: kategoria[hodnota] });
    else return setNastavenia({ ...nastavenia, [nazov]: hodnota });
  };

  const handleFormy = (e) => {
    e.preventDefault();
    const { pocet, kategoria, obtiaznost } = nastavenia;
    const url = `https://opentdb.com/api.php?amount=${pocet}&category=${kategoria}&difficulty=${obtiaznost}&type=multiple`;
    fetchDat(url);
  };

  const dalsiaOtazka = () => {
    if (index === otazky.length - 1) return setVyhodnotenie(true);
    else setIndex(index + 1);
  };

  const spravnaOdpoved = (odpoved) => {
    if (odpoved === otazky[index].correct_answer) {
      setSpravne(spravne + 1);
      dalsiaOtazka();
    } else dalsiaOtazka();
  };

  const reset = () => {
    setNacitanie(true);
    setCakanie(true);
    setError(false);
    setVyhodnotenie(false);
    setIndex(0);
    setSpravne(0);
  };

  const fetchDat = async (url) => {
    setCakanie(false);
    setNacitanie(true);
    const odpoved = await fetch(url);
    const { results } = await odpoved.json();
    if (results.length > 0) {
      setCakanie(false);
      setNacitanie(false);
      setOtazky(results);
    } else {
      setCakanie(true);
      setNacitanie(false);
      setError(true);
    }
  };

  return (
    <AppContext.Provider
      value={{
        otazky,
        cakanie,
        nacitanie,
        error,
        reset,
        handleFormy,
        handleZmeny,
        index,
        spravne,
        dalsiaOtazka,
        spravnaOdpoved,
        vyhodnotenie,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
