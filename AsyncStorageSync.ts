import { AsyncStorage } from "react-native";

export const saveState = (state: any) => {
    try {
        const serializedState = JSON.stringify(state);
        AsyncStorage.setItem('state', serializedState);
    } catch {
        console.log('failed');
    }
};