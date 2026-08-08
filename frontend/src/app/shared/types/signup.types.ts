export interface SignupPageElement {
  id: number;
  label: string;
  elementType: string;
  optionsJson?: string;
  isRequired: boolean;
  orderIndex: number;
}

export interface SignupPage {
  id: number;
  title: string;
  orderIndex: number;
  isActive: boolean;
  elements: SignupPageElement[];
}

export interface SignupSubmission {
  email: string;
  formDataJson: string;
}
