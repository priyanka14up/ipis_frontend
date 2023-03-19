import React, { FunctionComponent, useState, MutableRefObject, useEffect } from "react";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import hindi from "simple-keyboard-layouts/build/layouts/hindi";
import bengali from "simple-keyboard-layouts/build/layouts/bengali";
interface IProps {
  onChange: (input: string) => void;
  keyboardRef: MutableRefObject<any>;
}


const KeyboardWrapper: FunctionComponent<IProps> = ({
    onChange,
    keyboardRef,
}) => {
    const [layoutName, setLayoutName] = useState("default");


    let keyboard = (Keyboard as typeof Keyboard)({
        onChange: (input: any) => onChange(input),
        onKeyPress: (button:any) => onKeyPress(button),
        // ...keyboardRef,
        // ...english,
        ...bengali
      });



    const onKeyPress = (button: string) => {
        // keyboard.setOptions({
        //     layoutName: layoutName,
        // });
        //             keyboard.setInput(value);

        if (button === "{shift}" || button === "{lock}") {
            // const currentLayout = keyboard?.options?.layoutName;
            setLayoutName(layoutName == "default" ? "shift" : "default");
            // keyboard.setOptions({
            //     layoutName: layoutName,
            // });
            
        }
    };

  return (
      <>
      <Keyboard
        keyboardRef={r => (keyboardRef.current = r)}
        layoutName={layoutName}
        onChange={onChange}
        onKeyPress={onKeyPress}
        // onRender={() => console.log("Rendered")}
      />
    {keyboard}
    </>
  );
};

export default KeyboardWrapper;
