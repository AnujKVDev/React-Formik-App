import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <Formik
        initialValues={{
          fullName: '',
          birthday: '',
          phone: '',
          address: '',
          password: '',
          confirmPassword: ''
        }}
        validationSchema={Yup.object().shape({
          fullName: Yup.string()
            .required('Full Name is required'),
          birthday: Yup.string()
            .required('Birthday is required'),
          phone: Yup.string()
            .min(10, 'Phone number must be 10 digits long')
            .max(10, 'Phone number must be 10 digits long')
            .matches(/[1-9]{2}[0-9]{8}$/, 'Phone number first digit should not be zero')
            .required('Phone is required'),
          address: Yup.string()
            .required('Address is required'),
          password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('Password is required'),
          confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Confirm Password is required')
        })}
        onSubmit={(fields) => {
          if (fields) {
            let userData = { ...fields };
            userData["phone"] = "+44" + fields.phone;
            delete userData["confirmPassword"];
            console.log("Submitted Data is", JSON.stringify(userData, null, 4));
          }
        }}
        render={({ errors, status, touched, isValid }) => (
          <Form className='cstmForm'>
            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <Field name="fullName" type="text" className={'form-control' + (errors.fullName && touched.fullName ? ' is-invalid' : '')} />
              <ErrorMessage name="fullName" component="div" className="invalid-feedback" />
            </div>
            <div className="form-group">
              <label htmlFor="birthday">Birthday</label>
              <Field name="birthday" type="date" className={'form-control' + (errors.birthday && touched.birthday ? ' is-invalid' : '')} />
              <ErrorMessage name="birthday" component="div" className="invalid-feedback" />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <div className='d-flex'>
                <span className="prefix">+44</span>
                <Field name="phone" type="text" className={'form-control' + (errors.phone && touched.phone ? ' is-invalid' : '')} />
                <ErrorMessage name="phone" component="div" className="invalid-feedback" />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="address">Address</label>
              <Field name="address" type="text" className={'form-control' + (errors.address && touched.address ? ' is-invalid' : '')} />
              <ErrorMessage name="address" component="div" className="invalid-feedback" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <Field name="password" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
              <ErrorMessage name="password" component="div" className="invalid-feedback" />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <Field name="confirmPassword" type="password" className={'form-control' + (errors.confirmPassword && touched.confirmPassword ? ' is-invalid' : '')} />
              <ErrorMessage name="confirmPassword" component="div" className="invalid-feedback" />
            </div>
            <div className="form-group groupBtns">
              <button type="submit" className={(!isValid || !(touched.fullName) || !(touched.birthday) || !(touched.phone) || !(touched.address) || !(touched.password) || !(touched.confirmPassword)) ? "dscActv" : "dscNonActv"} disabled={!isValid || !(touched.fullName) || !(touched.birthday) || !(touched.phone) || !(touched.address) || !(touched.password) || !(touched.confirmPassword)}>Register</button>
              <button type="reset" className="btn btn-dark">Reset</button>
            </div>
          </Form>
        )}
      />
    )
  }
}

export default App; 