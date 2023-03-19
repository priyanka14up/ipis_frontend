import {
  Table
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import "./style.css";
import { IconButton, TableBody, TableHead, TableCell, TableContainer, TableRow } from "@material-ui/core";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { authuserStateSelector } from "../../../redux/reducers/authUser/authUser";
import { Redirect, useHistory } from "react-router-dom";
import userListReducer from "../../../redux/reducers/userList/userListReducer";
import { Messages } from "../../../constants/messages";
import { UserRole } from "../../../constants/enum";
import { fetchUsers } from "../../../redux/actions/userListAction";

export const CommonTable = (props: any) => {

  const { appUser } = useSelector(authuserStateSelector)
  const history = useHistory();
  const dispatch = useDispatch();
  const { userList, onSelect, onChoose } = props;

  const onEditClick = (userId: any) => {
    onSelect(userId)
  }

  const handleDelete = (userId: any, userRole:any) => {
    if ((appUser.userRole == "ROLE_STATION MASTER" && userRole =="ROLE_ADMIN")){
      Swal.fire({
        position: "center",
        icon: "error",
        title: `${Messages.OPERATOR_MESSAGE}`,
        showConfirmButton: false,
        showCloseButton: false,
        timer:1500

      })
    }
    else {
      if(userId.userRole == "ROLE_ADMIN" && appUser.userRole=="ROLE_STATION MASTER"){
        Swal.fire({
          position: "center",
          icon: "error",
          title: `${Messages.OPERATOR_MESSAGE}`,
          showConfirmButton: false,
          showCloseButton: true
  
        })
      }
      else{
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      }).then((result) => {
        if (result.isConfirmed) {
          onChoose(userId)
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Deleted Successfully',
            showConfirmButton: false,
            allowOutsideClick: false,
            timer: 1500,
          }).then(() => {
            dispatch(fetchUsers());                   
          })
        }
      })
    }
  }
  }
  return (
    <>
      <TableContainer style={{ height: "47vh" }}>
        <Table stickyHeader aria-label="sticky table" >
          <TableHead className="tblRow">
            <TableRow className="tblRow" >
              <TableCell className="rowStyle"  >
                User Name
              </TableCell>
              <TableCell className="rowStyle" colSpan={2}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody className="tblRow"  >
            {userList && userList.length ?
              userList.map((user: any) => {
                return (
                  <TableRow >
                    <TableCell className="usr" >{user.firstname} {user.lastname}</TableCell>
                    <TableCell className="edit" >
                      <IconButton aria-label="edit" style={{ padding: "1px" }} onClick={() => onEditClick(user.id)}>
                        <EditIcon style={{ color: "grey" }} />
                      </IconButton>
                    </TableCell>
                    <TableCell className="delete"  >
                      {appUser.userRole == "ROLE_OPERATOR" ?
                        <IconButton disabled aria-label="Delete" style={{ padding: "1px" }} onClick={() => handleDelete(user.id,user.userRole.roleText)} >
                          <DeleteIcon style={{ color: "grey" }} />
                        </IconButton>
                        :
                        <IconButton aria-label="Delete" style={{ padding: "1px" }} onClick={() => handleDelete(user.id,user.userRole.roleText)} >
                          <DeleteIcon style={{ color: "grey" }} />
                        </IconButton>}
                    </TableCell>
                  </TableRow>
                );
              }) :
              null
            }
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

