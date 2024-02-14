import { useState } from "react";
import axios from "axios";
import "../Components/css/homePage.css";
import Languages from "./languages";
import TargetLanguage from"./targetLanguagePop"
import microphone from "../icons/microphone.png"
// import { type } from "@testing-library/user-event/dist/type";

import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

// import { Dispatch, SetStateAction } from "react";

export default function HomePage() {
  const [sourceLang, setSourceLang] = useState<string>("");
  const [targetLang, setTargetLang] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>("");
  const [languageName, setLanguageName] = useState<string>("");
  const [targetLanguageName, setTargetLanguageName] = useState<string>("");
  const [popUp, setPopUp] = useState<boolean | IProps>(false);
  const [targetLangPopUp, setTargetLangPopUp] = useState<boolean | TargetLangPopUpProps>(false);

  const [translatedValue, setTranslatedValue] = useState<string>("");

  type IProps = {
    popUp: boolean;
    setPopUp?: (value: boolean) => void;
  };
  type TargetLangPopUpProps = {
    targetLangPopUp: boolean;
    setTargetLangPopUp?: (value: boolean) => void;
  };
  // type sourceLanProp = {
  //   sourceLang: string;
  //   setSourceLang: (value: string) => void;
  // };
  //   interface IProps {
  //     sourceLang: string;
  //     setSourceLang?: Dispatch<SetStateAction<string>>;
  //   }

  const { transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition } = useSpeechRecognition();
  function OnChangeSourceLang(event: React.ChangeEvent<HTMLSelectElement>) {
    setSourceLang(event.target.value);
  }
  console.log(sourceLang, "source");
  function OnChangeTargetLang(event: React.ChangeEvent<HTMLSelectElement>) {
    setTargetLang(event.target.value);
  }

  function PopUp() {
    return setPopUp(true);
  }

  function targetLangPopUpp(){
    return setTargetLangPopUp(true)
  }

  //   async function detectLang(){

  //     const encodedParams = new URLSearchParams();
  //     encodedParams.set('text', `${inputValue}`);

  //     const options = {
  //       method: 'POST',
  //       url: 'https://google-translate113.p.rapidapi.com/api/v1/translator/detect-language',
  //       headers: {
  //         'content-type': 'application/x-www-form-urlencoded',
  //         'X-RapidAPI-Key': '66214e58cfmsh2a6c7e304eda1fap1a6507jsn69bb7c954a11',
  //         'X-RapidAPI-Host': 'google-translate113.p.rapidapi.com'
  //       },
  //       data: encodedParams,
  //     };

  //     try {
  //         const response = await axios.request(options);
  //         console.log(response.data,"detech language");
  //     } catch (error) {
  //         console.error(error);
  //     }
  //   }

  function onChangeInputValue(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setInputValue(event.target.value);
    // detectLang()
  }
  console.log(inputValue, "input");
  async function translate() {
    const encodedParams = new URLSearchParams();
    encodedParams.set("q", `${transcript}`);
    encodedParams.set("target", `${targetLang}`);
    encodedParams.set("source", `${sourceLang}`);

    const options = {
      method: "POST",
      url: "https://google-translate1.p.rapidapi.com/language/translate/v2",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "Accept-Encoding": "application/gzip",
        "X-RapidAPI-Key": "b9076a1794msh0313b8f4ae9404fp1b23a5jsnfb26084b05be",
        "X-RapidAPI-Host": "google-translate1.p.rapidapi.com",
      },
      data: encodedParams,
    };

    try {
      const response = await axios.request(options);
      setTranslatedValue(response.data.data.translations[0].translatedText);
    } catch (error) {
      console.error(error);
    }
  }

  function startListening(){
    return SpeechRecognition.startListening()
  }

  function stopListening(){
    return SpeechRecognition.stopListening
  }
  // console.log(sourceLang,"source")
  return (
    <div className="main-div">
      <div>
        <h1>Lets Translate</h1>
      </div>
      <section className="main-sec">
        <div className="mm">
          <div className="translate-div">
            <div>
              <select
                onClick={PopUp}
                name="source-lang"
                id="source-lang"
                onChange={OnChangeSourceLang}
              >
                {sourceLang.length > 1 ? (
                  <option disabled={true} value="">
                    {languageName}
                  </option>
                ) : (
                  <option value="">Detect Language</option>
                )}

                {/* <option value="Select">Select Language</option>
              <option value="en">English</option>
              <option value="es">Spanish</option> */}
              </select>
            </div>
            <div>
              <textarea
                name={transcript}
                value={transcript}
                id=""
                placeholder="Enter Text"
                onChange={onChangeInputValue}
              ></textarea>
{/* <p>yes:{transcript}</p> */}
<img src={microphone} alt="" className="microphone-img" onClick={startListening} />
              {/* <button onClick={startListening}>listening</button> */}
              {/* <button onClick={()=>{SpeechRecognition.stopListening()}}>stop</button> */}
            </div>
          </div>
          <div className="translate-div">
            {" "}
            <div>
              <select
                name="source-lang"
                id="source-lang"
                onChange={OnChangeTargetLang}
                onClick={targetLangPopUpp}
              >
                {targetLang.length > 1 ? (
                  <option disabled={true} value="">
                    {targetLanguageName}
                  </option>
                ) : (
                  <option value="">Detect Language</option>
                )}
                {/* <option value="Select">Select Language</option>
                <option value="en">English</option>
                <option value="es">Spanish</option> */}
              </select>
            </div>
            <div>
              <textarea
                name=""
                id="translated-textarea"
                placeholder="Translation"
                value={translatedValue}
              >
                {translatedValue}
              </textarea>
            </div>
          </div>
        </div>
        <div>
          {" "}
          <button className="translate-btn" onClick={translate}>
            Translate
          </button>
        </div>
      </section>
      <div className="main-div-lan">
        {" "}
        {popUp ? (
          <Languages
            setPopUp={setPopUp}
            setLanguageName={setLanguageName}
            setSourceLang={setSourceLang}
          />
        ) : (
          ""
        )}
      </div>
      <div className="main-div-lan">
        {" "}
        {targetLangPopUp ? (
          <TargetLanguage
          setTargetLangPopUp={setTargetLangPopUp}
            setTargetLanguageName={setTargetLanguageName}
            setTargetLang={setTargetLang}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
