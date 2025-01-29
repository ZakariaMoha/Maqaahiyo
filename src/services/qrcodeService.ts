import QRCode from 'qrcode';
import { MenuItem } from '../types/types';

interface QRCodeData {
    id: string;
    menuId: string;
    action: string;
    details: {
        name: string;
        price: number;
        description: string;
        menuId: string;
    };
}

interface MenuQRCodeData {
    restaurantId: string;
    menuItems: {
        id: string;
        name: string;
        price: number;
        category: string;
    }[];
    v: string; // version
}

export const generateQRCode = async (data: string): Promise<string> => {
    try {
        const qrCodeDataURL = await QRCode.toDataURL(data, {
            errorCorrectionLevel: 'M',
            margin: 2,
            width: 400,
            scale: 8,
            color: {
                dark: '#000000',
                light: '#ffffff'
            }
        });
        return qrCodeDataURL;
    } catch (error) {
        console.error('Error generating QR code:', error);
        throw error;
    }
};

export const generateMenuQRCode = async (menuItems: MenuItem[]): Promise<string> => {
    try {
        // Create a minimal data structure
        const qrData: MenuQRCodeData = {
            restaurantId: 'JIFORA',
            menuItems: menuItems.map(item => ({
                id: item.id,
                name: item.name,
                price: item.price,
                category: item.category
            })),
            v: '1.0'
        };

        // Convert to JSON with minimal whitespace
        const jsonString = JSON.stringify(qrData);
        console.log('QR data size (bytes):', new Blob([jsonString]).size);

        // Generate QR code with optimal settings
        const qrCodeDataURL = await QRCode.toDataURL(jsonString, {
            errorCorrectionLevel: 'M',
            margin: 2,
            width: 400,
            scale: 8,
            color: {
                dark: '#000000',
                light: '#ffffff'
            }
        });

        return qrCodeDataURL;
    } catch (error) {
        console.error('Error in generateMenuQRCode:', error);
        throw new Error('Failed to generate QR code: ' + error);
    }
};
