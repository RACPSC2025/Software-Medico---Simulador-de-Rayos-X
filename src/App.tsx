import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Screen, Patient } from "./types";
import { LoginScreen, RegisterScreen, RecoveryScreen } from "./modules/auth";
import { DashboardLayout } from "./modules/layout";
import { PatientRegistration } from "./modules/registration";
import { EducationalWorkspace } from "./modules/studies";
import { XRaySimulator } from "./modules/simulator";
import { ExportScreen } from './modules/export'; 
import { ProfessionalDirectory } from "./modules/directory";

export default function App() {
  const [screen, setScreen] = useState<Screen>('login');
  const [selectedStudy, setSelectedStudy] = useState<string>('Radiografía de Tórax');
  const [currentPatient, setCurrentPatient] = useState<Patient | null>(null);
  const [capturedImages, setCapturedImages] = useState<{[key: string]: string}>({});
  const [activeSimulation, setActiveSimulation] = useState<any>(null);
  
  const [userEmail, setUserEmail] = useState(() => localStorage.getItem('userEmail') || "Invitado");

  const [workspaceState, setWorkspaceState] = useState({
    selectedRegion: 'chest' as string | null,
    selectedProjectionIndex: 0,
    selectedProjectionIndices: [0, 1, 2, 3],
    validatedIndices: [] as number[],
    viewMode: 4,
    zoomStates: {} as {[key: number]: number},
    panStates: {} as {[key: number]: {x: number, y: number}}
  });

  const handleAcceptSimulation = (projectionId: string, imageUrl: string) => {
    setCapturedImages(prev => ({ ...prev, [projectionId]: imageUrl }));
    setActiveSimulation(null);
    handleNavigate('educational-workspace');
  };

  const handleNavigate = (s: Screen, simData?: any) => {
    if (s === 'login') {
      localStorage.removeItem('userEmail');
      setUserEmail("Invitado");
      setCurrentPatient(null);
      setCapturedImages({});
      resetWorkspace();
    }
    if (s === 'patient-registration') {
      setCurrentPatient(null);
      setCapturedImages({});
      resetWorkspace();
    }
    setScreen(s);
    if (simData) setActiveSimulation(simData);
  };

  const resetWorkspace = () => {
    setWorkspaceState({
      selectedRegion: 'chest',
      selectedProjectionIndex: 0,
      selectedProjectionIndices: [0, 1, 2, 3],
      validatedIndices: [],
      viewMode: 4,
      zoomStates: {},
      panStates: {}
    });
  };

  const renderScreen = () => {
    switch (screen) {
      case 'login': return <LoginScreen onNavigate={handleNavigate} onLogin={setUserEmail} />;
      case 'register': return <RegisterScreen onNavigate={handleNavigate} />;
      case 'recovery': return <RecoveryScreen onNavigate={handleNavigate} />;
      case 'educational-workspace':
        return (
          <DashboardLayout 
            userEmail={userEmail} 
            activeScreen={screen} 
            onNavigate={handleNavigate}
          >
            <EducationalWorkspace 
              onNavigate={(s, simData) => {
                if (simData) setActiveSimulation(simData);
                handleNavigate(s);
              }} 
              patient={currentPatient}
              capturedImages={capturedImages}
              workspaceState={workspaceState}
              setWorkspaceState={setWorkspaceState}
            />
          </DashboardLayout>
        );
      case 'export-share':
        return (
          <DashboardLayout 
            userEmail={userEmail} 
            activeScreen={screen} 
            onNavigate={handleNavigate}
          >
            <ExportScreen 
              patient={currentPatient} 
              capturedImages={capturedImages} 
              onBack={() => handleNavigate('educational-workspace')}
              onFinish={() => handleNavigate('patient-registration')}
            />
          </DashboardLayout>
        );
      default:
        return (
          <DashboardLayout currentScreen={screen} onNavigate={handleNavigate} userEmail={userEmail}>
            {screen === 'patient-registration' && (
              <PatientRegistration 
                onProceed={(patient) => {
                  setCurrentPatient(patient);
                  handleNavigate('educational-workspace');
                }} 
                userEmail={userEmail}
              />
            )}
            {screen === 'xray-simulator' && (
              <XRaySimulator 
                initialCase={activeSimulation}
                onAccept={handleAcceptSimulation}
                onCancel={() => {
                  setActiveSimulation(null);
                  handleNavigate('educational-workspace');
                }}
              />
            )}
          </DashboardLayout>
        );
    }
  };

  return (
    <div className="min-h-screen">
      <AnimatePresence mode="wait">
        <motion.div
          key={screen}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
          className="min-h-screen"
        >
          {renderScreen()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
