import {initializePivot} from './initializePivot'
import {changeToEtchlonForm} from './changeToEtchlonForm'

export default function LinearSystemSolution {
//create linear system from matrix
  const system = initializePivot( matrix );
  const systemEtchlonForm = changeToEtchlonForm(system);
  const systemCanonicalForm = backSubstitution(systemEtchlonForm);
