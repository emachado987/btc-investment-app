import React from 'react';
import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, Activity, DollarSign, BarChart2 } from 'lucide-react';

const data = [
    { name: 'Jan', price: 42000 },
    { name: 'Feb', price: 48000 },
    { name: 'Mar', price: 55000 },
    { name: 'Apr', price: 62000 },
    { name: 'May', price: 58000 },
    { name: 'Jun', price: 65000 },
    { name: 'Jul', price: 72000 },
    { name: 'Aug', price: 85000 },
    { name: 'Sep', price: 95432 },
];

const Dashboard = () => {
    return (
        <div className="dashboard-page">
            <header style={{ marginBottom: '2rem' }}>
                <h2 className="text-gradient">Market Dashboard</h2>
                <p>Live market data and sentiment analysis.</p>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '2rem' }}>
                {/* Price Card */}
                <motion.div
                    className="glass-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                        <h3 style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>Bitcoin Price</h3>
                        <DollarSign size={20} className="text-primary" />
                    </div>
                    <div style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '5px' }}>$95,432</div>
                    <div style={{ color: 'var(--success-color)', display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <TrendingUp size={16} /> +5.2% (24h)
                    </div>
                </motion.div>

                {/* Fear & Greed */}
                <motion.div
                    className="glass-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                        <h3 style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>Fear & Greed</h3>
                        <Activity size={20} className="text-warning" />
                    </div>
                    <div style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '5px' }}>75</div>
                    <div style={{ color: 'var(--success-color)' }}>Greed</div>
                    <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', marginTop: '10px' }}>
                        <div style={{ width: '75%', height: '100%', background: 'var(--success-color)', borderRadius: '3px' }}></div>
                    </div>
                </motion.div>

                {/* Market Cap */}
                <motion.div
                    className="glass-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                        <h3 style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>Market Cap</h3>
                        <BarChart2 size={20} className="text-secondary" />
                    </div>
                    <div style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '5px' }}>$1.8T</div>
                    <div style={{ color: 'var(--text-muted)' }}>Dominance: 52%</div>
                </motion.div>
            </div>

            {/* Chart Section */}
            <motion.div
                className="glass-card"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                style={{ height: '400px', padding: '20px' }}
            >
                <h3 style={{ marginBottom: '20px' }}>Price Trend (2025)</h3>
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="var(--primary-color)" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="var(--primary-color)" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                        <XAxis dataKey="name" stroke="var(--text-muted)" />
                        <YAxis stroke="var(--text-muted)" />
                        <Tooltip
                            contentStyle={{ backgroundColor: 'var(--surface-color)', borderColor: 'var(--glass-border)', borderRadius: '12px' }}
                            itemStyle={{ color: 'var(--text-color)' }}
                        />
                        <Area type="monotone" dataKey="price" stroke="var(--primary-color)" fillOpacity={1} fill="url(#colorPrice)" />
                    </AreaChart>
                </ResponsiveContainer>
            </motion.div>
        </div>
    );
};

export default Dashboard;
