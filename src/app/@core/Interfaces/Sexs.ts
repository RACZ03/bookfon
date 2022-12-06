export interface SexsI {
  comment: string;
data: SexsItem[];
message: string;
status: number;
}

export interface SexsItem {
id: number;
name: string;
description: string;
catalogTypeRef: string;
}
