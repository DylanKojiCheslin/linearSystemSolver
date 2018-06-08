import {initializeSystem} from './initializeSystem'
import {changeToEtchlonForm} from './changeToEtchlonForm'

export default function LinearSystemSolution {
//create linear system from matrix
  const system = initializeSystem( matrix );
  const systemEtchlonForm = changeToEtchlonForm(system);
  const systemCanonicalForm = backSubstitution(systemEtchlonForm);
