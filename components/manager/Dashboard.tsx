import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { FileText, TrendingUp, AlertCircle, Download } from 'lucide-react';
import { MOCK_IGI_DATA, MOCK_REPORTS } from '../../services/mockData';
import { generateIGIInsights } from '../../services/geminiService';
import { Button } from '../ui/Button';

export const Dashboard: React.FC = () => {
  const [insights, setInsights] = useState<string>('Generando análisis de auditoría...');
  
  useEffect(() => {
    const fetchInsights = async () => {
      const context = JSON.stringify(MOCK_IGI_DATA);
      const result = await generateIGIInsights(context);
      setInsights(result);
    };
    fetchInsights();
  }, []);

  return (
    <div className="p-6 space-y-8 bg-gray-50 min-h-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-4xl font-display font-bold text-ayni-lilac-900">Auditoría IGI</h1>
          <p className="text-gray-500 mt-1">Índice de Gobernanza Inclusiva &bull; Ecuador 2024</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button variant="outline" size="sm" className="flex gap-2 rounded-xl">
            <Download size={16} /> Exportar Evidencia
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl shadow-lg shadow-gray-100 border border-gray-100 group hover:-translate-y-1 transition-transform">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-gray-500 font-medium uppercase tracking-wider text-xs">Silencio Roto</h3>
            <div className="bg-green-100 p-2 rounded-full">
                <TrendingUp className="text-green-600" size={20} />
            </div>
          </div>
          <p className="text-4xl font-bold text-gray-800">18.5%</p>
          <p className="text-sm text-green-600 mt-2 font-medium">+7.7% vs promedio nacional</p>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-lg shadow-gray-100 border border-gray-100 group hover:-translate-y-1 transition-transform">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-gray-500 font-medium uppercase tracking-wider text-xs">Casos Activos</h3>
            <div className="bg-ayni-lilac-100 p-2 rounded-full">
                <FileText className="text-ayni-lilac-600" size={20} />
            </div>
          </div>
          <p className="text-4xl font-bold text-gray-800">{MOCK_REPORTS.filter(r => r.status !== 'Archivado').length}</p>
          <p className="text-sm text-gray-400 mt-2">Requieren mediación</p>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-lg shadow-gray-100 border border-gray-100 group hover:-translate-y-1 transition-transform">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-gray-500 font-medium uppercase tracking-wider text-xs">Brecha Presupuestal</h3>
            <div className="bg-red-100 p-2 rounded-full">
                <AlertCircle className="text-red-500" size={20} />
            </div>
          </div>
          <p className="text-4xl font-bold text-red-500">72%</p>
          <p className="text-sm text-red-700 mt-2 font-medium">No Ejecutado (Ineficiencia)</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-6 border-l-4 border-ayni-lilac-500 pl-3">Presupuesto vs. Seguridad Real</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MOCK_IGI_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#9ca3af'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af'}} />
                <Tooltip cursor={{fill: '#f9fafb'}} contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'}} />
                <Legend />
                <Bar dataKey="budgetAllocated" name="Asignado ($)" fill="#e5e7eb" radius={[6, 6, 0, 0]} />
                <Bar dataKey="budgetExecuted" name="Ejecutado ($)" fill="#a855f7" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-6 border-l-4 border-ayni-rose-500 pl-3">Impunidad vs. Denuncia</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={MOCK_IGI_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#9ca3af'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af'}} />
                <Tooltip contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'}} />
                <Legend />
                <Line type="monotone" dataKey="reportedCases" name="Reportados" stroke="#2dd4bf" strokeWidth={4} dot={{r: 6, fill: '#2dd4bf', strokeWidth: 2, stroke: '#fff'}} />
                <Line type="monotone" dataKey="unresolvedCases" name="Sin Resolver" stroke="#f43f5e" strokeWidth={4} dot={{r: 6, fill: '#f43f5e', strokeWidth: 2, stroke: '#fff'}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* AI Insights */}
      <div className="bg-gradient-to-r from-ayni-lilac-900 to-ayni-lilac-800 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-32 h-full bg-white opacity-5 skew-x-12"></div>
        
        <div className="flex items-start gap-5 relative z-10">
          <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-sm">
            <AlertCircle className="text-ayni-rose-300" size={32} />
          </div>
          <div className="flex-1">
            <h3 className="text-2xl font-display font-bold mb-3">Hallazgos de Inteligencia Artificial</h3>
            <div className="prose prose-invert max-w-none text-ayni-lilac-100 whitespace-pre-line text-lg leading-relaxed">
              {insights}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};