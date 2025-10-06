import React, { useEffect, useMemo, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useCreatePurchase } from '../hooks/purchase';
import type { TPurchaseCreateRequest } from '../types/purchase';
import { useCompanies, useCreateCompany, useCreateModel, useModels } from '../hooks/company';

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
  const [selectedCompanyId, setSelectedCompanyId] = useState<string | undefined>(undefined);
  const [showCompanyModal, setShowCompanyModal] = useState(false);
  const [showModelModal, setShowModelModal] = useState(false);

  const userId = useMemo(() => localStorage.getItem('userId') || '', []);
  const { data: companiesResp, isLoading: companiesLoading } = useCompanies({ userId, limit: 100 });
  const { data: modelsResp, isLoading: modelsLoading } = useModels({ userId, companyId: selectedCompanyId, limit: 100 });
  const createCompanyMutation = useCreateCompany();
  const createModelMutation = useCreateModel();

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
        {({ values, setFieldValue }) => {
          useEffect(() => {
            const onCompanyCreated = (e: any) => {
              const company = e.detail as { id: string; name: string };
              setSelectedCompanyId(company.id);
              setFieldValue('company', company.name);
            };
            const onModelCreated = (e: any) => {
              const { name } = e.detail as { name: string };
              setFieldValue('model', name);
            };
            window.addEventListener('company-created', onCompanyCreated);
            window.addEventListener('model-created', onModelCreated);
            return () => {
              window.removeEventListener('company-created', onCompanyCreated);
              window.removeEventListener('model-created', onModelCreated);
            };
          }, [setFieldValue]);
          return (
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
                <div className="flex gap-2">
                  <select
                    className="w-full p-2 border border-gray-300 rounded"
                    value={selectedCompanyId || ''}
                    onChange={(e) => {
                      const companyId = e.target.value || undefined;
                      setSelectedCompanyId(companyId);
                      const selected = companiesResp?.data?.companies.find(c => c.id === companyId);
                      setFieldValue('company', selected?.name || '');
                      // reset model when company changes
                      setFieldValue('model', '');
                    }}
                  >
                    <option value="" disabled>
                      {companiesLoading ? 'Loading companies...' : 'Select company'}
                    </option>
                    {(companiesResp?.data?.companies || []).map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                  <button
                    type="button"
                    className="px-3 py-2 border rounded text-sm hover:bg-gray-50"
                    onClick={() => setShowCompanyModal(true)}
                  >
                    + New
                  </button>
                </div>
                <ErrorMessage name="company" component="div" className="text-red-500 text-sm" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Model *</label>
                <div className="flex gap-2">
                  <select
                    className="w-full p-2 border border-gray-300 rounded"
                    value={values.model}
                    onChange={(e) => setFieldValue('model', e.target.value)}
                    disabled={!selectedCompanyId}
                  >
                    <option value="" disabled>
                      {!selectedCompanyId ? 'Select company first' : modelsLoading ? 'Loading models...' : 'Select model'}
                    </option>
                    {(modelsResp?.data?.models || []).map((m) => (
                      <option key={m.id} value={m.name}>{m.name}</option>
                    ))}
                  </select>
                  <button
                    type="button"
                    className="px-3 py-2 border rounded text-sm hover:bg-gray-50 disabled:opacity-50"
                    disabled={!selectedCompanyId}
                    onClick={() => setShowModelModal(true)}
                  >
                    + New
                  </button>
                </div>
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
          );
        }}
      </Formik>

      {/* Create Company Modal */}
      {showCompanyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowCompanyModal(false)}></div>
          <div className="relative bg-white rounded-xl shadow-xl w-full max-w-md p-6">
            <h3 className="text-xl font-semibold mb-4">Create Company</h3>
            <CompanyForm
              onCancel={() => setShowCompanyModal(false)}
              onCreated={(company) => {
                setShowCompanyModal(false);
                setSelectedCompanyId(company.id);
                // set form field via custom event
                const evt = new CustomEvent('company-created', { detail: company });
                window.dispatchEvent(evt);
              }}
              creating={createCompanyMutation.isPending}
              onSubmit={async (payload) => {
                const res = await createCompanyMutation.mutateAsync(payload);
                if (res.success && res.data) {
                  return res.data;
                }
                throw new Error(res.message || 'Failed to create');
              }}
              userId={userId}
            />
          </div>
        </div>
      )}

      {/* Create Model Modal */}
      {showModelModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowModelModal(false)}></div>
          <div className="relative bg-white rounded-xl shadow-xl w-full max-w-md p-6">
            <h3 className="text-xl font-semibold mb-4">Create Model</h3>
            <ModelForm
              onCancel={() => setShowModelModal(false)}
              onCreated={(modelName) => {
                setShowModelModal(false);
                // set model name via custom event
                const evt = new CustomEvent('model-created', { detail: { name: modelName } });
                window.dispatchEvent(evt);
              }}
              creating={createModelMutation.isPending}
              onSubmit={async (payload) => {
                const res = await createModelMutation.mutateAsync(payload);
                if (res.success && res.data) {
                  return res.data.name;
                }
                throw new Error(res.message || 'Failed to create');
              }}
              userId={userId}
              companyId={selectedCompanyId}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PurchaseForm;

interface CompanyFormProps {
  userId: string;
  creating?: boolean;
  onCancel: () => void;
  onSubmit: (payload: { name: string; description?: string; userId: string }) => Promise<{ id: string; name: string }>;
  onCreated: (company: { id: string; name: string }) => void;
}

const CompanyForm: React.FC<CompanyFormProps> = ({ userId, creating, onCancel, onSubmit, onCreated }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState<string | null>(null);
  return (
    <form
      className="space-y-4"
      onSubmit={async (e) => {
        e.preventDefault();
        setError(null);
        try {
          const data = await onSubmit({ name: name.trim(), description: description.trim() || undefined, userId });
          onCreated(data);
        } catch (err: any) {
          setError(err?.message || 'Failed to create');
        }
      }}
    >
      <div>
        <label className="block text-sm font-medium mb-1">Company Name *</label>
        <input className="w-full p-2 border rounded" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea className="w-full p-2 border rounded" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>
      {error && <div className="text-red-600 text-sm">{error}</div>}
      <div className="flex justify-end gap-2 pt-2">
        <button type="button" className="px-4 py-2 border rounded" onClick={onCancel} disabled={creating}>Cancel</button>
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50" disabled={creating}>
          {creating ? 'Creating...' : 'Create'}
        </button>
      </div>
    </form>
  );
};

interface ModelFormProps {
  userId: string;
  companyId?: string;
  creating?: boolean;
  onCancel: () => void;
  onSubmit: (payload: { name: string; description?: string; userId: string; companyId: string }) => Promise<string>;
  onCreated: (modelName: string) => void;
}

const ModelForm: React.FC<ModelFormProps> = ({ userId, companyId, creating, onCancel, onSubmit, onCreated }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState<string | null>(null);
  return (
    <form
      className="space-y-4"
      onSubmit={async (e) => {
        e.preventDefault();
        if (!companyId) return;
        setError(null);
        try {
          const createdName = await onSubmit({ name: name.trim(), description: description.trim() || undefined, userId, companyId });
          onCreated(createdName);
        } catch (err: any) {
          setError(err?.message || 'Failed to create');
        }
      }}
    >
      <div>
        <label className="block text-sm font-medium mb-1">Model Name *</label>
        <input className="w-full p-2 border rounded" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea className="w-full p-2 border rounded" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>
      {error && <div className="text-red-600 text-sm">{error}</div>}
      <div className="flex justify-end gap-2 pt-2">
        <button type="button" className="px-4 py-2 border rounded" onClick={onCancel} disabled={creating}>Cancel</button>
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50" disabled={creating || !companyId}>
          {creating ? 'Creating...' : 'Create'}
        </button>
      </div>
    </form>
  );
};
