import { FormControl, Grid} from "@mui/material";
import PropTypes from "prop-types";
import Input from "../common/Input";


const AddFilterMasterForm = ({
  values,
  touched,
  handleBlur,
  errors,
  handleChange,
  setFieldValue,
  handleSubmit,
}) =>{
    AddFilterMasterForm.propTypes = {
    values: PropTypes.object.isRequired,
    touched: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    handleBlur: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    setFieldValue: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
  };


  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} justifyContent="center" alignItems="center" sx={{width:300}} >
          <Grid item xs={12}  justifyContent="center" alignItems="center">
            <FormControl fullWidth>
              <Grid container spacing={2} justifyContent="center" alignItems="center">
                <Grid item xs={12}  container spacing={1} justifyContent="center" alignItems="center">
                  <Input
                    label="Filter Name"
                    name="filterName"
                    type="text"
                    size="large"
                    value={values.filterName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={
                      errors.filterName && touched.filterName? (
                        <span style={{ color: "red" }}>{errors.filterName}</span>
                      ) : null
                    }
                  />
                </Grid>
                <Grid item xs={12}  container spacing={1} justifyContent="center" alignItems="center">
                  <Input
                    label="Filter Code"
                    name="filterCode"
                    type="text"
                    size="large"
                    value={values.filterCode}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={
                      errors.filterCode && touched.filterCode? (
                        <span style={{ color: "red" }}>{errors.filterCode}</span>
                      ) : null
                    }
                  />
                </Grid>
              </Grid>
            </FormControl>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};


export default AddFilterMasterForm;
