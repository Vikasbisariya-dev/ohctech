import Input from "../common/Input";
import PropTypes from "prop-types";
import {  Grid} from "@mui/material";
import SingleSelect from "../common/SingleSelect";

 const NutritionalValueForm = ({values,
  touched,
  handleBlur,
  errors,
  handleChange,
  setFieldValue,
  handleSubmit,
  foodName,
}) => {


    NutritionalValueForm.propTypes = {
      values: PropTypes.object.isRequired,
      touched: PropTypes.object.isRequired,
      errors: PropTypes.object.isRequired,
      handleBlur: PropTypes.func.isRequired,
      handleChange: PropTypes.func.isRequired,
      setFieldValue: PropTypes.func.isRequired,
      handleSubmit: PropTypes.func.isRequired,
    };

    const DeepFry = ["Yes","No"];

  return (
          <form onSubmit={handleSubmit}>
              <Grid container spacing={2} justifyContent="center" alignItems="center">
              <Grid item  xs={12} sm={5} spacing={1}  container  justifyContent="center"   alignItems="center">
              <Input
                    label="Food code"
                    name="foodCode"
                    type="text"
                    size="large"
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
              
              <Grid item  xs={12} sm={5}  container spacing={1} justifyContent="center"   alignItems="center">
                <Input
                    label="Food Name"
                    name="foodName"
                    type="text"
                    size="large"
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
                <Grid item  xs={12} sm={5}  container spacing={1} justifyContent="center"  alignItems="center">
                <Input
                    label="Calories"
                    name="calories"
                    type="number"
                    size="large"
                    value={values.calories}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={
                      errors.calories && touched.calories ? (
                        <span style={{ color: "red" }}>
                          {errors.calories}
                        </span>
                      ) : null
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={5}  container spacing={1} justifyContent="center" alignItems="center">
                  <Input
                    label="Protein in grams"
                    name="proteins"
                    type="number"
                    size="large"
                    value={values.proteins}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={
                      errors.proteins && touched.proteins ? (
                        <span style={{ color: "red" }}>
                          {errors.proteins}
                        </span>
                      ) : null
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={5}  container spacing={1} justifyContent="center" alignItems="center">
                  <Input
                    label="Maida in grams"
                    name="maida"
                    type="number"
                    size="large"
                    value={values.maida}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={
                      errors.maida && touched.maida ? (
                        <span style={{ color: "red" }}>
                          {errors.maida}
                        </span>
                      ) : null
                    }
                  />
                </Grid>
              
                <Grid item  xs={12} sm={5} container spacing={1} justifyContent="center"   alignItems="center">
                <Input
                    label="Added sugar in grams"
                    name="addedSugar"
                    type="number"
                    size="large"
                    value={values.addedSugar}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={
                      errors.addedSugar && touched.addedSugar ? (
                        <span style={{ color: "red" }}>
                          {errors.addedSugar}
                        </span>
                      ) : null
                    }
                  />
                </Grid>
                <Grid item  xs={12} sm={5} container spacing={1} justifyContent="center"   alignItems="center">
                <Input
                    label="Saturated fat in grams"
                    name="saturatedFat"
                    type="number"
                    size="large"
                    value={values.saturatedFat}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={
                      errors.saturatedFat && touched.saturatedFat ? (
                        <span style={{ color: "red" }}>
                          {errors.saturatedFat}
                        </span>
                      ) : null
                    }
                  />
                </Grid>
                <Grid item  xs={12} sm={5} container spacing={1} justifyContent="center"   alignItems="center">
                <SingleSelect
                arr={DeepFry}
                label="Deep fried"
                name="deepFried"
                value={values.deepFried}
                onChange={(event, newValue) => {
                  const syntheticEvent = {
                    target: {
                      name: "deepFried",
                      value: newValue,
                    },
                  };
                  handleChange(syntheticEvent);
                }}
                onBlur={handleBlur}
                type="text"
                helperText={
                  errors.deepFried && touched.deepFriede ? (
                    <span style={{ color: "red" }}>{errors.deepFried}</span>
                  ) : null
                }
              />
                </Grid>

                <Grid item xs={12} sm={5} container spacing={1} justifyContent="center" alignItems="center">
                  <Input
                    label="Fibre"
                    name="fibre"
                    type="number"
                    sx = {{width:'100%'}}
                    size="large"
                    value={values.fibre}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={
                      errors.fibre && touched.fibre ? (
                        <span style={{ color: "red" }}>
                          {errors.fibre}
                        </span>
                      ) : null
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={5} container spacing={1} justifyContent="center" alignItems="center">
                  <Input
                    label="Remarks"
                    name="remarks"
                    sx = {{width:'100%'}}
                    type="text"
                    size="large"
                    value={values.remarks}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={
                      errors.remarks && touched.remarks ? (
                        <span style={{ color: "red" }}>
                          {errors.remarks}
                        </span>
                      ) : null
                    }
                  />
                </Grid>

              </Grid>
      </form>
  )
}

export default NutritionalValueForm;

