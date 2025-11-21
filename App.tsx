import React, { useState } from 'react';
import { Role } from './types';
import { Button } from './components/ui/Button';
import { SafeSpace } from './components/citizen/SafeSpace';
import { LegalTutor } from './components/citizen/LegalTutor';
import { Dashboard } from './components/manager/Dashboard';
import { CaseArchive } from './components/manager/CaseArchive';
import { Heart, Shield, BarChart3, Users, Home, BookOpen, LogOut, Menu, Flower } from 'lucide-react';

const App: React.FC = () => {
  const [currentRole, setCurrentRole] = useState<Role | null>(null);
  const [activeTab, setActiveTab] = useState<string>('home');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // -- NAVIGATION LOGIC --

  const renderRoleSelection = () => (
    <div className="min-h-screen bg-andean-gradient flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 w-full h-4 bg-andean-stripe"></div>
      <div className="absolute bottom-0 w-full h-4 bg-andean-stripe"></div>
      
      <div className="max-w-3xl w-full z-10">
        <div className="text-center mb-10">
            <h1 className="font-display font-bold text-5xl text-ayni-lilac-900 mb-2">J-MÓVIL</h1>
            <p className="text-ayni-lilac-700 text-lg">IA Feminista & No Extractivista (Ecuador)</p>
        </div>

        <div className="bg-white/80 backdrop-blur-xl rounded-[2rem] shadow-2xl border border-white flex flex-col md:flex-row overflow-hidden">
            {/* Citizen Side */}
            <div 
                className="flex-1 p-10 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-ayni-rose-200 hover:bg-ayni-rose-50 transition-colors cursor-pointer group" 
                onClick={() => { setCurrentRole(Role.CITIZEN); setActiveTab('safespace'); }}
            >
            <div className="mb-6 p-6 bg-ayni-rose-100 rounded-full group-hover:scale-110 transition-transform shadow-inner">
                <Heart className="w-14 h-14 text-ayni-rose-500" fill="currentColor" fillOpacity={0.2} />
            </div>
            <h2 className="text-2xl font-display font-bold text-gray-800 mb-2">Soy Ciudadana</h2>
            <p className="text-center text-gray-500 mb-8 leading-relaxed">
                Acceso confidencial a <br/><strong>Espacio Seguro</strong> y Consejería.
            </p>
            <Button variant="secondary" size="lg">Entrar</Button>
            </div>

            {/* Manager Side */}
            <div 
                className="flex-1 p-10 flex flex-col items-center justify-center hover:bg-ayni-lilac-50 transition-colors cursor-pointer group" 
                onClick={() => { setCurrentRole(Role.MANAGER); setActiveTab('dashboard'); }}
            >
            <div className="mb-6 p-6 bg-ayni-lilac-100 rounded-full group-hover:scale-110 transition-transform shadow-inner">
                <Shield className="w-14 h-14 text-ayni-lilac-500" fill="currentColor" fillOpacity={0.2} />
            </div>
            <h2 className="text-2xl font-display font-bold text-gray-800 mb-2">Soy Gestora</h2>
            <p className="text-center text-gray-500 mb-8 leading-relaxed">
                Auditoría IGI y <br/>Gestión de Casos 1325.
            </p>
            <Button variant="primary" size="lg">Acceder</Button>
            </div>
        </div>
      </div>
    </div>
  );

  const renderCitizenLayout = () => (
    <div className="min-h-screen bg-ayni-rose-50 flex flex-col">
      <header className="bg-white shadow-sm p-4 flex justify-between items-center sticky top-0 z-20 border-b border-ayni-rose-100">
        <h1 className="font-display font-bold text-xl text-ayni-lilac-700 flex items-center gap-2">
          <Flower className="text-ayni-rose-500" size={24}/> J-MÓVIL
        </h1>
        <button onClick={() => setCurrentRole(null)} className="text-gray-400 hover:text-ayni-rose-500 transition-colors">
          <LogOut size={20} />
        </button>
      </header>
      
      <main className="flex-1 overflow-y-auto pb-24">
        {activeTab === 'safespace' && <SafeSpace />}
        {activeTab === 'legaltutor' && <LegalTutor />}
      </main>

      <nav className="fixed bottom-4 left-4 right-4 bg-white rounded-2xl shadow-xl border border-ayni-rose-100 flex justify-around py-2 px-2 z-30">
        <button 
          onClick={() => setActiveTab('safespace')}
          className={`flex flex-col items-center gap-1 p-3 rounded-xl flex-1 transition-all ${activeTab === 'safespace' ? 'bg-ayni-rose-100 text-ayni-rose-600' : 'text-gray-400 hover:bg-gray-50'}`}
        >
          <Home size={24} fill={activeTab === 'safespace' ? "currentColor" : "none"} />
          <span className="text-xs font-bold">Inicio</span>
        </button>
        <div className="w-px bg-gray-100 my-2"></div>
        <button 
          onClick={() => setActiveTab('legaltutor')}
          className={`flex flex-col items-center gap-1 p-3 rounded-xl flex-1 transition-all ${activeTab === 'legaltutor' ? 'bg-ayni-lilac-100 text-ayni-lilac-600' : 'text-gray-400 hover:bg-gray-50'}`}
        >
          <BookOpen size={24} fill={activeTab === 'legaltutor' ? "currentColor" : "none"} />
          <span className="text-xs font-bold">Aprende</span>
        </button>
      </nav>
    </div>
  );

  const renderManagerLayout = () => (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar Desktop */}
      <aside className={`fixed md:static inset-y-0 left-0 z-20 w-72 bg-ayni-lilac-900 text-white transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-200 ease-in-out shadow-2xl md:shadow-none flex flex-col`}>
        <div className="h-2 bg-andean-stripe w-full"></div>
        <div className="p-8 border-b border-ayni-lilac-800">
          <h2 className="text-3xl font-display font-bold tracking-wide">J-MÓVIL</h2>
          <p className="text-ayni-lilac-300 text-sm mt-1 opacity-80">Gestión No Extractivista</p>
        </div>
        
        <nav className="flex-1 p-6 space-y-3">
          <button 
            onClick={() => { setActiveTab('dashboard'); setSidebarOpen(false); }}
            className={`w-full flex items-center gap-4 px-4 py-4 rounded-xl transition-all ${activeTab === 'dashboard' ? 'bg-ayni-lilac-700 text-white shadow-lg' : 'text-ayni-lilac-200 hover:bg-ayni-lilac-800'}`}
          >
            <BarChart3 size={22} /> <span className="font-medium">Auditoría IGI</span>
          </button>
          <button 
            onClick={() => { setActiveTab('archive'); setSidebarOpen(false); }}
            className={`w-full flex items-center gap-4 px-4 py-4 rounded-xl transition-all ${activeTab === 'archive' ? 'bg-ayni-lilac-700 text-white shadow-lg' : 'text-ayni-lilac-200 hover:bg-ayni-lilac-800'}`}
          >
            <Users size={22} /> <span className="font-medium">Archivo Casos</span>
          </button>
        </nav>

        <div className="p-6 border-t border-ayni-lilac-800">
          <button onClick={() => setCurrentRole(null)} className="flex items-center gap-2 text-ayni-lilac-300 hover:text-white transition-colors w-full px-4 py-2">
            <LogOut size={18} /> Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden" onClick={() => setSidebarOpen(false)}></div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="bg-white shadow-sm p-4 flex md:hidden justify-between items-center border-b border-ayni-rose-100">
          <button onClick={() => setSidebarOpen(true)} className="text-ayni-lilac-700">
            <Menu size={28} />
          </button>
          <span className="font-display font-bold text-ayni-lilac-900">Panel Gestora</span>
          <div className="w-6"></div> 
        </header>

        <main className="flex-1 overflow-y-auto bg-gray-50">
          {activeTab === 'dashboard' && <Dashboard />}
          {activeTab === 'archive' && <CaseArchive />}
        </main>
      </div>
    </div>
  );

  if (!currentRole) return renderRoleSelection();
  if (currentRole === Role.CITIZEN) return renderCitizenLayout();
  return renderManagerLayout();
};

export default App;