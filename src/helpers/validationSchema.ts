import * as Yup from "yup";

export const loginValidate = Yup.object({
  // username: Yup.string().required("Required"),
  // password: Yup.string().min(2, "Min 6 characters").required("Required"),
});