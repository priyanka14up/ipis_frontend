import { TextField, Typography } from "@material-ui/core"
import "./style.css";



export const Coach = (props: any)=>
{
return(
        <div id={props.key} style={{ padding: "9px 6px 9px 6px" }}>
            <Typography className="coachNo">
                C{props.number}
            </Typography>
            {/* <TextField  id={props.key} style ={{width:"35px",height:"20px",border:"1px solid black", margin:"5px",borderRadius:"5px"}} className ="coach" value={props.number+props.userCoach} variant="standard">
                {props.number+props.userCoach} 
            </TextField> */}
            <Typography  id={props.key} style ={{ width:"58px", height:"24px", border:"1px solid #033733", borderRadius:"5px", display: "flex", justifyContent: "center", alignItems: "center" }} className ="coach">
                <span className="coachBlock">{props.number+props.userCoach}</span>
            </Typography>
        </div>
    )
}   