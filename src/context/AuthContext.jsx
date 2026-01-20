import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [favoriteTeam, setFavoriteTeamState] = useState(null);

    useEffect(() => {
        // Check for persisted session
        const storedAuth = localStorage.getItem('vega_auth');
        if (storedAuth) {
            setUser(JSON.parse(storedAuth));
        }

        // Check for persisted favorite team
        const storedTeam = localStorage.getItem('vega_favorite_team');
        if (storedTeam) {
            setFavoriteTeamState(storedTeam);
        }

        setLoading(false);
    }, []);

    const login = (role, email, data = {}) => {
        const authData = {
            loggedIn: true,
            role,
            email,
            ...data
        };
        setUser(authData);
        localStorage.setItem('vega_auth', JSON.stringify(authData));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('vega_auth');
    };

    const setFavoriteTeam = (teamId) => {
        setFavoriteTeamState(teamId);
        if (teamId) {
            localStorage.setItem('vega_favorite_team', teamId);
        } else {
            localStorage.removeItem('vega_favorite_team');
        }
    };

    const value = {
        user,
        login,
        logout,
        isAuthenticated: !!user?.loggedIn,
        isPatron: user?.role === 'patron',
        loading,
        favoriteTeam,
        setFavoriteTeam
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
