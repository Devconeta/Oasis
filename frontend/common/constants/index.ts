import { Paper } from '../types';
import { Tags } from '../types/enums';

export const trendingMockPapers: Paper[] = [
  {
    id: '1',
    title: 'Protein measurement with the Folin phenol reagent',
    tags: [Tags.Biochemistry, Tags.AnalyticalChemistry, Tags.ProteinAnalysis],
  },
  {
    id: '2',
    title:
      'A rapid and sensitive method for the quantitation of microgram quantities of protein utilizing the principle of protein-dye binding',
    tags: [
      Tags.Biochemistry,
      Tags.ProteinQuantification,
      Tags.AnalyticalMethods,
    ],
  },
  {
    id: '3',
    title:
      'Cleavage of structural proteins during the assembly of the head of bacteriophage T4',
    tags: [Tags.MolecularBiology, Tags.Virology, Tags.ProteinStructure],
  },
  {
    id: '4',
    title: 'DNA sequencing with chain-terminating inhibitors',
    tags: [Tags.Genetics, Tags.DNASequencing, Tags.MolecularBiology],
  },
  {
    id: '5',
    title: 'Evolution and the Theory of Games',
    tags: [Tags.EvolutionaryBiology, Tags.GameTheory, Tags.BehavioralEcology],
  },
  {
    id: '6',
    title:
      'Statistical methods for assessing agreement between two methods of clinical measurement',
    tags: [Tags.Statistics, Tags.ClinicalResearch, Tags.Measurement],
  },
  {
    id: '7',
    title:
      'The Central Role of the Propensity Score in Observational Studies for Causal Effects',
    tags: [Tags.Statistics, Tags.CausalInference, Tags.ObservationalStudies],
  },
  {
    id: '8',
    title:
      'Electrophoretic transfer of proteins from polyacrylamide gels to nitrocellulose sheets: procedure and some applications',
    tags: [Tags.Biochemistry, Tags.ProteinAnalysis, Tags.Electrophoresis],
  },
  {
    id: '9',
    title:
      'Controlling the False Discovery Rate: A Practical and Powerful Approach to Multiple Testing',
    tags: [Tags.Statistics, Tags.MultipleHypothesisTesting, Tags.DataAnalysis],
  },
  {
    id: '10',
    title:
      'Effects of tea, catechins and catechin derivatives on Omicron subvariants of SARS-CoV-2',
    tags: [Tags.Virology, Tags.Pharmacology, Tags.COVID19],
  },
];

export const mockPapers: Paper[] = [
  ...trendingMockPapers,
  {
    id: '11',
    title: 'The Structure of Scientific Revolutions',
    tags: [
      Tags.PhilosophyOfScience,
      Tags.ScientificMethod,
      Tags.ParadigmShifts,
    ],
  },
  {
    id: '12',
    title: "Quantum Entanglement and Bell's Inequalities",
    tags: [Tags.QuantumPhysics, Tags.TheoreticalPhysics, Tags.Entanglement],
  },
  {
    id: '13',
    title: "The Human Genome Project: Decoding Life's Blueprint",
    tags: [Tags.Genetics, Tags.Genomics, Tags.Bioinformatics],
  },
  {
    id: '14',
    title: 'Climate Change and Its Impact on Biodiversity',
    tags: [Tags.Ecology, Tags.ClimateScience, Tags.ConservationBiology],
  },
  {
    id: '15',
    title: 'The Role of Gut Microbiota in Human Health and Disease',
    tags: [Tags.Microbiology, Tags.HumanHealth, Tags.Microbiome],
  },
  {
    id: '16',
    title:
      'Artificial Intelligence in Medical Diagnosis: Opportunities and Challenges',
    tags: [Tags.AI, Tags.MedicalInformatics, Tags.DiagnosticMedicine],
  },
  {
    id: '17',
    title: 'Dark Matter and Dark Energy: The Invisible Universe',
    tags: [Tags.Astrophysics, Tags.Cosmology, Tags.ParticlePhysics],
  },
  {
    id: '18',
    title:
      'The Neurobiology of Consciousness: From Theory to Neural Correlates',
    tags: [Tags.Neuroscience, Tags.CognitiveScience, Tags.ConsciousnessStudies],
  },
  {
    id: '19',
    title: 'CRISPR-Cas9: Revolutionizing Genetic Engineering',
    tags: [Tags.Biotechnology, Tags.GeneticEngineering, Tags.MolecularBiology],
  },
  {
    id: '20',
    title: 'The Impact of Social Media on Mental Health: A Meta-Analysis',
    tags: [Tags.Psychology, Tags.SocialMediaStudies, Tags.MentalHealth],
  },
];
