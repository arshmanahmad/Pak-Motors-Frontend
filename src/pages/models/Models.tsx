import { useMemo, useState } from 'react'
import Table from '../../components/Table'
import { useCompanies, useCreateModel, useModels } from '../../hooks/company'

export default function Models() {
  const userId = useMemo(() => localStorage.getItem('userId') || '', [])
  const { data: companiesResp } = useCompanies({ userId, limit: 100 })
  const companies = companiesResp?.data?.companies || []

  const [companyId, setCompanyId] = useState<string>('')
  const { data: modelsResp, isLoading } = useModels({ userId, companyId: companyId || undefined, limit: 100 })
  const createModel = useCreateModel()

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  const models = modelsResp?.data?.models || []

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-xl font-semibold mb-4">Create Model</h2>
        <form
          className="grid grid-cols-1 md:grid-cols-4 gap-4"
          onSubmit={async (e) => {
            e.preventDefault()
            if (!companyId) return
            await createModel.mutateAsync({ name: name.trim(), description: description.trim() || undefined, userId, companyId })
            setName('')
            setDescription('')
          }}
        >
          <select className="p-2 border rounded" value={companyId} onChange={(e) => setCompanyId(e.target.value)} required>
            <option value="" disabled>
              Select company
            </option>
            {companies.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
          <input className="p-2 border rounded" placeholder="Model name" value={name} onChange={(e) => setName(e.target.value)} required />
          <input className="p-2 border rounded" placeholder="Description (optional)" value={description} onChange={(e) => setDescription(e.target.value)} />
          <button type="submit" className="bg-blue-600 text-white rounded px-4 py-2 disabled:opacity-50" disabled={createModel.isPending || !companyId}>
            {createModel.isPending ? 'Creating...' : 'Create'}
          </button>
        </form>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Models</h2>
        </div>
        {isLoading ? (
          <div className="text-gray-600">Loading...</div>
        ) : (
          <Table
            columns={[
              { key: 'company', header: 'Company', render: (row: any) => (typeof row.companyId === 'object' ? row.companyId.name : '-') },
              { key: 'name', header: 'Model' },
              { key: 'description', header: 'Description' },
              { key: 'createdAt', header: 'Created' },
            ]}
            data={models}
          />
        )}
      </div>
    </div>
  )
}


