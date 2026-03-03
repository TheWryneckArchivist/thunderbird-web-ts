import { Dispatch, SetStateAction } from "react";

export interface ShowcaseCardMetaData {
  id: string;
  title: string;
  category: string;
  description: string;
  tag: string;
  tagId: string;
  imageSrc: string;
}

export interface SubmissionModalProperties {
  isSubmitOpen: boolean;
  setIsSubmitOpen: Dispatch<SetStateAction<boolean>>;
}

export interface TitlePackProperties {
  packTitle: string;
  setPackTitle: Dispatch<SetStateAction<string>>;
}

export interface CategoryPackProperties {
  packCategory: string;
  setPackCategory: Dispatch<SetStateAction<string>>;
}

export interface TagPackProperties {
  packTag: string;
  setPackTag: Dispatch<SetStateAction<string>>;
}

export interface DescriptionPackProperties {
  packDescription: string;
  setPackDescription: Dispatch<SetStateAction<string>>;
}

export interface DragProperties {
  isDragging: boolean;
  setIsDragging: Dispatch<SetStateAction<boolean>>;
}

export interface FileListProperties {
  files: File[];
  setFiles: Dispatch<SetStateAction<File[]>>;
}

export type SubmissionModalType =
  TitlePackProperties &
  CategoryPackProperties &
  TagPackProperties &
  DescriptionPackProperties &
  SubmissionModalProperties &
  DragProperties &
  FileListProperties;

export interface TagProperties {
  activeTag: string;
  setActiveTag: (tag: string) => void;
}

export interface SearchProperties {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  debouncedSearch: string;
  setDebouncedSearch: (query: string) => void;
}

export type MainContentType = SubmissionModalType &
  TagProperties &
  SearchProperties & {
    isLoading?: boolean;
  };
