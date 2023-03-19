import { SketchPicker } from "react-color"

export const ColorSketchPicker = ({ color, onChange, visible, setVisible, skpclass }: any) => {
    console.log(">>",skpclass)

    const closeHandler = (e: any) => {
        if(e.target.querySelector('.sketch-picker') == null){
            return;
        }
        else{
            setVisible(false);
        }
    };

    const styles: any = {
        cover: {
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
        },
        scndColor: {
            position: "absolute",
            left: "62%",
            bottom: "23%",
            zindex: "2",
        },
        frstColor: {
            position: "absolute",
            left: "22%",
            bottom: "33%",
            zindex: "2",
        }
    }

    const clsFL = (skpclass:any) => {
        if (skpclass == "frstColor") {
            return styles.frstColor
        }
        else if (skpclass == "scndColor") {
            return styles.scndColor
        }
    }
    return (
        <>
            {visible && (
                <div style={styles.cover} onClick={closeHandler}>
                    <div style={clsFL(skpclass)}>
                        <SketchPicker color={color} onChange={onChange} className={skpclass} />
                    </div>
                </div>
            )}
        </>
    )
}

