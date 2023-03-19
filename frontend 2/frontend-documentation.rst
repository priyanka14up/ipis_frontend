Front End Development
=====================

Background
----------
    Consider this the canonical resource for contributing 

Our front end development stack includes the following tools:

* `Electronjs`_
* `Reactjs`_
* `Material-ui`_

We use the following libraries:

* `React-Redux`_
* `Axios`_

Getting Started
---------------

You will need to follow the commands below sequentially to run the Application in Development environment:

* As a web application:
  
  npm install

  npm start

* As a desktop application:

  npm install

  npm run electron

Files in ``Public`` are starter files to load the application ``index.html``(for browser as web application) and
``electron.js``(for desktop application).



Developement
------------

WebPage: Authenticaion

URL: '/login'

Compenent: src\components\auth\index.tsx

type: Statefull

State-used: AuthUserState

AuthUserState: {
                  appUser: UserModel
                  isLoggedIn: boolean ;
                  authToken: any;
                  refreshToken: any;
                  username: any;
                  verified: boolean;
                  tempVerified: boolean;
                  errorMessage: string;
                }

Action-used: {
               authenticate,
               setTempVerified,
               logout
             }

Service-used: {
  AuthService
}

Model-used: {
  UserAuthInput
}


---------------


WebPage: User Setting

URL: '/user'

Compenent: src\components\user-setting\index.tsx, addUser.tsx, editUser.tsx

type: Statefull

State-used: {
              UserListState,
              UserProfileState
            }

UserListState: {
                 users : UserModel[],
                 selectedUser: UserModel,
               },

UserProfileState: {
                      viewUser:boolean;
                      addUser: boolean;
                      editUser: boolean;
                      deleteUser:boolean;
                      errorMessage:string;
                      userProfile: any;
                  }

Action-used: {
               createUser,
               removeUser,
               updateUser,
               resetPwd,
               fetchUsers,
               fetchUserDetails
             }


Service-used: {
  UserService
}

Model-used: {
  UserModel
}


---------------


WebPage: Help

URL: '/help'

Compenent: src\components\help\index.tsx

type: Stateless

Service-used: {
  HelpService
}

Model-used: {
  HelpModel
}


---------------


WebPage: Report

URL: '/report'

Compenent: src\components\report\index.tsx

type: Stateless

Service-used: {
  ReportService
}

Model-used: {
  LoginReport,
  TrainTransmissionReport,
  AnnouncementReport,
  CgdbTransmissionReport,
  LinkCheckReport
}


---------------


WebPage: Setup

URL: '/setup'

Compenent: src\components\setup\index.tsx

type: Stateless

Service-used: {
  SetupService
}

Model-used: {
  StationDetailsModel,
  TrainDataModel,
  CoachDataModel,
  DisplayBoardDiagnoModel,
  DisplayBoardSettingModel,
  DisplayLedTestingModel,
  StationCodeModel,
  TrainStatusModel,
  DefaultMessagesModel,
  EnableDisableModel,
  WebConfigurationModel,
  IntensityModel
}



---------------


WebPage: Interface

URL: '/interface'

Compenent: src\components\interface\index.tsx

type: Statefull

State-used: InterfaceState

InterfaceState: {
                  currentSelectedCdsPortName: string;
                  currentSelectedCdsPortNumber: number;
                  currentSelectedCdsEthernetDevice: string;
                  currentSelectedPdcPortName: string;
                  currentSelectedPdcPortNumber: number;
                  currentSelectedPdcEthernetDevice: string;
                  selectedDevicesData: InterfaceModel;
                  cdsData: InterfaceModel;
                  pdcData: pdcModel;
                  message: string;
                  cdcState: FormState;
                  pdcState: FormState;
                  pfdbState: FormState;
                  cgdbState: FormState;
                  mldbState: FormState;
                  agdbState: FormState;
                  ivdState: FormState;
                  ovdState: FormState;
                  tvState: FormState;
                  deleteState: FormState;
                },

Action-used: {
              cdcPost,
              pdcPost,
              pfdbPost,
              cgdbPost,
              mldbPost,
              IvdOvdTvPost,
              DeleteDevices,
              agdbPost,
              updatePortName,
              pdateSubPortName,
              fetchDevices,
              fetchDevicesDetails,
              fetchPdcDetails,
              updateDeviceName,
              updatePdcChildDeviceName,
              updateDataToSend
            }

Service-used: {
  InterfaceService
}

Model-used: {
  InterfaceModel,
  CdcModel,
  MldbModel,
  IvdOvdTvModel,
  AgdbModel,
  pdcModel,
  PfdbModel
}


-------------


WebPage: Message

URL: '/message'

Compenent: src\components\message\index.tsx

type: Stateless

Service-used: {
  MessageServices
}

Model-used: {
  MessageModel
}


---------------


WebPage: Link Status

URL: '/link-status'

Compenent: src\components\linkStatus\index.tsx

type: Stateless

Service-used: {
  LinkStatusService
}

Model-used: {
  LinkStatusModal
}


State management with Redux
---------------------------

Que: Why?

Ans: As the application grows & becomes complex, it is hard to reproduce issues and add new features if you
have no control over the state of your application. Redux reduces the complexity of the code, by enforcing
the restriction(as three fundamental principles described below) on how and when state update can happen.
This way, managing updated states is easy.

Redux can be described in three fundamental principles:

1. Single source of truth​-
The global state of your application is stored in an object tree within a single store.

2. State is read-only​
The only way to change the state is to emit an action, an object describing what happened

3. Changes are made with pure functions​
To specify how the state tree is transformed by actions, you write pure reducers.


Redux follows the unidirectional data flow. It means that your application data will follow in one-way binding
data flow.

* An action is dispatched when a user interacts with the application.
* The root reducer function is called with the current state and the dispatched action.
* The root reducer may divide the task among smaller reducer functions, which ultimately returns a new state.
* The store notifies the view by executing their callback functions.
* The view can retrieve updated state and re-render again.


Store
-----
A store is an immutable object tree in Redux. A store is a state container which holds the application’s state.
Redux can have only a single store in your application. Whenever a store is created in Redux,
you need to specify the reducer.
We can create a store using the createStore method from Redux. A createStore function can have three arguments.
The following is the syntax −
createStore(reducer, [preloadedState], [enhancer])

Reducer
-------
A reducer is a function that returns the next state of app. A preloadedState is an optional argument and is the
initial state of your app. An enhancer is also an optional argument. It will help you enhance store with
third-party capabilities.

A store has three important methods as given below −

store.getState()
It helps you retrieve the current state of your Redux store.

store.dispatch({type:'ITEMS_REQUEST'})
It allows you to dispatch an action to change a state in your application.

store.subscribe(()=>{ console.log(store.getState());})
It helps you register a callback that Redux store will call when an action has been dispatched.
As soon as the Redux state has been updated, the view will re-render automatically.

Reducers must always follow some specific rules:

* They should only calculate the new state value based on the state and action arguments
* They are not allowed to modify the existing state. Instead, they must make immutable updates, by copying the
  existing state and making changes to the copied values.
* They must not do any asynchronous logic, calculate random values, or cause other "side effects"

The logic inside reducer functions typically follows the same series of steps:

* Check to see if the reducer cares about this action
  If so, make a copy of the state, update the copy with new values, and return it
  Otherwise, return the existing state unchanged

We are using createSlice for handling reducer logic.

createSlice: A function that accepts an initial state, an object of reducer functions, and a "slice name", and automatically
generates action creators and action types that correspond to the reducers and state.
This API is the standard approach for writing Redux logic.
Internally, it uses createAction and createReducer.


Actions
-------
      An action is a plain JavaScript object that has a type field. You can think of an action as an event
      that describes something that happened in the application.
      We are using createAsyncThunk for actions creation.
      Referece: https://redux-toolkit.js.org/api/createAsyncThunk



Role of Electronjs
------------------

Electron takes a main file defined in your package.json file and executes it. This main file creates application
windows which contain rendered web pages and interaction with the native GUI (graphical user interface) of your
Operating System.

As you start an application using Electron, a main process is created. This main process is responsible for
interacting with the native GUI of the Operating System. It creates the GUI of your application.

Just starting the main process does not give the users of your application any application window.
These are created by the main process in the main file by using the BrowserWindow module. Each browser window
then runs its own renderer process. The renderer process takes an HTML file which references the usual CSS files,
JavaScript files, images, etc. and renders it in the window.

The main process can access the native GUI through modules available directly in Electron. The desktop application
can access all Node modules like the file system module for handling files, request to make HTTP calls, etc.


The main process creates web pages by creating the BrowserWindow instances. Each BrowserWindow instance runs the
web page in its own renderer process. When a BrowserWindow instance is destroyed, the corresponding renderer process
is also terminated.

The main process manages all web pages and their corresponding renderer processes. Each renderer process is isolated
and only cares about the web page running in it.



Deployment
----------

To create deployable bundle(build) for:

1) Web application, you need to run below command:

  npm build

2) Desktop application, you need to run below command:

  npm run package win (for Windows based machine)
  npm run package mac (for Mac based machine)
  npm run package linux (for Linux based machine)


Files in ``build`` are production ready files to serve application as a web application.
Files in ``release-builds`` are production ready bundle of setup files to run application as a desktop application.

