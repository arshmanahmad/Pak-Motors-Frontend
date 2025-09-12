import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { Link } from 'react-router-dom'
import Logo from '../../components/Logo'

const signupSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6, 'At least 6 characters').required('Password is required'),
})

export default function Signup() {
  return (
    <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md mx-auto border border-gray-100">
      <div className="mb-8 flex flex-col items-center">
        <Logo size="lg" showText={true} className="mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Create account</h2>
        <p className="text-sm text-gray-600 text-center">Join Pak Motors today</p>
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
              <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
              <Field 
                name="name" 
                type="text" 
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors duration-200" 
                placeholder="Enter your full name"
              />
              <ErrorMessage name="name" component="div" className="mt-2 text-sm text-red-600" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
              <Field 
                name="email" 
                type="email" 
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors duration-200" 
                placeholder="Enter your email"
              />
              <ErrorMessage name="email" component="div" className="mt-2 text-sm text-red-600" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
              <Field 
                name="password" 
                type="password" 
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors duration-200" 
                placeholder="Create a password"
              />
              <ErrorMessage name="password" component="div" className="mt-2 text-sm text-red-600" />
            </div>
            <button 
              type="submit" 
              disabled={isSubmitting} 
              className="w-full inline-flex justify-center items-center rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-3 text-white font-semibold hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              {isSubmitting ? 'Creating account...' : 'Create account'}
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
