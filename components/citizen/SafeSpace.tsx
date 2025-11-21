import React, { useState } from 'react';
import { Mic, Square, ShieldCheck, HeartHandshake, Activity, Volume2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { analyzeReport } from '../../services/geminiService';

export const SafeSpace: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [transcript, setTranscript] = useState('');

  // Simula el proceso de escucha y conversión a texto sin la complejidad de Sockets
  const toggleRecording = () => {
    if (!isRecording) {
      setIsRecording(true);
      // Simular escucha activa
      setTimeout(() => {
        setTranscript("Hola Ayni, tengo miedo porque mi expareja me sigue escribiendo por redes sociales y ayer vino a gritar fuera de mi casa. No sé qué hacer con mis hijos.");
      }, 2000);
    } else {
      setIsRecording(false);
      handleAnalyze();
    }
  };

  const handleAnalyze = async () => {
    if (!transcript) return;
    setIsAnalyzing(true);
    // Llamada real a Gemini Flash (texto)
    const result = await analyzeReport(transcript);
    setAnalysisResult(result);
    setIsAnalyzing(false);
  };

  const handleReset = () => {
    setAnalysisResult(null);
    setTranscript('');
    setIsRecording(false);
  };

  // -- VISTA DE RESULTADO (PLAN DE SEGURIDAD) --
  if (analysisResult) {
    return (
      <div className="flex flex-col h-full p-6 bg-ayni-rose-50 overflow-y-auto">
        <div className="bg-white rounded-3xl shadow-xl p-6 border-2 border-ayni-lilac-100 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-2 bg-andean-stripe"></div>
          
          <div className="flex flex-col items-center mb-6 mt-4">
            <div className="bg-green-100 p-4 rounded-full mb-3 shadow-sm">
              <ShieldCheck className="w-12 h-12 text-green-600" />
            </div>
            <h2 className="text-2xl font-display font-bold text-ayni-lilac-900 text-center">
              Relato Guardado
            </h2>
            <p className="text-center text-gray-500 text-sm mt-1">
              Tu voz ha sido escuchada y protegida.
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="bg-ayni-rose-50 p-4 rounded-2xl border border-ayni-rose-100">
              <h3 className="font-bold text-ayni-lilac-700 text-sm uppercase tracking-wide mb-1">Resumen Seguro</h3>
              <p className="text-gray-700 italic">"{analysisResult.summary}"</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
               <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm text-center">
                  <span className="text-xs text-gray-400 uppercase font-bold">Nivel de Riesgo</span>
                  <div className={`text-lg font-bold mt-1 ${analysisResult.riskLevel === 'Alto' || analysisResult.riskLevel === 'Crítico' ? 'text-red-500' : 'text-yellow-500'}`}>
                      {analysisResult.riskLevel}
                  </div>
               </div>
               <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm text-center">
                  <span className="text-xs text-gray-400 uppercase font-bold">Tipo</span>
                  <div className="text-lg font-bold mt-1 text-ayni-lilac-600">{analysisResult.category}</div>
               </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100 flex gap-3 items-start">
              <HeartHandshake className="text-blue-500 min-w-[24px]" />
              <div>
                <h4 className="font-bold text-blue-800 text-sm">Recomendación Ayni</h4>
                <p className="text-xs text-blue-700 mt-1">
                  Hemos encriptado este reporte. Puedes usarlo como evidencia si decides denunciar en Fiscalía.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 space-y-3">
            <Button fullWidth variant="secondary" onClick={handleReset}>
              Nuevo Relato
            </Button>
            {analysisResult.riskLevel === 'Crítico' && (
              <Button fullWidth variant="danger" onClick={() => alert("Conectando con ECU-911...")}>
                SOS Emergencia
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // -- VISTA PRINCIPAL (GRABADORA) --
  return (
    <div className="flex flex-col h-full relative bg-andean-texture">
      {/* Decorative top */}
      <div className="h-3 w-full bg-andean-stripe shadow-sm"></div>

      <div className="flex-1 flex flex-col items-center justify-center p-6 relative z-10">
        
        <div className="text-center mb-10 space-y-2">
          <h2 className="text-3xl font-display font-bold text-ayni-lilac-900">Espacio Seguro</h2>
          <p className="text-ayni-lilac-700 font-medium">
            {isRecording ? "Te escucho, hermana..." : "Toca para contar tu historia"}
          </p>
        </div>

        {/* Botón Central */}
        <div className="relative group">
          {isRecording && (
            <div className="absolute inset-0 bg-ayni-lilac-300 rounded-full animate-ping opacity-40"></div>
          )}
          <button
            onClick={toggleRecording}
            className={`relative z-10 w-56 h-56 rounded-full flex flex-col items-center justify-center transition-all duration-500 shadow-2xl border-8 ${
              isRecording 
                ? 'bg-gradient-to-br from-red-400 to-red-500 border-red-100 scale-110' 
                : 'bg-gradient-to-br from-ayni-lilac-400 to-ayni-lilac-600 border-white hover:scale-105'
            }`}
          >
            {isRecording ? (
                <>
                    <Square size={64} fill="currentColor" className="text-white mb-2" />
                    <span className="text-white font-display font-bold tracking-widest animate-pulse">DETENER</span>
                </>
            ) : (
                <>
                    <Mic size={80} className="text-white mb-2" />
                    <span className="text-white font-display font-bold text-lg">HABLAR</span>
                </>
            )}
          </button>
        </div>

        {/* Texto simulado en tiempo real */}
        <div className={`mt-8 w-full max-w-md transition-all duration-500 ${isRecording || transcript ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
           <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-ayni-rose-200 shadow-sm">
              <p className="text-gray-600 text-center italic min-h-[3rem] flex items-center justify-center gap-2">
                {isRecording ? (
                    <>
                        <Volume2 className="animate-pulse text-ayni-lilac-500" size={20}/>
                        <span className="animate-pulse">Escuchando...</span>
                    </>
                ) : transcript ? (
                    transcript
                ) : "..."}
              </p>
           </div>
        </div>

        {isAnalyzing && (
          <div className="absolute inset-0 bg-white/60 backdrop-blur-sm z-50 flex flex-col items-center justify-center">
            <Activity className="w-16 h-16 text-ayni-lilac-600 animate-bounce mb-4" />
            <p className="font-display font-bold text-ayni-lilac-800 text-xl">Procesando con cuidado...</p>
          </div>
        )}
      </div>
    </div>
  );
};