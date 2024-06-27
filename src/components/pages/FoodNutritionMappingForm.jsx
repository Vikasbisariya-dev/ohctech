import { FormControl, Grid } from "@mui/material";
import PropTypes from "prop-types";
import Input from "../common/Input";
import SingleSelect from "../common/SingleSelect";

// const FoodNutrients = [
//   {
//     name: "carbohydrate",
//     // value: "Carbohydrate",
//     label: "Enter the name of nutrient",
//   },
//   {
//     name: "protein",
//     // value: "Protein",
//     label: "Enter the name of nutrient",
//   },
//   {
//     name: "protein",
//     // value: "Protein",
//     label: "Enter the name of nutrient",
//   },
//   {
//     name: "protein",
//     // value: "Protein",
//     label: "Enter the name of nutrient",
//   },
//   {
//     name: "protein",
//     // value: "Protein",
//     label: "Enter the name of nutrient",
//   },
//   {
//     name: "protein",
//     // value: "Protein",
//     label: "Enter the name of nutrient",
//   },
//   {
//     name: "protein",
//     // value: "Protein",
//     label: "Enter the name of nutrient",
//   },
//   {
//     name: "protein",
//     // value: "Protein",
//     label: "Enter the name of nutrient",
//   },
// ];

const FoodNutritionMappingForm = ({
  // FoodNutrients,
  nutrient,
  foodname,
  values,
  touched,
  handleBlur,
  errors,
  handleChange,
  handleSubmit,
  setFieldValue,
}) => {
  FoodNutritionMappingForm.propTypes = {
    values: PropTypes.object.isRequired,
    touched: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    handleBlur: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    setFieldValue: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
  };
  
  return (
    <div style={{ display: "flex", justifyContent: "center" }} >
      <form onSubmit={handleSubmit}>
        {/* <Grid container spacing={1} justifyContent="center" alignItems="center" sx={{ width: 600 }}>
          <Grid item xs={12} justifyContent="center" alignItems="center"> */}
            <FormControl fullWidth>
              <Grid container spacing={1} justifyContent="center" alignItems="center" sx={{ width: 600 }}>

              <Grid item  xs={12} sm={6}  container  justifyContent="center"   alignItems="center">
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
                    name="foodMasterId"
                    value={values.foodMasterId}
                    sx={{ width: '250px' }}
                    // onChange={(event, newValue) => {
                    //   const syntheticEvent = {
                    //     target: {
                    //       name: "foodMasterId",
                    //       value: newValue,
                    //     },
                    //   };
                    //   handleChange(syntheticEvent);
                    // }}
                    // handleChange ={handleChange}

                    onChange={(event, newValue) => {
                      setFieldValue('foodMasterId', newValue ? newValue.value : '');
                    }}

                    onBlur={handleBlur}
                    type="text"
                    helperText={
                      errors.foodMasterId && touched.foodMasterId ? (
                        <span style={{ color: "red" }}>{errors.foodMasterId}</span>
                      ) : null
                    }
                  />
                </Grid>

                {nutrient.map((item, index) => (
                  <Grid item xs={12} md={6} container justifyContent="center" alignItems="center" key={index}>
                    <Input
                      label={item.label}
                      name={item.label}
                      type="text"
                      size="large"
                      value={values[item.label]}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={
                        errors[item.label] && touched[item.label] ? (
                          <span style={{ color: "red" }}>{errors[item.label]}</span>
                        ) : null
                      }
                    />
                  </Grid>
                ))}
              </Grid>
            </FormControl>
          {/* </Grid>
        </Grid> */}
      </form>
    </div>
  );
};



export default FoodNutritionMappingForm;
