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
    const [btcData, setBtcData] = React.useState({
        price: 95432, // Fallback
        change24h: 5.2,
        marketCap: 1.8
    });
    const [fngData, setFngData] = React.useState({
        value: 75, // Fallback
        classification: 'Greed'
    });
    const [chartData, setChartData] = React.useState([]);
    const [timeRange, setTimeRange] = React.useState('7'); // Default 7 days
    const [loading, setLoading] = React.useState(true);

    const fetchData = async () => {
        try {
            // Fetch Bitcoin Data from CryptoCompare
            const btcResponse = await fetch('https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC&tsyms=USD');
            if (!btcResponse.ok) throw new Error('Failed to fetch BTC data');
            const btcJson = await btcResponse.json();

            if (btcJson.RAW && btcJson.RAW.BTC && btcJson.RAW.BTC.USD) {
                const btc = btcJson.RAW.BTC.USD;
                setBtcData({
                    price: btc.PRICE,
                    change24h: btc.CHANGEPCT24HOUR,
                    marketCap: btc.MKTCAP / 1e12
                });
            }

            // Fetch Fear & Greed Data
            const fngResponse = await fetch('https://api.alternative.me/fng/');
            if (!fngResponse.ok) throw new Error('Failed to fetch FNG data');
            const fngJson = await fngResponse.json();
            if (fngJson.data && fngJson.data.length > 0) {
                setFngData({
                    value: parseInt(fngJson.data[0].value),
                    classification: fngJson.data[0].value_classification
                });
            }
        } catch (error) {
            console.warn('Using fallback data due to API error:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchChartData = async (days) => {
        try {
            let limit = 24;
            let endpoint = 'histohour';
            let aggregate = 1;

            if (days === '1') {
                endpoint = 'histominute';
                limit = 96; // 15 min intervals approx
                aggregate = 15;
            } else if (days === '7') {
                endpoint = 'histohour';
                limit = 168;
            } else if (days === '30') {
                endpoint = 'histohour';
                limit = 120; // 6h intervals
                aggregate = 6;
            } else if (days === '365') {
                endpoint = 'histoday';
                limit = 365;
            }

            const response = await fetch(`https://min-api.cryptocompare.com/data/v2/${endpoint}?fsym=BTC&tsym=USD&limit=${limit}&aggregate=${aggregate}`);
            if (!response.ok) throw new Error('Failed to fetch chart data');
            const json = await response.json();

            if (json.Data && json.Data.Data) {
                const formattedData = json.Data.Data.map(item => ({
                    name: new Date(item.time * 1000).toLocaleDateString(undefined, {
                        month: 'short',
                        day: 'numeric',
                        hour: days === '1' ? '2-digit' : undefined,
                        minute: days === '1' ? '2-digit' : undefined
                    }),
                    price: item.close
                }));
                setChartData(formattedData);
            }
        } catch (error) {
            console.warn('Using fallback chart data due to API error:', error);
            setChartData(data);
        }
    };

    React.useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, 3600000); // Update every hour
        return () => clearInterval(interval);
    }, []);

    React.useEffect(() => {
        fetchChartData(timeRange);
    }, [timeRange]);

    const getFngColor = (value) => {
        if (value >= 75) return 'var(--success-color)'; // Extreme Greed
        if (value >= 50) return '#a3e635'; // Greed (Lime)
        if (value >= 25) return '#fbbf24'; // Fear (Amber)
        return 'var(--danger-color)'; // Extreme Fear
    };

    const fngColor = getFngColor(fngData.value);

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
                    <div style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '5px' }}>
                        ${btcData.price.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                    </div>
                    <div style={{ color: btcData.change24h >= 0 ? 'var(--success-color)' : 'var(--danger-color)', display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <TrendingUp size={16} /> {btcData.change24h >= 0 ? '+' : ''}{btcData.change24h.toFixed(2)}% (24h)
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
                    <div style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '5px' }}>{fngData.value}</div>
                    <div style={{ color: fngColor }}>{fngData.classification}</div>
                    <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', marginTop: '10px' }}>
                        <div style={{ width: `${fngData.value}%`, height: '100%', background: fngColor, borderRadius: '3px', transition: 'width 1s ease, background 1s ease' }}></div>
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
                    <div style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '5px' }}>${btcData.marketCap.toFixed(2)}T</div>
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
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h3>Price Trend</h3>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        {['1', '7', '30', '365'].map((days) => (
                            <button
                                key={days}
                                onClick={() => setTimeRange(days)}
                                style={{
                                    background: timeRange === days ? 'var(--primary-color)' : 'rgba(255,255,255,0.1)',
                                    border: 'none',
                                    padding: '5px 10px',
                                    borderRadius: '5px',
                                    color: 'white',
                                    cursor: 'pointer',
                                    transition: 'background 0.3s'
                                }}
                            >
                                {days === '1' ? '1D' : days === '7' ? '7D' : days === '30' ? '1M' : '1Y'}
                            </button>
                        ))}
                    </div>
                </div>
                <div style={{ width: '100%', height: '300px', minWidth: 0 }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={chartData.length > 0 ? chartData : data}>
                            <defs>
                                <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="var(--primary-color)" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="var(--primary-color)" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                            <XAxis
                                dataKey="name"
                                stroke="var(--text-muted)"
                                tick={{ fontSize: 12 }}
                                tickFormatter={(value) => value}
                                interval="preserveStartEnd"
                            />
                            <YAxis
                                stroke="var(--text-muted)"
                                domain={['auto', 'auto']}
                                tickFormatter={(value) => `$${value.toLocaleString()}`}
                            />
                            <Tooltip
                                contentStyle={{ backgroundColor: 'var(--surface-color)', borderColor: 'var(--glass-border)', borderRadius: '12px' }}
                                itemStyle={{ color: 'var(--text-color)' }}
                                formatter={(value) => [`$${value.toLocaleString()}`, 'Price']}
                            />
                            <Area type="monotone" dataKey="price" stroke="var(--primary-color)" fillOpacity={1} fill="url(#colorPrice)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </motion.div>
        </div>
    );
};

export default Dashboard;
