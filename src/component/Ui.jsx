import React, { useState } from 'react'

function Ui() {

    const [inputText, setInputText] = useState("");
    const [translateFrom, setTranslateFrom] = useState("en-GB");
    const [translateTo, setTranslateTo] = useState("hi-IN");
    const [translatedText, setTranslatedText] = useState("");
    const [loading, setLoading] = useState(false);

    const languages = {
        "am-ET": "Amharic",
        "ar-SA": "Arabic",
        "be-BY": "Bielarus",
        "bem-ZM": "Bemba",
        "bi-VU": "Bislama",
        "bjs-BB": "Bajan",
        "bn-IN": "Bengali",
        "bo-CN": "Tibetan",
        "br-FR": "Breton",
        "bs-BA": "Bosnian",
        "ca-ES": "Catalan",
        "cop-EG": "Coptic",
        "cs-CZ": "Czech",
        "cy-GB": "Welsh",
        "da-DK": "Danish",
        "dz-BT": "Dzongkha",
        "de-DE": "German",
        "dv-MV": "Maldivian",
        "el-GR": "Greek",
        "en-GB": "English",
        "es-ES": "Spanish",
        "et-EE": "Estonian",
        "eu-ES": "Basque",
        "fa-IR": "Persian",
        "fi-FI": "Finnish",
        "fn-FNG": "Fanagalo",
        "fo-FO": "Faroese",
        "fr-FR": "French",
        "gl-ES": "Galician",
        "gu-IN": "Gujarati",
        "ha-NE": "Hausa",
        "he-IL": "Hebrew",
        "hi-IN": "Hindi",
        "hr-HR": "Croatian",
        "hu-HU": "Hungarian",
        "id-ID": "Indonesian",
        "is-IS": "Icelandic",
        "it-IT": "Italian",
        "ja-JP": "Japanese",
        "kk-KZ": "Kazakh",
        "km-KM": "Khmer",
        "kn-IN": "Kannada",
        "ko-KR": "Korean",
        "ku-TR": "Kurdish",
        "ky-KG": "Kyrgyz",
        "la-VA": "Latin",
        "lo-LA": "Lao",
        "lv-LV": "Latvian",
        "men-SL": "Mende",
        "mg-MG": "Malagasy",
        "mi-NZ": "Maori",
        "ms-MY": "Malay",
        "mt-MT": "Maltese",
        "my-MM": "Burmese",
        "ne-NP": "Nepali",
        "niu-NU": "Niuean",
        "nl-NL": "Dutch",
        "no-NO": "Norwegian",
        "ny-MW": "Nyanja",
        "ur-PK": "Pakistani",
        "pau-PW": "Palauan",
        "pa-IN": "Panjabi",
        "ps-PK": "Pashto",
        "pis-SB": "Pijin",
        "pl-PL": "Polish",
        "pt-PT": "Portuguese",
        "rn-BI": "Kirundi",
        "ro-RO": "Romanian",
        "ru-RU": "Russian",
        "sg-CF": "Sango",
        "si-LK": "Sinhala",
        "sk-SK": "Slovak",
        "sm-WS": "Samoan",
        "sn-ZW": "Shona",
        "so-SO": "Somali",
        "sq-AL": "Albanian",
        "sr-RS": "Serbian",
        "sv-SE": "Swedish",
        "sw-SZ": "Swahili",
        "ta-LK": "Tamil",
        "te-IN": "Telugu",
        "tet-TL": "Tetum",
        "tg-TJ": "Tajik",
        "th-TH": "Thai",
        "ti-TI": "Tigrinya",
        "tk-TM": "Turkmen",
        "tl-PH": "Tagalog",
        "tn-BW": "Tswana",
        "to-TO": "Tongan",
        "tr-TR": "Turkish",
        "uk-UA": "Ukrainian",
        "uz-UZ": "Uzbek",
        "vi-VN": "Vietnamese",
        "wo-SN": "Wolof",
        "xh-ZA": "Xhosa",
        "yi-YD": "Yiddish",
        "zu-ZA": "Zulu"
    }

    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        if (translatedText.trim() !== "") {
            navigator.clipboard.writeText(translatedText);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        }
    };

    const swap = () => {
        setTranslateFrom(translateTo)
        setTranslateTo(translateFrom)
        setInputText(translatedText)
        setTranslatedText(inputText)
    }

    const translate = async () => {
        if (!inputText.trim()) return;

        setLoading(true);
        setTranslatedText("");

        const url = `https://api.mymemory.translated.net/get?q=${inputText}&langpair=${translateFrom}|${translateTo}`;

        try {
            const res = await fetch(url);
            const data = await res.json();
            setTranslatedText(data.responseData.translatedText);
        } catch (error) {
            setTranslatedText("⚠️ Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };
    return (
        <>
            <main className="w-full max-w-6xl flex-1 px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col gap-4 rounded-xl bg-card-light dark:bg-card-dark shadow-soft-lg border border-border-light dark:border-border-dark overflow-hidden">
                    {/*<!-- Language Selector Panel -->*/}
                    <div className="flex flex-col md:flex-row items-center justify-between border-b border-border-light dark:border-border-dark px-4 py-3 gap-2">
                        <div className="flex flex-1 w-full items-center gap-2">
                            <select
                                className="bg-transparent border border-border-light dark:border-border-dark rounded-lg px-4 py-2 text-sm text-subtext-light dark:text-subtext-dark focus:outline-none hover:border-primary cursor-pointer"
                                value={translateFrom}
                                onChange={(e) => setTranslateFrom(e.target.value)}
                            >
                                {Object.entries(languages).map(([code, name]) => (
                                    <option key={code} value={code}>
                                        {name}
                                    </option>
                                ))}
                            </select>

                        </div>
                        <div className="shrink-0 px-2">
                            <button aria-label="Swap languages" className="flex items-center justify-center size-10 rounded-full text-subtext-light dark:text-subtext-dark hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                            onClick={swap}>
                                <span className="material-symbols-outlined">swap_horiz</span>
                            </button>
                        </div>
                        <div className="flex flex-1 w-full items-center justify-end">
                            <select
                                className="bg-transparent border border-border-light dark:border-border-dark rounded-lg px-4 py-2 text-sm text-subtext-light dark:text-subtext-dark focus:outline-none hover:border-primary cursor-pointer"
                                value={translateTo}
                                onChange={(e) => setTranslateFrom(e.target.value)}
                            >
                                {Object.entries(languages).map(([code, name]) => (
                                    <option key={code} value={code}>
                                        {name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/*<!-- Text Areas -->*/}

                    <div className="grid grid-cols-1 md:grid-cols-2">
                        {/*<!-- Source Text Area -->*/}
                        <div className="relative flex flex-col p-4 md:border-r border-border-light dark:border-border-dark">
                            <textarea
                                className="flex-1 w-full resize-none bg-transparent focus:outline-0 p-2 text-base md:text-lg placeholder:text-subtext-light dark:placeholder:text-subtext-dark min-h-[150px] md:min-h-[250px]"
                                placeholder="Enter text here..."
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                            ></textarea>

                            <div className="flex items-center justify-between mt-2">
                                <div className="flex items-center gap-2">

                                    <button aria-label="Clear text" className="flex items-center justify-center size-10 rounded-full text-subtext-light dark:text-subtext-dark hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                        onClick={(e) => setInputText("")}>
                                        <span className="material-symbols-outlined">close</span>
                                    </button>
                                </div>
                                
                            </div>
                        </div>

                        {/* <!-- Translated Text Area --> */}
                        <div className="relative flex flex-col p-4 bg-gray-50 dark:bg-black/20 md:rounded-r-xl">
                            <div className="flex-1 w-full resize-none p-2 text-lg min-h-[250px] text-subtext-light dark:text-subtext-dark">{translatedText.length ? translatedText : "Translation will appear here."}</div>
                            <div className="flex items-center justify-end mt-2">
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={handleCopy}
                                        className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition ${copied ? "bg-green-500 text-white" : "bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"} ` } >
                                        <span className="material-symbols-outlined text-base">
                                            {copied ? "check" : "content_copy"}
                                        </span>
                                        {copied ? "Copied!" : "Copy"}
                                    </button>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* <!-- Translate Button --> */}
                <div className="flex py-6 justify-center">
                    <button
                        onClick={translate}
                        disabled={loading}
                        className={`flex min-w-[180px] cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-full h-14 px-8 text-lg font-bold leading-normal tracking-[0.015em] shadow-lg transition-all transform ${loading
                            ? "bg-primary/60 text-white shadow-primary/20 cursor-not-allowed animate-pulse"
                            : "bg-primary text-white shadow-primary/30 hover:bg-primary/90 hover:scale-105"
                            }`}
                    >
                        <span className="material-symbols-outlined">translate</span>
                        <span className="truncate">
                            {loading ? "Translating..." : "Translate"}
                        </span>
                    </button>
                </div>
            </main>
        </>
    )
}

export default Ui
