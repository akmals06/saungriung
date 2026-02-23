// Menggunakan Environment Variable agar otomatis ganti URL saat deploy
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const API_URL = `${BASE_URL}/api/events`;

export const getEvents = async () => {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Failed to fetch events');
        return await response.json();
    } catch (error) {
        console.error("API Error:", error);
        return { success: false, data: [] };
    }
};

export const createEvent = async (event) => {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(event),
        });
        if (!response.ok) throw new Error('Failed to create event');
        return await response.json();
    } catch (error) {
        console.error("API Error:", error);
        throw error;
    }
};

export const deleteEvent = async (id) => {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) throw new Error('Failed to delete event');
        return await response.json();
    } catch (error) {
        console.error("API Error:", error);
        throw error;
    }
};