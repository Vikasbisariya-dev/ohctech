import  { useState, useEffect } from 'react';
import {
  Box,
  Button,
  ButtonGroup,
  Stack,
  Grid,
  FormControl,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAxiosPrivate from '../../utils/useAxiosPrivate';
import SingleSelect from '../common/SingleSelect';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
// import EditNoteRoundedIcon from '@mui/icons-material/EditNoteRounded';
// import DeleteSweepRoundedIcon from '@mui/icons-material/DeleteSweepRounded';
import Input from '../common/Input';
// import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import EmpHealthDasboard from './EmpHealthDashboard';

const genderselect=["Femail","Mail","Third Gender"]
const bloodgroupselect=["A+","AB+","B+","B-","O+","O-"]
const Patientselect=["A Grade","B Grade","A + Grade"]

// const PatientValidationSchema = Yup.object({
//   gender: Yup.string().required('Please select a gender'),
// });

// const ContactValidationSchema = Yup.object({
//   email: Yup.string().required('Please enter an email'),
// });

const PatientAndContact = () => {
  const axiosClientPrivate = useAxiosPrivate();

  // State for visibility of forms
  const [showPatientForm, setShowPatientForm] = useState(true);
  const [showContactForm, setShowContactForm] = useState(false);
  // const [showFoodConsumtion, setShowFoodConsumtion] = useState(false);
  // State for fetched data
  // const [rowData, setRowData] = useState([]);
  // const [colDefs, setColDefs] = useState([]);
  // const [fetchTrigger, setFetchTrigger] = useState(0);

  const [showDashboard, setShowDashboard] = useState(false);
//   const toggleDashboard = () => {
//     setShowDashboard(!showDashboard);
// };    


const initialValues = {
  selectpatientcategory: "",
  patientName: "",
  fatherName: "",
  dob: "",
  gender: "",
  bloodGroup: "",
  aadharNo: "",
  primaryPhone: "",
  village: "",
  post: "",
  ps: "",
  tehsil: "",
  district: "",
  state: "",
  pinCode: "",
  //contact
  emailId : "",
  personalPhone : "",
  primaryContactPerson : "",
  primaryContactNo : "",
  secondaryContactPerson : "",
  secondaryContactNo : "",
  lastModified: "",
  modifiedBy: ""
};

// const PatientValidationForm = Yup.object({
//   selectpatientcategory: Yup.string().required("Please choose patient category "),
// pname: Yup.string().required("Please enter patient name"),
// fhname: Yup.string().required("Please enter father anme "),
// date: Yup.string().required("Please enter birth date"),
// genderchoose: Yup.string().required("Please  genderchoose"),
// blood: Yup.string().required("Please enter  blood"),
// aadhar: Yup.string().required("Please enter aadhar"),
// phone: Yup.string().required("Please enter phone number"),
// village: Yup.string().required("Please enter village"),
// post: Yup.string().required("Please enter post"),
// ps: Yup.string().required("Please enter ps"),
// tehsil:Yup.string().required("Please enter tehsil "),
// district:Yup.string().required("Please enter district "),
// state:Yup.string().required("Please enter sat"),
// pin:Yup.string().required("Please enter pin"),
// });

const {
  values,
  touched,
  errors,
  handleBlur,
  handleChange,
  setFieldValue,
  handleSubmit,
  // resetForm,
} = useFormik({
  initialValues: initialValues,
  // validationSchema: PatientValidationForm,
  onSubmit: async (values) => {
      try {
          const response = await axiosClientPrivate.post('/medicallist', values);
          toast.success("Saved Successfully!", {
              position: "top-center"
          });
          // setFetchTrigger(prev => prev + 1);
          console.log('Response:', response.data);
          // resetForm();
      } catch (error) {
          console.log(values);
          console.error('Error:', error);
      }
  },
});


const [stop,setStop] = useState(true);


const handleEdit = async (id) => {
  // alert(id);
  
  
    try {
        const response = await axiosClientPrivate.get(`/patients/${id}`);
        // const items = response.data.content;

        setFieldValue("id", response.data.id);
        setFieldValue("selectpatientcategory", response.data.selectpatientcategory);
        setFieldValue("patientName", response.data.patientName);
        setFieldValue("fatherName", response.data.fatherName);
        setFieldValue("dob", response.data.dob);
        setFieldValue("gender", response.data.gender);
        setFieldValue("bloodGroup", response.data.bloodGroup);
        setFieldValue("aadharNo", response.data.aadharNo);
        setFieldValue("primaryPhone", response.data.primaryPhone);
        setFieldValue("village", response.data.village);
        setFieldValue("post", response.data.post);
        setFieldValue("ps", response.data.ps);
        setFieldValue("tehsil", response.data.tehsil);
        setFieldValue("district", response.data.district);
        setFieldValue("state", response.data.state);
        setFieldValue("pinCode", response.data.pinCode);
        // contact
        setFieldValue("emailId", response.data.emailId);
        setFieldValue("personalPhone", response.data.personalPhone);
        setFieldValue("primaryContactPerson", response.data.primaryContactPerson);
        setFieldValue("primaryContactNo", response.data.primaryContactNo);
        setFieldValue("secondaryContactPerson", response.data.secondaryContactPerson);
        setFieldValue("secondaryContactNo", response.data.secondaryContactNo);

        setFieldValue("lastModified", response.data.lastModified);
        setFieldValue("modifiedBy", response.data.modifiedBy);
        // setShowForm(true);
        
    } catch (error) {
        console.error('Error fetching item for edit:', error);
    }
};

const { id } = useParams();
if(stop){
  handleEdit(id);
  setStop(false);
}
 


const handleUpdate = async (id) => {
  // alert(id);
  const update = values;
  try {
      console.log(values);
      await axiosClientPrivate.put(`/patients/${id}`, update);
      toast.success("Updated Successfully!", {
          position: "top-center",
          autoClose: 3000,
      });
      // resetForm();
      handleEdit();
  } catch (err) {
      console.log(values);
      console.log(err);
  }
}


  // Initial form values
  // const initialvalues = {
  //   gender: '',
  // };

  // const initialvalues = {
  //   email: '',
  // };

  // Formik for patient form
  // const {
  //   values: values,
  //   touched: patientTouched,
  //   errors: errors,
  //   handleBlur: handleBlur,
  //   handleChange: handleChange,
  //   handleSubmit: patientHandleSubmit,
  //   resetForm: patientResetForm,
  // } = useFormik({
  //   initialValues: initialPatientValues,
  //   validationSchema: PatientValidationSchema,
  //   onSubmit: async (values, { resetForm }) => {
  //     try {
  //       const response = await axiosClientPrivate.post('/patients', values);
  //       toast.success('Patient Saved Successfully!', {
  //         position: 'top-center',
  //       });
  //       setFetchTrigger((prev) => prev + 1);
  //       console.log('Patient Response:', response.data);
  //       patientResetForm();
  //     } catch (error) {
  //       console.error('Error saving patient:', error);
  //     }
  //   },
  // });

  // Formik for contact form
  // const {
  //   values: values,
  //   touched: contactTouched,
  //   errors: errors,
  //   handleBlur: contactHandleBlur,
  //   handleChange: contactHandleChange,
  //   handleSubmit: contactHandleSubmit,
  //   resetForm: contactResetForm,
  // } = useFormik({
  //   initialValues: initialContactValues,
  //   validationSchema: ContactValidationSchema,
  //   onSubmit: async (values, { resetForm }) => {
  //     try {
  //       const response = await axiosClientPrivate.post('/contacts', values);
  //       toast.success('Contact Saved Successfully!', {
  //         position: 'top-center',
  //       });
  //       setFetchTrigger((prev) => prev + 1);
  //       console.log('Contact Response:', response.data);
  //       contactResetForm();
  //     } catch (error) {
  //       console.error('Error saving contact:', error);
  //     }
  //   },
  // });

  // Fetch all patients for AG Grid
  // useEffect(() => {
  //   const controller = new AbortController();

  //   const fetchPatients = async () => {
  //     try {
  //       const response = await axiosClientPrivate.get('/patients');
  //       const items = response.data;
  //       setRowData(items);
  //       if (items.length > 0) {
  //         const columns = Object.keys(items[0]).map((key) => ({
  //           field: key,
  //           headerName: key.charAt(0).toUpperCase() + key.slice(1),
  //           filter: true,
  //           sortable: true,
  //         }));

  //         columns.unshift({
  //           field: 'Actions',
  //           headerName: 'Actions',
  //           cellRenderer: ({ data }) => (
  //             <div>
  //               <Button onClick={() => handleEditPatient(data.id)}>
  //                 <EditNoteRoundedIcon />
  //               </Button>
  //               <Button onClick={() => handleDeletePatient(data.id)}>
  //                 <DeleteSweepRoundedIcon />
  //               </Button>
  //             </div>
  //           ),
  //         });

  //         setColDefs(columns);
  //       }
  //     } catch (error) {
  //       console.error('Error fetching patients:', error);
  //     }
  //   };

  //   fetchPatients();

  //   return () => {
  //     controller.abort();
  //   };
  // }, [axiosClientPrivate, fetchTrigger]);

  // Function to handle editing patient
  // const handleEditPatient = async (patientId) => {
  //   try {
  //     const response = await axiosClientPrivate.get(`/patients/${patientId}`);
  //     handleChange({ target: { name: 'gender', value: response.data.gender } });
  //     setShowPatientForm(true);
  //     setShowContactForm(false);
  //   } catch (error) {
  //     console.error('Error fetching patient for edit:', error);
  //   }
  // };

  // Function to handle deleting patient
  // const handleDeletePatient = async (patientId) => {
  //   if (window.confirm('Are you sure you want to delete this patient?')) {
  //     try {
  //       await axiosClientPrivate.delete(`/patients/${patientId}`);
  //       setFetchTrigger((prev) => prev + 1);
  //     } catch (error) {
  //       console.error('Error deleting patient:', error);
  //     }
  //   }
  // };

  // Function to handle toggling patient form visibility
  const togglePatientForm = () => {
    setShowPatientForm(!showPatientForm);
    setShowContactForm(false);
  };

  // Function to handle toggling contact form visibility
  const toggleContactForm = () => {
    setShowContactForm(!showContactForm);
    setShowPatientForm(false);
  };

  // showFoodConsumtion
  // const toggleFoodConsumtion = () => {
  //   setShowFoodConsumtion(!showContactForm);
  //   setShowFoodConsumtion(false);
  // };

  return (
    <Box m="20px">
      <EmpHealthDasboard/>
      <ToastContainer />
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <ButtonGroup>
            {/* <Button
                variant="contained"
                onClick={toggleDashboard}
            >
                 Employee Health Dashboard
            </Button> */}
          <Button variant="contained" startIcon={<AddCircleOutlineRoundedIcon />} onClick={togglePatientForm}>
            Patient Profile
          </Button>
          <Button variant="contained" startIcon={<AddCircleOutlineRoundedIcon />} onClick={toggleContactForm}>
            Contact
          </Button>
          <Link to = "/NutrientList">
          <Button variant="contained" startIcon={<AddCircleOutlineRoundedIcon />} onClick={toggleContactForm}>
            Food Consumtion
          </Button>
          </Link>
        </ButtonGroup>
      </Stack>
      {showDashboard && <EmpHealthDasboard />}

      {/* Patient form */}
      {showPatientForm && (
        <Box mb={4}>
          <form onSubmit={handleSubmit}>
            <FormControl sx={{ width: '100%' }}>
            <Grid container spacing={0} justifyContent="center" alignItems="center"  >
                          
                          <Grid itemxs={3} sm={12}  justifyContent="center" alignItems="center">
                            <FormControl  fullWidth>
                              <Grid container spacing={3} justifyContent="center" alignItems="center">
                                <Grid item xs={12} sm={4} container spacing={1} justifyContent="center" alignItems="center">
                                <SingleSelect
                                    arr={Patientselect}
                                    label="Patient Category"
                                    name="selectpatientcategory"
                                    value={values.selectpatientcategory}
                                    onChange={(event, newValue) => {
                                      const syntheticEvent = {
                                        target: {
                                          name: "selectpatientcategory",
                                          value: newValue,
                                        },
                                      };
                                      handleChange(syntheticEvent);
                                    }}
                                    onBlur={handleBlur}
                                    type="text"
                                    helperText={
                                      errors.selectpatientcategory && touched.selectpatientcategorye ? (
                                        <span style={{ color: "red" }}>{errors.selectpatientcategory}</span>
                                      ) : null
                                    }
                                  />
                                </Grid>
                                <Grid item  xs={12} sm={4} container spacing={1} justifyContent="center"   alignItems="center">
                                <Input
                                    label="Patient Name"
                                    name="patientName"
                                    type="text"
                                    size="large"
                                    value={values.patientName}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    helperText={
                                      errors.patientName && touched.patientName ? (
                                        <span style={{ color: "red" }}>
                                          {errors.patientName}
                                        </span>
                                      ) : null
                                    }
                                  />
                                </Grid>
                                <Grid item  xs={12} sm={4} container spacing={1} justifyContent="center"  alignItems="center">
                                <Input
                                    label="Father's/Husband Name"
                                    name="fatherName"
                                    type="text"
                                    size="large"
                                    value={values.fatherName}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    helperText={
                                      errors.fatherName && touched.fatherName ? (
                                        <span style={{ color: "red" }}>
                                          {errors.fatherName}
                                        </span>
                                      ) : null
                                    }
                                  />
                                </Grid>
                                <Grid item xs={12} sm={4} container spacing={1} justifyContent="center" alignItems="center">
                                  <Input
                                    label="D.O.B"
                                    name="dob"
                                    type="date"
                                    size="large"
                                    value={values.dob}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    helperText={
                                      errors.dob && touched.dob ? (
                                        <span style={{ color: "red" }}>
                                          {errors.dob}
                                        </span>
                                      ) : null
                                    }
                                  />
                                </Grid>
                              
                                <Grid item xs={12} sm={4} container spacing={1} justifyContent="center" alignItems="center">
                                <SingleSelect
                                    arr={genderselect}
                                    label="Gender"
                                    name="gender"
                                    value={values.gender}
                                    onChange={(event, newValue) => {
                                      const syntheticEvent = {
                                        target: {
                                          name: "gender",
                                          value: newValue,
                                        },
                                      };
                                      handleChange(syntheticEvent);
                                    }}
                                    onBlur={handleBlur}
                                    type="text"
                                    helperText={
                                      errors.gender && touched.gender ? (
                                        <span style={{ color: "red" }}>{errors.gender}</span>
                                      ) : null
                                    }
                                  />
                                </Grid>
                                <Grid item xs={12} sm={4} container spacing={1} justifyContent="center" alignItems="center">
                                <SingleSelect
                                    arr={bloodgroupselect}
                                    label="Blood Group"
                                    name="bloodGroup"
                                    value={values.bloodGroup}
                                    onChange={(event, newValue) => {
                                      const syntheticEvent = {
                                        target: {
                                          name: "bloodGroup",
                                          value: newValue,
                                        },
                                      };
                                      handleChange(syntheticEvent);
                                    }}
                                    onBlur={handleBlur}
                                    type="text"
                                    helperText={
                                      errors.bloodGroup && touched.bloodGroup ? (
                                        <span style={{ color: "red" }}>{errors.bloodGroup}</span>
                                      ) : null
                                    }
                                  />
                                </Grid>
                
                                <Grid item xs={12} sm={4} container spacing={1} justifyContent="center" alignItems="center">
                                  <Input
                                    label="Aadhar Number"
                                    name="aadharNo"
                                    type="text"
                                    size="large"
                                    value={values.aadharNo}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    helperText={
                                      errors.aadharNo && touched.aadharNo ? (
                                        <span style={{ color: "red" }}>
                                          {errors.aadharNo}
                                        </span>
                                      ) : null
                                    }
                                  />
                                </Grid>
                                <Grid item xs={12} sm={4} container spacing={1} justifyContent="center" alignItems="center">
                                  <Input
                                    label="Phone Number"
                                    name="primaryPhone"
                                    type="text"
                                    size="large"
                                    value={values.primaryPhone}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    helperText={
                                      errors.primaryPhone && touched.primaryPhone ? (
                                        <span style={{ color: "red" }}>
                                          {errors.primaryPhone}
                                        </span>
                                      ) : null
                                    }
                                  />
                                </Grid>
                                <Grid item xs={12} sm={4} container spacing={1} justifyContent="center" alignItems="center">
                                  <Input
                                    label="Residing Village"
                                    name="village"
                                    type="text"
                                    size="large"
                                    value={values.village}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    helperText={
                                      errors.village && touched.village ? (
                                        <span style={{ color: "red" }}>
                                          {errors.village}
                                        </span>
                                      ) : null
                                    }
                                  />
                                </Grid>
                                <Grid item xs={12} sm={4} container spacing={1} justifyContent="center" alignItems="center">
                                  <Input
                                    label="Post"
                                    name="post"
                                    type="text"
                                    size="large"
                                    value={values.post}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    helperText={
                                      errors.post && touched.post ? (
                                        <span style={{ color: "red" }}>
                                          {errors.post}
                                        </span>
                                      ) : null
                                    }
                                  />
                                </Grid>
                                <Grid item xs={12} sm={4} container spacing={1} justifyContent="center" alignItems="center">
                                  <Input
                                    label="PS"
                                    name="ps"
                                    type="text"
                                    size="large"
                                    value={values.ps}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    helperText={
                                      errors.ps && touched.ps ? (
                                        <span style={{ color: "red" }}>
                                          {errors.ps}
                                        </span>
                                      ) : null
                                    }
                                  />
                                </Grid>
                                <Grid item xs={12} sm={4} container spacing={1} justifyContent="center" alignItems="center">
                                  <Input
                                    label="Tehsil"
                                    name="tehsil"
                                    type="text"
                                    size="large"
                                    value={values.tehsil}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    helperText={
                                      errors.tehsil && touched.tehsil ? (
                                        <span style={{ color: "red" }}>
                                          {errors.tehsil}
                                        </span>
                                      ) : null
                                    }
                                  />
                                </Grid>
                                <Grid item xs={12} sm={4} container spacing={1} justifyContent="center" alignItems="center">
                                  <Input
                                    label="District"
                                    name="district"
                                    type="text"
                                    size="large"
                                    value={values.district}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    helperText={
                                      errors.district && touched.district ? (
                                        <span style={{ color: "red" }}>
                                          {errors.district}
                                        </span>
                                      ) : null
                                    }
                                  />
                                </Grid>
                                
                                
                                <Grid item xs={12} sm={4} container spacing={1} justifyContent="center" alignItems="center">
                                  <Input
                                    label="State"
                                    name="state"
                                    type="text"
                                    size="large"
                                    value={values.state}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    helperText={
                                      errors.state && touched.state ? (
                                        <span style={{ color: "red" }}>
                                          {errors.state}
                                        </span>
                                      ) : null
                                    }
                                  />
                                </Grid>
                                <Grid item xs={12} sm={4} container spacing={1} justifyContent="center" alignItems="center">
                                  <Input
                                    label="Pin Code"
                                    name="pinCode"
                                    type="text"
                                    size="large"
                                    value={values.pinCode}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    helperText={
                                      errors.pinCode && touched.pinCode ? (
                                        <span style={{ color: "red" }}>
                                          {errors.pinCode}
                                        </span>
                                      ) : null
                                    }
                                  />
                                </Grid>
                              </Grid>
                            </FormControl>
                          </Grid>
                        </Grid>
              <Box mt={2} display="flex" justifyContent="center">
                <Button type="submit" onClick={() => handleUpdate(id)} variant="outlined">
                  Update
                </Button>
              </Box>
            </FormControl>
          </form>
        </Box>
      )}

      {/* Contact form */}
      {showContactForm && (
        <Box mb={4}>
          <form onSubmit={handleSubmit}>
            <FormControl sx={{ width: '100%' }}>
            <Grid container spacing={4} justifyContent="center" alignItems="center" sx={{ maxWidth: 900, marginLeft:26, marginTop:2}}>
                    <Grid item xs={12} sm={6}>
                        <Input
                            label="Email"
                            name="emailId"
                            type="text"
                            value={values.emailId}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            helperText={errors.emailId && touched.emailId ? <span style={{ color: "red" }}>{errors.emailId}</span> : null}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Input
                            label="Personal Phone"
                            name="personalPhone"
                            type="text"
                            value={values.personalPhone}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            helperText={errors.personalPhone && touched.personalPhone ? <span style={{ color: "red" }}>{errors.personalPhone}</span> : null}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Input
                            label="Primary Contact Person"
                            name="primaryContactPerson"
                            type="text"
                            value={values.primaryContactPerson}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            helperText={errors.primaryContactPerson && touched.primaryContactPerson ? <span style={{ color: "red" }}>{errors.primaryContactPerson}</span> : null}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Input
                            label="Primary Contact Number"
                            name="primaryContactNo"
                            type="text"
                            value={values.primaryContactNo}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            helperText={errors.primaryContactNo && touched.primaryContactNo ? <span style={{ color: "red" }}>{errors.primaryContactNo}</span> : null}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Input
                            label="Sec Contact Person"
                            name="secondaryContactPerson"
                            type="text"
                            value={values.secondaryContactPerson}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            helperText={errors.secondaryContactPerson && touched.secondaryContactPerson ? <span style={{ color: "red" }}>{errors.secondaryContactPerson}</span> : null}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Input
                            label="Sec Contact Number"
                            name="secondaryContactNo"
                            type="text"
                            value={values.secondaryContactNo}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            helperText={errors.secondaryContactNo && touched.secondaryContactNo ? <span style={{ color: "red" }}>{errors.secondaryContactNo}</span> : null}
                        />
                    </Grid>
                </Grid>
              <Box mt={2} display="flex" justifyContent="center">
                <Button type="submit" onClick={() => handleUpdate(id)}  variant="outlined">
                  Save
                </Button>
              </Box>
            </FormControl>
          </form>
        </Box>
      )}

      {/* AG Grid for Patients */}
      <div className="ag-theme-alpine" style={{ height: '400px', width: '100%' }}>
        {/* Render your AG Grid here */}
      </div>
    </Box>
  );
};

export default PatientAndContact;
