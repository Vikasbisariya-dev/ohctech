import { Box, Button, ButtonGroup, Stack, Grid, FormControl, useMediaQuery } from '@mui/material';
import { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import useAxiosPrivate from '../../utils/useAxiosPrivate';
import EditNoteRoundedIcon from '@mui/icons-material/EditNoteRounded';
import DeleteSweepRoundedIcon from '@mui/icons-material/DeleteSweepRounded';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import { useFormik } from "formik";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DownloadIcon from '@mui/icons-material/Download';
import ExcelJS from 'exceljs';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import PropTypes from "prop-types";
import Input from '../common/Input';
import * as Yup from 'yup';
//import Link from '@mui/material';
import { Link } from 'react-router-dom';

const ContactValidationForm = Yup.object({
    email: Yup.string().required("Please enter Email "),
    pphone: Yup.string().required("Please enter Personal Phone"),
    pcperson: Yup.string().required("Please enter Primary Contact Person "),
    pcnumber: Yup.string().required("Please enter Primary Contact NO"),
    scperson: Yup.string().required("Please enter Sec Contact Person"),
    scnumber: Yup.string().required("Please enter Sec Contact NO"),
});

const ContactForm = ({ values, touched, handleBlur, errors, handleChange, handleSubmit }) => {
    ContactForm.propTypes = {
        values: PropTypes.object.isRequired,
        touched: PropTypes.object.isRequired,
        errors: PropTypes.object.isRequired,
        handleBlur: PropTypes.func.isRequired,
        handleChange: PropTypes.func.isRequired,
        handleSubmit: PropTypes.func.isRequired,
    };

    return (
        <div style={{ display: "flex", justifyContent: "center" }}>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={4} justifyContent="center" alignItems="center" sx={{ maxWidth: 900 }}>
                    <Grid item xs={12} sm={6}>
                        <Input
                            label="Email"
                            name="email"
                            type="text"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            helperText={errors.email && touched.email ? <span style={{ color: "red" }}>{errors.email}</span> : null}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Input
                            label="Personal Phone"
                            name="pphone"
                            type="text"
                            value={values.pphone}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            helperText={errors.pphone && touched.pphone ? <span style={{ color: "red" }}>{errors.pphone}</span> : null}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Input
                            label="Primary Contact Person"
                            name="pcperson"
                            type="text"
                            value={values.pcperson}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            helperText={errors.pcperson && touched.pcperson ? <span style={{ color: "red" }}>{errors.pcperson}</span> : null}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Input
                            label="Primary Contact Number"
                            name="pcnumber"
                            type="text"
                            value={values.pcnumber}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            helperText={errors.pcnumber && touched.pcnumber ? <span style={{ color: "red" }}>{errors.pcnumber}</span> : null}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Input
                            label="Sec Contact Person"
                            name="scperson"
                            type="text"
                            value={values.scperson}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            helperText={errors.scperson && touched.scperson ? <span style={{ color: "red" }}>{errors.scperson}</span> : null}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Input
                            label="Sec Contact Number"
                            name="scnumber"
                            type="text"
                            value={values.scnumber}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            helperText={errors.scnumber && touched.scnumber ? <span style={{ color: "red" }}>{errors.scnumber}</span> : null}
                        />
                    </Grid>
                </Grid>
            </form>
        </div>
    );
};

const ContactList = () => {
    const [rowData, setRowData] = useState([]);
    const [colDefs, setColDefs] = useState([]);
    const [showForm, setShowForm] = useState(true);
    const axiosClientPrivate = useAxiosPrivate();
    const [fetchTrigger, setFetchTrigger] = useState(0);
    // const isSmallScreen = useMediaQuery(theme => theme.breakpoints.down('sm'));

    const initialValues = {
        email: "",
        pphone: "",
        pcperson: "",
        pcnumber: "",
        scperson: "",
        scnumber: "",
        lastModified: "",
        modifiedBy: ""
    };

    const {
        values,
        touched,
        errors,
        handleBlur,
        handleChange,
        setFieldValue,
        handleSubmit,
        resetForm
    } = useFormik({
        initialValues: initialValues,
        validationSchema: ContactValidationForm,
        onSubmit: async (values, { resetForm }) => {
            try {
                const response = await axiosClientPrivate.post('/medicallist', values);
                toast.success("Saved Successfully!", {
                    position: "top-center"
                });
                setFetchTrigger(prev => prev + 1);
                console.log('Response:', response.data);
                resetForm();
            } catch (error) {
                console.log(values);
                console.error('Error:', error);
            }
        },
    });

    const handleEdit = async (id) => {
        try {
            const response = await axiosClientPrivate.get(`/business-units/${id}`);
            setFieldValue("id", response.data.id);
            setFieldValue("email", response.data.email);
            setFieldValue("pphone", response.data.pphone);
            setFieldValue("pcperson", response.data.pcperson);
            setFieldValue("pcnumber", response.data.pcnumber);
            setFieldValue("scperson", response.data.scperson);
            setFieldValue("scnumber", response.data.scnumber);
            setFieldValue("lastModified", response.data.lastModified);
            setFieldValue("modifiedBy", response.data.modifiedBy);
            setShowForm(true);
        } catch (error) {
            console.error('Error fetching item for edit:', error);
        }
    };

    const handleDeleteRow = async (id) => {
        if (window.confirm('Are you sure you want to delete this data?')) {
            try {
                await axiosClientPrivate.delete(`/business-units/${id}`);
                setFetchTrigger(prev => prev + 1);
            } catch (error) {
                console.error('Error deleting row:', error);
            }
        }
    };

    const CustomActionComponent = ({ id }) => {
        CustomActionComponent.propTypes = {
            id: PropTypes.number.isRequired,
        };
        return (
            <div>
                <Button onClick={() => handleEdit(id)}>
                    <EditNoteRoundedIcon />
                </Button>
                <Button color="error" onClick={() => handleDeleteRow(id)}>
                    <DeleteSweepRoundedIcon />
                </Button>
            </div>
        );
    };

    useEffect(() => {
        const controller = new AbortController();

        const getAllOhc = async () => {
            try {
                const response = await axiosClientPrivate.get('business-units', { signal: controller.signal });
                const items = response.data.content;
                setRowData(items);
                if (items.length > 0) {
                    const columns = Object.keys(items[0]).map(key => ({
                        field: key,
                        headerName: key.charAt(0).toUpperCase() + key.slice(1),
                        filter: true,
                        floatingFilter: true,
                        sortable: true
                    }));

                    columns.unshift({
                        field: "Actions", cellRenderer: (params) => {
                            const id = params.data.id;
                            return <CustomActionComponent id={id} />
                        }
                    });

                    setColDefs(columns);
                }
            } catch (err) {
                console.error("Failed to fetch data: ", err);
                setRowData([]);
            }
        };

        getAllOhc();

        return () => {
            controller.abort();
        };
    }, [fetchTrigger]);

    const exportpdf = async () => {
        const doc = new jsPDF();
        const header = [['Id', 'Email', 'Personal Phone', "Primary Contact Person", "Primary Contact Number", "Sec Contact Person", "Sec Contact Number"]];
        const tableData = rowData.map(item => [
            item.id,
            item.email,
            item.pphone,
            item.pcperson,
            item.pcnumber,
            item.scperson,
            item.scnumber,
        ]);
        doc.autoTable({
            head: header,
            body: tableData,
            startY: 10,
            styles: { fontSize: 8 },
            headStyles: { fillColor: '#4CAF50', textColor: '#FFFFFF', fontSize: 10 },
            bodyStyles: { fillColor: '#F5F5F5', textColor: '#333333', fontSize: 8 },
            alternateRowStyles: { fillColor: '#FFFFFF' },
            tableLineWidth: 0.1,
            tableLineColor: '#4CAF50'
        });
        doc.save('ContactList.pdf');
    };

    const exportexcel = async () => {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Contact List');
        worksheet.columns = [
            { header: 'ID', key: 'id', width: 10 },
            { header: 'Email', key: 'email', width: 30 },
            { header: 'Personal Phone', key: 'pphone', width: 15 },
            { header: 'Primary Contact Person', key: 'pcperson', width: 20 },
            { header: 'Primary Contact Number', key: 'pcnumber', width: 20 },
            { header: 'Sec Contact Person', key: 'scperson', width: 20 },
            { header: 'Sec Contact Number', key: 'scnumber', width: 20 }
        ];

        rowData.forEach(item => {
            worksheet.addRow({
                id: item.id,
                email: item.email,
                pphone: item.pphone,
                pcperson: item.pcperson,
                pcnumber: item.pcnumber,
                scperson: item.scperson,
                scnumber: item.scnumber
            });
        });

        const buffer = await workbook.xlsx.writeBuffer();
        const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'ContactList.xlsx';
        link.click();
        window.URL.revokeObjectURL(url);
    };

    return (
        <Box m="20px">
            <ToastContainer />
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2} flexWrap="wrap">
                <ButtonGroup >
                    { /*<Button
                        variant="contained"
                        startIcon={<AddCircleOutlineRoundedIcon />}
                        onClick={() => setShowForm(!showForm)}
                    >
                        {showForm ? 'Cancel' : 'Contact'}
    </Button> */}
                    
                    <Link to="/Patient/:id">
                    <Button
                        variant="contained"
                        startIcon={<AddCircleOutlineRoundedIcon />}
                        // onClick={() => setShowForm(!showForm)}
                    >
                        {/* {showForm ? 'Cancel' : 'Patient'} */}
                        Patient Profile
                    </Button>
                     </Link>
                     <Link to="/ContactList">
                    <Button
                        variant="contained"
                        startIcon={<AddCircleOutlineRoundedIcon />}
                        // onClick={() => setShowForm(!showForm)}
                    >
                        {/* {showForm ? 'Cancel' : 'Patient'} */}
                        Contact
                    </Button>
                     </Link>
                    {/* <Button
                        variant="contained"
                        startIcon={<PictureAsPdfIcon />}
                        onClick={exportpdf}
                    >
                        Export PDF
                    </Button>
                    <Button
                        variant="contained"
                        startIcon={<DownloadIcon />}
                        onClick={exportexcel}
                    >
                        Export Excel
                    </Button> */}
                </ButtonGroup>
            </Stack>
            {showForm && (
                <Box>
                    <form onSubmit={handleSubmit}>
                        <FormControl sx={{ width: '100%' }}>
                            <ContactForm
                                values={values}
                                errors={errors}
                                touched={touched}
                                handleBlur={handleBlur}
                                handleChange={handleChange}
                                handleSubmit={handleSubmit}
                            />
                        </FormControl>
                        <Box mt={6} display="flex" ml={59} mr={2} >
                            <Button type="submit" variant="contained">Submit</Button>
                        </Box>
                    </form>
                </Box>
            )}
            <div className="ag-theme-alpine" style={{ height: '400px', width: '100%' }}>
                {/* <AgGridReact rowData={rowData} columnDefs={colDefs} /> */}
            </div>
        </Box>
    );
};

export default ContactList;
