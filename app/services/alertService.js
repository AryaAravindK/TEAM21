import api from '../../lib/axios';

export const getAlerts = async () => {
    try {
        const response = await api.get('/alerts/');
        return response.data;
    } catch (error) {
        console.error('Failed to fetch alerts:', error);
        // Return mock data for development if API fails
        return {
            data: [
                {
                    id: 1,
                    title: 'Event Registration Confirmed',
                    description: 'Successfully registered for Basketball Championship 2025',
                    time: '2 hours ago',
                    read: false,
                    type: 'registration'
                },
                {
                    id: 2,
                    title: 'Team Invitation',
                    description: 'You have been invited to join "Thunder Bolts" team',
                    time: '5 hours ago',
                    read: false,
                    type: 'invitation'
                },
                {
                    id: 3,
                    title: 'Event Reminder',
                    description: 'Football tournament starts tomorrow at 9:00 AM',
                    time: '1 day ago',
                    read: true,
                    type: 'reminder'
                },
                {
                    id: 4,
                    title: 'Achievement Unlocked',
                    description: 'Congratulations! You earned the "Team Player" badge',
                    time: '2 days ago',
                    read: true,
                    type: 'achievement'
                },
                {
                    id: 5,
                    title: 'Event Update',
                    description: 'Tennis tournament venue has been changed to Central Court',
                    time: '3 days ago',
                    read: false,
                    type: 'update'
                }
            ]
        };
    }
};

export const markAlertAsRead = async (alertId) => {
    try {
        const response = await api.put(`/alerts/${alertId}/read`);
        return response.data;
    } catch (error) {
        console.error('Failed to mark alert as read:', error);
        throw error;
    }
};