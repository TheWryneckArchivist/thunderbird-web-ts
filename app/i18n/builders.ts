import { AppDictionary, LocalizedCard, LocalizedFeatureItem } from "./types";

const CARD_SEEDS = [
  { id: "bionix-core-2024", imageSrc: "/assets/bionix_core.png", tagId: "latest" },
  { id: "tabletop-essentials", imageSrc: "/assets/tabletop_essentials.png", tagId: "verified" },
  { id: "tournament-hub", imageSrc: "/assets/tournament_hub.png", tagId: "beta" },
  { id: "visual-card-editor", imageSrc: "/assets/visual_card_editor.png", tagId: "pro" },
  { id: "legacy-archive", imageSrc: "/assets/legacy_archive.png", tagId: "stable" },
  { id: "experimental-physics", imageSrc: "/assets/experimental_physics.png", tagId: "experimental" },
  { id: "community-showcase", imageSrc: "/assets/community_showcase.png", tagId: "showcase" },
  { id: "developer-api", imageSrc: "/assets/developer_api.png", tagId: "developer" },
  { id: "card-animation-pack", imageSrc: "/assets/card_animation_pack.png", tagId: "animation" },
  { id: "virtual-tabletop", imageSrc: "/assets/virtual_tabletop.png", tagId: "vtt" },
] as const;

const FEATURE_SEEDS = [
  { id: "creator-workflow", imageSrc: "/assets/visual_card_editor.png" },
  { id: "community-discovery", imageSrc: "/assets/community_showcase.png" },
  { id: "cross-game-flexibility", imageSrc: "/assets/virtual_tabletop.png" },
] as const;

export function buildLocalizedCards(dictionary: AppDictionary): LocalizedCard[] {
  return CARD_SEEDS.map((seed) => {
    const localized = dictionary.assetLibrary.cards[seed.id];

    return {
      id: seed.id,
      title: localized.title,
      category: localized.category,
      description: localized.description,
      tag: localized.tag,
      imageSrc: seed.imageSrc,
      tagId: seed.tagId,
    };
  });
}

export function buildLocalizedFeatureItems(dictionary: AppDictionary): LocalizedFeatureItem[] {
  return FEATURE_SEEDS.map((seed) => {
    const localized = dictionary.assetLibrary.features.items[seed.id];

    return {
      id: seed.id,
      eyebrow: localized.eyebrow,
      title: localized.title,
      paragraphs: localized.paragraphs,
      imageSrc: seed.imageSrc,
      imageAlt: localized.imageAlt,
    };
  });
}
