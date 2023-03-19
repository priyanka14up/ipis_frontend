import { Button, Card, Checkbox, FormControlLabel, Grid, Radio, RadioGroup, TextField, Typography } from "@material-ui/core"
import DoneIcon from "@material-ui/icons/Done";
import CloseIcon from "@material-ui/icons/Close";
import { useState } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import { useSelector } from "react-redux";
import { authuserStateSelector } from "../../../../../redux/reducers/authUser/authUser";

export const PDBConfig=()=>{
   
    const [Input, setInput] = useState({
      selectPlatform:"",
      ip1:"",
      ip2:"",
      ip3:"",
      ip4:"",
      check:"",
      pdbName:"",
    });
  
    const { appUser } = useSelector(authuserStateSelector)
    const handleChange = (e: any) => {
        var { name, value } = e.target;
        if (name == "ipAddress4" && value.match(/^[\d]{0,3}$/i)){
        setInput({ ...Input, [name]: value });
    }
    else if(name!="ipAddress4"){
      setInput({ ...Input, [name]: value });
    }

      };
    
      const handleSubmit = () => {
          let pdb: any = {
            ip1: Input.ip1,
            ip2: Input.ip2,
            ip3: Input.ip3,
            ip4: Input.ip4,
            pdbName : Input.pdbName,
            selectPlatform: Input.selectPlatform,
            check: Input.check,
          };
          console.log(pdb)
        };
      const handleDelete =() => {};
return(
    <>
    <Grid item xs={12}>
        <Card className="pdbCard" style={{ height:"450px" }}>
              <Typography className="pdbHed">
                <b>Configuration Settings</b>
              </Typography>
              <Grid container style={{ paddingTop: "14px" }}>
                <Grid item xs={5} className="pdbSubHed">
                  Platform Display Board IP Address
                </Grid>
                <Grid item xs={7}>
                  <Grid className="pdbIpGrid">
                    <TextField className="ipboxstyle mr-10" variant="outlined" name="ip1"  onChange={handleChange}/>
                    <TextField className="ipboxstyle mr-10" variant="outlined" name="ip2"  onChange={handleChange}/>
                    <TextField className="ipboxstyle mr-10" variant="outlined" name="ip3"  onChange={handleChange}/>
                    <TextField className="ipboxstyle" variant="outlined" name="ip4"  onChange={handleChange}/>
                  </Grid>
                </Grid>
               
                <Grid item xs={5} className="pdbSubHed">
                  Platform Display Board Name
                </Grid>
                <Grid item xs={7}>
                  <TextField name="pdbName" size="small" className="ivdBoxstyle" variant="outlined" onChange={handleChange} />
                </Grid>
                <Grid item xs={5} className="pdbSubHed">
                  Board Type
                </Grid>
                <Grid item xs={7}>
                  <select name="selectPlatform" className="selectfield">
                    <option value="1">1</option>
                    <option value="2">2 </option>
                    <option value="3">both</option>
                  </select>
                </Grid>
                
                <Grid item xs={5} className="pdbSubHed">
                  Selected Platform
                </Grid>
                <Grid item xs={7}>
                  <select name="selectPlatform" className="selectfieldPlt">
                    <option value="0">Select</option>
                    <option value="1">1</option>
                    <option value="2">2 </option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                  </select>
                  <select name="selectPlatform" className="selectfieldPlt ml-10">
                    <option value="0">Select</option>
                    <option value="1">1</option>
                    <option value="2">2 </option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                  </select>
                </Grid>
              </Grid>
              {appUser.userRole == "ROLE_STATION MASTER" ? <></> :
              <div style={{ paddingTop: "8.59%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Button onClick={handleSubmit} type="submit" className="coachSaveBtn" variant="outlined">
                  <DoneIcon className="SaveIcon" style={{ display: "inherit" }}/>
                    Save
                </Button>
                <Button type="reset" value="Reset" onClick={() => window.location.reload()} variant="outlined" className="coachCancelBtn">
                  <CloseIcon className="clearIcon" />
                    Cancel
                </Button>
                <Button onClick={handleDelete} type="submit" variant="outlined" className="coachDeleteBtn">
                  <DeleteIcon className="deleteIcon" />
                    Delete
                </Button>
              </div>
}
            </Card>
    </Grid>
    </>
  )
}


