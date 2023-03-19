import "./style.css";
import { Cdc } from "./cdc";
import { Mldb } from "./mldb";
import { Agdb } from "./agdb";

import { useSelector } from "react-redux";
import { Pdc } from "./pdc";
import { interfaceStateSelector } from "../../../../redux/reducers/interface/interface";
import { IVD_OVD_TV } from "./ivd/ovd/tv";
import { Pfdb } from "./pfdb";


export enum EthernetDevice {
  CDC_MASTER = "cdcMaster",
  CDC_SLAVE = "cdcSlave",
  PDC = "pdc",
  MLDB = "mldb",
  TV = "tvDisplay",
  IVD = "ivd",
  OVD = "ovd",
  AGDB = "agdb",
  Cgdb = "pdcs1",
  Pfdb="pfdb",

}

export const ConfigurationSetting = (props: any) => {
  const {setCheckMaster,selectedPortId,platformNumbers}=props;
  const { currentSelectedCdsPortName, currentSelectedCdsEthernetDevice } = useSelector(interfaceStateSelector);
  return (
    <>
      {(currentSelectedCdsEthernetDevice === EthernetDevice.CDC_MASTER || currentSelectedCdsEthernetDevice === EthernetDevice.CDC_SLAVE) ? (
        <Cdc setCheckMaster={setCheckMaster}/>
      ) : <></>
      }
      {currentSelectedCdsEthernetDevice === EthernetDevice.PDC ? (
        <Pdc platformNumbers={platformNumbers} selectedPortId={selectedPortId}/>
      ) : (<></>)
      }

      {currentSelectedCdsEthernetDevice === EthernetDevice.MLDB ? (
        <Mldb />
      ) : (<></>)
      }
      {currentSelectedCdsEthernetDevice === EthernetDevice.AGDB ? (
        <Agdb platformNumbers={platformNumbers}/>
      ) : (<></>)
      }
      {(currentSelectedCdsEthernetDevice === EthernetDevice.TV || currentSelectedCdsEthernetDevice === EthernetDevice.IVD || currentSelectedCdsEthernetDevice === EthernetDevice.OVD) ? (
        <>
          <IVD_OVD_TV platformNumbers={platformNumbers}/>
        </>
      ) : (<></>)
      }
       {currentSelectedCdsEthernetDevice === EthernetDevice.Pfdb ? (
        <Pfdb/>
       ) : (<></>)
      }
    </>
  )
}
