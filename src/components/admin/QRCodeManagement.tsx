import React, { useState, useEffect } from 'react';
import { generateMenuQRCode } from '../../services/qrcodeService';
import { useLocation, useNavigate } from 'react-router-dom';
import { MenuItem } from '../../types/types';
import Swal from 'sweetalert2';

const QRCodeManagement: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
    const [isFullMenu, setIsFullMenu] = useState(false);
    const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const handleInitialLoad = async () => {
            const state = location.state as any;
            console.log('Location state:', state); // Debug log

            if (state?.isFullMenu && state?.allMenuItems) {
                setIsFullMenu(true);
                setMenuItems(state.allMenuItems);
                try {
                    await handleGenerateMenuQRCode(state.allMenuItems);
                } catch (err) {
                    console.error('Error in initial QR code generation:', err);
                }
            } else {
                setError('No menu items data received');
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'No menu items data received. Please go back and try again.'
                });
            }
        };

        handleInitialLoad();
    }, [location.state]);

    const handleGenerateMenuQRCode = async (items: MenuItem[]) => {
        setLoading(true);
        setError(null);
        try {
            console.log('Generating QR code for items:', items); // Debug log
            const url = await generateMenuQRCode(items);
            console.log('Generated QR code URL:', url); // Debug log
            setQrCodeUrl(url);
        } catch (error) {
            console.error('Error generating menu QR code:', error);
            setError('Failed to generate QR code');
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to generate QR code. Please try again.'
            });
        } finally {
            setLoading(false);
        }
    };

    const handleBackToMenu = () => {
        navigate('/admin/dashboard/menu');
    };

    const handleRefreshQRCode = () => {
        if (isFullMenu && menuItems.length > 0) {
            handleGenerateMenuQRCode(menuItems);
        }
    };

    return (
        <div className="p-6 max-w-2xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">Menu QR Code</h2>
                <div className="space-x-2">
                    <button
                        onClick={handleRefreshQRCode}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        disabled={loading}
                    >
                        {loading ? 'Generating...' : 'Refresh QR Code'}
                    </button>
                    <button
                        onClick={handleBackToMenu}
                        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                    >
                        Back to Menu
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="text-center mb-4">
                    <h3 className="text-lg font-medium">
                        {isFullMenu ? 'Complete Menu QR Code' : 'Menu Item QR Code'}
                    </h3>
                    <p className="text-gray-600 mt-1">
                        {isFullMenu 
                            ? `This QR code contains all ${menuItems.length} menu items`
                            : 'This QR code contains a single menu item'}
                    </p>
                </div>

                {error ? (
                    <div className="text-red-500 text-center p-4">
                        {error}
                    </div>
                ) : loading ? (
                    <div className="flex justify-center items-center p-4">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                    </div>
                ) : qrCodeUrl ? (
                    <div className="flex flex-col items-center">
                        <div className="bg-white p-4 rounded-lg shadow-sm">
                            <img 
                                src={qrCodeUrl} 
                                alt="QR Code"
                                className="w-[400px] h-[400px]"
                                style={{ imageRendering: 'pixelated' }}
                                onError={(e) => {
                                    console.error('Error loading QR code image');
                                    setError('Failed to load QR code image');
                                }}
                            />
                        </div>
                        <div className="mt-4 text-center">
                            <a
                                href={qrCodeUrl}
                                download="menu-qr-code.png"
                                className="inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors mb-2"
                            >
                                Download QR Code
                            </a>
                            <p className="text-sm text-gray-600">
                                Tip: For best scanning results, download the QR code and print it in high quality
                            </p>
                        </div>
                    </div>
                ) : null}
            </div>
        </div>
    );
};

export default QRCodeManagement;
