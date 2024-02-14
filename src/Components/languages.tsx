import { useContext, useEffect, useState } from "react";
import { MyContext } from "./myContext";
import x from "../icons/x.png";
import search from "../icons/search.png"
import axios from "axios";
import "../Components/css/languages.css";
type propp = {
  setPopUp: (value: boolean) => void;
  setSourceLang: (value: string) => void;
  setLanguageName: (value: string) => void;
};

type filLang = {
  filLang: string;
  language: string;
};

type filterMap={
  language:string
  value:string
  code:string
}
export default function Languages({
  setPopUp,
  setLanguageName,
  setSourceLang,
}: propp) {
  const [fil, setFil] = useState<any>([]);
  const [inputValue, setInputValue] = useState([]);
  const { languages, setLanguages } = useContext(MyContext);

  useEffect(() => {
    allLnaguages();
  }, []);

  function popUpOff() {
    return setPopUp(false);
  }

  async function allLnaguages() {
    const options = {
      method: "GET",
      url: "https://google-translate113.p.rapidapi.com/api/v1/translator/support-languages",
      headers: {
        "X-RapidAPI-Key": "66214e58cfmsh2a6c7e304eda1fap1a6507jsn69bb7c954a11",
        "X-RapidAPI-Host": "google-translate113.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      setLanguages(response.data);

      setFil(response.data);
      //filtering
      //       const filterLanguage= await languages.filter((filLang)=>{
      // return filLang
      //       })
      console.log(fil, "all");
    } catch (error) {
      console.error(error);
    }
  }

  function filter(value: string) {
    const filterLanguage = fil.filter((filLang: filLang) => {
      return filLang.language.toLowerCase().includes(value);
    });

    setInputValue(filterLanguage);
    console.log(filterLanguage, "filterlanguage");
  }

  console.log(inputValue, "innn");
  async function onChange(event: React.FormEvent<HTMLInputElement>) {
    return filter((event.target as HTMLInputElement).value);
  }
  // filter map function for displaying filter option
  const filterValuMap = inputValue.map((value:filterMap) => {
    
    return (
      <div className="lan-name-div">
        <p onClick={sourceLanSetter} data-value={value.code}>{value.language}</p>
      </div>
    );
  });

  function sourceLanSetter(e: any) {
    setSourceLang(e.target.getAttribute("data-value"));
    setLanguageName(e.target.textContent);
    setPopUp(false);
  }
  const lanArrayOne = languages.slice(0, 46);
  const lanArrayTwo = languages.slice(47, 92);
  const lanArrayThree = languages.slice(93);

  const allLanOne = lanArrayOne.map((lan: any) => {
    return (
      <p onClick={sourceLanSetter} data-value={lan.code}>
        {" "}
        {lan.language}
      </p>
    );
  });
  const allLanTwo = lanArrayTwo.map((lan: any) => {
    return (
      <p onClick={sourceLanSetter} data-value={lan.code}>
        {lan.language}
      </p>
    );
  });
  const allLanThree = lanArrayThree.map((lan: any) => {
    return (
      <p onClick={sourceLanSetter} data-value={lan.code}>
        {lan.language}
      </p>
    );
  });
  return (
    <div>
      <section className="lan-sec">
        <div className="filter-div">
          <input type="text" onChange={onChange} placeholder="Translate from" />
          <img src={search} alt="" className="search-icon"/>
          {/* <button className="search-btn">Search</button> */}
          <img src={x} className="x-icon" alt="" onClick={popUpOff} />
        </div>
        <div className="languages-div">
          {" "}
          {inputValue.length > 0 ? ( <div >{filterValuMap}</div>
            
          ) : (
            <div className="lan-name-div">{allLanOne}</div>
          )}
          {inputValue.length > 0 ? "" :(<div className="lan-name-div">{allLanTwo}</div>)}
          {inputValue.length > 0 ? "" :( <div className="lan-name-div">{allLanThree}</div>)}
         
        </div>
      </section>
    </div>
  );
}
