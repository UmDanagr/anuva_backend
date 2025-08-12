import { z } from "zod";

export const createPatientInfoFormSchema = z.object({
  fullName: z.string().min(2).optional(),
  dateOfExamination: z.string().optional(),
  race: z.string().optional(),
  maritalStatus: z
    .enum(["single", "married", "divorced", "widowed"])
    .optional(),
  numberOfChildren: z.number().min(0).max(10).optional(),
  hearingImpairment: z.boolean().optional(),
  hearingAids: z.boolean().optional(),
  glassesOrContacts: z.boolean().optional(),
  occupation: z.string().optional(),
  employer: z.string().optional(),
  employerAddress: z.string().optional(),
  enrolledInSchool: z.boolean().optional(),
  school: z.string().optional(),
});

export const createInjuryFormSchema = z.object({
  dateOfInjury: z.string().optional(),
  sportOrActivity: z.string().optional(),
  setting: z.enum(["game", "practice", "other"]).optional(),
  settingDetails: z.string().optional(),
  position: z.string().optional(),
  injuryDescription: z.string().optional(),
  impactType: z.string().optional(),
  impactDetails: z.string().optional(),
  locationOfContact: z.string().optional(),
  looseOfConsciousness: z.boolean().optional(),
  LOCduration: z.string().optional(),
  troubleRemembering: z.boolean().optional(),
  memoryTroubleDuration: z.string().optional(),
  feelFocussed: z.boolean().optional(),
  confusionDuration: z.string().optional(),
  stoppedParticipation: z.boolean().optional(),
  stopDuration: z.string().optional(),
  returnToParticipation: z.boolean().optional(),
  returnDuration: z.string().optional(),
  emergencyRoomVisit: z.boolean().optional(),
  ERdetails: z.string().optional(),
  testPerformed: z.boolean().optional(),
});

export const createSymptomChecklistSchema = z.object({
  headache: z.number().min(0).max(6).optional(),
  pressureInHead: z.number().min(0).max(6).optional(),
  neckPain: z.number().min(0).max(6).optional(),
  troubleFallingAsleep: z.number().min(0).max(6).optional(),
  drowsiness: z.number().min(0).max(6).optional(),
  nauseaOrVomiting: z.number().min(0).max(6).optional(),
  fatigueOrLowEnergy: z.number().min(0).max(6).optional(),
  dizziness: z.number().min(0).max(6).optional(),
  blurredVision: z.number().min(0).max(6).optional(),
  balanceProblems: z.number().min(0).max(6).optional(),
  sensitivityToLight: z.number().min(0).max(6).optional(),
  sensitivityToNoise: z.number().min(0).max(6).optional(),
  feelingSlowedDown: z.number().min(0).max(6).optional(),
  feelingInAFog: z.number().min(0).max(6).optional(),
  dontFeelRight: z.number().min(0).max(6).optional(),
  difficultyConcentrating: z.number().min(0).max(6).optional(),
  difficultyRemembering: z.number().min(0).max(6).optional(),
  confusion: z.number().min(0).max(6).optional(),
  moreEmotional: z.number().min(0).max(6).optional(),
  irritability: z.number().min(0).max(6).optional(),
  sadnessOrDepression: z.number().min(0).max(6).optional(),
  nervousOrAnxious: z.number().min(0).max(6).optional(),
  worseWithPhysicalActivity: z.boolean().optional(),
  worseWithSocialSituations: z.boolean().optional(),
});

export const createAdditionalSymptomsFormSchema = z.object({
  generalSomatic: z.number().min(0).max(6).optional(),
  painLocation: z.string().optional(),
  painInOtherParts: z.number().min(0).max(6).optional(),
  problemsWithSleeping: z.number().min(0).max(6).optional(),
  primaryNeurologicalSymptoms: z.number().min(0).max(6).optional(),
  gaitOrBalanceProblems: z.number().min(0).max(6).optional(),
  visionLossOrChange: z.number().min(0).max(6).optional(),
  hearingLossOrChange: z.number().min(0).max(6).optional(),
  lossOfSmellOrTaste: z.number().min(0).max(6).optional(),
  speechChanges: z.number().min(0).max(6).optional(),
  weakness: z.number().min(0).max(6).optional(),
  tremors: z.number().min(0).max(6).optional(),
  bowelOrBladderDisturbances: z.number().min(0).max(6).optional(),
  sexualDysfunction: z.number().min(0).max(6).optional(),
  difficultyPlanningAndOrganizing: z.number().min(0).max(6).optional(),
  difficultyAnticipatingConsequences: z.number().min(0).max(6).optional(),
  wordFindingDifficulties: z.number().min(0).max(6).optional(),
  difficultyUnderstandingConversations: z.number().min(0).max(6).optional(),
  lostInFamiliarEnvironment: z.number().min(0).max(6).optional(),
  lossOfAppetite: z.number().min(0).max(6).optional(),
  suicidalOrHomicidalThoughts: z.number().min(0).max(6).optional(),
  verballyOrPhysicallyAggressive: z.number().min(0).max(6).optional(),
  personalityChanges: z.number().min(0).max(6).optional(),
  disInhibition: z.number().min(0).max(6).optional(),
  avoidanceBehaviors: z.number().min(0).max(6).optional(),
  intrusiveDistressingThoughts: z.number().min(0).max(6).optional(),
  repetitiveMotorActivity: z.number().min(0).max(6).optional(),
  worseWithPhysicalActivity: z.boolean().optional(),
  worseWithMentalActivity: z.boolean().optional(),
  totalSymptoms: z.number().min(0).max(6).optional(),
  symptomSeverityScore: z.number().min(0).max(6).optional(),
});

export const createHeadacheFormSchema = z.object({
  ageOrDateOfOnset: z.string().optional(),
  pastHeadacheProblems: z.boolean().optional(),
  pastHeadacheDescription: z.string().optional(),
  locationOfPain: z.string().optional(),
  frequency: z.string().optional(),
  painAtPresent: z.number().min(0).max(10).optional(),
  painAtWorst: z.number().min(0).max(10).optional(),
  qualityDescription: z.string().optional(),
  timingDescription: z.string().optional(),
  durationDescription: z.string().optional(),
  triggersDescription: z.string().optional(),
  associatedSymptoms: z.string().optional(),
  reliefFactors: z.string().optional(),
  daysMissingWorkOrSchool: z.string().optional(),
  daysMissingSocialEvents: z.string().optional(),
});

export const createSleepDisturbanceFormSchema = z.object({
  hasSleepDisturbance: z.boolean().optional(),
  difficultyFallingAsleep: z.boolean().optional(),
  fallingAsleepSeverity: z.number().min(0).max(10).optional(),
  fallingAsleepProgression: z.string().optional(),
  difficultyStayingAsleep: z.boolean().optional(),
  stayingAsleepSeverity: z.number().min(0).max(10).optional(),
  stayingAsleepProgression: z.string().optional(),
  nightmares: z.boolean().optional(),
  nightmaresSeverity: z.number().min(0).max(10).optional(),
  nightmaresProgression: z.string().optional(),
  actsOutDreams: z.boolean().optional(),
  actsOutDreamsSeverity: z.number().min(0).max(10).optional(),
  actsOutDreamsProgression: z.string().optional(),
  earlyMorningWakening: z.boolean().optional(),
  earlyWakeningSeverity: z.number().min(0).max(10).optional(),
  earlyWakeningProgression: z.string().optional(),
  daytimeDrowsiness: z.boolean().optional(),
  drowsinessSeverity: z.number().min(0).max(10).optional(),
  drowsinessProgression: z.enum(["better", "same", "worse"]).optional(),
  naps: z.boolean().optional(),
  numberOfNaps: z.number().optional(),
});

export const createBodyPainFormSchema = z.object({
  bodyPart: z.string().optional(),
  dateOfOnset: z.string().optional(),
  severity: z.number().min(0).max(10).optional(),
  frequency: z.string().optional(),
  duration: z.string().optional(),
  triggers: z.string().optional(),
  relievedBy: z.string().optional(),
  progression: z.enum(["better", "same", "worse"]).optional(),
});

export const createPreviousHeadInjuriesFormSchema = z.object({
  hasPreviousInjuries: z.boolean().optional(),
  totalNumberOfInjuries: z.number().min(0).max(10).optional(),
});

export const createConcussionDetailsFormSchema = z.object({
  concussionNumber: z.number().optional(),
  injuryDate: z.string().optional(),
  knockedUnconscious: z.boolean().optional(),
  soughtMedicalTreatment: z.boolean().optional(),
  symptomDuration: z.string().optional(),
});

export const createDevelopmentalHistoryFormSchema = z.object({
  learningDisabilities: z.boolean().optional(),
  learningDisabilitiesDescription: z.string().optional(),
  motorVehicleAccidentHistory: z.boolean().optional(),
  accidentDates: z.string().optional(),
  headTrauma: z.boolean().optional(),
  brainSurgery: z.boolean().optional(),
  residualImpairments: z.boolean().optional(),
  impairmentDescription: z.string().optional(),
});

export const createSurgicalHistoryFormSchema = z.object({
  surgeryDate: z.string().optional(),
  bodyPart: z.string().optional(),
  procedurePerformed: z.string().optional(),
});

export const createCurrentMedicationsFormSchema = z.object({
  medicineName: z.string().optional(),
  reasonForTaking: z.string().optional(),
  dosage: z.string().optional(),
  amount: z.string().optional(),
});


export const createPastMedicationsFormSchema = z.object({
  medicineName: z.string().optional(),
  reasonForTaking: z.string().optional(),
  dosage: z.string().optional(),
  amount: z.string().optional(),
});