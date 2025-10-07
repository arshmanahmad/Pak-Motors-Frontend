import React from 'react'

type TableColumn<T> = {
  key: keyof T | string
  header: string
  render?: (row: T) => React.ReactNode
  className?: string
}

interface TableProps<T> {
  columns: TableColumn<T>[]
  data: T[]
  emptyText?: string
}

export default function Table<T extends { id?: string | number }>({ columns, data, emptyText = 'No data' }: TableProps<T>) {
  return (
    <div className="overflow-x-auto border border-gray-200 rounded-lg bg-white">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((col) => (
              <th key={String(col.key)} className={`px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider ${col.className || ''}`}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data.length === 0 && (
            <tr>
              <td className="px-4 py-6 text-center text-sm text-gray-500" colSpan={columns.length}>{emptyText}</td>
            </tr>
          )}
          {data.map((row, idx) => (
            <tr key={(row.id as any) ?? idx} className="hover:bg-gray-50">
              {columns.map((col) => (
                <td key={String(col.key)} className={`px-4 py-3 text-sm text-gray-800 ${col.className || ''}`}>
                  {col.render ? col.render(row) : (row as any)[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}


