import { Button, Card, Grid, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import DoneIcon from "@material-ui/icons/Done";
import CloseIcon from "@material-ui/icons/Close";
import EnableDisableModel from "../../model/setup/enableDisable";
import SetupService from "../service/setup/setup";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { authuserStateSelector } from "../../redux/reducers/authUser/authUser";

const setup = new SetupService();

export const EnableDisable = (props: any) => {
  const { appUser } = useSelector(authuserStateSelector)
  const [enableDisableError, setEnableDisableError] = useState("");
  const [enableDisable, setEnableDisable] = useState<EnableDisableModel | any>({
    id: 0,
    mldb: "",
    pfdb: "",
    agdb: "",
    cgdb: "",
    pa: "",
    ivdDisplay: "",
    ovdDisplay: "",
    tvDisplay: "",
  });

  const handleChange = (e: any) => {
    var { name, value } = e.target;
    setEnableDisable({ ...enableDisable, [name]: value });
    console.log({ [name]: value })

  };
  useEffect(() => {
    if (props.stationData) {
      getEnableDisableData();
    }
    else {
      Swal.fire({
        position: "center",
        icon: "warning",
        title: "Please Enter Station Details",
        showConfirmButton: false,
        allowOutsideClick: false,
        timer: 3000
      })
        .then(() => {
          props.updateSelectedSideBarMenu("setupMain");
        })
    }
  }, [])

  const getEnableDisableData = () => {
    setup.getEnableDisable().then(resp => {
      if (resp && resp.data && resp.data[0]) {
        setEnableDisable(resp.data[0])
        console.log(resp.data[0])
      }
    })
  }


  const handleSubmit = () => {
    setup.createEnableDisable(enableDisable).then(data => {
      if (data.status === 200 && data.data) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: `Data Saved Successfully`,
          showConfirmButton: false,
          allowOutsideClick: false,
          timer: 3000,
        }).then((willSubmitted) => {
          if (willSubmitted) {
            setEnableDisable(data.data);
          }
        })
        setEnableDisableError("")

      }
      else {
        setEnableDisableError(data.errorMsg);
      }
    }

    )
  };

  const handleCancel = () => {
    setEnableDisable({
      mldb: "",
      pfdb: "",
      agdb: "",
      cgdb: "",
      pa: "",
      ivdDisplay: "",
      ovdDisplay: "",
      tvDisplay: "",
    });
    setEnableDisableError("")
  }

  return (
    <>
      <Grid className="enableDisableGridStyle">
        <Grid item xs={8} style={{ margin: 'auto', height: '100%' }}>
          <Card style={{ padding: "30px", borderRadius: "10px" }} className={appUser.userRole == "ROLE_STATION MASTER" ? "overlapBackground  enableDisableCardStyle" : " enableDisableCardStyle"}>
            {appUser.userRole == "ROLE_STATION MASTER" ? <Grid className="stationForm formFields">

            </Grid> : <></>
            }
            <Grid container className="mb-25">
              <Typography className="txt">
                <strong>Enable/ Disable Display Boards</strong>
              </Typography>
            </Grid>
            <Grid container className="edRow mb-20">
              <Grid item xs={6} lg={5} xl={6} className="EDtext pr-32">
                Multi Line Display Board
              </Grid>
              <Grid item xs={6} lg={7} xl={6}>
                <select
                  onChange={handleChange}
                  name="mldb"
                  required={true}
                  className="selectstyle"
                  value={enableDisable?.mldb}
                >
                  <option value="">Select</option>
                  <option value="enable">Enable</option>
                  <option value="disable">Disable</option>
                </select>
              </Grid>
            </Grid>
            <Grid container className="edRow mb-20">
              <Grid item xs={6} lg={5} xl={6} className="EDtext pr-32">
                Platform Display Board
              </Grid>
              <Grid item xs={6} lg={7} xl={6}>
                <select value={enableDisable?.pfdb}
                  onChange={handleChange}
                  name="pfdb"
                  required={true}
                  className="selectstyle"
                >
                  <option value="">Select</option>
                  <option value="enable">Enable</option>
                  <option value="disable">Disable</option>
                </select>
              </Grid>
            </Grid>
            <Grid container className="edRow mb-20">
              <Grid item xs={6} lg={5} xl={6} className="EDtext pr-32">
                At a Glance Display Board
              </Grid>
              <Grid item xs={6} lg={7} xl={6}>
                <select value={enableDisable?.agdb}
                  onChange={handleChange}
                  name="agdb"
                  required={true}
                  className="selectstyle"
                >
                  <option value="">Select</option>
                  <option value="enable">Enable</option>
                  <option value="disable">Disable</option>
                </select>
              </Grid>
            </Grid>

            <Grid container className="edRow mb-20">
              <Grid item xs={6} lg={5} xl={6} className="EDtext pr-32">
                Coach Guidance Display Board
              </Grid>
              <Grid item xs={6} lg={7} xl={6}>
                <select value={enableDisable?.cgdb}
                  onChange={handleChange}
                  name="cgdb"
                  required={true}
                  className="selectstyle"
                >
                  <option value="">Select</option>
                  <option value="enable">Enable</option>
                  <option value="disable">Disable</option>
                </select>
              </Grid>
            </Grid>
            <Grid container className="edRow mb-20">
              <Grid item xs={6} lg={5} xl={6} className="EDtext pr-32">
                Public Announcement
              </Grid>
              <Grid item xs={6} lg={7} xl={6}>
                <select value={enableDisable?.pa}
                  onChange={handleChange}
                  name="pa"
                  required={true}
                  className="selectstyle"
                >
                  <option value="">Select</option>
                  <option value="enable">Enable</option>
                  <option value="disable">Disable</option>
                </select>
              </Grid>
            </Grid>
            <Grid container className="edRow mb-20">
              <Grid item xs={6} lg={5} xl={6} className="EDtext pr-32">
                In Video Display
              </Grid>
              <Grid item xs={6} lg={7} xl={6}>
                <select value={enableDisable?.ivdDisplay}
                  onChange={handleChange}
                  name="ivdDisplay"
                  required={true}
                  className="selectstyle"
                >
                  <option value="">Select</option>
                  <option value="enable">Enable</option>
                  <option value="disable">Disable</option>
                </select>
              </Grid>
            </Grid>
            <Grid container className="edRow mb-20">
              <Grid item xs={6} lg={5} xl={6} className="EDtext pr-32">
                Out Video Display
              </Grid>
              <Grid item xs={6} lg={7} xl={6}>
                <select value={enableDisable?.ovdDisplay}
                  onChange={handleChange}
                  name="ovdDisplay"
                  required={true}
                  className="selectstyle"
                >
                  <option value="">Select</option>
                  <option value="enable">Enable</option>
                  <option value="disable">Disable</option>
                </select>
              </Grid>
            </Grid>
            <Grid container className="edRow mb-20">
              <Grid item xs={6} lg={5} xl={6} className="EDtext pr-32">
                TV Display
              </Grid>
              <Grid item xs={6} lg={7} xl={6}>
                <select onChange={handleChange} value={enableDisable?.tvDisplay}
                  name="tvDisplay"
                  required={true}
                  className="selectstyle"
                >
                  <option value="">Select</option>
                  <option value="enable">Enable</option>
                  <option value="disable">Disable</option>
                </select>
              </Grid>
            </Grid>

            {appUser.userRole == "ROLE_STATION MASTER" ?
              <Grid></Grid> :
              <Grid>
                <Grid
                  container
                  style={{ justifyContent: "center", marginTop: '10px' }}
                  spacing={2}
                >
                  <Grid item xs={3} md={4} lg={3} xl={3}>
                    <Button
                      onClick={handleSubmit}
                      type="submit"
                      className="EDSave"
                      variant="contained"
                    >
                      <DoneIcon className="icon" />
                      <span className="bttnfont btn-font">Save</span>
                    </Button>
                  </Grid>
                  <Grid item xs={3} md={4} lg={3} xl={3}>
                    <Button
                      type="reset"
                      value="Reset"
                      onClick={handleCancel}
                      variant="outlined"
                      className="EDCancle"
                    >
                      <CloseIcon className="icon" />
                      <span className="bttnfont btn-font">Cancel</span>
                    </Button>
                  </Grid>

                </Grid>
                <Grid style={{marginTop:"15px"}}>
                  {enableDisableError != "" ? <div style={{ color: "red", textAlign: "center" }}> {enableDisableError}</div> : <></>}

                </Grid>
              </Grid>
            }

          </Card>
        </Grid>
      </Grid>
    </>
  );
};