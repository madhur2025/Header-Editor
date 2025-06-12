import { useEffect, useState } from "react";
import TextEdit from "../components/TextEditor";
import ButtonStyleEditor from "../components/ButtonEditor";

export default function AddImage() {
    const [bgColor, setBgColor] = useState("#ffffff");
    const [image, setImage] = useState(null);
    const [img, setImg] = useState("");
    const [visible, setVisible] = useState("brightness(1)");
    const [cheight, setcheight] = useState("550");
    const [showBtn, setShowBtn] = useState(false);
    const [buttonPosition, setButtonPosition] = useState("center");
    const [buttonText, setButtonText] = useState("Get ready for blog");
    const [isEditingText, setIsEditingText] = useState(false);

    const [textColor, setTextColor] = useState("#000000");
    const [buttonBgColor, setButtonBgColor] = useState("#ffffff");
    const [isBold, setIsBold] = useState(false);
    const [link, setLink] = useState("");
    const [showStyleEditor, setShowStyleEditor] = useState(false);

    useEffect(() => {
        const imageURL = image ? URL.createObjectURL(image) : "";
        setImg(imageURL);
    }, [image]);

    const handleVisible = () => { setVisible((prev) => prev === "brightness(1)" ? "brightness(0.5)" : "brightness(1)" );};
    const handlebtn = () => setShowBtn((prev) => !prev);

    return (
        <div className="w-full p-6 bg-gray-300 min-h-screen">
            <div style={{ backgroundColor: bgColor, height: Number(cheight) }} className="relative flex justify-center items-center rounded-2xl bg-white shadow-lg transition-all duration-500 ease-in-out overflow-hidden">
            
            {img && ( <img src={img} alt="background" style={{ filter: visible }} className="absolute w-full h-full object-cover"/>)}

                <div className="flex flex-col items-center text-center z-10">
                    <TextEdit />
                    {showBtn && (
                        <div className={`flex flex-col items-center ${getJustifyClass(buttonPosition)} w-full`}>
                            {showStyleEditor && (
                                <ButtonStyleEditor
                                    textColor={textColor}
                                    setTextColor={setTextColor}
                                    bgColor={buttonBgColor}
                                    setBgColor={setButtonBgColor}
                                    isBold={isBold}
                                    setIsBold={setIsBold}
                                    link={link}
                                    setLink={setLink}
                                    buttonText={buttonText}
                                    setButtonText={setButtonText}
                                    isEditingText={isEditingText}
                                    setIsEditingText={setIsEditingText}
                                    buttonPosition={buttonPosition}
                                    setButtonPosition={setButtonPosition}
                                />
                            )}

                            <a href={link || "#"} target="_blank" rel="noopener noreferrer"
                                onClick={(e) => { if (!link) e.preventDefault(); setIsEditingText(true); setShowStyleEditor((prev) => !prev); }}
                                className={`py-2 px-4 mt-4 rounded-lg shadow-md transition-all ease-in-out duration-500 hover:scale-105 hover:bg-transparent hover:text-white hover:border ${isBold ? "font-bold" : "font-normal"}`}
                                style={{ backgroundColor: buttonBgColor, color: textColor, border: "1px solid transparent", }}>
                                {buttonText}
                            </a>
                        </div>
                    )}
                </div>

                <div className="absolute left-0 bottom-0 h-10 hover:h-58 w-33 flex flex-col gap-y-3 mb-2 ml-2 overflow-hidden transition-all ease-in-out duration-500 z-20">

                    <button onClick={handleVisible} className={buttonStyle}>Set Visibility</button>

                    <label htmlFor="bgcolor" className={labelStyle}> Set Color</label>
                    <input id="bgcolor" type="color" className="hidden" onChange={(e) => setBgColor(e.target.value)} />

                    <button onClick={() => setBgColor("")} className={buttonStyle}>Remove Color</button>

                    <label htmlFor="imgip" className={labelStyle}> Set Image </label>
                    <input id="imgip" type="file" accept="image/*" className="hidden" onChange={(e) => setImage(e.target.files[0])} />

                    <button onClick={() => setImage("")} className={buttonStyle}> Remove Image </button>

                </div>

                <div className="absolute left-35 bottom-0 m-2 h-10 gap-x-3 flex justify-between z-20">

                    <button onClick={handlebtn} className={buttonStyle2}>{showBtn ? "➖" : "➕"} Button</button>

                    <select className="px-2 text-blue-900 py-2 h-full rounded-xl bg-gray-200 hover:bg-gray-300 text-sm font-medium transition" onChange={(e) => setcheight(e.target.value)} >
                        <option value="550">📏 Full</option>
                        <option value="270">📏 Half</option>
                        <option value="400">📏 Mid</option>
                    </select>

                </div>

            </div>
        </div>
    );
}

const labelStyle = "text-blue-900 px-4 py-2 rounded-xl font-semibold shadow hover:bg-gray-300 cursor-pointer text-sm text-center bg-gray-200 w-32";
const buttonStyle = "text-sm w-32 bg-gray-200 px-4 py-2 rounded-xl font-semibold shadow hover:bg-gray-300 transition text-blue-900";
const buttonStyle2 = "text-sm bg-gray-200 px-4 py-2 rounded-xl font-semibold shadow hover:bg-gray-300 transition text-blue-900";

function getJustifyClass(pos) {
    return pos === "left"
        ? "justify-start"
        : pos === "right"
            ? "justify-end"
            : "justify-center";
}