interface NotificationOptions {
    body?: string;
    icon?: string;
    badge?: string;
    vibrate?: number[];
    requireInteraction?: boolean;
}

export class NotificationService {
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
                icon: '/img/jifora-logo.png', 
                badge: '/img/jifora-logo.png',
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
