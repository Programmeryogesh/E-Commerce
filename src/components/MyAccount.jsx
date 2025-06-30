import './MyAccount.css'
import { useEffect, useState, useRef } from 'react';
import getProfile, { uploadProfilePhoto } from '../api/profile';

const MyAccount = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef();

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (!userId) {
            setError('User not logged in.');
            setLoading(false);
            return;
        }
        getProfile(userId).then((response) => {
            if (response && response.status === 200) {
                setUser(response.data);
            } else {
                setError(response?.data?.error || 'Failed to fetch user profile.');
            }
            setLoading(false);
        });
    }, []);

    const handlePhotoChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setUploading(true);
        const userId = localStorage.getItem('userId');
        const response = await uploadProfilePhoto(userId, file);
        if (response && response.status === 200) {
            setUser((prev) => ({ ...prev, profilePhoto: response.data.profilePhoto }));
        } else {
            alert(response?.data?.error || 'Failed to upload photo');
        }
        setUploading(false);
    };

    const triggerFileInput = () => {
        if (fileInputRef.current) fileInputRef.current.click();
    };

    if (loading) return <div className="profile-container"><p>Loading...</p></div>;
    if (error) return <div className="profile-container"><p style={{color: 'red'}}>{error}</p></div>;
    if (!user) return null;

    return(
        <div className="profile-container">
            <div className="profile-header">
                {user.profilePhoto ? (
                    <img
                        src={`${user.profilePhoto}`}
                        alt="Profile"
                        className="avatar"
                        style={{ width: 60, height: 60, borderRadius: '50%', objectFit: 'cover', border: '2px solid #eee' }}
                    />
                ) : (
                    <div
                        className="avatar"
                        style={{
                            width: 60,
                            height: 60,
                            borderRadius: '50%',
                            background: '#eee',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: 32,
                            color: '#555',
                            fontWeight: 'bold',
                            border: '2px solid #eee',
                        }}
                    >
                        {user.username ? user.username[0].toUpperCase() : '?'}
                    </div>
                )}
                <input
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    ref={fileInputRef}
                    onChange={handlePhotoChange}
                />
                <button
                    className="edit-profile"
                    style={{ marginLeft: 16, padding: '6px 12px', fontSize: 14 }}
                    onClick={triggerFileInput}
                    disabled={uploading}
                >
                    {uploading ? 'Uploading...' : (user.profilePhoto ? 'Change Photo' : 'Upload Photo')}
                </button>
                <div style={{ marginLeft: 24, textAlign: 'left' }}>
                    <h2>{user.username}</h2>
                    <p>Email: {user.email}</p>
                    <p>Role: {user.role}</p>
                </div>
            </div>

            <div className="profile-tabs">
                <button className="active"><i className="fas fa-box-open"></i> Orders</button>
                <button><i className="fas fa-heart"></i> Wishlist</button>
                <button><i className="fas fa-cog"></i> Settings</button>
            </div>

            <div className="profile-section">
                <h3>Notifications</h3>
                <ul className="profile-list">
                    {user.notifications && user.notifications.length > 0 ? (
                        user.notifications.map((n, idx) => (
                            <li key={idx}>
                                <p>{n.message}</p>
                                <p style={{fontSize: '12px', color: '#888'}}>{n.createdAt ? new Date(n.createdAt).toLocaleString() : ''}</p>
                            </li>
                        ))
                    ) : (
                        <li><p>No notifications available.</p></li>
                    )}
                </ul>
            </div>

            <div className="profile-actions">
                <a href="#" className="edit-profile"><i className="fas fa-cog"></i> Edit Profile</a>
                <a href="#" className="logout"><i className="fas fa-sign-out-alt"></i> Logout</a>
            </div>
        </div>
    )
}

export default MyAccount