import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Calculator, DollarSign, Clock, TrendingUp } from 'lucide-react';

const InvestmentCalculator = () => {
    const [monthly, setMonthly] = useState(100);
    const [years, setYears] = useState(5);
    const [growthRate, setGrowthRate] = useState(0.30); // 30% default

    const [data, setData] = useState([]);
    const [summary, setSummary] = useState({ totalInvested: 0, finalValue: 0, profit: 0 });

    useEffect(() => {
        const newData = [];
        let currentVal = 0;
        let invested = 0;

        for (let i = 1; i <= years; i++) {
            invested += monthly * 12;
            // Compound interest formula for monthly contributions: FV = P * (((1 + r)^n - 1) / r)
            // Simplified annual step for demo:
            currentVal = (currentVal + monthly * 12) * (1 + growthRate);

            newData.push({
                name: `Year ${i} `,
                Invested: invested,
                Value: Math.round(currentVal)
            });
        }

        setData(newData);
        setSummary({
            totalInvested: invested,
            finalValue: Math.round(currentVal),
            profit: Math.round(currentVal - invested)
        });
    }, [monthly, years, growthRate]);

    return (
        <div className="calculator-page">
            <header style={{ marginBottom: '2rem' }}>
                <h2 className="text-gradient">Simulador DCA</h2>
                <p>Calcula el potencial de invertir mes a mes.</p>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>

                {/* Controls */}
                <motion.div
                    className="glass-card"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <h3 style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Calculator size={20} className="text-primary" /> Parámetros
                    </h3>

                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', marginBottom: '10px', color: 'var(--text-muted)' }}>Inversión Mensual</label>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                            <DollarSign size={20} />
                            <input
                                type="range"
                                min="10"
                                max="1000"
                                step="10"
                                value={monthly}
                                onChange={(e) => setMonthly(Number(e.target.value))}
                                style={{ flex: 1, accentColor: 'var(--primary-color)' }}
                            />
                            <span style={{ fontSize: '1.2rem', fontWeight: 'bold', minWidth: '80px' }}>${monthly}</span>
                        </div>
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', marginBottom: '10px', color: 'var(--text-muted)' }}>Duración (Años)</label>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                            <Clock size={20} />
                            <input
                                type="range"
                                min="1"
                                max="20"
                                step="1"
                                value={years}
                                onChange={(e) => setYears(Number(e.target.value))}
                                style={{ flex: 1, accentColor: 'var(--secondary-color)' }}
                            />
                            <span style={{ fontSize: '1.2rem', fontWeight: 'bold', minWidth: '80px' }}>{years} años</span>
                        </div>
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', marginBottom: '10px', color: 'var(--text-muted)' }}>Escenario de Crecimiento</label>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <button
                                className={`btn ${growthRate === 0.1 ? 'btn-primary' : 'btn-outline'} `}
                                onClick={() => setGrowthRate(0.1)}
                                style={{ flex: 1, padding: '8px' }}
                            >
                                Conservador (10%)
                            </button>
                            <button
                                className={`btn ${growthRate === 0.3 ? 'btn-primary' : 'btn-outline'} `}
                                onClick={() => setGrowthRate(0.3)}
                                style={{ flex: 1, padding: '8px' }}
                            >
                                Moderado (30%)
                            </button>
                            <button
                                className={`btn ${growthRate === 0.6 ? 'btn-primary' : 'btn-outline'} `}
                                onClick={() => setGrowthRate(0.6)}
                                style={{ flex: 1, padding: '8px' }}
                            >
                                Agresivo (60%)
                            </button>
                        </div>
                    </div>
                </motion.div>

                {/* Results */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <motion.div
                        className="glass-card"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}
                    >
                        <div>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Total Invertido</p>
                            <h3 style={{ fontSize: '1.5rem' }}>${summary.totalInvested.toLocaleString()}</h3>
                        </div>
                        <div>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Valor Estimado</p>
                            <h3 style={{ fontSize: '1.5rem', color: 'var(--success-color)' }}>${summary.finalValue.toLocaleString()}</h3>
                        </div>
                        <div style={{ gridColumn: 'span 2', borderTop: '1px solid var(--glass-border)', paddingTop: '15px', marginTop: '5px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><TrendingUp size={16} /> Beneficio Total</span>
                                <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--primary-color)' }}>+${summary.profit.toLocaleString()}</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Chart */}
                    <motion.div
                        className="glass-card"
                        style={{ flex: 1, minHeight: '300px', padding: '20px' }}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={data}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                                <XAxis dataKey="name" stroke="var(--text-muted)" />
                                <YAxis stroke="var(--text-muted)" />
                                <Tooltip
                                    contentStyle={{ backgroundColor: 'var(--surface-color)', borderColor: 'var(--glass-border)', borderRadius: '12px' }}
                                    itemStyle={{ color: 'var(--text-color)' }}
                                    cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                                />
                                <Legend />
                                <Bar dataKey="Invested" name="Inversión" fill="var(--text-muted)" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="Value" name="Valor Futuro" fill="var(--primary-color)" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </motion.div>
                </div>

            </div>
        </div>
    );
};

export default InvestmentCalculator;
