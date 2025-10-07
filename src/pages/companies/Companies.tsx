import { useMemo, useState } from 'react'
import Table from '../../components/Table'
import { useCompanies, useCreateCompany } from '../../hooks/company'

export default function Companies() {
  const userId = useMemo(() => localStorage.getItem('userId') || '', [])
  const { data, isLoading } = useCompanies({ userId, limit: 100 })
  const createCompany = useCreateCompany()

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  const companies = data?.data?.companies || []

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-xl font-semibold mb-4">Create Company</h2>
        <form
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
          onSubmit={async (e) => {
            e.preventDefault()
            await createCompany.mutateAsync({ name: name.trim(), description: description.trim() || undefined, userId })
            setName('')
            setDescription('')
          }}
        >
          <input className="p-2 border rounded" placeholder="Company name" value={name} onChange={(e) => setName(e.target.value)} required />
          <input className="p-2 border rounded" placeholder="Description (optional)" value={description} onChange={(e) => setDescription(e.target.value)} />
          <button type="submit" className="bg-blue-600 text-white rounded px-4 py-2 disabled:opacity-50" disabled={createCompany.isPending}>
            {createCompany.isPending ? 'Creating...' : 'Create'}
          </button>
        </form>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Companies</h2>
        </div>
        {isLoading ? (
          <div className="text-gray-600">Loading...</div>
        ) : (
          <Table
            columns={[
              { key: 'name', header: 'Name' },
              { key: 'description', header: 'Description' },
              { key: 'createdAt', header: 'Created' },
            ]}
            data={companies}
          />
        )}
      </div>
    </div>
  )
}


