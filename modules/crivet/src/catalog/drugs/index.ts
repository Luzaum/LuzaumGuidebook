import { fentanyl } from './fentanyl';
import { ketamine } from './ketamine';
import { noradrenaline } from './noradrenaline';
import { propofol } from './propofol';
import { dexmedetomidine } from './dexmedetomidine';
import { lidocaine } from './lidocaine';
import { dopamine } from './dopamine';
import { dobutamine } from './dobutamine';
import { morphine } from './morphine';
import { epinephrine } from './epinephrine';
import { diazepam } from './diazepam';
import { midazolam } from './midazolam';
import { vasopressin } from './vasopressin';
import { Drug } from '../../shared/types/drug';

export const drugCatalog: Drug[] = [
  fentanyl,
  ketamine,
  noradrenaline,
  propofol,
  dexmedetomidine,
  lidocaine,
  dopamine,
  dobutamine,
  morphine,
  epinephrine,
  diazepam,
  midazolam,
  vasopressin
];

export const getDrugById = (id: string): Drug | undefined => {
  return drugCatalog.find(d => d.id === id);
};
