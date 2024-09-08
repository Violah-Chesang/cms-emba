export interface InventorySubtype {
    _id: string;
    name: string;
    type: string; // The `type` refers to the parent `InventoryType` _id.
}

export interface InventoryType {
    _id: string;
    name: string;
    subtypes: string[];
}

export interface InventoryItem {
    _id: string;
    name: string;
    type: string;
    subtype?: string;
    serialNumber?: string;
    description?: string;
    quantity: number;
    location?: string;
    purchaseDate?: Date;
    status?: string;
    condition?: string;
}