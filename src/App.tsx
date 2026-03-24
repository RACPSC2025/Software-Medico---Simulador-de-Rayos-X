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
import { Biblioteca } from './modules/biblioteca';
import { HomeScreen } from './modules/home';

export default function App() {
  const [screen, setScreen] = useState<Screen>('login');
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme-mode');
    return saved ? saved === 'dark' : true; // Default to dark
  });

  useEffect(() => {
    localStorage.setItem('theme-mode', isDarkMode ? 'dark' : 'light');
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

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
    panStates: {} as {[key: number]: {x: number, y: number}},
    protesisType: 'sin-protesis' as 'sin-protesis' | 'con-protesis'
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
      panStates: {},
      protesisType: 'sin-protesis'
    });
  };

  const renderScreen = () => {
    switch (screen) {
      case 'login': return <LoginScreen onNavigate={handleNavigate} onLogin={setUserEmail} isDarkMode={isDarkMode} onToggleTheme={() => setIsDarkMode(!isDarkMode)} />;
      case 'register': return <RegisterScreen onNavigate={handleNavigate} />;
      case 'recovery': return <RecoveryScreen onNavigate={handleNavigate} />;
      case 'educational-workspace':
        return (
          <DashboardLayout 
            userEmail={userEmail} 
            activeScreen={screen} 
            onNavigate={handleNavigate}
            isDarkMode={isDarkMode}
            onToggleTheme={() => setIsDarkMode(!isDarkMode)}
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
            isDarkMode={isDarkMode}
            onToggleTheme={() => setIsDarkMode(!isDarkMode)}
          >
            <ExportScreen
              patient={currentPatient}
              capturedImages={capturedImages}
              workspaceState={workspaceState}
              onBack={() => handleNavigate('educational-workspace')}
              onFinish={() => handleNavigate('patient-registration')}
            />
          </DashboardLayout>
        );
      case 'biblioteca':
        return (
          <DashboardLayout
            userEmail={userEmail}
            activeScreen={screen}
            onNavigate={handleNavigate}
            isDarkMode={isDarkMode}
            onToggleTheme={() => setIsDarkMode(!isDarkMode)}
          >
            <Biblioteca />
          </DashboardLayout>
        );
      case 'home':
        return (
          <DashboardLayout
            userEmail={userEmail}
            currentScreen={screen}
            onNavigate={handleNavigate}
            isDarkMode={isDarkMode}
            onToggleTheme={() => setIsDarkMode(!isDarkMode)}
          >
            <HomeScreen onNavigate={handleNavigate} userEmail={userEmail} />
          </DashboardLayout>
        );
      default:
        return (
          <DashboardLayout 
            currentScreen={screen} 
            onNavigate={handleNavigate} 
            userEmail={userEmail}
            isDarkMode={isDarkMode}
            onToggleTheme={() => setIsDarkMode(!isDarkMode)}
          >
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
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-background-dark' : 'bg-background-light'} transition-colors duration-300`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={screen}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="min-h-screen flex flex-col"
        >
          {renderScreen()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
