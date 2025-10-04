import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useCreatePurchase } from '../hooks/purchase';
import type { TPurchaseCreateRequest } from '../types/purchase';

const validationSchema = Yup.object({
  serialNo: Yup.string().required('Serial number is required'),
  company: Yup.string().required('Company is required'),
  model: Yup.string().required('Model is required'),
  engineNumber: Yup.string().required('Engine number is required'),
  chasisNumber: Yup.string().required('Chasis number is required'),
  registration: Yup.string().required('Registration is required'),
  horsePower: Yup.string().required('Horse power is required'),
  color: Yup.string().required('Color is required'),
  invoiceName: Yup.string().when('isNew', {
    is: true,
    then: (schema) => schema.required('Invoice name is required for new vehicles'),
    otherwise: (schema) => schema.notRequired(),
  }),
  invoiceDate: Yup.string().when('isNew', {
    is: true,
    then: (schema) => schema.required('Invoice date is required for new vehicles'),
    otherwise: (schema) => schema.notRequired(),
  }),
  receiveDate: Yup.string().when('isNew', {
    is: true,
    then: (schema) => schema.required('Receive date is required for new vehicles'),
    otherwise: (schema) => schema.notRequired(),
  }),
  purchaseAmount: Yup.number()
    .min(0, 'Purchase amount must be 0 or greater')
    .required('Purchase amount is required'),
  purchaseFrom: Yup.string().required('Purchase from is required'),
  witness: Yup.string().required('Witness is required'),
});

const initialValues: TPurchaseCreateRequest = {
  serialNo: '',
  company: '',
  model: '',
  engineNumber: '',
  chasisNumber: '',
  registration: '',
  isNew: true,
  horsePower: '',
  color: '',
  invoiceName: '',
  invoiceDate: '',
  receiveDate: '',
  invoiceReceived: false,
  invoiceDelivered: false,
  warrantyBook: false,
  warrantyBookDelivered: false,
  sphereKey: false,
  document: false,
  purchaseAmount: 0,
  attachedDocuments: [],
  purchaseFrom: '',
  witness: '',
  note: '',
};

const PurchaseForm: React.FC = () => {
  const createPurchaseMutation = useCreatePurchase();

  const handleSubmit = async (values: TPurchaseCreateRequest) => {
    try {
      await createPurchaseMutation.mutateAsync(values);
      alert('Purchase created successfully!');
    } catch (error) {
      console.error('Error creating purchase:', error);
      alert('Error creating purchase. Please try again.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <h2 className="text-2xl font-bold mb-6">Create New Purchase</h2>
      
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values,
        //  setFieldValue
         }) => (
          <Form className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Serial Number *</label>
                <Field
                  name="serialNo"
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded"
                />
                <ErrorMessage name="serialNo" component="div" className="text-red-500 text-sm" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Company *</label>
                <Field
                  name="company"
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded"
                />
                <ErrorMessage name="company" component="div" className="text-red-500 text-sm" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Model *</label>
                <Field
                  name="model"
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded"
                />
                <ErrorMessage name="model" component="div" className="text-red-500 text-sm" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Engine Number *</label>
                <Field
                  name="engineNumber"
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded"
                />
                <ErrorMessage name="engineNumber" component="div" className="text-red-500 text-sm" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Chasis Number *</label>
                <Field
                  name="chasisNumber"
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded"
                />
                <ErrorMessage name="chasisNumber" component="div" className="text-red-500 text-sm" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Registration *</label>
                <Field
                  name="registration"
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded"
                />
                <ErrorMessage name="registration" component="div" className="text-red-500 text-sm" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Horse Power *</label>
                <Field
                  name="horsePower"
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded"
                />
                <ErrorMessage name="horsePower" component="div" className="text-red-500 text-sm" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Color *</label>
                <Field
                  name="color"
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded"
                />
                <ErrorMessage name="color" component="div" className="text-red-500 text-sm" />
              </div>
            </div>

            {/* Vehicle Status */}
            <div className="border-t pt-4">
              <h3 className="text-lg font-semibold mb-4">Vehicle Status</h3>
              <div className="flex items-center space-x-4">
                <label className="flex items-center">
                  <Field
                    name="isNew"
                    type="checkbox"
                    className="mr-2"
                  />
                  New Vehicle
                </label>
              </div>
            </div>

            {/* Invoice Information (only for new vehicles) */}
            {values.isNew && (
              <div className="border-t pt-4">
                <h3 className="text-lg font-semibold mb-4">Invoice Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Invoice Name *</label>
                    <Field
                      name="invoiceName"
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                    <ErrorMessage name="invoiceName" component="div" className="text-red-500 text-sm" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Invoice Date *</label>
                    <Field
                      name="invoiceDate"
                      type="date"
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                    <ErrorMessage name="invoiceDate" component="div" className="text-red-500 text-sm" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Receive Date *</label>
                    <Field
                      name="receiveDate"
                      type="date"
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                    <ErrorMessage name="receiveDate" component="div" className="text-red-500 text-sm" />
                  </div>
                </div>
              </div>
            )}

            {/* Purchase Details */}
            <div className="border-t pt-4">
              <h3 className="text-lg font-semibold mb-4">Purchase Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Purchase Amount *</label>
                  <Field
                    name="purchaseAmount"
                    type="number"
                    min="0"
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                  <ErrorMessage name="purchaseAmount" component="div" className="text-red-500 text-sm" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Purchase From *</label>
                  <Field
                    name="purchaseFrom"
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                  <ErrorMessage name="purchaseFrom" component="div" className="text-red-500 text-sm" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Witness *</label>
                  <Field
                    name="witness"
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                  <ErrorMessage name="witness" component="div" className="text-red-500 text-sm" />
                </div>
              </div>
            </div>

            {/* Document Status */}
            <div className="border-t pt-4">
              <h3 className="text-lg font-semibold mb-4">Document Status</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <label className="flex items-center">
                  <Field
                    name="invoiceReceived"
                    type="checkbox"
                    className="mr-2"
                  />
                  Invoice Received
                </label>

                <label className="flex items-center">
                  <Field
                    name="invoiceDelivered"
                    type="checkbox"
                    className="mr-2"
                  />
                  Invoice Delivered
                </label>

                <label className="flex items-center">
                  <Field
                    name="warrantyBook"
                    type="checkbox"
                    className="mr-2"
                  />
                  Warranty Book
                </label>

                <label className="flex items-center">
                  <Field
                    name="warrantyBookDelivered"
                    type="checkbox"
                    className="mr-2"
                  />
                  Warranty Book Delivered
                </label>

                <label className="flex items-center">
                  <Field
                    name="sphereKey"
                    type="checkbox"
                    className="mr-2"
                  />
                  Sphere Key
                </label>

                <label className="flex items-center">
                  <Field
                    name="document"
                    type="checkbox"
                    className="mr-2"
                  />
                  Document
                </label>
              </div>
            </div>

            {/* Additional Notes */}
            <div className="border-t pt-4">
              <div>
                <label className="block text-sm font-medium mb-1">Note</label>
                <Field
                  name="note"
                  as="textarea"
                  rows={3}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="border-t pt-4">
              <button
                type="submit"
                disabled={createPurchaseMutation.isPending}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50"
              >
                {createPurchaseMutation.isPending ? 'Creating...' : 'Create Purchase'}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default PurchaseForm;
