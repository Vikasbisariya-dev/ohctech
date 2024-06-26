import Input from "../common/Input";
import PropTypes from "prop-types";
import {  Grid} from "@mui/material";
import SingleSelect from "../common/SingleSelect";

 const FoodMasterForm = ({values,
  touched,
  handleBlur,
  errors,
  handleChange,
  setFieldValue,
  handleSubmit,
  foodname,
}) => {


    FoodMasterForm.propTypes = {
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
              {/*<Input
                  label="Food Name"
                  name="foodId"
                  type="text"
                  size="large"
                  sx={{ width: "300px" }}
                  value={values.foodId}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={
                    errors.foodId && touched.foodId ? (
                      <span style={{ color: "red" }}>
                        {errors.foodId}
                      </span>
                    ) : null
                  }
                />*/}
                <SingleSelect
                    arr={foodname}
                    label="Food Name"
                    name="foodname"
                    value={values.foodname}
                    sx={{ width: '250px' }}
                    // onChange={(event, newValue) => {
                    //   const syntheticEvent = {
                    //     target: {
                    //       name: "foodname",
                    //       value: newValue,
                    //     },
                    //   };
                    //   handleChange(syntheticEvent);
                    // }}
                    // handleChange ={handleChange}

                    onChange={(event, newValue) => {
                      setFieldValue('foodname', newValue ? newValue.label : '');
                    }}

                    onBlur={handleBlur}
                    type="text"
                    helperText={
                      errors.foodname && touched.foodname ? (
                        <span style={{ color: "red" }}>{errors.foodname}</span>
                      ) : null
                    }
                  />
                </Grid>
              
              <Grid item  xs={12} sm={5}  container spacing={1} justifyContent="center"   alignItems="center">
                <Input
                    label="Quantity in grams"
                    name="quantityInGrams"
                    type="text"
                    size="large"
                    value={values.quantityInGrams}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={
                      errors.quantityInGrams && touched.quantityInGrams ? (
                        <span style={{ color: "red" }}>
                          {errors.quantityInGrams}
                        </span>
                      ) : null
                    }
                  />
                </Grid>
                <Grid item  xs={12} sm={5}  container spacing={1} justifyContent="center"  alignItems="center">
                <Input
                    label="Calories"
                    name="calories"
                    type="text"
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
                    label="Protein"
                    name="proteins"
                    type="text"
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
              
                <Grid item  xs={12} sm={5} container spacing={1} justifyContent="center"   alignItems="center">
                <Input
                    label="Added sugar"
                    name="addedSugar"
                    type="text"
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
                    label="Maida"
                    name="maida"
                    type="text"
                    sx = {{width:'100%'}}
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
                <Grid item xs={12} sm={5} container spacing={1} justifyContent="center" alignItems="center">
                  <Input
                    label="Saturated fats"
                    name="saturatedFats"
                    sx = {{width:'100%'}}
                    type="text"
                    size="large"
                    value={values.saturatedFats}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={
                      errors.saturatedFats && touched.saturatedFats ? (
                        <span style={{ color: "red" }}>
                          {errors.saturatedFats}
                        </span>
                      ) : null
                    }
                  />
                </Grid>

              </Grid>
      </form>
  )
}

export default FoodMasterForm;

