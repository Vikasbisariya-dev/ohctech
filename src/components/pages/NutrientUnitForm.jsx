import Input from "../common/Input";
import PropTypes from "prop-types";
import {  Grid} from "@mui/material";
import SingleSelect from "../common/SingleSelect";

 const NutrientUnitForm = ({values,
  touched,
  handleBlur,
  errors,
  handleChange,
  unit,
  setFieldValue,
  handleSubmit,}) => {


    NutrientUnitForm.propTypes = {
      values: PropTypes.object.isRequired,
      touched: PropTypes.object.isRequired,
      errors: PropTypes.object.isRequired,
      handleBlur: PropTypes.func.isRequired,
      handleChange: PropTypes.func.isRequired,
      setFieldValue: PropTypes.func.isRequired,
      handleSubmit: PropTypes.func.isRequired,
    };

  





  return (
          <form onSubmit={handleSubmit}>
              <Grid container spacing={2} justifyContent="center" alignItems="center">
              
              <Grid item  xs={12} sm={12} spacing={1}  container  justifyContent="center"   alignItems="center">
              <Input
                  label="Food Name"
                  name="nutrientName"
                  type="text"
                  size="large"
                  sx={{ width: "300px" }}
                  value={values.nutrientName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={
                    errors.nutrientName && touched.nutrientName ? (
                      <span style={{ color: "red" }}>
                        {errors.nutrientName}
                      </span>
                    ) : null
                  }
                />
              </Grid>

              <Grid item  xs={12} sm={12} spacing={1}  container  justifyContent="center"   alignItems="center">
                <SingleSelect
                    arr={unit}
                    label="Unit"
                    name="unit"
                    value={values.unit}
                    sx={{ width: '250px' }}
                    // onChange={(event, newValue) => {
                    //   const syntheticEvent = {
                    //     target: {
                    //       name: "unit",
                    //       value: newValue,
                    //     },
                    //   };
                    //   handleChange(syntheticEvent);
                    // }}
                    // handleChange ={handleChange}

                    onChange={(event, newValue) => {
                      setFieldValue('unit', newValue ? newValue.label : '');
                    }}

                    onBlur={handleBlur}
                    type="text"
                    helperText={
                      errors.unit && touched.unit ? (
                        <span style={{ color: "red" }}>{errors.unit}</span>
                      ) : null
                    }
                  />
                </Grid>
              </Grid>
      </form>
  )
}

export default NutrientUnitForm;

