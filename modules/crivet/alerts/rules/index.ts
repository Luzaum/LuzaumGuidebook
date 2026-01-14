import type { Rule } from "../types";

import { lidocaineRules } from "./anesthetics/lidocaine";
import { opioidRules } from "./anesthetics/opioids";
import { propofolRules } from "./anesthetics/propofol";
import { dexRules } from "./anesthetics/dexmedetomidine";
import { ketamineRules } from "./anesthetics/ketamine";
import { comboRules } from "./anesthetics/combos";

import { norepinephrineRules } from "./cardio/norepinephrine";
import { vasopressinRules } from "./cardio/vasopressin";
import { dopamineRules } from "./cardio/dopamine";
import { dobutamineRules } from "./cardio/dobutamine";
import { ephedrineRules } from "./cardio/ephedrine";
import { nitroprussideRules } from "./cardio/nitroprusside";
import { diltiazemRules } from "./cardio/diltiazem";
import { esmololRules } from "./cardio/esmolol";
import { globalVasoactiveRules } from "./cardio/globalVasoactive";

import { metoclopramideRules } from "./gi/metoclopramide";
import { maropitantRules } from "./gi/maropitant";

import { ceftriaxoneRules } from "./abx/ceftriaxone";
import { meropenemRules } from "./abx/meropenem";
import { enrofloxacinRules } from "./abx/enrofloxacin";
import { cephalexinRules } from "./abx/cephalexin";
import { clindamycinRules } from "./abx/clindamycin";
import { metronidazoleRules } from "./abx/metronidazole";

export const ALL_RULES: Rule[] = [
  ...lidocaineRules,
  ...opioidRules,
  ...propofolRules,
  ...dexRules,
  ...ketamineRules,
  ...comboRules,

  ...norepinephrineRules,
  ...vasopressinRules,
  ...dopamineRules,
  ...dobutamineRules,
  ...ephedrineRules,
  ...nitroprussideRules,
  ...diltiazemRules,
  ...esmololRules,
  ...globalVasoactiveRules,

  ...metoclopramideRules,
  ...maropitantRules,

  ...ceftriaxoneRules,
  ...meropenemRules,
  ...enrofloxacinRules,
  ...cephalexinRules,
  ...clindamycinRules,
  ...metronidazoleRules,
];
