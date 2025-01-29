// Initialize environment variables
const API_URL = 'http://localhost:5000';

export interface NotificationMessage {
    to: string;
    subject?: string;
    body: string;
}

export class NotificationService {
    /**
     * Send a notification email
     * @param to - Recipient email address
     * @param body - Message content (HTML supported)
     * @param subject - Optional email subject
     */
    static async sendNotification(to: string, body: string, subject?: string): Promise<boolean> {
        try {
            console.log('Sending notification to:', to);

            const response = await fetch(`${API_URL}/api/send-notification`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    to,
                    body,
                    subject
                }),
            });

            const data = await response.json();
            
            if (!response.ok) {
                console.error('Notification API error:', data);
                return false;
            }

            console.log('Notification sent successfully:', data);
            return true;
        } catch (error) {
            console.error('Error sending notification:', error);
            return false;
        }
    }

    private static async requestNotificationPermission(): Promise<boolean> {
        if (!('Notification' in window)) {
            console.log('This browser does not support notifications');
            return false;
        }

        if (Notification.permission === 'granted') {
            return true;
        }

        if (Notification.permission !== 'denied') {
            const permission = await Notification.requestPermission();
            return permission === 'granted';
        }

        return false;
    }

    static async showNotification(title: string, options: NotificationOptions = {}): Promise<boolean> {
        try {
            const hasPermission = await this.requestNotificationPermission();
            
            if (!hasPermission) {
                console.log('Notification permission not granted');
                return false;
            }

            const notification = new Notification(title, {
                icon: '/logo.png', // Add your restaurant logo path here
                badge: '/logo.png',
                ...options
            });

            notification.onclick = () => {
                window.focus();
                notification.close();
            };

            return true;
        } catch (error) {
            console.error('Error showing notification:', error);
            return false;
        }
    }
}
