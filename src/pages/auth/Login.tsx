import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Logo from '../../components/Logo'

const loginSchema = Yup.object({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6, 'At least 6 characters').required('Password is required'),
})

export default function Login() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (values: { email: string; password: string }) => {
    setIsLoading(true)
    
    // Simulate API call with loading delay
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // For demo purposes, accept any email/password
    console.log('Login submit', values)
    
    // Redirect to dashboard after loading
    navigate('/dashboard')
  }

  return (
    <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md mx-auto border border-gray-100">
      <div className="mb-8 flex flex-col items-center">
        <Logo size="lg" showText={true} className="mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome back</h2>
        <p className="text-sm text-gray-600 text-center">Sign in to your Pak Motors account</p>
      </div>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={loginSchema}
        onSubmit={handleLogin}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
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
                placeholder="Enter your password"
              />
              <ErrorMessage name="password" component="div" className="mt-2 text-sm text-red-600" />
            </div>
            <button 
              type="submit" 
              disabled={isSubmitting || isLoading} 
              className="w-full inline-flex justify-center items-center rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-3 text-white font-semibold hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </div>
              ) : (
                'Sign in'
              )}
            </button>
            <p className="text-sm text-gray-600 text-center">
              Don't have an account? <Link to="/signup" className="text-gray-900 hover:underline">Sign up</Link>
            </p>
          </Form>
        )}
      </Formik>
    </div>
  )
}
