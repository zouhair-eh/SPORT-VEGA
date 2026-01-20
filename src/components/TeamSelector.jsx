import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaSearch, FaCheck } from 'react-icons/fa';
import { TEAMS } from '../data/products';
import { useAuth } from '../context/AuthContext';

export default function TeamSelector({ isOpen, onClose }) {
    const { favoriteTeam, setFavoriteTeam } = useAuth();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTeam, setSelectedTeam] = useState(favoriteTeam);

    const filteredTeams = TEAMS.filter(team =>
        team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        team.league.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleSave = () => {
        setFavoriteTeam(selectedTeam);
        onClose();
    };

    const groupedTeams = filteredTeams.reduce((acc, team) => {
        if (!acc[team.league]) acc[team.league] = [];
        acc[team.league].push(team);
        return acc;
    }, {});

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 50 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 50 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    >
                        <div className="bg-sport-900 border border-white/10 rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl">
                            {/* Header */}
                            <div className="bg-gradient-to-r from-sport-accent to-sport-neon p-8 relative">
                                <button
                                    onClick={onClose}
                                    className="absolute top-6 right-6 w-10 h-10 rounded-xl bg-black/20 hover:bg-black/40 flex items-center justify-center text-white transition-colors"
                                >
                                    <FaTimes />
                                </button>
                                <h2 className="text-white font-black text-4xl italic uppercase tracking-tighter mb-2">
                                    Choose Your Team
                                </h2>
                                <p className="text-white/80 font-bold">
                                    Select your favorite team to personalize your experience
                                </p>
                            </div>

                            {/* Search */}
                            <div className="p-6 border-b border-white/10">
                                <div className="relative">
                                    <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500" />
                                    <input
                                        type="text"
                                        placeholder="Search teams..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-white font-bold focus:outline-none focus:ring-2 focus:ring-sport-neon/50 transition-all"
                                    />
                                </div>
                            </div>

                            {/* Teams Grid */}
                            <div className="p-6 overflow-y-auto max-h-[50vh]">
                                {Object.entries(groupedTeams).map(([league, teams]) => (
                                    <div key={league} className="mb-8 last:mb-0">
                                        <h3 className="text-sport-neon font-black text-sm uppercase tracking-widest mb-4">
                                            {league}
                                        </h3>
                                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                            {teams.map((team) => (
                                                <motion.button
                                                    key={team.id}
                                                    onClick={() => setSelectedTeam(team.id)}
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    className={`relative p-6 rounded-2xl border-2 transition-all ${selectedTeam === team.id
                                                            ? 'border-sport-accent bg-sport-accent/10'
                                                            : 'border-white/10 bg-white/5 hover:border-white/20'
                                                        }`}
                                                >
                                                    {selectedTeam === team.id && (
                                                        <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-sport-accent flex items-center justify-center">
                                                            <FaCheck className="text-white text-xs" />
                                                        </div>
                                                    )}
                                                    <div
                                                        className="w-12 h-12 rounded-xl mx-auto mb-3"
                                                        style={{
                                                            background: `linear-gradient(135deg, ${team.colors[0]}, ${team.colors[1] || team.colors[0]})`
                                                        }}
                                                    />
                                                    <div className="text-white font-black text-sm text-center">
                                                        {team.name}
                                                    </div>
                                                </motion.button>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Footer */}
                            <div className="p-6 border-t border-white/10 flex gap-4">
                                <button
                                    onClick={() => setSelectedTeam(null)}
                                    className="flex-1 py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 transition-colors"
                                >
                                    Clear Selection
                                </button>
                                <button
                                    onClick={handleSave}
                                    className="flex-1 py-4 rounded-2xl bg-sport-accent text-white font-black hover:bg-sport-accent/80 transition-colors shadow-xl shadow-sport-accent/20"
                                >
                                    Save & Continue
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
