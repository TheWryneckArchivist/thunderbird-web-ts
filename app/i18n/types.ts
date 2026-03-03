export type LanguageCode = "en" | "es" | "fr" | "pt" | "ru" | "hi" | "ar" | "zh" | "tr";

export interface LanguageOption {
  code: LanguageCode;
  label: string;
  englishLabel: string;
}

export type CardId =
  | "bionix-core-2024"
  | "tabletop-essentials"
  | "tournament-hub"
  | "visual-card-editor"
  | "legacy-archive"
  | "experimental-physics"
  | "community-showcase"
  | "developer-api"
  | "card-animation-pack"
  | "virtual-tabletop";

export type CardTagId =
  | "latest"
  | "verified"
  | "beta"
  | "pro"
  | "stable"
  | "experimental"
  | "showcase"
  | "developer"
  | "animation"
  | "vtt";

export type FeatureId = "creator-workflow" | "community-discovery" | "cross-game-flexibility";

interface CardCopy {
  title: string;
  category: string;
  description: string;
  tag: string;
}

interface FeatureCopy {
  eyebrow: string;
  title: string;
  paragraphs: string[];
  imageAlt: string;
}

interface HeaderCopy {
  stable: string;
  features: string;
  showcase: string;
  community: string;
  donate: string;
  downloadLatest: string;
  language: string;
  profile: string;
  guest: string;
  open: string;
  account: string;
  signIn: string;
  signOut: string;
  enterNamePrompt: string;
}

interface HeroCopy {
  headline: string;
  subheadline: string;
  getItNow: string;
  whatsNew: string;
  learnMore: string;
  lookingFor: string;
  early: string;
  stable: string;
  experimental: string;
  releases: string;
}

interface MainHeaderCopy {
  title: string;
  titleAccent: string;
  subtitle: string;
  searchPlaceholder: string;
  showing: string;
  results: string;
  submitHere: string;
}

interface FeatureSectionCopy {
  sectionLabel: string;
  heading: string;
  subheading: string;
  items: Record<FeatureId, FeatureCopy>;
}

interface DonationCopy {
  heading: string;
  body: string;
  donateNow: string;
  learnMore: string;
}

interface TitleFieldCopy {
  expansionPackTitleLabel: string;
  gameSystemLabel: string;
  titlePlaceholder: string;
  gameSystemOptions: string[];
}

interface DescriptionFieldCopy {
  label: string;
  placeholder: string;
  characterLimitReached: string;
}

interface FileDropCopy {
  dropAssetsHere: string;
  clickToBrowse: string;
}

interface ModalCopy {
  titleStart: string;
  titleAccent: string;
  subtitle: string;
  removeFileTitle: string;
  filesInLabel: string;
  clearAll: string;
  assetPipelineOptions: string;
  tradingCardGames: string;
  directFlattenedAssets: string;
  directFlattenedAssetsBody: string;
  dynamicComposition: string;
  dynamicCompositionBody: string;
  partyAndLogicSystems: string;
  partyAndLogicSystemsBody: string;
  abort: string;
  finalizeLineOne: string;
  finalizeLineTwo: string;
  disclaimerLabel: string;
  disclaimerLineOne: string;
  disclaimerLineTwoPrefix: string;
  disclaimerLineTwoSuffix: string;
  learnMoreGuidelines: string;
  titleField: TitleFieldCopy;
  descriptionField: DescriptionFieldCopy;
  fileDrop: FileDropCopy;
}

interface AssetLibraryCopy {
  mainHeader: MainHeaderCopy;
  allTagLabel: string;
  emptyState: string;
  detailsLabel: string;
  cards: Record<CardId, CardCopy>;
  features: FeatureSectionCopy;
  donation: DonationCopy;
  modal: ModalCopy;
}

interface FooterCopy {
  brandDescription: string;
  platform: string;
  latestReleases: string;
  documentation: string;
  assetLibrary: string;
  submitPack: string;
  community: string;
  discordServer: string;
  githubRepository: string;
  twitter: string;
  showcase: string;
  stayConnected: string;
  newsletterBody: string;
  emailAddress: string;
  privacyPolicy: string;
  termsOfService: string;
  contact: string;
  copyright: string;
}

export interface AppDictionary {
  header: HeaderCopy;
  hero: HeroCopy;
  assetLibrary: AssetLibraryCopy;
  footer: FooterCopy;
}

export interface LocalizedCard {
  id: CardId;
  title: string;
  category: string;
  description: string;
  tag: string;
  imageSrc: string;
  tagId: CardTagId;
}

export interface LocalizedFeatureItem {
  id: FeatureId;
  eyebrow: string;
  title: string;
  paragraphs: string[];
  imageSrc: string;
  imageAlt: string;
}
