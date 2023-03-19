import { Card, Grid, Table, TableRow, Typography } from "@material-ui/core";
import Optiplay from "../../assets/images/optiPlay.svg";
import Raillogo from "../../assets/images/Indian-Railways.svg";
import InnobitSystemsLogo from "../../assets/images/innobit_systems.svg";

export const SetupMain = () => {
  return (
    <>
      <Grid style={{background:'#ffffff',height:'100%',borderRadius: '10px'}}>
        <Grid item xs={8} style={{margin:'auto',height:'100%'}}>
          <Card style={{boxShadow:'none',padding:'30px',position:'relative',height:'100%'}}>
            <Grid container style={{justifyContent:'center',marginTop:'50px',marginBottom:'9%'}}>
              <Typography style={{ textAlign: "center", fontSize: "24px", fontFamily: "Roboto",textTransform:'capitalize' }}>
                Select a menu item to explore more options
              </Typography>
            </Grid>
            <Grid container spacing={4} style={{justifyContent:'center',marginBottom:'8%'}}>
              <Grid item xs={2} md={4} lg={3}>
                <img src={Optiplay} className="optistyle opti-dimensions" />
              </Grid>
              <Grid item xs={2} md={4} lg={3}>
                <img src={Raillogo} className="railstyle" />
              </Grid>
            </Grid>
            <Grid container style={{justifyContent:'center'}}>
              <Typography style={{ textAlign: "center", fontSize: "28px", fontFamily: "Roboto", textTransform: "capitalize", marginBottom : "16%" }}>
               <b> INTEGRATED PASSENGER INFORMATION SYSTEM</b>
              </Typography>
            </Grid>
            <Grid container style={{justifyContent:'center',position:'absolute',bottom:'0px',marginBottom:'2%'}}>
              <Grid item xs={2} md={2} lg={1} xl={1}>
                <img src={InnobitSystemsLogo} className="image-dimensions"/>
              </Grid>
              <Grid item xs={4} md={4} lg={4} xl={4} style={{alignSelf:'center'}}>
                <Typography style={{ fontSize: "12px", fontFamily: "Roboto" }}>
                <b>  POWERED BY INNOBIT SYSTEMS</b>
                </Typography>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
      {/* <Grid>
        <Card style={{padding:"9.5% 29.85% 1% 29.85%" , margin:"0px 10px"}}>
          <Grid>
            <Typography
              style={{
                textAlign: "center",
                fontSize: "24px",
                fontFamily: "Roboto",
              }}
            >
              Select a menu item to explore more options
            </Typography>
          </Grid>
          <Grid style={{paddingTop:"11.15%"}} >
            <Table>
              <TableRow>
                <img src={Optiplay} className="optistyle" />
                <img src={Raillogo} className="railstyle" />
              </TableRow>
            </Table>
          </Grid>
          <Grid>
            <Typography
              style={{
                textAlign: "center",
                fontSize: "21px",
                fontFamily: "Roboto",
                textTransform: "capitalize",
                paddingTop:"8.1%"
              }}
            >
              INTEGRATED PASSENGER INFORMATION SYSTEM
            </Typography>
          </Grid>
          <Grid container style={{ alignItems: "center",textAlign:"center" ,display:"flex",justifyContent:"center" ,paddingTop:"36.9%"}}>
              <img src={InnobitSystemsLogo} />
              <Typography style={{ fontSize: "12px", paddingLeft: "10px",fontFamily:"Roboto" }}>
                POWERED BY INNOBIT SYSTEMS
              </Typography>
          </Grid>
        </Card>
      </Grid> */}
    </>
  );
};
