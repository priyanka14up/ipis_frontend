import { Grid, Card, CardContent, Typography } from "@material-ui/core"
import { pdcPost, updatePdcChildDeviceName } from "../../../../../redux/actions/interface/interface";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { interfaceStateSelector } from "../../../../../redux/reducers/interface/interface";
import { PdcForm } from "./pdcForm";
import { SubPort } from "./subPort";
import { Cgdb } from "./cgdb/index";
import { Pfdb } from "./pfdb";
import { Mldbpdc } from "./mldb/index";
import { SelectDevice } from "../pdc/selectDevice";
import Human from "../../../../../assets/images/human.svg";
import Machine from "../../../../../assets/images/machine.svg";
import { IVDpdc } from "./ivd/index";
import { TVpdc } from "./tv/index";
import { Agdbpdc } from "./agdb/index";
import { authuserStateSelector } from "../../../../../redux/reducers/authUser/authUser";
export enum PdcAttatchedDevices {
	PDC_FORM = "pdc-form",
	PDC_SWITCH = "pdc-switch",
	CGDB = "cgdb",
	PFDB = "pfdb",
	MLDB = "mldb",
	IVD = 'ivd',
	TV = 'tvDisplay',
	AGDB = 'agdb'
};

export const Pdc = (props: any) => {
	const { selectedPortId, platformNumbers } = props;
	const { appUser } = useSelector(authuserStateSelector)
	const dispatch = useDispatch();
	const { currentSelectedPdcPortName, currentSelectedCdsPortNumber, currentSelectedPdcEthernetDevice } = useSelector(interfaceStateSelector);

	useEffect(() => {
		let data: any = {
			deviceName: PdcAttatchedDevices.PDC_FORM
		}
		dispatch(updatePdcChildDeviceName(data))
	}, [])

	return (
		<>
			{currentSelectedPdcEthernetDevice === PdcAttatchedDevices.PDC_FORM ? (<PdcForm platformNumbers={platformNumbers} />)
				:
				(<Grid>
					<Card style={{ padding: "10px", height: '100%',position:'relative' }}>
						<SubPort />
						{/* {appUser.userRole == "ROLE_STATION MASTER" ?
              <Grid style={{ color: "red", display: "flex", justifyContent: "center", fontSize: "22px" }}>*view only</Grid>
              : <></>
            } */}
						<Grid container style={{ paddingTop: "5px" }} >
							<Grid item xs={12}>
								<Grid container spacing={1}>
									<Grid item xs={3}>
										{(currentSelectedPdcPortName === '') ? (
											<Card className="pdbCard" style={{ height: "100%" }}>
												<CardContent className="p-0">
													<Typography className="portHedstyle">
														<b>Select Ethernet Device</b>
													</Typography>
													<Typography className="portSubHedstyle">
														To view all the available devices, select a CDS port from<br />the above menu
													</Typography>
													<Grid container>
														<Grid item xs={12}>
															<img src={Human} className="humanImg" />
														</Grid>
													</Grid>
												</CardContent>
											</Card>) : (
											< SelectDevice />
										)}
									</Grid>
									<Grid item xs={9}>
										{currentSelectedPdcEthernetDevice === "" ? (<Grid item xs={12}><Card className="pdbCard ml-10"><img src={Machine} className="machineImg" /></Card></Grid>) :
											<>
												{currentSelectedPdcEthernetDevice === "pfdb" ? (<Pfdb platformNumbers={platformNumbers} selectedPortId={selectedPortId} />) : (<> </>)}
												{currentSelectedPdcEthernetDevice === "cgdb" ? (<Cgdb platformNumbers={platformNumbers} selectedPortId={selectedPortId} />) : (<> </>)}
												{currentSelectedPdcEthernetDevice === "mldb" ? (<Mldbpdc platformNumbers={platformNumbers} selectedPortId={selectedPortId} />) : (<> </>)}
												{currentSelectedPdcEthernetDevice === "ivd" ? (<IVDpdc platformNumbers={platformNumbers} selectedPortId={selectedPortId} />) : (<> </>)}
												{currentSelectedPdcEthernetDevice === "tvDisplay" ? (<TVpdc platformNumbers={platformNumbers} selectedPortId={selectedPortId} />) : (<> </>)}
												{currentSelectedPdcEthernetDevice === "agdb" ? (<Agdbpdc platformNumbers={platformNumbers} selectedPortId={selectedPortId} />) : (<> </>)}

											</>
										}
									</Grid>
								</Grid>
							</Grid>
						</Grid>
					</Card>
				</Grid>)
			}
		</>
	)
}
