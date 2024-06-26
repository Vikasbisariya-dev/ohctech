import Input from "../common/Input";
import PropTypes from "prop-types";
import {  Grid} from "@mui/material";

 const FoodForm = ({values,
  touched,
  handleBlur,
  errors,
  handleChange,
//   setFieldValue,
  handleSubmit,}) => {


    FoodForm.propTypes = {
      values: PropTypes.object.isRequired,
      touched: PropTypes.object.isRequired,
      errors: PropTypes.object.isRequired,
      handleBlur: PropTypes.func.isRequired,
      handleChange: PropTypes.func.isRequired,
      setFieldValue: PropTypes.func.isRequired,
      handleSubmit: PropTypes.func.isRequired,
    };

    // const DeepFry = ["Yes","No"];

  return (
          <form onSubmit={handleSubmit}>
              <Grid container spacing={2} justifyContent="center" alignItems="center">
              <Grid item  xs={12} sm={6} spacing={1}  container  justifyContent="center"   alignItems="center">
              <Input
                  label="Food Code"
                  name="foodCode"
                  type="text"
                  size="large"
                  sx={{ width: "300px" }}
                  value={values.foodCode}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={
                    errors.foodCode && touched.foodCode ? (
                      <span style={{ color: "red" }}>
                        {errors.foodCode}
                      </span>
                    ) : null
                  }
                />
              </Grid>
              <Grid item  xs={12} sm={6} spacing={1}  container  justifyContent="center"   alignItems="center">
              <Input
                  label="Food Name"
                  name="foodName"
                  type="text"
                  size="large"
                  sx={{ width: "300px" }}
                  value={values.foodName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={
                    errors.foodName && touched.foodName ? (
                      <span style={{ color: "red" }}>
                        {errors.foodName}
                      </span>
                    ) : null
                  }
                />
              </Grid>
              </Grid>
      </form>
  )
}

export default FoodForm;

