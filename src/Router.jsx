import { createBrowserRouter } from "react-router-dom";
import Root from "./components/pages/Root";
import ErrorPage from "./components/pages/ErrorPage";
// import Ohcs from "./components/pages/Ohcs";
// import Roles from "./components/pages/Roles";
import ProtectedRoute from "./utils/ProtectedRoute";
// import Login from "./components/pages/Login";
import Login from "./components/pages/Signup";
import PersistLogin from "./utils/PersistLogin";
import OhcList from "./components/pages/OhcList";
// import AdminHome from "./components/pages/AdminHome";
import UserList from "./components/pages/UserList";
// import UserForm from "./components/pages/UserForm";
// import OhcForm from "./components/pages/OhcForm";
// import MenuForm from "./components/pages/MenuForm";
import MenuList from "./components/pages/MenuList";
import RoleList from "./components/pages/RoleList";
import BussinessList from "./components/pages/BussinessList";
import DepartmentList from "./components/pages/DepartmentList";
import DesignationList from "./components/pages/DesignationList";
import SectionList from "./components/pages/SectionList";
import EmployeeCadreList from './components/pages/EmployeeCadreList'
import EmployeeContractorList from "./components/pages/EmployeeContractorList";
import MedTimingList from "./components/pages/MedTimingList";
import ComplaintList from "./components/pages/ComplaintList";
import RefferalPointList from "./components/pages/RefferalPointList";
import AilmentSystemList from "./components/pages/AilmentSystemList";
import DiagnosisList from "./components/pages/DiagnosisList";
import RefferedByList from "./components/pages/RefferedByList";
import AbnormalityList from "./components/pages/AbnormalityList";
import AddDocDetailList from "./components/pages/AddDocDetailList";
import DiagnosisBSMList from "./components/pages/DiagnosisBSMList";
import TaskFrequencyList from "./components/pages/TaskFrequencyList";
import InjuryClassificationList from "./components/pages/InjuryClassificationList";
import InjuryPartList from "./components/pages/InjuryPartList";
import InjuryTypeList from "./components/pages/InjuryTypeList";
import DiagnosisTreatmentList from "./components/pages/DiagnosisTreatmentList"
import DiagnosisCIMList from "./components/pages/DiagnosisCIMList";
import AppointmentList from "./components/pages/AppointmentList";
import SaltList from "./components/pages/SaltList";
import HabitList from "./components/pages/HabitList";
import DeviceList from "./components/pages/DeviceList";
import PlantList from "./components/pages/PlantList";
import VaccineList from "./components/pages/VaccineList";
import RoleSelection from "./components/pages/RoleSelection";
import OhcSelection from "./components/pages/OhcSelection";
import PatientProfileList from "./components/pages/PatientProfileList";
import Patient from "./components/pages/Patient";
import MedFreqList from "./components/pages/MedFreqList";
import ContactList from "./components/pages/ContactList";
import NutrientList from "./components/pages/NutrientList";
import FoodList  from "./components/pages/FoodList";
import ExerciseMinuteList from "./components/pages/ExerciseMinuteList";
import BodyMeasurementList from "./components/pages/BodyMeasurementList";
import LandingPageList from "./components/pages/BodyMeasurementList";
import PatientAndContact from "./components/pages/PatientAndContact";
import AdminDashboard from "./components/pages/AdminDashboard";
import ExerciseList from "./components/pages/ExerciseList";
import FoodMasterList from "./components/pages/FoodMasterList";
import UnitList from "./components/pages/UnitList"
import NutrientUnitList from "./components/pages/NutrientUnitList";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    index: true,
  },
  {
    path: "/",
    element: <PersistLogin />,
    children: [
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "/ohcSelection",
            element: <OhcSelection />,
          },
          {
            path: "/roleSelection",
            element: <RoleSelection />,
          },
          // {
          //  path :  "/Ohc",
          //  element : <OhcSelection />
          // }
          // {
          //   path : "/NemroleSelection",
          //   element : <RoleSelection />
          // }
        ],
      },
    ],
  },

  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <PersistLogin />,
        children: [
          {
            element: <ProtectedRoute />,
            children: [
              {
                path:'/AdminDashboard',
                element:<AdminDashboard />
              },
              {
                path:'/ohcList',
                element:<OhcList />
              },
              {
                path:'/UserList',
                element: <UserList />
              },
              {
                path:'/RoleList',
                element:<RoleList />
              },
              {
                path:'/MenuList',
                element:<MenuList />
              },
              {
                path :'/BussinessList',
                element: <BussinessList />
              },
              {
                path : '/DepartmentList',
                element : <DepartmentList />
              },
              {
                path : '/DesignationList',
                element : <DesignationList />
              },
              {
                  path : '/SectionList',
                  element : <SectionList/ >
              },
              {
                path : '/EmployeeCadreList',
                element : <EmployeeCadreList />
              },
              {
                path : "/EmployeeContractorList",
                element : <EmployeeContractorList />
              },
              {
                path : "/MedTimingList",
                element : <MedTimingList />
              },
              {
                path : "/ComplaintList",
                element : <ComplaintList />
              },
              {
                path : "/RefferalPointList",
                element : <RefferalPointList />
              },
              {
                path : "/AilmentSystemList",
                element : <AilmentSystemList />
              },
              {
                path : "/DiagnosisList",
                element : <DiagnosisList />
              },
              {
                path : "/RefferedByList",
                element : <RefferedByList />
              },
              {
                path  : "/AbnormalityList",
                element : <AbnormalityList />
              },
              {
                path : "/AddDocDetailList",
                element : <AddDocDetailList />
              },
              {
                path : "/DiagnosisBSMList",
                element : <DiagnosisBSMList/>
              },
              {
                path : "/TaskFrequencyList",
                element : <TaskFrequencyList />
              },
              {
                path : "/InjuryClassificationList",
                element : <InjuryClassificationList />
              },
              {
                path : "/InjuryPartList",
                element : <InjuryPartList />
              },
              {
                path : "/InjuryTypeList",
                element : <InjuryTypeList />
              },
              {
                path : "/DiagnosisTreatmentList",
                element : <DiagnosisTreatmentList />
              },
              {
                path : "/DiagnosisCIMList",
                element : <DiagnosisCIMList />
              },
              {
                path : "/AppointmentList",
                element : <AppointmentList />
              },
              {
                path : "/SaltList",
                element : <SaltList />
              },
              {
                path : "/HabitList",
                element : <HabitList />
              },
              {
                path : "/DeviceList",
                element : <DeviceList />
              },
              {
                path : "/PlantList",
                element : <PlantList />
              },
              {
                path : "/VaccineList",
                element : <VaccineList />
              },
              {
                path : "/PatientProfileList",
                element : <PatientProfileList />
              },
              {
                path : "/Patient/:id",
                element : <Patient />
              },
              {
                path : "/MedFreqList",
                element : <MedFreqList/ >
              },
              {
                path : "/ContactList",
                element : <ContactList />
              },
              {
                path : "/NutrientList",
                element  : <NutrientList />
              },
              {
                path : "/FoodList",
                element : <FoodList />
              },
              {
                path : "/ExerciseMinuteList",
                element : <ExerciseMinuteList />
              },
              {
                path : "/BodyMeasurementList",
                element : <BodyMeasurementList />
              },
              {
                path : "/LandingPageList",
                element : <LandingPageList />
              },
              {
                path : "/PatientAndContact/:id",
                element : <PatientAndContact />
              },
              {
                path : "/ExerciseList",
                element : <ExerciseList />
              },
              {
                path : "/FoodMasterList",
                element : <FoodMasterList />
              },
              {
                path : "/UnitList",
                element : <UnitList />
              },
              {
                path : "/NutrientUnitList",
                element : <NutrientUnitList />
              }
            ],
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

export default router;
