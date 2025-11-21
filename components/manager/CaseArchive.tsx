import React, { useState } from 'react';
import { Search, Filter, Lock, Eye, EyeOff } from 'lucide-react';
import { MOCK_REPORTS } from '../../services/mockData';

export const CaseArchive: React.FC = () => {
  const [showPrivateDetails, setShowPrivateDetails] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredReports = MOCK_REPORTS.filter(report => 
    report.narrative.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="p-6 bg-gray-50 min-h-full">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-display font-bold text-ayni-lilac-900">Archivo 1325</h1>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setShowPrivateDetails(!showPrivateDetails)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-colors shadow-sm ${
              showPrivateDetails ? 'bg-ayni-rose-100 text-ayni-rose-700' : 'bg-white text-ayni-lilac-700 border border-gray-200'
            }`}
          >
            {showPrivateDetails ? <><EyeOff size={16} /> Ocultar Datos</> : <><Eye size={16} /> Revelar Datos</>}
          </button>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Toolbar */}
        <div className="p-5 border-b border-gray-100 flex gap-4 items-center bg-white">
          <div className="relative flex-1 max-w-md group">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-ayni-lilac-500 transition-colors" size={18} />
            <input 
              type="text"
              placeholder="Buscar por palabras clave..."
              className="w-full pl-12 pr-4 py-3 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-ayni-lilac-200 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="p-3 text-gray-500 hover:bg-gray-100 rounded-xl transition-colors border border-transparent hover:border-gray-200">
            <Filter size={20} />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50/50 text-gray-400 font-bold text-xs uppercase tracking-wider">
              <tr>
                <th className="px-8 py-5">ID & Fecha</th>
                <th className="px-6 py-5">Categoría</th>
                <th className="px-6 py-5">Riesgo</th>
                <th className="px-6 py-5">Narrativa</th>
                <th className="px-6 py-5">Estado</th>
                <th className="px-6 py-5">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredReports.map((report) => (
                <tr key={report.id} className="hover:bg-ayni-lilac-50/30 transition-colors group">
                  <td className="px-8 py-5">
                    <div className="flex flex-col">
                      <span className="font-bold text-gray-800 group-hover:text-ayni-lilac-700 transition-colors">{report.id}</span>
                      <span className="text-xs text-gray-400">{new Date(report.timestamp).toLocaleDateString()}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className="px-3 py-1.5 bg-white border border-gray-200 text-gray-600 rounded-lg text-xs font-bold">
                      {report.category}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                     <span className={`flex items-center gap-1.5 w-max px-3 py-1.5 rounded-full text-xs font-bold ${
                       report.riskLevel === 'Crítico' || report.riskLevel === 'Alto' 
                        ? 'bg-red-50 text-red-600' 
                        : 'bg-yellow-50 text-yellow-600'
                     }`}>
                      <span className={`w-2 h-2 rounded-full ${report.riskLevel === 'Crítico' || report.riskLevel === 'Alto' ? 'bg-red-500' : 'bg-yellow-500'}`}></span>
                      {report.riskLevel}
                    </span>
                  </td>
                  <td className="px-6 py-5 max-w-xs">
                    <p className={`text-sm truncate ${showPrivateDetails ? 'text-gray-700' : 'text-gray-300 select-none'}`}>
                      {showPrivateDetails ? report.narrative : '••••••••••••••••••••••••'}
                    </p>
                  </td>
                  <td className="px-6 py-5">
                    <span className={`text-sm font-bold ${report.status === 'Pendiente' ? 'text-orange-500' : 'text-green-600'}`}>
                      {report.status}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <button className="text-ayni-lilac-600 hover:text-ayni-lilac-800 hover:bg-ayni-lilac-100 p-2 rounded-lg transition-colors">
                      <Lock size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredReports.length === 0 && (
          <div className="p-12 text-center text-gray-400 flex flex-col items-center">
            <Search size={48} className="mb-4 opacity-20" />
            <p>No se encontraron casos en el archivo.</p>
          </div>
        )}
      </div>
    </div>
  );
};