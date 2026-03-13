const fs = require('fs');

const content = fs.readFileSync('src/App.tsx', 'utf8');
const lines = content.split('\n');
const getLines = (start, end) => lines.slice(start - 1, end).join('\n');

const imports = getLines(1, 60);
const helpers = getLines(62, 74);
const types = getLines(76, 93);

const Button = getLines(97, 115);
const Input = getLines(117, 134);

const LoginScreen = getLines(138, 214);
const RegisterScreen = getLines(216, 260);
const RecoveryScreen = getLines(262, 297);

const TopNavbar = getLines(299, 348);
const DashboardLayout = getLines(350, 357);

const PatientRegistration = getLines(359, 480);
const ProfessionalDirectory = getLines(482, 579);
const ExportShare = getLines(581, 646);

const BodyMap = getLines(648, 704);
const ProjectionList = getLines(706, 797);
const EducationalWorkspace = getLines(799, 1130);

const XRaySimulator = getLines(1132, 1736);

const App = getLines(1740, 1826);

if (!fs.existsSync('src/components')) fs.mkdirSync('src/components');
if (!fs.existsSync('src/types')) fs.mkdirSync('src/types');
if (!fs.existsSync('src/utils')) fs.mkdirSync('src/utils');
if (!fs.existsSync('src/modules')) fs.mkdirSync('src/modules');

fs.writeFileSync('src/types/index.ts', 'export ' + types.replace('type Screen', 'export type Screen').replace('interface Patient', 'export interface Patient'));

fs.writeFileSync('src/utils/helpers.ts', 'export ' + helpers.replace('const getSimulatedImageUrl', 'const getSimulatedImageUrl'));

const uiContent = imports + '\nimport { Screen, Patient } from "../types";\n\n' + Button + '\n' + Input + '\n\nexport { Button, Input };\n';
fs.writeFileSync('src/components/ui.tsx', uiContent);

const authContent = imports + '\nimport { Screen } from "../types";\nimport { Button, Input } from "../components/ui";\n\n' + LoginScreen + '\n' + RegisterScreen + '\n' + RecoveryScreen + '\n\nexport { LoginScreen, RegisterScreen, RecoveryScreen };\n';
fs.writeFileSync('src/modules/auth.tsx', authContent);

const layoutContent = imports + '\nimport { Screen } from "../types";\nimport { Button, Input } from "../components/ui";\n\n' + TopNavbar + '\n' + DashboardLayout + '\n\nexport { TopNavbar, DashboardLayout };\n';
fs.writeFileSync('src/modules/layout.tsx', layoutContent);

const registrationContent = imports + '\nimport { Screen, Patient } from "../types";\nimport { Button, Input } from "../components/ui";\n\n' + PatientRegistration + '\n\nexport { PatientRegistration };\n';
fs.writeFileSync('src/modules/registration.tsx', registrationContent);

const directoryContent = imports + '\nimport { Button, Input } from "../components/ui";\n\n' + ProfessionalDirectory + '\n\nexport { ProfessionalDirectory };\n';
fs.writeFileSync('src/modules/directory.tsx', directoryContent);

const exportContent = imports + '\nimport { Patient } from "../types";\nimport { Button } from "../components/ui";\n\n' + ExportShare + '\n\nexport { ExportShare };\n';
fs.writeFileSync('src/modules/export.tsx', exportContent);

const studiesContent = imports + '\nimport { Screen, Patient } from "../types";\nimport { Button, Input } from "../components/ui";\nimport { getSimulatedImageUrl } from "../utils/helpers";\n\n' + BodyMap + '\n' + ProjectionList + '\n' + EducationalWorkspace + '\n\nexport { BodyMap, ProjectionList, EducationalWorkspace };\n';
fs.writeFileSync('src/modules/studies.tsx', studiesContent);

const simulatorContent = imports + '\nimport { Button } from "../components/ui";\n\n' + XRaySimulator + '\n\nexport { XRaySimulator };\n';
fs.writeFileSync('src/modules/simulator.tsx', simulatorContent);

const appContent = imports + '\nimport { Screen, Patient } from "./types";\nimport { LoginScreen, RegisterScreen, RecoveryScreen } from "./modules/auth";\nimport { DashboardLayout } from "./modules/layout";\nimport { PatientRegistration } from "./modules/registration";\nimport { ExportShare } from "./modules/export";\nimport { EducationalWorkspace } from "./modules/studies";\nimport { XRaySimulator } from "./modules/simulator";\nimport { ProfessionalDirectory } from "./modules/directory";\n\n' + App + '\n';
fs.writeFileSync('src/App.tsx', appContent);

console.log('Refactoring complete!');
