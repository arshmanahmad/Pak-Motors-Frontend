import { useState } from 'react'

interface Entity {
  id: number
  name: string
  number: string
  description: string
  createdAt: string
}

// Sample data for demonstration
const sampleEntities: Entity[] = [
  {
    id: 1,
    name: 'Toyota Corolla',
    number: 'TC-001',
    description: 'Reliable sedan with excellent fuel efficiency',
    createdAt: '2024-01-15'
  },
  {
    id: 2,
    name: 'Honda Civic',
    number: 'HC-002',
    description: 'Sporty compact car with advanced safety features',
    createdAt: '2024-01-16'
  },
  {
    id: 3,
    name: 'Suzuki Swift',
    number: 'SS-003',
    description: 'Compact hatchback perfect for city driving',
    createdAt: '2024-01-17'
  },
  {
    id: 4,
    name: 'Toyota Camry',
    number: 'TC-004',
    description: 'Premium sedan with luxury features',
    createdAt: '2024-01-18'
  },
  {
    id: 5,
    name: 'Honda City',
    number: 'HC-005',
    description: 'Elegant sedan with modern design',
    createdAt: '2024-01-19'
  }
]

export default function EntityManagement() {
  const [entities, setEntities] = useState<Entity[]>(sampleEntities)
  const [formData, setFormData] = useState({
    name: '',
    number: '',
    description: ''
  })
  const [isFormOpen, setIsFormOpen] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.name && formData.number && formData.description) {
      const newEntity: Entity = {
        id: entities.length + 1,
        name: formData.name,
        number: formData.number,
        description: formData.description,
        createdAt: new Date().toISOString().split('T')[0]
      }
      setEntities(prev => [...prev, newEntity])
      setFormData({ name: '', number: '', description: '' })
      setIsFormOpen(false)
    }
  }

  const handleDelete = (id: number) => {
    setEntities(prev => prev.filter(entity => entity.id !== id))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Entity Management</h1>
          <p className="text-gray-600 mt-2">Manage your entities with ease</p>
        </div>
        <button
          onClick={() => setIsFormOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span>Add Entity</span>
        </button>
      </div>

      {/* Create Entity Form */}
      {isFormOpen && (
        <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Create New Entity</h2>
            <button
              onClick={() => setIsFormOpen(false)}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Entity Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="Enter entity name"
                  required
                />
              </div>
              <div>
                <label htmlFor="number" className="block text-sm font-medium text-gray-700 mb-2">
                  Entity Number *
                </label>
                <input
                  type="text"
                  id="number"
                  name="number"
                  value={formData.number}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="Enter entity number"
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="Enter entity description"
                required
              />
            </div>
            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={() => setIsFormOpen(false)}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Create Entity
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Entities Table */}
      <div className="bg-white rounded-lg shadow-lg border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Entities List</h2>
          <p className="text-gray-600 mt-1">Total entities: {entities.length}</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Number
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created At
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {entities.map((entity) => (
                <tr key={entity.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {entity.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {entity.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {entity.number}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 max-w-xs">
                    <div className="truncate" title={entity.description}>
                      {entity.description}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {entity.createdAt}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900 transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button 
                        onClick={() => handleDelete(entity.id)}
                        className="text-red-600 hover:text-red-900 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {entities.length === 0 && (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No entities</h3>
            <p className="mt-1 text-sm text-gray-500">Get started by creating a new entity.</p>
          </div>
        )}
      </div>
    </div>
  )
}
