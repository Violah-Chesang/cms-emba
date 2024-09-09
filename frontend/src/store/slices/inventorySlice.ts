import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface InventoryType {
    _id?: string; // Optional when creating new
    name: string;
    subtypes?: string[]; // Optional when creating new
}

interface InventorySubtype {
    _id?: string; // Optional when creating new
    name: string;
    type: {
        _id: string;
        name: string;
    };
}

interface InventoryItem {
    _id: string;
    name: string;
    type: string; // Reference to the InventoryType _id
    subtype: string; // Reference to the InventorySubtype _id
    status: string;
    condition: string;
}

interface InventoryState {
    types: Record<string, InventoryType>;
    subtypes: Record<string, InventorySubtype>;
    items: Record<string, InventoryItem>;
    loadingTypes: boolean;
    loadingSubtypes: boolean;
    loadingItems: boolean;
    error: string | null;
}

// Initial state
const initialState: InventoryState = {
    types: {},
    subtypes: {},
    items: {},
    loadingTypes: false,
    loadingSubtypes: false,
    loadingItems: false,
    error: null,
};

// API base URL
const apiUrl = 'http://localhost:5500/inventory';

// Helper function to handle fetch errors
const handleFetchError = async (response: Response) => {
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to fetch data');
    }
    return response.json();
};

// Thunks for API calls using fetch
export const fetchTypes = createAsyncThunk('inventory/fetchTypes', async (_, { rejectWithValue }) => {
    try {
        const response = await fetch(`${apiUrl}/types`);
        const data = await handleFetchError(response);
        return data;
    } catch (error: any) {
        return rejectWithValue(error.message);
    }
});

export const fetchSubtypes = createAsyncThunk('inventory/fetchSubtypes', async (_, { rejectWithValue }) => {
    try {
        const response = await fetch(`${apiUrl}/subtypes`);
        const data = await handleFetchError(response);
        return data;
    } catch (error: any) {
        return rejectWithValue(error.message);
    }
});

export const fetchItems = createAsyncThunk('inventory/fetchItems', async (_, { rejectWithValue }) => {
    try {
        const response = await fetch(`${apiUrl}/items`);
        const data = await handleFetchError(response);
        return data;
    } catch (error: any) {
        return rejectWithValue(error.message);
    }
});

export const addType = createAsyncThunk('inventory/addType', async (type: Omit<InventoryType, '_id'>, { rejectWithValue }) => {
    try {
        const response = await fetch(`${apiUrl}/types`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(type),
        });
        const data = await handleFetchError(response);
        return data;
    } catch (error: any) {
        return rejectWithValue(error.message);
    }
});

export const updateType = createAsyncThunk('inventory/updateType', async (type: InventoryType, { rejectWithValue }) => {
    try {
        const response = await fetch(`${apiUrl}/types/${type._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(type),
        });
        const data = await handleFetchError(response);
        return data;
    } catch (error: any) {
        return rejectWithValue(error.message);
    }
});

export const deleteType = createAsyncThunk('inventory/deleteType', async (id: string, { rejectWithValue }) => {
    try {
        const response = await fetch(`${apiUrl}/types/${id}`, {
            method: 'DELETE',
        });
        await handleFetchError(response);
        return id;
    } catch (error: any) {
        return rejectWithValue(error.message);
    }
});

// Add subtype
export const addSubtype = createAsyncThunk(
    'inventory/addSubtype',
    async (subtype: { name: string; type: string }, { rejectWithValue }) => {
        try {
            const response = await fetch(`${apiUrl}/subtypes`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(subtype),
            });
            const data = await handleFetchError(response);
            return data;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);


// Update subtype
export const updateSubtype = createAsyncThunk('inventory/updateSubtype', async (subtype: InventorySubtype, { rejectWithValue }) => {
    try {
        const response = await fetch(`${apiUrl}/subtypes/${subtype._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(subtype),
        });
        const data = await handleFetchError(response);
        return data;
    } catch (error: any) {
        return rejectWithValue(error.message);
    }
});

// Delete subtype
export const deleteSubtype = createAsyncThunk('inventory/deleteSubtype', async (id: string, { rejectWithValue }) => {
    try {
        const response = await fetch(`${apiUrl}/subtypes/${id}`, {
            method: 'DELETE',
        });
        await handleFetchError(response);
        return id;
    } catch (error: any) {
        return rejectWithValue(error.message);
    }
});

// Add item
export const addItem = createAsyncThunk(
    'inventory/addItem',
    async (item: Omit<InventoryItem, '_id'>, { rejectWithValue }) => {
        try {
            const response = await fetch(`${apiUrl}/items`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(item),
            });
            const data = await handleFetchError(response);
            return data;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);


// Create slice
const inventorySlice = createSlice({
    name: 'inventory',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Fetch types
        builder.addCase(fetchTypes.pending, (state) => {
            state.loadingTypes = true;
            state.error = null;
        });
        builder.addCase(fetchTypes.fulfilled, (state, action: PayloadAction<InventoryType[]>) => {
            state.loadingTypes = false;
            state.types = action.payload.reduce((acc, type) => {
                if (type._id) {
                    acc[type._id] = type;
                }
                return acc;
            }, {} as Record<string, InventoryType>);
        });
        builder.addCase(fetchTypes.rejected, (state, action: PayloadAction<any>) => {
            state.loadingTypes = false;
            state.error = action.payload;
        });

        // Fetch subtypes
        builder.addCase(fetchSubtypes.pending, (state) => {
            state.loadingSubtypes = true;
            state.error = null;
        });
        builder.addCase(fetchSubtypes.fulfilled, (state, action: PayloadAction<InventorySubtype[]>) => {
            state.loadingSubtypes = false;
            state.subtypes = action.payload.reduce((acc, subtype) => {
                if (subtype._id) {
                    acc[subtype._id] = subtype;
                }
                return acc;
            }, {} as Record<string, InventorySubtype>);
        });
        builder.addCase(fetchSubtypes.rejected, (state, action: PayloadAction<any>) => {
            state.loadingSubtypes = false;
            state.error = action.payload;
        });

        // Fetch items
        builder.addCase(fetchItems.pending, (state) => {
            state.loadingItems = true;
            state.error = null;
        });
        builder.addCase(fetchItems.fulfilled, (state, action: PayloadAction<InventoryItem[]>) => {
            state.loadingItems = false;
            state.items = action.payload.reduce((acc, item) => {
                acc[item._id] = item;
                return acc;
            }, {} as Record<string, InventoryItem>);
        });
        builder.addCase(fetchItems.rejected, (state, action: PayloadAction<any>) => {
            state.loadingItems = false;
            state.error = action.payload;
        });

        // Add type
        builder.addCase(addType.fulfilled, (state, action: PayloadAction<InventoryType>) => {
            state.types[action.payload._id!] = action.payload;
        });
        builder.addCase(addType.rejected, (state, action: PayloadAction<any>) => {
            state.error = action.payload;
        });

        // Update type
        builder.addCase(updateType.fulfilled, (state, action: PayloadAction<InventoryType>) => {
            if (state.types[action.payload._id!]) {
                state.types[action.payload._id!] = action.payload;
            }
        });
        builder.addCase(updateType.rejected, (state, action: PayloadAction<any>) => {
            state.error = action.payload;
        });

        // Delete type
        builder.addCase(deleteType.fulfilled, (state, action: PayloadAction<string>) => {
            delete state.types[action.payload];
        });
        builder.addCase(deleteType.rejected, (state, action: PayloadAction<any>) => {
            state.error = action.payload;
        });

        // Add subtype
        builder.addCase(addSubtype.fulfilled, (state, action: PayloadAction<InventorySubtype>) => {
            state.subtypes[action.payload._id!] = action.payload;
        });
        builder.addCase(addSubtype.rejected, (state, action: PayloadAction<any>) => {
            state.error = action.payload;
        });

        // Update subtype
        builder.addCase(updateSubtype.fulfilled, (state, action: PayloadAction<InventorySubtype>) => {
            if (state.subtypes[action.payload._id!]) {
                state.subtypes[action.payload._id!] = action.payload;
            }
        });
        builder.addCase(updateSubtype.rejected, (state, action: PayloadAction<any>) => {
            state.error = action.payload;
        });

        // Delete subtype
        builder.addCase(deleteSubtype.fulfilled, (state, action: PayloadAction<string>) => {
            delete state.subtypes[action.payload];
        });
        builder.addCase(deleteSubtype.rejected, (state, action: PayloadAction<any>) => {
            state.error = action.payload;
        });


        // Add item
        builder.addCase(addItem.pending, (state) => {
            state.loadingItems = true;
            state.error = null;
        });
        builder.addCase(addItem.fulfilled, (state, action: PayloadAction<InventoryItem>) => {
            state.items[action.payload._id] = action.payload;
        });
        builder.addCase(addItem.rejected, (state, action: PayloadAction<any>) => {
            state.error = action.payload;
        });
    },
});

export default inventorySlice.reducer;
