import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Prompt, useHistory, useLocation } from "react-router-dom";
import { ModalType } from "../../../constants/enum";
import { warnDiscard } from "../../../redux/actions/appAction/appAction";
import WarnModal from "./warnModal";
// import { warnConfirm, warnDiscard } from "../../../../../redux/actions/appAction/appAction";
// import { ModalType } from "../../../../constants/enums";
// import WarnModal from "../warnModal";

const WarnUnsavedChanges = (props: any) => {
    const { playPause, handleStop,content, title, isDirty, cancelBtnText, confirmBtnText, ignorePrompt = true, navigateOnCancel = false } = props;
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const location = useLocation();
    const history = useHistory();
    const [lastLocation, setLastLocation] = useState(location);
    const [shouldUnload, setShouldUnload] = useState(false);
    const [confirmedNavigation, setConfirmedNavigation] = useState(false);
  
    const dispatch = useDispatch();
    const closeModal = () => {
      setIsModalOpen(false);
      setShouldUnload(false);
    };
  
    const openModal = () => {
      setIsModalOpen(true);
    };
  
    const showModal = (nextLocation: any) => {
      openModal();
      setLastLocation(nextLocation);
    };
  
    const handleBlockedRoute = (nextLocation: any) => {
      if (!confirmedNavigation && isDirty) {
        showModal(nextLocation);
        return false;
      }
  
      return true;
    };
  
  

    const handleDiscardClick = () => {
        closeModal();
       
      };
    
      const handleConfirmNavigationClick = () => {
        closeModal();
        if(playPause){
          handleStop();
        }
        setConfirmedNavigation(true);
        dispatch(warnDiscard());
      
      };
    
  
    // Block react routes
    useEffect(() => {
      if (confirmedNavigation && lastLocation) {
        // Navigate to the previous blocked location with your navigate function
        setShouldUnload(true);
        history.push(lastLocation.pathname);
      }
    }, [confirmedNavigation, lastLocation, history]);
  
    // Block non-react routes
    useEffect(() => {
      const unload = (event: any) => {
        if (isDirty && !shouldUnload) {
          // eslint-disable-next-line no-param-reassign
          event.returnValue = content;
        }
        if (shouldUnload) {
          // eslint-disable-next-line no-param-reassign
          event.returnValue = "";
        }
      };
      window.addEventListener("beforeunload", unload);
  
      return () => window.removeEventListener("beforeunload", unload);
    }, [isDirty, content, shouldUnload]);
  
    return (
      <>
        {!ignorePrompt && (
          <Prompt when message={handleBlockedRoute} />
        )}
        {isModalOpen && (
          <WarnModal 
          type={ModalType.WARN}
           cancelButton={cancelBtnText}
            confirmButton={confirmBtnText}
            primaryText={title}
            secondaryText={content}
            isModalVisible={isDirty}
            cancelCallback={() => {
              if (navigateOnCancel) {
                handleDiscardClick();
              } else {
                closeModal();
              }
            }}
            confirmCallback={handleConfirmNavigationClick}
          />
        )}
      </>
    );
  };

  
 
  export default WarnUnsavedChanges;