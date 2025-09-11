import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { Link } from 'react-router-dom'

const signupSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6, 'At least 6 characters').required('Password is required'),
})

export default function Signup() {
  return (
    <div className="bg-white shadow-sm rounded-xl p-6">
      <div className="mb-6 flex flex-col items-center">
        <div className="h-12 w-12 rounded-full bg-gray-200 mb-2" aria-label="Logo placeholder" />
        <h2 className="text-xl font-semibold text-gray-900">Create account</h2>
        <p className="text-sm text-gray-500">Sign up to get started</p>
      </div>
      <Formik
        initialValues={{ name: '', email: '', password: '' }}
        validationSchema={signupSchema}
        onSubmit={(values) => {
          console.log('Signup submit', values)
        }}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <Field name="name" type="text" className="mt-1 w-full rounded-md border border-gray-300 focus:border-gray-900 focus:ring-gray-900" />
              <ErrorMessage name="name" component="div" className="mt-1 text-sm text-red-600" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <Field name="email" type="email" className="mt-1 w-full rounded-md border border-gray-300 focus:border-gray-900 focus:ring-gray-900" />
              <ErrorMessage name="email" component="div" className="mt-1 text-sm text-red-600" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <Field name="password" type="password" className="mt-1 w-full rounded-md border border-gray-300 focus:border-gray-900 focus:ring-gray-900" />
              <ErrorMessage name="password" component="div" className="mt-1 text-sm text-red-600" />
            </div>
            <button type="submit" disabled={isSubmitting} className="w-full inline-flex justify-center rounded-md bg-gray-900 px-4 py-2 text-white hover:bg-black disabled:opacity-50">
              Create account
            </button>
            <p className="text-sm text-gray-600 text-center">
              Already have an account? <Link to="/login" className="text-gray-900 hover:underline">Log in</Link>
            </p>
          </Form>
        )}
      </Formik>
    </div>
  )
}
